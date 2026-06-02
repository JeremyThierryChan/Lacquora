import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { query, queryOne } from '../db/connection'
import { generateOrderPdf } from '../services/pdfService'
import { sendOrderConfirmation, sendAdminNotification } from '../services/emailService'
import { AppError } from '../middleware/errorHandler'

// ── Validation schemas ──────────────────────────────────────────
export const createOrderSchema = z.object({
  bodyShape:    z.enum(['strat','tele','super_strat','flying_v','explorer','headless','custom']),
  woodMaterial: z.enum(['alder','ash','mahogany','walnut','maple']),
  craftType:    z.enum(['standard','lacquer','gold_carving','mother_of_pearl','urushi','custom_artwork']),
  hardwareConfig: z.object({
    bridge:    z.string().min(1),
    pickups:   z.string().min(1),
    neck:      z.string().min(1),
    fretboard: z.string().min(1),
  }),
  referenceImages: z.array(z.string().url()).max(8).default([]),
  notes:           z.string().max(5000).optional(),
  customerName:    z.string().min(2).max(255),
  customerEmail:   z.string().email(),
  customerPhone:   z.string().max(50).optional(),
  customerCountry: z.string().min(2).max(100),
})

// ── Public: create order ────────────────────────────────────────
export async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const data = createOrderSchema.parse(req.body)

    const referenceNo = `LQ-${Date.now().toString().slice(-6)}-${uuidv4().slice(0, 4).toUpperCase()}`

    const [order] = await query<{ id: number }>(
      `INSERT INTO custom_orders
         (reference_no, body_shape, wood_material, craft_type, hardware_config,
          reference_images, notes, customer_name, customer_email, customer_phone, customer_country)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING id, reference_no, created_at`,
      [
        referenceNo,
        data.bodyShape,
        data.woodMaterial,
        data.craftType,
        JSON.stringify(data.hardwareConfig),
        data.referenceImages,
        data.notes ?? null,
        data.customerName,
        data.customerEmail,
        data.customerPhone ?? null,
        data.customerCountry,
      ]
    ) as unknown as [{ id: number; reference_no: string; created_at: string }]

    // Generate PDF in background (don't await — return response first)
    setImmediate(async () => {
      try {
        const pdfPath = await generateOrderPdf({
          referenceNo,
          bodyShape:      data.bodyShape,
          woodMaterial:   data.woodMaterial,
          craftType:      data.craftType,
          hardwareConfig: data.hardwareConfig,
          notes:          data.notes,
          customerName:   data.customerName,
          customerEmail:  data.customerEmail,
          customerPhone:  data.customerPhone,
          customerCountry:data.customerCountry,
          createdAt:      new Date().toISOString(),
        })

        await query('UPDATE custom_orders SET pdf_url = $1 WHERE reference_no = $2',
          [pdfPath, referenceNo])

        await Promise.all([
          sendOrderConfirmation({
            to: data.customerEmail,
            name: data.customerName,
            referenceNo,
            bodyShape:    data.bodyShape,
            woodMaterial: data.woodMaterial,
            craftType:    data.craftType,
            pdfPath,
          }),
          sendAdminNotification({
            referenceNo,
            customerName:    data.customerName,
            customerEmail:   data.customerEmail,
            customerCountry: data.customerCountry,
            bodyShape:    data.bodyShape,
            woodMaterial: data.woodMaterial,
            craftType:    data.craftType,
            notes:        data.notes,
            pdfPath,
          }),
        ])
      } catch (err) {
        console.error('Post-order processing error:', err)
      }
    })

    res.status(201).json({
      status: 'success',
      data: { referenceNo, orderId: (order as any).id },
      message: 'Your enquiry has been received. We will respond within 3 business days.',
    })
  } catch (err) {
    next(err)
  }
}

// ── Admin: list orders ──────────────────────────────────────────
export async function listOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const page     = Math.max(1, parseInt(req.query.page as string ?? '1'))
    const pageSize = Math.min(50, parseInt(req.query.pageSize as string ?? '20'))
    const status   = req.query.status as string | undefined
    const offset   = (page - 1) * pageSize

    const where = status ? 'WHERE status = $3' : ''
    const params: unknown[] = [pageSize, offset]
    if (status) params.push(status)

    const rows = await query(
      `SELECT id, reference_no, status, body_shape, wood_material, craft_type,
              customer_name, customer_email, customer_country, quoted_price, created_at
       FROM custom_orders ${where}
       ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      params
    )

    const [{ count }] = await query<{ count: string }>(
      `SELECT COUNT(*) FROM custom_orders ${status ? 'WHERE status = $1' : ''}`,
      status ? [status] : []
    )

    res.json({
      status: 'success',
      data: rows,
      meta: { total: parseInt(count), page, pageSize, pageCount: Math.ceil(parseInt(count) / pageSize) },
    })
  } catch (err) {
    next(err)
  }
}

// ── Admin: get single order ─────────────────────────────────────
export async function getOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const order = await queryOne(
      'SELECT * FROM custom_orders WHERE id = $1',
      [req.params.id]
    )
    if (!order) return next(new AppError(404, 'Order not found'))
    res.json({ status: 'success', data: order })
  } catch (err) {
    next(err)
  }
}

// ── Admin: update order status / quote ─────────────────────────
export async function updateOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const schema = z.object({
      status:          z.enum(['pending','reviewing','quoted','confirmed','in_progress','delivered','cancelled']).optional(),
      quotedPrice:     z.number().int().positive().optional(),
      quotedLeadTime:  z.number().int().positive().optional(),
      adminNotes:      z.string().max(5000).optional(),
    })
    const data = schema.parse(req.body)

    const fields = Object.entries({
      status:           data.status,
      quoted_price:     data.quotedPrice,
      quoted_lead_time: data.quotedLeadTime,
      admin_notes:      data.adminNotes,
    }).filter(([, v]) => v !== undefined)

    if (!fields.length) return next(new AppError(400, 'No fields to update'))

    const setClause = fields.map(([k], i) => `${k} = $${i + 2}`).join(', ')
    const values    = [req.params.id, ...fields.map(([, v]) => v)]

    const updated = await queryOne(
      `UPDATE custom_orders SET ${setClause} WHERE id = $1 RETURNING *`,
      values
    )
    if (!updated) return next(new AppError(404, 'Order not found'))

    res.json({ status: 'success', data: updated })
  } catch (err) {
    next(err)
  }
}

import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { query, queryOne } from '../db/connection'
import { sendInquiryNotification } from '../services/emailService'
import { AppError } from '../middleware/errorHandler'

export const createInquirySchema = z.object({
  type:    z.enum(['general','custom','enterprise','press']).default('general'),
  name:    z.string().min(2).max(255),
  email:   z.string().email(),
  phone:   z.string().max(50).optional(),
  country: z.string().min(2).max(100),
  message: z.string().min(20).max(5000),
})

export async function createInquiry(req: Request, res: Response, next: NextFunction) {
  try {
    const data = createInquirySchema.parse(req.body)
    const ip   = req.ip ?? null

    await query(
      `INSERT INTO inquiries (type, name, email, phone, country, message, ip_address)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [data.type, data.name, data.email, data.phone ?? null, data.country, data.message, ip]
    )

    setImmediate(async () => {
      try {
        await sendInquiryNotification({
          name:    data.name,
          email:   data.email,
          country: data.country,
          type:    data.type,
          message: data.message,
        })
      } catch (err) {
        console.error('Inquiry notification error:', err)
      }
    })

    res.status(201).json({
      status:  'success',
      message: 'Message received. We will be in touch within 2 business days.',
    })
  } catch (err) {
    next(err)
  }
}

export async function listInquiries(req: Request, res: Response, next: NextFunction) {
  try {
    const page     = Math.max(1, parseInt(req.query.page as string ?? '1'))
    const pageSize = Math.min(50, parseInt(req.query.pageSize as string ?? '20'))
    const status   = req.query.status as string | undefined
    const offset   = (page - 1) * pageSize

    const where  = status ? 'WHERE status = $3' : ''
    const params: unknown[] = [pageSize, offset]
    if (status) params.push(status)

    const rows = await query(
      `SELECT id, type, status, name, email, country, LEFT(message,100) AS message_preview, created_at
       FROM inquiries ${where}
       ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      params
    )

    const [{ count }] = await query<{ count: string }>(
      `SELECT COUNT(*) FROM inquiries ${status ? 'WHERE status = $1' : ''}`,
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

export async function updateInquiry(req: Request, res: Response, next: NextFunction) {
  try {
    const schema = z.object({
      status: z.enum(['new','read','replied','closed']).optional(),
    })
    const data = schema.parse(req.body)
    if (!data.status) return next(new AppError(400, 'No fields to update'))

    const updated = await queryOne(
      `UPDATE inquiries SET status = $1 ${data.status === 'replied' ? ', replied_at = NOW()' : ''}
       WHERE id = $2 RETURNING *`,
      [data.status, req.params.id]
    )
    if (!updated) return next(new AppError(404, 'Inquiry not found'))
    res.json({ status: 'success', data: updated })
  } catch (err) {
    next(err)
  }
}

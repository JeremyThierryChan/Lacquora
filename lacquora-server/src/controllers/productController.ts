import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { query, queryOne } from '../db/connection'
import { AppError } from '../middleware/errorHandler'

// ── Public ──────────────────────────────────────────────────────
export async function listProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const series   = req.query.series as string | undefined
    const featured = req.query.featured === 'true'
    const page     = Math.max(1, parseInt(req.query.page as string ?? '1'))
    const pageSize = Math.min(50, parseInt(req.query.pageSize as string ?? '12'))
    const offset   = (page - 1) * pageSize

    const conditions: string[] = ["p.status = 'published'"]
    const params: unknown[]    = []

    if (series)   { params.push(series);   conditions.push(`p.series = $${params.length}`) }
    if (featured) conditions.push('p.featured = true')

    params.push(pageSize, offset)
    const whereClause = `WHERE ${conditions.join(' AND ')}`

    const rows = await query(
      `SELECT p.*,
              COALESCE(json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL), '[]') AS images
       FROM products p
       LEFT JOIN product_images pi ON pi.product_id = p.id
       ${whereClause}
       GROUP BY p.id
       ORDER BY p.sort_order, p.created_at DESC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    )

    const [{ count }] = await query<{ count: string }>(
      `SELECT COUNT(*) FROM products p ${whereClause}`,
      params.slice(0, params.length - 2)
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

export async function getProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const [product] = await query(
      `SELECT p.*,
              COALESCE(json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL), '[]') AS images
       FROM products p
       LEFT JOIN product_images pi ON pi.product_id = p.id
       WHERE p.id = $1 AND p.status != 'draft'
       GROUP BY p.id`,
      [req.params.id]
    )
    if (!product) return next(new AppError(404, 'Product not found'))
    res.json({ status: 'success', data: product })
  } catch (err) {
    next(err)
  }
}

export async function getFeaturedProducts(_req: Request, res: Response, next: NextFunction) {
  try {
    const rows = await query(
      `SELECT p.*,
              COALESCE(json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL), '[]') AS images
       FROM products p
       LEFT JOIN product_images pi ON pi.product_id = p.id
       WHERE p.featured = true AND p.status = 'published'
       GROUP BY p.id
       ORDER BY p.sort_order LIMIT 6`
    )
    res.json({ status: 'success', data: rows })
  } catch (err) {
    next(err)
  }
}

// ── Admin CRUD ──────────────────────────────────────────────────
const productSchema = z.object({
  sku:            z.string().min(1).max(50),
  series:         z.enum(['lacquer','future','master']),
  titleZh:        z.string().min(1).max(255),
  titleEn:        z.string().min(1).max(255),
  subtitle:       z.string().max(500).optional(),
  descriptionZh:  z.string().optional(),
  descriptionEn:  z.string().optional(),
  craftType:      z.enum(['qian_jin','mother_of_pearl','urushi','maki_e','3d_print','standard']).optional(),
  priceMin:       z.number().int().min(0),
  priceMax:       z.number().int().min(0),
  leadTimeDays:   z.number().int().min(1),
  featured:       z.boolean().default(false),
  sortOrder:      z.number().int().default(0),
  status:         z.enum(['draft','published','sold']).default('draft'),
  seoTitle:       z.string().max(255).optional(),
  seoDescription: z.string().max(500).optional(),
})

export async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const d = productSchema.parse(req.body)
    const [p] = await query(
      `INSERT INTO products (sku,series,title_zh,title_en,subtitle,description_zh,description_en,
         craft_type,price_min,price_max,lead_time_days,featured,sort_order,status,seo_title,seo_description)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *`,
      [d.sku,d.series,d.titleZh,d.titleEn,d.subtitle??null,d.descriptionZh??null,d.descriptionEn??null,
       d.craftType??null,d.priceMin,d.priceMax,d.leadTimeDays,d.featured,d.sortOrder,d.status,
       d.seoTitle??null,d.seoDescription??null]
    )
    res.status(201).json({ status: 'success', data: p })
  } catch (err) {
    next(err)
  }
}

export async function updateProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const d = productSchema.partial().parse(req.body)
    const fields = Object.entries({
      sku: d.sku, series: d.series, title_zh: d.titleZh, title_en: d.titleEn,
      subtitle: d.subtitle, description_zh: d.descriptionZh, description_en: d.descriptionEn,
      craft_type: d.craftType, price_min: d.priceMin, price_max: d.priceMax,
      lead_time_days: d.leadTimeDays, featured: d.featured, sort_order: d.sortOrder,
      status: d.status, seo_title: d.seoTitle, seo_description: d.seoDescription,
    }).filter(([, v]) => v !== undefined)

    if (!fields.length) return next(new AppError(400, 'No fields to update'))

    const setClause = fields.map(([k], i) => `${k} = $${i + 2}`).join(', ')
    const updated = await queryOne(
      `UPDATE products SET ${setClause} WHERE id = $1 RETURNING *`,
      [req.params.id, ...fields.map(([, v]) => v)]
    )
    if (!updated) return next(new AppError(404, 'Product not found'))
    res.json({ status: 'success', data: updated })
  } catch (err) {
    next(err)
  }
}

export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await query('DELETE FROM products WHERE id = $1 RETURNING id', [req.params.id])
    if (!result.length) return next(new AppError(404, 'Product not found'))
    res.json({ status: 'success', message: 'Product deleted' })
  } catch (err) {
    next(err)
  }
}

import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { query, queryOne } from '../db/connection'
import { AppError } from '../middleware/errorHandler'

export async function listGallery(req: Request, res: Response, next: NextFunction) {
  try {
    const category = req.query.category as string | undefined
    const featured = req.query.featured === 'true'
    const page     = Math.max(1, parseInt(req.query.page as string ?? '1'))
    const pageSize = Math.min(100, parseInt(req.query.pageSize as string ?? '24'))
    const offset   = (page - 1) * pageSize

    const conditions: string[] = []
    const params: unknown[]    = []

    if (category) { params.push(category); conditions.push(`category = $${params.length}`) }
    if (featured)   conditions.push('is_featured = true')

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
    params.push(pageSize, offset)

    const rows = await query(
      `SELECT * FROM gallery_items ${where}
       ORDER BY sort_order, created_at DESC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    )

    const [{ count }] = await query<{ count: string }>(
      `SELECT COUNT(*) FROM gallery_items ${where}`,
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

export async function getGalleryItem(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await queryOne('SELECT * FROM gallery_items WHERE id = $1', [req.params.id])
    if (!item) return next(new AppError(404, 'Gallery item not found'))
    res.json({ status: 'success', data: item })
  } catch (err) {
    next(err)
  }
}

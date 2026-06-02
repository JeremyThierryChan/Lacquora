import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { query, queryOne } from '../db/connection'
import { AppError } from '../middleware/errorHandler'

export async function listPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const category = req.query.category as string | undefined
    const page     = Math.max(1, parseInt(req.query.page as string ?? '1'))
    const pageSize = Math.min(20, parseInt(req.query.pageSize as string ?? '10'))
    const offset   = (page - 1) * pageSize

    const conditions = ["status = 'published'"]
    const params: unknown[] = []

    if (category) { params.push(category); conditions.push(`category = $${params.length}`) }

    const where = `WHERE ${conditions.join(' AND ')}`
    params.push(pageSize, offset)

    const rows = await query(
      `SELECT id, slug, category, title_zh, title_en, excerpt_zh, excerpt_en,
              cover_image, tags, read_time_min, view_count, published_at, created_at
       FROM journal_posts ${where}
       ORDER BY published_at DESC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    )

    const [{ count }] = await query<{ count: string }>(
      `SELECT COUNT(*) FROM journal_posts ${where}`,
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

export async function getPost(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await queryOne(
      `SELECT * FROM journal_posts WHERE slug = $1 AND status = 'published'`,
      [req.params.slug]
    )
    if (!post) return next(new AppError(404, 'Post not found'))

    await query('UPDATE journal_posts SET view_count = view_count + 1 WHERE slug = $1', [req.params.slug])

    res.json({ status: 'success', data: post })
  } catch (err) {
    next(err)
  }
}

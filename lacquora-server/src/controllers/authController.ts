import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { queryOne } from '../db/connection'
import { signToken } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(8),
})

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await queryOne<{
      id: string; email: string; password_hash: string; role: string; name: string; is_active: boolean
    }>(
      'SELECT id, email, password_hash, role, name, is_active FROM users WHERE email = $1',
      [email]
    )

    if (!user || !user.is_active) return next(new AppError(401, 'Invalid credentials'))

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) return next(new AppError(401, 'Invalid credentials'))

    await queryOne('UPDATE users SET last_login_at = NOW() WHERE id = $1', [user.id])

    const token = signToken({ userId: user.id, email: user.email, role: user.role })

    res.json({
      status: 'success',
      data: {
        token,
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      },
    })
  } catch (err) {
    next(err)
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await queryOne<{ id: string; email: string; name: string; role: string }>(
      'SELECT id, email, name, role FROM users WHERE id = $1',
      [req.user!.userId]
    )
    if (!user) return next(new AppError(404, 'User not found'))
    res.json({ status: 'success', data: user })
  } catch (err) {
    next(err)
  }
}

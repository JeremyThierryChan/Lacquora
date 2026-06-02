import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { env } from '../config/env'

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function notFound(req: Request, res: Response) {
  res.status(404).json({ status: 'error', message: `Route ${req.method} ${req.path} not found` })
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(err.details && { details: err.details }),
    })
    return
  }

  if (err instanceof ZodError) {
    const details: Record<string, string[]> = {}
    for (const issue of err.issues) {
      const key = issue.path.join('.')
      if (!details[key]) details[key] = []
      details[key].push(issue.message)
    }
    res.status(422).json({ status: 'error', message: 'Validation failed', details })
    return
  }

  console.error('Unhandled error:', err)
  res.status(500).json({
    status: 'error',
    message: env.isDev() ? err.message : 'Internal server error',
  })
}

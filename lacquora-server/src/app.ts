import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import path from 'path'
import { env } from './config/env'
import { globalLimiter } from './middleware/rateLimiter'
import { errorHandler, notFound } from './middleware/errorHandler'
import publicRoutes from './routes/index'
import adminRoutes  from './routes/admin'

const app = express()

// ── Security ──────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}))

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || env.cors.origins.includes(origin)) return cb(null, true)
    cb(new Error(`CORS: origin ${origin} not allowed`))
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}))

// ── General middleware ─────────────────────────────────────────
app.use(compression())
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true, limit: '2mb' }))
app.use(morgan(env.isDev() ? 'dev' : 'combined'))
app.use(globalLimiter)

// ── Static uploads ─────────────────────────────────────────────
app.use('/uploads', express.static(path.resolve(env.upload.dir)))

// ── Health check ───────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), env: env.NODE_ENV })
})

// ── API routes ─────────────────────────────────────────────────
app.use('/api/v1',       publicRoutes)
app.use('/api/v1/admin', adminRoutes)

// ── 404 + error handler ────────────────────────────────────────
app.use(notFound)
app.use(errorHandler)

export default app

import dotenv from 'dotenv'
dotenv.config()

function required(key: string): string {
  const val = process.env[key]
  if (!val) throw new Error(`Missing required env var: ${key}`)
  return val
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: parseInt(process.env.PORT ?? '3001', 10),

  db: {
    host:     process.env.DB_HOST     ?? 'localhost',
    port:     parseInt(process.env.DB_PORT ?? '5432', 10),
    name:     process.env.DB_NAME     ?? 'lacquora',
    user:     process.env.DB_USER     ?? 'lacquora_user',
    password: process.env.DB_PASSWORD ?? 'password',
  },

  jwt: {
    secret:    process.env.JWT_SECRET    ?? 'dev_secret_change_in_production',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  },

  smtp: {
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT ?? '587', 10),
    user: process.env.SMTP_USER ?? '',
    pass: process.env.SMTP_PASS ?? '',
    from: process.env.EMAIL_FROM ?? 'LACQUORA Studio <studio@lacquora.com>',
    admin: process.env.EMAIL_ADMIN ?? 'admin@lacquora.com',
  },

  upload: {
    dir:        process.env.UPLOAD_DIR       ?? './uploads',
    maxSizeMb:  parseInt(process.env.MAX_FILE_SIZE_MB ?? '10', 10),
  },

  cors: {
    origins: (process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173').split(','),
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? '900000', 10),
    max:      parseInt(process.env.RATE_LIMIT_MAX ?? '100', 10),
  },

  isDev:  () => env.NODE_ENV === 'development',
  isProd: () => env.NODE_ENV === 'production',
}

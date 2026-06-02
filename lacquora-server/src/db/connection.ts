import { Pool } from 'pg'
import { env } from '../config/env'

export const pool = new Pool({
  host:     env.db.host,
  port:     env.db.port,
  database: env.db.name,
  user:     env.db.user,
  password: env.db.password,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.on('error', (err) => {
  console.error('Unexpected database pool error:', err)
})

export async function query<T = Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  if (env.isDev()) {
    console.log('query', { text: text.slice(0, 80), duration, rows: res.rowCount })
  }
  return res.rows as T[]
}

export async function queryOne<T = Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<T | null> {
  const rows = await query<T>(text, params)
  return rows[0] ?? null
}

export async function testConnection(): Promise<void> {
  const client = await pool.connect()
  try {
    await client.query('SELECT NOW()')
    console.log('✓ Database connected')
  } finally {
    client.release()
  }
}

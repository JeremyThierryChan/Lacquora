import app from './app'
import { env } from './config/env'
import { testConnection } from './db/connection'
import { verifySmtp } from './services/emailService'
import fs from 'fs'
import path from 'path'

async function start() {
  console.log(`\n  LACQUORA API  —  ${env.NODE_ENV}\n`)

  // Ensure upload directories exist
  const dirs = [env.upload.dir, path.join(env.upload.dir, 'pdfs'), path.join(env.upload.dir, 'images')]
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  }

  // Verify dependencies
  await testConnection()
  await verifySmtp()

  app.listen(env.PORT, () => {
    console.log(`\n  ✓ Server running at http://localhost:${env.PORT}`)
    console.log(`  ✓ API base:        http://localhost:${env.PORT}/api/v1`)
    console.log(`  ✓ Admin API:       http://localhost:${env.PORT}/api/v1/admin`)
    console.log(`  ✓ Health check:    http://localhost:${env.PORT}/health\n`)
  })
}

start().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})

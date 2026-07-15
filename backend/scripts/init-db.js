import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import 'dotenv/config'
import { pool } from '../db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const schemaPath = path.join(__dirname, '..', 'schema.sql')

async function main() {
  const sql = readFileSync(schemaPath, 'utf8')
  console.log('Applying schema.sql to the database...')
  await pool.query(sql)
  console.log('Done. Tables ready: contact_messages, chat_logs')
  await pool.end()
}

main().catch((err) => {
  console.error('Failed to initialize database:', err.message)
  process.exit(1)
})

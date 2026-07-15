import pg from 'pg'
import 'dotenv/config'

const { Pool } = pg

// Prefer a single DATABASE_URL (works well with most hosted Postgres
// providers), but fall back to discrete PG* vars for local setups.
const connectionConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false,
    }
  : {
      host: process.env.PGHOST || 'localhost',
      port: Number(process.env.PGPORT) || 5432,
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      database: process.env.PGDATABASE || 'della_portfolio',
    }

export const pool = new Pool(connectionConfig)

pool.on('error', (err) => {
  console.error('Unexpected Postgres error on idle client', err)
})

export async function query(text, params) {
  return pool.query(text, params)
}

import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

// Admin auth: a single shared key sent as `Authorization: Bearer <ADMIN_KEY>`.
// Uses a constant-time-ish comparison to avoid trivial timing leaks.
function keyIsValid(provided) {
  const expected = process.env.ADMIN_KEY
  if (!expected || !provided) return false
  if (provided.length !== expected.length) return false
  let diff = 0
  for (let i = 0; i < expected.length; i++) {
    diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return diff === 0
}

function requireAdmin(req, res, next) {
  if (!process.env.ADMIN_KEY) {
    return res.status(503).json({ error: 'Admin access is not configured (ADMIN_KEY not set).' })
  }
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!keyIsValid(token)) {
    return res.status(401).json({ error: 'Unauthorized.' })
  }
  next()
}

// Validate a key without returning data — powers the login screen.
router.post('/login', (req, res) => {
  const key = (req.body && req.body.key) || ''
  if (!process.env.ADMIN_KEY) {
    return res.status(503).json({ error: 'Admin access is not configured (ADMIN_KEY not set).' })
  }
  if (!keyIsValid(key)) {
    return res.status(401).json({ error: 'Incorrect admin key.' })
  }
  return res.json({ ok: true })
})

// High-level counts for the dashboard header.
router.get('/stats', requireAdmin, async (req, res) => {
  try {
    const [messages, chats, sessions] = await Promise.all([
      query('SELECT COUNT(*)::int AS n FROM contact_messages'),
      query('SELECT COUNT(*)::int AS n FROM chat_logs'),
      query('SELECT COUNT(DISTINCT session_id)::int AS n FROM chat_logs WHERE session_id IS NOT NULL'),
    ])
    return res.json({
      messages: messages.rows[0].n,
      chatMessages: chats.rows[0].n,
      chatSessions: sessions.rows[0].n,
    })
  } catch (err) {
    console.error('Failed to load admin stats:', err)
    return res.status(500).json({ error: 'Could not load stats.' })
  }
})

// All contact submissions, newest first.
router.get('/messages', requireAdmin, async (req, res) => {
  try {
    const result = await query(
      `SELECT id, name, email, message, created_at
       FROM contact_messages ORDER BY created_at DESC LIMIT 500`
    )
    return res.json({ messages: result.rows })
  } catch (err) {
    console.error('Failed to load contact messages:', err)
    return res.status(500).json({ error: 'Could not load messages.' })
  }
})

// AI chat logs grouped into conversations by session_id.
router.get('/chats', requireAdmin, async (req, res) => {
  try {
    const result = await query(
      `SELECT id, role, content, session_id, created_at
       FROM chat_logs ORDER BY created_at DESC LIMIT 1000`
    )
    // Group by session; rows with no session become their own bucket keyed by id.
    const sessions = new Map()
    for (const row of result.rows) {
      const key = row.session_id || `msg-${row.id}`
      if (!sessions.has(key)) {
        sessions.set(key, { sessionId: row.session_id, lastAt: row.created_at, messages: [] })
      }
      sessions.get(key).messages.push(row)
    }
    // Order messages within a session oldest-first for readability.
    const conversations = [...sessions.values()].map((s) => ({
      ...s,
      messages: s.messages.slice().reverse(),
    }))
    return res.json({ conversations })
  } catch (err) {
    console.error('Failed to load chat logs:', err)
    return res.status(500).json({ error: 'Could not load chat logs.' })
  }
})

export default router

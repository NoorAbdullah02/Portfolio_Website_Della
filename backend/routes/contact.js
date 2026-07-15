import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

router.post('/', async (req, res) => {
  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are all required.' })
  }
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid field types.' })
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' })
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: 'Message is too long (5000 character limit).' })
  }

  try {
    const result = await query(
      `INSERT INTO contact_messages (name, email, message)
       VALUES ($1, $2, $3)
       RETURNING id, created_at`,
      [name.trim(), email.trim(), message.trim()]
    )
    return res.status(201).json({ ok: true, id: result.rows[0].id })
  } catch (err) {
    console.error('Failed to save contact message:', err)
    return res.status(500).json({ error: 'Could not save your message right now. Please try again shortly.' })
  }
})

// Lets the site owner review submissions, e.g. GET /api/contact?key=...
router.get('/', async (req, res) => {
  if (!process.env.ADMIN_KEY || req.query.key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized.' })
  }
  try {
    const result = await query(
      `SELECT id, name, email, message, created_at
       FROM contact_messages ORDER BY created_at DESC LIMIT 100`
    )
    return res.json({ messages: result.rows })
  } catch (err) {
    console.error('Failed to fetch contact messages:', err)
    return res.status(500).json({ error: 'Could not load messages.' })
  }
})

export default router

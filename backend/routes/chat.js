import { Router } from 'express'
import { Mistral } from '@mistralai/mistralai'
import { query } from '../db.js'
import { PROFILE_CONTEXT } from '../data/profile.js'

const router = Router()

const mistral = process.env.MISTRAL_API_KEY
  ? new Mistral({ apiKey: process.env.MISTRAL_API_KEY })
  : null

const MODEL = process.env.MISTRAL_MODEL || 'mistral-large-latest'

const SYSTEM_PROMPT = `You are the AI assistant embedded in Mursheda Nusrat Della's personal portfolio website.
Answer only using the CV information provided below. Speak about Della in the third person,
in a warm, professional, concise tone (2-5 sentences per answer unless more detail is clearly requested).
If asked something the CV does not cover, say you don't have that information rather than guessing,
and suggest the visitor use the contact form to ask Della directly.
Do not invent publications, dates, or credentials that are not listed below.

--- DELLA'S CV ---
${PROFILE_CONTEXT}
--- END CV ---`

const MAX_HISTORY = 12

router.post('/', async (req, res) => {
  if (!mistral) {
    return res.status(503).json({
      error: 'The AI assistant is not configured yet. Set MISTRAL_API_KEY in the backend .env file.',
    })
  }

  const { messages } = req.body || {}
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required.' })
  }

  const trimmed = messages.slice(-MAX_HISTORY).filter((m) => m && typeof m.content === 'string' && m.content.trim())
  const lastUserMessage = [...trimmed].reverse().find((m) => m.role === 'user')

  try {
    const completion = await mistral.chat.complete({
      model: MODEL,
      maxTokens: 512,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...trimmed.map((m) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content,
        }))
      ],
    })

    const reply = completion.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't come up with an answer to that — could you rephrase?"

    // Best-effort logging; the chat still works even if this fails.
    if (lastUserMessage) {
      query(
        `INSERT INTO chat_logs (role, content, session_id) VALUES ($1, $2, $3), ($4, $5, $6)`,
        ['user', lastUserMessage.content, req.body.sessionId || null, 'assistant', reply, req.body.sessionId || null]
      ).catch((err) => console.error('Failed to log chat message:', err.message))
    }

    return res.json({ reply })
  } catch (err) {
    console.error('Mistral API error:', err)
    return res.status(502).json({ error: 'The AI assistant is temporarily unavailable. Please try again.' })
  }
})

export default router

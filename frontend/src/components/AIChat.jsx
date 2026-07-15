import { useEffect, useRef, useState } from 'react'
import { sendChatMessage } from '../lib/api.js'

const GREETING = {
  role: 'assistant',
  content: "Hi, I'm Della's AI assistant. Ask me about her research, publications, teaching, or experience — I'll answer from her CV.",
}

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, loading, open])

  async function onSubmit(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const next = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setLoading(true)
    setError('')

    try {
      const { reply } = await sendChatMessage(next)
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    } catch (err) {
      setError(err.message || 'The assistant is unavailable right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`aichat ${open ? 'aichat--open' : ''}`}>
      {open && (
        <div className="aichat__panel card">
          <div className="aichat__head">
            <div>
              <span className="aichat__head-title">Ask about Della</span>
              <span className="aichat__head-sub">AI assistant · grounded in her CV</span>
            </div>
            <button className="aichat__close" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </div>

          <div className="aichat__list" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`aichat__msg aichat__msg--${m.role}`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="aichat__msg aichat__msg--assistant aichat__msg--loading">Thinking…</div>}
            {error && <div className="aichat__msg aichat__msg--error">{error}</div>}
          </div>

          <form className="aichat__form" onSubmit={onSubmit}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. What is her M.Sc. thesis about?"
              disabled={loading}
            />
            <button className="btn primary" type="submit" disabled={loading || !input.trim()}>Send</button>
          </form>
        </div>
      )}

      <button className="aichat__toggle" onClick={() => setOpen((v) => !v)}>
        <span className="aichat__toggle-dot" />
        {open ? 'Close' : 'Ask AI about Della'}
      </button>
    </div>
  )
}

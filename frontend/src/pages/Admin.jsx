import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle.jsx'
import {
  adminLogin,
  fetchAdminStats,
  fetchAdminMessages,
  fetchAdminChats,
} from '../lib/api.js'

const KEY_STORAGE = 'della-admin-key'

function formatDate(value) {
  if (!value) return ''
  const d = new Date(value)
  return d.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function LoginScreen({ onAuthed }) {
  const [key, setKey] = useState('')
  const [status, setStatus] = useState('idle') // idle | checking | error
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setStatus('checking')
    setError('')
    try {
      await adminLogin(key)
      sessionStorage.setItem(KEY_STORAGE, key)
      onAuthed(key)
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Login failed.')
    }
  }

  return (
    <div className="admin-login">
      <form className="card admin-login__card" onSubmit={onSubmit}>
        <div className="eyebrow">Admin access</div>
        <h1 className="admin-login__title">Della — Control Room</h1>
        <p className="admin-login__sub">
          Enter the admin key to review contact messages and AI chat logs.
        </p>
        <label className="field">
          <span>Admin key</span>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Your ADMIN_KEY"
            autoFocus
          />
        </label>
        <button className="btn primary" type="submit" disabled={status === 'checking' || !key}>
          {status === 'checking' ? 'Checking…' : 'Enter dashboard'}
        </button>
        {status === 'error' && <p className="field__note field__note--err">{error}</p>}
        <Link to="/" className="admin-login__back">← Back to site</Link>
      </form>
    </div>
  )
}

function Stat({ n, label }) {
  return (
    <div className="card admin-stat">
      <span className="admin-stat__num">{n ?? '—'}</span>
      <span className="admin-stat__label">{label}</span>
    </div>
  )
}

function Dashboard({ adminKey, onLogout }) {
  const [tab, setTab] = useState('messages') // messages | chats
  const [stats, setStats] = useState(null)
  const [messages, setMessages] = useState([])
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [s, m, c] = await Promise.all([
        fetchAdminStats(adminKey),
        fetchAdminMessages(adminKey),
        fetchAdminChats(adminKey),
      ])
      setStats(s)
      setMessages(m.messages || [])
      setConversations(c.conversations || [])
    } catch (err) {
      setError(err.message || 'Failed to load data.')
      // If the key stopped working, force re-login.
      if (/unauthor/i.test(err.message || '')) onLogout()
    } finally {
      setLoading(false)
    }
  }, [adminKey, onLogout])

  useEffect(() => { load() }, [load])

  return (
    <div className="admin">
      <header className="admin__bar">
        <div className="admin__bar-left">
          <span className="nav__mark-dot" />
          <span className="admin__brand">Della · Control Room</span>
        </div>
        <div className="admin__bar-right">
          <button className="btn admin__refresh" onClick={load} disabled={loading}>
            {loading ? 'Loading…' : 'Refresh'}
          </button>
          <ThemeToggle />
          <Link to="/" className="btn">View site</Link>
          <button className="btn" onClick={onLogout}>Log out</button>
        </div>
      </header>

      <div className="admin__body wrap">
        <div className="admin__stats">
          <Stat n={stats?.messages} label="Contact messages" />
          <Stat n={stats?.chatSessions} label="AI chat sessions" />
          <Stat n={stats?.chatMessages} label="AI chat messages" />
        </div>

        <div className="admin__tabs">
          <button
            className={`admin__tab ${tab === 'messages' ? 'is-active' : ''}`}
            onClick={() => setTab('messages')}
          >
            Contact messages
          </button>
          <button
            className={`admin__tab ${tab === 'chats' ? 'is-active' : ''}`}
            onClick={() => setTab('chats')}
          >
            AI chat logs
          </button>
        </div>

        {error && <p className="field__note field__note--err admin__error">{error}</p>}

        {tab === 'messages' && (
          <div className="admin__panel card">
            {messages.length === 0 && !loading && <p className="admin__empty">No messages yet.</p>}
            {messages.map((m) => (
              <article className="admin-msg" key={m.id}>
                <div className="admin-msg__head">
                  <div>
                    <span className="admin-msg__name">{m.name}</span>
                    <a className="admin-msg__email" href={`mailto:${m.email}`}>{m.email}</a>
                  </div>
                  <time className="admin-msg__time">{formatDate(m.created_at)}</time>
                </div>
                <p className="admin-msg__body">{m.message}</p>
              </article>
            ))}
          </div>
        )}

        {tab === 'chats' && (
          <div className="admin__chats">
            {conversations.length === 0 && !loading && <p className="admin__empty">No chat logs yet.</p>}
            {conversations.map((conv, i) => (
              <div className="admin__panel card admin-conv" key={conv.sessionId || i}>
                <div className="admin-conv__head">
                  <span className="admin-conv__id">
                    {conv.sessionId ? `Session ${conv.sessionId.slice(0, 8)}` : 'Anonymous'}
                  </span>
                  <time className="admin-msg__time">{formatDate(conv.lastAt)}</time>
                </div>
                <div className="admin-conv__thread">
                  {conv.messages.map((msg) => (
                    <div className={`admin-turn admin-turn--${msg.role}`} key={msg.id}>
                      <span className="admin-turn__role">{msg.role === 'user' ? 'Visitor' : 'AI'}</span>
                      <p className="admin-turn__text">{msg.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Admin() {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem(KEY_STORAGE) || '')

  function logout() {
    sessionStorage.removeItem(KEY_STORAGE)
    setAdminKey('')
  }

  if (!adminKey) return <LoginScreen onAuthed={setAdminKey} />
  return <Dashboard adminKey={adminKey} onLogout={logout} />
}

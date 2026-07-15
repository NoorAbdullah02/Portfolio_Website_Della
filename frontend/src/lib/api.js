// Vite dev server proxies /api to the Express backend (see vite.config.js).
// In production, set VITE_API_BASE to your deployed backend URL.
const API_BASE = import.meta.env.VITE_API_BASE || ''

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`)
  }
  return data
}

export function sendContactMessage(payload) {
  return request('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function sendChatMessage(messages) {
  return request('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ messages }),
  })
}

// ---- Admin ----
// The admin key is passed as a Bearer token on each protected request.
function authHeaders(key) {
  return { Authorization: `Bearer ${key}` }
}

export function adminLogin(key) {
  return request('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ key }),
  })
}

export function fetchAdminStats(key) {
  return request('/api/admin/stats', { headers: authHeaders(key) })
}

export function fetchAdminMessages(key) {
  return request('/api/admin/messages', { headers: authHeaders(key) })
}

export function fetchAdminChats(key) {
  return request('/api/admin/chats', { headers: authHeaders(key) })
}

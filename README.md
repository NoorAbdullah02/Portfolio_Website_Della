# Mursheda Nusrat Della — Portfolio

A full-stack portfolio website built from Della's CV:

- **Frontend:** React + Vite, hand-crafted design system ("Coherence Field" theme — deep ink
  background, gold + teal accents, animated network hero built with Canvas)
- **Backend:** Node.js + Express REST API
- **Database:** PostgreSQL (contact messages + AI chat logs)
- **AI integration:** A floating "Ask AI about Della" assistant, powered by the Claude API,
  grounded strictly in her CV content

```
della-portfolio/
├── frontend/     React + Vite site
└── backend/      Express API + Postgres
```

## 1. Prerequisites

- Node.js 18+
- A PostgreSQL database (local install, Docker, or a hosted service like Supabase/Neon/Railway)
- An Anthropic API key from https://console.anthropic.com (only needed for the AI chat widget —
  everything else works without it)

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# edit .env: set DATABASE_URL (or PG* vars) and ANTHROPIC_API_KEY
npm run db:init      # creates the contact_messages and chat_logs tables
npm run dev           # starts the API on http://localhost:3001
```

Quick local Postgres with Docker, if you don't already have one running:

```bash
docker run --name della-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=della_portfolio -p 5432:5432 -d postgres:16
```

## 3. Frontend setup

In a second terminal:

```bash
cd frontend
npm install
npm run dev            # starts the site on http://localhost:3000
```

The Vite dev server proxies `/api/*` requests to the backend (see `frontend/vite.config.js`), so
no extra configuration is needed locally.

## 4. What's wired up

- **Contact form** (`#contact`) — POSTs to `/api/contact`, which validates and inserts a row into
  the `contact_messages` Postgres table.
- **Admin panel** (`/admin`) — a password-protected dashboard to review contact messages and AI chat
  logs. Log in with your `ADMIN_KEY` (from `backend/.env`). The key is checked by `POST /api/admin/login`
  and sent as a `Bearer` token on every protected request (`/api/admin/stats`, `/messages`, `/chats`).
  It is kept only in the browser's `sessionStorage`, so closing the tab logs you out.
- **AI assistant** (bottom-right floating button) — POSTs the conversation to `/api/chat`, which
  calls the Mistral API (`MISTRAL_MODEL`, default `mistral-large-latest`) with a system prompt
  grounded in `backend/data/profile.js` (Della's CV, transcribed). Every exchange is also logged
  to the `chat_logs` table and viewable in the admin panel.
- **Owner photo** — `frontend/src/assets/della-photo.png`, extracted from the uploaded CV, shown
  in the hero section.

### Ports

macOS reserves port 5000 (AirPlay Receiver), so this project uses:

- **Frontend (Vite):** http://localhost:3000
- **Backend (Express):** http://localhost:3001

The Vite dev server proxies `/api/*` to the backend, so no extra config is needed locally.

## 5. Deploying

- **Frontend:** `npm run build` in `frontend/` produces a static `dist/` folder — deploy to
  Vercel, Netlify, Cloudflare Pages, etc. Set `VITE_API_BASE` to your backend's public URL.
- **Backend:** deploy `backend/` to Render, Railway, Fly.io, or any Node host. Set the same env
  vars as `.env.example`, pointing `DATABASE_URL` at your production Postgres instance and
  `CORS_ORIGIN` at your deployed frontend's URL.
- Run `npm run db:init` once against the production database before first use.

## 6. Customizing content

All CV-derived content lives directly in the React components under `frontend/src/components/`
(e.g. `Publications.jsx`, `Experience.jsx`, `Achievements.jsx`) as plain arrays — edit those to
update copy. The AI assistant's knowledge lives separately in `backend/data/profile.js`; keep the
two in sync if you make factual changes.

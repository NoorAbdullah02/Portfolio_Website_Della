import { useState } from 'react'
import { sendContactMessage } from '../lib/api.js'

const INITIAL = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      await sendContactMessage(form)
      setStatus('sent')
      setForm(INITIAL)
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="section-alt">
      <div className="wrap contact__grid">
        <div className="reveal">
          <div className="eyebrow">Get in touch</div>
          <h2 className="section-head-solo">Teaching collaborations, research, or just to say hello.</h2>
          <p className="lede" style={{ marginTop: 18 }}>
            Messages are saved directly to the database and I read every one.
            For anything urgent, reach me by phone or email below.
          </p>

          <div className="contact__details">
            <a href="mailto:nusratdella.026@bauet.ac.bd" className="contact__detail">
              <span className="contact__detail-label">Email</span>
              nusratdella.026@bauet.ac.bd
            </a>
            <a href="tel:+8801707533471" className="contact__detail">
              <span className="contact__detail-label">Phone</span>
              +880 1707 533471
            </a>
            <a href="https://www.linkedin.com/in/nusratdella026" target="_blank" rel="noreferrer" className="contact__detail">
              <span className="contact__detail-label">LinkedIn</span>
              linkedin.com/in/nusratdella026
            </a>
            <span className="contact__detail">
              <span className="contact__detail-label">Based in</span>
              Laxmipur Vatapara, Rajshahi, Bangladesh
            </span>
          </div>
        </div>

        <form className="card contact__form reveal" onSubmit={onSubmit}>
          <label className="field">
            <span>Name</span>
            <input required value={form.name} onChange={update('name')} placeholder="Your full name" />
          </label>
          <label className="field">
            <span>Email</span>
            <input required type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea required rows={5} value={form.message} onChange={update('message')} placeholder="What would you like to discuss?" />
          </label>

          <button className="btn primary" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'sent' && <p className="field__note field__note--ok">Thank you — your message has been received.</p>}
          {status === 'error' && <p className="field__note field__note--err">{error}</p>}
        </form>
      </div>
    </section>
  )
}

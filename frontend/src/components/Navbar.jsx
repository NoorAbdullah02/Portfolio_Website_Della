import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle.jsx'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#research', label: 'Research' },
  { href: '#projects', label: 'Projects' },
  { href: '#publications', label: 'Publications' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="wrap nav__inner">
        <a href="#top" className="nav__mark">
          <span className="nav__mark-dot" />
          M. N. Della
        </a>

        <nav className="nav__links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <div className="nav__end">
          <ThemeToggle />
          <a href="#contact" className="btn primary nav__cta">Get in touch</a>
        </div>

        <button className="nav__burger" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <div className="nav__mobile">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <div className="nav__mobile-row">
            <ThemeToggle />
            <a href="#contact" className="btn primary" onClick={() => setOpen(false)}>Get in touch</a>
          </div>
        </div>
      )}
    </header>
  )
}

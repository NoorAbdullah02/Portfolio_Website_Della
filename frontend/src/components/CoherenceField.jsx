import { useEffect, useRef } from 'react'

/**
 * The page's signature element: a slowly drifting field of nodes and
 * coherence-links, standing in for Della's thesis theme — a
 * "coherence-driven ensemble" that pulls scattered signals into one
 * confident read. Pure canvas, no deps, respects reduced-motion.
 *
 * Immersive layer: the pointer becomes a soft attractor — nearby nodes lean
 * toward the cursor and a vivid glow tracks it, so the field feels alive.
 */
export default function CoherenceField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width, height, dpr
    let nodes = []
    let raf
    let focusIndex = 0
    let focusTimer = 0
    // pointer in css px; -1 means "no pointer over the hero"
    const pointer = { x: -1, y: -1, active: false }

    const PALETTES = {
      dark: { gold: '201,168,104', teal: '94,224,196', violet: '139,123,255' },
      light: { gold: '169,128,58', teal: '18,164,135', violet: '106,90,224' },
    }
    const colorsFor = () =>
      PALETTES[document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark']
    let COLORS = colorsFor()

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.parentElement.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initNodes()
    }

    function initNodes() {
      const count = width < 520 ? 22 : 40
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.6 + 1,
        hue: i % 5 === 0 ? 'gold' : i % 7 === 0 ? 'violet' : 'teal',
      }))
    }

    function step() {
      ctx.clearRect(0, 0, width, height)

      // soft glow that follows the cursor
      if (pointer.active) {
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 160)
        g.addColorStop(0, `rgba(${COLORS.teal}, 0.16)`)
        g.addColorStop(1, `rgba(${COLORS.teal}, 0)`)
        ctx.fillStyle = g
        ctx.fillRect(0, 0, width, height)
      }

      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        // pointer attraction — a gentle lean toward the cursor
        if (pointer.active) {
          const dx = pointer.x - n.x
          const dy = pointer.y - n.y
          const d2 = dx * dx + dy * dy
          if (d2 < 200 * 200) {
            const f = (1 - Math.sqrt(d2) / 200) * 0.35
            n.x += dx * f * 0.02
            n.y += dy * f * 0.02
          }
        }
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
      })

      // links between near nodes -> "coherence"
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 150
          if (dist < maxDist) {
            const isFocus = i === focusIndex || j === focusIndex
            const alpha = (1 - dist / maxDist) * (isFocus ? 0.55 : 0.16)
            ctx.strokeStyle = `rgba(${isFocus ? COLORS.gold : COLORS.teal}, ${alpha})`
            ctx.lineWidth = isFocus ? 1.1 : 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // links from pointer to nearby nodes — you "pull" the field together
      if (pointer.active) {
        nodes.forEach((n) => {
          const dx = pointer.x - n.x, dy = pointer.y - n.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 170) {
            ctx.strokeStyle = `rgba(${COLORS.violet}, ${(1 - dist / 170) * 0.5})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(pointer.x, pointer.y)
            ctx.lineTo(n.x, n.y)
            ctx.stroke()
          }
        })
      }

      nodes.forEach((n, i) => {
        const isFocus = i === focusIndex
        const c = COLORS[n.hue]
        ctx.beginPath()
        ctx.arc(n.x, n.y, isFocus ? n.r * 2.2 : n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c}, ${isFocus ? 1 : 0.75})`
        ctx.fill()
        if (isFocus) {
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${c}, 0.08)`
          ctx.fill()
        }
      })

      focusTimer++
      if (focusTimer > 90) {
        focusTimer = 0
        focusIndex = Math.floor(Math.random() * nodes.length)
      }

      if (!prefersReduced) raf = requestAnimationFrame(step)
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    function onLeave() {
      pointer.active = false
    }

    resize()
    window.addEventListener('resize', resize)
    if (!prefersReduced) {
      const host = canvas.parentElement
      host.addEventListener('pointermove', onMove)
      host.addEventListener('pointerleave', onLeave)
    }
    const themeObserver = new MutationObserver(() => {
      COLORS = colorsFor()
      if (prefersReduced) step()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    if (!prefersReduced) {
      raf = requestAnimationFrame(step)
    } else {
      step()
    }

    return () => {
      window.removeEventListener('resize', resize)
      const host = canvas.parentElement
      if (host) {
        host.removeEventListener('pointermove', onMove)
        host.removeEventListener('pointerleave', onLeave)
      }
      themeObserver.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} className="coherence-field" aria-hidden="true" />
}

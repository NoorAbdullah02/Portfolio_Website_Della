import { useEffect } from 'react'

/**
 * A single delegated pointer handler that writes cursor position (as %) into
 * --mx/--my on whichever .card is under the pointer, powering the CSS spotlight.
 * One listener for the whole page — cheaper than per-card handlers.
 */
export default function useSpotlight() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    let pending = null

    const apply = () => {
      frame = 0
      if (!pending) return
      const { card, x, y } = pending
      card.style.setProperty('--mx', `${x}%`)
      card.style.setProperty('--my', `${y}%`)
    }

    const onMove = (e) => {
      const card = e.target.closest?.('.card')
      if (!card) return
      const rect = card.getBoundingClientRect()
      pending = {
        card,
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      }
      if (!frame) frame = requestAnimationFrame(apply)
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
}

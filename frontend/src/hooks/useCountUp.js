import { useEffect, useRef, useState } from 'react'

/**
 * Counts from 0 up to `target` once the element scrolls into view.
 * `suffix` (e.g. "+") is appended; a non-numeric target renders as-is.
 * Respects prefers-reduced-motion by snapping straight to the final value.
 */
export default function useCountUp(target, { duration = 1400, suffix = '' } = {}) {
  const ref = useRef(null)
  const numeric = typeof target === 'number'
  const [display, setDisplay] = useState(numeric ? `0${suffix}` : target)

  useEffect(() => {
    if (!numeric) return
    const el = ref.current
    if (!el) return

    const finish = () => setDisplay(`${target}${suffix}`)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish()
      return
    }

    let raf = 0
    let start = 0
    const tick = (t) => {
      if (!start) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(`${Math.round(eased * target)}${suffix}`)
      if (p < 1) raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          raf = requestAnimationFrame(tick)
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [target, duration, suffix, numeric])

  return [ref, display]
}

import { useEffect, useRef } from 'react'

/**
 * Adds an "in" class to elements with .reveal when they enter the viewport.
 * Elements inside a container marked [data-stagger] cascade in: each direct
 * .reveal child gets an incremental transition-delay so grids/lists ripple.
 */
export default function useReveal(deps = []) {
  const scopeRef = useRef(null)

  useEffect(() => {
    const scope = scopeRef.current || document

    // Assign staggered delays to reveal children of [data-stagger] containers.
    scope.querySelectorAll('[data-stagger]').forEach((container) => {
      const step = Number(container.getAttribute('data-stagger')) || 70
      container.querySelectorAll(':scope > .reveal').forEach((child, i) => {
        child.style.transitionDelay = `${i * step}ms`
      })
    })

    const els = scope.querySelectorAll('.reveal:not(.in)')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scopeRef
}

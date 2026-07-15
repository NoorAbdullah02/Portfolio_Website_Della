import useScrollProgress from '../hooks/useScrollProgress.js'

export default function ScrollProgress() {
  const ref = useScrollProgress()
  return <div className="scroll-progress" ref={ref} aria-hidden="true" />
}

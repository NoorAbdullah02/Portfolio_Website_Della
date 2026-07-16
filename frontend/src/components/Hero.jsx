import CoherenceField from './CoherenceField.jsx'
import useCountUp from '../hooks/useCountUp.js'
import useParallax from '../hooks/useParallax.js'

function Stat({ value, suffix, label }) {
  const [ref, display] = useCountUp(value, { suffix })
  return (
    <div>
      <span className="hero__stat-num" ref={ref}>{display}</span>
      <span className="hero__stat-label">{label}</span>
    </div>
  )
}

export default function Hero() {
  const portraitRef = useParallax(0.12)

  return (
    <section id="top" className="hero">
      <CoherenceField />
      <div className="wrap hero__inner">
        <div className="hero__copy reveal in">
          <div className="eyebrow">Lecturer · ICE Dept, BAUET — Natore</div>
          <p className="hero__name">Mursheda Nusrat Della</p>
          <h1 className="hero__title">
            Finding the <em>coherent signal</em><br />
            inside noisy, human data.
          </h1>
          <p className="hero__lede">
            An AI researcher and lecturer working across
            explainable machine learning, medical imaging, and computer vision.
            My thesis work turns scattered model opinions into one confident,
            explainable diagnosis; my classroom work does the same for students.
          </p>
          <div className="hero__actions">
            <a href="#research" className="btn primary">Explore my research</a>
            <a href="/CV%20Of%20Mursheda%20Nusrat%20Della.2026.pdf" className="btn" download>
              <span className="btn__icon" aria-hidden="true">↓</span>
              Download CV
            </a>
            <a href="#contact" className="btn btn--ghost">Say hello</a>
          </div>
          <div className="hero__stats">
            <Stat value={10} label="Publications & conference papers" />
            <Stat value={3} suffix="+" label="Years lecturing, ICE Dept" />
            <Stat value={5} label="Research interests, one thread: AI" />
          </div>
        </div>

        <div className="hero__portrait reveal in" ref={portraitRef}>
          <div className="hero__portrait-frame">
            <span className="hero__portrait-ring" aria-hidden="true" />
            <div className="hero__portrait-photo">
              <img src="/della.jpeg" alt="Portrait of Mursheda Nusrat Della" />
            </div>
          </div>
          <div className="hero__portrait-tag">
            <span className="dot" />
            M.Sc. CSE (RUET) & M.Sc. ICT (IU)
          </div>
        </div>
      </div>
    </section>
  )
}

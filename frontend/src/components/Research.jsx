const RESEARCH = [
  'Artificial Intelligence',
  'Explainable AI (XAI)',
  'Digital Image Processing',
  'Machine Learning',
  'Computer Vision',
  'Data Communication & Computer Networks',
]

const TEACHING = [
  'Fundamentals of ICT', 'Digital Electronics', 'Structured Programming (C)',
  'OOP (C++)', 'Data Structures & Algorithms', 'Java & Network Programming',
  'AI & Neural Networks', 'Information Theory & Coding', 'Internet & Web Programming',
  'Data Communication', 'Wireless Communication', 'Optical Fiber Communication',
  'Computer Networks', 'System Analysis & Software Engineering',
  'Network Security & Cyber Law', 'Digital Signal Processing', 'Database Management Systems',
]

const LITERACY = [
  { label: 'Languages', value: 'C, C++, Python (ML), Java, PHP' },
  { label: 'Database', value: 'MySQL' },
  { label: 'Web', value: 'HTML, CSS, Bootstrap, React JS' },
  { label: 'OS', value: 'Windows' },
]

export default function Research() {
  return (
    <section id="research" className="section-alt">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Research Interests</div>
          <h2>Where the work is headed.</h2>
        </div>

        <div className="research__tags reveal">
          {RESEARCH.map((r) => (
            <span className="tag tag--lg" key={r}><span className="dot" />{r}</span>
          ))}
        </div>

        <div className="research__cols">
          <div className="reveal">
            <h3 className="research__col-title">Teaching interests</h3>
            <div className="research__tags research__tags--small">
              {TEACHING.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </div>

          <div className="reveal">
            <h3 className="research__col-title">Technical literacy</h3>
            <div className="literacy">
              {LITERACY.map((l) => (
                <div className="literacy__row" key={l.label}>
                  <span className="literacy__label">{l.label}</span>
                  <span className="literacy__value">{l.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

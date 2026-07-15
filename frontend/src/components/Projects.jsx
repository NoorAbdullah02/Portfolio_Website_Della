const PROJECTS = [
  {
    name: 'Student Management System',
    stack: 'Java, PHP, JavaScript, HTML',
    role: 'Programmer · Testing · Idea',
  },
  {
    name: 'Attendance Management System',
    stack: 'PHP, JavaScript, HTML',
    role: 'Programmer',
  },
  {
    name: 'Campus Network Design',
    stack: 'Cisco Packet Tracer, CLI',
    role: 'Programmer',
  },
  {
    name: 'Password-Based Door Lock Security System',
    stack: 'Arduino Uno, C++, Keypad',
    role: 'Programmer · Designer · Idea',
  },
  {
    name: 'Blood Pressure Monitoring System',
    stack: 'Arduino Uno, C++',
    role: 'Programmer · Designer · Idea',
  },
]

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Projects Executed</div>
          <h2>Built things, end to end.</h2>
          <p className="lede">Software, embedded systems, and network design — each one carried from idea to working build.</p>
        </div>

        <div className="proj-grid" data-stagger="80">
          {PROJECTS.map((p, i) => (
            <div className="card proj-card reveal" key={p.name}>
              <span className="proj-card__index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="proj-card__name">{p.name}</h3>
              <p className="proj-card__stack">{p.stack}</p>
              <span className="tag proj-card__role"><span className="dot" />{p.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const ROLES = [
  {
    title: 'Lecturer, Dept. of Information & Communication Engineering',
    org: 'Bangladesh Army University of Engineering and Technology (BAUET), Natore',
    time: 'Dec 2022 — Present',
    note: 'Teaching AI, programming, and networking courses; supervising student projects.',
    current: true,
  },
  {
    title: 'Sales & Records Officer (Part-time)',
    org: 'AmazonPify Ltd, part of Amazon BD',
    time: 'Sep 2022 — Dec 2022',
  },
  {
    title: 'Brand Promoter (Intern)',
    org: 'Uber Technologies Inc, Rajshahi',
    time: 'Feb 2021 — May 2021',
  },
  {
    title: 'Technological Engineer (Intern)',
    org: 'Grameenphone (GP), Rajshahi',
    time: '1 month',
  },
  {
    title: 'Fast Track Future Leader (Intern)',
    org: 'HyperTag Solution Limited, Dhaka',
    time: '3 months',
  },
  {
    title: 'Graphics Design (Intern)',
    org: 'Women ICT Freelancer & Entrepreneur Development, Rajshahi City Corporation',
    time: '3 months',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section-alt">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Chronology of Employment</div>
          <h2>A path through telecom, platforms, and the classroom.</h2>
          <p className="lede">
            Six roles, one throughline: translate technical work into something a
            room full of people can actually use.
          </p>
        </div>

        <div className="timeline" data-stagger="90">
          {ROLES.map((r) => (
            <div className={`timeline__item reveal ${r.current ? 'timeline__item--current' : ''}`} key={r.title}>
              <div className="timeline__marker">
                <span className="timeline__dot" />
                <span className="timeline__stem" />
              </div>
              <div className="timeline__content">
                <span className="timeline__time">{r.time}</span>
                <h3 className="timeline__title">{r.title}</h3>
                <p className="timeline__org">{r.org}</p>
                {r.note && <p className="timeline__note">{r.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

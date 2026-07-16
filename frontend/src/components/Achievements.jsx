const ACHIEVEMENTS = [
  { title: "Dean's Award", org: 'BAUET', year: '2020–2021' },
  { title: 'Champion & Best Speaker', org: 'BAUET Debate Competition', year: '2021' },
  { title: 'Champion & Best Speaker', org: 'Intra Department Debating Program', year: '2021' },
  { title: 'Participant, Team BAUET', org: 'Prothom Alo Bondhusova (RU)', year: '2020' },
  { title: 'Champion & Best Speaker', org: 'Intra University Debating Program', year: '2019' },
  { title: 'Champion', org: 'Woman ICT Day, Graphics Design Competition', year: '2018' },
  { title: 'Champion & Best Speaker', org: 'Intra College Debating Program', year: '2016' },
  { title: 'Champion', org: 'Rajshahi Debating Club Program', year: '2013' },
  { title: 'Division Champion', org: 'Matador Master Buster', year: '2013' },
]

const LEADERSHIP = [
  { role: 'Assistant Advisor', org: 'BAUET ICT Club', time: '2023–Present' },
  { role: 'Assistant Advisor', org: 'BAUET Debating Society', time: '2023–Present' },
  { role: 'Assistant Advisor', org: 'BAUET Games, Sports & Gymnasium Club', time: '2023–Present' },
  { role: 'General Secretary', org: 'BAUET ICT Club', time: '2021–2022' },
  { role: 'General Secretary', org: 'BAUET Debating Society', time: '2020–2022' },
  { role: 'Head of Public & Relations', org: 'Hult Prize at BAUET', time: '2021–2022' },
  { role: 'Department Ambassador', org: 'Mind Strome 2.00', time: '2021' },
  { role: 'Executive Member', org: 'BAUET Career Club', time: '2018–2019' },
  { role: 'Trainer', org: 'Graphics Design Workshop, RCC', time: '2018' },
]

const SKILLS = [
  'Organizational leadership', 'Project management', 'Strong decision-making',
  'Complex problem solving', 'Graphics design', 'Public worker', 'Service-focused',
]

export default function Achievements() {
  return (
    <section id="achievements">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Achievements &amp; Leadership</div>
          <h2>The debate stage taught me to build a case — research taught me to test it.</h2>
        </div>

        <div className="ach-grid">
          <div className="reveal">
            <h3 className="research__col-title">Achievements</h3>
            <ul className="ach-list">
              {ACHIEVEMENTS.map((a) => (
                <li key={a.title + a.org}>
                  <span className="ach-list__title">{a.title}</span>
                  <span className="ach-list__org">{a.org}</span>
                  <span className="ach-list__year">{a.year}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <h3 className="research__col-title">Leadership &amp; extra-curricular</h3>
            <ul className="ach-list">
              {LEADERSHIP.map((l) => (
                <li key={l.role + l.org}>
                  <span className="ach-list__title">{l.role}</span>
                  <span className="ach-list__org">{l.org}</span>
                  <span className="ach-list__year">{l.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="skills-row reveal">
          {SKILLS.map((s) => (
            <span className="tag tag--lg" key={s}><span className="dot" />{s}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

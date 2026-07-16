const ROWS = [
  { exam: 'M.Sc.', major: 'Information & Communication Technology', inst: 'Islamic University, Kushtia, Bangladesh', year: 'Pursuing', result: '—' },
  { exam: 'M.Sc.', major: 'Computer Science & Engineering', inst: 'Rajshahi University of Engineering & Technology (RUET)', year: '2026', result: '3.50 / 4.00' },
  { exam: 'B.Sc.', major: 'Information & Communication Engineering', inst: 'Bangladesh Army University of Engineering & Technology (BAUET), Natore', year: '2022', result: '3.85 / 4.00' },
  { exam: 'HSC', major: 'Science', inst: 'Rajshahi Govt. City College, Rajshahi', year: '2017', result: 'GPA 5.00' },
  { exam: 'SSC', major: 'Science', inst: 'Mission Girls High School, Rajshahi', year: '2015', result: 'GPA 5.00' },
]

export default function Education() {
  return (
    <section id="education">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Major Education</div>
          <h2>Straight line, top marks.</h2>
        </div>

        <div className="edu-table reveal">
          <div className="edu-table__head">
            <span>Exam</span>
            <span>Concentration</span>
            <span>Institution</span>
            <span>Year</span>
            <span>Result</span>
          </div>
          {ROWS.map((r) => (
            <div className="edu-table__row" key={r.exam + '-' + r.major}>
              <span className="edu-table__exam">{r.exam}</span>
              <span>{r.major}</span>
              <span className="edu-table__inst">{r.inst}</span>
              <span>{r.year}</span>
              <span className="edu-table__result">{r.result}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

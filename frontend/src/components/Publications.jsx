const THESES = [
  {
    level: 'M.Sc. Thesis',
    title: 'CT-CoherXAI: A Coherence-Driven, Explainable Ensemble Framework for Lung Cancer Classification from Chest CT Images',
  },
  {
    level: 'B.Sc. Thesis',
    title: 'Developing Generalized Models for COVID-19 Detection by AI Approach',
  },
]

const PAPERS = [
  {
    title: 'CT-CoherXAI: A Coherence-Driven, Explainable Ensemble Framework for Lung Cancer Classification from Chest CT Images',
    venue: 'IEEE 2nd International Conference on Quantum Photonics, AI, and Networking (QPAIN 2026), CUET, Chattogram',
    year: '2026',
    role: 'Lead author',
  },
  {
    title: 'Design and Performance Evaluation of a Microstrip Patch Antenna for CubeSats Application',
    venue: 'IEEE QPAIN 2026, CUET, Chattogram',
    year: '2026',
    role: 'Co-author',
  },
  {
    title: 'Advancing Brain Stroke Prediction Through Attention-Based Neural Architectures for Temporal Data Analysis',
    venue: 'IEEE COMPAS 2025, Islamic University, Kushtia',
    year: '2025',
    role: 'Co-author',
  },
  {
    title: 'Screening depression among university students utilizing GHQ-12 and machine learning',
    venue: 'Heliyon, Volume 10, Issue 17',
    year: '2024',
    role: 'Co-author',
  },
  {
    title: 'Developing Generalized Models for COVID-19 Detection and Outbreak Prediction by AI Approach',
    venue: 'Journal of Engineering and Applied Science, Vol. 07, No. 01, pp. 72–80',
    year: '2023',
    role: 'Co-author',
  },
  {
    title: 'Blockchain Based Secure and Decentralized Smart Licensing of Charging Vehicles for Rajshahi City Corporation',
    venue: 'IEEE ICICT4SD 2023, Dhaka · doi:10.1109/ICICT4SD59951.2023.10303487',
    year: '2023',
    role: 'Co-author',
  },
  {
    title: 'A Real-time Attendance Monitoring System for Election Voter using Face Recognition Approach',
    venue: 'IEEE CS BDC Summer Symposium 2023',
    year: '2023',
    role: 'Co-author',
  },
  {
    title: 'EEG-Based Multi-Class Emotion Recognition using Hybrid LSTM Approach',
    venue: 'Intl. Journal of Innovative Research in Computer Science & Technology, Vol. 11, Issue 3',
    year: '2023',
    role: 'Co-author',
  },
  {
    title: 'D-Shaped Photonic Crystal Fiber Plasmonic Bio-Sensor for Biomaterial Detection',
    venue: 'Intl. Journal of Current Science, Volume 13, Issue 2',
    year: '2023',
    role: 'Co-author',
  },
]

export default function Publications() {
  return (
    <section id="publications" className="section-alt">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Thesis &amp; Publications</div>
          <h2>Nine papers, two theses, one line of inquiry.</h2>
        </div>

        <div className="thesis-row reveal">
          {THESES.map((t) => (
            <div className="card thesis-card" key={t.level}>
              <span className="thesis-card__level">{t.level}</span>
              <p className="thesis-card__title">{t.title}</p>
            </div>
          ))}
        </div>

        <ol className="pub-list reveal">
          {PAPERS.map((p) => (
            <li className="pub-list__item" key={p.title}>
              <span className="pub-list__year">{p.year}</span>
              <div className="pub-list__body">
                <p className="pub-list__title">{p.title}</p>
                <p className="pub-list__venue">{p.venue}</p>
              </div>
              <span className="tag pub-list__role">{p.role}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

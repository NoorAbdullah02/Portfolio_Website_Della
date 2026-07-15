export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="about__grid">
          <div className="reveal">
            <div className="eyebrow">About</div>
            <h2 className="about__heading">
              From a debate stage in Rajshahi to a chest-CT dataset —
              the same instinct: build the strongest possible case
              from imperfect evidence.
            </h2>
          </div>

          <div className="about__body reveal">
            <p>
              I teach in the Department of Information &amp; Communication Engineering
              at Bangladesh Army University of Engineering and Technology (BAUET), where
              I've lectured since December 2022. Before the classroom, I spent time across
              telecom, e-commerce, and civic-tech — Grameenphone, Uber, AmazonPify, and a
              city-corporation ICT programme — which is where the "explain it clearly, to
              anyone" habit comes from.
            </p>
            <p>
              My current research pulls in one direction: <strong>explainable AI for
              healthcare</strong>. My M.Sc. thesis, <em>CT-CoherXAI</em>, builds a
              coherence-driven ensemble for classifying lung cancer from chest CT images —
              work presented at IEEE QPAIN 2026. My B.Sc. thesis tackled generalized,
              explainable models for COVID-19 detection. Between the two sits a run of
              co-authored papers on stroke prediction, EEG emotion recognition, biosensors,
              and blockchain-secured civic systems.
            </p>
            <div className="about__facts">
              <div className="card about__fact">
                <span className="about__fact-label">Based in</span>
                <span className="about__fact-value">Rajshahi, Bangladesh</span>
              </div>
              <div className="card about__fact">
                <span className="about__fact-label">Languages</span>
                <span className="about__fact-value">Bangla (native), English (IELTS 6.5)</span>
              </div>
              <div className="card about__fact">
                <span className="about__fact-label">Also known for</span>
                <span className="about__fact-value">Debate champion, graphic designer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

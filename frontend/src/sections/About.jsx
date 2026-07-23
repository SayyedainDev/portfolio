export default function About({ about, identity }) {
  return (
    <section id="about" className="about-section section-space" aria-labelledby="about-heading">
      <div className="shell editorial-grid">
        <div className="about-section__label">
          <p>About Muhammad</p>
          <p>{identity.location}</p>
        </div>
        <div className="about-section__copy">
          <h2 id="about-heading">{about.heading}</h2>
          <div>
            {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="about-section__shift" aria-label="Career focus shift">
              <span>Flutter product foundation</span>
              <i aria-hidden="true" />
              <strong>AI systems focus</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

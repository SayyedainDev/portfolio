import SectionHeading from '../components/ui/SectionHeading';

export default function ExperienceEducation({ timeline }) {
  return (
    <section id="experience" className="timeline-section section-space" aria-labelledby="timeline-heading">
      <div className="shell editorial-grid">
        <div className="timeline-section__heading">
          <SectionHeading
            id="timeline-heading"
            title="Product foundations, then a deliberate AI shift."
            description="A Computer Science degree and mobile internship built the engineering base. Applied GenAI training moved the focus toward Python, retrieval, agents, and evaluation."
          />
        </div>

        <div className="timeline-list">
          {timeline.map((item) => (
            <article key={item.id}>
              <p className="timeline-list__date">{item.dateLabel}</p>
              <div className="timeline-list__content">
                <p className="timeline-list__kind">{item.kind}</p>
                <h3>{item.title}</h3>
                <p className="timeline-list__organization">
                  {item.organization}{item.location ? ` · ${item.location}` : ''}
                </p>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

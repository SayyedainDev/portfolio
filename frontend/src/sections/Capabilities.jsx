import SectionHeading from '../components/ui/SectionHeading';

export default function Capabilities({ groups }) {
  return (
    <section id="capabilities" className="capabilities section-space" aria-labelledby="capabilities-heading">
      <div className="shell capabilities__grid">
        <SectionHeading
          id="capabilities-heading"
          title="From retrieved context to a shipped product."
          description="My current stack is strongest where AI application layers meet: retrieval, orchestration, typed services, evaluation, and the interface that closes the loop."
        />

        <div className="capability-groups">
          {groups.map((group) => (
            <section className="capability-group" key={group.id}>
              <header>
                <h3>{group.title}</h3>
                <p>{group.summary}</p>
              </header>
              <div className="capability-group__rows">
                {group.items.map((item) => (
                  <article key={item.title}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <ul aria-label={`${item.title} evidence`}>
                      {item.evidence.map((evidence) => <li key={evidence}>{evidence}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Award, Clock3 } from 'lucide-react';

export default function Training({ training }) {
  return (
    <section id="training" className="training-section section-space" aria-labelledby="training-heading">
      <div className="shell">
        <header className="training-section__header">
          <div>
            <p className="training-section__kicker">{training.label}</p>
            <h2 id="training-heading">Thirteen weeks across the applied GenAI stack.</h2>
          </div>
          <div className="training-section__intro">
            <p>{training.description}</p>
            <div className="training-section__meta">
              <span><Clock3 aria-hidden="true" size={16} /> {training.dateLabel}</span>
              <span>{training.duration}</span>
              <span>{training.hours}</span>
            </div>
          </div>
        </header>

        <ol className="training-path">
          {training.phases.map((phase) => (
            <li key={phase.number}>
              <div className="training-path__marker">
                <span>{phase.number}</span>
              </div>
              <div className="training-path__content">
                <p>{phase.weeks}</p>
                <h3>{phase.title}</h3>
                <ul>
                  {phase.topics.map((topic) => <li key={topic}>{topic}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="training-credentials">
          <div>
            <Award aria-hidden="true" size={21} />
            <span>Verified learning alongside the programme</span>
          </div>
          <ul>
            {training.credentials.map((credential) => <li key={credential}>{credential}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

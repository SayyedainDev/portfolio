import { ArrowDownRight } from 'lucide-react';
import AISystemScene from '../components/visuals/AISystemScene';
import ButtonLink from '../components/ui/ButtonLink';

export default function Hero({ identity, hero }) {
  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-heading">
      <div className="shell">
        <div className="hero-statusbar">
          <p>{hero.roleLine}</p>
          <p className="hero-statusbar__build">
            <span aria-hidden="true" />
            {hero.currentBuild}
          </p>
        </div>

        <div className="hero-section__grid">
          <div className="hero-copy">
            <h1 id="hero-heading">
              I build AI systems that <span>retrieve, reason,</span> and ship.
            </h1>
            <p className="hero-copy__body">{hero.body}</p>

            <div className="hero-actions">
              <ButtonLink href={hero.actions.primary.href}>{hero.actions.primary.label}</ButtonLink>
              <ButtonLink
                href={hero.actions.secondary.href}
                variant="secondary"
                icon="download"
                download
              >
                {hero.actions.secondary.label}
              </ButtonLink>
            </div>

            <div className="hero-availability">
              <span className="hero-availability__signal" aria-hidden="true" />
              <div>
                <p>{identity.availability}</p>
                <small>Python backend · RAG · Agents · Lahore / Remote</small>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <AISystemScene />
          </div>
        </div>

        <div className="hero-stackrail" aria-label="Core technologies">
          <p>Current toolkit</p>
          <ul>
            {hero.stack.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <a href="#work">
            See the systems
            <ArrowDownRight aria-hidden="true" size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

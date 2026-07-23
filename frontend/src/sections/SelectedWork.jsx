import { ShieldCheck } from 'lucide-react';
import ProjectFeature from '../components/projects/ProjectFeature';

export default function SelectedWork({ projects }) {
  const [flagship, split, ...compact] = projects;

  return (
    <section id="work" className="selected-work" aria-labelledby="selected-work-heading">
      <div className="shell selected-work__intro">
        <h2 id="selected-work-heading">AI work with the architecture left visible.</h2>
        <p className="selected-work__note">
          <ShieldCheck aria-hidden="true" size={18} />
          Three new repositories are being prepared for GitHub. Until then, every
          unavailable link is omitted and every project status is explicit.
        </p>
      </div>

      <div className="shell selected-work__projects">
        <ProjectFeature project={flagship} variant="flagship" />
        <ProjectFeature project={split} variant="split" />
        <div className="selected-work__compact-row">
          {compact.map((project) => (
            <ProjectFeature key={project.slug} project={project} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}

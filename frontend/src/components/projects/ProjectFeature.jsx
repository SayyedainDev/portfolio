import { ArrowUpRight, LockKeyhole } from 'lucide-react';
import ProjectLinks from './ProjectLinks';
import ProjectMedia from './ProjectMedia';

function StatusPill({ project }) {
  return (
    <div className="project-feature__status">
      <span className="status-pill">
        <i aria-hidden="true" />
        {project.status}
      </span>
      <small>{project.statusDetail}</small>
    </div>
  );
}

function RepoNote({ project }) {
  if (!project.repositoryUrl) {
    return (
      <p className="project-feature__private-note">
        <LockKeyhole aria-hidden="true" size={15} />
        Code is not public yet. The case study documents the system without
        pretending a repository exists.
      </p>
    );
  }

  return (
    <a
      className="project-feature__repo-note"
      href={project.repositoryUrl}
      target="_blank"
      rel="noreferrer"
    >
      Public source available
      <ArrowUpRight aria-hidden="true" size={15} />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function TechnologyRail({ project }) {
  return (
    <div className="project-feature__technology" aria-label={`${project.title} technology`}>
      <span>Built with</span>
      <ul>
        {project.technology.map((technology) => <li key={technology}>{technology}</li>)}
      </ul>
    </div>
  );
}

export default function ProjectFeature({ project, variant = 'split' }) {
  const accentClass = `project-feature--${project.accent}`;

  if (variant === 'compact') {
    return (
      <article className={`project-feature project-feature--compact ${accentClass}`}>
        <div className="project-feature__panel">
          <header className="project-feature__header">
            <div className="project-feature__identity">
              <p className="project-feature__kind">{project.type} · {project.year}</p>
              <h3>{project.title}</h3>
              <span>{project.longTitle}</span>
            </div>
            <StatusPill project={project} />
          </header>
          <div className="project-feature__body">
            <p className="project-feature__summary">{project.summary}</p>
            <div className="project-feature__media">
              <ProjectMedia project={project} mode="compact" />
            </div>
            <ProjectLinks links={project.links} compact />
            <RepoNote project={project} />
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'flagship') {
    return (
      <article className={`project-feature project-feature--flagship ${accentClass}`}>
        <div className="project-feature__panel">
          <header className="project-feature__header">
            <div className="project-feature__identity">
              <p className="project-feature__kind">{project.type} · {project.year}</p>
              <h3>{project.title}</h3>
              <span>{project.longTitle}</span>
            </div>
            <StatusPill project={project} />
          </header>

          <div className="project-feature__body">
            <div className="project-feature__media">
              <ProjectMedia project={project} />
            </div>
            <div className="project-feature__lower">
              <div>
                <p className="project-feature__summary">{project.summary}</p>
                <ul className="project-feature__proof" aria-label={`${project.title} focus areas`}>
                  {project.proof.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div>
                <div className="project-feature__role">
                  <span>My contribution</span>
                  <p>{project.role}</p>
                </div>
                <ProjectLinks links={project.links} />
                <RepoNote project={project} />
              </div>
            </div>
          </div>

          <TechnologyRail project={project} />
        </div>
      </article>
    );
  }

  return (
    <article className={`project-feature ${accentClass}`}>
      <div className="project-feature__panel">
        <header className="project-feature__header">
          <div className="project-feature__identity">
            <p className="project-feature__kind">{project.type} · {project.year}</p>
            <h3>{project.title}</h3>
            <span>{project.longTitle}</span>
          </div>
          <StatusPill project={project} />
        </header>

        <div className="project-feature__body">
          <div className="project-feature__narrative">
            <p className="project-feature__summary">{project.summary}</p>
            <div className="project-feature__role">
              <span>My contribution</span>
              <p>{project.role}</p>
            </div>
            <ul className="project-feature__proof" aria-label={`${project.title} focus areas`}>
              {project.proof.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <ProjectLinks links={project.links} />
            <RepoNote project={project} />
          </div>
          <div className="project-feature__media">
            <ProjectMedia project={project} />
          </div>
        </div>

        <TechnologyRail project={project} />
      </div>
    </article>
  );
}

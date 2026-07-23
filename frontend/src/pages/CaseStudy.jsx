import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, LockKeyhole } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ProjectLinks from '../components/projects/ProjectLinks';
import ProjectMedia from '../components/projects/ProjectMedia';
import ContactFooter from '../sections/ContactFooter';
import {
  contact,
  getProjectBySlug,
  identity,
  projects,
} from '../data/portfolio';

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    if (!project) return undefined;
    const previousTitle = document.title;
    document.title = `${project.longTitle} — Muhammad Sayyedain`;
    return () => {
      document.title = previousTitle;
    };
  }, [project]);

  if (!project) {
    return (
      <main id="main-content">
        <div className="shell case-missing">
          <h1>That case study doesn&apos;t exist.</h1>
          <p>
            The link may be out of date. Everything current lives on the AI work
            section of the homepage.
          </p>
          <Link className="case-back-link" to="/#work">
            <ArrowLeft aria-hidden="true" size={17} />
            All AI work
          </Link>
        </div>
      </main>
    );
  }

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <>
      <main id="main-content" className={`case-study case-study--${project.accent}`}>
        <article>
          <header className="case-hero">
            <div className="shell">
              <div className="case-hero__topline">
                <Link className="case-back-link" to="/#work">
                  <ArrowLeft aria-hidden="true" size={17} />
                  All AI work
                </Link>
                <p><span aria-hidden="true" /> {project.status}</p>
              </div>

              <div className="case-hero__grid">
                <div className="case-hero__identity">
                  <p>{project.type} · {project.year}</p>
                  <h1>{project.longTitle}</h1>
                </div>
                <div className="case-hero__summary">
                  <p>{project.summary}</p>
                  <ProjectLinks links={project.links.filter((link) => link.type !== 'case-study')} compact />
                  {!project.repositoryUrl ? (
                    <span className="case-hero__private">
                      <LockKeyhole aria-hidden="true" size={14} />
                      Code publishing soon
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </header>

          <section className="case-media" aria-label={`${project.title} system architecture`}>
            <div className="shell">
              <ProjectMedia key={project.slug} project={project} mode="case-study" />
            </div>
          </section>

          <div className="shell case-body">
            <section className="case-context" aria-labelledby="case-context-heading">
              <div>
                <p className="case-section-label">The challenge</p>
                <h2 id="case-context-heading">What the system needed to make reliable</h2>
              </div>
              <div className="case-context__copy">
                <p>{project.problem}</p>
                <div>
                  <span>My contribution</span>
                  <p>{project.role}</p>
                </div>
              </div>
            </section>

            <section className="case-decisions" aria-labelledby="case-decisions-heading">
              <div className="case-section-heading">
                <p className="case-section-label">Technical decisions</p>
                <h2 id="case-decisions-heading">The structure behind the workflow</h2>
              </div>
              <ol>
                {project.decisions.map((decision, index) => (
                  <li key={decision}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{decision}</p>
                  </li>
                ))}
              </ol>
            </section>

            <div className="case-coverage">
              <section aria-labelledby="case-features-heading">
                <p className="case-section-label">Product coverage</p>
                <h2 id="case-features-heading">What is in the build</h2>
                <ul>
                  {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </section>

              <section aria-labelledby="case-stack-heading">
                <p className="case-section-label">Technology</p>
                <h2 id="case-stack-heading">Tools chosen for the job</h2>
                <ul>
                  {project.technology.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
              </section>
            </div>

            <aside className="case-evidence" aria-labelledby="case-evidence-heading">
              <p className="case-section-label">Scope note</p>
              <h2 id="case-evidence-heading">Clear about what this proves</h2>
              <p>{project.evidenceBoundary}</p>
            </aside>

            <nav className="next-case" aria-label="Next case study">
              <span>Continue to</span>
              <Link to={nextProject.caseStudyPath}>
                <span>{nextProject.longTitle}</span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </nav>
          </div>
        </article>
      </main>
      <ContactFooter contact={contact} identity={identity} />
    </>
  );
}

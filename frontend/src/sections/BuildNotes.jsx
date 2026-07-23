import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';

export default function BuildNotes({ notes }) {
  return (
    <section className="build-notes section-space" aria-labelledby="build-notes-heading">
      <div className="shell">
        <SectionHeading
          id="build-notes-heading"
          title="What I pay attention to when the demo becomes a system."
          description="Three principles carried across my current AI work, from retrieval diagnostics to human review and product integration."
        />
        <div className="build-notes__list">
          {notes.map((note) => (
            <article key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.body}</p>
              <Link to={`/work/${note.projectSlug}`}>
                See it in context
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

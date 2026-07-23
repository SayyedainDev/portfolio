import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectLinks({ links, compact = false }) {
  return (
    <div className={`project-links ${compact ? 'project-links--compact' : ''}`}>
      {links.map((link) => {
        if (link.external) {
          return (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              <span>{link.label}</span>
              <ArrowUpRight aria-hidden="true" size={17} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          );
        }

        return (
          <Link key={link.href} to={link.href}>
            <span>{link.label}</span>
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        );
      })}
    </div>
  );
}

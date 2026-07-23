import { ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react';

const iconByLabel = {
  GitHub: Github,
  LinkedIn: Linkedin,
  'Download résumé': Download,
};

export default function ContactFooter({ contact, identity }) {
  return (
    <footer id="contact" className="contact-footer">
      <div className="shell">
        <div className="contact-footer__availability">
          <span aria-hidden="true" />
          <p>{contact.availability}</p>
        </div>

        <div className="contact-footer__main">
          <div>
            <h2>{contact.heading}</h2>
            <p>{contact.body}</p>
          </div>
          <a className="contact-footer__email" href={contact.primaryAction.href}>
            <Mail aria-hidden="true" size={20} />
            <span>{identity.email}</span>
            <ArrowUpRight aria-hidden="true" size={24} />
          </a>
        </div>

        <div className="contact-footer__bottom">
          <p>© {new Date().getFullYear()} {identity.name}</p>
          <nav aria-label="Footer links">
            {contact.links.map((link) => {
              const Icon = iconByLabel[link.label] ?? ArrowUpRight;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  {...(link.download ? { download: 'Muhammad-Sayyedain-Resume.pdf' } : {})}
                >
                  <Icon aria-hidden="true" size={16} />
                  <span>{link.label}</span>
                  {link.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                </a>
              );
            })}
          </nav>
          <a href="#hero">Back to top</a>
        </div>
      </div>
    </footer>
  );
}

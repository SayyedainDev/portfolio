import { ArrowUpRight, Download } from 'lucide-react';

const icons = {
  external: ArrowUpRight,
  download: Download,
};

export default function ButtonLink({
  href,
  children,
  variant = 'primary',
  icon,
  external = false,
  download = false,
  className = '',
}) {
  const Icon = icon ? icons[icon] : null;

  return (
    <a
      className={`button-link button-link--${variant} ${className}`.trim()}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...(download ? { download: 'Muhammad-Sayyedain-Resume.pdf' } : {})}
    >
      <span>{children}</span>
      {Icon ? <Icon aria-hidden="true" size={17} strokeWidth={1.8} /> : null}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

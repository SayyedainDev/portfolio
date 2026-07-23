import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useActiveSection } from '../../hooks/useActiveSection';
import SkipLink from './SkipLink';

const homeSectionIds = ['work', 'capabilities', 'training', 'experience', 'about', 'contact'];

export default function SiteHeader({ name, navigation, email }) {
  const location = useLocation();
  const onHomePage = location.pathname === '/';
  const activeSection = useActiveSection(homeSectionIds, onHomePage);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === 'Tab') {
        const links = [...(menuRef.current?.querySelectorAll('a[href]') ?? [])]
          .filter((element) => element.tabIndex !== -1);
        const focusable = [menuButtonRef.current, ...links].filter(Boolean);
        const first = focusable[0];
        const last = focusable.at(-1);

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <SkipLink />
      <header className="site-header">
        <div className="site-header__inner shell">
          <a className="site-wordmark" href="/" aria-label={`${name}, home`}>
            <span aria-hidden="true" className="site-wordmark__mark">MS</span>
            <span>{name}</span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => {
              const id = item.sectionId ?? item.id;
              const current = onHomePage && activeSection === id;
              return (
                <a
                  key={id}
                  className={current ? 'is-active' : undefined}
                  href={`/#${id}`}
                  aria-current={current ? 'location' : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <a className="header-contact" href={`mailto:${email}`}>Let&apos;s talk</a>

          <button
            ref={menuButtonRef}
            className="menu-trigger"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        <div
          ref={menuRef}
          id="mobile-navigation"
          className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <nav className="mobile-menu__inner shell" aria-label="Mobile navigation">
            {navigation.map((item, index) => (
              <a
                key={item.sectionId ?? item.id}
                ref={index === 0 ? firstLinkRef : undefined}
                href={`/#${item.sectionId ?? item.id}`}
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              className="mobile-menu__contact"
              href={`mailto:${email}`}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              {email}
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

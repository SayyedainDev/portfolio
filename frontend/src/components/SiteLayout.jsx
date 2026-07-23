import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import SiteHeader from './ui/SiteHeader';

function HashAndRouteScroll() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      let cancelled = false;
      const scrollToTarget = () => {
        if (cancelled) return;
        const target = document.querySelector(location.hash);
        target?.scrollIntoView();
      };
      const firstFrame = requestAnimationFrame(() => {
        requestAnimationFrame(scrollToTarget);
      });
      const fallback = window.setTimeout(scrollToTarget, 240);
      document.fonts?.ready.then(scrollToTarget);

      return () => {
        cancelled = true;
        window.cancelAnimationFrame(firstFrame);
        window.clearTimeout(fallback);
      };
    }

    window.scrollTo({ top: 0, left: 0 });
  }, [location.pathname, location.hash]);

  return null;
}

export default function SiteLayout({ identity, navigation, children }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.25 });

  return (
    <div className="site-frame">
      <HashAndRouteScroll />
      <motion.div className="page-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <SiteHeader
        name={identity.name}
        email={identity.email}
        navigation={navigation}
      />
      {children}
    </div>
  );
}

// SmoothScroll.jsx
// Premium smooth scrolling wrapper using Lenis
// Creates buttery 60fps scrolling like Apple and Nike sites

import React, { useEffect, useRef, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollContext = React.createContext(null);

export const useSmoothScroll = () => React.useContext(SmoothScrollContext);

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis with optimized settings for smoothness
    const lenis = new Lenis({
      duration: 1.0, // Slightly faster for more responsive feel
      easing: (t) => 1 - Math.pow(1 - t, 3), // Smooth cubic ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.0, // Standard scroll speed
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use requestAnimationFrame for smooth updates
    function raf(time) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    // Update ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenisRef}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScroll;

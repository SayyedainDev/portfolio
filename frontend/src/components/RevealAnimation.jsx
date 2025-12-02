// RevealAnimation.jsx
// GSAP ScrollTrigger reveal component with sophisticated animation presets
// Like premium Apple/Nike scroll-triggered reveals

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ANIMATION_PRESETS = {
  fadeUp: {
    from: { opacity: 0, y: 100, scale: 0.95 },
    to: { opacity: 1, y: 0, scale: 1 },
  },
  fadeDown: {
    from: { opacity: 0, y: -100 },
    to: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    from: { opacity: 0, x: -100, rotateY: 15 },
    to: { opacity: 1, x: 0, rotateY: 0 },
  },
  fadeRight: {
    from: { opacity: 0, x: 100, rotateY: -15 },
    to: { opacity: 1, x: 0, rotateY: 0 },
  },
  scaleUp: {
    from: { opacity: 0, scale: 0.5 },
    to: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    from: { opacity: 0, rotation: 45, scale: 0.8 },
    to: { opacity: 1, rotation: 0, scale: 1 },
  },
  clipReveal: {
    from: { clipPath: 'inset(100% 0% 0% 0%)' },
    to: { clipPath: 'inset(0% 0% 0% 0%)' },
  },
  splitLines: {
    from: { opacity: 0, y: '100%', skewY: 7 },
    to: { opacity: 1, y: '0%', skewY: 0 },
  },
  blur: {
    from: { opacity: 0, filter: 'blur(20px)', y: 50 },
    to: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
  elastic: {
    from: { opacity: 0, scale: 0, rotation: -180 },
    to: { opacity: 1, scale: 1, rotation: 0 },
  },
};

const RevealAnimation = ({
  children,
  animation = 'fadeUp',
  duration = 1,
  delay = 0,
  stagger = 0,
  ease = 'power3.out',
  start = 'top 85%',
  end = 'bottom 20%',
  scrub = false,
  markers = false,
  once = true,
  className = '',
  childSelector = null, // Selector for child elements to animate
  ...props
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preset = ANIMATION_PRESETS[animation] || ANIMATION_PRESETS.fadeUp;
    const targets = childSelector
      ? container.querySelectorAll(childSelector)
      : container;

    // Set initial state
    gsap.set(targets, preset.from);

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start,
        end,
        scrub: scrub ? 1 : false,
        markers,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    });

    tl.to(targets, {
      ...preset.to,
      duration,
      delay,
      stagger: stagger ? { amount: stagger, from: 'start' } : 0,
      ease,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === container) t.kill();
      });
    };
  }, [animation, duration, delay, stagger, ease, start, end, scrub, markers, once, childSelector]);

  return (
    <div ref={containerRef} className={className} {...props}>
      {children}
    </div>
  );
};

// Specialized components for common patterns
export const RevealText = ({ children, className = '', ...props }) => (
  <RevealAnimation animation="splitLines" className={`overflow-hidden ${className}`} {...props}>
    <div className="inline-block">{children}</div>
  </RevealAnimation>
);

export const RevealImage = ({ children, className = '', ...props }) => (
  <RevealAnimation animation="clipReveal" duration={1.5} ease="power4.inOut" className={className} {...props}>
    {children}
  </RevealAnimation>
);

export const RevealStagger = ({ children, className = '', staggerAmount = 0.1, ...props }) => (
  <RevealAnimation
    animation="fadeUp"
    stagger={staggerAmount}
    childSelector="> *"
    className={className}
    {...props}
  >
    {children}
  </RevealAnimation>
);

export default RevealAnimation;

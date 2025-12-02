// ParallaxSection.jsx
// Multi-layer parallax scrolling with depth perception
// Creates immersive 3D-like depth effect on scroll

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxSection = ({
  children,
  className = '',
  layers = [], // Array of { content, speed, className }
  ...props
}) => {
  const containerRef = useRef(null);
  const layerRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    layerRefs.current.forEach((layer, index) => {
      if (!layer) return;

      const speed = layers[index]?.speed || (index + 1) * 0.2;

      gsap.to(layer, {
        yPercent: -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === container) t.kill();
      });
    };
  }, [layers]);

  return (
    <section
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Background layers with parallax */}
      {layers.map((layer, index) => (
        <div
          key={index}
          ref={(el) => (layerRefs.current[index] = el)}
          className={`absolute inset-0 ${layer.className || ''}`}
          style={{ zIndex: index }}
        >
          {layer.content}
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

// Simple parallax wrapper for individual elements
export const ParallaxElement = ({
  children,
  speed = 0.5,
  className = '',
  direction = 'vertical', // 'vertical' | 'horizontal'
  ...props
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const animation = direction === 'horizontal'
      ? { xPercent: -50 * speed }
      : { yPercent: -50 * speed };

    gsap.to(element, {
      ...animation,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === element) t.kill();
      });
    };
  }, [speed, direction]);

  return (
    <div ref={elementRef} className={className} {...props}>
      {children}
    </div>
  );
};

export default ParallaxSection;

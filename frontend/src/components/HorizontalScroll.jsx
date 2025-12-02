// HorizontalScroll.jsx
// Premium horizontal scroll section like Apple product pages
// Pins the section and scrolls horizontally as user scrolls vertically

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = ({
  children,
  className = '',
  speed = 1,
  ...props
}) => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!container || !scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = scrollWidth - viewportWidth;

    // Create horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollDistance * speed}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(scrollContainer, {
      x: -scrollDistance,
      ease: 'none',
    });

    // Add parallax effect to items
    const items = scrollContainer.querySelectorAll('[data-parallax]');
    items.forEach((item) => {
      const depth = parseFloat(item.dataset.parallax) || 0.5;
      gsap.to(item, {
        x: scrollDistance * depth * 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollDistance * speed}`,
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === container) t.kill();
      });
    };
  }, [speed]);

  return (
    <section
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <div
        ref={scrollContainerRef}
        className="flex items-center h-screen"
        style={{ width: 'max-content' }}
      >
        {children}
      </div>
    </section>
  );
};

// Individual scroll item component
export const HorizontalScrollItem = ({
  children,
  className = '',
  parallax = 0,
  ...props
}) => (
  <div
    className={`flex-shrink-0 ${className}`}
    data-parallax={parallax}
    {...props}
  >
    {children}
  </div>
);

export default HorizontalScroll;

// CustomCursor.jsx
// Premium custom cursor with magnetic pull, context-aware states, and trail effects
// Like Awwwards-winning sites and premium agency portfolios

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorTrailRef = useRef([]);
  const [cursorState, setCursorState] = useState('default'); // default, hover, click, text, hidden
  const [cursorText, setCursorText] = useState('');
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Mouse move handler
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Animation loop for smooth following
    const animate = () => {
      // Smooth interpolation
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.15;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.15;

      gsap.set(cursor, {
        x: cursorPos.current.x,
        y: cursorPos.current.y,
      });

      gsap.set(cursorDot, {
        x: mousePos.current.x,
        y: mousePos.current.y,
      });

      requestAnimationFrame(animate);
    };

    // Hover detection for interactive elements
    const handleElementHover = (e) => {
      const target = e.target;

      if (target.matches('a, button, [data-cursor="pointer"]')) {
        setCursorState('hover');
        gsap.to(cursor, {
          scale: 2,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else if (target.matches('p, span, h1, h2, h3, h4, h5, h6, [data-cursor="text"]')) {
        setCursorState('text');
        gsap.to(cursor, {
          scale: 0.5,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else if (target.matches('[data-cursor="view"]')) {
        setCursorState('view');
        setCursorText('View');
        gsap.to(cursor, {
          scale: 3,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else if (target.matches('[data-cursor="drag"]')) {
        setCursorState('drag');
        setCursorText('Drag');
        gsap.to(cursor, {
          scale: 2.5,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleElementLeave = () => {
      setCursorState('default');
      setCursorText('');
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    // Click handlers
    const handleMouseDown = () => {
      gsap.to(cursor, {
        scale: cursorState === 'hover' ? 1.5 : 0.8,
        duration: 0.1,
      });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, {
        scale: cursorState === 'hover' ? 2 : 1,
        duration: 0.2,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    // Hide cursor when leaving window
    const handleMouseLeave = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 0,
        duration: 0.2,
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 1,
        duration: 0.2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleElementHover);
    window.addEventListener('mouseout', handleElementLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const animationId = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      window.removeEventListener('mouseout', handleElementLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, [cursorState]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`
            w-10 h-10 rounded-full border-2 border-white
            flex items-center justify-center
            transition-colors duration-200
            ${cursorState === 'hover' ? 'bg-white/10' : ''}
            ${cursorState === 'view' || cursorState === 'drag' ? 'bg-accent/80 border-accent' : ''}
          `}
        >
          {cursorText && (
            <span className="text-[8px] font-bold uppercase text-white">
              {cursorText}
            </span>
          )}
        </div>
      </div>

      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-1 h-1 bg-accent rounded-full" />
      </div>
    </>
  );
};

export default CustomCursor;

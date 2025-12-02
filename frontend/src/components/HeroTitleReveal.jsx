// HeroTitleReveal.jsx
// Cinematic "Glitch-to-Clarity" reveal animation for Hero title
// Uses GSAP Timeline with custom character-level staggered animations

import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

// ============================================================================
// CONFIGURATION
// ============================================================================
const ACCENT_COLOR = '#40E0D0'; // Teal accent
const GLITCH_COLORS = ['#FF0000', '#00FF00', '#00FFFF', '#FF00FF', '#FFFF00', '#40E0D0'];

// Properties to clear on animation complete (excludes display, whiteSpace, etc.)
const CLEARABLE_PROPS = 'opacity,transform,x,y,rotation,skewX,scale,color,textShadow,filter,webkitFilter';

// Utility function for random glitch color
const getRandomGlitchColor = () => {
  return GLITCH_COLORS[Math.floor(Math.random() * GLITCH_COLORS.length)];
};

// ============================================================================
// CUSTOM TEXT SPLITTING UTILITY
// (Manual character splitting, required as SplitText is a commercial plugin)
// ============================================================================
const splitTextIntoChars = (element) => {
  if (!element) return { chars: [], revert: () => {} };

  const originalHTML = element.innerHTML;
  const text = element.textContent;
  const chars = [];

  // Clear and rebuild with individual char spans
  element.innerHTML = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const span = document.createElement('span');
    span.className = 'glitch-char';
    // CRITICAL: These styles must be preserved by clearProps to maintain layout
    span.style.display = 'inline-block';
    // We only need 'pre' for spaces that occur outside of a word to be preserved.
    // However, since we are wrapping words, we mainly focus on display: inline-block.
    span.style.whiteSpace = 'pre';
    span.textContent = char;
    element.appendChild(span);
    chars.push(span);
  }

  return {
    chars,
    revert: () => {
      element.innerHTML = originalHTML;
    }
  };
};

// ============================================================================
// HERO TITLE REVEAL COMPONENT
// ============================================================================
export default function HeroTitleReveal() {
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  const cleanupAndSetFinalState = useCallback((allChars, container) => {
    // 🟢 FIX 2: Surgical Cleanup function
    allChars.forEach((char) => {
      // Remove all animated inline styles
      gsap.set(char, { clearProps: CLEARABLE_PROPS });
      // Restore essential inline styles not cleared by GSAP
      char.style.display = 'inline-block';
      // char.style.whiteSpace = char.textContent === ' ' ? 'pre' : 'normal'; // Removed as nowrap handles it better
      char.style.opacity = '1';
      char.style.color = 'inherit'; // Ensure CSS class takes priority
    });

    // Ensure container remains fully visible
    gsap.set(container, { visibility: 'visible', opacity: 1, clearProps: 'all' });
  }, []);


  useEffect(() => {
    if (!containerRef.current || !line1Ref.current || !line2Ref.current) return;

    // FIX 1: Set initial visibility hidden on container to prevent FOUC
    gsap.set(containerRef.current, { visibility: 'hidden', opacity: 1 });

    // Split text into individual characters
    const split1 = splitTextIntoChars(line1Ref.current);
    const split2 = splitTextIntoChars(line2Ref.current);

    const allChars = [...split1.chars, ...split2.chars];
    const gradientChars = split2.chars; // "Full-Stack Resilience."

    // Create master timeline with onComplete cleanup
    const tl = gsap.timeline({
      delay: 0.3,
      onStart: () => {
        gsap.set(containerRef.current, { visibility: 'visible' });
      },
      onComplete: () => cleanupAndSetFinalState(allChars, containerRef.current),
      defaults: { ease: 'power4.out' }
    });

    // ========================================
    // PHASE 1: Initial Glitch State Setup
    // ========================================
    gsap.set(allChars, {
      opacity: 0,
      y: () => gsap.utils.random(-30, 30),
      // ... other initial glitch transforms
      color: getRandomGlitchColor,
      textShadow: '0 0 10px currentColor',
      filter: 'blur(4px)',
    });

    // ========================================
    // PHASE 2 & 3: Rapid Glitch & Resolve
    // ========================================

    // Glitch Burst (Fast random flickers and corruption)
    tl.to(allChars, {
      duration: 0.04,
      opacity: () => gsap.utils.random(0.4, 0.9),
      color: getRandomGlitchColor,
      y: () => gsap.utils.random(-5, 5),
      skewX: () => gsap.utils.random(-10, 10),
      repeat: 3,
      yoyo: true,
      stagger: { each: 0.008, from: 'random' },
    });

    // Resolve Line 1: "Engineering " (Resolve to white)
    tl.to(split1.chars, {
      duration: 0.6,
      opacity: 1,
      y: 0, x: 0, rotation: 0, skewX: 0, scale: 1,
      color: '#FFFFFF', // Temporary target color for animation
      textShadow: 'none',
      filter: 'none', webkitFilter: 'none',
      stagger: { each: 0.02, from: 'start' },
      ease: 'power3.out',
    }, '-=0.15');

    // Resolve Line 2: "Full-Stack Resilience." (Resolve to gradient starting color)
    tl.to(split2.chars, {
      duration: 0.8,
      opacity: 1,
      y: 0, x: 0, rotation: 0, skewX: 0, scale: 1,
      color: (i, target) => {
        // Gradient interpolation during animation
        const progress = i / split2.chars.length;
        return gsap.utils.interpolate(ACCENT_COLOR, '#06B6D4', progress);
      },
      textShadow: '0 0 15px rgba(64, 224, 208, 0.3)',
      filter: 'none', webkitFilter: 'none',
      stagger: { each: 0.015, from: 'start' },
      ease: 'power3.out',
    }, '-=0.6');

    // ========================================
    // PHASE 4: Final Polish
    // ========================================
    // Final smooth transition to CSS inherited colors and cleanup
    tl.to(allChars, {
      duration: 0.3,
      textShadow: 'none',
      color: 'inherit', // CRITICAL: Release color control to CSS
    });


    // Cleanup
    return () => {
      tl.kill();
      split1.revert();
      split2.revert();
    };
  }, [cleanupAndSetFinalState]);

  return (
    <div
      ref={containerRef}
      className="relative mb-8 text-center"
      style={{
        minHeight: '1em',
        visibility: 'hidden',
      }}
    >
      {/* Main Title Container:
        1. Use 'whitespace-nowrap' on the lines to prevent breaking mid-word.
        2. Use 'flex' with 'flex-col' for clean forced two-line layout.
      */}
      <h1 className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-extrabold leading-[0.9] tracking-tight text-center flex flex-col items-center">

        {/* Line 1: "Aspiring" */}
        <span
          ref={line1Ref}
          // The 'whitespace-nowrap' here prevents 'Aspiring' from splitting
          className="text-white inline-block whitespace-nowrap"
          style={{ willChange: 'transform, opacity, filter' }}
        >
          Aspiring
        </span>

        {/* Line 2: "Software Engineer." */}
        <span
          ref={line2Ref}
          // The 'whitespace-nowrap' here prevents the long phrase from splitting
          className="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600"
          style={{ willChange: 'transform, opacity, filter' }}
        >
          Software Engineer.
        </span>
      </h1>

      {/* Decorative scan line div is omitted for simplicity of debugging */}
    </div>
  );
}

// Named export for flexibility
export { HeroTitleReveal };
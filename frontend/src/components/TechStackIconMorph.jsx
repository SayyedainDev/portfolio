// TechStackIconMorph.jsx
// SVG Path Morphing Animation with GSAP ScrollTrigger
// Note: MorphSVGPlugin requires GSAP Club membership
// This implementation uses a CSS/Framer Motion fallback for free usage

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// SVG PATH DEFINITIONS
// Optimized 24x24 viewBox paths for smooth morphing
// ============================================================================
const SVG_PATHS = {
  // Code brackets icon (initial/placeholder state)
  code: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',

  // Flutter logo simplified
  flutter: 'M14.314 0L2.5 11.815 6.066 15.38 21.5 0h-7.186zm0 11.066l-3.567 3.568 3.567 3.566 3.566-3.566-3.566-3.568zM6.066 18.946L2.5 15.38 6.066 11.815l3.566 3.565-3.566 3.566z',

  // Node.js hexagon
  nodejs: 'M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.7.46 1.4 0 2.2-.85 2.2-2.33V8.44c0-.12-.1-.22-.22-.22h-.93c-.12 0-.22.1-.22.22v8.47c0 .66-.68 1.31-1.77.76L4.55 16.5c-.07-.04-.11-.11-.11-.2V7.72c0-.09.04-.16.11-.2l7.44-4.3c.06-.04.14-.04.2 0l7.44 4.3c.07.04.11.11.11.2v8.58c0 .09-.04.16-.11.2l-7.44 4.3c-.06.04-.14.04-.2 0l-1.88-1.11c-.06-.03-.14-.04-.2 0-.57.33-.67.37-1.2.56-.13.05-.34.13.07.37l2.45 1.45c.23.13.5.2.77.2.27 0 .54-.07.77-.2l7.44-4.3c.48-.28.78-.8.78-1.36V7.72c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.14-.5-.21-.78-.21z',

  // Cloud icon
  cloud: 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z',

  // Database cylinder
  database: 'M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zm6 12c0 .5-2.13 2-6 2s-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V17zm0-4c0 .5-2.13 2-6 2s-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V13zm0-4c0 .5-2.13 2-6 2s-6-1.5-6-2V6.77C7.61 7.55 9.72 8 12 8s4.39-.45 6-1.23V9z',

  // Microservices grid
  microservices: 'M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z',

  // DevOps/Gear icon
  devops: 'M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
};

// ============================================================================
// MORPHING ICON COMPONENT
// Animates between SVG paths on scroll using GSAP
// ============================================================================
const MorphingIcon = ({
  pathSequence = ['code', 'flutter', 'nodejs'],
  color = '#40E0D0',
  label = 'Technology',
  index = 0
}) => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [currentPath, setCurrentPath] = useState(pathSequence[0]);
  const [morphProgress, setMorphProgress] = useState(0);

  useGSAP(() => {
    if (!containerRef.current || !pathRef.current) return;

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        onUpdate: (self) => {
          setMorphProgress(self.progress);

          // Calculate which path to show based on progress
          const pathIndex = Math.min(
            Math.floor(self.progress * pathSequence.length),
            pathSequence.length - 1
          );
          setCurrentPath(pathSequence[pathIndex]);
        },
      },
    });

    // Animate container properties
    tl.fromTo(
      containerRef.current,
      {
        scale: 0.8,
        opacity: 0.5,
        y: 30,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      }
    );

    // Animate the path element (stroke dash for drawing effect)
    tl.fromTo(
      pathRef.current,
      {
        strokeDasharray: 200,
        strokeDashoffset: 200,
      },
      {
        strokeDashoffset: 0,
        duration: 1,
        ease: 'power2.inOut',
      },
      0
    );

    // Color shift animation
    tl.to(
      pathRef.current,
      {
        fill: color,
        stroke: color,
        duration: 0.5,
      },
      0.5
    );

    return () => {
      tl.kill();
    };
  }, { scope: containerRef, dependencies: [pathSequence, color] });

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center w-32 md:w-36 h-28 md:h-32 bg-[#1A1A1A] rounded-xl border border-white/5 hover:border-[#40E0D0]/30 transition-all duration-300 cursor-pointer group"
      style={{
        // Add subtle glow based on morph progress
        boxShadow: morphProgress > 0.5
          ? `0 0 ${20 * morphProgress}px rgba(64, 224, 208, ${0.2 * morphProgress})`
          : 'none',
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-10 h-10 mb-3 transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      >
        <path
          ref={pathRef}
          d={SVG_PATHS[currentPath] || SVG_PATHS.code}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <span className="text-xs md:text-sm text-gray-300 text-center font-medium px-2">
        {label}
      </span>
    </div>
  );
};

// ============================================================================
// MAIN EXPORT: TECH STACK WITH MORPHING ICONS
// Complete section with scroll-triggered morphing animations
// ============================================================================
export default function TechStackIconMorph() {
  const sectionRef = useRef(null);

  // Tech stack configuration with morph sequences
  const techItems = [
    {
      id: 'flutter',
      label: 'Flutter / Dart',
      color: '#40E0D0',
      pathSequence: ['code', 'flutter'],
    },
    {
      id: 'nodejs',
      label: 'Node.js / Express',
      color: '#40E0D0',
      pathSequence: ['code', 'nodejs'],
    },
    {
      id: 'cloud',
      label: 'Cloud Platforms',
      color: '#40E0D0',
      pathSequence: ['code', 'cloud'],
    },
    {
      id: 'database',
      label: 'SQL / NoSQL',
      color: '#EC4899',
      pathSequence: ['code', 'database'],
    },
    {
      id: 'microservices',
      label: 'Microservices',
      color: '#FBBF24',
      pathSequence: ['code', 'microservices'],
    },
    {
      id: 'devops',
      label: 'CI/CD & DevOps',
      color: '#F472B6',
      pathSequence: ['code', 'devops'],
    },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Stagger animation for all icons entering viewport
    gsap.fromTo(
      '.morph-icon-container',
      {
        scale: 0.7,
        opacity: 0,
        y: 50,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="py-20 px-6 md:px-12 lg:px-16 bg-[#0D0D0D]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical Stack
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to build robust, scalable applications
          </p>
        </div>

        {/* Icons Grid with Morphing Effect */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {techItems.map((item, index) => (
            <div key={item.id} className="morph-icon-container">
              <MorphingIcon
                pathSequence={item.pathSequence}
                color={item.color}
                label={item.label}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Named export for flexibility
export { TechStackIconMorph, MorphingIcon, SVG_PATHS };

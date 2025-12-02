// ProjectCard.jsx
// Advanced 3D Tilt Card with Parallax Layered Reveal
// Uses Framer Motion for physics-based spring animations

import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);

  // Raw motion values for cursor position (relative to card center)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics configuration for smooth, natural motion
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };

  // Transform cursor position to rotation angles
  // Input range: -150 to 150 (pixels from center)
  // Output range: rotation degrees (inverted for natural feel)
  const rotateX = useSpring(
    useTransform(y, [-150, 150], [12, -12]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(x, [-150, 150], [-12, 12]),
    springConfig
  );

  // Z-axis translation for inner content layer separation
  const contentZ = useSpring(
    useTransform(
      [x, y],
      ([latestX, latestY]) => {
        const distance = Math.sqrt(latestX ** 2 + latestY ** 2);
        // Push content forward based on cursor distance from center
        return Math.min(distance * 0.3, 40);
      }
    ),
    springConfig
  );

  // Spotlight gradient position (follows cursor)
  const spotlightX = useTransform(x, [-150, 150], ['25%', '75%']);
  const spotlightY = useTransform(y, [-150, 150], ['25%', '75%']);

  // Scale spring for hover lift effect
  const scale = useSpring(1, springConfig);

  // Edge glow intensity based on tilt
  const glowOpacity = useSpring(
    useTransform(
      [rotateX, rotateY],
      ([rx, ry]) => Math.min((Math.abs(rx) + Math.abs(ry)) / 20, 0.6)
    ),
    springConfig
  );

  const handleMouseMove = (event) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate cursor offset from card center
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseEnter = () => {
    scale.set(1.02);
  };

  const handleMouseLeave = () => {
    // Reset all values to center (0,0)
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      style={{
        scale,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      className="relative cursor-pointer group"
    >
      {/* Base Layer: Card background with shadow */}
      <motion.div
        className="relative w-full h-full bg-gray-900 rounded-2xl border border-white/5 overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Dynamic Spotlight Gradient */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([sx, sy]) =>
                `radial-gradient(circle at ${sx} ${sy}, rgba(64, 224, 208, 0.15) 0%, transparent 60%)`
            ),
          }}
        />

        {/* Edge Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            opacity: glowOpacity,
            boxShadow: useTransform(
              [rotateX, rotateY],
              ([rx, ry]) =>
                `${ry * 1.5}px ${-rx * 1.5}px 40px rgba(64, 224, 208, 0.3),
                 inset ${ry * 0.5}px ${-rx * 0.5}px 30px rgba(255, 255, 255, 0.02)`
            ),
          }}
        />

        {/* Inner Content Layer: Separates from base on hover */}
        <motion.div
          style={{
            z: contentZ,
            transformStyle: 'preserve-3d',
          }}
          className="relative p-8 flex flex-col h-full"
        >
          {/* Top Section: Category/Type Title */}
          <motion.div
            style={{ z: 20 }}
            className="h-28 flex items-center justify-center mb-4"
          >
            <h4 className="text-cyan-400 text-lg font-medium text-center tracking-wide">
              {project.topTitle || 'Project'}
            </h4>
          </motion.div>

          {/* Main Title */}
          <motion.h3
            style={{ z: 30 }}
            className="text-2xl md:text-3xl font-bold text-white mb-4"
          >
            {project.mainTitle || project.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            style={{ z: 25 }}
            className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow"
          >
            {project.description}
          </motion.p>

          {/* Tech Stack Tags - Frontmost layer */}
          <motion.div
            style={{ z: 50 }}
            className="flex flex-wrap gap-2"
          >
            <span className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium">
              {(project.techStack || project.tags || []).join(', ')}
            </span>
          </motion.div>
        </motion.div>

        {/* Accent Line - Bottom edge highlight */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          style={{
            opacity: glowOpacity,
            scaleX: useTransform(glowOpacity, [0, 0.6], [0.3, 1]),
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;

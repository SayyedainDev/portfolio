import React, { lazy, Suspense, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import HeroTitleReveal from './HeroTitleReveal';
import MagneticElement from './MagneticElement';
import TextScramble from './TextScramble';

// Lazy load the fluid simulation background for performance
const FluidSimulationBackground = lazy(() => import('./FluidSimulationBackground'));

// Animated scroll indicator
const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.5, duration: 0.6 }}
  >
    <motion.span
      className="text-gray-500 text-xs font-mono tracking-wider"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      SCROLL
    </motion.span>
    <motion.div
      className="w-[1px] h-12 bg-gradient-to-b from-[#40E0D0] to-transparent"
      animate={{ scaleY: [0, 1, 0], originY: 0 }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

// Floating tech badges
const FloatingBadge = ({ text, delay, position }) => (
  <motion.div
    className="absolute hidden lg:block px-3 py-1.5 bg-white/[0.03] backdrop-blur-sm rounded-full border border-white/10 text-xs text-gray-400 font-mono"
    style={position}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: 1,
      scale: 1,
      y: [0, -10, 0],
    }}
    transition={{
      opacity: { delay, duration: 0.5 },
      scale: { delay, duration: 0.5, ease: "backOut" },
      y: { delay: delay + 0.5, duration: 3, repeat: Infinity, ease: "easeInOut" }
    }}
  >
    {text}
  </motion.div>
);

const Hero = () => {
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const springConfig = { stiffness: 100, damping: 30 };
  const ySpring = useSpring(y, springConfig);

  // Track mouse for subtle parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDownloadResume = () => {
    const resumePath = '/resume.pdf';
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = resumePath;
    link.download = 'Muhammad_Sayyedain_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Floating badges positions
  const badges = [
    { text: 'Flutter', delay: 1.8, position: { top: '20%', left: '10%' } },
    { text: 'Firebase', delay: 2.0, position: { top: '30%', right: '12%' } },
    { text: 'Node.js', delay: 2.2, position: { bottom: '35%', left: '8%' } },
    { text: 'Python', delay: 2.4, position: { bottom: '25%', right: '10%' } },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Real-Time 2D Fluid Dynamics Simulation Background */}
      <Suspense fallback={
        <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0a1515] to-[#050505]" />
      }>
        <FluidSimulationBackground />
      </Suspense>

      {/* Ambient glow overlays */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#40E0D0]/5 rounded-full blur-[150px] pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#40E0D0]/3 rounded-full blur-[120px] pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      {/* Floating tech badges */}
      {badges.map((badge) => (
        <FloatingBadge key={badge.text} {...badge} />
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-20 text-center"
        style={{
          y: ySpring,
          opacity,
          scale,
          x: mousePosition.x * 0.5,
        }}
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/[0.03] backdrop-blur-sm rounded-full border border-white/10"
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-[#40E0D0]"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-gray-400 text-sm">CS Student • Fresh Graduate 2026</span>
        </motion.div>

        {/* Main Title with Glitch-to-Clarity Reveal */}
        <HeroTitleReveal />

        {/* Bio with enhanced styling */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Computer Science student with expertise in{' '}
          <span className="text-[#40E0D0] font-semibold">Flutter</span> mobile development,
          currently expanding into{' '}
          <span className="text-[#40E0D0] font-semibold">Backend</span> development
          with Node.js to become a full-stack engineer.
        </motion.p>

        {/* Buttons with premium effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <MagneticElement strength={0.4}>
            <motion.a
              href="https://github.com/SayyedainDev"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-[#40E0D0] text-black font-semibold rounded-full overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setIsHoveringCTA(true)}
              onMouseLeave={() => setIsHoveringCTA(false)}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: isHoveringCTA ? '100%' : '-100%' }}
                transition={{ duration: 0.6 }}
              />

              <span className="relative z-10 flex items-center gap-2">
                <TextScramble text="Explore My Codebase" />
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: isHoveringCTA ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </span>
            </motion.a>
          </MagneticElement>

          {/* Secondary CTA - Resume Download */}
          <MagneticElement strength={0.3}>
            <motion.button
              onClick={handleDownloadResume}
              className="group relative px-8 py-4 bg-transparent border-2 border-[#40E0D0]/50 text-white font-semibold rounded-full overflow-hidden"
              whileHover={{ borderColor: '#40E0D0', backgroundColor: 'rgba(64, 224, 208, 0.1)' }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#40E0D0]"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <span className="relative z-10 flex items-center gap-3">
                {/* Animated download icon */}
                <motion.svg
                  className="w-5 h-5 text-[#40E0D0]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ y: [0, 2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </motion.svg>
                <span className="text-[#40E0D0]">Download Resume</span>
                <span className="text-xs text-gray-400 hidden sm:inline">(PDF)</span>
              </span>
            </motion.button>
          </MagneticElement>
        </motion.div>

        {/* Social proof / stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex items-center justify-center gap-8 mt-16"
        >
          {[
            { value: '2', label: 'Internships' },
            { value: '4+', label: 'Flutter Projects' },
            { value: '2026', label: 'Graduating' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1 }}
            >
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;

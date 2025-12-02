import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';
import MagneticElement from './MagneticElement';
import TextScramble from './TextScramble';
import RevealAnimation from './RevealAnimation';

gsap.registerPlugin(ScrollTrigger);

// Animated counter for project stats
const AnimatedCounter = ({ value, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const incrementTime = (duration * 1000) / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

// Premium project card with cinematic reveal
const CinematicProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative group"
    >
      {/* Spotlight gradient that follows cursor */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(64, 224, 208, 0.06), transparent 40%)`,
        }}
      />

      {/* Card container */}
      <motion.div
        className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl overflow-hidden border border-white/5"
        whileHover={{
          y: -8,
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(135deg, rgba(64, 224, 208, 0.2) 0%, transparent 50%, rgba(64, 224, 208, 0.1) 100%)',
            padding: '1px',
          }}
        />

        {/* Project image/preview area */}
        <div className="relative h-64 overflow-hidden">
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: isHovered
                ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
                : 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Project number */}
          <motion.div
            className="absolute top-4 right-4 text-7xl font-bold text-white/5"
            animate={{
              opacity: isHovered ? 0.15 : 0.05,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            0{index + 1}
          </motion.div>

          {/* Category badge */}
          <motion.div
            className="absolute top-4 left-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <span className="px-3 py-1 bg-[#40E0D0]/10 text-[#40E0D0] text-xs font-medium rounded-full border border-[#40E0D0]/20">
              {project.topTitle}
            </span>
          </motion.div>
        </div>

        {/* Content area */}
        <div className="p-6 relative z-10">
          {/* Title with reveal animation */}
          <motion.h3
            className="text-2xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            {project.mainTitle}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-gray-400 text-sm leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {project.description}
          </motion.p>

          {/* Bottom actions */}
          <div className="flex items-center justify-between">
            {/* Tech stack pills - mobile */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 2).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 2 && (
                <span className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded">
                  +{project.techStack.length - 2}
                </span>
              )}
            </div>

            {/* View project button */}
            <MagneticElement strength={0.3}>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn flex items-center gap-2 px-4 py-2 bg-transparent border border-white/10 text-white text-sm rounded-full overflow-hidden relative"
                whileHover={{ borderColor: 'rgba(64, 224, 208, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button hover fill */}
                <motion.div
                  className="absolute inset-0 bg-[#40E0D0]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
                <span className="relative z-10 group-hover/btn:text-black transition-colors">
                  View
                </span>
                <motion.svg
                  className="w-4 h-4 relative z-10 group-hover/btn:text-black transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </motion.a>
            </MagneticElement>
          </div>
        </div>

        {/* Bottom gradient line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'linear-gradient(90deg, transparent, #40E0D0, transparent)',
            transformOrigin: 'left',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const horizontalRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      topTitle: 'Mobile Application',
      mainTitle: 'Property Management App',
      description: 'A comprehensive Flutter app for property management with features like listing properties, tenant management, and payment tracking. Built with Firebase backend and Hive for local storage.',
      techStack: ['Flutter', 'Dart', 'Firebase', 'Hive', 'Provider'],
      github: 'https://github.com/SayyedainDev/Property-Management-App',
      stats: { features: '15+', screens: '20+', status: 'Complete' }
    },
    {
      topTitle: 'Mobile Application',
      mainTitle: 'Pet Adoption Platform',
      description: 'Flutter-based pet adoption app connecting pet seekers with shelters. Features include pet listings, adoption requests, favorites, and real-time chat with shelters.',
      techStack: ['Flutter', 'Firebase Auth', 'Firestore', 'Deep Linking', 'Localization'],
      github: 'https://github.com/SayyedainDev/Pet-Adoption',
      stats: { features: '12+', screens: '15+', status: 'Complete' }
    },
    {
      topTitle: 'Mobile Application',
      mainTitle: 'Food & Grocery App',
      description: 'Feature-rich Flutter app with Google/Facebook authentication, product browsing with search & category filters, shopping cart with quantity management, referral system with deep linking, and social sharing capabilities.',
      techStack: ['Flutter', 'Provider', 'Firebase Auth', 'Deep Linking', 'Share Plus'],
      github: 'https://github.com/SayyedainDev/Food-App',
      stats: { features: '15+', screens: '4+', status: 'Complete' }
    },
    {
      topTitle: 'Mobile Application',
      mainTitle: 'Real-Time Chat App',
      description: 'Messaging application with real-time chat functionality, user presence, media sharing, and push notifications using Firebase Cloud Messaging.',
      techStack: ['Flutter', 'Firebase', 'FCM', 'Cloud Functions', 'Hive'],
      github: 'https://github.com/SayyedainDev/Chat_App',
      stats: { features: '10+', screens: '8+', status: 'Complete' }
    },
  ];

  // Parallax effect for header
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Horizontal scroll effect
  useEffect(() => {
    if (!horizontalRef.current) return;

    const sections = gsap.utils.toArray('.horizontal-panel');

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: horizontalRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + horizontalRef.current.offsetWidth,
        onUpdate: (self) => {
          setActiveProject(Math.round(self.progress * (sections.length - 1)));
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#0A0A0A] overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(64, 224, 208, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(64, 224, 208, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-[120px] pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle, rgba(64, 224, 208, 0.1) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(64, 224, 208, 0.15) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(64, 224, 208, 0.1) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-[150px] pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle, rgba(64, 224, 208, 0.08) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(64, 224, 208, 0.12) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(64, 224, 208, 0.08) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      {/* Header Section */}
      <div className="relative py-20 px-6 md:px-12 lg:px-16">
        <motion.div
          ref={headerRef}
          style={{ y: headerY, opacity: headerOpacity }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div>
              {/* Section label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-12 h-[1px] bg-[#40E0D0]" />
                <span className="text-[#40E0D0] text-sm font-mono tracking-wider">
                  FEATURED WORK
                </span>
              </motion.div>

              {/* Main title */}
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                <RevealAnimation type="words" stagger={0.05}>
                  Key Projects
                </RevealAnimation>
              </h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 text-lg max-w-xl"
              >
                A curated selection of Flutter projects showcasing expertise in
                <TextScramble
                  text=" mobile development"
                  className="text-[#40E0D0]"
                />, from property management to real-time chat applications.
              </motion.p>
            </div>

            {/* Project counter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-6"
            >
              <div className="text-center">
                <div className="text-5xl font-bold text-white">
                  <AnimatedCounter value={projects.length} />
                </div>
                <div className="text-gray-500 text-sm">Featured</div>
              </div>
              <div className="w-[1px] h-16 bg-white/10" />
              <div className="text-center">
                <div className="text-5xl font-bold text-[#40E0D0]">
                  <AnimatedCounter value={15} suffix="+" />
                </div>
                <div className="text-gray-500 text-sm">Total Built</div>
              </div>
            </motion.div>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-white/40 text-sm font-mono">
              {String(activeProject + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#40E0D0]"
                initial={{ width: '0%' }}
                animate={{ width: `${((activeProject + 1) / projects.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-white/40 text-sm font-mono">
              {String(projects.length).padStart(2, '0')}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Project Cards Grid */}
      <div className="relative px-6 md:px-12 lg:px-16 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <CinematicProjectCard
                key={project.mainTitle}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* View All Projects Button */}
      <div className="relative px-6 md:px-12 lg:px-16 pb-20">
        <div className="max-w-7xl mx-auto text-center">
          <MagneticElement strength={0.4}>
            <motion.a
              href="https://github.com/SayyedainDev"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 px-8 py-4 bg-transparent border-2 border-white/10 text-white font-medium rounded-full relative overflow-hidden"
              whileHover={{ borderColor: 'rgba(64, 224, 208, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background fill */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#40E0D0] to-[#20B2AA]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />

              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                <TextScramble text="View All Projects on GitHub" />
              </span>

              <motion.svg
                className="w-5 h-5 relative z-10 group-hover:text-black transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 4 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.a>
          </MagneticElement>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none" />
    </section>
  );
};

export default Projects;

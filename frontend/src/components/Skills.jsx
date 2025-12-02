import React, { lazy, Suspense, useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useScroll, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MagneticElement from './MagneticElement';
import TextScramble from './TextScramble';
import RevealAnimation from './RevealAnimation';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// SVG PATH DEFINITIONS - Optimized for smooth morphing
// ============================================================================
const SVG_PATHS = {
  // Initial code brackets (starting state for morphs)
  code: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',

  // Flutter logo
  flutter: 'M14.314 0L2.5 11.815 6.066 15.38 21.5 0h-7.186zm0 11.066l-3.567 3.568 3.567 3.566 3.566-3.566-3.566-3.568zM6.066 18.946L2.5 15.38 6.066 11.815l3.566 3.565-3.566 3.566z',

  // Server/Node.js icon
  nodejs: 'M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l7.44 4.3c.23.13.5.2.78.2s.55-.07.78-.2l7.44-4.3c.48-.28.78-.8.78-1.36V7.72c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.14-.5-.21-.78-.21zm-.01 3.15l5.44 3.15v6.3L12 17.6l-5.44-3.15v-6.3L12 5z',

  // Cloud icon
  cloud: 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4c.34 0 .68.04 1 .1C7.99 7.56 9.8 6 12 6c2.62 0 4.88 1.86 5.39 4.43C19.47 10.64 21 12.61 21 15c0 1.65-1.35 3-3 3z',

  // Database cylinder
  database: 'M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm6 14c0 .5-2.13 2-6 2s-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V17zm0-4c0 .5-2.13 2-6 2s-6-1.5-6-2V9c0 .5 2.13 2 6 2s6-1.5 6-2v4zm-6-4c-3.87 0-6-1.5-6-2s2.13-2 6-2 6 1.5 6 2-2.13 2-6 2z',

  // Microservices/Grid
  microservices: 'M3 3h6v6H3V3zm0 8h6v6H3v-6zm8-8h6v6h-6V3zm0 8h6v6h-6v-6zm8-8h2v6h-6V3h4zm-4 8h6v6h-6v-6z',

  // DevOps/Gear icon
  devops: 'M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
};

// ============================================================================
// MORPHING SVG ICON COMPONENT
// Uses GSAP + CSS transitions for smooth path morphing effect
// ============================================================================
const MorphingSkillIcon = ({ skill, index }) => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const glowRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get the target path based on skill id
  const targetPath = SVG_PATHS[skill.pathId] || SVG_PATHS.code;
  const startPath = SVG_PATHS.code;

  useGSAP(() => {
    if (!containerRef.current || !pathRef.current) return;

    const ctx = gsap.context(() => {
      // Initial state - invisible and scaled down
      gsap.set(containerRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 40,
      });

      gsap.set(pathRef.current, {
        attr: { d: startPath },
        fill: 'rgba(64, 224, 208, 0.3)',
        strokeDasharray: 200,
        strokeDashoffset: 200,
      });

      // Create scroll-triggered timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none none',
          once: true,
          onEnter: () => setHasAnimated(true),
        },
      });

      // Container entrance animation
      tl.to(containerRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'back.out(1.7)',
      });

      // Path drawing animation (stroke dash)
      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      }, `-=0.4`);

      // Path morphing animation using CSS transition (d attribute)
      // GSAP will animate the fill while CSS handles the path transition
      tl.to(pathRef.current, {
        attr: { d: targetPath },
        fill: skill.hexColor,
        duration: 0.6,
        ease: 'power2.inOut',
      }, `-=0.3`);

      // Glow pulse
      if (glowRef.current) {
        tl.fromTo(glowRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 0.6, scale: 1.2, duration: 0.4, ease: 'power2.out' },
          `-=0.4`
        );
        tl.to(glowRef.current, {
          opacity: 0,
          scale: 1.5,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, { dependencies: [skill, index] });

  // Hover animation
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (pathRef.current) {
      gsap.to(pathRef.current, {
        scale: 1.15,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (pathRef.current) {
      gsap.to(pathRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <MagneticElement strength={0.2}>
      <motion.div
        ref={containerRef}
        className="relative flex flex-col items-center justify-center w-32 md:w-40 h-32 md:h-40 bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl border border-white/5 hover:border-[#40E0D0]/30 transition-all duration-500 cursor-pointer overflow-hidden group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -8 }}
      >
        {/* Background glow effect */}
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${skill.hexColor}40 0%, transparent 70%)`,
            opacity: 0,
          }}
        />

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${skill.hexColor}15 0%, transparent 70%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(135deg, ${skill.hexColor}20 0%, transparent 50%, ${skill.hexColor}10 100%)`,
          }}
        />

        {/* SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-12 h-12 mb-3 transition-transform duration-300"
          style={{ overflow: 'visible' }}
        >
          <path
            ref={pathRef}
            d={hasAnimated ? targetPath : startPath}
            fill={hasAnimated ? skill.hexColor : 'rgba(64, 224, 208, 0.3)'}
            stroke={skill.hexColor}
            strokeWidth="0.5"
            style={{
              transformOrigin: 'center',
              transition: 'd 0.6s cubic-bezier(0.4, 0, 0.2, 1), fill 0.4s ease',
            }}
          />
        </svg>

        {/* Label with scramble effect */}
        <span className="text-sm text-gray-400 text-center font-medium px-2 transition-colors duration-300 group-hover:text-white">
          {isHovered ? <TextScramble text={skill.title} /> : skill.title}
        </span>

        {/* Skill level indicator */}
        {skill.level && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: skill.hexColor }}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        )}

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
          <motion.div
            className="absolute -top-6 -right-6 w-12 h-12 rotate-45"
            style={{ background: `linear-gradient(135deg, ${skill.hexColor}30, transparent)` }}
            animate={{ opacity: isHovered ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </MagneticElement>
  );
};

// Animated proficiency badge
const ProficiencyBadge = ({ level, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {[1, 2, 3, 4, 5].map((dot) => (
        <motion.div
          key={dot}
          className={`w-2 h-2 rounded-full ${dot <= level ? 'bg-[#40E0D0]' : 'bg-white/10'}`}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: delay + dot * 0.05 }}
        />
      ))}
    </motion.div>
  );
};

// ============================================================================
// MAIN SKILLS SECTION COMPONENT
// ============================================================================
const Skills = () => {
  const sectionRef = useRef(null);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const skills = [
    {
      pathId: 'flutter',
      title: 'Flutter / Dart',
      hexColor: '#40E0D0',
      level: 90,
    },
    {
      pathId: 'cloud',
      title: 'Firebase',
      hexColor: '#FFA000',
      level: 85,
    },
    {
      pathId: 'nodejs',
      title: 'Node.js (Learning)',
      hexColor: '#68A063',
      level: 50,
    },
    {
      pathId: 'database',
      title: 'Python',
      hexColor: '#3776AB',
      level: 70,
    },
    {
      pathId: 'code',
      title: 'REST APIs',
      hexColor: '#40E0D0',
      level: 75,
    },
    {
      pathId: 'devops',
      title: 'Git / GitHub',
      hexColor: '#F472B6',
      level: 80,
    },
  ];

  // Additional tools/technologies
  const additionalTools = [
    { name: 'Hive (Local DB)', proficiency: 4 },
    { name: 'Google/FB Auth', proficiency: 5 },
    { name: 'Deep Linking', proficiency: 4 },
    { name: 'Localization', proficiency: 4 },
    { name: 'State Management', proficiency: 4 },
    { name: 'VS Code', proficiency: 5 },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 px-6 md:px-12 lg:px-16 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(64, 224, 208, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(64, 224, 208, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-10 w-64 h-64 rounded-full blur-[120px]"
          animate={{
            background: [
              'radial-gradient(circle, rgba(64, 224, 208, 0.08) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(64, 224, 208, 0.12) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(64, 224, 208, 0.08) 0%, transparent 70%)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full blur-[150px]"
          animate={{
            background: [
              'radial-gradient(circle, rgba(236, 72, 153, 0.06) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(236, 72, 153, 0.06) 0%, transparent 70%)',
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-[1px] bg-[#40E0D0]" />
            <span className="text-[#40E0D0] text-sm font-mono tracking-wider">EXPERTISE</span>
            <div className="w-8 h-[1px] bg-[#40E0D0]" />
          </motion.div>

          {/* Title */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            <RevealAnimation type="chars" stagger={0.02}>
              Technical Stack
            </RevealAnimation>
          </h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Technologies and tools I use to build
            <TextScramble text=" robust, scalable" className="text-[#40E0D0]" />
            {' '}applications
          </motion.p>
        </div>

        {/* Skills Grid with Morphing Icons */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-20">
          {skills.map((skill, index) => (
            <MorphingSkillIcon
              key={skill.pathId}
              skill={skill}
              index={index}
            />
          ))}
        </div>

        {/* Additional tools section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-white text-xl font-semibold mb-8 text-center">
            Additional Technologies
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {additionalTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:border-[#40E0D0]/20 transition-all duration-300 group"
              >
                <span className="text-gray-400 group-hover:text-white transition-colors">
                  {tool.name}
                </span>
                <ProficiencyBadge level={tool.proficiency} delay={0.2 + index * 0.05} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '6+', label: 'Core Technologies' },
            { value: '10+', label: 'Tools & Libraries' },
            { value: '4+', label: 'Flutter Apps' },
            { value: '24/7', label: 'Learning Mode' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-gradient-to-br from-white/[0.02] to-transparent rounded-2xl border border-white/5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ borderColor: 'rgba(64, 224, 208, 0.2)', y: -4 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-[#40E0D0] mb-2">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none" />
    </section>
  );
};

export default Skills;

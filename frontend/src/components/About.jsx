import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Code2, Server, Smartphone, Cloud, Database, GitBranch } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticElement from './MagneticElement';
import TextScramble from './TextScramble';
import RevealAnimation from './RevealAnimation';

gsap.registerPlugin(ScrollTrigger);

// Animated skill bar
const SkillBar = ({ skill, level, delay = 0, color = '#40E0D0' }) => {
  const barRef = useRef(null);
  const isInView = useInView(barRef, { once: true });

  return (
    <motion.div
      ref={barRef}
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex justify-between items-center">
        <span className="text-white/80 text-sm font-medium">{skill}</span>
        <span className="text-[#40E0D0] text-sm font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
};

// Floating experience card
const ExperienceCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-6 bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl border border-white/5 hover:border-[#40E0D0]/20 transition-all duration-500"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at center, rgba(64, 224, 208, 0.05) 0%, transparent 70%)',
        }}
      />

      {/* Icon */}
      <motion.div
        className="w-12 h-12 rounded-xl bg-[#40E0D0]/10 flex items-center justify-center mb-4 relative"
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Icon className="w-6 h-6 text-[#40E0D0]" />
      </motion.div>

      {/* Content */}
      <h4 className="text-white font-semibold mb-2">{title}</h4>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
        <motion.div
          className="absolute top-0 right-0 w-full h-full border-t border-r border-[#40E0D0]/20"
          style={{ borderRadius: '0 1rem 0 0' }}
          animate={{ opacity: isHovered ? 1 : 0.3 }}
        />
      </div>
    </motion.div>
  );
};

// Animated timeline item
const TimelineItem = ({ year, title, company, description, isLast = false, delay = 0 }) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative pl-8 pb-8"
    >
      {/* Timeline line */}
      {!isLast && (
        <motion.div
          className="absolute left-[7px] top-4 w-[2px] h-full bg-gradient-to-b from-[#40E0D0] to-transparent"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
          style={{ transformOrigin: 'top' }}
        />
      )}

      {/* Timeline dot */}
      <motion.div
        className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#121212] border-2 border-[#40E0D0]"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay }}
      >
        <motion.div
          className="absolute inset-1 rounded-full bg-[#40E0D0]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Content */}
      <div className="space-y-1">
        <span className="text-[#40E0D0] text-sm font-mono">{year}</span>
        <h4 className="text-white font-semibold text-lg">{title}</h4>
        <p className="text-gray-500 text-sm">{company}</p>
        <p className="text-gray-400 text-sm leading-relaxed pt-2">{description}</p>
      </div>
    </motion.div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  const springConfig = { stiffness: 100, damping: 30 };
  const titleYSpring = useSpring(titleY, springConfig);

  // Skills data
  const skills = [
    { skill: 'Flutter & Dart', level: 90 },
    { skill: 'Firebase', level: 85 },
    { skill: 'Node.js (Learning)', level: 50 },
    { skill: 'Python', level: 70 },
    { skill: 'Git & GitHub', level: 80 },
    { skill: 'REST APIs', level: 75 },
  ];

  // Experience areas
  const experiences = [
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Building cross-platform apps with Flutter, Firebase, and native integrations.',
    },
    {
      icon: Server,
      title: 'Backend (Learning)',
      description: 'Currently learning Node.js and Express for backend development.',
    },
    {
      icon: Cloud,
      title: 'Firebase Services',
      description: 'Authentication, Firestore, Cloud Functions, and real-time databases.',
    },
    {
      icon: Database,
      title: 'Databases',
      description: 'Experience with Firebase/Firestore and local storage with Hive.',
    },
  ];

  // Timeline data
  const timeline = [
    {
      year: 'OCt 2025 - Present',
      title: 'Backend Developer Intern',
      company: 'SPS Technologies',
      description: 'Currently learning and working on backend development with Node.js and AWS.',
    },
    {
      year: 'Jul - Aug 2025',
      title: 'Mobile Developer Intern',
      company: 'Optimus Fox',
      description: '6-week internship building Flutter apps including Property Management, Pet Adoption, and Shopping applications.',
    },
    {
      year: '2022 - 2026',
      title: 'BS Computer Science',
      company: 'University',
      description: 'Currently in 7th semester (Senior Year). Focused on software engineering and full-stack development.',
    },
  ];

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for decorative elements
      gsap.to('.floating-shape', {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-32 px-6 md:px-12 lg:px-16 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, rgba(64, 224, 208, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Floating shapes */}
        <div className="floating-shape absolute top-20 right-[10%] w-64 h-64 rounded-full bg-[#40E0D0]/5 blur-[100px]" />
        <div className="floating-shape absolute bottom-40 left-[5%] w-96 h-96 rounded-full bg-[#40E0D0]/3 blur-[120px]" />

        {/* Decorative lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
          <motion.line
            x1="0%" y1="30%" x2="100%" y2="70%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#40E0D0" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          style={{ y: titleYSpring }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="w-12 h-[1px] bg-[#40E0D0]"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
            <span className="text-[#40E0D0] text-sm font-mono tracking-wider">ABOUT ME</span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            <RevealAnimation type="chars" stagger={0.02}>
              My Journey
            </RevealAnimation>
          </h2>
        </motion.div>

        {/* Main content grid */}
        <motion.div
          ref={contentRef}
          style={{ y: contentY }}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24"
        >
          {/* Left column - Story and timeline */}
          <div className="space-y-12">
            {/* Story */}
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                I'm a Computer Science student in my senior year, passionate about
                software engineering. I started with Flutter mobile development and
                I'm now transitioning toward backend development.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                My expertise is in <span className="text-[#40E0D0] font-semibold">Flutter + Firebase</span>,
                where I've built apps with Auth, Hive, Deep Linking, and Localization.
                Currently learning <span className="text-[#40E0D0] font-semibold">Node.js</span> to expand into backend.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 leading-relaxed"
              >
                I also have experience with Python and basic data analysis tools.
              </motion.p>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-[#40E0D0]" />
                Experience Timeline
              </h3>
              <div className="space-y-0">
                {timeline.map((item, index) => (
                  <TimelineItem
                    key={item.year}
                    {...item}
                    isLast={index === timeline.length - 1}
                    delay={index * 0.15}
                  />
                ))}
              </div>
            </div>

            {/* CTA */}
            <MagneticElement strength={0.3}>
              <motion.a
                href="https://www.linkedin.com/in/muhammad-sayyedain-112510269/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-transparent border border-[#40E0D0]/30 text-[#40E0D0] rounded-full hover:bg-[#40E0D0]/10 transition-all duration-300"
                whileHover={{ borderColor: '#40E0D0' }}
                whileTap={{ scale: 0.95 }}
              >
                <TextScramble text="Connect on LinkedIn" />
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={18} />
                </motion.div>
              </motion.a>
            </MagneticElement>
          </div>

          {/* Right column - Skills and experience cards */}
          <div className="space-y-12">
            {/* Skills */}
            <div>
              <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#40E0D0]" />
                Technical Skills
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <SkillBar
                    key={skill.skill}
                    {...skill}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>

            {/* Experience cards grid */}
            <div>
              <h3 className="text-white text-xl font-semibold mb-6">Areas of Expertise</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {experiences.map((exp, index) => (
                  <ExperienceCard
                    key={exp.title}
                    {...exp}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-6 p-6 bg-gradient-to-br from-[#40E0D0]/5 to-transparent rounded-2xl border border-[#40E0D0]/10"
            >
              {[
                { value: '2', label: 'Internships' },
                { value: '4+', label: 'Projects' },
                { value: '7th', label: 'Semester' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#40E0D0]">{stat.value}</div>
                  <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none" />
    </section>
  );
};

export default About;

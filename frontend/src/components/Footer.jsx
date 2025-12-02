import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import MagneticElement from './MagneticElement';
import TextScramble from './TextScramble';

// Animated link component
const AnimatedLink = ({ href, children, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative text-gray-400 text-sm hover:text-white transition-colors duration-300 group"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">
        {isHovered ? <TextScramble text={children} /> : children}
      </span>
      {/* Underline animation */}
      <motion.span
        className="absolute bottom-0 left-0 h-[1px] bg-[#40E0D0]"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '100%' : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

// Animated dot separator
const DotSeparator = ({ delay = 0 }) => (
  <motion.span
    className="w-1 h-1 rounded-full bg-[#40E0D0]/50"
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay }}
  />
);

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true });
  const currentYear = new Date().getFullYear();

  // Parallax effect for footer
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/SayyedainDev', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-sayyedain-112510269/', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
  ];

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative py-16 px-6 md:px-12 lg:px-16 bg-[#030303] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top gradient line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px]"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'linear-gradient(90deg, transparent, #40E0D0, transparent)',
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #40E0D0 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full bg-[#40E0D0]/5 blur-[100px]" />
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        style={{ opacity, y }}
      >
        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand column */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <MagneticElement strength={0.2}>
                <a href="#" className="inline-block">
                  <span className="text-2xl font-bold text-white">
                    Portfolio<span className="text-[#40E0D0]">.</span>
                  </span>
                </a>
              </MagneticElement>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-sm leading-relaxed"
            >
              CS Student passionate about Flutter development.
              Always learning, always building.
            </motion.p>
          </div>

          {/* Navigation column */}
          <div className="space-y-4">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white font-semibold text-sm tracking-wider"
            >
              NAVIGATION
            </motion.h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link, index) => (
                <AnimatedLink key={link.label} href={link.href} delay={0.1 + index * 0.05}>
                  {link.label}
                </AnimatedLink>
              ))}
            </nav>
          </div>

          {/* Social column */}
          <div className="space-y-4">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white font-semibold text-sm tracking-wider"
            >
              CONNECT
            </motion.h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <MagneticElement key={social.label} strength={0.3}>
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#40E0D0]/50 hover:bg-[#40E0D0]/10 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -3 }}
                    title={social.label}
                  >
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-[#40E0D0] transition-colors"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                </MagneticElement>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-[1px] bg-white/5 mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm flex items-center gap-2"
          >
            © {currentYear}
            <span className="text-white font-medium">Muhammad Sayyedain</span>
            <DotSeparator delay={0.2} />
            <span>All Rights Reserved</span>
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-sm flex items-center gap-2"
          >
            <span>Engineered with</span>
            <motion.span
              className="text-[#40E0D0]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              ♥
            </motion.span>
            <span>& Precision</span>
          </motion.p>

          {/* Back to top */}
          <MagneticElement strength={0.4}>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 text-gray-500 text-sm hover:text-[#40E0D0] transition-colors"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -2 }}
            >
              <span>Back to top</span>
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </motion.svg>
            </motion.button>
          </MagneticElement>
        </div>
      </motion.div>

      {/* Final decorative element */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-[#40E0D0]/30"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15
              }}
            />
          ))}
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;

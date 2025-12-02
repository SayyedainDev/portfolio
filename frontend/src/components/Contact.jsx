import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticElement from './MagneticElement';
import RevealAnimation from './RevealAnimation';

const Contact = () => {
  const sectionRef = useRef(null);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Social links
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/SayyedainDev', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 px-6 md:px-12 lg:px-16 bg-[#050505] overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#40E0D0]/5 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#40E0D0]/3 blur-[120px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(64, 224, 208, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(64, 224, 208, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />

        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, #050505 70%)',
          }}
        />
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div
          style={{ y: titleY, opacity }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-[#40E0D0]" />
            <span className="text-[#40E0D0] text-sm font-mono tracking-wider">GET IN TOUCH</span>
            <div className="w-8 h-[1px] bg-[#40E0D0]" />
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            <RevealAnimation type="words" stagger={0.05}>
              Let's Connect
            </RevealAnimation>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg max-w-lg mx-auto"
          >
            Open to internship opportunities and exciting projects. Feel free to reach out!
          </motion.p>
        </motion.div>

        {/* Direct LinkedIn CTA and Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          {/* LinkedIn Button */}
          <MagneticElement strength={0.4}>
            <motion.a
              href="https://www.linkedin.com/in/muhammad-sayyedain-112510269/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-[#0A66C2] text-white font-semibold text-lg rounded-full overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />

              {/* LinkedIn Icon */}
              <svg className="w-6 h-6 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>

              <span className="relative z-10">Connect on LinkedIn</span>

              <motion.svg
                className="w-5 h-5 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.a>
          </MagneticElement>

          {/* Other Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-4 mt-10"
          >
            {socialLinks.filter(s => s.name !== 'LinkedIn').map((social, index) => (
              <MagneticElement key={social.name} strength={0.3}>
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#40E0D0]/50 hover:bg-[#40E0D0]/10 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-[#40E0D0] transition-colors"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              </MagneticElement>
            ))}
          </motion.div>
        </motion.div>

        {/* Email alternative */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm">
            Or reach out directly at{' '}
            <a
              href="mailto:sayyedain0001@gmail.com"
              className="text-[#40E0D0] hover:underline"
            >
              sayyedain0001@gmail.com
            </a>
          </p>
        </motion.div>
      </div>

      {/* Bottom decorative element */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'linear-gradient(90deg, transparent, #40E0D0, transparent)',
        }}
      />
    </section>
  );
};

export default Contact;

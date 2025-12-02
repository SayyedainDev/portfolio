import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { scrollToElement } from '../utils/scroll';
import MagneticElement from './MagneticElement';
import TextScramble from './TextScramble';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef(null);
  const indicatorRef = useRef(null);

  const navItems = [
    { id: 'projects', label: 'Projects' },
    { id: 'stack', label: 'Stack' },
    { id: 'experience', label: 'Experience' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ['hero', 'projects', 'stack', 'experience', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate indicator position
  useEffect(() => {
    if (!indicatorRef.current || !navRef.current) return;

    const activeItem = navRef.current.querySelector(`[data-section="${activeSection}"]`);
    if (activeItem && navItems.some(item => item.id === activeSection)) {
      const rect = activeItem.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();

      gsap.to(indicatorRef.current, {
        x: rect.left - navRect.left + rect.width / 2 - 3,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(indicatorRef.current, {
        opacity: 0,
        duration: 0.2,
      });
    }
  }, [activeSection]);

  const handleNavClick = (id) => {
    scrollToElement(id);
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#121212]/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with magnetic effect */}
          <MagneticElement strength={0.3} radius={80}>
            <motion.div
              className="text-lg md:text-xl font-bold text-white cursor-pointer relative group"
              onClick={() => scrollToElement('hero')}
            >
              <span className="relative z-10">
                <TextScramble>Muhammad Sayyedain</TextScramble>
              </span>
              <motion.div
                className="absolute -inset-2 bg-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                layoutId="logo-highlight"
              />
            </motion.div>
          </MagneticElement>

          {/* Desktop Menu - Center with active indicator */}
          <div ref={navRef} className="hidden md:flex items-center space-x-10 relative">
            {/* Active indicator dot */}
            <div
              ref={indicatorRef}
              className="absolute -bottom-2 w-1.5 h-1.5 bg-accent rounded-full opacity-0"
              style={{ transform: 'translateX(-50%)' }}
            />

            {navItems.map((item, index) => (
              <MagneticElement key={item.id} strength={0.4} radius={60}>
                <motion.button
                  data-section={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-medium transition-colors duration-300 relative group ${
                    activeSection === item.id ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <TextScramble>{item.label}</TextScramble>

                  {/* Hover underline effect */}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                </motion.button>
              </MagneticElement>
            ))}
          </div>

          {/* Hire Me Button with magnetic effect */}
          <MagneticElement strength={0.5} radius={100}>
            <motion.button
              onClick={() => handleNavClick('contact')}
              className="hidden md:block relative px-6 py-2.5 overflow-hidden group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {/* Button background with gradient animation */}
              <span className="absolute inset-0 bg-accent rounded-full" />
              <span className="absolute inset-0 bg-gradient-to-r from-accent via-cyan-400 to-accent bg-[length:200%_100%] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient" />

              {/* Button border glow */}
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: '0 0 20px rgba(64, 224, 208, 0.5), inset 0 0 20px rgba(64, 224, 208, 0.1)',
                }}
              />

              <span className="relative z-10 text-black font-semibold text-sm">
                <TextScramble>Contact Me</TextScramble>
              </span>
            </motion.button>
          </MagneticElement>

          {/* Mobile Menu Button */}
          <MagneticElement strength={0.6} radius={50}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-accent p-2 relative"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </MagneticElement>
        </div>
      </div>

      {/* Mobile Menu - Full screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-0 bg-[#0a0a0a] z-40"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                  onClick={() => handleNavClick(item.id)}
                  className="text-4xl font-bold text-white hover:text-accent transition-colors"
                >
                  <TextScramble>{item.label}</TextScramble>
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                onClick={() => handleNavClick('contact')}
                className="mt-8 px-10 py-4 bg-accent text-black font-bold text-xl rounded-full"
              >
                <TextScramble>Contact Me</TextScramble>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

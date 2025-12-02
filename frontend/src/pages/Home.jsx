import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  // Smooth scroll to hash on page load
  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="relative bg-[#0A0A0A]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />

        {/* Main content sections */}
        <main>
          <Hero />
          <Projects />
          <Skills />
          <About />
          <Contact />
        </main>

        <Footer />

        {/* Page progress indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-[#40E0D0] origin-left z-[100]"
          style={{
            scaleX: 0,
          }}
          initial={{ scaleX: 0 }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;

import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, gradient = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2
        className={`text-4xl md:text-5xl font-bold mb-4 ${
          gradient ? 'gradient-text' : 'text-white'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '100px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="h-1 bg-gradient-to-r from-neon-purple to-neon-cyan mx-auto mt-6 rounded-full"
      />
    </motion.div>
  );
};

export default SectionTitle;

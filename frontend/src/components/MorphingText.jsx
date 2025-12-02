// MorphingText.jsx
// Text that morphs between different words/phrases
// Premium animated text effect for headers and CTAs

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const MorphingText = ({
  words = ['Developer', 'Designer', 'Creator'],
  className = '',
  interval = 3000,
  morphDuration = 1,
}) => {
  const textRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const morph = () => {
      const nextIndex = (currentIndex + 1) % words.length;

      // Create timeline for morphing effect
      const tl = gsap.timeline({
        onComplete: () => setCurrentIndex(nextIndex),
      });

      // Scramble out current text
      tl.to(text, {
        duration: morphDuration * 0.4,
        opacity: 0,
        y: -20,
        filter: 'blur(10px)',
        ease: 'power2.in',
      });

      // Update text content
      tl.call(() => {
        text.textContent = words[nextIndex];
      });

      // Reveal new text
      tl.fromTo(text,
        {
          opacity: 0,
          y: 20,
          filter: 'blur(10px)',
        },
        {
          duration: morphDuration * 0.6,
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          ease: 'power2.out',
        }
      );
    };

    const timer = setInterval(morph, interval);
    return () => clearInterval(timer);
  }, [currentIndex, words, interval, morphDuration]);

  return (
    <span
      ref={textRef}
      className={`inline-block ${className}`}
    >
      {words[0]}
    </span>
  );
};

export default MorphingText;

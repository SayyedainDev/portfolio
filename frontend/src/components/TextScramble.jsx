// TextScramble.jsx
// Cryptographic text scramble effect on hover - like Apple and premium tech sites
// Characters randomly shuffle before revealing the final text

import React, { useRef, useState, useEffect, useCallback } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

const TextScramble = ({
  children,
  className = '',
  speed = 30,
  scrambleOnMount = false,
  as: Component = 'span',
  ...props
}) => {
  const elementRef = useRef(null);
  const frameRef = useRef(null);
  const queueRef = useRef([]);
  const frameCountRef = useRef(0);
  const [displayText, setDisplayText] = useState(children);
  const originalText = useRef(children);

  const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

  const setText = useCallback((newText) => {
    const oldText = originalText.current;
    const length = Math.max(oldText.length, newText.length);
    const queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from, to, start, end });
    }

    queueRef.current = queue;
    frameCountRef.current = 0;

    const update = () => {
      let output = '';
      let complete = 0;

      for (let i = 0; i < queueRef.current.length; i++) {
        const { from, to, start, end } = queueRef.current[i];

        if (frameCountRef.current >= end) {
          complete++;
          output += to;
        } else if (frameCountRef.current >= start) {
          if (Math.random() < 0.28) {
            output += randomChar();
          } else {
            output += queueRef.current[i].char || randomChar();
          }
          queueRef.current[i].char = randomChar();
        } else {
          output += from;
        }
      }

      setDisplayText(output);
      frameCountRef.current++;

      if (complete < queueRef.current.length) {
        frameRef.current = requestAnimationFrame(update);
      } else {
        originalText.current = newText;
      }
    };

    cancelAnimationFrame(frameRef.current);
    update();
  }, []);

  const handleMouseEnter = () => {
    setText(children);
  };

  useEffect(() => {
    if (scrambleOnMount) {
      const timeout = setTimeout(() => setText(children), 500);
      return () => clearTimeout(timeout);
    }
  }, [scrambleOnMount, children, setText]);

  useEffect(() => {
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <Component
      ref={elementRef}
      className={`font-mono ${className}`}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {displayText}
    </Component>
  );
};

export default TextScramble;

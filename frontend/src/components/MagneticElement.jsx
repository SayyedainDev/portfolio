// MagneticElement.jsx
// Premium magnetic hover effect component - pulls elements toward cursor
// Used by Apple, Nike, and premium agency sites

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

const MagneticElement = ({
  children,
  strength = 0.5,
  radius = 100,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const elementRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      if (!isHovered) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < radius) {
        const magnetStrength = (1 - distance / radius) * strength;

        gsap.to(element, {
          x: deltaX * magnetStrength,
          y: deltaY * magnetStrength,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered, strength, radius]);

  return (
    <Component
      ref={elementRef}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default MagneticElement;

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Add magnetic effect to interactive elements
    const addMagneticEffect = () => {
      const magneticElements = document.querySelectorAll('[data-magnetic]');
      
      magneticElements.forEach((element) => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          const distance = Math.sqrt(x * x + y * y);
          const maxDistance = 100;
          
          if (distance < maxDistance) {
            const strength = (maxDistance - distance) / maxDistance;
            const pullX = x * strength * 0.3;
            const pullY = y * strength * 0.3;
            
            cursorX.set(e.clientX - 16 + pullX);
            cursorY.set(e.clientY - 16 + pullY);
            setIsHovering(true);
          } else {
            setIsHovering(false);
          }
        };

        const handleMouseEnterElement = () => {
          setIsHovering(true);
        };

        const handleMouseLeaveElement = () => {
          setIsHovering(false);
        };

        element.addEventListener('mousemove', handleMouseMove as EventListener);
        element.addEventListener('mouseenter', handleMouseEnterElement);
        element.addEventListener('mouseleave', handleMouseLeaveElement);
      });
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Add magnetic effects after a short delay to ensure elements are rendered
    setTimeout(addMagneticEffect, 100);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 400, damping: 28 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </motion.div>
      
      {/* Cursor trail effect */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 pointer-events-none z-[9998] bg-white/40 rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isVisible ? [0, 20] : 0,
          opacity: isVisible ? [1, 0] : 0,
        }}
        transition={{
          scale: { duration: 0.8, ease: 'easeOut' },
          opacity: { duration: 0.8, ease: 'easeOut' },
          repeat: Infinity,
          repeatDelay: 0.2,
        }}
      />
    </>
  );
}


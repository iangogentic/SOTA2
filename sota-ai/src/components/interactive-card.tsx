'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
}

export function InteractiveCard({ children, className = '' }: InteractiveCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };
  
  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Card className="glass-morphism border-primary/10 overflow-hidden relative">
        {/* Gradient overlay that follows mouse */}
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mouseX.get() * 100 + 50}% ${mouseY.get() * 100 + 50}%, oklch(0.7 0.18 264 / 0.1), transparent 40%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 shimmer pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </Card>
    </motion.div>
  );
}



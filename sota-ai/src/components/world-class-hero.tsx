'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { Immersive3DHero } from './immersive-3d-hero';
import { MagneticCursor } from './magnetic-cursor';

export function WorldClassHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23e5e5e5'%3e%3cpath d='m0 .5h32m-32 32v-32'%3e%3c/path%3e%3c/svg%3e")`,
        }}
      />
      <div 
        className="absolute inset-0 opacity-30 dark:block hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23262626'%3e%3cpath d='m0 .5h32m-32 32v-32'%3e%3c/path%3e%3c/svg%3e")`,
        }}
      />
      
      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-white/50 dark:bg-black/20 backdrop-blur-sm text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live AI Intelligence Platform
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent leading-[0.9]">
            State of the Art
            <br />
            <span className="text-4xl md:text-6xl lg:text-7xl font-light">AI News</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          The definitive source for AI developments. Our intelligence system processes 
          thousands of sources daily to deliver only what matters most to the future of artificial intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button 
            size="lg" 
            className="h-12 px-8 text-base font-medium bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-all duration-200 group"
          >
            Explore Today's Digest
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="lg" 
            className="h-12 px-8 text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 group"
          >
            <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-neutral-200 dark:border-neutral-800"
        >
          {[
            { value: "247", label: "Sources" },
            { value: "98.7%", label: "Accuracy" },
            { value: "24/7", label: "Monitoring" }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Brain, Globe } from 'lucide-react';

export function ScrollytellingHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "50%"]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.8]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, 5]), springConfig);

  // Advanced scroll-triggered animations
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 0.3]);

  return (
    <section ref={containerRef} className="relative min-h-[200vh] overflow-hidden">
      {/* Dynamic background layers */}
      <div className="sticky top-0 h-screen">
        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950"
          style={{ y: backgroundY }}
        />
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div 
                className={`w-${4 + Math.floor(Math.random() * 8)} h-${4 + Math.floor(Math.random() * 8)} bg-gradient-to-r ${
                  i % 4 === 0 ? 'from-blue-500 to-purple-500' :
                  i % 4 === 1 ? 'from-green-500 to-teal-500' :
                  i % 4 === 2 ? 'from-orange-500 to-red-500' :
                  'from-purple-500 to-pink-500'
                } rounded-full blur-sm`}
              />
            </motion.div>
          ))}
        </div>

        {/* Neural network pattern overlay */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "10%"]) }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="neural" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="currentColor" />
                <line x1="10" y1="10" x2="30" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                <line x1="10" y1="10" x2="30" y2="-10" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural)" />
          </svg>
        </motion.div>

        {/* Content container */}
        <motion.div
          className="relative z-10 flex items-center justify-center h-full px-4"
          style={{ y, opacity, scale, rotateX }}
        >
          <div className="max-w-6xl mx-auto text-center">
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-white/50 dark:bg-black/20 backdrop-blur-sm text-sm font-medium shadow-lg">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-blue-600" />
                </motion.div>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                  AI-Powered Intelligence Platform
                </span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
            </motion.div>

            {/* Main heading with staggered animation */}
            <div className="mb-8">
              {['State of the Art', 'AI News'].map((line, index) => (
                <motion.h1
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 1, 
                    delay: 0.4 + index * 0.2,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`font-bold tracking-tight leading-none ${
                    index === 0 
                      ? 'text-6xl md:text-8xl lg:text-9xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent'
                      : 'text-4xl md:text-6xl lg:text-7xl text-gray-600 dark:text-gray-400 font-light'
                  }`}
                >
                  {line}
                </motion.h1>
              ))}
            </div>

            {/* Subtitle with typewriter effect */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, delay: 1 }}
                className="inline-block overflow-hidden whitespace-nowrap"
              >
                The definitive source for AI developments. Our neural intelligence system processes thousands of sources daily.
              </motion.span>
            </motion.p>

            {/* Interactive feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
            >
              {[
                { icon: Brain, label: "Neural Processing", value: "AI-Powered" },
                { icon: Globe, label: "Global Sources", value: "247+" },
                { icon: Zap, label: "Real-time", value: "24/7" },
                { icon: Sparkles, label: "Accuracy", value: "98.7%" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group p-4 rounded-xl bg-white/30 dark:bg-black/20 backdrop-blur-sm border border-white/20 hover:bg-white/50 dark:hover:bg-black/30 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="mb-3"
                  >
                    <item.icon className="w-8 h-8 text-blue-600 mx-auto" />
                  </motion.div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {item.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons with magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button 
                size="lg" 
                className="h-14 px-8 text-lg font-medium bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-all duration-300 group shadow-xl hover:shadow-2xl"
                data-magnetic
              >
                <span className="flex items-center gap-2">
                  Explore AI Intelligence
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="lg" 
                className="h-14 px-8 text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
                data-magnetic
              >
                <span className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-2">
                    <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-1" />
                  </div>
                  Watch Demo
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 text-sm flex flex-col items-center gap-2"
          >
            <span>Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Overlay for depth */}
        <motion.div
          className="absolute inset-0 bg-black/10 dark:bg-white/5 pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />
      </div>
    </section>
  );
}

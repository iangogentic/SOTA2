'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, ArrowRight, Zap, Activity, Code, Cpu } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { NeuralBackground } from './neural-background';

function AnimatedSphere() {
  return (
    <Sphere args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#667eea"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.1}
        metalness={0.8}
      />
    </Sphere>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden aurora-bg">
      <NeuralBackground />
      
      {/* 3D Sphere Background */}
      <div className="absolute inset-0 -z-5">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedSphere />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y, opacity }}
      >
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl morph-shape opacity-30"
          animate={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, oklch(0.75 0.15 320 / 0.4), transparent)',
          }}
          animate={{
            x: mousePosition.x * -1.5,
            y: mousePosition.y * -1.5,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 150 }}
        />
      </motion.div>

      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="mb-8"
          >
            <Badge variant="secondary" className="mb-6 px-6 py-3 glass-morphism border-primary/20 shimmer">
              <Activity className="h-4 w-4 mr-2 animate-pulse" />
              <span className="font-semibold">AI-Powered News Intelligence Platform</span>
            </Badge>
            
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
              <motion.span 
                className="block holographic"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                State of the Art
              </motion.span>
              <motion.span 
                className="block text-foreground mt-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                AI <span className="glitch-text">News</span>
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl lg:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            Experience the future of AI journalism. Our neural intelligence system 
            monitors <span className="font-semibold text-primary">247 sources</span> in real-time, 
            processes <span className="font-semibold text-primary">thousands of articles</span> daily, 
            and delivers only the most groundbreaking AI developments with 
            <span className="font-semibold text-primary"> 98.7% accuracy</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Tilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              glareEnable={true}
              glareMaxOpacity={0.3}
              glareColor="oklch(0.7 0.18 264)"
              glareBorderRadius="12px"
            >
              <Button 
                size="lg" 
                className="text-lg px-10 py-7 glow-border rounded-xl bg-primary hover:bg-primary/90 transform transition-all duration-300 hover:scale-105"
              >
                <Brain className="mr-3 h-6 w-6" />
                Explore Today's Digest
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Tilt>
            
            <Tilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-10 py-7 glass-morphism border-primary/20 rounded-xl transform transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="mr-3 h-6 w-6" />
                How It Works
              </Button>
            </Tilt>
          </motion.div>

          {/* Feature highlights with 3D perspective */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.05}
              transitionSpeed={2000}
            >
              <div className="glass-morphism p-8 text-center rounded-2xl perspective-card h-full data-stream">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 float-animation">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-3">Neural Analysis Engine</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Deep learning algorithms process and rank AI breakthroughs by global impact score
                </p>
              </div>
            </Tilt>
            
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.05}
              transitionSpeed={2000}
            >
              <div className="glass-morphism p-8 text-center rounded-2xl perspective-card h-full neural-network">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 float-animation" style={{ animationDelay: '2s' }}>
                  <Cpu className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-3">Quantum-Speed Updates</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Millisecond latency monitoring with predictive trend analysis and alerts
                </p>
              </div>
            </Tilt>
            
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.05}
              transitionSpeed={2000}
            >
              <div className="glass-morphism p-8 text-center rounded-2xl perspective-card h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 float-animation" style={{ animationDelay: '4s' }}>
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-3">Precision Curation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  99.9% signal-to-noise ratio through advanced content filtering
                </p>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

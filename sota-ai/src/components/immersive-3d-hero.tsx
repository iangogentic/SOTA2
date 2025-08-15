'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text3D, Environment, MeshDistortMaterial, Sphere, Box, Torus } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Floating AI Orbs Component
function AIOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const orbs = useMemo(() => [
    { position: [2, 1, 0], scale: 0.8, color: '#6366f1' },
    { position: [-2, -1, 1], scale: 0.6, color: '#8b5cf6' },
    { position: [0, 2, -1], scale: 0.4, color: '#06b6d4' },
    { position: [1.5, -2, 0.5], scale: 0.5, color: '#10b981' },
    { position: [-1.5, 0.5, -0.8], scale: 0.3, color: '#f59e0b' },
  ], []);

  return (
    <group ref={groupRef}>
      {orbs.map((orb, index) => (
        <Float
          key={index}
          speed={1 + index * 0.2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <Sphere
            position={orb.position as [number, number, number]}
            scale={orb.scale}
            args={[1, 32, 32]}
          >
            <MeshDistortMaterial
              color={orb.color}
              attach="material"
              distort={0.3}
              speed={2}
              roughness={0.1}
              metalness={0.8}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

// Neural Network Connections
function NeuralConnections() {
  const linesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Line) {
          const material = child.material as THREE.LineBasicMaterial;
          material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.2;
        }
      });
    }
  });

  const connections = useMemo(() => {
    const lines = [];
    const points = [
      new THREE.Vector3(2, 1, 0),
      new THREE.Vector3(-2, -1, 1),
      new THREE.Vector3(0, 2, -1),
      new THREE.Vector3(1.5, -2, 0.5),
      new THREE.Vector3(-1.5, 0.5, -0.8),
    ];

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const geometry = new THREE.BufferGeometry().setFromPoints([points[i], points[j]]);
        lines.push(
          <line key={`${i}-${j}`} geometry={geometry}>
            <lineBasicMaterial color="#6366f1" transparent opacity={0.3} />
          </line>
        );
      }
    }
    return lines;
  }, []);

  return <group ref={linesRef}>{connections}</group>;
}

// Morphing Central Element
function MorphingCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1);
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <Torus ref={meshRef} args={[1, 0.3, 16, 100]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#ffffff"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0}
          metalness={1}
          transparent
          opacity={0.8}
        />
      </Torus>
    </Float>
  );
}

// 3D Scene Component
function Scene() {
  const { camera } = useThree();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.1) * 0.5;
    camera.position.y = Math.cos(t * 0.1) * 0.2;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#6366f1" intensity={0.5} />
      
      <MorphingCore />
      <AIOrbs />
      <NeuralConnections />
    </>
  );
}

// Main Component
export function Immersive3DHero() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <Scene />
      </Canvas>
      
      {/* Interactive Overlay Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}


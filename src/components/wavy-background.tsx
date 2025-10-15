'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function WaveBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 119, 168, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(138, 180, 248, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(138, 180, 248, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(255, 119, 168, 0.15) 0%, transparent 50%), radial-gradient(circle at 60% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(255, 119, 168, 0.15) 0%, transparent 50%), radial-gradient(circle at 30% 30%, rgba(120, 119, 198, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(138, 180, 248, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 119, 168, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(138, 180, 248, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/30 backdrop-blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.sin(particle.id) * 80, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Pulsating Circles */}
      <div className="absolute top-1/4 left-1/4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-purple-400/20"
            style={{
              width: 100,
              height: 100,
              left: -50,
              top: -50,
            }}
            animate={{
              scale: [1, 3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 2,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-1/3 right-1/4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-blue-400/20"
            style={{
              width: 80,
              height: 80,
              left: -40,
              top: -40,
            }}
            animate={{
              scale: [1, 2.5, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 1.7,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Energy lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M 0,200 Q 200,100 400,200 T 800,200"
          stroke="rgba(138, 180, 248, 0.2)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.path
          d="M 1440,300 Q 1200,200 1000,300 T 600,300"
          stroke="rgba(255, 119, 168, 0.2)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/80"></div>
    </div>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";

interface ParticleSystemProps {
  particleCount?: number;
  particleSize?: number;
  speed?: number;
  color?: string;
  opacity?: number;
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function ParticleSystem({
  particleCount = 50,
  particleSize = 2,
  speed = 0.5,
  color = '#00f5ff',
  opacity = 0.3,
  interactive = true
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize particles
  const initializeParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * particleSize + 1,
        opacity: Math.random() * opacity + 0.1
      });
    }
    
    particlesRef.current = particles;
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Update and draw particles
    particlesRef.current.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Boundary collision
      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;
      
      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(width, particle.x));
      particle.y = Math.max(0, Math.min(height, particle.y));
      
      // Interactive mouse effect
      if (interactive) {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.01;
          particle.vy += (dy / distance) * force * 0.01;
        }
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `${color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
      ctx.fill();
      
      // Draw connections to nearby particles
      particlesRef.current.slice(index + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 80) {
          const connectionOpacity = (80 - distance) / 80 * 0.2;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.strokeStyle = `${color}${Math.floor(connectionOpacity * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });
    
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Handle mouse movement
  const handleMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  // Handle resize
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    
    const parent = canvas.parentElement;
    const newWidth = parent.clientWidth;
    const newHeight = parent.clientHeight;
    
    canvas.width = newWidth;
    canvas.height = newHeight;
    
    setDimensions({ width: newWidth, height: newHeight });
    initializeParticles(newWidth, newHeight);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      animate();
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      data-testid="particle-system"
    />
  );
}

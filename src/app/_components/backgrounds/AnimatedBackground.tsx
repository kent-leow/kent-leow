"use client";

import { useEffect, useState } from "react";
import ParticleSystem from "./ParticleSystem";
import TechGrid from "../ui/TechGrid";

interface AnimatedBackgroundProps {
  intensity?: 'minimal' | 'moderate' | 'full';
  pattern?: 'particles' | 'geometric' | 'tech' | 'mixed';
  pauseOnLowPerformance?: boolean;
  reduceMotion?: boolean;
  className?: string;
}

export default function AnimatedBackground({
  intensity = 'moderate',
  pattern = 'mixed',
  pauseOnLowPerformance = true,
  reduceMotion = false,
  className = ''
}: AnimatedBackgroundProps) {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [performanceMode, setPerformanceMode] = useState<'high' | 'medium' | 'low'>('high');

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setShouldAnimate(!mediaQuery.matches && !reduceMotion);
    
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [reduceMotion]);

  // Performance monitoring
  useEffect(() => {
    if (!pauseOnLowPerformance) return;

    let frameCount = 0;
    let lastTime = performance.now();
    
    const measurePerformance = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        if (fps < 30) {
          setPerformanceMode('low');
        } else if (fps < 50) {
          setPerformanceMode('medium');
        } else {
          setPerformanceMode('high');
        }
      }
      
      if (shouldAnimate) {
        requestAnimationFrame(measurePerformance);
      }
    };
    
    if (shouldAnimate) {
      requestAnimationFrame(measurePerformance);
    }
  }, [shouldAnimate, pauseOnLowPerformance]);

  const getParticleConfig = () => {
    const baseConfig = {
      color: '#00f5ff',
      speed: 0.5,
      opacity: 0.3,
      interactive: true
    };

    if (performanceMode === 'low') {
      return {
        ...baseConfig,
        particleCount: 20,
        particleSize: 2,
        interactive: false
      };
    }

    if (performanceMode === 'medium') {
      return {
        ...baseConfig,
        particleCount: 35,
        particleSize: 2
      };
    }

    switch (intensity) {
      case 'minimal':
        return {
          ...baseConfig,
          particleCount: 25,
          particleSize: 1,
          opacity: 0.2
        };
      case 'full':
        return {
          ...baseConfig,
          particleCount: 80,
          particleSize: 3,
          opacity: 0.4
        };
      default:
        return {
          ...baseConfig,
          particleCount: 50,
          particleSize: 2
        };
    }
  };

  const getTechGridConfig = () => {
    const baseConfig = {
      animated: shouldAnimate,
      pattern: 'dots' as const
    };

    switch (intensity) {
      case 'minimal':
        return {
          ...baseConfig,
          intensity: 'subtle' as const
        };
      case 'full':
        return {
          ...baseConfig,
          intensity: 'prominent' as const,
          pattern: 'hexagon' as const
        };
      default:
        return {
          ...baseConfig,
          intensity: 'medium' as const
        };
    }
  };

  if (!shouldAnimate && pattern !== 'geometric') {
    return (
      <div className={`absolute inset-0 ${className}`} data-testid="animated-background-static">
        <TechGrid {...getTechGridConfig()} animated={false} />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} data-testid="animated-background">
      {/* Base tech grid */}
      {(pattern === 'geometric' || pattern === 'tech' || pattern === 'mixed') && (
        <TechGrid {...getTechGridConfig()} />
      )}
      
      {/* Particle system */}
      {shouldAnimate && (pattern === 'particles' || pattern === 'mixed') && (
        <ParticleSystem {...getParticleConfig()} />
      )}
      
      {/* Additional tech patterns for full intensity */}
      {shouldAnimate && intensity === 'full' && pattern === 'tech' && (
        <>
          <div className="absolute inset-0 opacity-10">
            <div 
              className="w-full h-full bg-gradient-to-br from-[#9b59b6]/20 to-[#00f5ff]/20 animate-pulse"
              style={{ animationDuration: '4s' }}
            />
          </div>
          
          <div className="absolute inset-0 opacity-5">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `linear-gradient(45deg, transparent 30%, #e94560 50%, transparent 70%)`,
                backgroundSize: '200px 200px',
                animation: shouldAnimate ? 'techSweep 8s linear infinite' : 'none'
              }}
            />
          </div>
        </>
      )}
      
      {/* CSS animations */}
      <style jsx>{`
        @keyframes techSweep {
          0% { transform: translateX(-100%) translateY(-100%); }
          100% { transform: translateX(100vw) translateY(100vh); }
        }
      `}</style>
    </div>
  );
}

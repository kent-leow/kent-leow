"use client";

import { useEffect, useState } from "react";

export interface ScrollProgress {
  scrollY: number;
  scrollProgress: number;
  scrollDirection: 'up' | 'down';
  scrollVelocity: number;
  isScrolling: boolean;
}

export function useScrollProgress(): ScrollProgress {
  const [scrollData, setScrollData] = useState<ScrollProgress>({
    scrollY: 0,
    scrollProgress: 0,
    scrollDirection: 'down',
    scrollVelocity: 0,
    isScrolling: false
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let ticking = false;
    let scrollTimeout: NodeJS.Timeout;

    const updateScrollData = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const deltaY = currentScrollY - lastScrollY;
      const deltaTime = currentTime - lastTime;
      
      const velocity = deltaTime > 0 ? Math.abs(deltaY / deltaTime) : 0;
      const direction = deltaY > 0 ? 'down' : 'up';
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? currentScrollY / maxScroll : 0;

      setScrollData({
        scrollY: currentScrollY,
        scrollProgress: Math.min(Math.max(progress, 0), 1),
        scrollDirection: direction,
        scrollVelocity: velocity,
        isScrolling: true
      });

      lastScrollY = currentScrollY;
      lastTime = currentTime;
      ticking = false;

      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Set scroll end timeout
      scrollTimeout = setTimeout(() => {
        setScrollData(prev => ({ ...prev, isScrolling: false }));
      }, 150);
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollData);
        ticking = true;
      }
    };

    const handleScroll = () => {
      requestTick();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial call
    updateScrollData();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return scrollData;
}

"use client";

import { useState, useEffect, useRef } from "react";
import type { EngagementMetrics } from "../types/storytelling";

export default function useEngagementTracking() {
  const [metrics, setMetrics] = useState<EngagementMetrics>({
    timeSpent: 0,
    sectionsViewed: [],
    interactionsCount: 0,
    scrollDepth: 0,
    lastActiveTime: Date.now()
  });

  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const maxScrollRef = useRef<number>(0);

  useEffect(() => {
    // Track time spent
    intervalRef.current = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        timeSpent: Date.now() - startTimeRef.current,
        lastActiveTime: Date.now()
      }));
    }, 1000);

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScrollRef.current) {
        maxScrollRef.current = scrollPercent;
        setMetrics(prev => ({
          ...prev,
          scrollDepth: scrollPercent,
          lastActiveTime: Date.now()
        }));
      }
    };

    // Track interactions
    const handleInteraction = () => {
      setMetrics(prev => ({
        ...prev,
        interactionsCount: prev.interactionsCount + 1,
        lastActiveTime: Date.now()
      }));
    };

    // Track section views using Intersection Observer
    const observeSections = () => {
      const sections = document.querySelectorAll('section[id]');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target.id) {
              setMetrics(prev => ({
                ...prev,
                sectionsViewed: [...new Set([...prev.sectionsViewed, entry.target.id])],
                lastActiveTime: Date.now()
              }));
            }
          });
        },
        { threshold: 0.5 }
      );

      sections.forEach(section => observer.observe(section));
      return observer;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    const sectionObserver = observeSections();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      
      sectionObserver.disconnect();
    };
  }, []);

  const trackSectionView = (sectionId: string) => {
    setMetrics(prev => ({
      ...prev,
      sectionsViewed: [...new Set([...prev.sectionsViewed, sectionId])],
      lastActiveTime: Date.now()
    }));
  };

  const trackInteraction = (_type: string) => {
    setMetrics(prev => ({
      ...prev,
      interactionsCount: prev.interactionsCount + 1,
      lastActiveTime: Date.now()
    }));
  };

  return {
    metrics,
    trackSectionView,
    trackInteraction
  };
}

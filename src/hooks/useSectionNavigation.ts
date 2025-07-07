"use client";

import { useState, useEffect, useCallback } from "react";
import type { NavigationState } from "../types/navigation";

export default function useSectionNavigation(sectionIds: string[]) {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentSection: sectionIds[0] || '',
    previousSection: '',
    scrollProgress: 0,
    isTransitioning: false
  });

  const updateCurrentSection = useCallback(() => {
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    let currentSection = sectionIds[0] || '';
    let maxVisibleArea = 0;

    sections.forEach((section) => {
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const sectionTop = scrollY + rect.top;
      const sectionBottom = sectionTop + rect.height;
      
      // Calculate visible area
      const visibleTop = Math.max(scrollY, sectionTop);
      const visibleBottom = Math.min(scrollY + windowHeight, sectionBottom);
      const visibleArea = Math.max(0, visibleBottom - visibleTop);
      
      if (visibleArea > maxVisibleArea) {
        maxVisibleArea = visibleArea;
        currentSection = section.id;
      }
    });

    // Calculate overall scroll progress
    const totalHeight = document.documentElement.scrollHeight - windowHeight;
    const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;

    setNavigationState(prev => ({
      ...prev,
      previousSection: prev.currentSection !== currentSection ? prev.currentSection : prev.previousSection,
      currentSection,
      scrollProgress: Math.min(100, Math.max(0, progress))
    }));
  }, [sectionIds]);

  const navigateToSection = useCallback((sectionId: string, smooth = true) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    setNavigationState(prev => ({
      ...prev,
      isTransitioning: true,
      previousSection: prev.currentSection
    }));

    section.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'start'
    });

    // Reset transitioning state after animation
    setTimeout(() => {
      setNavigationState(prev => ({
        ...prev,
        isTransitioning: false
      }));
    }, 1000);
  }, []);

  const navigateNext = useCallback(() => {
    const currentIndex = sectionIds.indexOf(navigationState.currentSection);
    const nextIndex = (currentIndex + 1) % sectionIds.length;
    navigateToSection(sectionIds[nextIndex] || '', true);
  }, [navigationState.currentSection, sectionIds, navigateToSection]);

  const navigatePrevious = useCallback(() => {
    const currentIndex = sectionIds.indexOf(navigationState.currentSection);
    const prevIndex = currentIndex === 0 ? sectionIds.length - 1 : currentIndex - 1;
    navigateToSection(sectionIds[prevIndex] || '', true);
  }, [navigationState.currentSection, sectionIds, navigateToSection]);

  useEffect(() => {
    updateCurrentSection();
    
    const handleScroll = () => {
      updateCurrentSection();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          navigateNext();
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          navigatePrevious();
          break;
        case 'Home':
          e.preventDefault();
          navigateToSection(sectionIds[0] || '', true);
          break;
        case 'End':
          e.preventDefault();
          navigateToSection(sectionIds[sectionIds.length - 1] || '', true);
          break;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sectionIds, updateCurrentSection, navigateNext, navigatePrevious, navigateToSection]);

  return {
    navigationState,
    navigateToSection,
    navigateNext,
    navigatePrevious
  };
}

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
    const offset = 100; // Account for fixed navigation
    
    let currentSection = sectionIds[0] || '';
    let maxScore = 0;
    let currentSectionElement: HTMLElement | null = null;

    sections.forEach((section) => {
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const sectionTop = scrollY + rect.top;
      const sectionBottom = sectionTop + rect.height;
      const sectionCenter = sectionTop + (rect.height / 2);
      
      // Calculate multiple scoring factors
      const visibleTop = Math.max(scrollY + offset, sectionTop);
      const visibleBottom = Math.min(scrollY + windowHeight, sectionBottom);
      const visibleArea = Math.max(0, visibleBottom - visibleTop);
      const visiblePercentage = visibleArea / rect.height;
      
      // Bonus for section being near the top
      const topProximity = Math.max(0, 1 - Math.abs((scrollY + offset) - sectionTop) / windowHeight);
      
      // Bonus for section center being in view
      const centerInView = sectionCenter >= scrollY && sectionCenter <= scrollY + windowHeight ? 1 : 0;
      
      // Combined score
      const score = (visiblePercentage * 100) + (topProximity * 50) + (centerInView * 25);
      
      if (score > maxScore) {
        maxScore = score;
        currentSection = section.id;
        currentSectionElement = section;
      }
    });

    // Simplified and more reliable progress calculation
    let progress = 0;
    
    if (sections.length > 0) {
      // Method 1: Calculate based on document scroll position
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = documentHeight - viewportHeight;
      
      if (maxScroll > 0) {
        progress = Math.min(100, Math.max(0, (scrollY / maxScroll) * 100));
      }
      
      // Method 2: Section-based progress (fallback)
      if (progress === 0 || isNaN(progress)) {
        const currentIndex = sectionIds.indexOf(currentSection);
        const sectionProgress = currentIndex >= 0 ? (currentIndex / Math.max(1, sectionIds.length - 1)) * 100 : 0;
        
        // Add intra-section progress if we have the current section element
        if (currentSectionElement && currentIndex >= 0) {
          const sectionRect = (currentSectionElement as HTMLElement).getBoundingClientRect();
          const sectionTop = scrollY + sectionRect.top;
          const sectionScrolled = Math.max(0, scrollY - sectionTop);
          const sectionProgressValue = Math.min(100, (sectionScrolled / sectionRect.height) * 100);
          const intraSectionBonus = sectionProgressValue / sectionIds.length;
          progress = Math.min(100, sectionProgress + intraSectionBonus);
        } else {
          progress = sectionProgress;
        }
      }
    }

    // Ensure we always have some progress if we're not at the very top
    if (progress === 0 && scrollY > 50) {
      progress = Math.min(5, (scrollY / 1000) * 100); // Minimum progress indicator
    }

    // Development debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Progress calculation:', {
        scrollY,
        currentSection,
        progress: Math.round(progress),
        sectionsFound: sections.length,
        documentHeight: document.documentElement.scrollHeight,
        windowHeight: window.innerHeight
      });
    }

    setNavigationState(prev => ({
      ...prev,
      previousSection: prev.currentSection !== currentSection ? prev.currentSection : prev.previousSection,
      currentSection,
      scrollProgress: Math.round(progress)
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

    // Calculate offset for fixed header/navigation
    const offset = 80;
    const elementPosition = section.offsetTop - offset;

    window.scrollTo({
      top: Math.max(0, elementPosition),
      behavior: smooth ? 'smooth' : 'auto'
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
    // Wait for DOM to be fully loaded before initial calculation
    const initializeNavigation = () => {
      updateCurrentSection();
    };

    // Initial calculation with multiple attempts to ensure DOM is ready
    const initialTimer = setTimeout(initializeNavigation, 100);
    const fallbackTimer = setTimeout(initializeNavigation, 500);
    
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateCurrentSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      updateCurrentSection();
    };

    // Force update on load
    const handleLoad = () => {
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

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('load', handleLoad);
    window.addEventListener('keydown', handleKeyDown);

    // Immediate calculation if DOM is already ready
    if (document.readyState === 'complete') {
      initializeNavigation();
    } else {
      document.addEventListener('DOMContentLoaded', initializeNavigation);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('DOMContentLoaded', initializeNavigation);
      clearTimeout(initialTimer);
      clearTimeout(fallbackTimer);
    };
  }, [sectionIds, updateCurrentSection, navigateNext, navigatePrevious, navigateToSection]);

  return {
    navigationState,
    navigateToSection,
    navigateNext,
    navigatePrevious
  };
}

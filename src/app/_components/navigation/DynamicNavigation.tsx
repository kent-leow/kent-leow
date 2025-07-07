"use client";

import React from "react";
import type { NavigationConfig, NavigationSection } from "../../../types/navigation";
import useSectionNavigation from "../../../hooks/useSectionNavigation";
import Tooltip from "../ui/Tooltip";

interface DynamicNavigationProps {
  config: NavigationConfig;
  className?: string;
}

export default function DynamicNavigation({ config, className = '' }: DynamicNavigationProps) {
  const sectionIds = config.sections.map(section => section.id);
  const { navigationState, navigateToSection } = useSectionNavigation(sectionIds);

  const { sections, smooth, highlightActive, showProgress } = config;
  const { currentSection, scrollProgress } = navigationState;

  return (
    <div className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center ${className}`}>
      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-6 w-1.5 h-32 bg-bg-elevated/50 rounded-full overflow-hidden backdrop-blur-sm border border-border-muted/40 relative shadow-inner">
          {/* Progress fill with purple gradient */}
          <div 
            className="w-full bg-gradient-to-t from-primary-700 via-primary-600 to-primary-500 transition-all duration-500 ease-out rounded-full absolute bottom-0"
            style={{ 
              height: `${Math.max(1, Math.round(scrollProgress))}%`,
              background: scrollProgress > 0 ? 
                'linear-gradient(to top, #6d28d9, #7c3aed, #8b5cf6, #a78bfa)' : 
                'transparent',
              boxShadow: scrollProgress > 0 ? 
                'inset 0 1px 3px rgba(0,0,0,0.2), 0 0 15px rgba(124, 58, 237, 0.7), 0 0 25px rgba(124, 58, 237, 0.4)' : 
                'none',
              transform: 'translateZ(0)',
              filter: scrollProgress > 0 ? 'brightness(1.1) saturate(1.2)' : 'none'
            }}
          />
          
          {/* Subtle glow effect at the top of progress */}
          {scrollProgress > 5 && (
            <div 
              className="absolute w-2 h-1 -left-0.25 bg-primary-400/80 rounded-full blur-sm transition-all duration-300"
              style={{
                bottom: `${Math.max(0, Math.round(scrollProgress) - 1)}%`,
                boxShadow: '0 0 6px rgba(168, 139, 250, 0.9)'
              }}
            />
          )}
          
          {/* Debug info - remove in production */}
          {process.env.NODE_ENV === 'development' && (
            <div className="absolute -right-20 top-0 text-xs text-white bg-black/70 px-2 py-1 rounded whitespace-nowrap backdrop-blur-sm">
              {Math.round(scrollProgress)}%
            </div>
          )}
        </div>
      )}

      {/* Navigation Dots */}
      <nav className="flex flex-col items-center space-y-4" role="navigation" aria-label="Section navigation">
        {sections.map((section, index) => {
          const isActive = currentSection === section.id;
          
          return (
            <Tooltip
              key={section.id}
              config={{
                content: `${section.title}`,
                position: 'left',
                trigger: 'hover',
                delay: 300
              }}
            >
              <button
                onClick={() => navigateToSection(section.id, smooth)}
                className={`relative group flex items-center justify-center transition-all duration-300 ease-out ${
                  isActive ? 'scale-110' : 'hover:scale-105'
                }`}
                aria-label={`Navigate to ${section.title}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Outer Ring with Enhanced Styling */}
                <div 
                  className={`relative w-4 h-4 rounded-full border-2 transition-all duration-300 ease-out ${
                    isActive 
                      ? 'border-primary-500 bg-primary-500/20 shadow-lg shadow-primary-500/40' 
                      : 'border-text-tertiary/50 hover:border-text-tertiary/80 hover:bg-text-tertiary/10'
                  }`}
                >
                  {/* Inner Dot */}
                  <div 
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out ${
                      isActive 
                        ? 'w-2 h-2 bg-primary-500' 
                        : 'w-1.5 h-1.5 bg-text-tertiary group-hover:w-2 group-hover:h-2 group-hover:bg-text-secondary'
                    }`}
                  />
                  
                  {/* Active Pulse Effect */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full border-2 border-primary-500 animate-ping opacity-30" />
                  )}
                </div>

                {/* Section Icon */}
                {section.icon && (
                  <div 
                    className={`absolute -left-10 top-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
                      isActive 
                        ? 'opacity-100 text-primary-500 scale-100' 
                        : 'opacity-0 group-hover:opacity-70 text-text-tertiary scale-90 group-hover:scale-100'
                    }`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      {section.icon}
                    </div>
                  </div>
                )}

                {/* Active Section Label */}
                {/* {isActive && highlightActive && (
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 -translate-x-full mr-3 animate-fade-in">
                    <div className="px-3 py-1.5 bg-primary-600 text-white text-xs font-medium rounded-md whitespace-nowrap shadow-lg border border-primary-500/30 backdrop-blur-sm">
                      {section.title}
                    </div>
                    <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-l-[5px] border-l-primary-600 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent" />
                  </div>
                )} */}
              </button>
            </Tooltip>
          );
        })}
      </nav>

      {/* Navigation Controls - Vertically Aligned */}
      <div className="mt-6 flex flex-col items-center space-y-2">
        <Tooltip
          config={{
            content: 'Previous section',
            position: 'left',
            trigger: 'hover',
            delay: 200
          }}
        >
          <button
            onClick={() => {
              const currentIndex = sectionIds.indexOf(currentSection);
              const prevIndex = currentIndex === 0 ? sectionIds.length - 1 : currentIndex - 1;
              navigateToSection(sectionIds[prevIndex] || '', smooth);
            }}
            className="flex items-center justify-center w-8 h-8 bg-bg-elevated/60 hover:bg-bg-elevated/80 text-text-tertiary hover:text-white rounded-full backdrop-blur-sm transition-all duration-200 shadow-lg border border-border-muted/30 hover:border-primary-500/50 hover:shadow-primary-500/20"
            aria-label="Previous section"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </Tooltip>

        <Tooltip
          config={{
            content: 'Next section',
            position: 'left',
            trigger: 'hover',
            delay: 200
          }}
        >
          <button
            onClick={() => {
              const currentIndex = sectionIds.indexOf(currentSection);
              const nextIndex = (currentIndex + 1) % sectionIds.length;
              navigateToSection(sectionIds[nextIndex] || '', smooth);
            }}
            className="flex items-center justify-center w-8 h-8 bg-bg-elevated/60 hover:bg-bg-elevated/80 text-text-tertiary hover:text-white rounded-full backdrop-blur-sm transition-all duration-200 shadow-lg border border-border-muted/30 hover:border-primary-500/50 hover:shadow-primary-500/20"
            aria-label="Next section"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

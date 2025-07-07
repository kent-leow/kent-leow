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
    <div className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 ${className}`}>
      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-4 w-1 h-32 bg-[#1a1a2e]/30 rounded-full overflow-hidden">
          <div 
            className="w-full bg-gradient-to-b from-[#3498db] to-[#e94560] transition-all duration-300 rounded-full"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* Navigation Dots */}
      <nav className="space-y-3">
        {sections.map((section, index) => {
          const isActive = currentSection === section.id;
          const sectionColor = section.color || '#3498db';
          
          return (
            <Tooltip
              key={section.id}
              config={{
                content: `${section.title}${section.description ? ` - ${section.description}` : ''}`,
                position: 'left',
                trigger: 'hover',
                delay: 200
              }}
            >
              <button
                onClick={() => navigateToSection(section.id, smooth)}
                className={`relative group block transition-all duration-300 ${
                  isActive ? 'scale-125' : 'hover:scale-110'
                }`}
                aria-label={`Navigate to ${section.title}`}
              >
                {/* Outer Ring */}
                <div 
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    isActive 
                      ? 'border-[#e94560] bg-[#e94560]/20' 
                      : 'border-[#a8a8a8]/40 hover:border-[#a8a8a8]/80'
                  }`}
                  style={{
                    borderColor: isActive ? '#e94560' : undefined,
                    backgroundColor: isActive ? `${sectionColor}20` : undefined
                  }}
                >
                  {/* Inner Dot */}
                  <div 
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                      isActive ? 'w-2 h-2' : 'w-1 h-1 group-hover:w-1.5 group-hover:h-1.5'
                    }`}
                    style={{
                      backgroundColor: isActive ? '#e94560' : '#a8a8a8'
                    }}
                  />
                </div>

                {/* Section Icon */}
                {section.icon && (
                  <div 
                    className={`absolute -left-8 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                      isActive 
                        ? 'opacity-100 text-[#e94560]' 
                        : 'opacity-0 group-hover:opacity-60 text-[#a8a8a8]'
                    }`}
                  >
                    <div className="w-5 h-5">
                      {section.icon}
                    </div>
                  </div>
                )}

                {/* Active Section Label */}
                {isActive && highlightActive && (
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full mr-4">
                    <div className="px-3 py-1 bg-[#e94560] text-white text-xs font-medium rounded-md whitespace-nowrap">
                      {section.title}
                    </div>
                    {/* Arrow */}
                    <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-[#e94560] border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent" />
                  </div>
                )}

                {/* Ripple Effect */}
                <div 
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    isActive ? 'animate-ping bg-[#e94560]/20' : ''
                  }`}
                  style={{
                    backgroundColor: isActive ? `${sectionColor}20` : undefined
                  }}
                />
              </button>
            </Tooltip>
          );
        })}
      </nav>

      {/* Navigation Controls */}
      <div className="mt-6 space-y-2">
        <Tooltip
          config={{
            content: 'Previous section (↑)',
            position: 'left',
            trigger: 'hover'
          }}
        >
          <button
            onClick={() => {
              const currentIndex = sectionIds.indexOf(currentSection);
              const prevIndex = currentIndex === 0 ? sectionIds.length - 1 : currentIndex - 1;
              navigateToSection(sectionIds[prevIndex] || '', smooth);
            }}
            className="block p-2 bg-[#1a1a2e]/60 hover:bg-[#1a1a2e]/80 text-[#a8a8a8] hover:text-white rounded-full backdrop-blur-sm transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </Tooltip>

        <Tooltip
          config={{
            content: 'Next section (↓)',
            position: 'left',
            trigger: 'hover'
          }}
        >
          <button
            onClick={() => {
              const currentIndex = sectionIds.indexOf(currentSection);
              const nextIndex = (currentIndex + 1) % sectionIds.length;
              navigateToSection(sectionIds[nextIndex] || '', smooth);
            }}
            className="block p-2 bg-[#1a1a2e]/60 hover:bg-[#1a1a2e]/80 text-[#a8a8a8] hover:text-white rounded-full backdrop-blur-sm transition-all duration-200"
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

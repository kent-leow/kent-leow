"use client";

import React, { useState, useEffect, useRef } from "react";
import type { StorytellingConfig, StorySection } from "../../../types/storytelling";
import ScrollTrigger from "../interactions/ScrollTrigger";
import ParallaxContainer from "../interactions/ParallaxContainer";

interface StorytellingExperienceProps {
  config: StorytellingConfig;
  onSectionChange?: (sectionIndex: number) => void;
  className?: string;
}

export default function StorytellingExperience({
  config,
  onSectionChange,
  className = ''
}: StorytellingExperienceProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const { sections, autoAdvance, pauseOnHover, showProgress } = config;
  const currentStory = sections[currentSection];

  useEffect(() => {
    if (autoAdvance && !isPaused && currentStory?.duration) {
      const duration = currentStory.duration * 1000; // Convert to milliseconds
      startTimeRef.current = Date.now();

      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);

        if (newProgress >= 100) {
          nextSection();
        }
      }, 100);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSection, isPaused, autoAdvance, currentStory?.duration]);

  const nextSection = () => {
    const newIndex = (currentSection + 1) % sections.length;
    setCurrentSection(newIndex);
    setProgress(0);
    onSectionChange?.(newIndex);
  };

  const prevSection = () => {
    const newIndex = currentSection === 0 ? sections.length - 1 : currentSection - 1;
    setCurrentSection(newIndex);
    setProgress(0);
    onSectionChange?.(newIndex);
  };

  const goToSection = (index: number) => {
    setCurrentSection(index);
    setProgress(0);
    onSectionChange?.(index);
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
      startTimeRef.current = Date.now() - (progress / 100 * (currentStory?.duration || 5) * 1000);
    }
  };

  return (
    <div 
      className={`relative min-h-screen overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background */}
      {currentStory?.background && (
        <div 
          className="absolute inset-0 transition-all duration-1000"
          style={{ 
            background: currentStory.background,
            opacity: 0.1 
          }}
        />
      )}

      {/* Progress Bar */}
      {showProgress && autoAdvance && (
        <div className="absolute top-0 left-0 right-0 z-50">
          <div className="h-1 bg-[#1a1a2e]/30">
            <div 
              className="h-full bg-gradient-to-r from-[#3498db] to-[#e94560] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="absolute top-4 right-4 z-40 flex gap-2">
        {/* Pause/Play Button */}
        {autoAdvance && (
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 bg-[#1a1a2e]/60 hover:bg-[#1a1a2e]/80 text-white rounded-full backdrop-blur-sm transition-all duration-200"
          >
            {isPaused ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            )}
          </button>
        )}

        {/* Section Indicators */}
        <div className="flex gap-1">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSection(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSection
                  ? 'bg-[#e94560]'
                  : 'bg-[#a8a8a8]/50 hover:bg-[#a8a8a8]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSection}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-[#1a1a2e]/60 hover:bg-[#1a1a2e]/80 text-white rounded-full backdrop-blur-sm transition-all duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSection}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-[#1a1a2e]/60 hover:bg-[#1a1a2e]/80 text-white rounded-full backdrop-blur-sm transition-all duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Story Content */}
      <div className="relative z-30 h-full">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSection
                ? 'opacity-100 translate-y-0'
                : index < currentSection
                ? 'opacity-0 -translate-y-8'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {index === currentSection && (
              <ScrollTrigger
                trigger="whileInView"
                animation={section.animation === 'parallax' ? 'custom' : (section.animation || 'fade')}
                threshold={0.1}
              >
                <ParallaxContainer speed={0.2}>
                  <div className="flex items-center justify-center min-h-screen px-8 py-16">
                    <div className="max-w-4xl mx-auto text-center">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f8f9fa] mb-8">
                        {section.title}
                      </h2>
                      <div className="text-lg md:text-xl text-[#a8a8a8] leading-relaxed">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </ParallaxContainer>
              </ScrollTrigger>
            )}
          </div>
        ))}
      </div>

      {/* Section Progress */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
        <div className="text-center text-[#a8a8a8] text-sm">
          {currentSection + 1} / {sections.length}
        </div>
      </div>
    </div>
  );
}

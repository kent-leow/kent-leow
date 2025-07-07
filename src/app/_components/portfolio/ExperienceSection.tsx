"use client";

import { useState, useEffect, useRef } from "react";
import type { WorkExperience } from "../../../types/portfolio";
import ScrollTrigger from "../interactions/ScrollTrigger";
import ParallaxContainer from "../interactions/ParallaxContainer";
import InteractiveCard from "../ui/InteractiveCard";

interface ExperienceSectionProps {
  experiences: WorkExperience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    const elements = document.querySelectorAll('[data-timeline-item]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-bg-tertiary via-bg-secondary to-bg-primary px-4 sm:px-8 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <ScrollTrigger
          trigger="onEnter"
          animation="slide"
          threshold={0.3}
        >
          <div className="text-center mb-20">
            <ParallaxContainer speed={0.3}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-600 via-primary-400 to-secondary-500 bg-clip-text text-transparent mb-6">
                Professional Journey
              </h2>
              <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                6+ years of full-stack development experience across diverse industries and cutting-edge technologies
              </p>
            </ParallaxContainer>
          </div>
        </ScrollTrigger>
        
        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Animated Timeline Line */}
          <div 
            ref={timelineRef}
            className="absolute left-6 md:left-1/2 md:-translate-x-0.5 top-0 w-0.5 bg-gradient-to-b from-primary-600 via-primary-400 to-secondary-500 opacity-30"
            style={{ height: '100%' }}
          >
            {/* Animated Progress Line */}
            <div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary-500 to-secondary-400 transition-all duration-1000 ease-out opacity-80 animate-timeline-draw"
              style={{ 
                height: visibleItems.size > 0 ? `${(visibleItems.size / experiences.length) * 100}%` : '0%',
                boxShadow: '0 0 10px rgba(124, 58, 237, 0.5)'
              }}
            />
          </div>
          
          {/* Experience Items */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                id={`timeline-${experience.id}`}
                data-timeline-item
                className={`relative ${
                  index % 2 === 0 
                    ? 'md:flex md:flex-row' 
                    : 'md:flex md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 z-20">
                  <div 
                    className={`w-full h-full rounded-full border-4 border-bg-primary transition-all duration-500 ${
                      visibleItems.has(`timeline-${experience.id}`)
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-400 scale-110 shadow-lg shadow-primary-500/50'
                        : 'bg-border-primary scale-100'
                    }`}
                  >
                    {visibleItems.has(`timeline-${experience.id}`) && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-secondary-400 animate-ping opacity-20" />
                    )}
                  </div>
                </div>
                
                {/* Experience Card */}
                <ScrollTrigger
                  trigger="onEnter"
                  animation="slide"
                  threshold={0.3}
                  delay={index * 150}
                >
                  <div className={`flex-1 ml-16 md:ml-0 ${
                    index % 2 === 0 
                      ? 'md:pr-12 md:text-right' 
                      : 'md:pl-12 md:text-left'
                  }`}>
                    <ParallaxContainer speed={0.1 + (index * 0.02)}>
                      <InteractiveCard 
                        variant="elevated"
                        className="group relative overflow-hidden border border-border-primary/30 hover:border-primary-500/50 transition-all duration-500 bg-gradient-to-br from-bg-surface/80 to-bg-elevated/60 backdrop-blur-sm"
                      >
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-transparent to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Card Content */}
                        <div className="relative z-10 p-6 md:p-8">
                          {/* Header */}
                          <div className="mb-6">
                            <div className={`flex items-start gap-4 mb-4 ${
                              index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''
                            }`}>
                              <div className="flex-1">
                                <h3 className="text-xl md:text-2xl font-bold text-text-primary group-hover:text-primary-400 transition-colors duration-300 mb-2">
                                  {experience.position}
                                </h3>
                                <h4 className="text-lg md:text-xl font-semibold text-primary-500 group-hover:text-primary-400 transition-colors duration-300 mb-3">
                                  {experience.company}
                                </h4>
                              </div>
                              
                              {/* Company Icon */}
                              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              </div>
                            </div>
                            
                            <div className={`flex flex-col sm:flex-row sm:items-center gap-3 text-text-tertiary text-sm ${
                              index % 2 === 0 ? 'md:justify-end' : ''
                            }`}>
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="font-medium">{experience.startDate} - {experience.endDate}</span>
                              </div>
                              <span className="hidden sm:inline text-border-primary">•</span>
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="font-medium">{experience.location}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Description */}
                          <p className="text-text-secondary mb-8 leading-relaxed group-hover:text-text-primary transition-colors duration-300">
                            {experience.description}
                          </p>
                          
                          {/* Achievements */}
                          <div className="space-y-4">
                            <div className={`flex items-center gap-2 ${
                              index % 2 === 0 ? 'md:justify-end' : ''
                            }`}>
                              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg>
                              <h5 className="text-amber-400 font-semibold text-sm uppercase tracking-wide">
                                Key Achievements
                              </h5>
                            </div>
                            
                            <div className="grid gap-3">
                              {experience.achievements.map((achievement, achIndex) => (
                                <div 
                                  key={achIndex}
                                  className="flex items-start gap-3 p-4 rounded-lg bg-bg-elevated/40 hover:bg-bg-elevated/60 border border-border-primary/20 hover:border-primary-500/30 transition-all duration-300 group/achievement backdrop-blur-sm"
                                >
                                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2 flex-shrink-0 group-hover/achievement:scale-125 transition-transform duration-200" />
                                  <span className="text-text-tertiary text-sm leading-relaxed group-hover/achievement:text-text-secondary transition-colors duration-300">
                                    {achievement}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </InteractiveCard>
                    </ParallaxContainer>
                  </div>
                </ScrollTrigger>
              </div>
            ))}
          </div>
        </div>
        
        {/* Career Summary */}
        <ScrollTrigger
          trigger="onEnter"
          animation="scale"
          threshold={0.4}
          delay={400}
        >
          <div className="mt-20">
            <ParallaxContainer speed={0.2}>
              <InteractiveCard 
                variant="elevated" 
                className="mx-auto max-w-4xl p-8 md:p-12 bg-gradient-to-r from-primary-600/10 via-bg-elevated/60 to-secondary-500/10 border border-primary-500/30 backdrop-blur-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="group">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-500 to-primary-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2">
                      6+
                    </div>
                    <div className="text-sm md:text-base text-text-tertiary font-medium">Years Experience</div>
                  </div>
                  
                  <div className="group">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary-500 to-secondary-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2">
                      {experiences.length}
                    </div>
                    <div className="text-sm md:text-base text-text-tertiary font-medium">Companies</div>
                  </div>
                  
                  <div className="group">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 mb-2">
                      100+
                    </div>
                    <div className="text-sm md:text-base text-text-tertiary font-medium">Projects Delivered</div>
                  </div>
                </div>
              </InteractiveCard>
            </ParallaxContainer>
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
}

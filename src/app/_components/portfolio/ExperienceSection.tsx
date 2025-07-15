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
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px' }
    );

    const elements = document.querySelectorAll('[data-timeline-item]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollTrigger trigger="onEnter" animation="slide" threshold={0.3}>
          <div className="text-center mb-16">
            <ParallaxContainer speed={0.3}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold section-title-gradient mb-6">
                Professional Journey
              </h2>
              <p className="text-lg md:text-xl text-[#cbd5e1] max-w-3xl mx-auto leading-relaxed">
                6+ years driving innovation across diverse industries with cutting-edge technologies
              </p>
            </ParallaxContainer>
          </div>
        </ScrollTrigger>

        {/* Interactive Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Timeline Line - positioned to avoid cards */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7c3aed] via-[#a78bfa] to-[#06b6d4] opacity-30 z-0" />
          
          {/* Progress Line */}
          <div 
            className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 w-0.5 bg-gradient-to-b from-[#7c3aed] to-[#06b6d4] transition-all duration-1000 ease-out shadow-lg shadow-[#7c3aed]/50 z-0"
            style={{ 
              height: visibleItems.size > 0 ? `${(visibleItems.size / experiences.length) * 100}%` : '0%'
            }}
          />

          {/* Experience Cards */}
          <div className="space-y-16 md:space-y-20">
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                id={`timeline-${experience.id}`}
                data-timeline-item
                className="relative"
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-6 h-6 z-30 top-8">
                  <div 
                    className={`w-full h-full rounded-full border-4 border-[#0f0f1a] transition-all duration-500 cursor-pointer ${
                      visibleItems.has(`timeline-${experience.id}`) || activeIndex === index
                        ? 'bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] scale-125 shadow-lg shadow-[#7c3aed]/50'
                        : 'bg-[#374151] hover:bg-[#4b5563] scale-100'
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    {(visibleItems.has(`timeline-${experience.id}`) || activeIndex === index) && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] animate-ping opacity-30" />
                    )}
                  </div>
                </div>

                {/* Experience Card */}
                <ScrollTrigger
                  trigger="onEnter"
                  animation="slide"
                  threshold={0.3}
                  delay={index * 100}
                >
                  <div className={`${
                    index % 2 === 0 
                      ? 'ml-20 md:ml-0 md:pr-20 md:max-w-xl' 
                      : 'ml-20 md:ml-0 md:pl-20 md:max-w-xl md:ml-auto'
                  }`}>
                    <ParallaxContainer speed={0.05 + (index * 0.01)}>
                      <InteractiveCard 
                        variant="tech"
                        className={`group relative overflow-hidden backdrop-blur-sm transition-all duration-500 z-10 ${
                          activeIndex === index 
                            ? 'border-[#7c3aed]/50 bg-[#7c3aed]/5 scale-105' 
                            : 'border-[#374151]/30 hover:border-[#7c3aed]/30'
                        }`}
                        onHover={() => setActiveIndex(index)}
                      >
                        {/* Animated Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/5 via-transparent to-[#06b6d4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative z-10 p-6">
                          {/* Company Header */}
                          <div className="flex items-start gap-4 mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg md:text-xl font-bold text-[#f8fafc] group-hover:text-[#a78bfa] transition-colors duration-300 mb-1">
                                {experience.position}
                              </h3>
                              <h4 className="text-base font-semibold text-[#7c3aed] group-hover:text-[#06b6d4] transition-colors duration-300 mb-3">
                                {experience.company}
                              </h4>
                              <div className="flex flex-wrap gap-3 text-xs text-[#94a3b8]">
                                <div className="flex items-center gap-1">
                                  <svg className="w-3 h-3 text-[#06b6d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <span>{experience.startDate} - {experience.endDate}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <svg className="w-3 h-3 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  <span>{experience.location}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="w-12 h-12 bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-[#cbd5e1] text-sm leading-relaxed mb-4 group-hover:text-[#f8fafc] transition-colors duration-300">
                            {experience.description}
                          </p>

                          {/* Key Achievements */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 mb-3">
                              <svg className="w-4 h-4 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg>
                              <h5 className="text-[#f59e0b] font-semibold text-xs uppercase tracking-wide">
                                Key Impact
                              </h5>
                            </div>
                            
                            <div className="space-y-2">
                              {experience.achievements.slice(0, 3).map((achievement, achIndex) => (
                                <div 
                                  key={achIndex}
                                  className="flex items-start gap-2 p-2 rounded-md bg-[#252545]/20 hover:bg-[#252545]/40 border border-[#374151]/20 hover:border-[#7c3aed]/30 transition-all duration-300 group/achievement"
                                  style={{ animationDelay: `${achIndex * 100}ms` }}
                                >
                                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#10b981] to-[#34d399] rounded-full mt-1.5 flex-shrink-0 group-hover/achievement:scale-125 transition-transform duration-200" />
                                  <span className="text-[#94a3b8] text-xs leading-relaxed group-hover/achievement:text-[#cbd5e1] transition-colors duration-300">
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

        {/* Experience Summary */}
        <ScrollTrigger trigger="onEnter" animation="fade" threshold={0.4} delay={300}>
          <div className="mt-20">
            <ParallaxContainer speed={0.2}>
              <InteractiveCard 
                variant="elevated" 
                className="mx-auto max-w-4xl p-8 lg:p-12 bg-gradient-to-br from-[#7c3aed]/10 via-[#252545]/40 to-[#06b6d4]/10 border border-[#7c3aed]/20 backdrop-blur-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="group relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#7c3aed]/20 to-[#a78bfa]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                        6+
                      </div>
                      <div className="text-sm text-[#94a3b8] font-medium mt-2">Years Experience</div>
                    </div>
                  </div>
                  
                  <div className="group relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#06b6d4]/20 to-[#22d3ee]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                        2
                      </div>
                      <div className="text-sm text-[#94a3b8] font-medium mt-2">Companies</div>
                    </div>
                  </div>
                  
                  <div className="group relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#10b981]/20 to-[#34d399]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#10b981] to-[#34d399] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                        10+
                      </div>
                      <div className="text-sm text-[#94a3b8] font-medium mt-2">Projects</div>
                    </div>
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

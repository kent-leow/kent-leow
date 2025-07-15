"use client";

import type { SkillCategory } from "../../../types/portfolio";
import InteractiveCard from "../ui/InteractiveCard";
import TechGrid from "../ui/TechGrid";
import ScrollTrigger from "../interactions/ScrollTrigger";
import ParallaxContainer from "../interactions/ParallaxContainer";
import AdaptiveGrid from "../layout/AdaptiveGrid";

interface SkillsSectionProps {
  skills: SkillCategory[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <ScrollTrigger
      trigger="onEnter"
      animation="slide"
      threshold={0.2}
    >
      <section className="relative min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        {/* Tech Grid Background */}
        <TechGrid pattern="lines" intensity="subtle" animated={true} />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Title */}
          <ParallaxContainer speed={0.3}>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold section-title-gradient mb-6">
                Technical Expertise
              </h2>
              <p className="text-lg md:text-xl text-[#cbd5e1] max-w-3xl mx-auto leading-relaxed">
                Modern full-stack technologies and frameworks that power scalable, maintainable solutions
              </p>
            </div>
          </ParallaxContainer>
          
          {/* Skills Grid */}
          <AdaptiveGrid minItemWidth={350} gap={32} className="mb-20">
            {skills.map((category, index) => (
              <ScrollTrigger
                key={category.category}
                trigger="onEnter"
                animation="scale"
                threshold={0.3}
                delay={index * 100}
              >
                <ParallaxContainer speed={0.08 + (index * 0.02)}>
                  <div style={{ animationDelay: `${index * 0.5}s` }}>
                    <InteractiveCard 
                      variant="tech"
                      className="group h-full relative overflow-hidden min-h-[400px] backdrop-blur-sm skill-card-float"
                    >
                    {/* Animated border gradient */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#7c3aed]/20 via-[#06b6d4]/20 to-[#7c3aed]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
                    
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/5 via-transparent to-[#06b6d4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Category Header */}
                    <div className="relative z-10 mb-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#7c3aed] via-[#a78bfa] to-[#06b6d4] rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-[#7c3aed]/25">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-[#f8fafc] group-hover:text-[#a78bfa] transition-colors duration-300 mb-2">
                        {category.category}
                      </h3>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] mx-auto opacity-50 group-hover:opacity-100 group-hover:w-16 transition-all duration-500" />
                    </div>
                    
                    {/* Skills Grid */}
                    <div className="grid grid-cols-1 gap-3 relative z-10 mb-6">
                      {category.skills.map((skill, skillIndex) => (
                        <div 
                          key={skill}
                          className="group/skill flex items-center gap-4 p-4 rounded-xl bg-[#252545]/20 hover:bg-[#252545]/40 border border-[#374151]/20 hover:border-[#7c3aed]/40 transition-all duration-300 backdrop-blur-sm skill-item-slide"
                          style={{
                            animationDelay: `${(index * 200) + (skillIndex * 80)}ms`,
                            transform: `translateY(${skillIndex * 2}px)`,
                            opacity: 0.9 + (skillIndex * 0.02)
                          }}
                        >
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] flex-shrink-0 group-hover/skill:scale-125 group-hover/skill:shadow-lg group-hover/skill:shadow-[#7c3aed]/50 transition-all duration-300" />
                          <span className="text-[#cbd5e1] text-sm font-medium group-hover/skill:text-[#f8fafc] transition-colors duration-200 flex-1">
                            {skill}
                          </span>
                          <div className="w-8 h-1 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] rounded-full opacity-0 group-hover/skill:opacity-100 transition-all duration-300 transform translate-x-2 group-hover/skill:translate-x-0" />
                        </div>
                      ))}
                    </div>
                    
                    {/* Skill Count Badge */}
                    <div className="mt-auto pt-6 border-t border-[#374151]/20 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                          <span className="text-xs text-[#94a3b8] font-medium">
                            {category.skills.length} technologies
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.min(5, Math.ceil(category.skills.length / 2)) }, (_, i) => (
                            <div 
                              key={i}
                              className="w-2 h-2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 tech-badge-pulse"
                              style={{ animationDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                      </div>                      </div>
                    </InteractiveCard>
                  </div>
                </ParallaxContainer>
              </ScrollTrigger>
            ))}
          </AdaptiveGrid>
          
          {/* Skills Summary */}
          <ScrollTrigger
            trigger="onEnter"
            animation="fade"
            threshold={0.4}
            delay={400}
          >
            <ParallaxContainer speed={0.2}>
              <div className="text-center">
                <InteractiveCard 
                  variant="elevated" 
                  className="inline-block p-8 lg:p-12 bg-gradient-to-br from-[#7c3aed]/10 via-[#252545]/30 to-[#06b6d4]/10 border border-[#7c3aed]/20 backdrop-blur-md"
                >
                  <div className="flex flex-wrap items-center justify-center gap-12 text-center">
                    <div className="group relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-[#7c3aed]/20 to-[#a78bfa]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative">
                        <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                          {skills.reduce((total, category) => total + category.skills.length, 0)}+
                        </div>
                        <div className="text-sm text-[#94a3b8] font-medium mt-2">Technologies</div>
                      </div>
                    </div>
                    
                    <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#374151] to-transparent"></div>
                    
                    <div className="group relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-[#06b6d4]/20 to-[#22d3ee]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative">
                        <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                          6+
                        </div>
                        <div className="text-sm text-[#94a3b8] font-medium mt-2">Years Experience</div>
                      </div>
                    </div>
                    
                    <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#374151] to-transparent"></div>
                    
                    <div className="group relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-[#10b981]/20 to-[#34d399]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative">
                        <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#10b981] to-[#34d399] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                          {skills.length}
                        </div>
                        <div className="text-sm text-[#94a3b8] font-medium mt-2">Skill Areas</div>
                      </div>
                    </div>
                  </div>
                </InteractiveCard>
                
                <div className="mt-12 max-w-4xl mx-auto">
                  <p className="text-[#cbd5e1] text-lg lg:text-xl leading-relaxed mb-8">
                    Experienced in modern full-stack development with expertise spanning frontend frameworks, 
                    backend systems, cloud platforms, and development best practices. Passionate about 
                    leveraging cutting-edge technologies to deliver scalable, maintainable solutions.
                  </p>
                  
                  {/* Additional expertise highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="flex items-center gap-3 justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                      <span className="text-[#94a3b8] text-sm font-medium">Cross-Platform Development</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse" />
                      <span className="text-[#94a3b8] text-sm font-medium">Cloud Architecture</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#06b6d4] animate-pulse" />
                      <span className="text-[#94a3b8] text-sm font-medium">AI-Powered Development</span>
                    </div>
                  </div>
                </div>
              </div>
            </ParallaxContainer>
          </ScrollTrigger>
        </div>
      </section>
    </ScrollTrigger>
  );
}

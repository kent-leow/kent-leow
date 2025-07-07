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
      <section className="relative min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] px-8 py-16 overflow-hidden">
        {/* Tech Grid Background */}
        <TechGrid pattern="lines" intensity="subtle" animated={true} />
        
        {/* Scroll to Explore Indicator */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center">
          <div className="scroll-indicator text-[#a78bfa] opacity-60">
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-xs font-medium">Scroll to explore</span>
          </div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto pt-16">
          {/* Section Title */}
          <ParallaxContainer speed={0.3}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#7c3aed] via-[#a78bfa] to-[#06b6d4] bg-clip-text text-transparent mb-4">
                Technical Expertise
              </h2>
              <p className="text-lg text-[#cbd5e1] max-w-2xl mx-auto leading-relaxed">
                Modern full-stack technologies and frameworks that power scalable, maintainable solutions
              </p>
            </div>
          </ParallaxContainer>
          
          {/* Skills Grid */}
          <AdaptiveGrid minItemWidth={320} gap={24} className="mb-16">
            {skills.map((category, index) => (
              <ScrollTrigger
                key={category.category}
                trigger="onEnter"
                animation="scale"
                threshold={0.3}
                delay={index * 150}
              >
                <ParallaxContainer speed={0.1 + (index * 0.03)}>
                  <InteractiveCard 
                    variant="tech"
                    className="group h-full relative overflow-hidden"
                  >
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/10 via-transparent to-[#06b6d4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Category Header */}
                    <div className="relative z-10 mb-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-[#f8fafc] group-hover:text-[#a78bfa] transition-colors duration-300">
                        {category.category}
                      </h3>
                    </div>
                    
                    {/* Skills Grid */}
                    <div className="grid grid-cols-1 gap-3 relative z-10">
                      {category.skills.map((skill, skillIndex) => (
                        <div 
                          key={skill}
                          className="group/skill flex items-center gap-3 p-3 rounded-lg bg-[#252545]/30 hover:bg-[#252545]/60 border border-[#374151]/30 hover:border-[#7c3aed]/30 transition-all duration-300"
                          style={{
                            animationDelay: `${skillIndex * 100}ms`
                          }}
                        >
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] flex-shrink-0 group-hover/skill:scale-125 transition-transform duration-200" />
                          <span className="text-[#cbd5e1] text-sm font-medium group-hover/skill:text-[#f8fafc] transition-colors duration-200">
                            {skill}
                          </span>
                          <div className="ml-auto w-1 h-4 bg-gradient-to-b from-[#7c3aed] to-transparent rounded-full opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300" />
                        </div>
                      ))}
                    </div>
                    
                    {/* Skill Count Badge */}
                    <div className="mt-6 pt-4 border-t border-[#374151]/30 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#94a3b8] font-medium">
                          {category.skills.length} technologies
                        </span>
                        <div className="flex items-center gap-1">
                          {[...Array(Math.min(5, Math.ceil(category.skills.length / 2)))].map((_, i) => (
                            <div 
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                              style={{ animationDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </InteractiveCard>
                </ParallaxContainer>
              </ScrollTrigger>
            ))}
          </AdaptiveGrid>
          
          {/* Skills Summary */}
          <ScrollTrigger
            trigger="onEnter"
            animation="fade"
            threshold={0.4}
            delay={600}
          >
            <ParallaxContainer speed={0.2}>
              <div className="text-center">
                <InteractiveCard 
                  variant="elevated" 
                  className="inline-block p-8 bg-gradient-to-r from-[#7c3aed]/20 via-[#252545]/40 to-[#06b6d4]/20 border border-[#7c3aed]/30 backdrop-blur-sm"
                >
                  <div className="flex flex-wrap items-center justify-center gap-8 text-center">
                    <div className="group">
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                        {skills.reduce((total, category) => total + category.skills.length, 0)}+
                      </div>
                      <div className="text-sm text-[#94a3b8] font-medium">Technologies</div>
                    </div>
                    
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#374151] to-transparent"></div>
                    
                    <div className="group">
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                        6+
                      </div>
                      <div className="text-sm text-[#94a3b8] font-medium">Years Experience</div>
                    </div>
                    
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#374151] to-transparent"></div>
                    
                    <div className="group">
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#10b981] to-[#34d399] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                        {skills.length}
                      </div>
                      <div className="text-sm text-[#94a3b8] font-medium">Skill Areas</div>
                    </div>
                  </div>
                </InteractiveCard>
                
                <p className="text-[#cbd5e1] text-lg max-w-3xl mx-auto mt-8 leading-relaxed">
                  Experienced in modern full-stack development with expertise spanning frontend frameworks, 
                  backend systems, cloud platforms, and development best practices. Passionate about 
                  leveraging cutting-edge technologies to deliver scalable, maintainable solutions.
                </p>
              </div>
            </ParallaxContainer>
          </ScrollTrigger>
        </div>
      </section>
    </ScrollTrigger>
  );
}

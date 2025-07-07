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
      <section className="relative min-h-screen bg-[#16213e] px-8 py-16 overflow-hidden">
        {/* Tech Grid Background */}
        <TechGrid pattern="lines" intensity="subtle" animated={true} />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section Title */}
          <ParallaxContainer speed={0.3}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f8f9fa] text-center mb-16">
              Technical Skills
            </h2>
          </ParallaxContainer>
          
          {/* Skills Grid */}
          <AdaptiveGrid minItemWidth={320} gap={32} className="mb-16">
            {skills.map((category, index) => (
              <ScrollTrigger
                key={category.category}
                trigger="onEnter"
                animation="scale"
                threshold={0.3}
                delay={index * 200}
              >
                <ParallaxContainer speed={0.1 + (index * 0.05)}>
                  <InteractiveCard 
                    variant="tech"
                    className="group h-full"
                  >
                    {/* Category Title */}
                    <h3 className="text-xl font-semibold text-[#e94560] mb-4 text-center group-hover:text-[#00f5ff] transition-colors duration-300">
                      {category.category}
                    </h3>
                    
                    {/* Skills List */}
                    <div className="space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <div 
                          key={skill}
                          className="flex items-center gap-3 p-2 rounded bg-[#16213e] hover:bg-[#2a2a4e] transition-colors duration-200"
                        >
                          <div className="w-2 h-2 bg-[#2ecc71] rounded-full flex-shrink-0 group-hover:bg-[#00f5ff] transition-colors duration-300"></div>
                          <span className="text-[#f8f9fa] text-sm">{skill}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Skill count indicator */}
                    <div className="mt-4 pt-4 border-t border-[#3498db]/20">
                      <span className="text-xs text-[#a8a8a8] font-medium">
                        {category.skills.length} technologies
                      </span>
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
              <div className="mt-16 text-center">
                <InteractiveCard variant="elevated" className="inline-block p-6 bg-gradient-to-r from-[#e94560]/10 to-[#3498db]/10 border border-[#e94560]/20">
                  <div className="flex items-center gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#e94560]">
                        {skills.reduce((total, category) => total + category.skills.length, 0)}+
                      </div>
                      <div className="text-sm text-[#a8a8a8]">Technologies</div>
                    </div>
                    <div className="w-px h-12 bg-[#a8a8a8]/20"></div>
                    <div>
                      <div className="text-2xl font-bold text-[#3498db]">6+</div>
                      <div className="text-sm text-[#a8a8a8]">Years Experience</div>
                    </div>
                    <div className="w-px h-12 bg-[#a8a8a8]/20"></div>
                    <div>
                      <div className="text-2xl font-bold text-[#2ecc71]">{skills.length}</div>
                      <div className="text-sm text-[#a8a8a8]">Skill Areas</div>
                    </div>
                  </div>
                </InteractiveCard>
                
                <p className="text-[#a8a8a8] text-lg max-w-3xl mx-auto mt-8">
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

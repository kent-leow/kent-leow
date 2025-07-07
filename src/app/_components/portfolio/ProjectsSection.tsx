"use client";

import type { Project } from "../../../types/portfolio";
import ScrollTrigger from "../interactions/ScrollTrigger";
import ParallaxContainer from "../interactions/ParallaxContainer";
import InteractiveCard from "../ui/InteractiveCard";
import TechGrid from "../ui/TechGrid";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <ScrollTrigger
      trigger="onEnter"
      animation="slide"
      threshold={0.2}
    >
      <section className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f1a] px-8 py-16 overflow-hidden relative">
        {/* Tech Grid Background */}
        <TechGrid pattern="dots" intensity="subtle" animated={true} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Title */}
          <ParallaxContainer speed={0.3}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold section-title-gradient mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-[#cbd5e1] max-w-2xl mx-auto leading-relaxed">
                Impactful solutions demonstrating expertise in modern technologies and scalable architecture
              </p>
            </div>
          </ParallaxContainer>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {projects.map((project, index) => (
              <ScrollTrigger
                key={project.id}
                trigger="onEnter"
                animation="scale"
                threshold={0.3}
                delay={index * 200}
              >
                <ParallaxContainer speed={0.1 + (index * 0.02)}>
                  <InteractiveCard 
                    variant="elevated"
                    className="group h-full relative overflow-hidden border border-[#374151]/30 hover:border-[#7c3aed]/50 transition-all duration-500"
                  >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/5 via-transparent to-[#06b6d4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Project Content */}
                    <div className="relative z-10 p-6">
                      {/* Project Header */}
                      <div className="mb-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-[#f8fafc] group-hover:text-[#a78bfa] transition-colors duration-300 mb-2">
                              {project.title}
                            </h3>
                            <p className="text-[#94a3b8] leading-relaxed group-hover:text-[#cbd5e1] transition-colors duration-300">
                              {project.description}
                            </p>
                          </div>
                          
                          {/* Project Icon */}
                          <div className="w-12 h-12 bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ml-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Technologies */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <svg className="w-4 h-4 text-[#06b6d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <h4 className="text-[#06b6d4] font-semibold text-sm uppercase tracking-wide">
                            Technologies Used
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-3 py-1.5 bg-[#252545]/50 text-[#cbd5e1] text-xs font-medium rounded-full border border-[#374151]/30 hover:border-[#7c3aed]/50 hover:bg-[#7c3aed]/10 transition-all duration-200 group/tech"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Highlights */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          <h4 className="text-[#10b981] font-semibold text-sm uppercase tracking-wide">
                            Project Highlights
                          </h4>
                        </div>
                        
                        <div className="space-y-3">
                          {project.highlights.map((highlight, highlightIndex) => (
                            <div 
                              key={highlightIndex}
                              className="flex items-start gap-3 p-3 rounded-lg bg-[#252545]/30 hover:bg-[#252545]/50 border border-[#374151]/20 hover:border-[#10b981]/30 transition-all duration-300 group/highlight"
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-[#10b981] to-[#34d399] rounded-full mt-2 flex-shrink-0 group-hover/highlight:scale-125 transition-transform duration-200" />
                              <span className="text-[#94a3b8] text-sm leading-relaxed group-hover/highlight:text-[#cbd5e1] transition-colors duration-300">
                                {highlight}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Project Action */}
                      <div className="mt-6 pt-4 border-t border-[#374151]/30">
                        <button className="w-full group/btn flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#7c3aed]/10 to-[#06b6d4]/10 hover:from-[#7c3aed]/20 hover:to-[#06b6d4]/20 border border-[#7c3aed]/30 hover:border-[#7c3aed]/50 rounded-lg transition-all duration-300">
                          <span className="text-[#a78bfa] group-hover/btn:text-[#f8fafc] font-semibold text-sm transition-colors duration-300">
                            View Project Details
                          </span>
                          <svg className="w-4 h-4 text-[#a78bfa] group-hover/btn:text-[#f8fafc] group-hover/btn:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </InteractiveCard>
                </ParallaxContainer>
              </ScrollTrigger>
            ))}
          </div>
          
          {/* Projects Summary */}
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
                  className="inline-block p-8 bg-gradient-to-r from-[#7c3aed]/20 via-[#252545]/40 to-[#06b6d4]/20 border border-[#7c3aed]/30 backdrop-blur-sm"
                >
                  <div className="flex flex-wrap items-center justify-center gap-8 text-center mb-6">
                    <div className="group">
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                        {projects.length}+
                      </div>
                      <div className="text-sm text-[#94a3b8] font-medium">Featured Projects</div>
                    </div>
                    
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#374151] to-transparent"></div>
                    
                    <div className="group">
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                        100%
                      </div>
                      <div className="text-sm text-[#94a3b8] font-medium">Success Rate</div>
                    </div>
                    
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#374151] to-transparent"></div>
                    
                    <div className="group">
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#10b981] to-[#34d399] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                        15+
                      </div>
                      <div className="text-sm text-[#94a3b8] font-medium">Technologies</div>
                    </div>
                  </div>
                  
                  <p className="text-[#cbd5e1] text-lg max-w-3xl mx-auto leading-relaxed">
                    A selection of impactful projects demonstrating expertise in modern web technologies, 
                    cloud platforms, and full-stack development. Each project showcases problem-solving 
                    abilities and commitment to delivering high-quality, scalable solutions.
                  </p>
                </InteractiveCard>
              </div>
            </ParallaxContainer>
          </ScrollTrigger>
        </div>
      </section>
    </ScrollTrigger>
  );
}

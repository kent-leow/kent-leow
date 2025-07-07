"use client";

import type { ContactInfo, SocialLink } from "../../../types/portfolio";
import InteractiveButton from "../ui/InteractiveButton";
import InteractiveCard from "../ui/InteractiveCard";
import ScrollTrigger from "../interactions/ScrollTrigger";
import ParallaxContainer from "../interactions/ParallaxContainer";
import TechGrid from "../ui/TechGrid";

interface ContactSectionProps {
  contact: ContactInfo;
  socialLinks: SocialLink[];
}

export default function ContactSection({ contact, socialLinks }: ContactSectionProps) {
  return (
    <ScrollTrigger
      trigger="onEnter"
      animation="slide"
      threshold={0.2}
    >
      <section className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] px-8 py-16 flex items-center relative overflow-hidden">
        {/* Tech Grid Background */}
        <TechGrid pattern="hexagon" intensity="subtle" animated={true} />
        
        <div className="max-w-4xl mx-auto text-center w-full relative z-10">
          {/* Section Title */}
          <ParallaxContainer speed={0.3}>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold section-title-gradient mb-6">
                Let's Connect
              </h2>
              <p className="text-lg text-[#cbd5e1] max-w-2xl mx-auto leading-relaxed">
                Ready to collaborate on innovative projects? Let's discuss how we can work together 
                to create exceptional digital experiences and scalable solutions.
              </p>
            </div>
          </ParallaxContainer>
          
          {/* Contact Information */}
          <ScrollTrigger
            trigger="onEnter"
            animation="scale"
            threshold={0.3}
            delay={200}
          >
            <ParallaxContainer speed={0.2}>
              <InteractiveCard 
                variant="elevated" 
                className="mb-12 bg-gradient-to-r from-[#252545]/60 via-[#16213e]/80 to-[#252545]/60 border border-[#374151]/30 backdrop-blur-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Phone */}
                  <div className="group flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#7c3aed]/30">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[#f8fafc] font-bold mb-2 group-hover:text-[#a78bfa] transition-colors duration-300">Phone</h3>
                      <p className="text-[#94a3b8] group-hover:text-[#cbd5e1] transition-colors duration-300 font-medium">{contact.phone}</p>
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div className="group flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#06b6d4]/30">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[#f8fafc] font-bold mb-2 group-hover:text-[#22d3ee] transition-colors duration-300">Location</h3>
                      <p className="text-[#94a3b8] group-hover:text-[#cbd5e1] transition-colors duration-300 font-medium">{contact.location}</p>
                    </div>
                  </div>
                  
                  {/* Status */}
                  <div className="group flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#10b981] to-[#34d399] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#10b981]/30">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[#f8fafc] font-bold mb-2 group-hover:text-[#34d399] transition-colors duration-300">Status</h3>
                      <p className="text-[#94a3b8] group-hover:text-[#cbd5e1] transition-colors duration-300 font-medium">{contact.residence}</p>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </ParallaxContainer>
          </ScrollTrigger>
          
          {/* Social Links */}
          <ScrollTrigger
            trigger="onEnter"
            animation="fade"
            threshold={0.3}
            delay={400}
          >
            <ParallaxContainer speed={0.1}>
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[#f8fafc] mb-6">
                  Find me online
                </h3>
                <div className="flex justify-center gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-6 py-4 bg-[#252545]/50 rounded-lg border border-[#374151]/30 hover:border-[#7c3aed]/50 hover:bg-[#7c3aed]/10 transition-all duration-300 backdrop-blur-sm"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          {social.platform === 'GitHub' ? (
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          ) : (
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          )}
                        </svg>
                      </div>
                      <span className="text-[#cbd5e1] font-semibold group-hover:text-[#f8fafc] transition-colors duration-300">
                        {social.platform}
                      </span>
                      <svg className="w-4 h-4 text-[#94a3b8] group-hover:text-[#a78bfa] group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </ParallaxContainer>
          </ScrollTrigger>
          
          {/* Call to Action */}
          <ScrollTrigger
            trigger="onEnter"
            animation="scale"
            threshold={0.3}
            delay={600}
          >
            <ParallaxContainer speed={0.05}>
              <div className="space-y-6">
                <button 
                  onClick={() => window.location.href = 'mailto:kent.leow@example.com'}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] hover:from-[#6d28d9] hover:to-[#9333ea] text-white font-bold text-lg rounded-lg shadow-lg shadow-[#7c3aed]/30 hover:shadow-[#7c3aed]/50 transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Get In Touch</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                
                <div className="flex items-center justify-center gap-2 text-[#94a3b8]">
                  <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    Available for freelance opportunities and full-time positions
                  </span>
                </div>
              </div>
            </ParallaxContainer>
          </ScrollTrigger>
        </div>
      </section>
    </ScrollTrigger>
  );
}

"use client";

import { portfolioData } from "../../../data/portfolio-data";
import InteractiveCard from "../ui/InteractiveCard";
import ScrollTrigger from "../interactions/ScrollTrigger";
import ParallaxContainer from "../interactions/ParallaxContainer";
import GestureHandler from "../interactions/GestureHandler";
import TouchOptimizedButton from "../ui/TouchOptimizedButton";

export default function ProfileHeader() {
  return (
    <ScrollTrigger
      trigger="onEnter"
      animation="slide"
      threshold={0.1}
    >
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary px-8 py-16 overflow-hidden">
        
        <GestureHandler
          onSwipe={(direction, velocity) => {
            if (direction === 'down' && velocity > 0.5) {
              // Smooth scroll to next section
              const nextSection = document.querySelector('#skills');
              nextSection?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="relative z-10 w-full"
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Name and Title */}
            <ParallaxContainer speed={0.3}>
              <div className="mb-8">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary-600 via-primary-400 to-secondary-500 bg-clip-text text-transparent mb-6 leading-tight">
                  {portfolioData.personal.name}
                </h1>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-secondary-500 to-secondary-400 bg-clip-text text-transparent mb-4">
                  {portfolioData.personal.title}
                </h2>
                <div className="flex items-center justify-center gap-2 text-text-tertiary">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Available for opportunities</span>
                </div>
              </div>
            </ParallaxContainer>
            
            {/* Professional Summary */}
            <ParallaxContainer speed={0.2}>
              <InteractiveCard 
                variant="elevated" 
                className="mb-8 bg-gradient-to-r from-bg-elevated/60 via-bg-tertiary/80 to-bg-elevated/60 border border-border-primary/30 backdrop-blur-sm"
              >
                <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                  {portfolioData.personal.summary}
                </p>
              </InteractiveCard>
            </ParallaxContainer>
            
            {/* Contact Information */}
            <ParallaxContainer speed={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-text-tertiary mb-8">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-elevated/30 border border-border-primary/20">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="font-medium">{portfolioData.contact.location}</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-elevated/30 border border-border-primary/20">
                  <div className="w-8 h-8 bg-gradient-to-r from-secondary-500 to-secondary-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="font-medium">{portfolioData.contact.phone}</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-elevated/30 border border-border-primary/20">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-medium">kent.leow@example.com</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <TouchOptimizedButton
                  variant="primary"
                  size="lg"
                  onClick={() => window.location.href = 'mailto:kent.leow@example.com'}
                  className="bg-gradient-to-r from-primary-600 to-primary-400 hover:from-primary-700 hover:to-primary-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 transition-all duration-300"
                >
                  Get In Touch
                </TouchOptimizedButton>
                <TouchOptimizedButton
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    const projectsSection = document.querySelector('#projects');
                    projectsSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-500 hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                >
                  View My Work
                </TouchOptimizedButton>
              </div>
            </ParallaxContainer>

            {/* Enhanced Scroll indicator */}
            <ScrollTrigger
              trigger="whileInView"
              animation="fade"
              threshold={0.5}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="scroll-indicator flex flex-col items-center text-text-tertiary group cursor-pointer"
                   onClick={() => {
                     const nextSection = document.querySelector('#skills');
                     nextSection?.scrollIntoView({ behavior: 'smooth' });
                   }}>
                <span className="text-sm mb-3 font-medium group-hover:text-primary-400 transition-colors duration-300">
                  Scroll to explore
                </span>
                <div className="w-6 h-10 border-2 border-border-primary group-hover:border-primary-600 rounded-full flex justify-center transition-colors duration-300 backdrop-blur-sm bg-bg-elevated/20">
                  <div className="w-1 h-3 bg-gradient-to-b from-primary-600 to-primary-400 rounded-full mt-2 animate-pulse"></div>
                </div>
                <svg className="w-4 h-4 mt-2 text-primary-600 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </ScrollTrigger>
          </div>
        </GestureHandler>
      </section>
    </ScrollTrigger>
  );
}

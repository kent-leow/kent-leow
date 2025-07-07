"use client";

import { portfolioData } from "../../../data/portfolio-data";
import InteractiveCard from "../ui/InteractiveCard";
import AnimatedBackground from "../backgrounds/AnimatedBackground";
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
      <section className="relative min-h-screen flex items-center justify-center bg-[#1a1a2e] px-8 py-16 overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground 
          intensity="moderate" 
          pattern="mixed" 
          className="z-0" 
        />
        
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f8f9fa] mb-6 leading-tight">
                {portfolioData.personal.name}
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#e94560] mb-8">
                {portfolioData.personal.title}
              </h2>
            </ParallaxContainer>
            
            {/* Professional Summary */}
            <ParallaxContainer speed={0.2}>
              <InteractiveCard variant="elevated" className="mb-8">
                <p className="text-base md:text-lg text-[#f8f9fa] leading-relaxed">
                  {portfolioData.personal.summary}
                </p>
              </InteractiveCard>
            </ParallaxContainer>
            
            {/* Contact Information */}
            <ParallaxContainer speed={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[#a8a8a8] mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-[#3498db]">📍</span>
                  <span>{portfolioData.contact.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#3498db]">📱</span>
                  <span>{portfolioData.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#2ecc71]">✉️</span>
                  <span>kent.leow@example.com</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <TouchOptimizedButton
                  variant="primary"
                  size="lg"
                  onClick={() => window.location.href = 'mailto:kent.leow@example.com'}
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
                >
                  View My Work
                </TouchOptimizedButton>
              </div>
            </ParallaxContainer>

            {/* Scroll indicator */}
            <ScrollTrigger
              trigger="whileInView"
              animation="fade"
              threshold={0.5}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="flex flex-col items-center text-[#a8a8a8] animate-bounce">
                <span className="text-sm mb-2">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-[#a8a8a8]/30 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-[#e94560] rounded-full mt-2 animate-pulse"></div>
                </div>
              </div>
            </ScrollTrigger>
          </div>
        </GestureHandler>
      </section>
    </ScrollTrigger>
  );
}

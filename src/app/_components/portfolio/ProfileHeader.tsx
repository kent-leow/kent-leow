"use client";

import { portfolioData } from "../../../data/portfolio-data";
import InteractiveCard from "../ui/InteractiveCard";
import TypingEffect from "../ui/TypingEffect";
import GestureHandler from "../interactions/GestureHandler";
import TouchOptimizedButton from "../ui/TouchOptimizedButton";

export default function ProfileHeader() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary px-6 md:px-8 py-20 overflow-hidden">
      
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
        <div className="max-w-5xl mx-auto">
          {/* Name and Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight animate-fade-in-up name-text-animate section-title-gradient">
              Kent Leow
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 leading-relaxed animate-fade-in-up text-gray-200" style={{ animationDelay: '0.3s' }}>
              {portfolioData.personal.title}
            </h2>
            <div className="flex items-center justify-center gap-3 text-text-secondary animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/40"></div>
              <span className="text-sm md:text-base font-medium">Available for opportunities</span>
            </div>
          </div>
          
          {/* Professional Summary */}
          <div className="mb-20">
            <InteractiveCard 
              variant="elevated" 
              className="mx-auto max-w-4xl bg-gradient-to-r from-bg-elevated/80 via-bg-surface/90 to-bg-elevated/80 border border-border-primary/40 backdrop-blur-md shadow-2xl shadow-primary-900/20"
            >
              <div className="text-base md:text-lg lg:text-xl text-text-primary leading-relaxed px-2 md:px-4">
                <TypingEffect
                  text={portfolioData.personal.summary}
                  speed={30}
                  delay={1200}
                  cursor={true}
                  cursorChar="▋"
                  className="text-inherit leading-inherit"
                  preserveWhitespace={true}
                />
              </div>
            </InteractiveCard>
          </div>
        </div>
      </GestureHandler>
    </section>
  );
}

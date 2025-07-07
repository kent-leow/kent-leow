"use client";

import { useState } from "react";
import type { InteractionState } from "../../../types/ui";

interface InteractiveCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'tech';
  interactive?: boolean;
  className?: string;
  onHover?: () => void;
}

export default function InteractiveCard({ 
  children, 
  variant = 'default', 
  interactive = true, 
  className = '', 
  onHover 
}: InteractiveCardProps) {
  const [interactionState, setInteractionState] = useState<InteractionState>({
    isHovered: false,
    isFocused: false,
    isActive: false
  });

  const handleMouseEnter = () => {
    if (!interactive) return;
    setInteractionState(prev => ({ ...prev, isHovered: true }));
    onHover?.();
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setInteractionState(prev => ({ ...prev, isHovered: false }));
  };

  const handleFocus = () => {
    if (!interactive) return;
    setInteractionState(prev => ({ ...prev, isFocused: true }));
  };

  const handleBlur = () => {
    if (!interactive) return;
    setInteractionState(prev => ({ ...prev, isFocused: false }));
  };

  const handleMouseDown = () => {
    if (!interactive) return;
    setInteractionState(prev => ({ ...prev, isActive: true }));
  };

  const handleMouseUp = () => {
    if (!interactive) return;
    setInteractionState(prev => ({ ...prev, isActive: false }));
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'elevated':
        return 'bg-[#16213e] border-[#4d4d4d] shadow-lg';
      case 'tech':
        return 'bg-[#1a2e3e] border-[#00f5ff] shadow-lg shadow-[#00f5ff]/20';
      default:
        return 'bg-[#16213e] border-[#4d4d4d]';
    }
  };

  const getInteractiveClasses = () => {
    if (!interactive) return '';
    
    let classes = 'transition-all duration-300 ease-out cursor-pointer';
    
    if (interactionState.isHovered) {
      classes += ' transform scale-[1.02] border-[#e94560] shadow-xl';
      if (variant === 'tech') {
        classes += ' shadow-[#00f5ff]/40';
      }
    }
    
    if (interactionState.isFocused) {
      classes += ' ring-2 ring-[#e94560] ring-opacity-50';
    }
    
    if (interactionState.isActive) {
      classes += ' transform scale-[0.98]';
    }
    
    return classes;
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-lg border p-6
        ${getVariantClasses()}
        ${getInteractiveClasses()}
        ${className}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      tabIndex={interactive ? 0 : -1}
      data-testid="interactive-card"
    >
      {/* Tech Grid Overlay for tech variant */}
      {variant === 'tech' && (
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 h-full">
            {Array.from({ length: 32 }).map((_, i) => (
              <div 
                key={i} 
                className="border-r border-b border-[#00f5ff] animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Interactive glow effect */}
      {interactive && interactionState.isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#e94560]/10 to-[#ff6b9d]/10 rounded-lg pointer-events-none" />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

interface InteractiveButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'tech';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function InteractiveButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = ''
}: InteractiveButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const getVariantClasses = () => {
    if (disabled) {
      return 'bg-[#4d4d4d] text-[#a8a8a8] cursor-not-allowed border border-[#4d4d4d]';
    }

    switch (variant) {
      case 'secondary':
        return 'bg-[#16213e] text-[#f8f9fa] border border-[#4d4d4d] hover:border-[#e94560] hover:bg-[#2a2a4e]';
      case 'ghost':
        return 'bg-transparent text-[#f8f9fa] border border-transparent hover:bg-[#16213e] hover:border-[#4d4d4d]';
      case 'tech':
        return 'bg-gradient-to-r from-[#00f5ff] to-[#9b59b6] text-[#1a1a2e] border border-[#00f5ff] hover:shadow-lg hover:shadow-[#00f5ff]/30';
      default:
        return 'bg-[#e94560] text-[#f8f9fa] border border-[#e94560] hover:bg-[#ff6b9d] hover:border-[#ff6b9d]';
    }
  };

  const getInteractiveClasses = () => {
    if (disabled) return '';
    
    let classes = 'transition-all duration-200 ease-out transform active:scale-95';
    
    if (isPressed) {
      classes += ' scale-95';
    } else {
      classes += ' hover:scale-105 hover:shadow-lg';
    }
    
    return classes;
  };

  const handleMouseDown = () => {
    if (disabled) return;
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    if (disabled) return;
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  return (
    <button
      className={`
        relative overflow-hidden rounded-lg font-semibold
        ${getSizeClasses()}
        ${getVariantClasses()}
        ${getInteractiveClasses()}
        ${className}
      `}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      data-testid="interactive-button"
    >
      {/* Tech ripple effect for tech variant */}
      {variant === 'tech' && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#00f5ff]/20 to-[#9b59b6]/20 animate-pulse" />
      )}
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Hover glow effect */}
      {!disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      )}
    </button>
  );
}

"use client";

import React from "react";
import useDeviceDetection from "../../../hooks/useDeviceDetection";

interface TouchOptimizedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  hapticFeedback?: boolean;
}

export default function TouchOptimizedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  hapticFeedback = true
}: TouchOptimizedButtonProps) {
  const deviceInfo = useDeviceDetection();

  const handleClick = () => {
    if (disabled) return;
    
    // Haptic feedback for mobile devices
    if (hapticFeedback && deviceInfo.hasTouch && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
    
    onClick?.();
  };

  // Touch-optimized sizing
  const sizeClasses = {
    sm: deviceInfo.isMobile ? 'px-4 py-3 text-sm min-h-[44px]' : 'px-3 py-2 text-sm',
    md: deviceInfo.isMobile ? 'px-6 py-4 text-base min-h-[48px]' : 'px-4 py-2 text-base',
    lg: deviceInfo.isMobile ? 'px-8 py-5 text-lg min-h-[52px]' : 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    primary: 'bg-[#e94560] hover:bg-[#d63447] text-white border-transparent',
    secondary: 'bg-[#3498db] hover:bg-[#2980b9] text-white border-transparent',
    outline: 'bg-transparent border-2 border-[#3498db] text-[#3498db] hover:bg-[#3498db] hover:text-white'
  };

  const baseClasses = [
    'font-medium rounded-lg transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3498db]',
    'active:transform active:scale-95',
    // Touch-specific optimizations
    deviceInfo.hasTouch ? 'touch-manipulation' : '',
    deviceInfo.isMobile ? 'select-none' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    sizeClasses[size],
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={baseClasses}
      onClick={handleClick}
      disabled={disabled}
      data-touch-optimized={deviceInfo.hasTouch}
      data-device={deviceInfo.isMobile ? 'mobile' : deviceInfo.isTablet ? 'tablet' : 'desktop'}
    >
      {children}
    </button>
  );
}

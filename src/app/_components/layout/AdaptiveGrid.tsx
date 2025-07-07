"use client";

import React from "react";
import useDeviceDetection from "../../../hooks/useDeviceDetection";
import useResponsiveLayout from "../../../hooks/useResponsiveLayout";

interface AdaptiveGridProps {
  children: React.ReactNode;
  minItemWidth?: number;
  gap?: number;
  className?: string;
  autoFit?: boolean;
}

export default function AdaptiveGrid({
  children,
  minItemWidth = 280,
  gap = 24,
  className = '',
  autoFit = true
}: AdaptiveGridProps) {
  const deviceInfo = useDeviceDetection();
  
  const { currentLayout, isMobile, isTablet } = useResponsiveLayout({
    mobile: 'single-column',
    tablet: 'two-column',
    desktop: 'auto-fit'
  });

  const getGridStyles = () => {
    if (isMobile) {
      return {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: `${gap * 0.75}px`
      };
    }

    if (isTablet) {
      return {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: `${gap * 0.9}px`
      };
    }

    // Desktop: auto-fit or fixed columns
    if (autoFit) {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}px, 1fr))`,
        gap: `${gap}px`
      };
    }

    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: `${gap}px`
    };
  };

  const baseClasses = [
    'w-full',
    // Touch optimization
    deviceInfo.hasTouch ? 'touch-manipulation' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={baseClasses}
      style={getGridStyles()}
      data-layout={currentLayout}
      data-device={deviceInfo.isMobile ? 'mobile' : deviceInfo.isTablet ? 'tablet' : 'desktop'}
      data-orientation={deviceInfo.orientation}
    >
      {children}
    </div>
  );
}

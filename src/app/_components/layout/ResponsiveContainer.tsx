"use client";

import React from "react";
import useDeviceDetection from "../../../hooks/useDeviceDetection";
import type { ResponsiveComponentConfig } from "../../../types/responsive";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  config?: ResponsiveComponentConfig;
  className?: string;
  fallback?: React.ReactNode;
}

const defaultConfig: ResponsiveComponentConfig = {
  mobile: {
    layout: 'stack',
    columns: 1,
    spacing: 'gap-4',
    fontSize: 'text-sm',
    padding: 'p-4',
    height: 'min-h-screen'
  },
  tablet: {
    layout: 'grid',
    columns: 2,
    spacing: 'gap-6',
    fontSize: 'text-base',
    padding: 'p-6',
    height: 'min-h-screen'
  },
  desktop: {
    layout: 'grid',
    columns: 3,
    spacing: 'gap-8',
    fontSize: 'text-lg',
    padding: 'p-8',
    height: 'min-h-screen'
  }
};

export default function ResponsiveContainer({
  children,
  config = defaultConfig,
  className = '',
  fallback
}: ResponsiveContainerProps) {
  const deviceInfo = useDeviceDetection();

  // Handle SSR by providing fallback
  if (typeof window === 'undefined') {
    return fallback ? <>{fallback}</> : <div className={className}>{children}</div>;
  }

  // Determine current device configuration
  let currentConfig;
  if (deviceInfo.isMobile) {
    currentConfig = config.mobile;
  } else if (deviceInfo.isTablet) {
    currentConfig = config.tablet;
  } else {
    currentConfig = config.desktop;
  }

  // Build responsive classes
  const layoutClasses: Record<string, string> = {
    stack: 'flex flex-col',
    grid: `grid grid-cols-${currentConfig.columns ?? 1}`,
    flex: 'flex flex-wrap'
  };

  const responsiveClasses = [
    layoutClasses[currentConfig.layout] ?? layoutClasses.stack,
    currentConfig.spacing,
    currentConfig.fontSize,
    currentConfig.padding,
    currentConfig.height,
    // Touch optimization for mobile devices
    deviceInfo.hasTouch ? 'touch-manipulation' : '',
    // Orientation-specific classes
    deviceInfo.orientation === 'portrait' ? 'portrait' : 'landscape',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={responsiveClasses}
      data-device={deviceInfo.isMobile ? 'mobile' : deviceInfo.isTablet ? 'tablet' : 'desktop'}
      data-orientation={deviceInfo.orientation}
      data-screen-size={deviceInfo.screenSize}
    >
      {children}
    </div>
  );
}

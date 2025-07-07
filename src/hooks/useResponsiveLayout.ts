"use client";

import { useState, useEffect } from "react";

interface UseResponsiveLayoutOptions {
  mobile: string;
  tablet: string;
  desktop: string;
  breakpoints?: {
    tablet: number;
    desktop: number;
  };
}

export default function useResponsiveLayout(options: UseResponsiveLayoutOptions) {
  const {
    mobile,
    tablet,
    desktop,
    breakpoints = { tablet: 768, desktop: 1024 }
  } = options;

  const [currentLayout, setCurrentLayout] = useState<string>(desktop);
  const [screenWidth, setScreenWidth] = useState<number>(1024);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      setScreenWidth(width);

      if (width < breakpoints.tablet) {
        setCurrentLayout(mobile);
      } else if (width < breakpoints.desktop) {
        setCurrentLayout(tablet);
      } else {
        setCurrentLayout(desktop);
      }
    };

    // Initial layout detection
    updateLayout();

    // Listen for resize events
    const handleResize = () => {
      updateLayout();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobile, tablet, desktop, breakpoints]);

  return {
    currentLayout,
    screenWidth,
    isMobile: screenWidth < breakpoints.tablet,
    isTablet: screenWidth >= breakpoints.tablet && screenWidth < breakpoints.desktop,
    isDesktop: screenWidth >= breakpoints.desktop
  };
}

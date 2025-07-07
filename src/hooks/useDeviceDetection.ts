"use client";

import { useState, useEffect } from "react";
import type { DeviceInfo } from "../types/responsive";

export default function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    hasTouch: false,
    orientation: 'landscape',
    screenSize: 'lg',
    userAgent: ''
  });

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Device type detection
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) 
        || width < 768;
      const isTablet = /iPad|Android/i.test(userAgent) && width >= 768 && width < 1024;
      const isDesktop = !isMobile && !isTablet;
      
      // Touch support detection
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Orientation detection
      const orientation = height > width ? 'portrait' : 'landscape';
      
      // Screen size classification
      let screenSize: DeviceInfo['screenSize'] = 'lg';
      if (width < 640) screenSize = 'xs';
      else if (width < 768) screenSize = 'sm';
      else if (width < 1024) screenSize = 'md';
      else if (width < 1280) screenSize = 'lg';
      else if (width < 1536) screenSize = 'xl';
      else screenSize = '2xl';

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        hasTouch,
        orientation,
        screenSize,
        userAgent
      });
    };

    // Initial detection
    detectDevice();

    // Listen for resize events
    const handleResize = () => {
      detectDevice();
    };

    // Listen for orientation changes
    const handleOrientationChange = () => {
      setTimeout(detectDevice, 100); // Delay to ensure dimensions are updated
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return deviceInfo;
}

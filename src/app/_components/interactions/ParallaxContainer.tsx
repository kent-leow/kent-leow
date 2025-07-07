"use client";

import { useRef, useEffect } from "react";

interface ParallaxContainerProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  offset?: number;
  easing?: 'linear' | 'easeOut' | 'easeInOut';
  disabled?: boolean;
  className?: string;
}

export default function ParallaxContainer({
  children,
  speed = 0.5,
  direction = 'vertical',
  offset = 0,
  easing = 'linear',
  disabled = false,
  className = ''
}: ParallaxContainerProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    if (disabled) return;

    const element = elementRef.current;
    if (!element) return;

    let ticking = false;

    const updateTransform = () => {
      const scrollY = window.scrollY;
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate if element is in viewport
      const elementBottom = elementTop + elementHeight;
      const isInViewport = scrollY + windowHeight > elementTop && scrollY < elementBottom;
      
      if (isInViewport) {
        // Calculate parallax offset
        const relativePos = scrollY - elementTop + offset;
        let parallaxValue = relativePos * speed;
        
        // Apply easing
        switch (easing) {
          case 'easeOut':
            parallaxValue = parallaxValue * (2 - parallaxValue / 100);
            break;
          case 'easeInOut':
            parallaxValue = parallaxValue < 50 
              ? 2 * parallaxValue * parallaxValue / 100
              : 1 - Math.pow(-2 * parallaxValue + 2, 3) / 2;
            break;
        }
        
        // Apply transform based on direction
        const transform = direction === 'horizontal' 
          ? `translateX(${parallaxValue}px)` 
          : `translateY(${parallaxValue}px)`;
          
        element.style.transform = transform;
        element.style.willChange = 'transform';
      }
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        animationFrameRef.current = requestAnimationFrame(updateTransform);
        ticking = true;
      }
    };

    const handleScroll = () => {
      requestTick();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call
    updateTransform();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Reset transform
      if (element) {
        element.style.transform = '';
        element.style.willChange = '';
      }
    };
  }, [speed, direction, offset, easing, disabled]);

  return (
    <div
      ref={elementRef}
      className={`${className}`}
      data-testid="parallax-container"
      data-speed={speed}
      data-direction={direction}
    >
      {children}
    </div>
  );
}

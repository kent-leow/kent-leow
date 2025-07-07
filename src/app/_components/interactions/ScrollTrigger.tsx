"use client";

import { useRef, useEffect, useState } from "react";

interface ScrollTriggerProps {
  children: React.ReactNode;
  trigger?: 'onEnter' | 'onExit' | 'onProgress' | 'whileInView';
  threshold?: number;
  rootMargin?: string;
  animation?: 'fade' | 'slide' | 'scale' | 'rotate' | 'custom';
  duration?: number;
  delay?: number;
  onTrigger?: (progress: number) => void;
  className?: string;
}

export default function ScrollTrigger({
  children,
  trigger = 'onEnter',
  threshold = 0.1,
  rootMargin = '0px',
  animation = 'fade',
  duration = 600,
  delay = 0,
  onTrigger,
  className = ''
}: ScrollTriggerProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const intersectionRatio = entry.intersectionRatio;
          const isIntersecting = entry.isIntersecting;

          // Calculate progress based on intersection ratio
          const newProgress = Math.min(Math.max(intersectionRatio / threshold, 0), 1);
          setProgress(newProgress);

          switch (trigger) {
            case 'onEnter':
              if (isIntersecting && intersectionRatio >= threshold && !hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true);
                onTrigger?.(newProgress);
              }
              break;
              
            case 'onExit':
              if (!isIntersecting && hasTriggered) {
                setIsVisible(false);
                onTrigger?.(newProgress);
              }
              break;
              
            case 'whileInView':
              if (isIntersecting && intersectionRatio >= threshold) {
                setIsVisible(true);
                onTrigger?.(newProgress);
              } else {
                setIsVisible(false);
              }
              break;
              
            case 'onProgress':
              setIsVisible(isIntersecting && intersectionRatio >= threshold);
              onTrigger?.(newProgress);
              break;
          }
        });
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i / 20), // More granular thresholds
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [trigger, threshold, rootMargin, hasTriggered, onTrigger]);

  const getAnimationClasses = () => {
    const baseClasses = `transition-all ease-out`;
    const durationClass = `duration-[${duration}ms]`;
    const delayClass = delay > 0 ? `delay-[${delay}ms]` : '';

    if (!isVisible) {
      switch (animation) {
        case 'slide':
          return `${baseClasses} ${durationClass} ${delayClass} transform translate-y-8 opacity-0`;
        case 'scale':
          return `${baseClasses} ${durationClass} ${delayClass} transform scale-95 opacity-0`;
        case 'rotate':
          return `${baseClasses} ${durationClass} ${delayClass} transform rotate-1 opacity-0`;
        case 'fade':
        default:
          return `${baseClasses} ${durationClass} ${delayClass} opacity-0`;
      }
    }

    return `${baseClasses} ${durationClass} ${delayClass} transform translate-y-0 scale-100 rotate-0 opacity-100`;
  };

  const getProgressTransform = () => {
    if (trigger === 'onProgress' && animation === 'custom') {
      return {
        transform: `translateY(${(1 - progress) * 30}px)`,
        opacity: Math.max(0.1, progress)
      };
    }
    return {};
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClasses()} ${className}`}
      style={{
        ...getProgressTransform(),
        willChange: 'transform, opacity'
      }}
      data-testid="scroll-trigger"
      data-visible={isVisible}
      data-progress={progress}
    >
      {children}
    </div>
  );
}

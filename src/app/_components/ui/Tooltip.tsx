"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { TooltipConfig } from "../../../types/ui";

interface TooltipProps {
  children: React.ReactNode;
  config: TooltipConfig;
  className?: string;
}

export default function Tooltip({ children, config, className = '' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      updatePosition();
    }, config.delay || 300);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const toggleTooltip = () => {
    if (isVisible) {
      hideTooltip();
    } else {
      showTooltip();
    }
  };

  const updatePosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    let x = 0;
    let y = 0;

    switch (config.position) {
      case 'top':
        x = triggerRect.left + scrollX + triggerRect.width / 2;
        y = triggerRect.top + scrollY - 10;
        break;
      case 'bottom':
        x = triggerRect.left + scrollX + triggerRect.width / 2;
        y = triggerRect.bottom + scrollY + 10;
        break;
      case 'left':
        x = triggerRect.left + scrollX - 10;
        y = triggerRect.top + scrollY + triggerRect.height / 2;
        break;
      case 'right':
        x = triggerRect.right + scrollX + 10;
        y = triggerRect.top + scrollY + triggerRect.height / 2;
        break;
    }

    setPosition({ x, y });
  };

  useEffect(() => {
    const triggerElement = triggerRef.current;
    if (!triggerElement) return;

    if (config.trigger === 'hover') {
      triggerElement.addEventListener('mouseenter', showTooltip);
      triggerElement.addEventListener('mouseleave', hideTooltip);
    } else if (config.trigger === 'click') {
      triggerElement.addEventListener('click', toggleTooltip);
    } else if (config.trigger === 'focus') {
      triggerElement.addEventListener('focus', showTooltip);
      triggerElement.addEventListener('blur', hideTooltip);
    }

    return () => {
      if (triggerElement) {
        triggerElement.removeEventListener('mouseenter', showTooltip);
        triggerElement.removeEventListener('mouseleave', hideTooltip);
        triggerElement.removeEventListener('click', toggleTooltip);
        triggerElement.removeEventListener('focus', showTooltip);
        triggerElement.removeEventListener('blur', hideTooltip);
      }
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [config.trigger, config.delay]);

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isVisible, config.position]);

  const getTransformOrigin = () => {
    switch (config.position) {
      case 'top': return 'bottom center';
      case 'bottom': return 'top center';
      case 'left': return 'right center';
      case 'right': return 'left center';
      default: return 'center';
    }
  };

  const getTransform = () => {
    switch (config.position) {
      case 'top': return 'translate(-50%, -100%)';
      case 'bottom': return 'translate(-50%, 0%)';
      case 'left': return 'translate(-100%, -50%)';
      case 'right': return 'translate(0%, -50%)';
      default: return 'translate(-50%, -50%)';
    }
  };

  const tooltipElement = isVisible ? (
    <div
      ref={tooltipRef}
      className={`fixed z-50 px-3 py-2 text-sm text-white bg-[#1a1a2e] border border-[#3498db]/30 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-200 pointer-events-none ${className}`}
      style={{
        left: position.x,
        top: position.y,
        transform: getTransform(),
        transformOrigin: getTransformOrigin(),
        animation: isVisible ? 'tooltipFadeIn 0.2s ease-out' : 'tooltipFadeOut 0.2s ease-in'
      }}
    >
      {config.content}
      
      {/* Arrow */}
      <div 
        className={`absolute w-2 h-2 bg-[#1a1a2e] border-[#3498db]/30 transform rotate-45 ${
          config.position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2 border-b border-r' :
          config.position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2 border-t border-l' :
          config.position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2 border-t border-r' :
          'left-[-4px] top-1/2 -translate-y-1/2 border-b border-l'
        }`}
      />
    </div>
  ) : null;

  return (
    <>
      <div ref={triggerRef} className="inline-block">
        {children}
      </div>
      
      {typeof window !== 'undefined' && tooltipElement && 
        createPortal(tooltipElement, document.body)
      }
      
      <style jsx global>{`
        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: ${getTransform()} scale(0.95);
          }
          to {
            opacity: 1;
            transform: ${getTransform()} scale(1);
          }
        }
        
        @keyframes tooltipFadeOut {
          from {
            opacity: 1;
            transform: ${getTransform()} scale(1);
          }
          to {
            opacity: 0;
            transform: ${getTransform()} scale(0.95);
          }
        }
      `}</style>
    </>
  );
}

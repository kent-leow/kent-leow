"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

interface TypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
  className?: string;
  preserveWhitespace?: boolean;
}

export default function TypingEffect({
  text,
  speed = 50,
  delay = 0,
  cursor = true,
  cursorChar = "|",
  onComplete,
  className = "",
  preserveWhitespace = true
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Memoize the cleaned text to avoid recalculations
  const processedText = useMemo(() => {
    return preserveWhitespace ? text : text.replace(/\s+/g, ' ').trim();
  }, [text, preserveWhitespace]);

  // Cursor blinking effect
  useEffect(() => {
    if (!cursor) return;

    const blinkInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530); // Slightly irregular for more natural feel

    return () => clearInterval(blinkInterval);
  }, [cursor]);

  // Main typing logic
  const startTyping = useCallback(() => {
    if (currentIndex >= processedText.length) {
      setIsTyping(false);
      onComplete?.();
      return;
    }

    setIsTyping(true);
    
    const timeout = setTimeout(() => {
      setDisplayedText(prev => prev + processedText[currentIndex]);
      setCurrentIndex(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, processedText, speed, onComplete]);

  // Initialize typing with delay
  useEffect(() => {
    if (currentIndex === 0 && delay > 0) {
      const delayTimeout = setTimeout(() => {
        startTyping();
      }, delay);
      return () => clearTimeout(delayTimeout);
    } else {
      return startTyping();
    }
  }, [currentIndex, delay, startTyping]);

  // Handle reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches) {
      // Skip animation for users who prefer reduced motion
      setDisplayedText(processedText);
      setCurrentIndex(processedText.length);
      setIsTyping(false);
      onComplete?.();
    }
  }, [processedText, onComplete]);

  return (
    <span className={`inline-block ${className}`} aria-label={processedText}>
      <span className="sr-only">{processedText}</span>
      <span aria-hidden="true">
        {displayedText}
        {cursor && (
          <span 
            className={`typing-cursor inline-block transition-opacity duration-100 ${
              showCursor ? 'opacity-100' : 'opacity-0'
            } ${isTyping ? 'animate-pulse' : ''}`}
            style={{ 
              marginLeft: '2px',
              fontWeight: 'bold'
            }}
          >
            {cursorChar}
          </span>
        )}
      </span>
    </span>
  );
}

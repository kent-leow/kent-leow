"use client";

import { useRef, useEffect, useCallback } from "react";
import type { GestureState, GestureEvent, TouchPoint } from "../../../types/interactions";

interface GestureHandlerProps {
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down', velocity: number) => void;
  onPinch?: (scale: number, center: TouchPoint) => void;
  onTap?: (point: TouchPoint) => void;
  onLongPress?: (point: TouchPoint) => void;
  onPan?: (delta: TouchPoint, velocity: TouchPoint) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  swipeThreshold?: number;
  pinchThreshold?: number;
  longPressDelay?: number;
  tapMaxDuration?: number;
  panThreshold?: number;
}

export default function GestureHandler({
  onSwipe,
  onPinch,
  onTap,
  onLongPress,
  onPan,
  children,
  className = '',
  disabled = false,
  swipeThreshold = 50,
  pinchThreshold = 0.1,
  longPressDelay = 500,
  tapMaxDuration = 200,
  panThreshold = 10
}: GestureHandlerProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const gestureStateRef = useRef<GestureState>({
    isActive: false,
    startTime: 0,
    startPoint: { x: 0, y: 0 },
    currentPoint: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    touches: [],
    initialDistance: 0,
    scale: 1
  });
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastMoveTimeRef = useRef<number>(0);

  const calculateDistance = useCallback((point1: TouchPoint, point2: TouchPoint): number => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  const calculateCenter = useCallback((touches: TouchPoint[]): TouchPoint => {
    const sumX = touches.reduce((sum, touch) => sum + touch.x, 0);
    const sumY = touches.reduce((sum, touch) => sum + touch.y, 0);
    return {
      x: sumX / touches.length,
      y: sumY / touches.length
    };
  }, []);

  const getTouchPoint = useCallback((touch: Touch): TouchPoint => ({
    x: touch.clientX,
    y: touch.clientY
  }), []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (disabled) return;

    const touches = Array.from(e.touches).map(getTouchPoint);
    const now = Date.now();
    
    if (touches.length === 0) return;
    
    gestureStateRef.current = {
      isActive: true,
      startTime: now,
      startPoint: touches[0]!,
      currentPoint: touches[0]!,
      velocity: { x: 0, y: 0 },
      touches,
      initialDistance: touches.length === 2 ? calculateDistance(touches[0]!, touches[1]!) : 0,
      scale: 1
    };

    lastMoveTimeRef.current = now;

    // Set up long press timer
    if (onLongPress && touches.length === 1) {
      longPressTimerRef.current = setTimeout(() => {
        if (gestureStateRef.current.isActive) {
          onLongPress(gestureStateRef.current.currentPoint);
        }
      }, longPressDelay);
    }
  }, [disabled, getTouchPoint, calculateDistance, onLongPress, longPressDelay]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (disabled || !gestureStateRef.current.isActive) return;

    e.preventDefault();
    const touches = Array.from(e.touches).map(getTouchPoint);
    const now = Date.now();
    const deltaTime = now - lastMoveTimeRef.current;
    const currentState = gestureStateRef.current;

    if (touches.length === 0) return;

    // Update current point
    const newCurrentPoint = touches[0]!;
    
    // Calculate velocity
    const deltaX = newCurrentPoint.x - currentState.currentPoint.x;
    const deltaY = newCurrentPoint.y - currentState.currentPoint.y;
    const velocity = {
      x: deltaTime > 0 ? deltaX / deltaTime : 0,
      y: deltaTime > 0 ? deltaY / deltaTime : 0
    };

    // Update gesture state
    gestureStateRef.current = {
      ...currentState,
      currentPoint: newCurrentPoint,
      velocity,
      touches
    };

    lastMoveTimeRef.current = now;

    // Clear long press timer on movement
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // Handle pinch gesture
    if (onPinch && touches.length === 2) {
      const currentDistance = calculateDistance(touches[0]!, touches[1]!);
      const scale = currentDistance / currentState.initialDistance;
      
      if (Math.abs(scale - currentState.scale) > pinchThreshold) {
        const center = calculateCenter(touches);
        onPinch(scale, center);
        gestureStateRef.current.scale = scale;
      }
    }

    // Handle pan gesture
    if (onPan && touches.length === 1) {
      const totalDeltaX = newCurrentPoint.x - currentState.startPoint.x;
      const totalDeltaY = newCurrentPoint.y - currentState.startPoint.y;
      const totalDistance = Math.sqrt(totalDeltaX * totalDeltaX + totalDeltaY * totalDeltaY);
      
      if (totalDistance > panThreshold) {
        onPan({ x: totalDeltaX, y: totalDeltaY }, velocity);
      }
    }
  }, [disabled, getTouchPoint, calculateDistance, calculateCenter, onPinch, onPan, pinchThreshold, panThreshold]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (disabled || !gestureStateRef.current.isActive) return;

    const currentState = gestureStateRef.current;
    const duration = Date.now() - currentState.startTime;
    const deltaX = currentState.currentPoint.x - currentState.startPoint.x;
    const deltaY = currentState.currentPoint.y - currentState.startPoint.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // Handle tap gesture
    if (onTap && duration < tapMaxDuration && distance < panThreshold) {
      onTap(currentState.currentPoint);
    }

    // Handle swipe gesture
    if (onSwipe && distance > swipeThreshold) {
      const velocityMagnitude = Math.sqrt(
        currentState.velocity.x * currentState.velocity.x + 
        currentState.velocity.y * currentState.velocity.y
      );
      
      // Determine swipe direction
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      
      if (absX > absY) {
        // Horizontal swipe
        const direction = deltaX > 0 ? 'right' : 'left';
        onSwipe(direction, velocityMagnitude);
      } else {
        // Vertical swipe
        const direction = deltaY > 0 ? 'down' : 'up';
        onSwipe(direction, velocityMagnitude);
      }
    }

    // Reset gesture state
    gestureStateRef.current = {
      isActive: false,
      startTime: 0,
      startPoint: { x: 0, y: 0 },
      currentPoint: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
      touches: [],
      initialDistance: 0,
      scale: 1
    };
  }, [disabled, onTap, onSwipe, tapMaxDuration, panThreshold, swipeThreshold]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || disabled) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    element.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchEnd);
      
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, [disabled, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div
      ref={elementRef}
      className={`touch-manipulation ${className}`}
      data-testid="gesture-handler"
    >
      {children}
    </div>
  );
}

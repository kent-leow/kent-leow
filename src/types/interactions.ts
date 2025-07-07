export interface ScrollProgress {
  direction: 'up' | 'down';
  velocity: number;
  progress: number;
  isScrolling: boolean;
}

export interface TouchPoint {
  x: number;
  y: number;
}

export interface GestureState {
  isActive: boolean;
  startTime: number;
  startPoint: TouchPoint;
  currentPoint: TouchPoint;
  velocity: TouchPoint;
  touches: TouchPoint[];
  initialDistance: number;
  scale: number;
}

export interface GestureEvent {
  type: 'swipe' | 'pinch' | 'tap' | 'longpress' | 'pan';
  direction?: 'left' | 'right' | 'up' | 'down';
  velocity?: number;
  scale?: number;
  center?: TouchPoint;
  delta?: TouchPoint;
  point?: TouchPoint;
}

export interface ScrollTriggerConfig {
  element: HTMLElement;
  trigger: 'onEnter' | 'onExit' | 'onProgress' | 'whileInView';
  threshold: number;
  animation: AnimationConfig;
  callback?: (progress: number) => void;
}

export interface GestureConfig {
  type: 'drag' | 'swipe' | 'pinch' | 'tap';
  sensitivity: number;
  threshold: number;
  callback: (event: CustomGestureEvent) => void;
}

export interface CustomGestureEvent {
  type: 'drag' | 'swipe' | 'pinch' | 'tap';
  deltaX: number;
  deltaY: number;
  scale?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export interface ParallaxLayer {
  element: HTMLElement;
  speed: number;
  direction: 'vertical' | 'horizontal';
  bounds?: { min: number; max: number };
}

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

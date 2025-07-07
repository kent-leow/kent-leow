export interface ParticleConfig {
  count: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
  movement: 'float' | 'linear' | 'orbital';
}

export interface PatternConfig {
  type: 'grid' | 'circuit' | 'binary' | 'network';
  density: number;
  animationSpeed: number;
  color: string;
  opacity: number;
}

export interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  cpuUsage: number;
  timestamp: number;
}

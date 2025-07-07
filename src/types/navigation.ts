export interface NavigationConfig {
  sections: NavigationSection[];
  smooth: boolean;
  offset: number;
  highlightActive: boolean;
  showProgress: boolean;
}

export interface NavigationSection {
  id: string;
  title: string;
  icon?: React.ReactNode;
  description?: string;
  color?: string;
}

export interface SectionTransition {
  from: string;
  to: string;
  direction: 'forward' | 'backward';
  animation: 'slide' | 'fade' | 'scale' | 'flip';
  duration: number;
}

export interface NavigationState {
  currentSection: string;
  previousSection: string;
  scrollProgress: number;
  isTransitioning: boolean;
}

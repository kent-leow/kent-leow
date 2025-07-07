export interface StorytellingConfig {
  sections: StorySection[];
  currentSection: number;
  autoAdvance: boolean;
  pauseOnHover: boolean;
  showProgress: boolean;
}

export interface StorySection {
  id: string;
  title: string;
  content: React.ReactNode;
  duration?: number;
  background?: string;
  animation?: 'fade' | 'slide' | 'scale' | 'parallax';
}

export interface ProgressiveRevealConfig {
  trigger: 'scroll' | 'time' | 'interaction';
  stagger: number;
  duration: number;
  elements: RevealElement[];
}

export interface RevealElement {
  id: string;
  selector: string;
  animation: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'rotateIn';
  delay?: number;
  duration?: number;
}

export interface EngagementMetrics {
  timeSpent: number;
  sectionsViewed: string[];
  interactionsCount: number;
  scrollDepth: number;
  lastActiveTime: number;
}

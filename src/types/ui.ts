export interface InteractionState {
  isHovered: boolean;
  isFocused: boolean;
  isActive: boolean;
}

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface TechPattern {
  type: 'grid' | 'circuit' | 'terminal' | 'code';
  config: Record<string, any>;
  animated: boolean;
}

export interface DynamicUIConfig {
  expandableCards: boolean;
  tooltips: boolean;
  lightbox: boolean;
  contentToggle: boolean;
  progressBars: boolean;
}

export interface ExpandableCardProps {
  title: string;
  summary: string;
  expandedContent: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
}

export interface TooltipConfig {
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  trigger: 'hover' | 'click' | 'focus';
  delay?: number;
}

export interface LightboxConfig {
  images: string[];
  currentIndex?: number;
  alt?: string;
  caption?: string;
}

export interface ContentToggleProps {
  sections: ContentSection[];
  defaultSection?: string;
  layout: 'tabs' | 'accordion' | 'sidebar';
}

export interface ContentSection {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

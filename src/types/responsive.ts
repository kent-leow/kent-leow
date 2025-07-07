export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasTouch: boolean;
  orientation: 'portrait' | 'landscape';
  screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  userAgent: string;
}

export interface ResponsiveConfig {
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
  };
  components: {
    [key: string]: ResponsiveComponentConfig;
  };
}

export interface ResponsiveComponentConfig {
  mobile: ComponentSettings;
  tablet: ComponentSettings;
  desktop: ComponentSettings;
}

export interface ComponentSettings {
  layout: 'stack' | 'grid' | 'flex';
  columns?: number;
  spacing?: string;
  fontSize?: string;
  padding?: string;
  height?: string;
}

export interface AdaptiveLayout {
  component: string;
  device: 'mobile' | 'tablet' | 'desktop';
  settings: ComponentSettings;
}

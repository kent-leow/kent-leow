# Kent Leow - Professional Portfolio

A modern, interactive portfolio website showcasing Kent Leow's professional experience as a Software Engineer III with 6+ years of experience in full-stack development.

## 🌟 Features Implemented

### ✅ Feature 1: Professional Portfolio Display
- **Professional header** with name, title, and bio
- **Contact information** display with location and residence status
- **Skills showcase** organized by category (Frontend, Backend, Cloud, etc.)
- **Experience timeline** with detailed work history
- **Project portfolio** with descriptions and technologies used
- **Education and certifications** display

### ✅ Feature 2: Modern Interactive Design
- **Interactive cards** with hover effects and state management
- **Tech-inspired backgrounds** with circuit patterns and grids
- **Animated UI elements** with smooth transitions
- **Color-coded sections** using professional theme (#1a1a2e, #3498db, #e94560)
- **Glass morphism effects** with backdrop blur

### ✅ Feature 3: Animated Background Experience
- **Particle system** with canvas-based animations
- **Interactive mouse effects** with particle connections
- **Performance optimized** with RAF and cleanup
- **Multiple animation patterns** (particles, tech grids, circuits)
- **Configurable intensity** and animation speed

### ✅ Feature 4: Scroll & Gesture Interactions
- **Scroll-triggered animations** with intersection observers
- **Parallax effects** for depth and engagement
- **Touch gesture support** (swipe, pinch, pan, tap, long press)
- **Smooth scroll navigation** between sections
- **Progressive content revelation** as user scrolls

### ✅ Feature 5: Responsive Design System
- **Device detection** (mobile, tablet, desktop)
- **Touch optimization** with larger touch targets
- **Adaptive layouts** that change based on screen size
- **Responsive grids** with auto-fit columns
- **Touch-optimized buttons** with haptic feedback
- **Orientation-aware** design adjustments

### ✅ Feature 6: Dynamic UI Elements
- **Expandable cards** with smooth animations
- **Tooltips** with configurable positioning and triggers
- **Lightbox gallery** for image viewing
- **Content toggles** (tabs, accordion, sidebar layouts)
- **Interactive buttons** with state management
- **Progress indicators** and loading states

### ✅ Feature 7: Progressive Content Revelation
- **Storytelling experience** component for narrative flow
- **Engagement tracking** with time spent and interaction metrics
- **Scroll depth monitoring** and section view tracking
- **Auto-advance sections** with pause/play controls
- **Progress visualization** and section indicators

### ✅ Feature 8: Dynamic Section Navigation
- **Smart navigation system** with current section detection
- **Visual progress indicators** showing scroll progress
- **Keyboard navigation** support (arrow keys, page up/down)
- **Smooth transitions** between sections
- **Active section highlighting** with tooltips
- **Section-based experience** with proper URL routing

## 🛠 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system
- **Animations**: CSS animations + Canvas APIs
- **Interactions**: Custom gesture handlers and scroll triggers
- **Responsive**: Mobile-first design with device detection
- **Performance**: Optimized with React best practices

## 📁 Project Structure

```
src/
├── app/
│   ├── _components/
│   │   ├── backgrounds/          # Animated backgrounds
│   │   ├── experiences/          # Storytelling components
│   │   ├── interactions/         # Scroll & gesture handlers
│   │   ├── layout/              # Responsive layout components
│   │   ├── navigation/          # Dynamic navigation
│   │   ├── portfolio/           # Portfolio sections
│   │   └── ui/                  # Reusable UI components
│   ├── layout.tsx
│   └── page.tsx
├── data/
│   └── portfolio-data.ts        # Kent's professional data
├── hooks/
│   ├── useDeviceDetection.ts    # Device & touch detection
│   ├── useEngagementTracking.ts # User engagement metrics
│   ├── useResponsiveLayout.ts   # Layout management
│   ├── useScrollProgress.ts     # Scroll monitoring
│   └── useSectionNavigation.ts  # Section navigation
├── types/
│   ├── animations.ts            # Animation configurations
│   ├── interactions.ts          # Gesture & scroll types
│   ├── navigation.ts            # Navigation system types
│   ├── portfolio.ts             # Portfolio data structure
│   ├── responsive.ts            # Responsive design types
│   ├── storytelling.ts          # Content revelation types
│   └── ui.ts                    # UI component types
└── styles/
    └── globals.css
```

## 🎨 Design System

### Color Palette
- **Primary Dark**: #1a1a2e (Background)
- **Primary Light**: #16213e (Sections)
- **Accent**: #e94560 (CTAs, highlights)
- **Secondary**: #3498db (Links, tech elements)
- **Success**: #2ecc71 (Indicators)
- **Text Primary**: #f8f9fa
- **Text Secondary**: #a8a8a8

### Interactive States
- **Hover effects** with smooth transitions
- **Focus management** for accessibility
- **Active states** with visual feedback
- **Loading states** with progress indicators

## 🚀 Performance Features

- **Lazy loading** for images and heavy components
- **Animation frame optimization** for smooth 60fps
- **Intersection Observer** for efficient scroll handling
- **Debounced events** for resize and scroll
- **Memory cleanup** for event listeners and timers
- **Progressive enhancement** with fallbacks

## 📱 Responsive Breakpoints

- **XS**: < 640px (Mobile portrait)
- **SM**: 640px - 768px (Mobile landscape)
- **MD**: 768px - 1024px (Tablet)
- **LG**: 1024px - 1280px (Desktop)
- **XL**: 1280px - 1536px (Large desktop)
- **2XL**: > 1536px (Ultra-wide)

## ♿ Accessibility Features

- **Keyboard navigation** support
- **Screen reader** compatibility
- **High contrast** ratios
- **Touch target** optimization (44px minimum)
- **Focus indicators** for all interactive elements
- **ARIA labels** and semantic HTML

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format
```

## 📈 Future Enhancements

- **Dark/Light mode** toggle
- **Blog integration** for articles and insights
- **Contact form** with email integration
- **Analytics** for visitor tracking
- **SEO optimization** with meta tags
- **PWA features** for offline access

## 📝 Personal Information

**Kent Leow** - Software Engineer III
- 📍 Singapore (Permanent Resident)
- 📞 +65 8834 1602
- 💼 6+ years full-stack development experience
- 🎯 Specializing in React, Angular, Flutter, Spring Boot
- ☁️ Cloud platforms: Azure, AWS, GCP
- 🚀 Passionate about AI-accelerated development

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.

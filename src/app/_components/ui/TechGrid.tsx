"use client";

interface TechGridProps {
  pattern?: 'dots' | 'lines' | 'hexagon';
  intensity?: 'subtle' | 'medium' | 'prominent';
  animated?: boolean;
}

export default function TechGrid({ 
  pattern = 'dots', 
  intensity = 'subtle', 
  animated = true 
}: TechGridProps) {
  const getIntensityOpacity = () => {
    switch (intensity) {
      case 'medium':
        return 'opacity-20';
      case 'prominent':
        return 'opacity-30';
      default:
        return 'opacity-10';
    }
  };

  const renderDotPattern = () => (
    <div className={`absolute inset-0 ${getIntensityOpacity()}`}>
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `radial-gradient(circle, #00f5ff 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          animation: animated ? 'techPulse 4s ease-in-out infinite' : 'none'
        }}
      />
    </div>
  );

  const renderLinePattern = () => (
    <div className={`absolute inset-0 ${getIntensityOpacity()}`}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path 
              d="M 40 0 L 0 0 0 40" 
              fill="none" 
              stroke="#00f5ff" 
              strokeWidth="1"
              className={animated ? "animate-pulse" : ""}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );

  const renderHexagonPattern = () => (
    <div className={`absolute inset-0 ${getIntensityOpacity()}`}>
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300f5ff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: animated ? 'techFloat 6s ease-in-out infinite' : 'none'
        }}
      />
    </div>
  );

  const renderPattern = () => {
    switch (pattern) {
      case 'lines':
        return renderLinePattern();
      case 'hexagon':
        return renderHexagonPattern();
      default:
        return renderDotPattern();
    }
  };

  return (
    <>
      {renderPattern()}
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes techPulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes techFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}

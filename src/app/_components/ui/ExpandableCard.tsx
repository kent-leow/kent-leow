"use client";

import React, { useState } from "react";
import type { ExpandableCardProps } from "../../../types/ui";
import InteractiveCard from "./InteractiveCard";

export default function ExpandableCard({
  title,
  summary,
  expandedContent,
  isExpanded: controlledExpanded,
  onToggle
}: ExpandableCardProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  
  const isExpanded = controlledExpanded ?? internalExpanded;
  
  const handleToggle = () => {
    const newState = !isExpanded;
    
    if (controlledExpanded === undefined) {
      setInternalExpanded(newState);
    }
    
    onToggle?.(newState);
  };

  return (
    <InteractiveCard 
      variant="elevated" 
      className="overflow-hidden transition-all duration-500"
    >
      {/* Header */}
      <div 
        className="cursor-pointer p-6 hover:bg-[#1a1a2e]/50 transition-colors duration-300"
        onClick={handleToggle}
      >
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-[#f8f9fa] mb-2">
              {title}
            </h3>
            <p className="text-[#a8a8a8] text-sm leading-relaxed">
              {summary}
            </p>
          </div>
          
          {/* Expand/Collapse Icon */}
          <div className="ml-4 flex-shrink-0">
            <div 
              className={`w-8 h-8 rounded-full bg-[#3498db]/20 flex items-center justify-center transition-all duration-300 ${
                isExpanded ? 'rotate-180 bg-[#e94560]/20' : ''
              }`}
            >
              <svg 
                className={`w-4 h-4 transition-colors duration-300 ${
                  isExpanded ? 'text-[#e94560]' : 'text-[#3498db]'
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 border-t border-[#3498db]/20">
          <div className="pt-4">
            {expandedContent}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="relative">
        <div 
          className={`h-1 bg-gradient-to-r from-[#3498db] to-[#e94560] transition-all duration-500 ${
            isExpanded ? 'w-full' : 'w-0'
          }`}
        />
      </div>
    </InteractiveCard>
  );
}

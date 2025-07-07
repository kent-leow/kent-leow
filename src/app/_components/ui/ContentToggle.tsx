"use client";

import React, { useState } from "react";
import type { ContentToggleProps, ContentSection } from "../../../types/ui";

export default function ContentToggle({
  sections,
  defaultSection,
  layout = 'tabs'
}: ContentToggleProps) {
  const [activeSection, setActiveSection] = useState(
    defaultSection || sections[0]?.id || ''
  );

  const renderTabs = () => (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-[#3498db]/20 mb-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300 border-b-2 ${
              activeSection === section.id
                ? 'border-[#e94560] text-[#e94560] bg-[#e94560]/10'
                : 'border-transparent text-[#a8a8a8] hover:text-[#f8f9fa] hover:bg-[#1a1a2e]/50'
            }`}
          >
            {section.icon && (
              <span className="w-5 h-5">{section.icon}</span>
            )}
            {section.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`transition-all duration-500 ${
              activeSection === section.id
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 hidden'
            }`}
          >
            {activeSection === section.id && section.content}
          </div>
        ))}
      </div>
    </div>
  );

  const renderAccordion = () => (
    <div className="w-full space-y-4">
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        
        return (
          <div
            key={section.id}
            className="border border-[#3498db]/20 rounded-lg overflow-hidden bg-[#16213e]/50"
          >
            {/* Accordion Header */}
            <button
              onClick={() => setActiveSection(isActive ? '' : section.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-[#1a1a2e]/50 transition-colors duration-300"
            >
              <div className="flex items-center gap-3">
                {section.icon && (
                  <span className={`w-5 h-5 transition-colors duration-300 ${
                    isActive ? 'text-[#e94560]' : 'text-[#3498db]'
                  }`}>
                    {section.icon}
                  </span>
                )}
                <span className={`font-medium transition-colors duration-300 ${
                  isActive ? 'text-[#e94560]' : 'text-[#f8f9fa]'
                }`}>
                  {section.title}
                </span>
              </div>
              
              <div className={`transform transition-transform duration-300 ${
                isActive ? 'rotate-180' : ''
              }`}>
                <svg className="w-5 h-5 text-[#a8a8a8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Accordion Content */}
            <div className={`overflow-hidden transition-all duration-500 ${
              isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="p-4 border-t border-[#3498db]/20">
                {section.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderSidebar = () => (
    <div className="flex gap-8">
      {/* Sidebar Navigation */}
      <div className="w-64 flex-shrink-0">
        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-[#e94560] text-white'
                  : 'text-[#a8a8a8] hover:text-[#f8f9fa] hover:bg-[#1a1a2e]/50'
              }`}
            >
              {section.icon && (
                <span className="w-5 h-5">{section.icon}</span>
              )}
              {section.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 min-h-[400px]">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`transition-all duration-500 ${
              activeSection === section.id
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-4 hidden'
            }`}
          >
            {activeSection === section.id && section.content}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {layout === 'tabs' && renderTabs()}
      {layout === 'accordion' && renderAccordion()}
      {layout === 'sidebar' && renderSidebar()}
    </div>
  );
}

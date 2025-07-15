"use client";

import { useState, useEffect } from "react";
import type { PersonalProject } from "../../../types/portfolio";

interface PersonalProjectsSectionProps {
  projects: PersonalProject[];
}

export default function PersonalProjectsSection({ projects }: PersonalProjectsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || projects.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setIsAutoPlaying(false);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setIsAutoPlaying(false);
  };

  const goToProject = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (projects.length === 0) return null;

  const currentProject = projects[currentIndex];
  if (!currentProject) return null;

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Personal Projects
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Showcasing innovative solutions and creative implementations
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Project Display */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-purple-500/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Project Image */}
              <div className="relative group">
                <div className="aspect-video bg-slate-700 rounded-lg overflow-hidden">
                  <img
                    src={currentProject.preview}
                    alt={`${currentProject.title} preview`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-12 h-12 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {currentProject.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {currentProject.description}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-sm font-medium border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {currentProject.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <a
                  href={currentProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                >
                  <span>Try It Live</span>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          {projects.length > 1 && (
            <>
              {/* Previous/Next Buttons */}
              <button
                onClick={prevProject}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-full transition-all duration-300 backdrop-blur-sm border border-purple-500/30"
                aria-label="Previous project"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextProject}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-full transition-all duration-300 backdrop-blur-sm border border-purple-500/30"
                aria-label="Next project"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-8 gap-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToProject(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-purple-400 scale-125"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Project Counter */}
        {projects.length > 1 && (
          <div className="text-center mt-4 text-gray-400">
            <span className="text-sm">
              {currentIndex + 1} of {projects.length}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

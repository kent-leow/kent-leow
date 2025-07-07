"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import type { LightboxConfig } from "../../../types/ui";

interface LightboxProps {
  config: LightboxConfig;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({ config, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(config.currentIndex || 0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % config.images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + config.images.length) % config.images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const lightboxElement = (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 z-10 p-2 text-white hover:text-[#e94560] transition-colors duration-200"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous Button */}
      {config.images.length > 1 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:text-[#3498db] transition-colors duration-200"
          onClick={prevImage}
          aria-label="Previous image"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next Button */}
      {config.images.length > 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:text-[#3498db] transition-colors duration-200"
          onClick={nextImage}
          aria-label="Next image"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Image Container */}
      <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <img
          src={config.images[currentIndex]}
          alt={config.alt || `Image ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain shadow-2xl"
          style={{
            animation: 'lightboxImageFadeIn 0.3s ease-out'
          }}
        />
        
        {/* Image Counter */}
        {config.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 text-white text-sm rounded-full backdrop-blur-sm">
            {currentIndex + 1} / {config.images.length}
          </div>
        )}

        {/* Caption */}
        {config.caption && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 max-w-md px-4 py-2 bg-black/60 text-white text-center text-sm rounded-lg backdrop-blur-sm">
            {config.caption}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {config.images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto pb-2">
          {config.images.map((image, index) => (
            <button
              key={index}
              className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all duration-200 ${
                index === currentIndex 
                  ? 'border-[#3498db] ring-2 ring-[#3498db]/50' 
                  : 'border-white/30 hover:border-white/60'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes lightboxImageFadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );

  return typeof window !== 'undefined' ? createPortal(lightboxElement, document.body) : null;
}

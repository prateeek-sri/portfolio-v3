"use client";

import React, { useRef, useEffect } from "react";

const HeroBanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Autoplay may be blocked on some browsers; silently ignore
    });
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 lg:px-8">
      <div
        id="hero-banner"
        className="relative w-full rounded-2xl overflow-hidden bg-surface/30 border border-border/40 shadow-md aspect-[16/7] sm:aspect-[16/5]"
      >
        <video
          ref={videoRef}
          src="/icons/hero-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle bottom fade so content below blends cleanly */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default HeroBanner;

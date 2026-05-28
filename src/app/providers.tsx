"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CommandPalette } from "@/components/ui/command-palette";
import { PageTransition } from "@/components/ui/page-transition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playClickSound = () => {
  if (typeof window === 'undefined') return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.06);
    
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch (e) {
    console.error("Audio API error:", e);
  }
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, select, textarea, [onClick], .cursor-pointer');
      
      if (interactive) {
        // Skip theme toggler button to avoid overlapping chime sound
        if (interactive.closest('.theme-toggler-btn') || interactive.getAttribute('aria-label') === 'Switch theme') {
          return;
        }
        playClickSound();
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  useEffect(() => {
    const syncTheme = () => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-highlight selection:text-white relative">
      {/* Noise Texture Overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
        }}
      />

      <ScrollProgress />
      <CommandPalette />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <PageTransition>
        <main className="relative z-10 w-full">
          {children}
        </main>
      </PageTransition>

      {pathname === "/" && <Footer />}
    </div>
  );
}

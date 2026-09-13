"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatedThemeToggler } from './ui/animated-theme-toggler';
import { Search } from 'lucide-react';
import { CONFIG } from '../src/config';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isHidden?: boolean;
}

const navItems = [
  { label: 'Work', href: '/work' },
  { label: 'Stack', href: '/stack' },
];

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, isHidden = false }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Track whether we've scrolled past the hero banner
  const [scrolledPastBanner, setScrolledPastBanner] = useState(!isHomePage);
  // The CSS top value (px) to apply while banner is in view
  const [navTopPx, setNavTopPx] = useState<number>(32);

  useEffect(() => {
    if (!isHomePage) {
      setScrolledPastBanner(true);
      setNavTopPx(32);
      return;
    }

    const compute = () => {
      const banner = document.getElementById('hero-banner');
      if (banner) {
        const rect = banner.getBoundingClientRect();
        const absBottom = rect.bottom + window.scrollY; // distance from page top
        const past = window.scrollY + 48 > absBottom;
        setScrolledPastBanner(past);
        if (!past) {
          // Position navbar just below the banner's current viewport bottom
          setNavTopPx(Math.round(rect.bottom) + 20);
        } else {
          setNavTopPx(32);
        }
      } else {
        setScrolledPastBanner(false);
        setNavTopPx(32);
      }
    };

    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, [isHomePage]);

  const navStyle: React.CSSProperties = { top: `${navTopPx}px` };


  return (
    <nav
      style={navStyle}
      className={`border-white/40 dark:border-white/10 bg-white/70 dark:bg-black/70 fixed left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-2xl border shadow-lg backdrop-blur-xl transition-[top] duration-500 ease-out md:h-[60px] md:w-auto md:max-w-5xl md:rounded-full ${isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="flex h-14 items-center justify-between px-3 sm:px-4 md:gap-4 md:px-6 md:h-[60px]">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="group flex items-center gap-2 sm:gap-2.5">
            {/* Profile Image Logo */}
            <div className="h-6 w-6 rounded bg-text-muted/20 transition-all duration-300 group-hover:opacity-60 overflow-hidden flex-shrink-0 border border-border/40 shadow-sm">
              <Image src="/icons/me/me.jpg" alt="Prateek" width={24} height={24} className="w-full h-full object-cover" />
            </div>
            <span className="text-base font-semibold md:text-lg">Prateek</span>
          </Link>
          {/* Nav items */}
          <div className="flex items-center gap-4 sm:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative group text-muted-foreground hover:text-foreground text-sm transition-colors md:text-base"
              >
                <span>{item.label}</span>
                <div className="absolute left-0 -bottom-[4px] h-[4px] w-0 group-hover:w-full transition-all duration-300 ease-out pointer-events-none overflow-hidden">
                  <div className="w-[100px] h-full text-foreground">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id={`zigzag-nav-${item.label}`} x="0" y="0" width="12" height="4" patternUnits="userSpaceOnUse">
                          <path d="M0 2 L3 0 L9 4 L12 2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                        </pattern>
                      </defs>
                      <rect x="0" y="0" width="100%" height="100%" fill={`url(#zigzag-nav-${item.label})`} />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-0.5 sm:gap-2">
          {/* Command Palette Trigger */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            className="flex items-center gap-1.5 p-1.5 sm:px-2 sm:py-1 text-text-muted hover:text-text-primary bg-transparent sm:bg-secondary/10 sm:hover:bg-secondary/40 border-transparent sm:border sm:border-border/30 sm:hover:border-border/60 rounded-full transition-colors group"
            aria-label="Open command palette"
          >
            <Search className="w-[18px] h-[18px] sm:w-3.5 sm:h-3.5 ml-0.5" />
            <div className="hidden sm:flex items-center gap-1 mr-0.5">
              <kbd className="px-1 py-0 text-[10px] font-mono font-medium text-text-muted group-hover:text-text-primary bg-background border border-border/40 rounded-[4px] shadow-sm transition-colors">
                Ctrl
              </kbd>
              <kbd className="px-1 py-0 text-[10px] font-mono font-medium text-text-muted group-hover:text-text-primary bg-background border border-border/40 rounded-[4px] shadow-sm transition-colors">
                K
              </kbd>
            </div>
          </button>

          {/* Theme toggler */}
          <div className="flex items-center">
            <AnimatedThemeToggler />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
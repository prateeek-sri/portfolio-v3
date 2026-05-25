import React from 'react';
import { Container } from './Layout';
import { AnimatedThemeToggler } from './ui/animated-theme-toggler';
import Link from 'next/link';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const navItems = [
  { name: 'Work', link: '/work' },
  { name: 'Stack', link: '/stack' },
];

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  return (
    <nav className="w-full py-8 text-sm font-medium text-text-primary">
      <Container className="flex items-center justify-end gap-6">
        <div className="flex items-center gap-6">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="relative px-1 py-1 text-text-primary hover:text-black dark:hover:text-white transition-colors duration-300 ease-out group"
            >
              <span>{item.name}</span>
              <div className="absolute left-0 -bottom-[4px] h-[4px] w-0 group-hover:w-full transition-all duration-300 ease-out pointer-events-none overflow-hidden">
                <div className="w-[100px] h-full">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id={`zigzag-nav-${idx}`} x="0" y="0" width="12" height="4" patternUnits="userSpaceOnUse">
                        <path d="M0 2 L3 0 L9 4 L12 2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                      </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill={`url(#zigzag-nav-${idx})`} />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
          <AnimatedThemeToggler />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
"use client";

import React, { useState, useEffect } from 'react';
import { Section, Container } from './Layout';
import { ArrowUpRightIcon } from './Icons';
import { CONFIG } from '../src/config';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

// Dynamic Inline Badge with a magnetic circle cursor hover effect that tracks mouse position
const InlineBadge: React.FC<{ text: string; icon?: string; emoji?: string; invertOnHover?: boolean }> = ({ text, icon, emoji, invertOnHover }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <span
      className="relative inline-flex items-center gap-1 mx-1 cursor-pointer group select-none align-middle"
      onMouseMove={handleMouseMove}
    >
      {/* The magnetic expanding circle background that tracks the cursor with mix-blend-difference */}
      <span
        className="absolute rounded-full bg-white pointer-events-none transition-transform duration-300 ease-out scale-0 group-hover:scale-100 -translate-x-1/2 -translate-y-1/2 z-20 mix-blend-difference"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: '20px',
          height: '20px',
        }}
      />

      {/* Icon/Flag Container */}
      {icon && (
        <span className={`relative z-30 flex items-center justify-center shrink-0 ${text === "Next.js" ? "w-[20px] h-[20px]" : "w-5 h-5"}`}>
          <img
            src={icon}
            alt=""
            className={`object-cover shadow-sm transition-all duration-300 ${text === "Next.js"
                ? "w-[20px] h-[20px] rounded-full"
                : "w-[20px] h-[15px] rounded-[3px]"
              } ${invertOnHover ? "group-hover:invert dark:group-hover:invert-0" : ""
              }`}
          />
        </span>
      )}
      {emoji && (
        <span className="text-sm leading-none z-30">{emoji}</span>
      )}

      {/* Text with animated underline (starts left, goes right) */}
      <span className={`relative text-text-primary font-semibold pb-0.5 transition-colors duration-300 z-10 ${icon || emoji ? "ml-0.5" : ""}`}>
        {text}
        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-text-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
      </span>
    </span>
  );
};

// Utility: wrap matching highlight words in styled elements or badges
const renderHighlightedText = (text: string, highlights: string[]) => {
  const specialBadges = ["India", "Next.js"];
  const allMatches = [...highlights, ...specialBadges];

  // Sort by length descending to match longer terms first
  allMatches.sort((a, b) => b.length - a.length);

  const escaped = allMatches.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'g');
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part === "India") {
      return (
        <InlineBadge key={i} text="India" icon="/icons/india.svg" invertOnHover={false} />
      );
    }
    if (part === "Next.js") {
      return (
        <InlineBadge key={i} text="Next.js" icon="/icons/next.js-logo.svg" invertOnHover={true} />
      );
    }
    if (highlights.includes(part)) {
      return (
        <InlineBadge key={i} text={part} />
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

const Hero: React.FC = () => {
  const { name, age, roles, bio, bioHighlights, social, resumeUrl } = CONFIG;

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [animationState, setAnimationState] = useState<'visible' | 'exiting' | 'entering'>('visible');

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: social.linkedin,
      icon: '/icons/linkedin-org.svg',
      imgClass: 'w-[20px] h-[20px] sm:w-[18px] sm:h-[18px] rounded-[3px] object-cover',
    },
    {
      name: 'GitHub',
      url: social.github,
      icon: '/icons/github-light.svg',
      darkIcon: '/icons/github-dark.svg',
      imgClass: 'w-[20px] h-[20px] sm:w-[18px] sm:h-[18px] object-contain',
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/u/sri_prateek/',
      icon: '/icons/leetcode-original.svg',
      imgClass: 'w-[20px] h-[20px] sm:w-[18px] sm:h-[18px] object-contain',
    },
    {
      name: 'Instagram',
      url: social.instagram,
      icon: '/icons/insta.svg',
      imgClass: 'w-[20px] h-[20px] sm:w-[18px] sm:h-[18px] rounded-[4px] object-cover',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationState('exiting');
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setAnimationState('entering');
        setTimeout(() => setAnimationState('visible'), 50);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <Section id="about">
      <Container>
        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-text-primary tracking-tight">
                {name}
              </h1>
            </div>
            <p className="text-base text-text-secondary flex items-center gap-1.5 min-h-[1.5rem]">
              <span>{age},</span>
              <span
                className={`transform inline-block will-change-transform ${animationState === 'visible'
                    ? 'opacity-100 translate-y-0 blur-0 scale-100 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]'
                    : animationState === 'exiting'
                      ? 'opacity-0 translate-y-2 blur-[2px] transition-all duration-300 ease-[cubic-bezier(0.4,0,1,1)]'
                      : 'opacity-0 -translate-y-2 blur-[2px] transition-none'
                  }`}
              >
                {roles[currentRoleIndex]}
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-3 max-w-2xl text-text-secondary leading-relaxed">
            {bio.map((paragraph, i) => (
              <p key={i}>{renderHighlightedText(paragraph, bioHighlights)}</p>
            ))}
          </div>

          <div className="flex items-center mt-2">
            <div className="inline-flex items-center gap-5 sm:gap-5 px-5 sm:px-5 py-2.5 sm:py-2.5 rounded-full border border-border/50 dark:border-white/15 bg-surface/40 dark:bg-white/[0.04] backdrop-blur-md shadow-sm">
              {socialLinks.map((item) => (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform duration-200 hover:scale-115 active:scale-95 flex items-center justify-center select-none"
                      aria-label={item.name}
                    >
                      {item.darkIcon ? (
                        <>
                          <img
                            src={item.icon}
                            alt={item.name}
                            className={`${item.imgClass} dark:hidden block`}
                          />
                          <img
                            src={item.darkIcon}
                            alt={item.name}
                            className={`${item.imgClass} hidden dark:block`}
                          />
                        </>
                      ) : (
                        <img
                          src={item.icon}
                          alt={item.name}
                          className={item.imgClass}
                        />
                      )}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
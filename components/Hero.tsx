"use client";

import React, { useState, useEffect } from 'react';
import { Section, Container } from './Layout';
import { ArrowUpRightIcon, VolumeIcon } from './Icons';
import { CONFIG } from '../src/config';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

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
      className="relative inline-flex items-center gap-1.5 mx-1 cursor-pointer group select-none align-middle"
      onMouseMove={handleMouseMove}
    >
      {/* The magnetic expanding circle background that tracks the cursor */}
      <span
        className="absolute rounded-full bg-black dark:bg-white pointer-events-none transition-transform duration-300 ease-out scale-0 group-hover:scale-100 -translate-x-1/2 -translate-y-1/2 -z-10"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: '36px',
          height: '36px',
        }}
      />

      {/* Icon/Flag Container */}
      {icon && (
        <span className="relative z-10 w-5 h-5 flex items-center justify-center shrink-0">
          <img
            src={icon}
            alt=""
            className={`w-[18px] h-[13px] object-cover rounded-[3px] shadow-sm transition-all duration-300 ${
              invertOnHover ? "group-hover:invert dark:group-hover:invert-0" : ""
            }`}
          />
        </span>
      )}
      {emoji && (
        <span className="text-sm leading-none z-10">{emoji}</span>
      )}

      {/* Text with animated underline (starts left, goes right) */}
      <span className="relative text-text-primary group-hover:text-white dark:group-hover:text-black font-semibold pb-0.5 ml-0.5 transition-colors duration-300">
        {text}
        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-text-primary group-hover:bg-white dark:group-hover:bg-black transition-colors duration-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
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
        <span
          key={i}
          className="relative inline text-text-primary cursor-default font-medium pb-0.5 group/highlight"
        >
          {part}
          <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-text-primary scale-x-0 group-hover/highlight:scale-x-100 transition-transform duration-300 ease-out origin-left" />
        </span>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

const Hero: React.FC = () => {
  const { name, age, roles, bio, bioHighlights, social, resumeUrl } = CONFIG;

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [animationState, setAnimationState] = useState<'visible' | 'exiting' | 'entering'>('visible');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const socialLinks = [
    { name: 'Github',   url: social.github, icon: Github },
    { name: 'Linkedin', url: social.linkedin, icon: Linkedin },
    { name: 'Instagram',  url: social.instagram, icon: Instagram },
    { name: 'Email', url: `https://mail.google.com/mail/?view=cm&fs=1&to=${social.email}`, icon: Mail },
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

  // Load and cache voices on mount (resolves async load delay on mobile Safari/Chrome)
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    const updateVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };

    updateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  const handlePlayAudio = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(true);

    // Grab loaded voices list (fall back to direct call if state is not populated yet)
    let availableVoices = voices.length ? voices : window.speechSynthesis.getVoices();
    
    // Priority order for the absolute best, most natural human-sounding neural voices:
    // 1. Google India English (perfect natural accent for Indian names)
    // 2. Microsoft Aria Online Neural / Natural India voices
    // 3. Apple Siri/Premium India voices (e.g. Rishi, Karen enhanced)
    // 4. Any Indian English (en-IN) or Hindi (hi-IN) voice
    // 5. Google general en-US voices
    // 6. Generic en-IN fallback (ensures perfect native pronunciation even on basic engines)
    let bestVoice: SpeechSynthesisVoice | null = null;
    
    const priorities = [
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('google') && v.lang === 'en-IN',
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('microsoft') && v.name.toLowerCase().includes('natural') && v.lang === 'en-IN',
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('siri') && v.lang === 'en-IN',
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('premium') && v.lang === 'en-IN',
      (v: SpeechSynthesisVoice) => v.lang === 'en-IN',
      (v: SpeechSynthesisVoice) => v.lang === 'hi-IN',
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('google') && v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en'),
    ];
    
    for (const matchFn of priorities) {
      const found = availableVoices.find(matchFn);
      if (found) {
        bestVoice = found;
        break;
      }
    }

    const utterance = new SpeechSynthesisUtterance();
    if (bestVoice) {
      utterance.voice = bestVoice;
      utterance.lang = bestVoice.lang;
    } else {
      // DEFAULT FALLBACK: Must be en-IN (Indian English) to ensure perfect native pronunciation!
      utterance.lang = 'en-IN';
    }
    
    utterance.text = name;
    
    // Optimize speech parameters for mobile & desktop clarity:
    // - rate: 0.82 (slightly slower for extremely clear name spelling and cadence)
    // - pitch: 1.02 (warm and friendly)
    utterance.rate = 0.82;
    utterance.pitch = 1.02;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Section id="about">
      <Container>
        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="text-5xl md:text-6xl font-display font-medium text-text-primary tracking-tight">
                {name}
              </h1>
              <button
                onClick={handlePlayAudio}
                className={`text-text-muted hover:text-highlight transition-colors focus:outline-none mt-2 md:mt-3 ${isSpeaking ? 'text-highlight animate-pulse' : ''}`}
                aria-label="Play name pronunciation"
                title="Hear my name"
              >
                <VolumeIcon className="w-6 h-6" />
              </button>
            </div>
            <p className="text-base text-text-secondary flex items-center gap-1.5 min-h-[1.5rem]">
              <span>{age},</span>
              <span
                className={`transform inline-block will-change-transform ${
                  animationState === 'visible'
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

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 gap-6 sm:gap-0">
            <div className="flex items-center gap-6">
              {socialLinks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-black dark:hover:text-white transition-all duration-300 ease-out relative group p-1 flex items-center justify-center"
                    aria-label={item.name}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="absolute left-0 -bottom-[4px] h-[4px] w-0 group-hover:w-full transition-all duration-300 ease-out pointer-events-none overflow-hidden">
                      <div className="w-[100px] h-full">
                        <svg width="100%" height="100%">
                          <defs>
                            <pattern id={`zigzag-social-${idx}`} x="0" y="0" width="12" height="4" patternUnits="userSpaceOnUse">
                              <path d="M0 2 L3 0 L9 4 L12 2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                            </pattern>
                          </defs>
                          <rect x="0" y="0" width="100%" height="100%" fill={`url(#zigzag-social-${idx})`} />
                        </svg>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-black dark:hover:text-white transition-all duration-300 ease-out relative group"
            >
              <span>Resume</span>
              <ArrowUpRightIcon className="w-4 h-4" />
              <div className="absolute left-0 -bottom-[2px] h-[4px] w-0 group-hover:w-full transition-all duration-300 ease-out pointer-events-none overflow-hidden">
                <div className="w-[100px] h-full">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="zigzag-resume" x="0" y="0" width="12" height="4" patternUnits="userSpaceOnUse">
                        <path d="M0 2 L3 0 L9 4 L12 2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                      </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#zigzag-resume)" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
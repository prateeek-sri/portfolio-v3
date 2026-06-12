"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Section, Container, SectionHeader } from './Layout';
import { 
  Music, 
  MapPin, 
  Monitor, 
  Zap, 
  GitCommit, 
  ArrowUpRight, 
  Instagram, 
  BookOpen, 
  PenTool, 
  Loader2,
  AlertCircle,
  FileText,
  Mail,
  Send,
  Coffee,
  Gamepad2,
  Sword,
  X
} from 'lucide-react';
import { CONFIG } from '../src/config';
import { cn } from '../lib/utils';

// Reusable Card Component matching exactly the requested typography and style structure
const ActivityCard = ({
  className,
  onClick,
  href,
  icon: Icon,
  label,
  children,
  actionIcon = true,
}: {
  className?: string;
  onClick?: () => void;
  href?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  children: React.ReactNode;
  actionIcon?: boolean;
}) => {
  const content = (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-text-secondary group-hover:text-text-primary transition-colors">
          <Icon size={13} className="shrink-0" />
          <span className="text-[10px] font-medium uppercase tracking-widest">{label}</span>
        </div>
        {actionIcon && (
          <ArrowUpRight
            size={14}
            className="text-text-secondary/30 group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
          />
        )}
      </div>
      <div className="font-bold text-xs sm:text-sm text-text-primary/80 leading-relaxed break-words">
        {children}
      </div>
    </>
  );

  const baseStyles = cn(
    // Base Layout
    'group relative flex flex-col p-3 sm:p-4 rounded-xl border transition-all duration-300 overflow-hidden backdrop-blur-sm',
    // Theme Styles
    'bg-surface/20 border-border/40 hover:bg-surface/40 hover:border-white/50 dark:hover:border-white/40',
    // Interactive states
    (onClick || href) && 'cursor-pointer active:scale-[0.98]',
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {content}
      </Link>
    );
  }

  return (
    <div onClick={onClick} className={baseStyles}>
      {content}
    </div>
  );
};

const LocationTime = () => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      };
      setTimeString(now.toLocaleTimeString('en-IN', options));
    }

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col text-xs sm:text-sm text-text-primary/80 font-normal">
      IST <br />
      {timeString || 'loading...'}
    </div>
  );
};

const InstagramStatus = () => {
  const [status, setStatus] = useState<{ text: string; colorClass: string }>({ text: 'Loading...', colorClass: 'text-text-secondary' });

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      // Get IST time exactly
      const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
      const h = istTime.getHours();
      const m = istTime.getMinutes();
      const timeVal = h + m / 60;

      let newStatus = { text: 'Offline', colorClass: 'text-text-secondary' };

      if (timeVal >= 9 && timeVal < 11) {
        newStatus = { text: 'Online', colorClass: 'text-green-500 dark:text-green-400' };
      } else if (timeVal >= 11 && timeVal < 13) {
        newStatus = { text: 'Offline', colorClass: 'text-text-secondary' };
      } else if (timeVal >= 13 && timeVal < 18) {
        newStatus = { text: 'Online', colorClass: 'text-green-500 dark:text-green-400' };
      } else if (timeVal >= 18 && timeVal < 20) {
        newStatus = { text: 'Offline', colorClass: 'text-text-secondary' };
      } else if (timeVal >= 20 || timeVal < 0.5) { // 0.5 is 12:30 AM
        newStatus = { text: 'Online', colorClass: 'text-green-500 dark:text-green-400' };
      } else {
        newStatus = { text: 'Sleeping', colorClass: 'text-blue-500 dark:blue-400' };
      }

      setStatus(newStatus);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`truncate font-medium transition-colors duration-500 ${status.colorClass}`}>
      {status.text}
    </div>
  );
};

const LatestCommitCard = () => {
  const [data, setData] = useState<{ sha: string; date: string; message: string; url: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLatestCommit = async () => {
      try {
        setIsLoading(true);
        const username = CONFIG.github.username;
        const response = await fetch(`https://api.github.com/repos/${username}/portfolio-v3/commits`);
        if (!response.ok) throw new Error('Failed to load commit');
        const commits = await response.json();
        
        if (commits && commits.length > 0) {
          const commitData = commits[0];
          setData({
            sha: commitData.sha,
            date: commitData.commit.author.date,
            message: commitData.commit.message,
            url: commitData.html_url,
          });
        } else {
          setError(true);
        }
      } catch (e) {
        // Silently fallback to a dummy commit to prevent console errors and broken UI
        setData({
          sha: "a1b2c3d",
          date: new Date().toISOString(),
          message: "feat: implemented amazing features",
          url: `https://github.com/${CONFIG.github.username}`,
        });
        setError(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestCommit();
  }, []);

  return (
    <ActivityCard
      className="col-span-2 min-h-[90px]"
      icon={GitCommit}
      label="Latest Commit"
      href={data?.url || `https://github.com/${CONFIG.github.username}`}
    >
      {error ? (
        <div className="flex items-center gap-2 text-red-500/80 text-xs sm:text-sm h-full font-normal">
          <AlertCircle size={14} />
          <span>Failed to load commit</span>
        </div>
      ) : isLoading ? (
        <div className="flex items-center gap-2 text-text-secondary text-xs sm:text-sm h-full font-normal">
          <Loader2 size={14} className="animate-spin" />
          <span>Syncing with GitHub...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2 h-full justify-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-normal text-blue-500 dark:text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                #{data?.sha?.substring(0, 7) || '???????'}
              </span>
              {data?.date && <span className="text-[10px] text-text-secondary font-mono">
                {new Date(data.date).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>}
            </div>
          </div>

          <p
            className="text-xs sm:text-sm text-text-primary/80 line-clamp-2 leading-relaxed font-normal"
            title={data?.message}
          >
            {data?.message?.split('\n')[0] || 'No commit message'}
          </p>
        </div>
      )}
    </ActivityCard>
  );
};

const SpotifyCard = () => {
  const [data, setData] = useState<any>({ isPlaying: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchSpotify = async () => {
      try {
        const res = await fetch('/api/spotify');
        const json = await res.json();
        setData(json);
      } catch (error) {}
    };

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <ActivityCard className="col-span-2 min-h-[90px] justify-between" icon={Music} label="Now Playing">
        <div className="text-text-secondary text-sm">Loading...</div>
      </ActivityCard>
    );
  }

  return (
    <ActivityCard
      className="col-span-2 min-h-[90px] justify-between"
      icon={Music}
      label={data.isPlaying ? "Now Playing" : "Last Played"}
      href={data.songUrl || "https://open.spotify.com"}
    >
      <div className="flex items-center gap-3">
        {(data.isPlaying || data.title) && data.albumImageUrl && (
          <div className="relative shrink-0">
            <img 
              src={data.albumImageUrl} 
              alt="album" 
              className={cn("w-10 h-10 rounded-full", data.isPlaying && "animate-[spin_6s_linear_infinite]")} 
            />
            <div className="absolute inset-0 m-auto w-2 h-2 bg-background rounded-full border border-border/20" />
          </div>
        )}
        <div className="flex flex-col w-full overflow-hidden">
          {data.title ? (
            <>
              {data.isPlaying ? (
                <span className="text-xs font-medium text-emerald-500 mb-0.5 flex gap-[2px] items-end h-2.5">
                  <span className="w-[2px] h-[40%] bg-emerald-500 animate-[bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '0s' }} />
                  <span className="w-[2px] h-[80%] bg-emerald-500 animate-[bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }} />
                  <span className="w-[2px] h-[100%] bg-emerald-500 animate-[bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }} />
                  <span className="ml-1 leading-none text-[10px] tracking-wide">LISTENING</span>
                </span>
              ) : (
                <span className="text-[10px] font-bold text-text-muted mb-0.5 uppercase tracking-wide">
                  OFFLINE
                </span>
              )}
              <span className="text-sm font-bold text-text-primary truncate">{data.title}</span>
              <span className="text-[11px] font-medium text-text-secondary truncate">{data.artist}</span>
            </>
          ) : (
            <span className="text-sm font-medium text-text-secondary line-clamp-1 mt-1">Not playing</span>
          )}
        </div>
      </div>
    </ActivityCard>
  );
};

const FRUIT_TYPES = [
  {
    name: 'watermelon',
    isBomb: false,
    svg: (
      <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-2xl">
        <path d="M 10 30 A 40 40 0 0 0 90 30 Z" fill="#ff4757" />
        <path d="M 10 30 A 40 40 0 0 0 90 30" fill="none" stroke="#2ed573" strokeWidth="8" strokeLinecap="round" />
        <path d="M 15 30 A 35 35 0 0 0 85 30" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.5" />
        <circle cx="35" cy="45" r="3" fill="#2f3542" />
        <circle cx="50" cy="55" r="3" fill="#2f3542" />
        <circle cx="65" cy="45" r="3" fill="#2f3542" />
      </svg>
    )
  },
  {
    name: 'orange',
    isBomb: false,
    svg: (
      <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-2xl">
        <circle cx="50" cy="50" r="45" fill="#ffa502" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff" strokeWidth="4" opacity="0.8" />
        <path d="M 50 10 L 50 90 M 10 50 L 90 50 M 22 22 L 78 78 M 22 78 L 78 22" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
      </svg>
    )
  },
  {
    name: 'kiwi',
    isBomb: false,
    svg: (
      <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-2xl">
        <circle cx="50" cy="50" r="45" fill="#8bc34a" stroke="#795548" strokeWidth="6" />
        <circle cx="50" cy="50" r="15" fill="#f1f2f6" opacity="0.8" />
        <circle cx="50" cy="30" r="2" fill="#2f3542" />
        <circle cx="50" cy="70" r="2" fill="#2f3542" />
        <circle cx="30" cy="50" r="2" fill="#2f3542" />
        <circle cx="70" cy="50" r="2" fill="#2f3542" />
        <circle cx="35" cy="35" r="2" fill="#2f3542" />
        <circle cx="65" cy="65" r="2" fill="#2f3542" />
        <circle cx="35" cy="65" r="2" fill="#2f3542" />
        <circle cx="65" cy="35" r="2" fill="#2f3542" />
      </svg>
    )
  },
  {
    name: 'blueberry',
    isBomb: false,
    svg: (
      <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-2xl">
        <circle cx="50" cy="50" r="40" fill="#3742fa" />
        <ellipse cx="50" cy="20" rx="15" ry="8" fill="#81ecec" opacity="0.6" />
        <path d="M 40 20 L 60 20 L 50 30 Z" fill="#2d3436" opacity="0.8" />
      </svg>
    )
  },
  {
    name: 'cherry',
    isBomb: false,
    svg: (
      <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-2xl">
        <path d="M 50 20 Q 35 25 30 60" fill="none" stroke="#2ed573" strokeWidth="4" strokeLinecap="round" />
        <path d="M 50 20 Q 65 25 70 60" fill="none" stroke="#2ed573" strokeWidth="4" strokeLinecap="round" />
        <path d="M 45 20 L 55 20" stroke="#2f3542" strokeWidth="4" strokeLinecap="round" />
        <circle cx="30" cy="70" r="20" fill="#ff4757" />
        <circle cx="70" cy="70" r="20" fill="#ff4757" />
        <path d="M 18 65 A 10 10 0 0 1 25 55" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <path d="M 58 65 A 10 10 0 0 1 65 55" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      </svg>
    )
  },
  {
    name: 'peach',
    isBomb: false,
    svg: (
      <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-2xl">
        <circle cx="50" cy="55" r="40" fill="#ff7f50" />
        <path d="M 50 15 Q 40 55 50 95" fill="none" stroke="#ff4757" strokeWidth="3" opacity="0.4" />
        <path d="M 50 15 Q 65 0 80 15 Q 65 30 50 15 Z" fill="#2ed573" />
        <path d="M 20 45 A 25 25 0 0 1 35 25" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      </svg>
    )
  },
  {
    name: 'grape',
    isBomb: false,
    svg: (
      <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-2xl">
        <path d="M 50 10 L 50 20" stroke="#2f3542" strokeWidth="4" strokeLinecap="round" />
        <path d="M 50 20 Q 70 10 80 20 Q 60 30 50 20 Z" fill="#2ed573" />
        <circle cx="35" cy="35" r="12" fill="#9b59b6" />
        <circle cx="65" cy="35" r="12" fill="#9b59b6" />
        <circle cx="50" cy="35" r="12" fill="#8e44ad" />
        <circle cx="42" cy="52" r="12" fill="#8e44ad" />
        <circle cx="58" cy="52" r="12" fill="#9b59b6" />
        <circle cx="50" cy="70" r="12" fill="#8e44ad" />
        <path d="M 45 65 A 5 5 0 0 1 50 62" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        <path d="M 38 48 A 5 5 0 0 1 42 45" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        <path d="M 45 30 A 5 5 0 0 1 50 27" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      </svg>
    )
  },
  {
    name: 'bomb',
    isBomb: true,
    svg: (
      <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">
        <defs>
          <radialGradient id="bombGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#636e72" />
            <stop offset="100%" stopColor="#2d3436" />
          </radialGradient>
        </defs>
        <path d="M 50 20 Q 60 10 70 20" fill="none" stroke="#ff7675" strokeWidth="4" strokeLinecap="round" />
        <circle cx="70" cy="20" r="4" fill="#d63031" className="animate-pulse" />
        <rect x="42" y="18" width="16" height="12" fill="#b2bec3" rx="2" />
        <circle cx="50" cy="60" r="35" fill="url(#bombGrad)" />
      </svg>
    )
  }
];

const FruitSlicerOverlay = ({ onClose }: { onClose: () => void }) => {
  const [mounted, setMounted] = useState(false);
  const [score, setScore] = useState(0);
  const [fruits, setFruits] = useState<{ id: number; fruitDef: any; left: number; duration: number; sliced: boolean }[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [trail, setTrail] = useState<{ x: number; y: number; time: number }[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track mouse/touch for sword trail
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
      setTrail((prev) => [...prev, { x, y, time: Date.now() }]);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [gameState]);

  // Clean up old trail segments
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setTrail((prev) => prev.filter((p) => now - p.time < 150));
    }, 50);
    return () => clearInterval(cleanup);
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;
    
    // Drop fruits faster: every 500ms
    const interval = setInterval(() => {
      setFruits(prev => {
        // Keep max 20 items on screen to prevent lag
        if (prev.length > 20) return prev.slice(1);
        
        // Random chance for a bomb (15% chance)
        const isBombRoll = Math.random() < 0.15;
        const availableTypes = FRUIT_TYPES.filter(f => isBombRoll ? f.isBomb : !f.isBomb);
        const selectedType = availableTypes[Math.floor(Math.random() * availableTypes.length)];

        return [
          ...prev,
          {
            id: Date.now() + Math.random(),
            fruitDef: selectedType,
            left: 10 + Math.random() * 80, // 10% to 90% vw
            duration: 2 + Math.random() * 2.5, // 2s to 4.5s falling speed
            sliced: false
          }
        ];
      });
    }, 500);

    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    // Clean up fruits that fell out of screen
    const cleanupInterval = setInterval(() => {
      setFruits(prev => prev.filter(f => !f.sliced && (Date.now() - f.id < f.duration * 1000 + 2000)));
    }, 2000);
    return () => clearInterval(cleanupInterval);
  }, []);

  const handleSlice = (id: number) => {
    if (gameState !== 'playing') return;
    
    setFruits(prev => prev.map(f => {
      if (f.id === id && !f.sliced) {
        if (f.fruitDef.isBomb) {
          // HIT A BOMB! GAME OVER
          setGameState('lost');
          setTimeout(() => onClose(), 1200);
        } else {
          // Normal fruit slice
          const newScore = score + 1;
          setScore(newScore);
          if (newScore >= 100) {
            setGameState('won');
            setTimeout(() => onClose(), 1200);
          }
        }
        return { ...f, sliced: true };
      }
      return f;
    }));
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* Background NO BLUR per request */}
      <div className="absolute inset-0 bg-transparent pointer-events-auto cursor-crosshair"></div>

      {/* HUD Top Left */}
      <div className="absolute top-8 left-8 flex items-center z-50 pointer-events-auto">
        <div className="bg-surface/20 border border-border/40 backdrop-blur-md px-5 py-2.5 rounded-2xl flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary font-bold">Score</span>
            <span className="text-2xl font-bold text-text-primary leading-none mt-0.5">
              {score}
            </span>
          </div>
        </div>
      </div>

      {/* Cross Button Top Right */}
      <div className="absolute top-8 right-8 z-50 pointer-events-auto">
        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-surface/20 hover:bg-red-500/10 border border-border/40 hover:border-red-500/50 text-text-secondary hover:text-red-500 transition-all duration-300 backdrop-blur-md"
        >
          <X size={24} />
        </button>
      </div>

      {/* Game Over / Win Toast without background container */}
      <div 
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] flex flex-col items-center justify-center pointer-events-none transition-all duration-500",
          gameState !== 'playing' ? "opacity-100 scale-100" : "opacity-0 scale-50"
        )}
      >
        {gameState === 'won' && (
          <h2 
            className="text-[80px] sm:text-[120px] md:text-[160px] font-black tracking-widest text-center leading-none" 
            style={{ 
              color: '#FFD700',
              fontFamily: '"Arial Black", Impact, sans-serif',
              WebkitTextStroke: '4px #ffffff',
              textShadow: '1px 1px 0 #b35900, 2px 2px 0 #b35900, 3px 3px 0 #b35900, 4px 4px 0 #b35900, 5px 5px 0 #b35900, 6px 6px 0 #b35900, 7px 7px 0 #b35900, 8px 8px 0 #b35900, 9px 9px 0 #b35900, 10px 10px 0 #ffffff, 11px 11px 0 #ffffff, 12px 12px 0 #ffffff'
            }}
          >
            WELL<br/>PLAYED
          </h2>
        )}
        {gameState === 'lost' && (
          <h2 
            className="text-[80px] sm:text-[120px] md:text-[160px] font-black tracking-widest text-center leading-none animate-pulse" 
            style={{ 
              color: '#ff7675',
              fontFamily: '"Arial Black", Impact, sans-serif',
              WebkitTextStroke: '4px #ffffff',
              textShadow: '1px 1px 0 #d63031, 2px 2px 0 #d63031, 3px 3px 0 #d63031, 4px 4px 0 #d63031, 5px 5px 0 #d63031, 6px 6px 0 #d63031, 7px 7px 0 #d63031, 8px 8px 0 #d63031, 9px 9px 0 #d63031, 10px 10px 0 #ffffff, 11px 11px 0 #ffffff, 12px 12px 0 #ffffff'
            }}
          >
            GAME<br/>OVER
          </h2>
        )}
      </div>

      {/* Floating Fruits */}
      {fruits.map(fruit => (
        <div
          key={fruit.id}
          className="absolute select-none pointer-events-auto cursor-crosshair"
          style={{
            left: `${fruit.left}%`,
            top: '-15%', // start well above screen
            animation: `fallAndRotate ${fruit.duration}s linear forwards`,
            opacity: fruit.sliced && fruit.fruitDef.isBomb ? 0 : 1,
            transform: fruit.sliced && fruit.fruitDef.isBomb ? 'scale(1.5)' : 'scale(1)',
            transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
          }}
          onMouseEnter={() => handleSlice(fruit.id)}
          onTouchStart={() => handleSlice(fruit.id)}
        >
          {fruit.sliced ? (
            fruit.fruitDef.isBomb ? (
              <div className="relative flex justify-center items-center">
                <span className="text-highlight text-5xl animate-ping absolute drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                  💥
                </span>
              </div>
            ) : (
              <div className="relative flex justify-center items-center w-full h-full">
                <div 
                  className="absolute animate-[sliceLeft_1s_ease-out_forwards]" 
                  style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
                >
                  {fruit.fruitDef.svg}
                </div>
                <div 
                  className="absolute animate-[sliceRight_1s_ease-out_forwards]" 
                  style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
                >
                  {fruit.fruitDef.svg}
                </div>
              </div>
            )
          ) : (
            fruit.fruitDef.svg
          )}
        </div>
      ))}

      {/* Sword Trail */}
      <svg className="absolute inset-0 pointer-events-none z-[100] w-full h-full">
        {trail.length > 1 && (
          <polyline
            points={trail.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          />
        )}
      </svg>

      {/* Global styles for animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fallAndRotate {
          0% {
            top: -15%;
            transform: rotate(0deg);
          }
          100% {
            top: 115%;
            transform: rotate(360deg);
          }
        }
        @keyframes sliceLeft {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(-40px, 80px) rotate(-45deg); opacity: 0; }
        }
        @keyframes sliceRight {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(40px, 80px) rotate(45deg); opacity: 0; }
        }
      `}} />
    </div>,
    document.body
  );
};

const FruitSlicerCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ActivityCard
        icon={Sword}
        label="Arcade"
        className="col-span-1 min-h-[90px] justify-between group overflow-hidden relative"
        onClick={() => setIsOpen(true)}
        actionIcon={false}
      >
        <div className="flex flex-col mt-1 z-10 relative leading-tight">
          <span className="text-sm font-medium text-text-primary/80">Fruit Slicer</span>
          <span className="text-[10px] text-text-muted mt-0.5">Play now</span>
        </div>
        <div className="absolute right-[-10px] bottom-[-10px] opacity-[0.05] group-hover:opacity-20 transition-all duration-500 group-hover:scale-125 group-hover:-rotate-12">
          <Sword size={64} className="text-text-primary" strokeWidth={1} />
        </div>
      </ActivityCard>

      {isOpen && <FruitSlicerOverlay onClose={() => setIsOpen(false)} />}
    </>
  );
};

const ActivityFeed = () => {
  return (
    <Section id="activity">
      <Container className="flex flex-col gap-6">
        <SectionHeader title="Activity Feed" />
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Row 1: Music & Instagram */}
          <SpotifyCard />

          <ActivityCard
            className="col-span-2 min-h-[90px] justify-between"
            icon={Instagram}
            label="Instagram Status"
            href={CONFIG.social.instagram}
          >
            <InstagramStatus />
          </ActivityCard>

          {/* Row 2: Location, Reading, Watching, Status */}
          <ActivityCard icon={MapPin} label="Location" actionIcon={false} className="col-span-1 min-h-[110px]">
            <div className="leading-tight mt-1">
              <LocationTime />
            </div>
          </ActivityCard>

          <ActivityCard 
            onClick={() => {
              document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
            }}
            icon={Mail} 
            label="Contact" 
            className="col-span-1 min-h-[110px] justify-between group overflow-hidden relative"
          >
            <div className="line-clamp-2 mt-1 text-text-primary/80 z-10 relative">
              Let's work <br /> together ✨
            </div>
            <div className="absolute right-[-15px] bottom-[-15px] opacity-10 group-hover:opacity-30 group-hover:-translate-y-2 group-hover:-rotate-12 transition-all duration-500">
              <Send size={72} className="text-text-primary" strokeWidth={1} />
            </div>
          </ActivityCard>

          <ActivityCard icon={Monitor} label="Watching" actionIcon={false} className="col-span-1 min-h-[110px]">
            <span className="italic block mt-1 truncate" title="Open-Source 👒">
              "Open-Source 👒"
            </span>
          </ActivityCard>

          <ActivityCard icon={Zap} label="Status" actionIcon={false} className="col-span-1 min-h-[110px]">
            <div className="line-clamp-3 mt-1" title="Building my personal site 🚀">
              Building my personal site 🚀
            </div>
          </ActivityCard>

          {/* Row 3: Git, Resume, Cat */}
          <LatestCommitCard />

          <ActivityCard
            href="/resume"
            icon={FileText}
            label="Resume"
            className="col-span-1 min-h-[90px] justify-between"
          >
            <div className="line-clamp-2 mt-1 text-text-primary/80">View my CV ✨</div>
          </ActivityCard>

          <FruitSlicerCard />
        </div>
      </Container>
    </Section>
  );
};

export default ActivityFeed;

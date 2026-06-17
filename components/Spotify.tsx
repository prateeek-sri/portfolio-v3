"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export default function Spotify() {
  const [data, setData] = useState<SpotifyData>({ isPlaying: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const fetchSpotify = async () => {
      try {
        const res = await fetch('/api/spotify');
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch Spotify data:", error);
      }
    };

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link 
          href={data.songUrl || "https://open.spotify.com"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex flex-row items-center gap-4 p-4 rounded-2xl bg-surface border border-border/40 hover:border-emerald-500/30 transition-all duration-300 w-full"
        >
          <div className="relative flex items-center justify-center w-14 h-14 shrink-0">
            {data.isPlaying && data.albumImageUrl ? (
              <>
                <img 
                  src={data.albumImageUrl} 
                  alt={data.album || "Album cover"} 
                  className="w-full h-full rounded-full object-cover animate-[spin_4s_linear_infinite] shadow-lg"
                />
                <div className="absolute w-3.5 h-3.5 bg-background rounded-full shadow-inner border border-border/20" />
              </>
            ) : (
              <div className="w-full h-full rounded-full bg-border/40 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-text-muted">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-7.5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </div>
            )}
          </div>

          <div className="flex flex-col overflow-hidden w-full">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-500/80 mb-0.5 flex items-center gap-1.5">
              {data.isPlaying ? (
                <>
                  <span className="flex gap-[2px] items-end h-2.5">
                    <span className="w-[2px] h-[40%] bg-emerald-500 animate-[bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '0s' }} />
                    <span className="w-[2px] h-[80%] bg-emerald-500 animate-[bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }} />
                    <span className="w-[2px] h-[100%] bg-emerald-500 animate-[bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }} />
                    <span className="w-[2px] h-[60%] bg-emerald-500 animate-[bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '0.6s' }} />
                  </span>
                  Now Playing
                </>
              ) : (
                'Not Playing'
              )}
            </p>
            <p className="text-sm font-semibold text-text-primary truncate">
              {data.title || 'Spotify'}
            </p>
            <p className="text-xs text-text-secondary truncate mt-0.5">
              {data.artist || 'Offline'}
            </p>
          </div>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>Listen on Spotify</p>
      </TooltipContent>
    </Tooltip>
  );
}

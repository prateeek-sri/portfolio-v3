"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { flushSync } from "react-dom"

import { Moon, Sun } from "lucide-react"

import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

type AnimatedThemeTogglerProps = {
  className?: string
}

const playToggleSound = () => {
  if (typeof window === 'undefined') return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = ctx.currentTime;
    
    // First high tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now);
    osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.15);
    gain1.gain.setValueAtTime(0.04, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.15);

    // Second delayed warm sliding tone (adds tactile switch click feel)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(329.63, now + 0.04);
    osc2.frequency.exponentialRampToValueAtTime(440.00, now + 0.22);
    gain2.gain.setValueAtTime(0.03, now + 0.04);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.04);
    osc2.stop(now + 0.22);
  } catch (e) {
    console.error("Audio API error:", e);
  }
};

export const AnimatedThemeToggler = ({ className }: AnimatedThemeTogglerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDarkMode(document.documentElement.classList.contains("dark"))

    const syncTheme = () =>
      setDarkMode(document.documentElement.classList.contains("dark"))

    const observer = new MutationObserver(syncTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  const onToggle = useCallback(async () => {
    if (!buttonRef.current) return

    playToggleSound()

    await document.startViewTransition(() => {
      flushSync(() => {
        const toggled = !darkMode
        setDarkMode(toggled)
        document.documentElement.classList.toggle("dark", toggled)
        localStorage.setItem("theme", toggled ? "dark" : "light")
      })
    }).ready

    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const maxDistance = Math.hypot(
      Math.max(centerX, window.innerWidth - centerX),
      Math.max(centerY, window.innerHeight - centerY)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${centerX}px ${centerY}px)`,
          `circle(${maxDistance}px at ${centerX}px ${centerY}px)`,
        ],
      },
      {
        duration: 1100,
        easing: "cubic-bezier(0.85, 0, 0.15, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [darkMode])

  if (!mounted) {
    return (
      <button
        ref={buttonRef}
        className={cn(
          "flex items-center justify-center p-2 rounded-full outline-none focus:outline-none active:outline-none focus:ring-0",
          className
        )}
        type="button"
      >
        <div className="w-[18px] h-[18px]" />
      </button>
    )
  }

  return (
    <button
      ref={buttonRef}
      onClick={onToggle}
      aria-label="Switch theme"
      className={cn(
        "flex items-center justify-center p-2 rounded-full outline-none focus:outline-none active:outline-none focus:ring-0 cursor-pointer",
        className
      )}
      type="button"
    >
      <AnimatePresence mode="wait" initial={false}>
        {darkMode ? (
          <motion.span
            key="sun-icon"
            initial={{ opacity: 0, scale: 0.55, rotate: 25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-text-primary"
          >
            <Sun size={18} strokeWidth={1.5} />
          </motion.span>
        ) : (
          <motion.span
            key="moon-icon"
            initial={{ opacity: 0, scale: 0.55, rotate: -25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-text-primary"
          >
            <Moon size={18} strokeWidth={1.5} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

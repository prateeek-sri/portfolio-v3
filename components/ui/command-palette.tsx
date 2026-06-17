"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, Briefcase, BookOpen, Mail, Github, FileText, Code, Moon, Sun, ArrowUp, Share2, Copy, Music } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { CONFIG } from "../../src/config";

interface CommandItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  category: "Recent" | "Navigation" | "Actions" | "Features";
  shortcut?: string;
}

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Prevent background scrolling when palette is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    // If not on home page, navigate to home first
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsOpen(false);
  };

  const commands: CommandItem[] = React.useMemo(() => [
    {
      id: "home",
      title: "Go to Home",
      description: "Navigate to the homepage",
      icon: <Home className="w-[18px] h-[18px]" />,
      action: () => {
        router.push("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsOpen(false);
      },
      category: "Navigation",
      shortcut: "H",
    },
    {
      id: "work",
      title: "Go to Work",
      description: "View work experience and projects",
      icon: <Briefcase className="w-[18px] h-[18px]" />,
      action: () => {
        router.push("/work");
        setIsOpen(false);
      },
      category: "Navigation",
      shortcut: "W",
    },
    {
      id: "stack",
      title: "Go to Stack",
      description: "View technologies I work with",
      icon: <Code className="w-[18px] h-[18px]" />,
      action: () => {
        router.push("/stack");
        setIsOpen(false);
      },
      category: "Navigation",
      shortcut: "S",
    },
    {
      id: "resume",
      title: "Go to Resume",
      description: "View and download resume",
      icon: <FileText className="w-[18px] h-[18px]" />,
      action: () => {
        router.push("/resume");
        setIsOpen(false);
      },
      category: "Navigation",
      shortcut: "R",
    },
    {
      id: "github-activity",
      title: "Go to GitHub Activity",
      description: "View GitHub contributions",
      icon: <Github className="w-[18px] h-[18px]" />,
      action: () => {
        if (pathname !== "/") {
          router.push("/");
        }
        setTimeout(() => {
          const githubSection = Array.from(document.querySelectorAll("section")).find(
            (section) => section.textContent?.includes("Github Activities") || section.id === "github"
          );
          if (githubSection) {
            githubSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
        setIsOpen(false);
      },
      category: "Navigation",
      shortcut: "G",
    },
    {
      id: "contact",
      title: "Go to Contact",
      description: "Get in touch with me",
      icon: <Mail className="w-[18px] h-[18px]" />,
      action: () => {
        if (pathname !== "/") {
          router.push("/");
        }
        setTimeout(() => {
          const contactSection = Array.from(document.querySelectorAll("section")).find(
            (section) => section.textContent?.includes("Contact") || section.id === "contact"
          );
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
        setIsOpen(false);
      },
      category: "Navigation",
      shortcut: "C",
    },
    {
      id: "toggle-theme",
      title: "Toggle Theme",
      description: "Switch between light and dark mode",
      icon: <><Sun className="w-[18px] h-[18px] dark:hidden" /><Moon className="w-[18px] h-[18px] hidden dark:block" /></>,
      action: () => {
        const themeBtn = document.querySelector('[aria-label="Switch theme"]') as HTMLButtonElement;
        if (themeBtn) themeBtn.click();
        else document.documentElement.classList.toggle('dark');
        setIsOpen(false);
      },
      category: "Features",
      shortcut: "T",
    },
    {
      id: "scroll-top",
      title: "Scroll to Top",
      description: "Scroll to the top of the page",
      icon: <ArrowUp className="w-[18px] h-[18px]" />,
      action: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsOpen(false);
      },
      category: "Features",
      shortcut: "Shift+↑",
    },
    {
      id: "copy-email",
      title: "Copy Email",
      description: "Copy email address to clipboard",
      icon: <Mail className="w-[18px] h-[18px]" />,
      action: () => {
        navigator.clipboard.writeText(CONFIG.contact.enquiryEmail);
        setIsOpen(false);
      },
      category: "Actions",
      shortcut: "Shift+E",
    },
    {
      id: "share-page",
      title: "Share Page",
      description: "Share the current page",
      icon: <Share2 className="w-[18px] h-[18px]" />,
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        setIsOpen(false);
      },
      category: "Actions",
      shortcut: "Shift+S",
    },
    {
      id: "view-github",
      title: "View GitHub Profile",
      description: "Open GitHub profile in a new tab",
      icon: <Code className="w-[18px] h-[18px]" />,
      action: () => {
        window.open(`https://github.com/${CONFIG.github.username}`, "_blank");
        setIsOpen(false);
      },
      category: "Actions",
      shortcut: "Shift+G",
    },
    {
      id: "spotify-song",
      title: "Open Spotify Song",
      description: "Open the currently playing Spotify song",
      icon: <Music className="w-[18px] h-[18px]" />,
      action: async () => {
        try {
          const res = await fetch('/api/spotify');
          const data = await res.json();
          if (data && data.songUrl) {
            window.open(data.songUrl, "_blank");
          } else {
            window.open("https://open.spotify.com", "_blank");
          }
        } catch (e) {
          window.open("https://open.spotify.com", "_blank");
        }
        setIsOpen(false);
      },
      category: "Actions",
      shortcut: "Shift+M",
    },
  ], [router, pathname]);

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) {
      acc[cmd.category] = [];
    }
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        if (isOpen && e.key === "Escape") {
          setIsOpen(false);
          setSearch("");
          setSelectedIndex(0);
        }
        if (isOpen && e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        }
        if (isOpen && e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        }
        if (isOpen && e.key === "Enter" && filteredCommands[selectedIndex]) {
          e.preventDefault();
          filteredCommands[selectedIndex].action();
          setSearch("");
          setSelectedIndex(0);
        }
        return;
      }

      // Open with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }

      // Global Shortcuts mapping all commands
      for (const cmd of commands) {
        if (!cmd.shortcut) continue;
        
        const keys = cmd.shortcut.toLowerCase().split('+');
        const needsShift = keys.includes('shift');
        const needsCtrl = keys.includes('ctrl') || keys.includes('cmd');
        const key = keys[keys.length - 1]; // actual key is always the last part

        let pressedKey = e.key.toLowerCase();
        if (pressedKey === "arrowup") pressedKey = "↑";
        
        if (
          pressedKey === key &&
          e.shiftKey === needsShift &&
          (e.ctrlKey || e.metaKey) === needsCtrl &&
          !e.altKey
        ) {
          e.preventDefault();
          cmd.action();
          return;
        }
      }

      // Close with Escape
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearch("");
        setSelectedIndex(0);
      }

      if (!isOpen) return;

      // Navigate with arrow keys
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      }

      // Execute with Enter
      if (e.key === "Enter" && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
        setSearch("");
        setSelectedIndex(0);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen, filteredCommands, selectedIndex]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-0 bg-background/40 backdrop-blur-[2px] z-[100]"
          />

          <div 
            className="fixed inset-0 z-[101] flex items-center justify-center px-4 pt-[15vh] sm:pt-[10vh] items-start sm:items-start pb-20 sm:pb-0"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsOpen(false);
                setSearch("");
                setSelectedIndex(0);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                mass: 0.8
              }}
              className="w-full max-w-[480px] mb-[10vh]"
            >
              <div className="bg-[#fcfcfc] dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 dark:border-white/10 bg-[#fcfcfc] dark:bg-[#111111]">
                  <Search className="w-5 h-5 text-gray-400 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Type a command or search..."
                    className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none text-[16px]"
                  />
                </div>

                {/* Commands List */}
                <div className="max-h-[55vh] sm:max-h-[400px] overflow-y-auto scrollbar-hide py-2">
                  {Object.entries(groupedCommands).map(([category, items]) => (
                    <div key={category} className="mb-2 last:mb-0">
                      <div className="px-5 py-2 text-[13px] font-medium text-gray-500 dark:text-gray-400">
                        {category}
                      </div>
                      <div className="flex flex-col">
                        {items.map((cmd, index) => {
                          const globalIndex = filteredCommands.indexOf(cmd);
                          const isSelected = globalIndex === selectedIndex;

                          return (
                            <button
                              key={cmd.id}
                              onClick={cmd.action}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              className={`w-[calc(100%-1rem)] mx-2 flex items-center gap-4 px-3 py-3 rounded-xl text-left transition-none ${isSelected
                                  ? "bg-gray-100/80 dark:bg-white/5 text-gray-900 dark:text-gray-100"
                                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-white/5"
                                }`}
                            >
                              <div className={`flex items-center justify-center shrink-0 ${isSelected ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
                                {cmd.icon}
                              </div>
                              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                                <div className={`text-[14.5px] font-medium leading-none tracking-tight ${isSelected ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-200'}`}>
                                  {cmd.title}
                                </div>
                                <div className="text-[12.5px] text-gray-500 dark:text-gray-400 truncate leading-none mt-1">
                                  {cmd.description}
                                </div>
                              </div>
                              {cmd.shortcut && (
                                <kbd className={`hidden sm:inline-block px-1.5 py-0.5 text-[11px] font-mono tracking-widest rounded-md ${
                                  isSelected 
                                    ? "text-gray-500 dark:text-gray-300 bg-white dark:bg-white/10 shadow-sm border border-gray-200 dark:border-transparent" 
                                    : "text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-transparent border border-gray-100 dark:border-white/5"
                                }`}>
                                  {cmd.shortcut}
                                </kbd>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {filteredCommands.length === 0 && (
                    <div className="px-4 py-12 flex flex-col items-center justify-center text-center">
                      <Search className="w-8 h-8 text-border mb-3" />
                      <p className="text-text-primary text-sm font-medium">No results found</p>
                      <p className="text-text-muted text-xs mt-1">Try searching for something else.</p>
                    </div>
                  )}
                </div>

                {/* Footer is removed to keep it cleaner and match the image strictly. If needed, I can add it, but Image 1 has no footer! */}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, Briefcase, BookOpen, Mail, Github, FileText, Code } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { CONFIG } from "../../src/config";

interface CommandItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  category: "Recent" | "Navigation" | "Actions";
  shortcut?: string;
}

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

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

  const commands: CommandItem[] = [
    {
      id: "resume",
      title: "Go to Resume",
      description: "View and download resume",
      icon: <FileText className="w-4 h-4" />,
      action: () => {
        window.open(CONFIG.resumeUrl, "_blank");
        setIsOpen(false);
      },
      category: "Recent",
      shortcut: "R",
    },
    {
      id: "projects",
      title: "Go to Projects",
      description: "View all projects and portfolio work",
      icon: <Briefcase className="w-4 h-4" />,
      action: () => scrollToSection("projects"),
      category: "Recent",
      shortcut: "P",
    },
    {
      id: "home",
      title: "Go to Home",
      description: "Navigate to the homepage",
      icon: <Home className="w-4 h-4" />,
      action: () => {
        router.push("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsOpen(false);
      },
      category: "Navigation",
      shortcut: "H",
    },
    {
      id: "about",
      title: "Go to About",
      description: "Learn more about me",
      icon: <Home className="w-4 h-4" />,
      action: () => scrollToSection("about"),
      category: "Navigation",
      shortcut: "A",
    },
    {
      id: "stack",
      title: "Go to Tech Stack",
      description: "View technologies I work with",
      icon: <Code className="w-4 h-4" />,
      action: () => {
        const stackSection = document.querySelector('[id="about"]')?.nextElementSibling;
        if (stackSection) {
          stackSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setIsOpen(false);
      },
      category: "Navigation",
      shortcut: "T",
    },
    {
      id: "work",
      title: "Go to Work Experience",
      description: "View work experience and employment history",
      icon: <Briefcase className="w-4 h-4" />,
      action: () => scrollToSection("projects"),
      category: "Navigation",
      shortcut: "W",
    },
    {
      id: "blogs",
      title: "Go to Blogs",
      description: "Browse all blog posts",
      icon: <BookOpen className="w-4 h-4" />,
      action: () => {
        const blogsSection = Array.from(document.querySelectorAll("section")).find(
          (section) => section.textContent?.includes("Blogs")
        );
        if (blogsSection) {
          blogsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setIsOpen(false);
      },
      category: "Navigation",
      shortcut: "B",
    },
    {
      id: "github",
      title: "Go to GitHub Activity",
      description: "View GitHub contributions",
      icon: <Github className="w-4 h-4" />,
      action: () => {
        const githubSection = Array.from(document.querySelectorAll("section")).find(
          (section) => section.textContent?.includes("Github Activities")
        );
        if (githubSection) {
          githubSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setIsOpen(false);
      },
      category: "Navigation",
      shortcut: "G",
    },
    {
      id: "contact",
      title: "Go to Contact",
      description: "Get in touch with me",
      icon: <Mail className="w-4 h-4" />,
      action: () => scrollToSection("contacts"),
      category: "Navigation",
      shortcut: "C",
    },
  ];

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
      // Open with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
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

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={() => {
              setIsOpen(false);
              setSearch("");
              setSelectedIndex(0);
            }}
          />

          {/* Command Palette */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="w-full max-w-2xl"
            >
              <div className="bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-[#333]">
                  <Search className="w-5 h-5 text-text-muted" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Type a command or search..."
                    className="flex-1 bg-transparent text-text-primary placeholder-text-muted outline-none text-sm"
                  />
                  <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-mono text-text-muted bg-[#2a2a2a] border border-[#333] rounded">
                    ESC
                  </kbd>
                </div>

                {/* Commands List */}
                <div className="max-h-[400px] overflow-y-auto">
                  {Object.entries(groupedCommands).map(([category, items]) => (
                    <div key={category}>
                      <div className="px-4 py-2 text-xs font-medium text-text-muted uppercase tracking-wider">
                        {category}
                      </div>
                      {items.map((cmd, index) => {
                        const globalIndex = filteredCommands.indexOf(cmd);
                        const isSelected = globalIndex === selectedIndex;

                        return (
                          <button
                            key={cmd.id}
                            onClick={cmd.action}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ease-out ${isSelected
                                ? "bg-[#2a2a2a] border-l-2 border-highlight"
                                : "border-l-2 border-transparent hover:bg-[#222]"
                              }`}
                          >
                            <div className="text-text-secondary">{cmd.icon}</div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-text-primary">
                                {cmd.title}
                              </div>
                              <div className="text-xs text-text-muted truncate">
                                {cmd.description}
                              </div>
                            </div>
                            {cmd.shortcut && (
                              <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-mono text-text-muted bg-[#2a2a2a] border border-[#333] rounded">
                                {cmd.shortcut}
                              </kbd>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))}

                  {filteredCommands.length === 0 && (
                    <div className="px-4 py-8 text-center text-text-muted text-sm">
                      No results found for "{search}"
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-[#333] bg-[#151515] text-xs text-text-muted">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-[#2a2a2a] border border-[#333] rounded">↑</kbd>
                      <kbd className="px-1.5 py-0.5 bg-[#2a2a2a] border border-[#333] rounded">↓</kbd>
                      to navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-[#2a2a2a] border border-[#333] rounded">↵</kbd>
                      to select
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-[#2a2a2a] border border-[#333] rounded">ESC</kbd>
                    to close
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

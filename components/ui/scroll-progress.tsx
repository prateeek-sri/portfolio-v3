"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpIcon } from "lucide-react";

export const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollPx = document.documentElement.scrollTop;
            const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            
            // Calculate progress percentage safely
            const scrolled = winHeightPx > 0 ? (scrollPx / winHeightPx) * 100 : 0;
            setScrollProgress(scrolled);

            // Show button only when scrolled down more than 150px
            if (scrollPx > 150) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", updateScrollProgress);
        updateScrollProgress(); // Initial call

        return () => window.removeEventListener("scroll", updateScrollProgress);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const circumference = 2 * Math.PI * 40; // radius = 40
    const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

    return (
        <motion.div
            className="fixed bottom-8 right-8 z-[60] flex items-center justify-center cursor-pointer group"
            initial={{ opacity: 0, scale: 0.8, pointerEvents: "none" }}
            animate={{ 
                opacity: isVisible ? 1 : 0, 
                scale: isVisible ? 1 : 0.8,
                pointerEvents: isVisible ? "auto" : "none" 
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
        >
            {/* Background Circle (Track) */}
            <svg width="50" height="50" viewBox="0 0 100 100" className="transform -rotate-90">
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-border/40 fill-transparent"
                    strokeWidth="6"
                />
                {/* Progress Circle (Indicator) */}
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-text-primary fill-transparent transition-all duration-150 ease-out"
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </svg>

            {/* Arrow icon inside - permanently visible with subtle hover micro-interaction */}
            <div className="absolute inset-0 flex items-center justify-center text-text-primary transition-colors duration-300">
                <ArrowUpIcon className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
        </motion.div>
    );
};

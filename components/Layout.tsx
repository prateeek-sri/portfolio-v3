"use client";

import React from 'react';
import { cn } from '../lib/utils';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

// Main container restricting max width and handling padding
export const Container: React.FC<LayoutProps> = ({ children, className = "", id }) => {
  return (
    <div id={id} className={cn("w-full max-w-2xl mx-auto px-3 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
};

// Section wrapper with vertical rhythm (margin bottom) and scroll blur-reveal
export const Section: React.FC<LayoutProps> = ({ children, className = "", id }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // Custom ultra-premium ease-out-expo
      }}
      className={cn("flex flex-col gap-6", className)}
    >
      {children}
    </motion.section>
  );
};

// Section Header with Title and Subtitle
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  count?: number;
  href?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, count, href }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-medium text-text-primary">
        <Link href={href || `/${title.toLowerCase()}`} >
        <span className="underline decoration-wavy underline-offset-4 decoration-1 decoration-highlight">
          {title}
        </span>
        </Link>
        {count !== undefined && <span className="text-sm align-top ml-1 text-text-secondary">({count})</span>}
      </h2>
      {subtitle && <p className="text-sm text-text-secondary">{subtitle}</p>}
    </div>
  );
};
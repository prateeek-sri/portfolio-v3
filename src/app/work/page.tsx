"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';
import { ArrowLeftIcon } from "@/components/Icons";
import { Container, SectionHeader } from "@/components/Layout";
import { CONFIG } from "@/src/config";

type Project = typeof CONFIG.projects[number];

// Complete tech icon mapping matching available public/icons resources
const TECH_ICONS: Record<string, string> = {
  'react': '/icons/react-original.svg',
  'react.js': '/icons/react-original.svg',
  'next.js': '/icons/next.js-logo.svg',
  'next': '/icons/next.js-logo.svg',
  'typescript': '/icons/typescript-plain.svg',
  'ts': '/icons/typescript-plain.svg',
  'javascript': '/icons/javascript-original.svg',
  'js': '/icons/javascript-original.svg',
  'tailwind': '/icons/tailwindcss-plain.svg',
  'tailwindcss': '/icons/tailwindcss-plain.svg',
  'node': '/icons/node-original.svg',
  'node.js': '/icons/node-original.svg',
  'express': '/icons/express-original.svg',
  'express.js': '/icons/express-original.svg',
  'mongodb': '/icons/mongodb-original.svg',
  'mongo': '/icons/mongodb-original.svg',
  'postgresql': '/icons/PostgresSQL.svg',
  'postgres': '/icons/PostgresSQL.svg',
  'redux': '/icons/redux-original.svg',
  'c': '/icons/c-original.svg',
  'java': '/icons/java-original.svg',
  'python': '/icons/Python.svg',
  'py': '/icons/Python.svg',
  'github': '/icons/github-original.svg',
  'vscode': '/icons/vscode-original.svg',
};

const ProjectPreview: React.FC<{ image: string; name: string }> = ({ image, name }) => (
  <div className="flex flex-col gap-2 w-72 sm:w-80 p-2 bg-surface border border-border/40 rounded-lg shadow-lg">
    <img
      src={image}
      alt={name}
      className="aspect-video w-full rounded-md object-cover"
    />
  </div>
);

const ProjectRow: React.FC<{ project: Project }> = ({ project }) => {
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left + 15;
    const y = e.clientY - rect.top + 15;
    tooltip.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const handleRowClick = (e: React.MouseEvent) => {
    // Prevent navigating primary link if they click the GitHub button specifically
    const target = e.target as HTMLElement;
    if (target.closest('.github-link-btn')) return;

    window.location.href = `/work/${project.slug}`;
  };

  return (
    <div
      onClick={handleRowClick}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col md:flex-row md:items-center justify-between py-6 gap-4 md:gap-0 border-b border-border/30 hover:border-border/60 transition-all duration-300 cursor-pointer group-hover/list:opacity-40 group-hover/list:blur-[1.5px] hover:!opacity-100 hover:!blur-none"
    >
      {/* Floating pure CSS Preview Tooltip - 100% GPU accelerated & lag-free on desktop */}
      <div
        ref={tooltipRef}
        className="hidden md:block absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 left-0 top-0 will-change-transform"
        style={{
          transform: 'translate3d(15px, 15px, 0)',
        }}
      >
        <div className="scale-90 group-hover:scale-100 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <ProjectPreview image={project.image} name={project.name} />
        </div>
      </div>

      {/* Mobile-only static preview image (no hover effects) */}
      <div className="block md:hidden w-full overflow-hidden rounded-lg border border-border/40 shadow-md">
        <img
          src={project.image}
          alt={project.name}
          className="w-full aspect-video object-cover"
        />
      </div>

      {/* Left side: Project details */}
      <div className="flex flex-col gap-1 items-start text-left md:transition-transform md:duration-300 md:ease-out md:group-hover:translate-x-2.5 w-full md:w-auto">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-text-primary group-hover:text-highlight transition-colors duration-200">
            {project.name}
          </h3>
          <span className="text-text-muted group-hover:text-highlight transition-colors duration-200">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </span>

        </div>


        
        <p className="text-sm text-text-secondary pr-4 line-clamp-2 md:line-clamp-1">{project.description}</p>
        
        <div className="flex items-center gap-4 mt-2">
          <span className="text-xs text-text-muted font-medium font-sans">
            {project.year}
          </span>
          <span className="text-sm font-semibold text-text-muted group-hover:text-text-primary group-hover:underline underline-offset-4 transition-all duration-300 flex items-center gap-1">
            View Details <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </div>
      </div>

      {/* Right side: Color-spreading stacked tech icons */}
      <div className="flex items-center space-x-1 md:-space-x-1.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:space-x-1 select-none shrink-0 md:pl-4">
        {project.tags.map((tag, i) => {
          const iconSrc = TECH_ICONS[tag.toLowerCase()];
          if (!iconSrc) return null;
          return (
            <div
              key={i}
              className="relative w-5 h-5 sm:w-[22px] sm:h-[22px] flex items-center justify-center grayscale-0 opacity-100 md:grayscale md:opacity-60 md:group-hover:grayscale-0 md:group-hover:opacity-100 md:group-hover:scale-105 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transitionDelay: `${i * 6}ms`
              }}
            >
              <img
                src={iconSrc}
                alt={tag}
                className="w-full h-full object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const WorkPage = () => {
  const { projects } = CONFIG;

  // Group projects by year
  const groupedProjects = projects.reduce((groups, project) => {
    const year = project.year || "Other";
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(project);
    return groups;
  }, {} as Record<string, typeof projects>);

  // Sort years in descending order
  const sortedYears = Object.keys(groupedProjects).sort((a, b) => b.localeCompare(a));

  return (
    <div className="relative">
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="w-full shadow-sm">
          <img 
            src="/icons/gif2.gif" 
            alt="Work header animation" 
            className="w-full h-auto max-h-[96px] md:max-h-[120px] object-cover" 
          />
        </div>
      </div>
      <Container className="min-h-screen pt-36 md:pt-44 pb-20 select-none relative z-10">
        <main className="w-full max-w-7xl mx-auto">
          <SectionHeader
            title="Work"
            subtitle="A complete archive of projects and software tools I have crafted."
          />

        <div className="flex flex-col mt-8">
          {sortedYears.map((year) => (
            <div key={year} className="flex flex-col gap-3 mt-10 first:mt-4">
              <span className="text-xs font-semibold text-text-muted font-sans tracking-widest select-none opacity-80 pl-1">
                {year}
              </span>
              <div className="flex flex-col group/list">
                {groupedProjects[year].map((p, i) => (
                  <ProjectRow key={i} project={p} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pb-10 flex justify-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-all duration-300"
          >
            <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>home</span>
          </Link>
        </div>
      </main>
    </Container>
    </div>
  );
};

export default WorkPage;

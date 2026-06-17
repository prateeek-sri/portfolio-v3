"use client";

import React from 'react';
import { Container } from './Layout';
import { StarIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { CONFIG } from '../src/config';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { TextHoverEffect } from './ui/hover-text-effect';

const Footer: React.FC = () => {
  const pathname = usePathname();
  const { footer } = CONFIG;

  // Hide footer on individual blog post pages
  if (pathname && pathname.startsWith('/blog/')) {
    return null;
  }

  return (
    <footer className="w-full pt-4 pb-6">
      <Container className="flex flex-col gap-4">

        {/* Signature image */}
        {footer.signatureImageUrl && (
          <div className="w-full flex items-start">
            <div className="h-24 md:h-32 lg:h-40 max-w-md overflow-hidden">
              <img
                src={footer.signatureImageUrl}
                alt="Signature"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-border pt-8 text-sm text-text-secondary font-medium">
          <p>{footer.credit}</p>
          <p>All rights reserved</p>

          {/* Star this project button */}
          {footer.githubRepoUrl && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={footer.githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 mt-4 w-fit rounded-full border border-border bg-surface text-text-secondary hover:text-text-primary hover:border-text-muted/50 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group"
                >
                  <StarIcon className="w-4 h-4 text-text-muted group-hover:text-yellow-400 group-hover:fill-yellow-400 transition-all duration-500 ease-out group-hover:rotate-12" />
                  <span className="text-xs sm:text-sm font-medium">Star this project</span>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Star on GitHub</p>
              </TooltipContent>
            </Tooltip>
          )}

          <p className="font-mono text-text-muted mt-2">git commit -m "bye"</p>
        </div>
        <div className="w-full flex items-end justify-center overflow-hidden pointer-events-auto relative z-30 mt-8">
          <TextHoverEffect text={CONFIG.name.split(" ")[0]} />
        </div>

      </Container>
    </footer>
  );
};

export default Footer;
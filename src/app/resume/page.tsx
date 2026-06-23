"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@/components/Icons";
import { Container, SectionHeader } from "@/components/Layout";

const ResumePage = () => {
  return (
    <Container className="min-h-screen pt-56 md:pt-72 pb-20 select-none relative z-10">
      <main className="w-full max-w-7xl mx-auto">
        <SectionHeader
          title="Resume"
          subtitle="My resume."
        />

        <div className="w-full mt-12 mb-8 bg-surface border border-border/40 rounded-xl overflow-hidden shadow-2xl h-[85vh] min-h-[700px] md:min-h-[900px]">
          {/* The iframe automatically loads the resume.pdf from the public directory */}
          <iframe 
            src="/resume.pdf" 
            className="w-full h-full border-none bg-white"
            title="Resume"
          />
        </div>

        <div className="mt-12 pb-10 flex justify-center w-full">
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
  );
};

export default ResumePage;

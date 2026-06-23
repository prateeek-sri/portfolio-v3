"use client";

import React from 'react';
import Hero from "@/components/Hero";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";
import ActivityFeed from "@/components/ActivityFeed";
import GithubActivity from "@/components/GithubActivity";
import Contact from "@/components/Contact";

const Divider = () => (
  <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 lg:px-8">
    <div className="w-full h-px bg-border" />
  </div>
);

export default function HomePage() {
  return (
    <>
      <main className="flex flex-col pt-56 md:pt-72 pb-0 gap-10 md:gap-14 relative z-10">
        <Hero />
        <Divider />
        <ActivityFeed />
        <Divider />
        <Projects />
        <Divider />
        <Stack />
        <Divider />
        <GithubActivity />
        <Divider />
        <Contact />
      </main>
    </>
  );
}

import React from 'react';
import Hero from "@/components/Hero";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";
import GithubActivity from "@/components/GithubActivity";
import Contact from "@/components/Contact";

export default function HomePage() {
  return (
    <main className="flex flex-col pt-32 md:pt-48 pb-0 gap-20 md:gap-28 relative z-10">
      <Hero />
      <Projects />
      <Stack />
      <GithubActivity />
      <Contact />
    </main>
  );
}

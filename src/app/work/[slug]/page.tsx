import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { CONFIG } from '../../../config';
import { GithubIcon, ArrowLeftIcon } from '@/components/Icons';

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

export function generateStaticParams() {
  return CONFIG.projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const projectIndex = CONFIG.projects.findIndex(p => p.slug === resolvedParams.slug);
  if (projectIndex === -1) return notFound();

  const project = CONFIG.projects[projectIndex];
  const prevProject = projectIndex > 0 ? CONFIG.projects[projectIndex - 1] : null;
  const nextProject = projectIndex < CONFIG.projects.length - 1 ? CONFIG.projects[projectIndex + 1] : null;

  return (
    <main className="min-h-screen text-text-primary pt-32 pb-20 px-3 sm:px-6 lg:px-8 max-w-2xl mx-auto flex flex-col gap-12 font-sans">
      
      {/* Header */}
      <header className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">{project.name}</h1>
        <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">
          {project.description}
        </p>
        
        <div className="flex gap-4 mt-2">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors font-medium">
              Live Site <ArrowUpRight size={14} />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors font-medium">
              Source <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </header>

      {/* Hero Image */}
      <div className="w-full rounded-xl overflow-hidden border border-border/40">
        <img src={`/${project.image}`} alt={project.name} className="w-full h-auto object-cover" />
      </div>

    {/* Tech Stack */}
        <section className="flex flex-col gap-3">
          <h2 className="text-base font-semibold text-text-primary">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => {
              const iconSrc = TECH_ICONS[tag.toLowerCase()];
              return (
                <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border/40 rounded-md text-xs font-medium text-text-secondary">
                  {iconSrc && <img src={iconSrc} alt={tag} className="w-3.5 h-3.5 object-contain" />}
                  {tag}
                </span>
              );
            })}
          </div>
        </section>

      {/* Content Sections */}
      <div className="flex flex-col gap-10 w-full">
        
        {/* Overview */}
        {project.overview && (
          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-text-primary">Overview</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              {project.overview}
            </p>
          </section>
        )}


 {/* Challenges and Learnings Split */}
        {(project.problemsFaced || project.lessonsLearned) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full pt-4">
            {project.problemsFaced && (
              <div className="p-6 bg-surface/10 border border-yellow-500/20 rounded-xl flex flex-col gap-4">
                <h3 className="text-base font-bold text-yellow-500/90">Key Challenges</h3>
                <ul className="flex flex-col gap-3">
                  {project.problemsFaced.split('. ').map((item, i) => item ? (
                    <li key={i} className="flex items-start gap-3 text-sm text-yellow-500/80 leading-relaxed font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                      <span>{item.trim() + (item.endsWith('.') ? '' : '.')}</span>
                    </li>
                  ) : null)}
                </ul>
              </div>
            )}

            {project.lessonsLearned && (
              <div className="p-6 bg-surface/10 border border-emerald-500/20 rounded-xl flex flex-col gap-4">
                <h3 className="text-base font-bold text-emerald-500/90">Key Learnings</h3>
                <ul className="flex flex-col gap-3">
                  {project.lessonsLearned.split('. ').map((item, i) => item ? (
                    <li key={i} className="flex items-start gap-3 text-sm text-emerald-500/80 leading-relaxed font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                      <span>{item.trim() + (item.endsWith('.') ? '' : '.')}</span>
                    </li>
                  ) : null)}
                </ul>
              </div>
            )}
          </div>
        )}
    

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-text-primary">Key Features</h2>
            <ul className="flex flex-col gap-2 list-disc list-inside text-sm text-text-secondary">
              {project.features.map((f, i) => (
                <li key={i} className="leading-relaxed">{f}</li>
              ))}
            </ul>
          </section>
        )}

  {/* Why Chose This Stack */}
        {project.whyChoseThisStack && project.whyChoseThisStack.length > 0 && (
          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-text-primary">Why This Stack?</h2>
            <ul className="flex flex-col gap-3 text-sm text-text-secondary">
              {project.whyChoseThisStack.map((item, i) => (
                <li key={i} className="flex flex-col gap-0.5">
                  <span className="font-semibold text-text-primary">{item.name}</span>
                  <span className="leading-relaxed">{item.reason}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Implementations */}
        {project.implementations && project.implementations.length > 0 && (
          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-text-primary">Implementations</h2>
            <ul className="flex flex-col gap-2 list-disc list-inside text-sm text-text-secondary">
              {project.implementations.map((f, i) => (
                <li key={i} className="leading-relaxed">{f}</li>
              ))}
            </ul>
          </section>
        )}

       

      </div>

      <div className="w-full h-px bg-border/40 my-4" />

      {/* Pagination Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevProject ? (
          <Link href={`/work/${prevProject.slug}`} className="group flex items-center justify-start gap-3 w-full sm:w-1/2 p-4 rounded-xl border border-border/30 hover:border-border/60 bg-transparent transition-all cursor-pointer">
            <ArrowLeft className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors shrink-0" />
            <div className="flex flex-col items-start overflow-hidden">
              <span className="text-[11px] text-text-muted font-medium uppercase tracking-wider mb-0.5">Previous Project</span>
              <span className="text-sm font-medium text-text-primary transition-colors truncate w-full">{prevProject.name}</span>
            </div>
          </Link>
        ) : <div className="w-full sm:w-1/2" />}

        {nextProject ? (
          <Link href={`/work/${nextProject.slug}`} className="group flex items-center justify-end gap-3 w-full sm:w-1/2 p-4 rounded-xl border border-border/30 hover:border-border/60 bg-transparent transition-all cursor-pointer">
            <div className="flex flex-col items-end text-right overflow-hidden">
              <span className="text-[11px] text-text-muted font-medium uppercase tracking-wider mb-0.5">Next Project</span>
              <span className="text-sm font-medium text-text-primary transition-colors truncate w-full">{nextProject.name}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors shrink-0" />
          </Link>
        ) : <div className="w-full sm:w-1/2" />}
      </footer>

      {/* Home Button at Bottom */}
      <div className="flex justify-center mt-6 pb-10">
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-all duration-300"
        >
          <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>home</span>
        </Link>
      </div>

    </main>
  );
}

import React from 'react';
import { Section, Container, SectionHeader } from './Layout';
import { ArrowUpRightIcon } from './Icons';
import { CONFIG } from '../src/config';
import Link from 'next/link';

const BlogRow: React.FC<{ title: string; id: string; date: string }> = ({ title, id, date }) => (
  <Link
    href={`/blog/${id}`}
    className="group flex items-center justify-between py-5 border-b border-border/40 hover:border-border transition-all duration-300 ease-out"
  >
    <div className="flex flex-col gap-1">
      <span className="text-text-primary font-medium group-hover:text-highlight transition-all duration-300 ease-out">{title}</span>
      <span className="text-xs text-text-muted">{date}</span>
    </div>
    <ArrowUpRightIcon className="w-4 h-4 text-text-muted group-hover:text-highlight group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
  </Link>
);

const Blogs: React.FC = () => {
  const { blogs } = CONFIG;

  return (
    <Section>
      <Container className="flex flex-col gap-8">
        <SectionHeader
          title="Blogs"
          count={blogs.length}
          subtitle="Here are some blogs that I have curated"
        />
        <div className="flex flex-col">
          {blogs.map((blog) => (
            <BlogRow key={blog.id} title={blog.title} id={blog.id} date={blog.date} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Blogs;
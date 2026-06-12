import React from 'react';
import { Section, Container, SectionHeader } from './Layout';
import { Logos3 } from './blocks/logos3';
import { CONFIG } from '../src/config';

const Stack: React.FC = () => {
  // Duplicate the logos 4× to give Embla enough items for a seamless loop
  const formattedLogos = Array.from({ length: 4 }).flatMap((_, index) =>
    CONFIG.stack.map(item => ({
      id: `${item.id}-${index}`,
      description: item.name,
      image: item.image,
      className: `h-14 w-auto object-contain ${item.className || ''}`,
    }))
  );

  return (
    <Section>
      <Container className="flex flex-col gap-8">
        <SectionHeader
          title="Stack I Use"
          href="/stack"
          subtitle="Technologies I work with to build products and solve real-life problems"
        />
        <Logos3 heading="" logos={formattedLogos} />
      </Container>
    </Section>
  );
};

export default Stack;
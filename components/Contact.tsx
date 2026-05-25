import React from 'react';
import { Section, Container, SectionHeader } from './Layout';
import { XIcon, GithubIcon, LinkedInIcon, ArrowUpRightIcon } from './Icons';
import { CONFIG } from '../src/config';

// Map platform names to their icon components
const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  'X.com': <XIcon />,
  'GitHub': <GithubIcon />,
  'LinkedIn': <LinkedInIcon />,
};

const SocialRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  handle: string;
  href: string;
}> = ({ icon, label, handle, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-between py-4 border-b border-border/30 last:border-b-0 hover:bg-surface/30 px-3 -mx-3 rounded-lg transition-all duration-300 ease-out group"
  >
    <div className="flex items-center gap-4">
      <span className="text-text-secondary w-5 h-5 group-hover:text-highlight transition-all duration-300 ease-out">{icon}</span>
      <span className="text-text-secondary font-mono text-sm tracking-wide group-hover:text-highlight transition-all duration-300 ease-out">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-text-muted text-sm group-hover:text-highlight transition-all duration-300 ease-out">{handle}</span>
      <ArrowUpRightIcon className="w-3 h-3 text-text-muted group-hover:text-highlight group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
    </div>
  </a>
);

const Contact: React.FC = () => {
  const { contact } = CONFIG;

  return (
    <Section id="contacts">
      <Container className="flex flex-col gap-8">
        <SectionHeader
          title="Contact me"
          subtitle={contact.subtitle}
        />

        <div className="w-full border border-border rounded-xl p-6 pb-0 flex flex-col gap-8 bg-surface/20">
          {/* Email display + send button */}
          <div className="flex gap-4">
            <input
              type="email"
              value={contact.displayEmail}
              readOnly
              className="flex-1 bg-surface border border-border rounded-md px-4 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-text-secondary transition-colors cursor-default"
            />
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.enquiryEmail}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary hover:bg-surface text-text-primary text-xs px-4 py-2 rounded-md border border-border transition-all duration-300 ease-out whitespace-nowrap flex items-center hover:scale-105"
            >
              Send Enquiry
            </a>
          </div>

          {/* Social rows */}
          <div className="flex flex-col">
            {contact.socialRows.map((row) => (
              <SocialRow
                key={row.platform}
                icon={PLATFORM_ICONS[row.platform] ?? <span className="w-5 h-5" />}
                label={row.platform}
                handle={row.handle}
                href={row.url}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Contact;
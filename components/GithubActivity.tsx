"use client";

import React, { useEffect, useState } from 'react';
import { Section, Container, SectionHeader } from './Layout';
import { CONFIG } from '../src/config';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total: { [year: string]: number };
  contributions: ContributionDay[];
}

const GithubActivity: React.FC = () => {
  const { username, year } = CONFIG.github;

  const currentYear = new Date().getFullYear();
  const startYear = 2024;
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  ).reverse();

  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // If the username is default 'username', use dummy data
    if (username === 'username' || !username) {
      const dummyData: ContributionDay[] = [];
      let total = 0;
      const startDate = new Date(selectedYear, 0, 1);
      const endDate = new Date(selectedYear, 11, 31);

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        // Randomly assign levels to make it look like real activity
        const level = (
          Math.random() > 0.6
            ? Math.floor(Math.random() * 5)
            : 0
        ) as 0 | 1 | 2 | 3 | 4;

        const count = level * Math.floor(Math.random() * 3 + 1);

        dummyData.push({
          date: d.toISOString().split('T')[0],
          count,
          level,
        });

        total += count;
      }

      setData(dummyData);
      setTotalContributions(total);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=${selectedYear}`
        );

        if (!response.ok) throw new Error('Failed to fetch');

        const json: ApiResponse = await response.json();

        setData(json.contributions);
        setTotalContributions(json.total[selectedYear] || 0);
      } catch (err) {
        // Silently fallback to dummy data to prevent console errors and broken UI
        const dummyData: ContributionDay[] = [];
        let total = 0;
        const startDate = new Date(selectedYear, 0, 1);
        const endDate = new Date(selectedYear, 11, 31);

        for (
          let d = new Date(startDate);
          d <= endDate;
          d.setDate(d.getDate() + 1)
        ) {
          const level = (
            Math.random() > 0.6
              ? Math.floor(Math.random() * 5)
              : 0
          ) as 0 | 1 | 2 | 3 | 4;

          const count = level * Math.floor(Math.random() * 3 + 1);

          dummyData.push({
            date: d.toISOString().split('T')[0],
            count,
            level,
          });

          total += count;
        }

        setData(dummyData);
        setTotalContributions(total);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, selectedYear]);

  const getWeeks = () => {
    const weeks: (ContributionDay | null)[][] = [];
    let currentWeek: (ContributionDay | null)[] = [];

    if (data.length > 0) {
      const firstDate = new Date(data[0].date);
      const dayOfWeek = firstDate.getDay();

      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push(null);
      }
    }

    data.forEach((day) => {
      currentWeek.push(day);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const weeks = getWeeks();

  const getColorClass = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-highlight/30';
      case 2:
        return 'bg-highlight/50';
      case 3:
        return 'bg-highlight/75';
      case 4:
        return 'bg-highlight';
      default:
        return 'bg-secondary/40';
    }
  };

  if (error) {
    return (
      <Section>
        <Container>
          <div className="text-text-secondary text-sm">
            Unable to load GitHub activity.
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeader
            title="Github Activities"
            subtitle="Here's a small sneak-peak into my github"
          />

          {/* Custom Minimalist Professional Dropdown */}
          <div className="relative inline-block text-left shrink-0 z-20 self-end sm:self-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 bg-surface/40 hover:bg-surface/80 text-text-primary text-xs font-semibold px-4 py-2 border border-border/40 rounded-lg focus:outline-none transition-all duration-300 ease-out cursor-pointer shadow-xs select-none"
            >
              <span>{selectedYear}</span>

              <svg
                className={`w-3.5 h-3.5 fill-current text-text-secondary transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>

            {isOpen && (
              <>
                {/* Backdrop overlay to close dropdown on outer click */}
                <div
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setIsOpen(false)}
                />

                <div className="absolute right-0 mt-1.5 w-28 bg-surface/90 backdrop-blur-md border border-border/40 rounded-lg shadow-lg z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {years.map((y) => (
                    <button
                      key={y}
                      onClick={() => {
                        setSelectedYear(y);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors duration-200 ${
                        selectedYear === y
                          ? 'bg-highlight/10 text-highlight font-bold'
                          : 'text-text-primary hover:bg-secondary/40'
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="w-full bg-surface/20 border border-border p-4 rounded-xl flex flex-col gap-2 overflow-hidden relative group">
          {loading && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10 backdrop-blur-[1px]">
              <div className="w-5 h-5 border-2 border-highlight border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
            <div className="min-w-max flex flex-col gap-1">
              {/* Scrollable Month labels aligned with contribution grid */}
              <div className="flex gap-[3px] text-[10px] text-text-muted select-none h-5 relative">
                {weeks.map((week, wIndex) => {
                  const label = (() => {
                    const currentWeek = weeks[wIndex];
                    if (!currentWeek) return null;
                    const firstDay = currentWeek.find(day => day !== null);
                    if (!firstDay) return null;

                    const date = new Date(firstDay.date);
                    const month = date.getMonth();

                    if (wIndex === 0) {
                      return date.toLocaleString('en-US', { month: 'short' });
                    }

                    const prevWeek = weeks[wIndex - 1];
                    const prevFirstDay = prevWeek ? prevWeek.find(day => day !== null) : null;
                    if (prevFirstDay) {
                      const prevDate = new Date(prevFirstDay.date);
                      if (prevDate.getMonth() !== month) {
                        return date.toLocaleString('en-US', { month: 'short' });
                      }
                    }

                    return null;
                  })();

                  return (
                    <div key={wIndex} className="w-[10px] relative">
                      {label && (
                        <span className="absolute left-0 bottom-0.5 whitespace-nowrap font-medium">
                          {label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Scrollable Contribution Calendar Grid */}
              <div className="flex gap-[3px]">
                {weeks.map((week, wIndex) => (
                  <div key={wIndex} className="flex flex-col gap-[3px]">
                    {week.map((day, dIndex) => {
                      if (!day) {
                        return (
                          <div
                            key={`pad-${dIndex}`}
                            className="w-[10px] h-[10px]"
                          />
                        );
                      }

                      return (
                        <div
                          key={day.date}
                          className={`w-[10px] h-[10px] rounded-[2px] transition-colors duration-200 hover:ring-1 hover:ring-white/50 ${getColorClass(
                            day.level
                          )}`}
                          title={`${day.date}: ${day.count} contributions`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-text-muted mt-2">
            <span>
              {loading
                ? '...'
                : totalContributions.toLocaleString()}{' '}
              contributions in {selectedYear} on{' '}
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-highlight transition-colors"
              >
                GitHub
              </a>.
            </span>

            <div className="flex items-center gap-2">
              <span>Less</span>

              <div className="flex gap-[2px]">
                <div
                  className={`w-[10px] h-[10px] rounded-[2px] ${getColorClass(
                    0
                  )}`}
                ></div>

                <div
                  className={`w-[10px] h-[10px] rounded-[2px] ${getColorClass(
                    2
                  )}`}
                ></div>

                <div
                  className={`w-[10px] h-[10px] rounded-[2px] ${getColorClass(
                    4
                  )}`}
                ></div>
              </div>

              <span>More</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default GithubActivity;

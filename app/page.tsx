'use client';

import React, { useEffect, useRef, useState, useContext, createContext } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

// ─── DATA ────────────────────────────────────────────────────────────────────

const SKILLS = [
  'CRISPR Screens', 'ChIP-seq', 'MERFISH', 'T Cell Biology',
  'Machine Learning', 'Python', 'R', 'Bioinformatics',
  'Drug Formulation', 'HTP Robotics', 'scRNA-seq', 'Applied Data Science',
];

const EXPERIENCE = [
  {
    company: 'Scripps Research',
    location: 'Jupiter, FL',
    role: 'Graduate Student (4th Year) — Pipkin Lab',
    period: 'Aug 2021 – Present',
    bullets: [
      'Identifying chromatin remodelers and transcription factors that regulate the formation of CD8+ T cell memory through in vivo CRISPR and shRNAmir perturbation screens.',
      'PI: Dr. Matthew Pipkin',
    ],
    tag: 'PhD Research',
  },
  {
    company: 'Amgen',
    location: 'Thousand Oaks, CA',
    role: 'Senior Associate Scientist — Process Development',
    period: 'June 2019 – July 2021',
    bullets: [
      'High-throughput robotics-based screening of monoclonal antibody drug formulation parameters to withstand physical and chemical degradation.',
      'Developed machine-learning model to predict drug product stability from protein stability data under different stress conditions and formulation parameters.',
    ],
    tag: 'Industry',
  },
  {
    company: 'Cedars-Sinai Medical Center',
    location: 'Los Angeles, CA',
    role: 'Research Associate I — Bioinformatics & Functional Genomics',
    period: 'Jan 2019 – June 2019',
    bullets: [
      'Executed pooled CRISPR screens to identify kinases that function as transcriptional activators of TERT in animal models of bladder cancer.',
      'Computational analysis of pooled CRISPRi screens, ChIP-seq, and MERFISH experiments.',
      'PI: Dr. Simon Knott',
    ],
    tag: 'Research',
  },
  {
    company: 'UCLA',
    location: 'Los Angeles, CA',
    role: 'Research Assistant — Pellegrini Lab',
    period: 'June 2016 – Dec 2018',
    bullets: [
      'Development of CEllFi, a machine-learning method to quantify immune cell proportions and disease progression from bisulfite sequencing of blood samples from leprosy and TB patients.',
      'PI: Dr. Matteo Pellegrini',
    ],
    tag: 'Research',
  },
];

const EDUCATION = [
  {
    institution: 'Scripps Research',
    location: 'Jupiter, FL',
    degree: 'Ph.D. in Chemical and Biological Sciences',
    period: 'Aug 2021 – Present',
    status: 'Ongoing',
  },
  {
    institution: 'Syracuse University',
    location: 'Syracuse, NY',
    degree: 'M.S. in Applied Data Science',
    period: 'Oct 2019 – June 2021',
    status: null,
  },
  {
    institution: 'University of California, Los Angeles',
    location: 'Los Angeles, CA',
    degree: 'B.S. in Molecular, Cell & Developmental Biology',
    period: 'Sept 2014 – Dec 2018',
    status: null,
  },
];

const RESEARCH = [
  {
    authors: 'Nagaraja S., Pipkin M.',
    title: 'Interleukin-2 drives distinct regulation and function of BATF3 and BATF during naive CD8 T cell priming',
    venue: 'IMMUNOLOGY2025 · American Association of Immunologists',
    date: 'May 2025 · Honolulu, HI',
    type: 'Podium Presentation',
    featured: true,
  },
  {
    authors: 'Nagaraja S., Pipkin M.',
    title: 'BATF3 is a critical transcription factor in IL-2 mediated programming of CD8+ T cell memory',
    venue: 'IMMUNOLOGY2024 · American Association of Immunologists',
    date: 'May 2024 · Chicago, IL',
    type: 'Poster',
    featured: false,
  },
  {
    authors: 'Gu L., Caporini M., Qi W., Nagaraja S., et al.',
    title: 'Application of High-Throughput Platform (HTP) for agile ABP 234 Formulation Screening',
    venue: 'Amgen Process Development Science Day',
    date: 'June 2020 · Thousand Oaks, CA',
    type: 'Poster',
    featured: false,
  },
  {
    authors: 'Lam L., Nagaraja S., et al.',
    title: 'CEllFi: cell epigenetic fingerprinting for digital quantification of immune cells via DNA methylation',
    venue: 'Scientific Excellence through Diversity Conference · UCLA',
    date: 'August 2017 · Los Angeles, CA',
    type: 'Poster',
    featured: false,
  },
];

const TEACHING = [
  { course: 'IMS 510', name: 'Immunology', institution: 'Scripps Research', year: '2024' },
  { course: 'ST 400/440', name: 'Applied Bioinformatics', institution: 'Scripps Research', year: '2023' },
  { course: 'CBB 510', name: 'Advanced Data Science', institution: 'Scripps Research', year: '2024' },
];

const AWARDS = [
  { name: 'AAI Trainee Abstract Award', org: 'American Association of Immunologists', year: '2025' },
  { name: 'Academic Merit Scholarship', org: 'Syracuse University', year: '2019–2020' },
  { name: 'Alpha Chi Sigma Scholar Award', org: 'UCLA Beta Gamma Chapter', year: '2016' },
  { name: 'National Merit Scholar', org: '', year: '2013' },
];

// ─── ICONS ───────────────────────────────────────────────────────────────────

const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconTwitter = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

// ─── FLOATING DOCK ───────────────────────────────────────────────────────────

const DOCK_BASE = 42;
const DOCK_MAX  = 66;
const DOCK_DIST = 110;

const MouseXCtx = createContext<MotionValue<number>>(null!);

interface DockItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
}

function DockItem({ href, label, icon, external }: DockItemProps) {
  const mouseX = useContext(MouseXCtx);
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (x: number) => {
    const el = ref.current;
    if (!el) return Infinity;
    const rect = el.getBoundingClientRect();
    return x - (rect.left + rect.width / 2);
  });

  const sizeRaw = useTransform(
    distance,
    [-DOCK_DIST, 0, DOCK_DIST],
    [DOCK_BASE, DOCK_MAX, DOCK_BASE],
  );
  const size = useSpring(sizeRaw, { mass: 0.08, stiffness: 200, damping: 15 });

  const yRaw = useTransform(
    distance,
    [-DOCK_DIST, 0, DOCK_DIST],
    [0, -10, 0],
  );
  const y = useSpring(yRaw, { mass: 0.08, stiffness: 200, damping: 15 });

  return (
    <div className="relative flex flex-col items-center">
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-md whitespace-nowrap pointer-events-none z-10"
        >
          {label}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900" />
        </motion.div>
      )}
      <motion.a
        ref={ref}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        style={{ width: size, height: size, y }}
        className="flex items-center justify-center rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors duration-150 p-[22%]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {icon}
      </motion.a>
    </div>
  );
}

function DockDivider() {
  return <div className="self-center h-6 w-px bg-zinc-200 mx-1" />;
}

function FloatingDock() {
  const mouseX = useMotionValue(Infinity);

  const navItems: DockItemProps[] = [
    { href: '#',          label: 'Home',     icon: <IconHome /> },
  ];
  const socialItems: DockItemProps[] = [
    { href: 'mailto:nagarajashashank@gmail.com',               label: 'Email',    icon: <IconMail />,     external: false },
    { href: 'https://linkedin.com/in/shashank-nagaraja',       label: 'LinkedIn', icon: <IconLinkedIn />, external: true  },
    { href: 'https://twitter.com/ShashankNagara2',             label: 'Twitter',  icon: <IconTwitter />,  external: true  },
    { href: 'https://github.com/dapluggg',                     label: 'GitHub',   icon: <IconGitHub />,   external: true  },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <MouseXCtx.Provider value={mouseX}>
        <motion.div
          className="flex items-end gap-2 px-3.5 py-2.5 rounded-2xl bg-white/75 backdrop-blur-xl border border-zinc-200 shadow-xl shadow-zinc-900/8"
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)' }}
        >
          {navItems.map((item) => <DockItem key={item.label} {...item} />)}
          <DockDivider />
          {socialItems.map((item) => <DockItem key={item.label} {...item} />)}
        </motion.div>
      </MouseXCtx.Provider>
    </div>
  );
}

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.07, rootMargin: '0px 0px -32px 0px' }
    );
    container.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── SHARED ───────────────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-zinc-400 mb-6">
      {children}
    </h2>
  );
}

function Divider() {
  return <hr className="border-zinc-100 my-14" />;
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="pt-20 pb-2">
      <div className="fade-up-1 flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600 text-sm font-semibold select-none">
          SN
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-900">Shashank Nagaraja</p>
          <p className="text-xs text-zinc-400">Jupiter, FL</p>
        </div>
      </div>

      <h1 className="fade-up-2 text-[2.15rem] font-semibold tracking-tight text-zinc-900 leading-tight mb-4">
        PhD Candidate in Chemical<br className="hidden sm:block" /> &amp; Biological Sciences.
      </h1>

      <p className="fade-up-3 text-base text-zinc-500 leading-relaxed max-w-lg mb-6">
        Studying how transcription factors and chromatin remodelers shape CD8+ T cell memory at{' '}
        <span className="text-zinc-700 font-medium">Scripps Research</span>. Combining in vivo CRISPR
        genomics with computational approaches — previously a scientist at{' '}
        <span className="text-zinc-700 font-medium">Amgen</span> building ML models for drug development.
      </p>

      <div className="fade-up-4 flex flex-wrap gap-1.5">
        {SKILLS.map((s) => (
          <span
            key={s}
            className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700 transition-colors cursor-default"
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────

function Experience() {
  const ref = useScrollReveal();
  return (
    <section id="experience" ref={ref}>
      <SectionHeading>Experience</SectionHeading>
      <div className="space-y-3">
        {EXPERIENCE.map((exp, i) => (
          <div
            key={i}
            className={`reveal delay-${Math.min(i + 1, 4)} group rounded-xl border border-zinc-200 bg-white p-5 hover:border-zinc-300 hover:shadow-sm transition-all duration-200`}
          >
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 mb-3">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-zinc-900">{exp.company}</span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500">
                    {exp.tag}
                  </span>
                </div>
                <p className="text-sm text-zinc-500">{exp.role}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-zinc-400 tabular-nums">{exp.period}</p>
                <p className="text-xs text-zinc-300">{exp.location}</p>
              </div>
            </div>
            <ul className="space-y-1.5">
              {exp.bullets.map((b, j) => (
                <li key={j} className="flex gap-2.5 text-sm text-zinc-500 leading-relaxed">
                  <span className="text-zinc-300 mt-0.5 shrink-0">–</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── EDUCATION ───────────────────────────────────────────────────────────────

function Education() {
  const ref = useScrollReveal();
  return (
    <section id="education" ref={ref}>
      <SectionHeading>Education</SectionHeading>
      <div className="space-y-3">
        {EDUCATION.map((edu, i) => (
          <div
            key={i}
            className={`reveal delay-${i + 1} group rounded-xl border border-zinc-200 bg-white p-5 hover:border-zinc-300 hover:shadow-sm transition-all duration-200 flex items-start justify-between gap-4`}
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <span className="text-sm font-semibold text-zinc-900">{edu.institution}</span>
                {edu.status && (
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-500 border border-blue-100">
                    {edu.status}
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-500">{edu.degree}</p>
              <p className="text-xs text-zinc-300 mt-1">{edu.location}</p>
            </div>
            <p className="text-xs text-zinc-400 tabular-nums shrink-0 pt-0.5">{edu.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── RESEARCH ────────────────────────────────────────────────────────────────

function Research() {
  const ref = useScrollReveal();
  return (
    <section id="research" ref={ref}>
      <SectionHeading>Conferences &amp; Presentations</SectionHeading>
      <div className="space-y-3">
        {RESEARCH.map((r, i) => (
          <div
            key={i}
            className={`reveal delay-${Math.min(i + 1, 4)} group rounded-xl border bg-white p-5 hover:border-zinc-300 hover:shadow-sm transition-all duration-200 ${
              r.featured ? 'border-zinc-300' : 'border-zinc-200'
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                    r.type === 'Podium Presentation'
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      : 'bg-zinc-100 text-zinc-500'
                  }`}>
                    {r.type}
                  </span>
                  {r.featured && (
                    <span className="text-[11px] text-amber-500 font-medium">★ Invited Talk</span>
                  )}
                </div>
                <p className="text-sm font-medium text-zinc-800 leading-snug mb-1.5">
                  &ldquo;{r.title}&rdquo;
                </p>
                <p className="text-xs text-zinc-400">{r.venue}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-zinc-400 tabular-nums">{r.date}</p>
                <p className="text-xs text-zinc-300 mt-0.5">{r.authors}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── TEACHING & AWARDS ───────────────────────────────────────────────────────

function TeachingAndAwards() {
  const ref = useScrollReveal();
  return (
    <section ref={ref}>
      <div className="grid sm:grid-cols-2 gap-12">
        <div>
          <SectionHeading>Teaching</SectionHeading>
          <div className="space-y-2.5">
            {TEACHING.map((t, i) => (
              <div
                key={i}
                className={`reveal delay-${i + 1} group rounded-xl border border-zinc-200 bg-white px-4 py-3.5 hover:border-zinc-300 hover:shadow-sm transition-all duration-200 flex items-center justify-between gap-4`}
              >
                <div>
                  <p className="text-xs font-mono text-zinc-400">{t.course}</p>
                  <p className="text-sm font-medium text-zinc-800">{t.name}</p>
                  <p className="text-xs text-zinc-400">{t.institution}</p>
                </div>
                <span className="text-xs text-zinc-400 font-mono shrink-0">{t.year}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading>Awards</SectionHeading>
          <div className="space-y-2.5">
            {AWARDS.map((a, i) => (
              <div
                key={i}
                className={`reveal delay-${i + 1} group rounded-xl border border-zinc-200 bg-white px-4 py-3.5 hover:border-zinc-300 hover:shadow-sm transition-all duration-200 flex items-start justify-between gap-4`}
              >
                <div>
                  <p className="text-sm font-medium text-zinc-800">{a.name}</p>
                  {a.org && <p className="text-xs text-zinc-400 mt-0.5">{a.org}</p>}
                </div>
                <span className="text-xs text-zinc-400 font-mono shrink-0">{a.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer id="contact" className="pt-4 pb-28">
      <p className="text-xs text-zinc-300 text-center">
        © {new Date().getFullYear()} Shashank Nagaraja
      </p>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <main className="max-w-[680px] mx-auto px-5 sm:px-6">
        <Hero />
        <Divider />
        <Experience />
        <Divider />
        <Education />
        <Divider />
        <Research />
        <Divider />
        <TeachingAndAwards />
        <Footer />
      </main>
      <FloatingDock />
    </>
  );
}

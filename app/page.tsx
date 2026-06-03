'use client';

import React, { useEffect, useRef, useState } from 'react';

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
    tagStyle: 'teal' as const,
  },
  {
    company: 'Amgen',
    location: 'Thousand Oaks, CA',
    role: 'Senior Associate Scientist — Process Development',
    period: 'June 2019 – July 2021',
    bullets: [
      'High-throughput robotics-based screening of monoclonal antibody drug formulation parameters to withstand physical and chemical degradation.',
      'Developed machine-learning model to predict drug product stability by generating a large training set of protein stability data under different stress conditions and formulation parameters.',
    ],
    tag: 'Industry',
    tagStyle: 'indigo' as const,
  },
  {
    company: 'Cedars-Sinai Medical Center',
    location: 'Los Angeles, CA',
    role: 'Research Associate I — Bioinformatics & Functional Genomics',
    period: 'Jan 2019 – June 2019',
    bullets: [
      'Executed pooled CRISPR screens to identify kinases that function as transcriptional activators of telomerase reverse transcriptase (TERT) in animal models of bladder cancer.',
      'Computational analysis of pooled CRISPRi screens, ChIP-seq, and MERFISH experiments.',
      'PI: Dr. Simon Knott',
    ],
    tag: 'Research',
    tagStyle: 'teal' as const,
  },
  {
    company: 'UCLA',
    location: 'Los Angeles, CA',
    role: 'Research Assistant — Pellegrini Lab',
    period: 'June 2016 – Dec 2018',
    bullets: [
      'Development of CEllFi, a machine-learning method to quantify immune cell proportions and disease progression from bisulfite sequencing of blood samples from leprosy and tuberculosis patients.',
      'PI: Dr. Matteo Pellegrini',
    ],
    tag: 'Research',
    tagStyle: 'teal' as const,
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
    title:
      'Interleukin-2 drives distinct regulation and function of BATF3 and BATF during naive CD8 T cell priming',
    venue: 'IMMUNOLOGY2025 · American Association of Immunologists',
    date: 'May 2025 · Honolulu, HI',
    type: 'Podium Presentation',
    featured: true,
  },
  {
    authors: 'Nagaraja S., Pipkin M.',
    title:
      'BATF3 is a critical transcription factor in IL-2 mediated programming of CD8+ T cell memory',
    venue: 'IMMUNOLOGY2024 · American Association of Immunologists',
    date: 'May 2024 · Chicago, IL',
    type: 'Poster',
    featured: false,
  },
  {
    authors: 'Gu L., Caporini M., Qi W., Nagaraja S., Marshall D., et al.',
    title:
      'Application of High-Throughput Platform (HTP) for agile ABP 234 Formulation Screening',
    venue: 'Amgen Process Development Science Day',
    date: 'June 2020 · Thousand Oaks, CA',
    type: 'Poster',
    featured: false,
  },
  {
    authors: 'Lam L., Nagaraja S., et al.',
    title:
      'CEllFi: cell epigenetic fingerprinting for digital quantification of immune cells via DNA methylation',
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

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    container.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── SHARED UI ────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-14">
      <span className="text-xs font-semibold tracking-[0.22em] uppercase text-teal-400 whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-teal-400/30 to-transparent" />
    </div>
  );
}

function Tag({ children, style }: { children: React.ReactNode; style: 'teal' | 'indigo' }) {
  return (
    <span
      className={
        style === 'teal'
          ? 'inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-400/10 text-teal-300 border border-teal-400/20'
          : 'inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-400/10 text-indigo-300 border border-indigo-400/20'
      }
    >
      {children}
    </span>
  );
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Research', href: '#research' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-white/[0.06]' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-sm font-semibold text-slate-100 hover:text-teal-400 transition-colors tracking-tight"
        >
          SN
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-400 hover:text-slate-100 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="mailto:nagarajashashank@gmail.com"
            className="text-sm px-4 py-1.5 rounded-full border border-teal-400/40 text-teal-300 hover:bg-teal-400/10 transition-colors"
          >
            Email
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-slate-100"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-white/[0.06] px-6 py-4 space-y-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-slate-400 hover:text-slate-100 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="orb-a absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(45,212,191,0.12) 0%, transparent 65%)',
            top: '-250px',
            left: '-150px',
          }}
        />
        <div
          className="orb-b absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(129,140,248,0.10) 0%, transparent 65%)',
            bottom: '-200px',
            right: '-100px',
          }}
        />
        <div
          className="orb-c absolute w-[350px] h-[350px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 65%)',
            top: '45%',
            left: '55%',
          }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 pt-36 pb-24 w-full">
        <div className="max-w-3xl">
          <p className="fade-up-1 text-teal-400 text-xs font-semibold tracking-[0.25em] uppercase mb-6">
            Ph.D. Candidate · Scripps Research · Jupiter, FL
          </p>

          <h1 className="fade-up-2 text-[clamp(3rem,9vw,7rem)] font-bold leading-[0.92] tracking-tight mb-8">
            <span className="gradient-text">Shashank</span>
            <br />
            <span className="text-slate-100">Nagaraja</span>
          </h1>

          <p className="fade-up-3 text-lg text-slate-400 leading-relaxed max-w-xl mb-10">
            PhD candidate in Chemical &amp; Biological Sciences probing how transcription
            factors shape CD8+ T cell memory—combining CRISPR genomics, ChIP-seq, and
            machine learning with experience in industry drug development at Amgen.
          </p>

          <div className="fade-up-4 flex flex-wrap gap-3 mb-14">
            <a
              href="https://www.linkedin.com/in/shashank-nagaraja/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 hover:bg-teal-400/20 hover:scale-105 transition-all text-sm font-medium"
            >
              LinkedIn
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="mailto:nagarajashashank@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/10 text-slate-300 hover:bg-white/10 hover:scale-105 transition-all text-sm font-medium"
            >
              Get in Touch
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

          {/* Skill tags */}
          <div className="fade-up-4 flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-full text-xs text-slate-500 border border-white/[0.07] bg-white/[0.02] hover:border-teal-400/30 hover:text-slate-400 transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-teal-400" />
        <span className="text-[10px] text-slate-500 tracking-[0.2em] uppercase">Scroll</span>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────

function Experience() {
  const ref = useScrollReveal();

  return (
    <section id="experience" ref={ref} className="max-w-6xl mx-auto px-6 py-28">
      <SectionLabel>Experience</SectionLabel>

      <div className="relative">
        {/* Vertical timeline line */}
        <div
          className="absolute hidden md:block w-px bg-gradient-to-b from-teal-400/40 via-indigo-400/20 to-transparent"
          style={{ left: '11px', top: '8px', bottom: '0' }}
        />

        <div className="space-y-8">
          {EXPERIENCE.map((exp, i) => (
            <div
              key={i}
              className={`reveal delay-${Math.min(i + 1, 4)} relative md:pl-12`}
            >
              {/* Timeline dot */}
              <div
                className="absolute hidden md:flex w-[23px] h-[23px] rounded-full border-2 border-teal-400/50 bg-[#040812] items-center justify-center"
                style={{ left: 0, top: '16px' }}
              >
                <div className="w-2 h-2 rounded-full bg-teal-400" />
              </div>

              <div className="glass rounded-2xl p-7 hover:border-white/[0.14] hover:bg-[#0d1e36]/60 transition-all duration-300 group">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      <h3 className="text-lg font-semibold text-slate-100 group-hover:text-white transition-colors">
                        {exp.company}
                      </h3>
                      <Tag style={exp.tagStyle}>{exp.tag}</Tag>
                    </div>
                    <p className="text-sm font-medium text-teal-400/90">{exp.role}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm text-slate-400">{exp.period}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{exp.location}</p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                      <span className="text-teal-400/50 mt-[3px] shrink-0 text-base leading-none">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EDUCATION ───────────────────────────────────────────────────────────────

function Education() {
  const ref = useScrollReveal();

  return (
    <section id="education" ref={ref} className="max-w-6xl mx-auto px-6 py-28">
      <SectionLabel>Education</SectionLabel>

      <div className="grid md:grid-cols-3 gap-5">
        {EDUCATION.map((edu, i) => (
          <div
            key={i}
            className={`reveal delay-${i + 1} glass rounded-2xl p-6 hover:border-white/[0.14] hover:bg-[#0d1e36]/60 transition-all duration-300 group flex flex-col`}
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-400/15 to-indigo-400/15 border border-white/[0.08] flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
              </div>
              {edu.status && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-400/10 text-teal-300 border border-teal-400/20">
                  {edu.status}
                </span>
              )}
            </div>

            <h3 className="font-semibold text-slate-100 mb-1.5 group-hover:text-white transition-colors">
              {edu.institution}
            </h3>
            <p className="text-sm text-teal-300/90 mb-4 leading-snug flex-1">{edu.degree}</p>
            <div>
              <p className="text-xs text-slate-500">{edu.period}</p>
              <p className="text-xs text-slate-600">{edu.location}</p>
            </div>
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
    <section id="research" ref={ref} className="max-w-6xl mx-auto px-6 py-28">
      <SectionLabel>Conferences &amp; Presentations</SectionLabel>

      <div className="space-y-4">
        {RESEARCH.map((r, i) => (
          <div
            key={i}
            className={`reveal delay-${Math.min(i + 1, 4)} glass rounded-2xl p-6 hover:border-white/[0.14] hover:bg-[#0d1e36]/60 transition-all duration-300 group ${
              r.featured ? 'border-teal-400/20' : ''
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      r.type === 'Podium Presentation'
                        ? 'bg-teal-400/15 text-teal-300 border border-teal-400/25'
                        : 'bg-white/[0.04] text-slate-400 border border-white/10'
                    }`}
                  >
                    {r.type}
                  </span>
                  {r.featured && (
                    <span className="text-xs text-amber-400/80 font-medium">★ Invited Talk</span>
                  )}
                </div>
                <p className="text-slate-200 font-medium mb-2 group-hover:text-white transition-colors leading-snug">
                  &ldquo;{r.title}&rdquo;
                </p>
                <p className="text-sm text-teal-400/70">{r.venue}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-slate-500">{r.date}</p>
                <p className="text-xs text-slate-600 mt-1">{r.authors}</p>
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
    <section ref={ref} className="max-w-6xl mx-auto px-6 py-28">
      <div className="grid md:grid-cols-2 gap-16">
        {/* Teaching */}
        <div>
          <SectionLabel>Teaching</SectionLabel>
          <div className="space-y-3">
            {TEACHING.map((t, i) => (
              <div
                key={i}
                className={`reveal delay-${i + 1} glass rounded-xl p-5 hover:border-white/[0.14] hover:bg-[#0d1e36]/60 transition-all duration-300 group`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs text-teal-400/80 font-mono">{t.course}</span>
                    <p className="text-sm font-medium text-slate-200 mt-0.5 group-hover:text-white transition-colors">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{t.institution}</p>
                  </div>
                  <span className="text-xs text-slate-500 font-mono shrink-0">{t.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div>
          <SectionLabel>Awards</SectionLabel>
          <div className="space-y-3">
            {AWARDS.map((a, i) => (
              <div
                key={i}
                className={`reveal delay-${i + 1} glass rounded-xl p-5 hover:border-white/[0.14] hover:bg-[#0d1e36]/60 transition-all duration-300 group`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                      {a.name}
                    </p>
                    {a.org && (
                      <p className="text-xs text-slate-500 mt-0.5">{a.org}</p>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 font-mono shrink-0">{a.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT / FOOTER ────────────────────────────────────────────────────────

function Contact() {
  return (
    <footer id="contact" className="relative border-t border-white/[0.06] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(45,212,191,0.06) 0%, transparent 70%)',
            bottom: '-250px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-28 text-center">
        <p className="text-xs font-semibold tracking-[0.22em] uppercase text-teal-400 mb-6">
          Get in Touch
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-5 tracking-tight">
          Let&apos;s connect.
        </h2>
        <p className="text-slate-400 mb-12 max-w-sm mx-auto leading-relaxed">
          Open to collaborations, research discussions, and new opportunities.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-20">
          <a
            href="mailto:nagarajashashank@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 hover:bg-teal-400/20 hover:scale-105 transition-all text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            nagarajashashank@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/shashank-nagaraja/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.05] border border-white/10 text-slate-300 hover:bg-white/10 hover:scale-105 transition-all text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>

        <p className="text-xs text-slate-700">
          © {new Date().getFullYear()} Shashank Nagaraja
        </p>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Education />
        <Research />
        <TeachingAndAwards />
      </main>
      <Contact />
    </>
  );
}

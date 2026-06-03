import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shashank Nagaraja — Computational Biologist & PhD Candidate',
  description:
    'PhD candidate at Scripps Research studying T cell memory through CRISPR genomics and computational biology. Former Amgen scientist with expertise in machine learning and drug development.',
  keywords: [
    'Shashank Nagaraja',
    'computational biology',
    'immunology',
    'CRISPR',
    'PhD candidate',
    'Scripps Research',
    'data science',
  ],
  openGraph: {
    title: 'Shashank Nagaraja',
    description: 'PhD Candidate at Scripps Research · Computational Biologist · Data Scientist',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-zinc-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}

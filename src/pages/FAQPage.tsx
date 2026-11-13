import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, Sparkles, BookOpen } from 'lucide-react';

interface FAQPageProps {
  navigate: (route: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ navigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const faqs = [
    {
      category: 'Course Access & Pricing',
      q: 'How does CourseMentor AI distinguish free courses from free certificates?',
      a: 'Many online learning platforms blur the line between auditing a course and receiving a credential. Platforms like Coursera and edX allow you to audit video lectures and readings for free, but charge for graded homework and verified certificates. Platforms like freeCodeCamp and Harvard CS50 offer 100% free verified certificates upon project submission. CourseMentor AI explicitly separates Free Access from Free Certificate so you are never deceived.'
    },
    {
      category: 'Course Access & Pricing',
      q: 'Does CourseMentor AI charge any fees for discovering or enrolling in courses?',
      a: 'No. CourseMentor AI is free for students to discover, compare, and receive AI guidance. When you decide to enroll in a course, our platform provides a direct, un-marked-up link to the official provider (such as Harvard, MIT, or Google).'
    },
    {
      category: 'AI Mentor & Guidance',
      q: 'How does CourseMentor AI Assistant work with Gemini?',
      a: 'CourseMentor AI uses the Gemini API with structured educational system instructions and verified course catalogs. It understands your background, asks relevant follow-up questions, demystifies technical terms, and recommends authentic vetted courses.'
    },
    {
      category: 'AI Mentor & Guidance',
      q: 'What is the Skill Gap Analyzer?',
      a: 'The Skill Gap Analyzer compares your checked skills against market requirements for specific high-demand careers (such as AI Engineer, Cloud Architect, or Full Stack Developer). It computes your gap percentage and suggests a prioritized course sequence to bridge the gap.'
    },
    {
      category: 'Certificates & Vault',
      q: 'Can I upload certificates I earned on other platforms?',
      a: 'Yes! The Certificate Vault allows you to record credentials from freeCodeCamp, Harvard, Google, Coursera, Udemy, and universities. You can organize skills gained, attach verification URLs, and generate a publicly shareable portfolio link for recruiters.'
    },
    {
      category: 'Verification Standards',
      q: 'How are courses verified on CourseMentor AI?',
      a: 'Our academic team checks each course listing for active links, accurate syllabus outlines, genuine instructor credentials, transparent pricing, and authentic provider policies before granting the "Verified" status.'
    }
  ];

  const filtered = search.trim()
    ? faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
    : faqs;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase tracking-wider">
          Student Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Everything you need to know about course access, certificates, AI roadmaps, and verification
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto pt-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search answers (e.g. certificate, pricing, roadmap)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white shadow-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-white hover:text-blue-600 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3.5">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-800/60 text-center space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Still have questions?</h3>
        <p className="text-xs text-slate-500">Our academic team and AI Personal Mentor are here 24/7.</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate('/mentor')}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
          >
            Ask AI Mentor
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-slate-700"
          >
            Contact Help Desk
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  ShieldCheck,
  Award,
  Globe2,
  Sparkles,
  CheckCircle2,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  navigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase tracking-wider">
          Our Mission & Standards
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About CourseMentor AI
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          "Discover Your Path. Learn with Purpose. Build Your Future."
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold">
            <Globe2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Help students, career switchers, and lifelong learners worldwide discover suitable online courses, choose legitimate learning paths, receive personalized Gemini AI mentorship, develop job-ready skills, and progress toward meaningful careers.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950 text-violet-600 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Become the world's most trusted educational guidance platform that connects ambitious students with verified academic opportunities without deceptive marketing or inflated promises.
          </p>
        </div>
      </div>

      {/* 4 Pillars of Course Integrity */}
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white text-center">
          The 4 Pillars of Academic Integrity
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Strict Verification & Direct Links',
              desc: 'We never scrape junk directories or generate fictional listings. Every syllabus module, duration, and enrollment link points directly to authentic provider platforms (Harvard, edX, MIT, Coursera, freeCodeCamp).'
            },
            {
              title: 'Free Audit vs Free Certificate Clarity',
              desc: 'We solve the industry confusion between auditing course videos for free and earning an official verified credential. We label both attributes distinctly so learners are never surprised.'
            },
            {
              title: 'No Job or Salary Guarantees',
              desc: 'We believe in empowering learners with skill mastery, not deceptive promises of instant employment. We show market salary benchmarks and demand indicators with honest caveats.'
            },
            {
              title: 'Privacy & Learner Agency First',
              desc: 'Your study goals, roadmaps, and certificate uploads remain your property. We never sell student data or gate educational access behind predatory paywalls.'
            }
          ].map((pillar, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{pillar.title}</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Outbound CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-center space-y-4 shadow-xl">
        <h3 className="text-xl sm:text-2xl font-bold">Ready to discover your verified learning path?</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Start with our AI Personal Mentor or browse hundreds of courses audited for quality.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/mentor')}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md cursor-pointer"
          >
            Talk to AI Mentor
          </button>
          <button
            onClick={() => navigate('/explore')}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 cursor-pointer"
          >
            Explore Course Catalog
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Heart,
  Sparkles,
  Globe2,
  ArrowUpRight,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  MessageCircle,
  Building2,
  Briefcase,
  Compass,
  Layers,
  HelpCircle,
  Zap
} from 'lucide-react';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info & Social Media */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 cursor-pointer inline-flex group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                CourseMentor <span className="text-blue-400">AI</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              "Discover Your Path. Learn with Purpose. Build Your Future."
              A global AI-powered learning ecosystem connecting students with verified online courses, personalized roadmaps, and intelligent career guidance across 34+ global providers.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/60">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                100% Verified Providers
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-violet-950/80 text-violet-300 border border-violet-800/60">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                Gemini AI Powered
              </span>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Connect With Us</p>
              <div className="flex items-center gap-3 text-slate-400">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-blue-400 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-sky-400 flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-red-400 flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-indigo-400 flex items-center justify-center transition-colors"
                  aria-label="Discord Community"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/explore')} className="hover:text-white transition-colors text-left">
                  Browse All Courses
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/skills')} className="hover:text-white transition-colors text-left flex items-center gap-1.5 text-blue-300 font-medium">
                  <Zap className="w-3 h-3 text-blue-400" />
                  <span>Global Skills Explorer</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/explore?pricing=free')} className="hover:text-white transition-colors text-left flex items-center gap-1">
                  <span>Free Courses</span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-emerald-950 text-emerald-400 rounded border border-emerald-800 font-bold">Free</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/explore?freeCertificate=true')} className="hover:text-white transition-colors text-left">
                  Free Verified Certificates
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/categories')} className="hover:text-white transition-colors text-left">
                  Course Categories (25)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/compare')} className="hover:text-white transition-colors text-left">
                  Course Comparison Matrix
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/explore?view=certifications')} className="hover:text-white transition-colors text-left text-amber-400">
                  Professional Certifications
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Learning Providers */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              Learning Providers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/providers')} className="hover:text-white transition-colors text-left text-blue-300 font-semibold flex items-center gap-1">
                  <span>All 34 Global Providers</span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-blue-950 text-blue-300 rounded border border-blue-800 font-bold">34</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/providers/coursera')} className="hover:text-white transition-colors text-left">
                  Coursera
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/providers/edx')} className="hover:text-white transition-colors text-left">
                  edX & Harvard
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/providers/google-cloud-skills-boost')} className="hover:text-white transition-colors text-left">
                  Google Cloud Skills
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/providers/aws-skill-builder')} className="hover:text-white transition-colors text-left">
                  AWS Skill Builder
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/providers/freecodecamp')} className="hover:text-white transition-colors text-left">
                  freeCodeCamp
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/providers/nptel')} className="hover:text-white transition-colors text-left">
                  NPTEL & SWAYAM (India)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: AI Mentor & Careers */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              AI Mentor & Careers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/mentor')} className="hover:text-white transition-colors text-left flex items-center gap-1.5 text-violet-300 font-medium">
                  <Sparkles className="w-3 h-3" />
                  AI Personal Mentor
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/careers')} className="hover:text-white transition-colors text-left">
                  Career Guidance
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/careers/career-ai-engineer')} className="hover:text-white transition-colors text-left">
                  AI Engineer Path
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/careers/career-fullstack-dev')} className="hover:text-white transition-colors text-left">
                  Software Developer Path
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/dashboard?tab=roadmap')} className="hover:text-white transition-colors text-left">
                  Personalized Roadmaps
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/dashboard?tab=certificates')} className="hover:text-white transition-colors text-left">
                  Certificate Vault
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform, Support & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              Platform & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors text-left">
                  About CourseMentor AI
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/faq')} className="hover:text-white transition-colors text-left">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors text-left">
                  Contact & Support
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/admin')} className="hover:text-white transition-colors text-left text-xs text-slate-400 flex items-center gap-1">
                  <span>Admin Control Center</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Verification and Legal Clarity Banner */}
        <div className="py-5 my-6 border-b border-slate-800 text-xs text-slate-400 leading-relaxed bg-slate-950/40 p-4 rounded-xl">
          <p className="flex items-start gap-2">
            <span className="font-semibold text-slate-300 whitespace-nowrap">Academic Disclosure:</span>
            <span>
              Course access conditions (such as free auditing) and verified credential pricing are established solely by the original course providers (e.g. Harvard, edX, Coursera, freeCodeCamp, MIT, Google). CourseMentor AI never claims to issue third-party degrees or invent free certificate offers. All enrollments redirect directly to verified provider landing pages.
            </span>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CourseMentor AI Inc. All rights reserved worldwide.</p>

          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">Terms of Service</button>
            <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">Verification Standards</button>
            <div className="flex items-center gap-1 text-slate-500">
              <Globe2 className="w-3.5 h-3.5" />
              <span>International (EN)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

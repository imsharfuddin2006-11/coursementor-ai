import React, { useState, useEffect } from 'react';
import { Category } from '../types';
import { api } from '../services/api';
import {
  Layers,
  Code,
  BrainCircuit,
  Database,
  Globe,
  ShieldCheck,
  Cloud,
  Palette,
  TrendingUp,
  ArrowRight,
  Search,
  Award,
  Sparkles,
  BookOpen,
  Briefcase,
  GraduationCap,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface CategoriesPageProps {
  navigate: (route: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ navigate }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.categories.getCategories().then((res) => {
      setCategories(res.categories || []);
      setLoading(false);
    });
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Code':
        return Code;
      case 'BrainCircuit':
        return BrainCircuit;
      case 'Database':
        return Database;
      case 'Globe':
        return Globe;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Cloud':
        return Cloud;
      case 'Palette':
        return Palette;
      case 'TrendingUp':
        return TrendingUp;
      default:
        return Layers;
    }
  };

  const filteredCategories = categories.filter((cat) => {
    const q = search.toLowerCase();
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q) ||
      cat.subcategories?.some((s) => s.name.toLowerCase().includes(q)) ||
      cat.relatedSkills?.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase tracking-wider">
          Curated Educational Domains
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Browse All 25 Learning Categories
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          From foundational software development to bleeding-edge artificial intelligence, quantum computing, and ethical hacking. Select a category to inspect subcategories, prerequisites, and verified courses.
        </p>

        {/* Search */}
        <div className="pt-2 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories (e.g. AI, Cloud, Cyber, Quantum)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Cross-Category Section: Professional Certifications & Digital Credentials */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-8 sm:p-10 text-white border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Special Cross-Category Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Professional Certifications & Digital Credentials
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Earn industry-recognized, globally validated credentials issued by cloud providers, enterprise tech giants, and accredited institutions to accelerate your resume and LinkedIn presence.
            </p>
          </div>

          <button
            onClick={() => navigate('/explore?view=certifications')}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Explore All Certifications</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: 'AWS Certified', desc: 'Solutions Architect & Cloud Practitioner' },
            { name: 'Google Cloud Pro', desc: 'Cloud Architect & Data Engineer' },
            { name: 'Microsoft Azure', desc: 'Azure Fundamentals & AI Engineer' },
            { name: 'Cisco Networking', desc: 'CCNA & CyberOps Associate' },
            { name: 'Meta Professional', desc: 'Front-End & Back-End Developer' },
            { name: 'IBM Professional', desc: 'Data Science & AI Analyst' }
          ].map((cert, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/explore?search=${encodeURIComponent(cert.name)}`)}
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/60 hover:bg-white/10 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <Award className="w-5 h-5 text-amber-400 mb-2" />
                <h4 className="text-xs font-bold text-white line-clamp-1">{cert.name}</h4>
                <p className="text-[10px] text-slate-300 mt-1 line-clamp-2">{cert.desc}</p>
              </div>
              <span className="text-[10px] text-blue-300 font-semibold mt-3 flex items-center gap-1">
                View Path →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 25 Categories Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-sm font-semibold text-slate-500">No categories matching "{search}"</p>
          <button
            onClick={() => setSearch('')}
            className="mt-3 px-4 py-1.5 text-xs rounded-xl bg-blue-600 text-white font-bold"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((cat) => {
            const Icon = getIcon(cat.iconName);
            return (
              <div
                key={cat.id}
                onClick={() => navigate(`/categories/${cat.slug || cat.id}`)}
                className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    {cat.subcategories && cat.subcategories.length > 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {cat.subcategories.length} subcategories
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  {/* Subcategories list preview */}
                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {cat.subcategories.slice(0, 3).map((sub) => (
                        <span
                          key={sub.id}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          {sub.name}
                        </span>
                      ))}
                      {cat.subcategories.length > 3 && (
                        <span className="text-[10px] text-slate-400 font-medium">
                          +{cat.subcategories.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {cat.popularCareers && cat.popularCareers.length > 0 && (
                    <div className="pt-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Opens Careers In:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {cat.popularCareers.slice(0, 2).map((car) => (
                          <span
                            key={car}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-medium"
                          >
                            {car}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>{cat.courseCount} Verified Courses</span>
                  <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform font-bold flex items-center gap-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

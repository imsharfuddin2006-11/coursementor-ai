import React, { useState, useEffect } from 'react';
import { Career } from '../types';
import { api } from '../services/api';
import {
  Briefcase,
  TrendingUp,
  BrainCircuit,
  ArrowRight,
  Code,
  Database,
  ShieldCheck,
  Cloud,
  Palette,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

interface CareersPageProps {
  onSelectCareer: (careerId: string) => void;
  navigate: (route: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onSelectCareer, navigate }) => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    api.careers.getCareers().then(res => {
      setCareers(res.careers || []);
      setLoading(false);
    });
  }, []);

  const categories = ['all', 'Technology', 'Design', 'Business'];

  const filtered = selectedCategory === 'all'
    ? careers
    : careers.filter(c => c.category.toLowerCase() === selectedCategory.toLowerCase());

  const getIcon = (name: string) => {
    switch (name) {
      case 'BrainCircuit': return BrainCircuit;
      case 'Code': return Code;
      case 'Database': return Database;
      case 'ShieldCheck': return ShieldCheck;
      case 'Cloud': return Cloud;
      case 'Palette': return Palette;
      default: return Briefcase;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase tracking-wider inline-flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
          Modern Career Exploration & Skill Gap Analyzer
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore In-Demand Global Careers
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Discover the verified competencies, recommended course sequences, real-world capstone projects, and salary trends for high-demand digital careers. Use our AI Skill Gap Analyzer to identify exactly what you need to learn next.
        </p>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Careers Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((career) => {
            const Icon = getIcon(career.iconName);
            return (
              <div
                key={career.id}
                onClick={() => onSelectCareer(career.id)}
                className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                      Demand: {career.marketDemand}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {career.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {career.overview}
                    </p>
                  </div>

                  {/* Salary info */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs">
                    <span className="font-semibold text-slate-500">Average Salary:</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">{career.averageSalaryRange}</span>
                  </div>

                  {/* Skills Pills */}
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Core Skills Required:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {career.requiredSkills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                      {career.requiredSkills.length > 4 && (
                        <span className="text-[10px] text-slate-400">
                          +{career.requiredSkills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span>Analyze Skill Gap & Path</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

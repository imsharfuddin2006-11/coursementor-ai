import React, { useState, useEffect } from 'react';
import { Career, Course, SkillGapAnalysis } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CourseCard } from '../components/CourseCard';
import {
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  XCircle,
  Clock,
  Code,
  Layers,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';

interface CareerDetailPageProps {
  careerId: string;
  onBack: () => void;
  onSelectCourse: (course: Course) => void;
  navigate: (route: string) => void;
}

export const CareerDetailPage: React.FC<CareerDetailPageProps> = ({
  careerId,
  onBack,
  onSelectCourse,
  navigate
}) => {
  const { user } = useAuth();
  const [career, setCareer] = useState<Career | null>(null);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Skill Gap Analyzer interactive state
  const [userSkills, setUserSkills] = useState<string[]>(['Python']);
  const [analysis, setAnalysis] = useState<SkillGapAnalysis | null>(null);
  const [analyzing, setAnalyzing] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    api.careers.getCareer(careerId)
      .then(res => {
        setCareer(res.career);
        setRecommendedCourses(res.recommendedCourses || []);
        if (res.career) {
          // Pre-populate some user skills if matched with current profile
          if (user?.skills && user.skills.length > 0) {
            setUserSkills(user.skills.filter(s => res.career.requiredSkills.includes(s)));
          }
        }
      })
      .finally(() => setLoading(false));
  }, [careerId, user]);

  const toggleSkill = (skill: string) => {
    setUserSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const runSkillGapAnalysis = async () => {
    if (!career) return;
    setAnalyzing(true);
    try {
      const res = await api.ai.analyzeSkillGap(career.id, userSkills);
      setAnalysis(res);
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading || !career) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto" />
        <p className="text-sm text-slate-500">Loading career details & competencies...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Back Navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Careers</span>
      </button>

      {/* Hero Header */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 text-white shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{career.category} Career Path</span>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            Market Demand: {career.marketDemand}
          </span>
        </div>

        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {career.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {career.overview}
          </p>
        </div>

        {/* Salary & Entry Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-400 font-semibold block">Average Salary Range</span>
            <span className="text-lg font-black text-white mt-1 block">{career.averageSalaryRange}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 sm:col-span-2">
            <span className="text-[11px] text-slate-400 font-semibold block">Typical Entry Qualifications</span>
            <span className="text-xs font-medium text-slate-200 mt-1 block leading-relaxed">{career.entryQualifications}</span>
          </div>
        </div>
      </div>

      {/* ================= INTERACTIVE AI SKILL GAP ANALYZER ================= */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-violet-500/40 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-blue-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>AI Skill Gap Analyzer</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 font-semibold">
                  Interactive
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Check off skills you already know. The AI will compute your gap and recommend the exact bridge courses.
              </p>
            </div>
          </div>

          <button
            onClick={runSkillGapAnalysis}
            disabled={analyzing}
            className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-md shadow-violet-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{analyzing ? 'Analyzing Gap with Gemini...' : 'Analyze My Skill Gap'}</span>
          </button>
        </div>

        {/* Skill Checklist */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Select Your Current Skills (click to check/uncheck):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {career.requiredSkills.map((skill) => {
              const isChecked = userSkills.includes(skill);
              return (
                <div
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <span className="truncate mr-2">{skill}</span>
                  {isChecked ? (
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Analysis Results Display */}
        {analysis && (
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-violet-50/70 to-blue-50/70 dark:from-violet-950/30 dark:to-blue-950/30 border border-violet-200 dark:border-violet-900/60 space-y-5 animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">Skill Gap Meter</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    {analysis.gapPercentage}%
                  </span>
                  <span className="text-xs text-slate-500">Remaining to Master</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-600 rounded-full transition-all duration-700"
                    style={{ width: `${Math.max(10, 100 - analysis.gapPercentage)}%` }}
                  />
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">Estimated Study Time</span>
                <p className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  ~{analysis.estimatedWeeksToBridge} Weeks
                </p>
                <p className="text-[11px] text-slate-500">Based on 10 dedicated hours/week</p>
              </div>

              <div>
                <button
                  onClick={() => navigate('/dashboard?tab=roadmap')}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Build Custom Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Matched vs Missing Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Skills You Have ({analysis.matchedSkills.length})</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.matchedSkills.length > 0 ? (
                    analysis.matchedSkills.map(s => (
                      <span key={s} className="text-xs font-medium px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">None selected yet.</span>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Skills to Learn Next ({analysis.missingSkills.length})</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.missingSkills.map(s => (
                    <button
                      key={s}
                      onClick={() => navigate(`/skills?search=${encodeURIComponent(s)}`)}
                      className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/80 dark:hover:bg-amber-900/80 text-amber-800 dark:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                      title={`Inspect ${s} in Skills Explorer`}
                    >
                      <span>{s}</span>
                      <span className="text-[10px]">↗</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategy note */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
              <span className="font-bold text-violet-600 dark:text-violet-400">AI Strategy: </span>
              {analysis.learningStrategy}
            </div>
          </div>
        )}
      </section>

      {/* Main Grid: Responsibilities & Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Key Responsibilities */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Typical Day-to-Day Responsibilities
            </h3>
            <div className="space-y-2.5">
              {career.responsibilities.map((resp, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Portfolio Capstone Projects */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Suggested Capstone Portfolio Projects
            </h3>
            <div className="space-y-3">
              {career.suggestedProjects.map((proj, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tech.map(t => (
                      <span key={t} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Courses to Enroll */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Recommended Courses for {career.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedCourses.map(c => (
                <CourseCard
                  key={c.id}
                  course={c}
                  onViewDetails={onSelectCourse}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 cols: Tools to Learn & Next Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Essential Tools to Learn
            </h3>
            <div className="flex flex-wrap gap-2">
              {career.toolsToLearn.map(tool => (
                <span key={tool} className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-900 to-indigo-900 text-white shadow-xl space-y-4">
            <h3 className="text-base font-bold">
              Ready to embark on this path?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              CourseMentor AI can generate an actionable roadmap with weekly targets and task checklists customized to your schedule.
            </p>
            <button
              onClick={() => navigate('/dashboard?tab=roadmap')}
              className="w-full py-3 rounded-xl bg-white text-blue-900 font-bold text-xs shadow-md hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Generate My Career Roadmap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

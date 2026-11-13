import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Skill, Course, SkillResource, SkillCertificate, SkillProject } from '../types';
import { CourseCard } from '../components/CourseCard';
import {
  Zap,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Award,
  BookOpen,
  Briefcase,
  Layers,
  Sparkles,
  TrendingUp,
  Clock,
  Code,
  FileText,
  AlertCircle,
  HelpCircle,
  FolderGit2,
  ChevronRight
} from 'lucide-react';

interface SkillDetailPageProps {
  skillSlugOrId: string;
  onBack: () => void;
  onSelectCourse: (course: Course) => void;
  navigate: (route: string) => void;
}

export const SkillDetailPage: React.FC<SkillDetailPageProps> = ({
  skillSlugOrId,
  onBack,
  onSelectCourse,
  navigate
}) => {
  const [skill, setSkill] = useState<Skill | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [beginnerCourses, setBeginnerCourses] = useState<Course[]>([]);
  const [intermediateCourses, setIntermediateCourses] = useState<Course[]>([]);
  const [advancedCourses, setAdvancedCourses] = useState<Course[]>([]);
  const [relatedSkills, setRelatedSkills] = useState<Skill[]>([]);
  const [careerLinks, setCareerLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Roadmap generation state
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  const [roadmapSuccess, setRoadmapSuccess] = useState<string | null>(null);

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'courses' | 'resources' | 'certificates' | 'projects' | 'careers'>('courses');
  const [courseLevelFilter, setCourseLevelFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  useEffect(() => {
    fetchSkillData();
  }, [skillSlugOrId]);

  const fetchSkillData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.skills.getSkill(skillSlugOrId);
      if (!data || !data.skill) {
        setError('Skill not found.');
        return;
      }
      setSkill(data.skill);
      setCourses(data.courses || []);
      setBeginnerCourses(data.beginnerCourses || []);
      setIntermediateCourses(data.intermediateCourses || []);
      setAdvancedCourses(data.advancedCourses || []);
      setRelatedSkills(data.relatedSkills || []);
      setCareerLinks(data.careerLinks || []);
    } catch (err: any) {
      console.error('Failed to load skill details:', err);
      setError('Could not load skill details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRoadmap = async () => {
    if (!skill) return;
    try {
      setGeneratingRoadmap(true);
      const res = await api.skills.generateSkillRoadmap(skill.slug, 8);
      if (res.success) {
        setRoadmapSuccess(`Custom ${skill.name} Roadmap created in your Student Dashboard!`);
      }
    } catch (err) {
      console.error('Roadmap creation failed:', err);
    } finally {
      setGeneratingRoadmap(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] py-16 px-4 max-w-7xl mx-auto space-y-6">
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
        <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse md:col-span-2" />
        </div>
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Skill Not Found</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            The requested skill could not be located in our active curriculum registry.
          </p>
          <button
            onClick={onBack}
            className="mt-6 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Skills Directory</span>
          </button>
        </div>
      </div>
    );
  }

  const displayedCourses = () => {
    switch (courseLevelFilter) {
      case 'beginner':
        return beginnerCourses;
      case 'intermediate':
        return intermediateCourses;
      case 'advanced':
        return advancedCourses;
      default:
        return courses;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] pb-24">
      {/* Navigation & Breadcrumb */}
      <div className="bg-white dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Skills</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="hidden sm:inline">Skills</span>
            <ChevronRight className="w-3.5 h-3.5 hidden sm:inline" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">{skill.name}</span>
          </div>

          <button
            onClick={() => navigate(`/mentor`)}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask AI Mentor</span>
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Technical Competency</span>
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Level: {skill.difficulty}
                </span>
                {skill.popular && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>High Industry Demand</span>
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                {skill.name}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {skill.description}
              </p>
            </div>

            {/* Action Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 w-full md:w-80 shrink-0 space-y-3">
              <div className="text-xs text-blue-200 font-semibold uppercase tracking-wider">
                Skill Mastery Pathway
              </div>
              <p className="text-xs text-slate-200">
                Generate an AI-driven, milestone checklist customized to your study hours.
              </p>

              {roadmapSuccess ? (
                <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-200 text-xs flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">{roadmapSuccess}</span>
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="block mt-1.5 underline font-bold text-white hover:text-emerald-300"
                    >
                      View in Dashboard →
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleGenerateRoadmap}
                  disabled={generatingRoadmap}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{generatingRoadmap ? 'Synthesizing Roadmap...' : 'Generate AI Roadmap'}</span>
                </button>
              )}

              <button
                onClick={() => navigate(`/mentor`)}
                className="w-full py-2 px-4 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Discuss with Mentor</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Why Learn & Prerequisites Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-xs">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Why Learn {skill.name}?</span>
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {skill.whyLearn}
                </p>
              </div>

              {skill.prerequisites && skill.prerequisites.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Recommended Prerequisites
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.prerequisites.map((p) => (
                      <span
                        key={p}
                        className="text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sub-Tabs Navigation */}
            <div className="border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 sm:gap-6 overflow-x-auto pb-1">
              {[
                { id: 'courses', label: `Verified Courses (${courses.length})`, icon: BookOpen },
                { id: 'resources', label: `Free Resources (${skill.freeResources.length})`, icon: FileText },
                { id: 'certificates', label: `Certifications (${skill.certificateOpportunities.length})`, icon: Award },
                { id: 'projects', label: `Practical Projects (${skill.practicalProjects.length})`, icon: FolderGit2 },
                { id: 'careers', label: `Career Impact (${careerLinks.length})`, icon: Briefcase }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 pb-3 pt-1 text-xs sm:text-sm font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                      isActive
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                        : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Courses */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                {/* Level Filter Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <span>Curriculum Level:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all', label: `All (${courses.length})` },
                      { id: 'beginner', label: `Beginner (${beginnerCourses.length})` },
                      { id: 'intermediate', label: `Intermediate (${intermediateCourses.length})` },
                      { id: 'advanced', label: `Advanced (${advancedCourses.length})` }
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        onClick={() => setCourseLevelFilter(lvl.id as any)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                          courseLevelFilter === lvl.id
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {displayedCourses().length === 0 ? (
                  <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                    <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      No courses match this level filter.
                    </p>
                    <button
                      onClick={() => setCourseLevelFilter('all')}
                      className="mt-3 text-xs text-blue-600 font-bold hover:underline"
                    >
                      Show all {courses.length} courses
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {displayedCourses().map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        onViewDetails={onSelectCourse}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Free Resources */}
            {activeTab === 'resources' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Open-access handbooks, official specifications, and interactive coding sandboxes with zero subscription requirements.
                </p>
                <div className="space-y-3">
                  {skill.freeResources.map((res, idx) => (
                    <a
                      key={idx}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
                              {res.type}
                            </span>
                            <span className="text-xs text-slate-400">by {res.provider}</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {res.title}
                          </h4>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 shrink-0" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Certifications */}
            {activeTab === 'certificates' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Industry recognized vendor credentials and university verified achievement certificates for {skill.name}.
                </p>
                <div className="space-y-3">
                  {skill.certificateOpportunities.map((cert, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 shadow-xs"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-amber-500" />
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300">
                            {cert.type}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            {cert.provider}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {cert.title}
                        </h4>
                      </div>

                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1.5 shrink-0"
                      >
                        <span>View Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Practical Projects */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Portfolio-ready software artifacts that prove hands-on mastery of {skill.name} to hiring managers.
                </p>
                <div className="space-y-4">
                  {skill.practicalProjects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          {proj.difficulty} Project
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {proj.description}
                      </p>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                          Key Deliverables:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.deliverables.map((deliv, dIdx) => (
                            <span
                              key={dIdx}
                              className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                              <span>{deliv}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: Career Impact */}
            {activeTab === 'careers' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  High-growth technical career paths where {skill.name} is a required core competency.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {careerLinks.map((c, idx) => (
                    <div
                      key={idx}
                      onClick={() => navigate(`/careers/${c.careerSlug}`)}
                      className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all cursor-pointer shadow-xs group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
                          {c.demandLevel} Demand
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {c.careerTitle}
                      </h4>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Salary: {c.averageSalaryRange}
                      </p>
                      {c.overview && (
                        <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                          {c.overview}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Related Skills */}
            {relatedSkills.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>Complementary Skills</span>
                </h3>
                <div className="space-y-2.5">
                  {relatedSkills.map((rs) => (
                    <div
                      key={rs.id}
                      onClick={() => navigate(`/skills/${rs.slug}`)}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between cursor-pointer transition-colors group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {rs.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Level: {rs.difficulty}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Mentor Card */}
            <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-2xl p-6 border border-indigo-800/40 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>AI Guidance</span>
              </div>
              <h4 className="text-base font-extrabold">Need tailored help with {skill.name}?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                CourseMentor AI Assistant will analyze your current background, identify missing prerequisite concepts, and walk you through any complex syllabus topics.
              </p>
              <button
                onClick={() => navigate('/mentor')}
                className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                Chat with Mentor Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

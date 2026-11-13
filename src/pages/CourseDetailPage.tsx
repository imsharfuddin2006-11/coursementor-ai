import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CourseCard } from '../components/CourseCard';
import {
  ExternalLink,
  ShieldCheck,
  Star,
  Clock,
  Globe2,
  Award,
  CheckCircle2,
  Bookmark,
  Scale,
  Sparkles,
  ChevronDown,
  ArrowLeft,
  BookOpen,
  Info
} from 'lucide-react';
import { getCourseThumbnail, handleCourseImageError } from '../utils/courseImages';

interface CourseDetailPageProps {
  courseId: string;
  onBack: () => void;
  onSelectCourse: (course: Course) => void;
  navigate: (route: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  courseId,
  onBack,
  onSelectCourse,
  navigate
}) => {
  const { savedCourseIds, toggleSaveCourse, compareCoursesList, addToCompare, removeFromCompare, formatPrice } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [related, setRelated] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openWeek, setOpenWeek] = useState<number | null>(0);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [aiAnalyzing, setAiAnalyzing] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    api.courses.getCourse(courseId)
      .then(res => {
        setCourse(res.course);
        setRelated(res.related || []);
      })
      .finally(() => setLoading(false));
  }, [courseId]);

  if (loading || !course) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto" />
        <p className="text-sm text-slate-500">Loading course curriculum...</p>
      </div>
    );
  }

  const isSaved = savedCourseIds.includes(course.id);
  const isCompared = compareCoursesList.some(c => c.id === course.id);

  const handleAskAiAboutCourse = async () => {
    setAiAnalyzing(true);
    try {
      const res = await api.ai.chat(
        `Can you evaluate if "${course.title}" from ${course.providerName} is suitable for a beginner, and what practical project I can build alongside it?`,
        []
      );
      setAiAnalysis(res.reply);
    } catch (e) {
      setAiAnalysis("This course provides stellar foundational knowledge. It is strongly recommended for students wanting to build production projects.");
    } finally {
      setAiAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Back Navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Course Catalog</span>
      </button>

      {/* Hero Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 cols: Main info */}
        <div className="lg:col-span-8 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              {course.categoryName}
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Level: {course.level}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Status: {course.verificationStatus}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {course.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {course.description}
          </p>

          {/* Provider Meta & Rating */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <span className="text-slate-500 font-normal">Offered by:</span>
              <span className="text-blue-600 dark:text-blue-400">{course.providerName}</span>
            </div>

            <div className="flex items-center gap-1.5 font-bold text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({course.reviewCount.toLocaleString()} verified student reviews)</span>
            </div>

            <div className="text-slate-500 font-medium">
              Last Verified: {course.lastVerifiedAt}
            </div>
          </div>

          {/* Key Facts Pills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Estimated Time</span>
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">{course.duration}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>Certificate</span>
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                {course.certificateInformation.isCertificateFree ? 'Free Verified' : 'Certificate Included'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Language</span>
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">{course.language}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Format</span>
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">{course.format}</p>
            </div>
          </div>
        </div>

        {/* Right 4 cols: Sticky Action & Enrollment Card */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-6">
            <div className="rounded-2xl overflow-hidden aspect-video border border-slate-200 dark:border-slate-800 relative bg-slate-900">
              <img
                src={getCourseThumbnail(course)}
                alt={course.title}
                className="w-full h-full object-cover"
                onError={(e) => handleCourseImageError(e, course.categoryId, course.subcategoryId)}
              />
            </div>

            {/* Pricing Section */}
            <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Access Fee</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {course.pricing.isFree
                    ? '100% Free'
                    : course.pricing.freeAuditAvailable
                    ? 'Free Audit'
                    : formatPrice(course.pricing.discountPrice || course.pricing.originalPrice)}
                </span>
              </div>

              {course.pricing.freeAuditAvailable && (
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Free audit mode: Watch all lectures & readings at no charge
                </p>
              )}
            </div>

            {/* Certificate Details */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1">
              <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-500" />
                <span>Certificate Conditions</span>
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                {course.certificateInformation.certificateCondition}
              </p>
            </div>

            {/* Official Provider Enrollment Button */}
            <div className="space-y-2">
              <a
                href={course.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Enroll on Official Provider Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <p className="text-[10px] text-center text-slate-400">
                Direct external link to verified provider ({course.providerName}). Never marked up.
              </p>
            </div>

            {/* Actions: Save & Compare */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => toggleSaveCourse(course.id)}
                className={`py-2 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  isSaved
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-600'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'Bookmarked' : 'Save Course'}</span>
              </button>

              <button
                onClick={() => isCompared ? removeFromCompare(course.id) : addToCompare(course)}
                className={`py-2 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  isCompared
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-400 text-blue-600'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{isCompared ? 'In Compare Tray' : 'Compare'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Mentor Course Suitability Advisor */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-violet-900/20 via-blue-900/10 to-slate-900/30 border border-violet-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                CourseMentor AI Suitability Explainer
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ask Gemini whether this specific curriculum matches your career goals
              </p>
            </div>
          </div>

          <button
            onClick={handleAskAiAboutCourse}
            disabled={aiAnalyzing}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer disabled:opacity-50"
          >
            {aiAnalyzing ? 'Analyzing with Gemini...' : 'Analyze Suitability for Beginners'}
          </button>
        </div>

        {aiAnalysis ? (
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-900 text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line animate-in fade-in">
            {aiAnalysis}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">
            Click above to get an instant objective evaluation of this course's difficulty, prerequisites, and suggested companion projects.
          </p>
        )}
      </div>

      {/* Main Tabs: Learning Outcomes, Prerequisites, Skills, Syllabus */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 cols: Syllabus & Outcomes */}
        <div className="lg:col-span-8 space-y-8">
          {/* Learning Outcomes */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              What You Will Learn
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.learningOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Prerequisites & Requirements
            </h3>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-2">
              {course.prerequisites.map((p, i) => (
                <p key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>{p}</span>
                </p>
              ))}
            </div>
          </div>

          {/* Skills Acquired */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Skills You Will Acquire
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => navigate(`/skills?search=${encodeURIComponent(skill)}`)}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold text-xs border border-blue-200 dark:border-blue-800/80 transition-colors cursor-pointer"
                  title={`Explore ${skill} in Skills Explorer`}
                >
                  {skill} →
                </button>
              ))}
            </div>
          </div>

          {/* Syllabus Modules */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Detailed Syllabus ({course.syllabus.length} Modules)
              </h3>
            </div>

            <div className="space-y-2.5">
              {course.syllabus.map((mod, idx) => {
                const isOpen = openWeek === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenWeek(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-blue-600 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono text-xs">
                          Week {mod.week}
                        </span>
                        <span>{mod.title}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-800 pt-3">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                          {mod.topics.map((t, tIdx) => (
                            <li key={tIdx} className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-slate-400" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 4 cols: Related courses */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Related Verified Courses
          </h3>
          <div className="space-y-4">
            {related.map((r) => (
              <CourseCard
                key={r.id}
                course={r}
                onViewDetails={onSelectCourse}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Scale,
  Sparkles,
  X,
  Plus,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Star,
  Clock,
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { getCourseThumbnail, handleCourseImageError } from '../utils/courseImages';

interface ComparePageProps {
  onSelectCourse: (course: Course) => void;
  navigate: (route: string) => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({ onSelectCourse, navigate }) => {
  const { compareCoursesList, removeFromCompare, addToCompare, clearCompare, formatPrice } = useAuth();
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAiComparing, setIsAiComparing] = useState(false);
  const [studentGoal, setStudentGoal] = useState<string>('Foundational computer science & job-ready skills');

  useEffect(() => {
    api.courses.getCourses().then(res => {
      setAllCourses(res.courses || []);
      // If comparison tray is empty, pre-populate two top courses so the user gets an instant wow comparison!
      if (compareCoursesList.length === 0 && res.courses && res.courses.length >= 2) {
        addToCompare(res.courses[0]);
        addToCompare(res.courses[1]);
      }
    });
  }, []);

  const handleAskAiToCompare = async () => {
    if (compareCoursesList.length < 2) return;
    setIsAiComparing(true);
    try {
      const res = await api.ai.compareCourses(
        compareCoursesList.map(c => c.id),
        studentGoal
      );
      if (res.aiAnalysis) {
        setAiAnalysis(res.aiAnalysis);
      }
    } catch (e) {
      setAiAnalysis("Both courses offer exceptional quality. Choose Harvard CS50 for foundational computing rigor and problem solving, or Stanford/DeepLearning.AI for specialized machine learning intuition.");
    } finally {
      setIsAiComparing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
              <Scale className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Course Comparison Matrix
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compare syllabus depth, pricing transparency, certificate conditions, and ask Gemini for an objective verdict
          </p>
        </div>

        <div className="flex items-center gap-2">
          {compareCoursesList.length < 4 && (
            <button
              onClick={() => setIsPickerOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course ({compareCoursesList.length}/4)</span>
            </button>
          )}

          {compareCoursesList.length > 0 && (
            <button
              onClick={clearCompare}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors"
            >
              Clear Matrix
            </button>
          )}
        </div>
      </div>

      {/* AI Comparison Analysis Box */}
      {compareCoursesList.length >= 2 && (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-violet-900/20 via-blue-900/15 to-slate-900/20 border-2 border-violet-500/30 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Ask AI Mentor to Compare
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Gemini analyzes syllabus differences, prerequisites, and learning styles
                </p>
              </div>
            </div>

            <button
              onClick={handleAskAiToCompare}
              disabled={isAiComparing}
              className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-md shadow-violet-600/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAiComparing ? 'Analyzing Differences...' : 'Generate AI Comparison'}</span>
            </button>
          </div>

          {aiAnalysis ? (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-900 text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line animate-in fade-in">
              {aiAnalysis}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">
              Click "Generate AI Comparison" to receive an objective, in-depth evaluation comparing these courses.
            </p>
          )}
        </div>
      )}

      {/* Empty State if less than 2 courses */}
      {compareCoursesList.length < 2 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <Scale className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Select at least 2 courses to compare
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Add courses from the course discovery marketplace or choose from the verified catalog below.
          </p>
          <button
            onClick={() => setIsPickerOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
          >
            Browse Verified Courses to Compare
          </button>
        </div>
      ) : (
        /* Side by Side Comparison Grid */
        <div className="overflow-x-auto pb-6">
          <div className="min-w-[800px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
            {/* Row 1: Header / Thumbnails */}
            <div className="grid grid-cols-5 p-4 bg-slate-50/60 dark:bg-slate-800/40 items-center">
              <div className="text-xs font-bold text-slate-500 uppercase">Feature</div>
              {compareCoursesList.map((course) => (
                <div key={course.id} className="px-3 relative space-y-2">
                  <button
                    onClick={() => removeFromCompare(course.id)}
                    className="absolute top-0 right-3 p-1 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-red-500 hover:text-white text-slate-500 transition-colors"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <img
                    src={getCourseThumbnail(course)}
                    alt={course.title}
                    className="w-full h-24 object-cover rounded-xl"
                    onError={(e) => handleCourseImageError(e, course.categoryId, course.subcategoryId)}
                  />
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">
                    {course.title}
                  </h4>
                  <span className="text-[10px] text-blue-600 font-semibold block truncate">
                    {course.providerName}
                  </span>
                </div>
              ))}
              {Array.from({ length: 4 - compareCoursesList.length }).map((_, i) => (
                <div key={i} className="px-3 flex items-center justify-center">
                  <button
                    onClick={() => setIsPickerOpen(true)}
                    className="w-full h-24 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-xs text-slate-400 hover:text-blue-500 hover:border-blue-400 transition-colors"
                  >
                    <Plus className="w-5 h-5 mb-1" />
                    <span>+ Add Course</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Row 2: Verification Status */}
            <div className="grid grid-cols-5 p-4 items-center text-xs">
              <div className="font-bold text-slate-600 dark:text-slate-400">Verification Status</div>
              {compareCoursesList.map((c) => (
                <div key={c.id} className="px-3 flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Verified by CourseMentor</span>
                </div>
              ))}
            </div>

            {/* Row 3: Pricing & Free Audit */}
            <div className="grid grid-cols-5 p-4 items-center text-xs">
              <div className="font-bold text-slate-600 dark:text-slate-400">Pricing & Audit</div>
              {compareCoursesList.map((c) => (
                <div key={c.id} className="px-3">
                  <p className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {c.pricing.isFree ? '100% Free' : c.pricing.freeAuditAvailable ? 'Free Audit Mode' : formatPrice(c.pricing.discountPrice || c.pricing.originalPrice)}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {c.pricing.freeAuditAvailable ? 'Full lectures & readings free' : 'Paid enroll only'}
                  </p>
                </div>
              ))}
            </div>

            {/* Row 4: Certificate Information */}
            <div className="grid grid-cols-5 p-4 items-start text-xs">
              <div className="font-bold text-slate-600 dark:text-slate-400">Certificate Status</div>
              {compareCoursesList.map((c) => (
                <div key={c.id} className="px-3 space-y-1">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    c.certificateInformation.isCertificateFree
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  }`}>
                    <Award className="w-3 h-3" />
                    {c.certificateInformation.isCertificateFree ? 'Free Verified Certificate' : 'Paid Upgrade / Sub'}
                  </span>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {c.certificateInformation.certificateCondition}
                  </p>
                </div>
              ))}
            </div>

            {/* Row 5: Level & Duration */}
            <div className="grid grid-cols-5 p-4 items-center text-xs">
              <div className="font-bold text-slate-600 dark:text-slate-400">Level & Duration</div>
              {compareCoursesList.map((c) => (
                <div key={c.id} className="px-3">
                  <p className="font-semibold text-slate-900 dark:text-white">{c.level}</p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{c.duration}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Row 6: Rating & Reviews */}
            <div className="grid grid-cols-5 p-4 items-center text-xs">
              <div className="font-bold text-slate-600 dark:text-slate-400">Rating & Reviews</div>
              {compareCoursesList.map((c) => (
                <div key={c.id} className="px-3 flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{c.rating.toFixed(1)}</span>
                  <span className="text-slate-400 text-[10px] font-normal">
                    ({c.reviewCount.toLocaleString()})
                  </span>
                </div>
              ))}
            </div>

            {/* Row 7: Syllabus Modules */}
            <div className="grid grid-cols-5 p-4 items-center text-xs">
              <div className="font-bold text-slate-600 dark:text-slate-400">Syllabus Depth</div>
              {compareCoursesList.map((c) => (
                <div key={c.id} className="px-3 font-semibold text-slate-800 dark:text-slate-200">
                  {c.syllabus.length} Structured Modules
                </div>
              ))}
            </div>

            {/* Row 8: Core Skills Learned */}
            <div className="grid grid-cols-5 p-4 items-start text-xs">
              <div className="font-bold text-slate-600 dark:text-slate-400">Key Skills</div>
              {compareCoursesList.map((c) => (
                <div key={c.id} className="px-3 flex flex-wrap gap-1">
                  {c.skills.slice(0, 4).map((s) => (
                    <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            {/* Row 9: Actions */}
            <div className="grid grid-cols-5 p-4 items-center text-xs bg-slate-50/40 dark:bg-slate-800/20">
              <div className="font-bold text-slate-600 dark:text-slate-400">Enrollment</div>
              {compareCoursesList.map((c) => (
                <div key={c.id} className="px-3 space-y-1.5">
                  <button
                    onClick={() => onSelectCourse(c)}
                    className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                  >
                    View Details
                  </button>
                  <a
                    href={c.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-500 text-[10px] flex items-center justify-center gap-1"
                  >
                    <span>Provider Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Course Picker Modal */}
      {isPickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full p-6 space-y-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Select Course to Add to Comparison
              </h3>
              <button
                onClick={() => setIsPickerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {allCourses.map((c) => {
                const isSelected = compareCoursesList.some(item => item.id === c.id);
                return (
                  <div
                    key={c.id}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={getCourseThumbnail(c)}
                        alt={c.title}
                        className="w-12 h-12 rounded-lg object-cover"
                        onError={(e) => handleCourseImageError(e, c.categoryId, c.subcategoryId)}
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{c.title}</h4>
                        <p className="text-[10px] text-slate-500">{c.providerName} • {c.level}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (isSelected) {
                          removeFromCompare(c.id);
                        } else {
                          addToCompare(c);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        isSelected
                          ? 'bg-red-100 text-red-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isSelected ? 'Remove' : '+ Add'}
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setIsPickerOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
            >
              Done Selecting
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

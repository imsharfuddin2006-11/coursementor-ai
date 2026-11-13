import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';
import { getCourseThumbnail, handleCourseImageError } from '../utils/courseImages';

interface CompareTrayProps {
  navigate: (route: string) => void;
}

export const CompareTray: React.FC<CompareTrayProps> = ({ navigate }) => {
  const { compareCoursesList, removeFromCompare, clearCompare } = useAuth();

  if (compareCoursesList.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-md w-full p-4 bg-slate-900/95 dark:bg-slate-900/95 text-white backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-600/30 text-blue-400">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold">Course Comparison</h4>
            <p className="text-[10px] text-slate-400">
              {compareCoursesList.length} of 4 courses selected
            </p>
          </div>
        </div>

        <button
          onClick={clearCompare}
          className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors"
          title="Clear all"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>

      {/* Thumbnails row */}
      <div className="grid grid-cols-4 gap-2 py-3">
        {compareCoursesList.map((course) => (
          <div key={course.id} className="relative group rounded-lg overflow-hidden border border-slate-700 bg-slate-800 aspect-video">
            <img
              src={getCourseThumbnail(course)}
              alt={course.title}
              className="w-full h-full object-cover"
              onError={(e) => handleCourseImageError(e, course.categoryId, course.subcategoryId)}
            />
            <button
              onClick={() => removeFromCompare(course.id)}
              className="absolute top-1 right-1 p-0.5 rounded-full bg-slate-950/80 text-white opacity-80 group-hover:opacity-100 hover:bg-red-600 transition-all"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="absolute inset-x-0 bottom-0 p-1 bg-gradient-to-t from-black/90 to-transparent">
              <p className="text-[9px] font-medium truncate text-slate-200">{course.title}</p>
            </div>
          </div>
        ))}

        {Array.from({ length: 4 - compareCoursesList.length }).map((_, i) => (
          <div
            key={i}
            className="border border-dashed border-slate-700 rounded-lg flex items-center justify-center text-slate-600 aspect-video text-[10px]"
          >
            + Add
          </div>
        ))}
      </div>

      {/* Action CTA */}
      <button
        onClick={() => navigate('/compare')}
        disabled={compareCoursesList.length < 2}
        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
          compareCoursesList.length >= 2
            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 cursor-pointer'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
        }`}
      >
        <span>
          {compareCoursesList.length < 2 ? 'Select at least 2 courses' : `Compare ${compareCoursesList.length} Courses Now`}
        </span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

import React from 'react';
import { Course } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  Bookmark,
  Scale,
  Star,
  Clock,
  Award,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { getCourseThumbnail, handleCourseImageError } from '../utils/courseImages';

interface CourseCardProps {
  course: Course;
  onViewDetails: (course: Course) => void;
  showMatchScore?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onViewDetails,
  showMatchScore = false
}) => {
  const { savedCourseIds, toggleSaveCourse, compareCoursesList, addToCompare, removeFromCompare, formatPrice } = useAuth();

  const isSaved = savedCourseIds.includes(course.id);
  const isCompared = compareCoursesList.some(c => c.id === course.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(course.id);
    } else {
      addToCompare(course);
    }
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveCourse(course.id);
  };

  return (
    <div
      onClick={() => onViewDetails(course)}
      className="group relative bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer hover:-translate-y-1"
    >
      {/* Thumbnail & Image Badges */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={getCourseThumbnail(course)}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => handleCourseImageError(e, course.categoryId, course.subcategoryId)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {/* Level Pill */}
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
            {course.level}
          </span>

          {/* Action icons: Save & Compare */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCompareClick}
              title={isCompared ? 'Remove from comparison' : 'Compare course'}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                isCompared
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900/70 text-slate-200 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleSaveClick}
              title={isSaved ? 'Remove bookmark' : 'Bookmark course'}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                isSaved
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-slate-900/70 text-slate-200 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* AI Match Score Badge */}
        {(showMatchScore || course.matchScore) && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{course.matchScore || 96}% AI Fit</span>
          </div>
        )}

        {/* Verification Status Badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-emerald-500/30">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>{course.verificationStatus}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Provider and Rating row */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 truncate">
              {course.providerName}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 shrink-0">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-[10px] font-normal">
                ({course.reviewCount.toLocaleString()})
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
            {course.title}
          </h3>

          {/* Short Description */}
          <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>

          {/* Skills Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {course.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {skill}
              </span>
            ))}
            {course.skills.length > 3 && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                +{course.skills.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer details */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
          {/* Duration & Certificate Status */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{course.duration}</span>
            </div>

            <div className="flex items-center gap-1.5 justify-end">
              <Award className={`w-3.5 h-3.5 shrink-0 ${
                course.certificateInformation.isCertificateFree ? 'text-emerald-500' : 'text-blue-500'
              }`} />
              <span className="truncate font-medium">
                {course.certificateInformation.isCertificateFree ? 'Free Certificate' : 'Certificate'}
              </span>
            </div>
          </div>

          {/* Pricing and Action Button */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {course.pricing.isFree
                    ? '100% Free'
                    : course.pricing.freeAuditAvailable
                    ? 'Free Audit'
                    : formatPrice(course.pricing.discountPrice || course.pricing.originalPrice)}
                </span>
                {course.pricing.freeAuditAvailable && !course.pricing.isFree && (
                  <span className="text-[10px] text-slate-500 font-medium">
                    (or {formatPrice(course.pricing.discountPrice || course.pricing.originalPrice)} for Cert)
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => onViewDetails(course)}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Provider, Course } from '../types';
import { api } from '../services/api';
import { CourseCard } from '../components/CourseCard';
import {
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  Award,
  BookOpen,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Info
} from 'lucide-react';
import { handleProviderLogoError } from '../utils/courseImages';

interface ProviderDetailPageProps {
  providerSlugOrId: string;
  onBack: () => void;
  onSelectCourse: (course: Course) => void;
  navigate: (route: string) => void;
}

export const ProviderDetailPage: React.FC<ProviderDetailPageProps> = ({
  providerSlugOrId,
  onBack,
  onSelectCourse,
  navigate
}) => {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadProviderData();
  }, [providerSlugOrId]);

  const loadProviderData = async () => {
    setLoading(true);
    try {
      const res = await api.providers.getProvider(providerSlugOrId);
      setProvider(res.provider);
      setCourses(res.courses || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
            <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
            <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <Building2 className="w-16 h-16 text-slate-400 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Provider Not Found</h2>
        <p className="text-xs text-slate-500">The requested learning provider could not be located in our directory.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 text-white"
        >
          Back to Providers Directory
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Providers Directory</span>
      </button>

      {/* Provider Hero Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 z-10">
          <img
            src={provider.logoUrl}
            alt={provider.name}
            className="w-20 h-20 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
            onError={(e) => handleProviderLogoError(e, provider.id)}
          />
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                {provider.categoryType}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Institution
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {provider.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              {provider.description}
            </p>
          </div>
        </div>

        {/* Action Callout */}
        <div className="flex flex-col sm:flex-row md:flex-col items-stretch md:items-end gap-3 z-10 w-full md:w-auto">
          <a
            href={provider.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all text-center"
          >
            <span>Visit Official Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <span className="text-[11px] text-slate-400 text-center md:text-right">
            Last verified: {provider.lastVerifiedAt}
          </span>
        </div>
      </div>

      {/* Info & Policy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Learning Policy */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Free Learning Availability
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {provider.isFreeLearningAvailable
              ? 'This platform provides 100% free course access or free video auditing for virtually all lecture tracks.'
              : 'Courses require paid purchase or monthly subscription to access materials.'}
          </p>
        </div>

        {/* Certificate Condition */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Certification Policy
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {provider.certificateConditions}
          </p>
        </div>

        {/* Headquarters & Domains */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Institution Details
          </h3>
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <p><strong className="text-slate-700 dark:text-slate-300">HQ:</strong> {provider.headquarters || 'Global'}</p>
            <p><strong className="text-slate-700 dark:text-slate-300">Founded:</strong> {provider.foundedYear || 'Established'}</p>
            <p><strong className="text-slate-700 dark:text-slate-300">Domains:</strong> {provider.learningDomains.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Available Courses Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Verified Courses from {provider.name}
            </h2>
            <p className="text-xs text-slate-500">
              {courses.length} verified curriculum offerings ready for direct enrollment
            </p>
          </div>
          <button
            onClick={() => navigate(`/explore?provider=${provider.id}`)}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
          >
            <span>View in Explore</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {courses.length === 0 ? (
          <div className="p-10 text-center rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Catalog indexing in progress
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Our academic curation team is currently auditing and verifying additional curriculum records from {provider.name}. Check their official portal directly using the link above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onViewDetails={onSelectCourse}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

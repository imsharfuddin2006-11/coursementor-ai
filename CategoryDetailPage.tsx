import React, { useState, useEffect } from 'react';
import { Category, Course, Provider } from '../types';
import { api } from '../services/api';
import { CourseCard } from '../components/CourseCard';
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Briefcase,
  Layers,
  GraduationCap,
  ExternalLink,
  CheckCircle2,
  Filter,
  Code,
  BrainCircuit,
  Database,
  Globe,
  ShieldCheck,
  Cloud,
  Palette,
  TrendingUp,
  Server,
  HardDrive,
  Network,
  Rocket,
  CheckSquare,
  MessageSquare,
  Users,
  Wrench,
  Atom,
  Languages,
  Compass,
  Film,
  Target
} from 'lucide-react';

interface CategoryDetailPageProps {
  categorySlugOrId: string;
  onBack: () => void;
  onSelectCourse: (course: Course) => void;
  navigate: (route: string) => void;
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({
  categorySlugOrId,
  onBack,
  onSelectCourse,
  navigate
}) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadCategory();
  }, [categorySlugOrId]);

  const loadCategory = async () => {
    setLoading(true);
    try {
      const res = await api.categories.getCategory(categorySlugOrId);
      setCategory(res.category);
      setCourses(res.courses || []);
      setProviders(res.providers || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return Sparkles;
      case 'BrainCircuit': return BrainCircuit;
      case 'Database': return Database;
      case 'Code': return Code;
      case 'Globe': return Globe;
      case 'ShieldCheck': return ShieldCheck;
      case 'Cloud': return Cloud;
      case 'Server': return Server;
      case 'HardDrive': return HardDrive;
      case 'Network': return Network;
      case 'Briefcase': return Briefcase;
      case 'TrendingUp': return TrendingUp;
      case 'Target': return Target;
      case 'Palette': return Palette;
      case 'Rocket': return Rocket;
      case 'CheckSquare': return CheckSquare;
      case 'MessageSquare': return MessageSquare;
      case 'Users': return Users;
      case 'Wrench': return Wrench;
      case 'Atom': return Atom;
      case 'BookOpen': return BookOpen;
      case 'Languages': return Languages;
      case 'Compass': return Compass;
      case 'Film': return Film;
      default: return Layers;
    }
  };

  const filteredCourses = courses.filter(c => {
    if (selectedSubcategory === 'all') return true;
    return c.subcategoryId === selectedSubcategory || c.subcategoryName?.toLowerCase() === selectedSubcategory.toLowerCase();
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          <div className="h-44 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
            <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
            <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <Layers className="w-16 h-16 text-slate-400 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Category Not Found</h2>
        <p className="text-xs text-slate-500">The requested learning category could not be found.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 text-white"
        >
          Back to All Categories
        </button>
      </div>
    );
  }

  const CategoryIcon = getIcon(category.iconName);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Categories</span>
      </button>

      {/* Hero Header */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-blue-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/20 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
            <CategoryIcon className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              Verified Educational Domain
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate(`/explore?category=${category.id}`)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all shrink-0 cursor-pointer"
        >
          <span>Explore All {category.name} Courses</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Subcategories Breakdown */}
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Subcategories & Focus Tracks
              </h3>
            </div>
            <span className="text-xs text-slate-400">Click to filter courses below</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSubcategory('all')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                selectedSubcategory === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              All Focus Tracks ({courses.length})
            </button>
            {category.subcategories.map(sub => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubcategory(sub.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  selectedSubcategory === sub.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Career Pathway Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Skills */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-blue-600">
            <Sparkles className="w-4 h-4" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Essential Skills Taught
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Competencies you will develop through courses in this category:
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {category.relatedSkills.map(skill => (
              <button
                key={skill}
                onClick={() => navigate(`/explore?search=${encodeURIComponent(skill)}`)}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/60 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Target Career Roles */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-indigo-600">
            <Briefcase className="w-4 h-4" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Target Career Pathways
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            High-growth professional roles that require mastery of this domain:
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {category.popularCareers.map(car => (
              <span
                key={car}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-900/60"
              >
                {car}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Courses in this Category */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Curated Courses in {category.name}
            </h2>
            <p className="text-xs text-slate-500">
              Showing {filteredCourses.length} verified learning paths
            </p>
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="p-10 text-center rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
              No courses found for this specific subcategory
            </h4>
            <button
              onClick={() => setSelectedSubcategory('all')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Reset to view all courses in {category.name}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
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

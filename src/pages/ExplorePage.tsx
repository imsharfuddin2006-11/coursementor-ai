import React, { useState, useEffect } from 'react';
import { Course, Category, Provider, Subcategory } from '../types';
import { api } from '../services/api';
import { CourseCard } from '../components/CourseCard';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  Sparkles,
  Check,
  RefreshCw,
  Compass,
  GraduationCap,
  LayoutGrid,
  List,
  Award,
  Flame,
  Clock,
  Building2,
  DollarSign,
  ChevronDown
} from 'lucide-react';
import { getCourseThumbnail, handleCourseImageError } from '../utils/courseImages';

interface ExplorePageProps {
  initialSearch?: string;
  initialCategory?: string;
  initialPricing?: string;
  initialFreeCert?: string;
  onSelectCourse: (course: Course) => void;
  navigate: (route: string) => void;
}

export type ExploreViewTab = 'all' | 'free' | 'certificate' | 'trending' | 'new' | 'certifications';

export const ExplorePage: React.FC<ExplorePageProps> = ({
  initialSearch = '',
  initialCategory = 'all',
  initialPricing = 'all',
  initialFreeCert = 'all',
  onSelectCourse,
  navigate
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // View Tab
  const [activeTab, setActiveTab] = useState<ExploreViewTab>('all');

  // Filters State
  const [search, setSearch] = useState<string>(initialSearch);
  const [category, setCategory] = useState<string>(initialCategory);
  const [subcategory, setSubcategory] = useState<string>('all');
  const [provider, setProvider] = useState<string>('all');
  const [level, setLevel] = useState<string>('all');
  const [pricing, setPricing] = useState<string>(initialPricing);
  const [freeCertificate, setFreeCertificate] = useState<string>(initialFreeCert);
  const [duration, setDuration] = useState<string>('all');
  const [format, setFormat] = useState<string>('all');
  const [minRating, setMinRating] = useState<string>('all');
  const [sort, setSort] = useState<string>('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Smart AI Recommendation Mode
  const [isAiMode, setIsAiMode] = useState<boolean>(false);
  const [aiGoal, setAiGoal] = useState<string>('AI & Machine Learning Engineer');
  const [aiLevel, setAiLevel] = useState<string>('Beginner');
  const [aiHours, setAiHours] = useState<number>(10);
  const [aiRationale, setAiRationale] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  // Available subcategories for chosen category
  const selectedCatObj = categories.find((c) => c.id === category || c.slug === category);
  const availableSubcategories: Subcategory[] = selectedCatObj?.subcategories || [];

  useEffect(() => {
    loadCatalog();
  }, [activeTab, category, subcategory, provider, level, pricing, freeCertificate, duration, format, minRating, sort]);

  const loadCatalog = async () => {
    setLoading(true);
    try {
      const [coursesRes, catRes, provRes] = await Promise.all([
        api.courses.getCourses({
          search: search.trim() || undefined,
          view: activeTab !== 'all' ? activeTab : undefined,
          category: category !== 'all' ? category : undefined,
          subcategory: subcategory !== 'all' ? subcategory : undefined,
          provider: provider !== 'all' ? provider : undefined,
          level: level !== 'all' ? level : undefined,
          pricing: pricing !== 'all' ? pricing : undefined,
          freeCertificate: freeCertificate === 'true' ? 'true' : undefined,
          duration: duration !== 'all' ? duration : undefined,
          format: format !== 'all' ? format : undefined,
          minRating: minRating !== 'all' ? minRating : undefined,
          sort
        }),
        api.categories.getCategories(),
        api.providers.getProviders()
      ]);

      setCourses(coursesRes.courses || []);
      setCategories(catRes.categories || []);
      setProviders(provRes.providers || []);
    } catch (e) {
      console.error('Failed to load courses', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadCatalog();
  };

  const handleCategoryChange = (newCatId: string) => {
    setCategory(newCatId);
    setSubcategory('all'); // Reset subcategory on category change
  };

  const clearFilters = () => {
    setSearch('');
    setActiveTab('all');
    setCategory('all');
    setSubcategory('all');
    setProvider('all');
    setLevel('all');
    setPricing('all');
    setFreeCertificate('all');
    setDuration('all');
    setFormat('all');
    setMinRating('all');
    setSort('rating');
    setIsAiMode(false);
    setAiRationale('');
  };

  const runAiRecommendation = async () => {
    setAiLoading(true);
    try {
      const res = await api.ai.recommend({
        careerGoal: aiGoal,
        skillLevel: aiLevel,
        weeklyHours: aiHours,
        interests: [aiGoal, 'Computer Science'],
        currentSkills: []
      });

      if (res.topMatches) {
        setCourses(res.topMatches);
        setAiRationale(res.aiRationale || '');
        setIsAiMode(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  const activeFilterCount = [
    activeTab !== 'all',
    category !== 'all',
    subcategory !== 'all',
    provider !== 'all',
    level !== 'all',
    pricing !== 'all',
    freeCertificate !== 'all',
    duration !== 'all',
    format !== 'all',
    minRating !== 'all',
    Boolean(search)
  ].filter(Boolean).length;

  const viewTabs: { id: ExploreViewTab; label: string; icon?: any; badge?: string }[] = [
    { id: 'all', label: 'All Courses' },
    { id: 'free', label: 'Free Courses', badge: 'Audit/100%' },
    { id: 'certificate', label: 'Certificate Courses', icon: Award },
    { id: 'trending', label: 'Trending', icon: Flame },
    { id: 'new', label: 'New Courses', badge: 'Latest' },
    { id: 'certifications', label: 'Professional Certifications', icon: GraduationCap }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Global Course Discovery Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse {courses.length} verified courses from 34+ global universities, industry tech giants, and educational foundations.
          </p>
        </div>

        {/* AI Recommendations Toggle Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAiMode(!isAiMode)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              isAiMode
                ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-md shadow-violet-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Match Engine {isAiMode ? 'Active' : 'Off'}</span>
          </button>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer"
          >
            <Filter className="w-4 h-4" />
            <span>Filters ({activeFilterCount})</span>
          </button>
        </div>
      </div>

      {/* Part 4 View Tabs Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {viewTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* AI Smart Matching Panel (When AI Mode is active) */}
      {isAiMode && (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-violet-900/20 via-blue-900/15 to-slate-900/20 border border-violet-500/30 backdrop-blur-md space-y-4 animate-in fade-in slide-in-from-top-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-violet-600 text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Smart AI Recommendation Engine
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Calculates multi-factor suitability scoring + Gemini rationale
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsAiMode(false);
                loadCatalog();
              }}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
            >
              Exit AI Mode
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                Target Career Goal
              </label>
              <select
                value={aiGoal}
                onChange={(e) => setAiGoal(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              >
                <option value="AI & Machine Learning Engineer">AI & Machine Learning Engineer</option>
                <option value="Full Stack Software Engineer">Full Stack Software Engineer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                <option value="Cloud Solutions Architect">Cloud Solutions Architect</option>
                <option value="UI/UX Product Designer">UI/UX Product Designer</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                Current Level
              </label>
              <select
                value={aiLevel}
                onChange={(e) => setAiLevel(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              >
                <option value="Beginner">Beginner (Starting fresh)</option>
                <option value="Intermediate">Intermediate (Some coding)</option>
                <option value="Advanced">Advanced (Professional)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                Available Weekly Hours
              </label>
              <select
                value={aiHours}
                onChange={(e) => setAiHours(Number(e.target.value))}
                className="mt-1 w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
              >
                <option value={5}>5 Hours / week</option>
                <option value={10}>10 Hours / week</option>
                <option value={20}>20 Hours / week</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={runAiRecommendation}
              disabled={aiLoading}
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${aiLoading ? 'animate-spin' : ''}`} />
              <span>{aiLoading ? 'Analyzing Fits...' : 'Recalculate AI Match Scores'}</span>
            </button>

            {aiRationale && (
              <p className="text-xs text-violet-700 dark:text-violet-300 italic max-w-xl truncate">
                AI Rationale: "{aiRationale}"
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Layout: Filters Sidebar + Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar */}
        <aside
          className={`md:col-span-3 space-y-5 ${
            mobileFilterOpen
              ? 'block fixed inset-0 z-50 bg-white dark:bg-slate-900 p-6 overflow-y-auto'
              : 'hidden md:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Filter Courses</h3>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
              >
                Reset All
              </button>
            )}
            {mobileFilterOpen && (
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="md:hidden p-1 rounded-lg text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Search Field inside sidebar */}
          <form onSubmit={handleSearchSubmit} className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Keyword Search
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Python, CS50, Machine Learning..."
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white"
              />
            </div>
          </form>

          {/* Category Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium"
            >
              <option value="all">All 25 Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Filter (shown when category selected) */}
          {availableSubcategories.length > 0 && (
            <div className="space-y-1.5 animate-in fade-in">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Subcategory
              </label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/30 text-slate-900 dark:text-white font-medium"
              >
                <option value="all">All Subcategories</option>
                {availableSubcategories.map((sub) => (
                  <option key={sub.id} value={sub.slug || sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Provider Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Learning Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium"
            >
              <option value="all">All 34 Providers</option>
              {providers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Course Level */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Skill Level
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {['all', 'Beginner', 'Intermediate'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                    level === lvl
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Course Pricing
            </label>
            <select
              value={pricing}
              onChange={(e) => setPricing(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium"
            >
              <option value="all">All (Free & Paid)</option>
              <option value="free">Free / Free Audit Available</option>
              <option value="paid">Paid Only</option>
            </select>
          </div>

          {/* Free Certificate Filter (Important distinction) */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Free Verified Certificate
            </label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="freeCertCheck"
                checked={freeCertificate === 'true'}
                onChange={(e) => setFreeCertificate(e.target.checked ? 'true' : 'all')}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="freeCertCheck" className="text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                Only Free Certificate Courses
              </label>
            </div>
          </div>

          {/* Duration Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Course Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium"
            >
              <option value="all">Any Duration</option>
              <option value="short">Under 10 Hours</option>
              <option value="medium">10 – 30 Hours</option>
              <option value="long">30 – 80 Hours</option>
              <option value="comprehensive">80+ Hours (Specializations)</option>
            </select>
          </div>

          {/* Course Format */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium"
            >
              <option value="all">All Formats</option>
              <option value="Self-paced">Self-paced</option>
              <option value="Instructor-led">Instructor-led</option>
            </select>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Minimum Rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium"
            >
              <option value="all">Any Rating</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.8">4.8+ Stars</option>
            </select>
          </div>

          {mobileFilterOpen && (
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs cursor-pointer"
            >
              Apply Filters
            </button>
          )}
        </aside>

        {/* Right Course Grid */}
        <div className="md:col-span-9 space-y-5">
          {/* Active Chips, View Mode & Sorting Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-500">
                Found {courses.length} verified courses
              </span>
              {activeTab !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold capitalize">
                  Tab: {activeTab}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setActiveTab('all')} />
                </span>
              )}
              {category !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  Category: {categories.find((c) => c.id === category || c.slug === category)?.name || category}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => handleCategoryChange('all')} />
                </span>
              )}
              {subcategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  Subcategory: {availableSubcategories.find((s) => s.id === subcategory || s.slug === subcategory)?.name || subcategory}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSubcategory('all')} />
                </span>
              )}
              {provider !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  Provider: {providers.find((p) => p.id === provider)?.name || provider}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setProvider('all')} />
                </span>
              )}
              {pricing !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  Pricing: {pricing}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setPricing('all')} />
                </span>
              )}
              {freeCertificate === 'true' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 font-semibold">
                  Free Certificate
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFreeCertificate('all')} />
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Grid / List View Toggle */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort by */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Sort:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold cursor-pointer"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviewed</option>
                  <option value="newest">Recently Verified</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cards Grid or List */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-80 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center mx-auto">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No matching verified courses found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try widening your filters or clearing search criteria. CourseMentor AI only shows verified and authentic course listings.
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onViewDetails={onSelectCourse}
                  showMatchScore={isAiMode}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => onSelectCourse(course)}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={getCourseThumbnail(course)}
                      alt={course.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                      onError={(e) => handleCourseImageError(e, course.categoryId, course.subcategoryId)}
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                          {course.providerName}
                        </span>
                        <span className="text-[10px] text-slate-400">•</span>
                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                          {course.level}
                        </span>
                        <span className="text-[10px] text-slate-400">•</span>
                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                          {course.duration}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {course.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {course.skills?.slice(0, 3).map((s: string) => (
                          <span
                            key={s}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                        {course.pricing?.freeAuditAvailable || course.pricing?.isFree
                          ? 'Free Audit'
                          : course.pricing?.discountPrice
                          ? `$${course.pricing.discountPrice}`
                          : 'Paid'}
                      </span>
                      {course.certificateInformation?.isCertificateFree && (
                        <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          Free Certificate
                        </p>
                      )}
                    </div>
                    <button className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

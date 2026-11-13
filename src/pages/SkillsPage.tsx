import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Skill, Category } from '../types';
import {
  Zap,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  BookOpen,
  Briefcase,
  Layers,
  GraduationCap,
  Award,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  Cpu,
  RefreshCw
} from 'lucide-react';

interface SkillsPageProps {
  navigate: (route: string) => void;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({ navigate }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyPopular, setOnlyPopular] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [skillsRes, catRes] = await Promise.all([
        api.skills.getSkills(),
        api.categories.getCategories()
      ]);
      setSkills(skillsRes.skills || []);
      setCategories(catRes.categories || []);
    } catch (err) {
      console.error('Failed to load skills:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      search.trim() === '' ||
      skill.name.toLowerCase().includes(search.toLowerCase()) ||
      skill.description.toLowerCase().includes(search.toLowerCase()) ||
      skill.relatedSkills.some((r) => r.toLowerCase().includes(search.toLowerCase()));

    const matchesDifficulty =
      selectedDifficulty === 'all' ||
      skill.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

    const matchesCategory =
      selectedCategory === 'all' || skill.category === selectedCategory;

    const matchesPopular = !onlyPopular || !!skill.popular;

    return matchesSearch && matchesDifficulty && matchesCategory && matchesPopular;
  });

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Beginner
          </span>
        );
      case 'intermediate':
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            Intermediate
          </span>
        );
      case 'advanced':
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            Advanced
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] pb-24">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Targeted Skill Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Global Skills Explorer
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Master in-demand industry competencies independent of single courses. Explore verified learning paths, prerequisites, hands-on projects, credentials, and career impact.
          </p>

          {/* Quick Stats Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Free Documentation & Labs</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Official Vendor Credentials</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span>Real-World Portfolio Projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-10">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="relative md:col-span-5">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search skill by name, keyword, or concept (e.g. Python, SQL, Docker)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Domains & Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Popular Toggle */}
            <div className="md:col-span-2 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setOnlyPopular(!onlyPopular)}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border ${
                  onlyPopular
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Trending Only</span>
              </button>
            </div>
          </div>

          {/* Quick Filter Badges */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400">Popular Focus:</span>
            {[
              { label: 'All Skills', cat: 'all', diff: 'all' },
              { label: 'Python & AI', cat: 'cat-ai', diff: 'all' },
              { label: 'Web & Frontend', cat: 'cat-web-dev', diff: 'all' },
              { label: 'Cloud & Infrastructure', cat: 'cat-cloud', diff: 'all' },
              { label: 'Cyber Defense', cat: 'cat-cybersecurity', diff: 'all' },
              { label: 'UI/UX Design', cat: 'cat-design', diff: 'all' }
            ].map((chip) => (
              <button
                key={chip.label}
                onClick={() => {
                  setSelectedCategory(chip.cat);
                  setSelectedDifficulty(chip.diff);
                  setSearch('');
                }}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedCategory === chip.cat
                    ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {chip.label}
              </button>
            ))}
            {(search || selectedCategory !== 'all' || selectedDifficulty !== 'all' || onlyPopular) && (
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                  setOnlyPopular(false);
                }}
                className="text-[11px] font-semibold text-rose-500 hover:text-rose-600 ml-auto flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Verified Technical Skills
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Showing {filteredSkills.length} competencies ready for study and industry application
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse p-6"
              />
            ))}
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <Cpu className="w-12 h-12 text-slate-400 mx-auto mb-4 stroke-1" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No matching skills found</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Try adjusting your search terms or resetting domain and difficulty filters.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                setOnlyPopular(false);
              }}
              className="mt-5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                onClick={() => navigate(`/skills/${skill.slug}`)}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500/60 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div>
                  {/* Badges Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      {getDifficultyBadge(skill.difficulty)}
                      {skill.popular && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                          <TrendingUp className="w-2.5 h-2.5" />
                          <span>Popular</span>
                        </span>
                      )}
                    </div>
                    {skill.courseCount !== undefined && skill.courseCount > 0 && (
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        <span>{skill.courseCount} courses</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {skill.name}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {skill.description}
                  </p>

                  {/* Career Targets */}
                  {skill.careerLinks && skill.careerLinks.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                        <Briefcase className="w-3 h-3 text-blue-500" />
                        <span>Leads to Careers:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {skill.careerLinks.slice(0, 2).map((c) => (
                          <span
                            key={c.careerId}
                            className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {c.careerTitle}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related Skills Chips */}
                  {skill.relatedSkills && skill.relatedSkills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {skill.relatedSkills.slice(0, 3).map((rs) => (
                        <span
                          key={rs}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800"
                        >
                          {rs}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Skill & Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI Skill Guidance Callout */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/20 text-white uppercase tracking-wider">
              Gemini Powered Mentorship
            </span>
            <h3 className="text-2xl font-extrabold tracking-tight">
              Unsure which skills match your dream career?
            </h3>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              Our AI Personal Mentor analyzes your current background, maps the skill deficit for any technical job title, and generates a realistic week-by-week bridging strategy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate('/mentor')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold bg-white text-blue-700 hover:bg-blue-50 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Ask AI Mentor</span>
            </button>
            <button
              onClick={() => navigate('/careers')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore Career Paths</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

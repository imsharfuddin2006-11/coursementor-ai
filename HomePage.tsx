import React, { useState, useEffect } from 'react';
import { Course, Category, Provider } from '../types';
import { api } from '../services/api';
import { CourseCard } from '../components/CourseCard';
import {
  Sparkles,
  Compass,
  ArrowRight,
  Search,
  ShieldCheck,
  Award,
  BookOpen,
  Send,
  ChevronDown,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  Bot,
  Building2,
  ExternalLink,
  Zap,
  Globe2,
  DollarSign,
  GraduationCap,
  Layers,
  Check,
  ChevronRight,
  Filter
} from 'lucide-react';
import { handleProviderLogoError } from '../utils/courseImages';

interface HomePageProps {
  navigate: (route: string) => void;
  onSelectCourse: (course: Course) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate, onSelectCourse }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Search Bar State
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPriceMode, setSelectedPriceMode] = useState<'all' | 'free' | 'paid'>('all');

  // Course Filter Tab in Section 6
  const [activeCourseTab, setActiveCourseTab] = useState<'trending' | 'free' | 'certificates' | 'certifications' | 'all'>('trending');

  // Mini-Chat Gemini state
  const [miniChatInput, setMiniChatInput] = useState<string>('');
  const [miniChatMessages, setMiniChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: "Hello! I am CourseMentor AI. What field or career would you like to explore today? Looking for free courses, career guidance, or professional certifications?"
    }
  ]);
  const [isMiniChatThinking, setIsMiniChatThinking] = useState<boolean>(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    Promise.all([
      api.courses.getCourses(),
      api.categories.getCategories(),
      api.providers.getProviders()
    ])
      .then(([courseRes, catRes, provRes]) => {
        setCourses(courseRes.courses || []);
        setCategories(catRes.categories || []);
        setProviders(provRes.providers || []);
      })
      .catch((err) => {
        console.error('Failed to load homepage data', err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Multi-facet Search Submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchKeyword.trim()) params.set('search', searchKeyword.trim());
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedPriceMode === 'free') params.set('pricing', 'free');
    if (selectedPriceMode === 'paid') params.set('pricing', 'paid');

    navigate(`/explore?${params.toString()}`);
  };

  // Mini-Chat with Gemini API
  const handleMiniChatSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!miniChatInput.trim() || isMiniChatThinking) return;

    const userText = miniChatInput.trim();
    setMiniChatInput('');
    setMiniChatMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setIsMiniChatThinking(true);

    try {
      const res = await api.ai.chat(
        userText,
        miniChatMessages.map((m) => ({ role: m.role, content: m.text }))
      );
      setMiniChatMessages((prev) => [...prev, { role: 'assistant', text: res.reply }]);
    } catch {
      setMiniChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: "I recommend starting with computer science fundamentals like Harvard CS50x or Python. How many hours can you commit each week?"
        }
      ]);
    } finally {
      setIsMiniChatThinking(false);
    }
  };

  // Filtered courses for Section 6
  const displayedCourses = courses.filter((c) => {
    if (activeCourseTab === 'free') return c.pricing?.isFree || c.pricing?.freeAuditAvailable;
    if (activeCourseTab === 'certificates') return c.certificateInformation?.isCertificateFree;
    if (activeCourseTab === 'certifications') return c.isProfessionalCertification;
    if (activeCourseTab === 'trending') return c.trending || c.rating >= 4.8;
    return true;
  });

  const popularSkills = [
    'Python',
    'SQL',
    'JavaScript',
    'Generative AI',
    'Prompt Engineering',
    'Excel',
    'Power BI',
    'React',
    'AWS',
    'Cybersecurity',
    'Communication',
    'Project Management'
  ];

  const faqs = [
    {
      q: "What is the difference between free course access and free certificates?",
      a: "This is one of the most critical distinctions in online learning. Many prestigious platforms (such as edX and Coursera) allow students to audit (watch videos and read materials) 100% free of charge. However, graded assignments and verified certificates usually require a subscription or fee. Platforms like freeCodeCamp, Harvard CS50, and IBM SkillsBuild offer genuine 100% free verified certificates upon project completion. CourseMentor AI labels both attributes separately."
    },
    {
      q: "Does CourseMentor AI issue certificates directly?",
      a: "No. CourseMentor AI is an intelligent discovery, roadmap, and mentorship platform. All courses and certificates are issued by verified academic institutions and industry leaders (e.g., Harvard, MIT, Google, DeepLearning.AI, IBM, freeCodeCamp, NPTEL). When you enroll, you are directed directly to the official provider portal."
    },
    {
      q: "How does the AI Personal Mentor help me?",
      a: "CourseMentor AI Assistant uses Gemini to analyze your career goals, existing skills, available hours, and budget. Instead of scrolling through thousands of unvetted courses, the AI builds custom milestones, explains complex syllabus terms, compares courses, and points you to the exact verified curriculum."
    },
    {
      q: "Can I track my learning roadmaps and certificates in one place?",
      a: "Yes! Your student dashboard features an interactive Roadmap tracker where you can check off daily milestones, plus a Certificate Vault where you can store, organize, verify, and share a public portfolio of all your accomplishments."
    }
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* ================= SECTION 2: HERO SECTION ================= */}
      <section className="relative pt-10 pb-16 lg:pt-18 lg:pb-22">
        {/* Abstract Glow Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-violet-600/20 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-xs">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
                <span>Next-Gen Global Learning & AI Career Ecosystem</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                Learn Anything.{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Build Every Skill.
                </span>{' '}
                Shape Your Future.
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Explore thousands of learning opportunities from trusted global platforms. Get personalized AI mentorship, discover your next skill, and build a career-ready future.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => navigate('/explore')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('/mentor')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-violet-500" />
                  <span>Talk to AI Mentor</span>
                </button>
              </div>

              {/* Trust Metric Highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800 text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">34+</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Verified Providers</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">100%</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Direct Official Links</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">25</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Curated Domains</p>
                </div>
              </div>
            </div>

            {/* Right: Interactive AI Mentor Preview */}
            <div className="lg:col-span-5">
              <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-600 flex items-center justify-center text-white shadow-md">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        CourseMentor AI Assistant
                      </h3>
                      <p className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Online & Ready to Guide
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/mentor')}
                    className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    Full Screen
                  </button>
                </div>

                {/* Messages Container */}
                <div className="py-4 space-y-3 h-64 overflow-y-auto text-xs pr-1">
                  {miniChatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-blue-600 text-white rounded-br-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isMiniChatThinking && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-2 text-slate-500 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                        <span className="text-[11px] text-slate-400 font-medium ml-1">Consulting curriculum...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick prompt suggestions */}
                <div className="pt-2 pb-3 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-slate-800">
                  {['Free Certificate in Python', 'AI Engineer roadmap', 'Harvard CS50 vs MIT'].map((q) => (
                    <button
                      key={q}
                      onClick={() => setMiniChatInput(q)}
                      className="text-[11px] font-medium px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-600 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Mini Input Box */}
                <form onSubmit={handleMiniChatSend} className="relative flex items-center">
                  <input
                    type="text"
                    value={miniChatInput}
                    onChange={(e) => setMiniChatInput(e.target.value)}
                    disabled={isMiniChatThinking}
                    placeholder={isMiniChatThinking ? "CourseMentor AI is consulting..." : "Ask anything about courses or career paths..."}
                    className="w-full pl-3.5 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={!miniChatInput.trim() || isMiniChatThinking}
                    className="absolute right-1.5 p-1.5 rounded-lg bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2B: SMART MULTI-FACET SEARCH ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-6 sm:p-8 rounded-3xl shadow-xl text-white border border-slate-800">
          <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-6">
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider inline-block">
              Smart Learning Search
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              What do you want to learn today?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Instant search across verified courses, core skills, high-growth careers, and 25 specialized categories.
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="space-y-4 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Keyword Search */}
              <div className="md:col-span-6 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Course title, skill, or career (e.g. Python, AI Engineer, Harvard CS50)..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-slate-900 text-sm placeholder:text-slate-400 font-medium shadow-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Dropdown */}
              <div className="md:col-span-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium shadow-xs border border-transparent focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All 25 Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Mode Toggle */}
              <div className="md:col-span-3 flex items-center bg-slate-800/90 rounded-xl p-1 border border-slate-700">
                {(['all', 'free', 'paid'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSelectedPriceMode(mode)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg capitalize transition-colors ${
                      selectedPriceMode === mode
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode === 'all' ? 'All' : mode === 'free' ? 'Free' : 'Paid'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
                <span className="text-slate-400 font-medium">Suggestions:</span>
                {[
                  { label: 'Python (Course)', q: 'Python' },
                  { label: 'Generative AI (Skill)', q: 'Generative AI' },
                  { label: 'AI Engineer (Career)', q: 'AI Engineer' },
                  { label: 'Cloud Computing (Category)', q: 'Cloud Computing' },
                  { label: 'Free Certificates', q: 'Free Certificate' }
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setSearchKeyword(item.q);
                      navigate(`/explore?search=${encodeURIComponent(item.q)}`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Catalog</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ================= SECTION 3: TRUST & DISCOVERY MARQUEE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="text-center sm:text-left">
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Trusted Global Ecosystem
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                Learn from 34+ Global Universities & Tech Industry Leaders
              </h3>
            </div>
            <button
              onClick={() => navigate('/providers')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Explore All 34 Providers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Marquee / Grid of Leading Providers */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {providers.slice(0, 12).map((prov) => (
              <div
                key={prov.id}
                onClick={() => navigate(`/providers/${prov.slug}`)}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group"
              >
                <img
                  src={prov.logoUrl}
                  alt={prov.name}
                  className="w-10 h-10 rounded-lg object-contain p-1 bg-slate-50 dark:bg-slate-800 group-hover:scale-105 transition-transform"
                  onError={(e) => handleProviderLogoError(e, prov.id)}
                />
                <p className="mt-2 text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {prov.name}
                </p>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  {prov.isFreeLearningAvailable && (
                    <span className="px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold">
                      Free
                    </span>
                  )}
                  <span>{prov.verifiedCourseCount} Courses</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-around gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              100% Official Provider Course Links
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-500" />
              Verified Certificate Terms Disclosed
            </span>
            <span className="flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4 text-violet-500" />
              Zero Hallucinated Courses
            </span>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: EXPLORE CATEGORIES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              25 Specialized Domains
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Explore Learning Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              From foundational software development to bleeding-edge generative AI and quantum computing.
            </p>
          </div>
          <button
            onClick={() => navigate('/categories')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View All 25 Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.slice(0, 8).map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/categories/${cat.slug || cat.id}`)}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mb-3.5 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                {/* Subcategory Pills */}
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {cat.subcategories.slice(0, 2).map((sub) => (
                      <span
                        key={sub.id}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {sub.name}
                      </span>
                    ))}
                    {cat.subcategories.length > 2 && (
                      <span className="text-[10px] font-medium text-slate-400">
                        +{cat.subcategories.length - 2} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                <span>{cat.courseCount} Courses</span>
                <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 5: FEATURED LEARNING PROVIDERS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Global Platform Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Featured Learning Providers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Explore offerings from world-renowned universities, industry cloud champions, and open-learning foundations.
            </p>
          </div>

          <button
            onClick={() => navigate('/providers')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Providers ({providers.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {providers
            .filter((p) => p.featured || ['prov-coursera', 'prov-edx', 'prov-harvard-cs50', 'prov-google-cloud', 'prov-aws', 'prov-freecodecamp', 'prov-nptel', 'prov-ibm-skillsbuild'].includes(p.id))
            .slice(0, 8)
            .map((prov) => (
              <div
                key={prov.id}
                onClick={() => navigate(`/providers/${prov.slug}`)}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <img
                      src={prov.logoUrl}
                      alt={prov.name}
                      className="w-12 h-12 rounded-xl object-contain p-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 group-hover:scale-105 transition-transform"
                      onError={(e) => handleProviderLogoError(e, prov.id)}
                    />
                    <div className="flex flex-col items-end gap-1">
                      {prov.verificationStatus === 'Verified' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                          <ShieldCheck className="w-3 h-3 text-blue-500" />
                          Verified
                        </span>
                      )}
                      {prov.isFreeLearningAvailable && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                          Free Available
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {prov.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {prov.description}
                  </p>

                  {/* Domains */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {prov.learningDomains?.slice(0, 2).map((d: string) => (
                      <span
                        key={d}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>{prov.verifiedCourseCount} Courses</span>
                  <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Catalog <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* ================= SECTION 6: FEATURED COURSES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Audited & Vetted Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Featured Verified Courses
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Transparent syllabus, duration, pricing, and certified academic credentials.
            </p>
          </div>

          <button
            onClick={() => navigate('/explore')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>See All Courses ({courses.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* View Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {[
            { id: 'trending', label: 'Trending Courses' },
            { id: 'free', label: 'Free Learning' },
            { id: 'certificates', label: 'Free Certificates' },
            { id: 'certifications', label: 'Professional Certifications' },
            { id: 'all', label: 'All Courses' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCourseTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCourseTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCourses.slice(0, 6).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onViewDetails={onSelectCourse}
              />
            ))}
          </div>
        )}
      </section>

      {/* ================= SECTION 7: FREE LEARNING HUB ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 rounded-3xl p-8 sm:p-12 border border-emerald-800/40 shadow-xl">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-wider inline-block">
              Learn More. Spend Less.
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              The Transparent Free Learning Hub
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We eliminate online course confusion. Here is the exact difference between free lecture auditing and 100% free verified certificates:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Free Audit Card */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-base">Free Audit Access</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Platforms like Coursera, edX, and FutureLearn allow students to watch video lectures, read transcripts, and complete unverified practice for free. Verified certificates or graded exams require payment.
              </p>
              <div className="text-xs text-blue-400 font-semibold flex items-center gap-1.5 pt-1">
                <Check className="w-3.5 h-3.5" />
                Best for self-learners and knowledge acquisition
              </div>
            </div>

            {/* Free Verified Certificate Card */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-700/80 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-base">100% Free Verified Certificates</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Platforms like freeCodeCamp, Harvard CS50, IBM SkillsBuild, Kaggle Learn, and HP LIFE issue official verified certificates upon project submission with zero paywalls or hidden fees.
              </p>
              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
                <Check className="w-3.5 h-3.5" />
                Best for resume and LinkedIn portfolio verification
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate('/explore?freeCertificate=true')}
              className="px-6 py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Browse 100% Free Certificate Courses</span>
            </button>
            <button
              onClick={() => navigate('/explore?pricing=free')}
              className="px-6 py-3 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
            >
              <span>Browse All Free Courses</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= SECTION 8: AI PERSONAL MENTOR ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white border border-indigo-900/60 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30 uppercase tracking-wider inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                Gemini Multi-Model Intelligence
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Your Personal Learning Mentor, Available Anytime.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Powered by a robust multi-model Gemini cascade with instant fallback protection. CourseMentor AI guides your learning journey step-by-step:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  {
                    title: 'Skill Gap Diagnostics',
                    desc: 'Analyze target career roles and identify your exact missing competencies.'
                  },
                  {
                    title: 'Course Comparison Engine',
                    desc: 'Objectively compare syllabi, weekly commitments, and pricing trade-offs.'
                  },
                  {
                    title: 'Personalized Study Plans',
                    desc: 'Generate weekly milestones suited for 5, 10, or 20 hours per week.'
                  },
                  {
                    title: 'Demystify Prerequisites',
                    desc: 'Explain complex math or coding terms in beginner-friendly language.'
                  }
                ].map((item, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs font-bold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-300 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <button
                  onClick={() => navigate('/mentor')}
                  className="px-7 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Bot className="w-4 h-4" />
                  <span>Launch Full AI Mentor Experience</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-4">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-violet-400" />
                <h4 className="font-bold text-sm text-white">Popular Student Questions</h4>
              </div>
              <div className="space-y-2">
                {[
                  "I want to become an AI Engineer with zero CS background. Where should I start?",
                  "Which Python course has a 100% free verified certificate?",
                  "Compare Harvard CS50 vs MIT Introduction to Computer Science.",
                  "How do I prepare for AWS Certified Solutions Architect?"
                ].map((promptText, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(`/mentor?q=${encodeURIComponent(promptText)}`)}
                    className="w-full text-left p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 text-xs text-slate-200 transition-colors border border-slate-700 flex items-center justify-between group cursor-pointer"
                  >
                    <span className="line-clamp-1">{promptText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 9: IN-DEMAND CAREER PATHS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Career Alignment
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              In-Demand High Growth Career Paths
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Target high-paying technical roles, inspect required skills, and bridge gaps with verified courses.
            </p>
          </div>

          <button
            onClick={() => navigate('/careers')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Careers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              id: 'career-ai-engineer',
              title: 'AI / Machine Learning Engineer',
              demand: 'Very High (+38%)',
              salary: '$120,000 – $190,000',
              skills: ['Python', 'PyTorch', 'Transformers', 'MLOps', 'Vector DBs'],
              desc: 'Architect and deploy neural networks, foundation model fine-tuning, and scalable production AI pipelines.'
            },
            {
              id: 'career-data-analyst',
              title: 'Data Analyst',
              demand: 'High (+21%)',
              salary: '$75,000 – $120,000',
              skills: ['SQL', 'Python', 'Power BI', 'Tableau', 'Statistics'],
              desc: 'Transform raw enterprise telemetry into actionable executive dashboards and predictive business insights.'
            },
            {
              id: 'career-fullstack-dev',
              title: 'Software Developer',
              demand: 'Very High (+24%)',
              salary: '$95,000 – $160,000',
              skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'System Design'],
              desc: 'Build scalable modern web applications from frontend user interfaces to robust cloud backend microservices.'
            },
            {
              id: 'career-cyber-analyst',
              title: 'Cybersecurity Analyst',
              demand: 'Very High (+32%)',
              salary: '$90,000 – $150,000',
              skills: ['Threat Hunting', 'SIEM', 'Network Security', 'Linux', 'Ethical Hacking'],
              desc: 'Protect organizational digital assets, detect active vulnerabilities, and respond to cyber incidents.'
            },
            {
              id: 'career-cloud-architect',
              title: 'Cloud Engineer',
              demand: 'Very High (+28%)',
              salary: '$125,000 – $195,000',
              skills: ['AWS', 'Google Cloud', 'Kubernetes', 'Terraform', 'CI/CD'],
              desc: 'Design resilient, scalable multi-region cloud infrastructures for enterprise-grade applications.'
            },
            {
              id: 'career-business-analyst',
              title: 'Business Analyst',
              demand: 'High (+20%)',
              salary: '$80,000 – $130,000',
              skills: ['SQL', 'Excel Modeling', 'Agile', 'BPMN', 'Analytics'],
              desc: 'Bridge technical engineering with strategic business requirements, KPIs, and operational optimization.'
            },
            {
              id: 'career-uiux-designer',
              title: 'UI/UX Designer',
              demand: 'High (+18%)',
              salary: '$85,000 – $140,000',
              skills: ['Figma', 'User Research', 'Design Systems', 'Wireframing', 'Prototyping'],
              desc: 'Craft intuitive, accessible digital product experiences and validated user-centered design prototypes.'
            },
            {
              id: 'career-digital-marketing',
              title: 'Digital Marketing Specialist',
              demand: 'High (+16%)',
              salary: '$65,000 – $110,000',
              skills: ['SEO', 'Google Analytics', 'SEM', 'Content Strategy', 'Social Media'],
              desc: 'Execute data-driven organic and paid growth campaigns to acquire and retain enterprise and consumer audiences.'
            }
          ].map((c) => (
            <div
              key={c.id}
              onClick={() => navigate(`/careers/${c.id}`)}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    {c.demand}
                  </span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {c.salary}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {c.desc}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Analyze Skill Gap</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 10: POPULAR SKILLS CLOUD ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                In-Demand Competencies
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                Explore Courses & Roadmaps by Skill
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Inspect prerequisites, courses by level, free resources, certifications, and portfolio projects.
              </p>
            </div>
            <button
              onClick={() => navigate('/skills')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Global Skills Explorer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
            {popularSkills.map((skill) => {
              const skillSlugMap: Record<string, string> = {
                'Python': 'python',
                'SQL': 'sql',
                'Generative AI': 'generative-ai',
                'React': 'react',
                'AWS': 'cloud-aws',
                'Cybersecurity': 'cybersecurity',
                'TypeScript': 'typescript'
              };
              const targetSlug = skillSlugMap[skill];
              return (
                <button
                  key={skill}
                  onClick={() => targetSlug ? navigate(`/skills/${targetSlug}`) : navigate(`/skills?search=${encodeURIComponent(skill)}`)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Zap className="w-3 h-3 text-blue-500" />
                  <span>{skill}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SECTION 11: LEARNING ROADMAPS SHOWCASE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider">
              Step-by-Step Milestones
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Structured Milestones From Zero to Industry Certified
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Never get lost in tutorial purgatory. Our learning roadmaps break broad fields into measurable weekly achievements.
            </p>
          </div>

          {/* 4-Step Milestone Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                step: 'Phase 1',
                title: 'Foundations & Syntax',
                time: 'Weeks 1 – 4',
                desc: 'Master fundamental programming syntax, algorithms, data structures, and terminal workflows.'
              },
              {
                step: 'Phase 2',
                title: 'Applied Engineering',
                time: 'Weeks 5 – 8',
                desc: 'Build real-world projects, connect databases, consume REST APIs, and implement version control.'
              },
              {
                step: 'Phase 3',
                title: 'System Architecture',
                time: 'Weeks 9 – 12',
                desc: 'Deploy on cloud providers, implement authentication security, configure CI/CD pipelines.'
              },
              {
                step: 'Phase 4',
                title: 'Industry Certification',
                time: 'Weeks 13 – 16',
                desc: 'Sit for verified examinations, publish portfolio repositories, and undergo AI mock interviews.'
              }
            ].map((st, i) => (
              <div
                key={st.step}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-blue-400 font-bold mb-2">
                    <span>{st.step}</span>
                    <span className="text-[10px] text-slate-400">{st.time}</span>
                  </div>
                  <h3 className="font-bold text-sm text-white">{st.title}</h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/dashboard?tab=roadmap')}
              className="px-8 py-3.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Build My Personalized Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= SECTION 12: FINAL CALL TO ACTION ================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Your Next Opportunity Starts With One Skill.
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-normal">
              Join thousands of learners discovering verified courses, bridging skill gaps, and building future-proof careers with AI-powered course discovery.
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/explore')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-sm bg-white text-blue-700 hover:bg-blue-50 shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Courses</span>
            </button>
            <button
              onClick={() => navigate('/mentor')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-blue-700/80 hover:bg-blue-700 text-white border border-blue-400/40 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Meet Your AI Mentor</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= SECTION: FAQ ACCORDION ================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 space-y-1">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Clear Answers
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

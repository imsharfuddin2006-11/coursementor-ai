import React, { useState, useEffect } from 'react';
import { Course, Category, Provider, User } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  Users,
  BookOpen,
  BarChart3,
  Search,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Building2,
  Award,
  Check,
  X
} from 'lucide-react';

interface AdminPageProps {
  navigate: (route: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ navigate }) => {
  const { user, login } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [reports, setReports] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'courses' | 'providers' | 'categories' | 'users' | 'reports'>('analytics');

  // Search filters
  const [courseSearch, setCourseSearch] = useState('');
  const [providerSearch, setProviderSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');

  // Course Add/Edit modal state
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseForm, setCourseForm] = useState<Partial<Course>>({
    title: '',
    providerName: 'Coursera',
    categoryId: 'cat-programming',
    level: 'Beginner',
    language: 'English',
    duration: '4-6 Weeks',
    pricing: { isFree: true, freeAuditAvailable: true, currency: 'USD' },
    certificateInformation: { hasCertificate: true, isCertificateFree: true, certificateCondition: 'Free certificate on completion' },
    skills: ['Python', 'Problem Solving'],
    officialUrl: 'https://coursera.org',
    shortDescription: 'Comprehensive hands-on course',
    description: 'Master in-demand skills with verified curriculum and hands-on projects.',
    format: 'Self-paced',
    trending: false,
    isNew: true,
    isProfessionalCertification: false
  });

  // Provider Add modal state
  const [isAddProviderOpen, setIsAddProviderOpen] = useState(false);
  const [providerForm, setProviderForm] = useState<Partial<Provider>>({
    name: '',
    slug: '',
    description: '',
    websiteUrl: '',
    categoryType: 'Global Platform',
    isFreeLearningAvailable: true,
    hasFreeCertificates: false,
    verificationStatus: 'Verified',
    learningDomains: ['Computer Science', 'AI']
  });

  // Subcategory Add modal state
  const [isAddSubcatOpen, setIsAddSubcatOpen] = useState(false);
  const [targetCategoryId, setTargetCategoryId] = useState<string>('');
  const [subcatName, setSubcatName] = useState<string>('');
  const [subcatDesc, setSubcatDesc] = useState<string>('');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [coursesRes, catRes, provRes, usersRes, analyticsRes, reportsRes] = await Promise.all([
        api.courses.getCourses(),
        api.categories.getCategories(),
        api.providers.getProviders(),
        api.admin.getUsers(),
        api.admin.getAnalytics(),
        api.admin.getReports()
      ]);

      setCourses(coursesRes.courses || []);
      setCategories(catRes.categories || []);
      setProviders(provRes.providers || []);
      setUsers(usersRes.users || []);
      setAnalytics(analyticsRes);
      setReports(reportsRes);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Course handlers
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title || !courseForm.officialUrl) return;

    try {
      if (editingCourse) {
        const res = await api.courses.updateCourse(editingCourse.id, courseForm);
        setCourses((prev) => prev.map((c) => (c.id === editingCourse.id ? res.course : c)));
      } else {
        const res = await api.courses.createCourse(courseForm);
        setCourses((prev) => [res.course, ...prev]);
      }
      setIsAddCourseOpen(false);
      setEditingCourse(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course from the catalog?')) return;
    try {
      await api.courses.deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleCourseTrending = async (c: Course) => {
    try {
      const res = await api.courses.updateCourse(c.id, { trending: !c.trending });
      setCourses((prev) => prev.map((item) => (item.id === c.id ? res.course : item)));
    } catch (e) {
      console.error(e);
    }
  };

  // Provider handlers
  const handleToggleProviderVerification = async (p: Provider) => {
    try {
      const newStatus = p.verificationStatus === 'Verified' ? 'Pending' : 'Verified';
      const res = await api.providers.updateProvider(p.id, { verificationStatus: newStatus });
      setProviders((prev) => prev.map((item) => (item.id === p.id ? res.provider : item)));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveProvider = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!providerForm.name || !providerForm.websiteUrl) return;

    try {
      const res = await api.providers.createProvider({
        ...providerForm,
        slug: providerForm.slug || providerForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
      setProviders((prev) => [res.provider, ...prev]);
      setIsAddProviderOpen(false);
      setProviderForm({
        name: '',
        slug: '',
        description: '',
        websiteUrl: '',
        categoryType: 'Global Platform',
        isFreeLearningAvailable: true,
        hasFreeCertificates: false,
        verificationStatus: 'Verified',
        learningDomains: ['Computer Science', 'AI']
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProvider = async (id: string) => {
    if (!window.confirm('Delete this provider from the catalog?')) return;
    try {
      await api.providers.deleteProvider(id);
      setProviders((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  // Subcategory handler
  const handleAddSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetCategoryId || !subcatName.trim()) return;

    try {
      await api.categories.addSubcategory(targetCategoryId, {
        name: subcatName.trim(),
        description: subcatDesc.trim()
      });
      // Refresh categories
      const catRes = await api.categories.getCategories();
      setCategories(catRes.categories || []);
      setIsAddSubcatOpen(false);
      setSubcatName('');
      setSubcatDesc('');
    } catch (e) {
      console.error(e);
    }
  };

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.providerName.toLowerCase().includes(courseSearch.toLowerCase());
    return matchesSearch;
  });

  const filteredProviders = providers.filter((p) => {
    return (
      p.name.toLowerCase().includes(providerSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(providerSearch.toLowerCase())
    );
  });

  const filteredCategories = categories.filter((cat) => {
    return (
      cat.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
      cat.description.toLowerCase().includes(categorySearch.toLowerCase())
    );
  });

  if (user && user.role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 flex items-center justify-center mx-auto shadow-md">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Admin Privileges Required</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            You are currently signed in as a student (<span className="font-semibold text-slate-700 dark:text-slate-300">{user.email}</span>). The control center is restricted to platform administrators.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={async () => {
              await login('admin@coursementor.ai', 'password', 'admin');
              loadAdminData();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Switch to Demo Admin Role</span>
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
          >
            Return to Student Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              CourseMentor AI Control Center
            </span>
            <span className="text-xs text-slate-400">Admin Mode Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Curriculum & Provider Governance
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingCourse(null);
              setIsAddCourseOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Course</span>
          </button>
          <button
            onClick={() => setIsAddProviderOpen(true)}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
          >
            <Building2 className="w-4 h-4" />
            <span>Add Provider</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'analytics', label: 'Ecosystem Analytics', icon: BarChart3 },
          { id: 'courses', label: `Courses (${courses.length})`, icon: BookOpen },
          { id: 'providers', label: `Providers (${providers.length})`, icon: Building2 },
          { id: 'categories', label: `Categories (${categories.length})`, icon: Layers },
          { id: 'users', label: `Users (${users.length})`, icon: Users },
          { id: 'reports', label: 'Audit Logs', icon: Clock }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= ADMIN TAB 1: ANALYTICS ================= */}
      {activeAdminTab === 'analytics' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">Verified Courses</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{courses.length}</p>
              <span className="text-[10px] text-emerald-500 font-semibold">100% Curated</span>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">Global Providers</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{providers.length}</p>
              <span className="text-[10px] text-blue-500 font-semibold">Harvard, edX, AWS, MIT...</span>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">Learning Domains</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{categories.length}</p>
              <span className="text-[10px] text-purple-500 font-semibold">75+ Subcategories</span>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">Free Learning Hub</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {courses.filter((c) => c.pricing?.isFree || c.pricing?.freeAuditAvailable).length}
              </p>
              <span className="text-[10px] text-emerald-500 font-semibold">Free Audit or 100% Free Cert</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADMIN TAB 2: COURSES ================= */}
      {activeAdminTab === 'courses' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              />
            </div>
            <span className="text-xs text-slate-500">{filteredCourses.length} courses listed</span>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase p-3 border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="p-3">Course Title</th>
                    <th className="p-3">Provider</th>
                    <th className="p-3">Pricing & Cert</th>
                    <th className="p-3">Level</th>
                    <th className="p-3">Trending</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredCourses.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-3">
                        <p className="font-bold text-slate-900 dark:text-white line-clamp-1">{c.title}</p>
                        <a
                          href={c.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          Official URL <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </td>
                      <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">{c.providerName}</td>
                      <td className="p-3">
                        <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                          {c.pricing?.freeAuditAvailable || c.pricing?.isFree
                            ? 'Free Audit'
                            : `$${c.pricing?.originalPrice || 49}`}
                        </span>
                        {c.certificateInformation?.isCertificateFree && (
                          <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            Free Cert
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-slate-500">{c.level}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleToggleCourseTrending(c)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                            c.trending
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                          }`}
                        >
                          {c.trending ? '★ Trending' : 'Normal'}
                        </button>
                      </td>
                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => {
                            setEditingCourse(c);
                            setCourseForm(c);
                            setIsAddCourseOpen(true);
                          }}
                          className="p-1.5 text-blue-600 hover:text-blue-800 cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(c.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADMIN TAB 3: PROVIDERS ================= */}
      {activeAdminTab === 'providers' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={providerSearch}
                onChange={(e) => setProviderSearch(e.target.value)}
                placeholder="Search 34 providers..."
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              />
            </div>
            <span className="text-xs text-slate-500">{filteredProviders.length} providers</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProviders.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <img src={p.logoUrl} alt={p.name} className="w-10 h-10 rounded-lg object-contain p-1 bg-slate-50 dark:bg-slate-800" />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{p.name}</h4>
                        <span className="text-[10px] text-slate-400 capitalize">{p.categoryType}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleProviderVerification(p)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                        p.verificationStatus === 'Verified'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {p.verificationStatus === 'Verified' ? '✓ Verified' : 'Unverified'}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">{p.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold">{p.verifiedCourseCount} courses</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={p.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <span>Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      onClick={() => handleDeleteProvider(p.id)}
                      className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                      title="Delete Provider"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ADMIN TAB 4: CATEGORIES & SUBCATEGORIES ================= */}
      {activeAdminTab === 'categories' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                placeholder="Search categories & subcategories..."
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              />
            </div>
            <span className="text-xs text-slate-500">{filteredCategories.length} categories</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{cat.name}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600">
                      {cat.courseCount} Courses
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{cat.description}</p>

                  <div className="mt-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Subcategories ({cat.subcategories?.length || 0}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cat.subcategories?.map((s) => (
                        <span key={s.id} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setTargetCategoryId(cat.id);
                      setIsAddSubcatOpen(true);
                    }}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Subcategory</span>
                  </button>
                  <button
                    onClick={() => navigate(`/categories/${cat.slug || cat.id}`)}
                    className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    View Page →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ADMIN TAB 5: USERS ================= */}
      {activeAdminTab === 'users' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs animate-in fade-in">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase p-4 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Career Goal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{u.name}</td>
                  <td className="p-4 font-mono text-slate-500">{u.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                        u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{u.careerGoals || 'Not set'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= ADMIN TAB 6: AUDIT LOGS ================= */}
      {activeAdminTab === 'reports' && reports && (
        <div className="space-y-4 animate-in fade-in">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">System Audit & Verification Logs</h2>
          <div className="space-y-2">
            {reports.auditLogs?.map((log: any, idx: number) => (
              <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white mr-2">[{log.action}]</span>
                  <span className="text-slate-600 dark:text-slate-300">{log.details}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">By {log.user}</span>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0 font-mono">{log.timestamp.split('T')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Course Add / Edit Modal */}
      {isAddCourseOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {editingCourse ? 'Edit Verified Course' : 'Add New Verified Course'}
            </h3>

            <form onSubmit={handleSaveCourse} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Course Title</label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Provider Name</label>
                  <input
                    type="text"
                    required
                    value={courseForm.providerName || ''}
                    onChange={(e) => setCourseForm({ ...courseForm, providerName: e.target.value })}
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Level</label>
                  <select
                    value={courseForm.level}
                    onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value as any })}
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Official Provider URL</label>
                <input
                  type="url"
                  required
                  value={courseForm.officialUrl}
                  onChange={(e) => setCourseForm({ ...courseForm, officialUrl: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={courseForm.pricing?.freeAuditAvailable || false}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        pricing: {
                          ...(courseForm.pricing || { isFree: true, currency: 'USD' }),
                          freeAuditAvailable: e.target.checked
                        }
                      })
                    }
                    className="rounded text-blue-600"
                  />
                  <span>Free Audit Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={courseForm.certificateInformation?.isCertificateFree || false}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        certificateInformation: {
                          ...(courseForm.certificateInformation || { hasCertificate: true, certificateCondition: '' }),
                          isCertificateFree: e.target.checked
                        }
                      })
                    }
                    className="rounded text-blue-600"
                  />
                  <span>100% Free Certificate</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddCourseOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold cursor-pointer hover:bg-blue-700"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Provider Modal */}
      {isAddProviderOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Add New Learning Provider</h3>
            <form onSubmit={handleSaveProvider} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Provider Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stanford Online, SkillsLearn"
                  value={providerForm.name}
                  onChange={(e) => setProviderForm({ ...providerForm, name: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Official Website URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={providerForm.websiteUrl}
                  onChange={(e) => setProviderForm({ ...providerForm, websiteUrl: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Description</label>
                <textarea
                  rows={3}
                  value={providerForm.description}
                  onChange={(e) => setProviderForm({ ...providerForm, description: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Ecosystem Type</label>
                  <select
                    value={providerForm.categoryType || 'Global Platform'}
                    onChange={(e) => setProviderForm({ ...providerForm, categoryType: e.target.value as any })}
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="Global Platform">Global Education Platform</option>
                    <option value="Tech & Professional">Tech & Professional Skills</option>
                    <option value="India & International">India & International</option>
                    <option value="University & Open">University & Open</option>
                  </select>
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={providerForm.isFreeLearningAvailable || false}
                      onChange={(e) => setProviderForm({ ...providerForm, isFreeLearningAvailable: e.target.checked })}
                    />
                    <span>Free Courses</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddProviderOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 text-white font-bold cursor-pointer hover:bg-violet-700"
                >
                  Create Provider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Subcategory Modal */}
      {isAddSubcatOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Add Subcategory to {categories.find((c) => c.id === targetCategoryId)?.name}
            </h3>
            <form onSubmit={handleAddSubcategory} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Subcategory Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prompt Engineering & LLM Ops"
                  value={subcatName}
                  onChange={(e) => setSubcatName(e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Description (Optional)</label>
                <input
                  type="text"
                  placeholder="Brief summary of skills"
                  value={subcatDesc}
                  onChange={(e) => setSubcatDesc(e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddSubcatOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold cursor-pointer hover:bg-blue-700"
                >
                  Add Subcategory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

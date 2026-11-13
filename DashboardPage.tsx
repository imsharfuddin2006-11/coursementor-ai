import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Course, Roadmap, CertificateRecord, EnrolledCourse } from '../types';
import { api } from '../services/api';
import confetti from 'canvas-confetti';
import {
  LayoutDashboard,
  GraduationCap,
  Bookmark,
  Map,
  Award,
  BarChart3,
  Settings,
  Sparkles,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  ExternalLink,
  Share2,
  Upload,
  Calendar,
  Flame,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Edit3,
  BookOpen
} from 'lucide-react';
import { getCourseThumbnail, handleCourseImageError } from '../utils/courseImages';

interface DashboardPageProps {
  initialTab?: string;
  onSelectCourse: (course: Course) => void;
  navigate: (route: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  initialTab = 'overview',
  onSelectCourse,
  navigate
}) => {
  const { user, updateUser, formatPrice } = useAuth();
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Data states
  const [enrolled, setEnrolled] = useState<(EnrolledCourse & { course: Course })[]>([]);
  const [savedCourses, setSavedCourses] = useState<{ courseId: string; savedAt: string; notes?: string; course: Course }[]>([]);
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);

  // New Roadmap Generation modal/state
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  const [targetCareer, setTargetCareer] = useState(user?.careerGoals || 'AI & Machine Learning Engineer');
  const [weeklyHours, setWeeklyHours] = useState(user?.weeklyLearningHours || 10);

  // Certificate upload modal state
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [newCert, setNewCert] = useState({
    title: '',
    issuingOrganization: 'freeCodeCamp',
    courseName: '',
    issueDate: new Date().toISOString().split('T')[0],
    verificationUrl: '',
    skillsGained: ''
  });
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copiedPortfolio, setCopiedPortfolio] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [enrolledRes, savedRes, certsRes, roadmapsRes] = await Promise.all([
        api.myCourses.getMyCourses(),
        api.savedCourses.getSaved(),
        api.certificates.getCertificates(),
        api.roadmaps.getRoadmaps()
      ]);

      setEnrolled(enrolledRes.enrolledCourses || []);
      setSavedCourses(savedRes.savedCourses || []);
      setCertificates(certsRes.certificates || []);
      setRoadmaps(roadmapsRes.roadmaps || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (roadmapId: string, milestoneId: string, taskId: string) => {
    const roadmap = roadmaps.find(r => r.id === roadmapId);
    if (!roadmap) return;

    const updatedMilestones = roadmap.milestones.map(m => {
      if (m.id !== milestoneId) return m;
      return {
        ...m,
        tasks: m.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
      };
    });

    try {
      const res = await api.roadmaps.updateRoadmap(roadmapId, { milestones: updatedMilestones });
      setRoadmaps(prev => prev.map(r => r.id === roadmapId ? res.roadmap : r));

      // Trigger celebratory confetti if 100% achieved
      if (res.roadmap.progress === 100) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerateRoadmap = async () => {
    setGeneratingRoadmap(true);
    try {
      const res = await api.ai.generateRoadmap({
        careerGoal: targetCareer,
        currentLevel: user?.experienceLevel || 'Beginner',
        availableHours: weeklyHours
      });

      if (res.roadmap) {
        const saved = await api.roadmaps.saveRoadmap(res.roadmap);
        setRoadmaps(prev => [saved.roadmap, ...prev]);
        confetti({ particleCount: 60, spread: 60 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingRoadmap(false);
    }
  };

  const handleAddCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.title || !newCert.issuingOrganization) return;

    try {
      const skillsArr = newCert.skillsGained.split(',').map(s => s.trim()).filter(Boolean);
      const res = await api.certificates.addCertificate({
        title: newCert.title,
        issuingOrganization: newCert.issuingOrganization,
        courseName: newCert.courseName || newCert.title,
        issueDate: newCert.issueDate,
        verificationUrl: newCert.verificationUrl,
        skillsGained: skillsArr
      });

      setCertificates(prev => [res.certificate, ...prev]);
      setIsCertModalOpen(false);
      setNewCert({
        title: '',
        issuingOrganization: 'freeCodeCamp',
        courseName: '',
        issueDate: new Date().toISOString().split('T')[0],
        verificationUrl: '',
        skillsGained: ''
      });
      confetti({ particleCount: 80, spread: 70 });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCert = async (id: string) => {
    await api.certificates.deleteCertificate(id);
    setCertificates(prev => prev.filter(c => c.id !== id));
  };

  const activeRoadmap = roadmaps[0];
  const completedCount = enrolled.filter(e => e.status === 'Completed').length;
  const inProgressCount = enrolled.filter(e => e.status === 'In Progress').length;

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 flex items-center justify-center mx-auto shadow-md">
          <GraduationCap className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Authentication Required</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Please log in or register to access your personalized course roadmaps, saved courses, and certificate vault.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/login')}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all cursor-pointer"
          >
            Sign In / Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Greeting & Navigation Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome back, {user?.name.split(' ')[0] || 'Learner'} 👋
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold capitalize">
              {user?.role}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Targeting: <span className="font-semibold text-slate-800 dark:text-slate-200">{user?.careerGoals || 'Software Engineer'}</span> • {user?.weeklyLearningHours || 10} hrs/week
          </p>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'my-courses', label: `My Courses (${enrolled.length})`, icon: GraduationCap },
            { id: 'saved-courses', label: `Saved (${savedCourses.length})`, icon: Bookmark },
            { id: 'roadmap', label: 'AI Roadmap', icon: Map },
            { id: 'certificates', label: `Vault (${certificates.length})`, icon: Award },
            { id: 'progress', label: 'Analytics', icon: BarChart3 },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= TAB 1: OVERVIEW ================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 block">Courses Saved</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{savedCourses.length}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 block">In Progress</span>
              <p className="text-2xl font-black text-blue-600 mt-1">{inProgressCount}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 block">Completed</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">{completedCount}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 block">Certificates</span>
              <p className="text-2xl font-black text-violet-600 mt-1">{certificates.length}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 block">Hours Logged</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">42 hrs</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 block flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>Study Streak</span>
              </span>
              <p className="text-2xl font-black text-orange-500 mt-1">14 Days</p>
            </div>
          </div>

          {/* Active Roadmap Snapshot */}
          {activeRoadmap && (
            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-900/10 via-indigo-900/10 to-slate-900/10 border border-blue-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-600 text-white">
                    <Map className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      Active Career Roadmap: {activeRoadmap.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Target: {activeRoadmap.careerGoal} • {activeRoadmap.estimatedDuration}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{activeRoadmap.progress}% Complete</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('roadmap')}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
                  >
                    View All Milestones
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${activeRoadmap.progress}%` }}
                />
              </div>

              {/* Quick Task Checklist for Milestone 1 */}
              <div className="pt-2 space-y-2">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Upcoming Targets ({activeRoadmap.milestones[0]?.title})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeRoadmap.milestones[0]?.tasks.map(t => (
                    <div
                      key={t.id}
                      onClick={() => handleToggleTask(activeRoadmap.id, activeRoadmap.milestones[0].id, t.id)}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                        t.completed
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 line-through'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span className="truncate mr-2">{t.title}</span>
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${t.completed ? 'text-emerald-500' : 'text-slate-300'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Continue Learning Row */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Continue Learning
              </h3>
              <button
                onClick={() => navigate('/explore')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Explore More Courses
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {enrolled.map(item => (
                <div
                  key={item.courseId}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={getCourseThumbnail(item.course)}
                      alt={item.course.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                      onError={(e) => handleCourseImageError(e, item.course.categoryId, item.course.subcategoryId)}
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-blue-600 block truncate">
                        {item.course.providerName}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                        {item.course.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Status: <span className="font-semibold text-emerald-600">{item.status}</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                      <span>Progress</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => onSelectCourse(item.course)}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>Syllabus & Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={item.course.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 font-bold text-xs flex items-center gap-1"
                    >
                      <span>Go to Course</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: MY COURSES ================= */}
      {activeTab === 'my-courses' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              My Learning Collection ({enrolled.length})
            </h2>
            <button
              onClick={() => navigate('/explore')}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
            >
              + Find More Courses
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolled.map(item => (
              <div
                key={item.courseId}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
              >
                <div className="flex gap-4">
                  <img
                    src={getCourseThumbnail(item.course)}
                    alt={item.course.title}
                    className="w-24 h-24 rounded-2xl object-cover shrink-0"
                    onError={(e) => handleCourseImageError(e, item.course.categoryId, item.course.subcategoryId)}
                  />
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-blue-600">{item.course.providerName}</span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">{item.course.title}</h3>
                    <p className="text-xs text-slate-500">{item.course.duration} • {item.course.level}</p>
                  </div>
                </div>

                {/* Progress bar and update slider */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Study Progress:</span>
                    <span>{item.progress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={item.progress}
                    onChange={async (e) => {
                      const newProg = Number(e.target.value);
                      const status = newProg === 100 ? 'Completed' : 'In Progress';
                      await api.myCourses.updateProgress(item.courseId, newProg, status);
                      setEnrolled(prev => prev.map(p => p.courseId === item.courseId ? { ...p, progress: newProg, status } : p));
                      if (newProg === 100) confetti({ particleCount: 70, spread: 60 });
                    }}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => onSelectCourse(item.course)}
                    className="text-xs font-bold text-blue-600"
                  >
                    View Curriculum
                  </button>
                  <a
                    href={item.course.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <span>Open Provider</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: SAVED COURSES ================= */}
      {activeTab === 'saved-courses' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Saved & Bookmarked Courses ({savedCourses.length})
              </h2>
              <p className="text-xs text-slate-500">
                Courses you've bookmarked for future review or comparison
              </p>
            </div>
            <button
              onClick={() => navigate('/compare')}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs"
            >
              Open Comparison Matrix
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCourses.map(s => (
              <div
                key={s.courseId}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <img
                    src={getCourseThumbnail(s.course)}
                    alt={s.course.title}
                    className="w-full h-36 rounded-2xl object-cover"
                    onError={(e) => handleCourseImageError(e, s.course.categoryId, s.course.subcategoryId)}
                  />
                  <div>
                    <span className="text-xs font-bold text-blue-600">{s.course.providerName}</span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">{s.course.title}</h3>
                  </div>
                  {s.notes && (
                    <p className="text-xs italic text-slate-500 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl">
                      "{s.notes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => onSelectCourse(s.course)}
                    className="text-xs font-bold text-blue-600"
                  >
                    View Details
                  </button>
                  <button
                    onClick={async () => {
                      await api.savedCourses.toggle(s.courseId);
                      setSavedCourses(prev => prev.filter(c => c.courseId !== s.courseId));
                    }}
                    className="text-xs text-red-500 font-medium hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: PERSONALIZED ROADMAP ================= */}
      {activeTab === 'roadmap' && (
        <div className="space-y-8 animate-in fade-in">
          {/* AI Roadmap Generator Controls */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-violet-900/15 via-blue-900/10 to-slate-900/10 border border-violet-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-violet-600 text-white">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Intelligent Gemini Roadmap Generator
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Creates tailored milestones, weekly targets, and checkable tasks for your goal
                  </p>
                </div>
              </div>

              <button
                onClick={handleGenerateRoadmap}
                disabled={generatingRoadmap}
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-md shadow-violet-600/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{generatingRoadmap ? 'Generating with Gemini...' : 'Generate New AI Roadmap'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">Target Career</label>
                <input
                  type="text"
                  value={targetCareer}
                  onChange={(e) => setTargetCareer(e.target.value)}
                  className="mt-1 w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  placeholder="e.g. AI & Machine Learning Engineer"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">Weekly Hours Commitment</label>
                <select
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  className="mt-1 w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  <option value={5}>5 hours / week (Casual)</option>
                  <option value={10}>10 hours / week (Recommended standard)</option>
                  <option value={20}>20 hours / week (Intensive)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Roadmap View */}
          {activeRoadmap ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {activeRoadmap.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeRoadmap.description} • Total Progress: <span className="font-bold text-blue-600">{activeRoadmap.progress}%</span>
                  </p>
                </div>

                <div className="w-48 bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${activeRoadmap.progress}%` }}
                  />
                </div>
              </div>

              {/* Milestones Flow */}
              <div className="space-y-6">
                {activeRoadmap.milestones.map((m, mIdx) => (
                  <div
                    key={m.id}
                    className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                          {mIdx + 1}
                        </span>
                        <div>
                          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                            {m.title}
                          </h3>
                          <p className="text-xs text-slate-500">{m.description}</p>
                        </div>
                      </div>

                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 self-start sm:self-auto">
                        ~{m.estimatedWeeks} Weeks
                      </span>
                    </div>

                    {/* Linked Verified Courses */}
                    {m.courseLinks && m.courseLinks.length > 0 && (
                      <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-blue-900 dark:text-blue-200">
                            Core Course: {m.courseLinks[0].title} ({m.courseLinks[0].provider})
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            const found = enrolled.find(e => e.courseId === m.courseLinks![0].courseId)?.course;
                            if (found) onSelectCourse(found);
                            else navigate('/explore');
                          }}
                          className="font-bold text-blue-600 hover:underline"
                        >
                          View Details
                        </button>
                      </div>
                    )}

                    {/* Checkable Tasks */}
                    <div className="space-y-2 pt-2">
                      {m.tasks.map(t => (
                        <div
                          key={t.id}
                          onClick={() => handleToggleTask(activeRoadmap.id, m.id, t.id)}
                          className={`p-3.5 rounded-xl border text-xs font-medium flex items-center justify-between cursor-pointer transition-all ${
                            t.completed
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 line-through'
                              : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-blue-300'
                          }`}
                        >
                          <span>{t.title}</span>
                          <CheckCircle2 className={`w-4 h-4 shrink-0 ${t.completed ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500">No roadmaps created yet. Use the generator above!</p>
          )}
        </div>
      )}

      {/* ================= TAB 5: CERTIFICATE VAULT ================= */}
      {activeTab === 'certificates' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Certificate Vault</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 font-bold">
                  {certificates.length} Stored
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Organize, verify, and share your official achievements and certificates
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShareModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Public Portfolio</span>
              </button>

              <button
                onClick={() => setIsCertModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Upload / Record Certificate</span>
              </button>
            </div>
          </div>

          {/* Certificate Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map(cert => (
              <div
                key={cert.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{cert.status}</span>
                    </span>

                    <button
                      onClick={() => handleDeleteCert(cert.id)}
                      className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                      title="Delete certificate"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                      Issued by {cert.issuingOrganization}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[11px] text-slate-500 space-y-1">
                    <p>Date: <span className="font-semibold text-slate-700 dark:text-slate-300">{cert.issueDate}</span></p>
                    {cert.credentialId && (
                      <p>Credential ID: <span className="font-mono text-slate-700 dark:text-slate-300">{cert.credentialId}</span></p>
                    )}
                  </div>

                  {cert.skillsGained.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {cert.skillsGained.map(sk => (
                        <span key={sk} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {sk}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {cert.verificationUrl && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>Verify on Issuer Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 6: PROGRESS ANALYTICS ================= */}
      {activeTab === 'progress' && (
        <div className="space-y-6 animate-in fade-in">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Learning Analytics & Study Time
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Weekly Study Hours Logged
              </h3>
              <div className="h-44 flex items-end gap-3 pt-4">
                {[
                  { day: 'Mon', hrs: 2.5 },
                  { day: 'Tue', hrs: 1.5 },
                  { day: 'Wed', hrs: 3.0 },
                  { day: 'Thu', hrs: 2.0 },
                  { day: 'Fri', hrs: 4.0 },
                  { day: 'Sat', hrs: 5.5 },
                  { day: 'Sun', hrs: 3.5 }
                ].map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div
                      className="w-full bg-blue-600 rounded-t-lg transition-all"
                      style={{ height: `${(d.hrs / 6) * 100}%` }}
                    />
                    <span className="text-[10px] text-slate-500 font-bold">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Core Competencies Acquired
              </h3>
              <div className="space-y-3">
                {[
                  { skill: 'HTML5 & Responsive CSS', pct: 100 },
                  { skill: 'Computer Science Fundamentals (C, Logic)', pct: 75 },
                  { skill: 'Python Programming', pct: 60 },
                  { skill: 'Machine Learning & Math', pct: 35 }
                ].map(s => (
                  <div key={s.skill} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                      <span>{s.skill}</span>
                      <span>{s.pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 7: SETTINGS ================= */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 animate-in fade-in">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Student Profile & Preferences
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                onBlur={(e) => updateUser({ name: e.target.value })}
                className="mt-1 w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Career Goal</label>
              <input
                type="text"
                defaultValue={user?.careerGoals}
                onBlur={(e) => updateUser({ careerGoals: e.target.value })}
                className="mt-1 w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Weekly Learning Hours</label>
              <input
                type="number"
                defaultValue={user?.weeklyLearningHours || 10}
                onBlur={(e) => updateUser({ weeklyLearningHours: Number(e.target.value) })}
                className="mt-1 w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal: Upload / Record Certificate */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Record / Upload Verified Certificate
            </h3>

            <form onSubmit={handleAddCertificate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Certificate Title</label>
                <input
                  type="text"
                  required
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  placeholder="e.g. Responsive Web Design Certification"
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Issuing Organization</label>
                <input
                  type="text"
                  required
                  value={newCert.issuingOrganization}
                  onChange={(e) => setNewCert({ ...newCert, issuingOrganization: e.target.value })}
                  placeholder="e.g. freeCodeCamp, Harvard, Google, Coursera"
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Public Verification URL</label>
                <input
                  type="url"
                  value={newCert.verificationUrl}
                  onChange={(e) => setNewCert({ ...newCert, verificationUrl: e.target.value })}
                  placeholder="https://www.freecodecamp.org/certification/..."
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Skills Gained (comma separated)</label>
                <input
                  type="text"
                  value={newCert.skillsGained}
                  onChange={(e) => setNewCert({ ...newCert, skillsGained: e.target.value })}
                  placeholder="HTML5, CSS3, Flexbox, Git"
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Share Public Portfolio */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
              <Share2 className="w-6 h-6" />
            </div>

            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Public Verified Portfolio Link
            </h3>

            <p className="text-xs text-slate-500">
              Share your verifiable certificate achievements with recruiters and peers.
            </p>

            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 break-all select-all">
              {window.location.origin}/portfolio/{user?.id || 'user-demo-student'}
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/portfolio/${user?.id || 'user-demo-student'}`);
                setCopiedPortfolio(true);
                setTimeout(() => setCopiedPortfolio(false), 2000);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
            >
              {copiedPortfolio ? 'Copied to Clipboard!' : 'Copy Portfolio Link'}
            </button>

            <button
              onClick={() => setShareModalOpen(false)}
              className="w-full py-2 rounded-xl text-xs text-slate-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

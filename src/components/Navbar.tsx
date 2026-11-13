import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  Compass,
  GraduationCap,
  Sparkles,
  Briefcase,
  Layers,
  Building2,
  Scale,
  Sun,
  Moon,
  User as UserIcon,
  Menu,
  X,
  Bookmark,
  ShieldCheck,
  Award,
  ChevronDown,
  LogOut,
  Settings,
  Zap
} from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  navigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, navigate }) => {
  const { user, logout, currency, setCurrency, theme, toggleTheme, compareCoursesList, login } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD'];

  const navLinks = [
    { label: 'Home', route: '/', icon: Home },
    { label: 'Explore', route: '/explore', icon: Compass },
    { label: 'Skills', route: '/skills', icon: Zap },
    { label: 'Categories', route: '/categories', icon: Layers },
    { label: 'Providers', route: '/providers', icon: Building2, badge: '34' },
    { label: 'AI Mentor', route: '/mentor', icon: Sparkles, badge: 'Gemini' },
    { label: 'Careers', route: '/careers', icon: Briefcase },
    { label: 'Compare', route: '/compare', icon: Scale, count: compareCoursesList.length }
  ];

  const handleNav = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  CourseMentor
                </span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-md bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-xs">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block tracking-wide">
                GLOBAL LEARNING ECOSYSTEM
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNav(item.route)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="text-xs font-semibold px-1.5 py-0.2 rounded-full bg-blue-600 text-white">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions & User Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                title="Select Currency"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1 z-50 animate-in fade-in zoom-in-95">
                  {currencies.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 ${
                        currency === c ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-950/30' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* User Account / Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 bg-slate-50/50 dark:bg-slate-800/50 transition-all"
                >
                  <img
                    src={user.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-blue-500/30"
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">
                      {user.role}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold capitalize">
                          {user.role} Mode
                        </span>
                        {user.role === 'admin' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                            Verified Admin
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleNav('/dashboard')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
                    >
                      <UserIcon className="w-4 h-4 text-blue-500" />
                      Student Dashboard
                    </button>

                    <button
                      onClick={() => handleNav('/dashboard?tab=my-courses')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
                    >
                      <GraduationCap className="w-4 h-4 text-indigo-500" />
                      My Learning Collection
                    </button>

                    <button
                      onClick={() => handleNav('/dashboard?tab=saved-courses')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
                    >
                      <Bookmark className="w-4 h-4 text-amber-500" />
                      Saved Courses
                    </button>

                    <button
                      onClick={() => handleNav('/dashboard?tab=certificates')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
                    >
                      <Award className="w-4 h-4 text-emerald-500" />
                      Certificate Vault
                    </button>

                    <button
                      onClick={() => handleNav('/dashboard?tab=settings')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      Profile & Settings
                    </button>

                    {/* Quick Demo Switcher */}
                    <div className="pt-1 mt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => {
                          const targetRole = user.role === 'admin' ? 'student' : 'admin';
                          login(targetRole === 'admin' ? 'admin@coursementor.ai' : 'alex.student@coursementor.ai', 'password', targetRole);
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 rounded-lg transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4" />
                          Switch to {user.role === 'admin' ? 'Student' : 'Admin'} Mode
                        </span>
                      </button>

                      {user.role === 'admin' && (
                        <button
                          onClick={() => handleNav('/admin')}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors text-left"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          Open Admin Portal
                        </button>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                          handleNav('/');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('/login')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNav('/register')}
                  className="px-4 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNav(item.route)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Currency:</span>
            <div className="flex items-center gap-1">
              {currencies.map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`text-xs px-2 py-1 rounded font-semibold ${
                    currency === c ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

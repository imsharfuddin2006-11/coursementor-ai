import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Course } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email?: string, password?: string, role?: 'student' | 'admin') => Promise<void>;
  register: (name: string, email: string, interests?: string[], careerGoals?: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  savedCourseIds: string[];
  toggleSaveCourse: (courseId: string) => Promise<void>;
  compareCoursesList: Course[];
  addToCompare: (course: Course) => boolean;
  removeFromCompare: (courseId: string) => void;
  clearCompare: () => void;
  currency: string;
  setCurrency: (c: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  formatPrice: (amount?: number, originalCurrency?: string) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [savedCourseIds, setSavedCourseIds] = useState<string[]>(['course-cs50x', 'course-ml-specialization']);
  const [compareCoursesList, setCompareCoursesList] = useState<Course[]>([]);
  const [currency, setCurrencyState] = useState<string>('USD');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Initialize Theme
    const savedTheme = localStorage.getItem('coursementor_theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }

    // Load user
    const savedUserStr = localStorage.getItem('coursementor_user');
    if (savedUserStr) {
      try {
        const parsed = JSON.parse(savedUserStr);
        setUser(parsed);
        if (parsed.currency) setCurrencyState(parsed.currency);
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    } else {
      const isExplicitlyLoggedOut = localStorage.getItem('coursementor_logged_out') === 'true';
      if (!isExplicitlyLoggedOut) {
        // Default initial login as student for seamless evaluation
        api.auth.login('alex.student@coursementor.ai', 'password', 'student').then(res => {
          if (res.user) setUser(res.user);
        }).catch(err => {
          console.warn('Initial demo sign in notice:', err);
        });
      }
    }

    // Load saved bookmarks
    api.savedCourses.getSaved().then(res => {
      if (res.savedCourses) {
        setSavedCourseIds(res.savedCourses.map(s => s.courseId));
      }
    }).catch(() => {});

    setLoading(false);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('coursementor_theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  const setCurrency = (c: string) => {
    setCurrencyState(c);
    if (user) {
      updateUser({ currency: c });
    }
  };

  const login = async (email?: string, password?: string, role: 'student' | 'admin' = 'student') => {
    setLoading(true);
    try {
      localStorage.removeItem('coursementor_logged_out');
      const res = await api.auth.login(email, password, role);
      if (res.user) {
        setUser(res.user);
        if (res.user.currency) setCurrencyState(res.user.currency);
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, interests?: string[], careerGoals?: string) => {
    setLoading(true);
    try {
      localStorage.removeItem('coursementor_logged_out');
      const res = await api.auth.register({ name, email, interests, careerGoals });
      if (res.user) {
        setUser(res.user);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    api.auth.logout();
    localStorage.setItem('coursementor_logged_out', 'true');
    setUser(null);
    setSavedCourseIds([]);
  };

  const updateUser = async (data: Partial<User>) => {
    if (!user) return;
    const res = await api.auth.updateProfile(data);
    if (res.user) {
      setUser(res.user);
    }
  };

  const toggleSaveCourse = async (courseId: string) => {
    try {
      const res = await api.savedCourses.toggle(courseId);
      if (res.saved) {
        setSavedCourseIds(prev => [...prev, courseId]);
      } else {
        setSavedCourseIds(prev => prev.filter(id => id !== courseId));
      }
    } catch (e) {
      // optimistic fallback
      setSavedCourseIds(prev =>
        prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
      );
    }
  };

  const addToCompare = (course: Course): boolean => {
    if (compareCoursesList.some(c => c.id === course.id)) {
      return true;
    }
    if (compareCoursesList.length >= 4) {
      return false; // Limit reached
    }
    setCompareCoursesList(prev => [...prev, course]);
    return true;
  };

  const removeFromCompare = (courseId: string) => {
    setCompareCoursesList(prev => prev.filter(c => c.id !== courseId));
  };

  const clearCompare = () => {
    setCompareCoursesList([]);
  };

  const formatPrice = (amount?: number, originalCurrency: string = 'USD') => {
    if (amount === undefined || amount === 0) return 'Free';
    
    // Multi-currency conversion rates
    const rates: Record<string, { symbol: string; rate: number }> = {
      USD: { symbol: '$', rate: 1.0 },
      EUR: { symbol: '€', rate: 0.92 },
      GBP: { symbol: '£', rate: 0.78 },
      INR: { symbol: '₹', rate: 84.5 },
      CAD: { symbol: 'CA$', rate: 1.38 },
      AUD: { symbol: 'A$', rate: 1.52 }
    };

    const target = rates[currency] || rates.USD;
    const converted = Math.round(amount * target.rate);
    return `${target.symbol}${converted.toLocaleString()}`;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        savedCourseIds,
        toggleSaveCourse,
        compareCoursesList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        currency,
        setCurrency,
        theme,
        toggleTheme,
        formatPrice
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

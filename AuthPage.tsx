import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  ShieldCheck,
  User as UserIcon,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'login' | 'register' | 'forgot-password';
  navigate: (route: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login', navigate }) => {
  const { login, register, loading } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot-password'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [careerGoals, setCareerGoals] = useState('AI & Machine Learning Engineer');
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        const detectedRole = email.toLowerCase().includes('admin') ? 'admin' : 'student';
        await login(email, password, detectedRole);
        if (detectedRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else if (mode === 'register') {
        await register(name, email, ['AI', 'Computer Science'], careerGoals);
        navigate('/dashboard');
      } else {
        setResetSent(true);
      }
    } catch (err: any) {
      setError('Unable to authenticate. Please check your credentials or use 1-click demo login.');
    }
  };

  const handleDemoLogin = async (role: 'student' | 'admin') => {
    const demoEmail = role === 'admin' ? 'admin@coursementor.ai' : 'alex.student@coursementor.ai';
    await login(demoEmail, 'password', role);
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div
            onClick={() => navigate('/')}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg mx-auto cursor-pointer"
          >
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {mode === 'login' ? 'Sign in to CourseMentor AI' : mode === 'register' ? 'Create Your Learner Account' : 'Recover Your Password'}
          </h2>
          <p className="text-xs text-slate-500">
            {mode === 'login'
              ? 'Access your saved courses, custom roadmaps, and certificate vault'
              : mode === 'register'
              ? 'Join a global community of purpose-driven students and professionals'
              : 'Enter your email to receive password reset instructions'}
          </p>
        </div>

        {/* 1-Click Quick Demo Evaluation Bar */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 border border-blue-200 dark:border-slate-700 space-y-2 text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Instant 1-Click Demo Evaluation:</span>
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoLogin('student')}
              className="py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-blue-300 dark:border-slate-600 font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Demo Student</span>
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              className="py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-slate-600 font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Demo Admin</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 text-xs font-semibold">
              {error}
            </div>
          )}

          {resetSent ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Reset Email Dispatched</h3>
              <p className="text-xs text-slate-500">
                If an account exists for {email}, password recovery instructions have been sent.
              </p>
              <button
                onClick={() => { setResetSent(false); setMode('login'); }}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {mode === 'register' && (
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Johnson"
                    className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                <div className="relative mt-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {mode !== 'forgot-password' && (
                <div>
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 dark:text-slate-300">Password</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot-password')}
                        className="text-[11px] text-blue-600 hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative mt-1">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {mode === 'register' && (
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Primary Career Goal</label>
                  <input
                    type="text"
                    value={careerGoals}
                    onChange={(e) => setCareerGoals(e.target.value)}
                    placeholder="e.g. AI Engineer, Full Stack Dev"
                    className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Mode Switcher Footer */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
            {mode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="font-bold text-blue-600 hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="font-bold text-blue-600 hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

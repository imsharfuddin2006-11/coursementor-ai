import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Course } from '../types';
import {
  Sparkles,
  Send,
  Bot,
  User as UserIcon,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Info,
  AlertCircle
} from 'lucide-react';
import { getCourseThumbnail, handleCourseImageError } from '../utils/courseImages';

interface MentorPageProps {
  onSelectCourse: (course: Course) => void;
  navigate: (route: string) => void;
}

interface MessageItem {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  recommendedCourses?: Course[];
  suggestedNextTopics?: string[];
  isError?: boolean;
  failedQuery?: string;
}

export const MentorPage: React.FC<MentorPageProps> = ({ onSelectCourse, navigate }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Student Profile Context for Mentor
  const [userGoal, setUserGoal] = useState<string>(user?.careerGoals || 'AI & Machine Learning Engineer');
  const [userLevel, setUserLevel] = useState<string>(user?.experienceLevel || 'Beginner');

  useEffect(() => {
    // Load courses to resolve recommendedCourseIds
    api.courses.getCourses().then(res => {
      setAllCourses(res.courses || []);
    });

    // Initial welcoming message
    const initialWelcome: MessageItem = {
      id: 'msg-welcome',
      role: 'assistant',
      content: `Hello ${user ? user.name.split(' ')[0] : 'there'}! I am **CourseMentor AI Assistant**, your personal educational advisor.

Whether you're breaking into tech with zero background, comparing verified universities, or targeting a high-demand career like **${userGoal}**, I am here to guide you step-by-step.

Here is what we can do together:
1. Identify your exact starting point and weekly schedule
2. Recommend vetted, high-rigor courses from Harvard, DeepLearning.AI, Google, and MIT
3. Separate genuinely free certificates from free video audits
4. Build a personalized week-by-week learning roadmap

What would you like to explore today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedNextTopics: [
        'I want to become an AI engineer but I have zero coding experience',
        'Which courses give genuinely free verified certificates?',
        'Compare Harvard CS50 vs freeCodeCamp',
        'Create a 6-month study plan for 10 hours/week'
      ]
    };

    setMessages([initialWelcome]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    // Remove any trailing error bubble if retrying
    setMessages(prev => {
      const filtered = prev.filter(m => !(m.isError && m.failedQuery === query));
      const isAlreadyLastUserMsg = filtered[filtered.length - 1]?.role === 'user' && filtered[filtered.length - 1]?.content === query;
      if (isAlreadyLastUserMsg) {
        return filtered;
      }
      const userMsg: MessageItem = {
        id: `msg-${Date.now()}`,
        role: 'user',
        content: query,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      return [...filtered, userMsg];
    });

    setInput('');
    setLoading(true);

    try {
      const historyPayload = messages
        .filter(m => !m.isError)
        .map(m => ({ role: m.role, content: m.content }));

      const response = await api.ai.chat(query, historyPayload, userGoal, userLevel);

      // Map course IDs to real course objects
      const matchedCourses = (response.recommendedCourseIds || []).map((id: string) =>
        allCourses.find(c => c.id === id)
      ).filter(Boolean) as Course[];

      const assistantMsg: MessageItem = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedCourses: matchedCourses,
        suggestedNextTopics: response.suggestedNextTopics || []
      };

      setMessages(prev => [...prev.filter(m => !(m.isError && m.failedQuery === query)), assistantMsg]);
    } catch (err: any) {
      console.error('[CourseMentor AI] Mentor chat error:', err);
      const errorMessageText = err?.message || 'Unable to connect to mentor service. Please try again.';
      const errorMsg: MessageItem = {
        id: `msg-err-${Date.now()}`,
        role: 'assistant',
        content: `I could not complete your request: ${errorMessageText}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
        failedQuery: query
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: 'Conversation cleared. How can I guide your learning goals today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedNextTopics: [
          'Show me verified beginner courses',
          'Explain how free audits work',
          'Create a 3-month roadmap'
        ]
      }
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
        {/* Left Sidebar: Student Context & Prompt Templates */}
        <aside className="lg:col-span-4 flex flex-col justify-between p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-y-auto space-y-6">
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-blue-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  CourseMentor AI
                </h2>
                <p className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Powered by Gemini 3.8 Flash
                </p>
              </div>
            </div>

            {/* Mentor Context Settings */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Your Mentor Context
                </span>
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 font-semibold">Career Aspiration</label>
                <select
                  value={userGoal}
                  onChange={(e) => setUserGoal(e.target.value)}
                  className="mt-1 w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
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
                <label className="text-[10px] text-slate-500 font-semibold">Your Experience Level</label>
                <select
                  value={userLevel}
                  onChange={(e) => setUserLevel(e.target.value)}
                  className="mt-1 w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                >
                  <option value="Beginner">Beginner (Zero coding background)</option>
                  <option value="Intermediate">Intermediate (Some programming)</option>
                  <option value="Advanced">Advanced (Working professional)</option>
                </select>
              </div>
            </div>

            {/* Quick Prompt Ideas */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Common Learner Inquiries
              </span>

              <div className="space-y-1.5">
                {[
                  "I want to become an AI engineer but I don't know programming",
                  "Which courses give genuinely free verified certificates?",
                  "Compare Harvard CS50 vs freeCodeCamp",
                  "Explain the math needed for machine learning without panic",
                  "What are the best free courses for SQL & Data Analysis?"
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    className="w-full text-left p-2.5 rounded-xl text-xs font-medium bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800 leading-snug"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Navigation to Ecosystem */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Ecosystem Directories
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => navigate('/skills')}
                  className="p-2 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition-colors text-center border border-blue-200 dark:border-blue-800"
                >
                  Skills Explorer
                </button>
                <button
                  onClick={() => navigate('/careers')}
                  className="p-2 rounded-xl text-xs font-semibold bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 hover:bg-violet-100 transition-colors text-center border border-violet-200 dark:border-violet-800"
                >
                  Career Paths
                </button>
              </div>
            </div>
          </div>

          {/* Reset / Clear Button */}
          <button
            onClick={clearChat}
            className="w-full py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Conversation</span>
          </button>
        </aside>

        {/* Right Main Chat Column */}
        <main className="lg:col-span-8 flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Chat Messages Log */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`space-y-3 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {/* Message Bubble */}
                  <div
                    className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-xs'
                        : msg.isError
                        ? 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 rounded-tl-xs border border-red-200 dark:border-red-800/60'
                        : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/60 dark:border-slate-700/60'
                    }`}
                  >
                    {msg.isError && (
                      <div className="flex items-center gap-2 mb-2 font-semibold text-red-600 dark:text-red-400">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Request Notice</span>
                      </div>
                    )}
                    {msg.content}

                    {/* Retry button on error */}
                    {msg.isError && msg.failedQuery && (
                      <div className="mt-3 pt-2 border-t border-red-200/60 dark:border-red-800/40 flex items-center gap-3">
                        <button
                          onClick={() => handleSendMessage(msg.failedQuery)}
                          disabled={loading}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Retry Request</span>
                        </button>
                        <span className="text-[11px] text-red-500/80">
                          Click to resend query
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Embedded Course Recommendation Cards (if any) */}
                  {msg.recommendedCourses && msg.recommendedCourses.length > 0 && (
                    <div className="space-y-2 pt-1 w-full">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                        <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                        <span>Recommended Verified Courses:</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {msg.recommendedCourses.map((c) => (
                          <div
                            key={c.id}
                            onClick={() => onSelectCourse(c)}
                            className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs hover:shadow-md transition-all cursor-pointer flex gap-3 group"
                          >
                            <img
                              src={getCourseThumbnail(c)}
                              alt={c.title}
                              className="w-16 h-16 rounded-xl object-cover shrink-0"
                              onError={(e) => handleCourseImageError(e, c.categoryId, c.subcategoryId)}
                            />
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <div>
                                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 block truncate">
                                  {c.providerName}
                                </span>
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                                  {c.title}
                                </h4>
                              </div>

                              <div className="flex items-center justify-between text-[10px] text-slate-500">
                                <span>{c.pricing.isFree ? '100% Free' : c.pricing.freeAuditAvailable ? 'Free Audit' : `$${c.pricing.discountPrice || c.pricing.originalPrice}`}</span>
                                <span className="text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform">
                                  View Details →
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggested Next Topic Pills */}
                  {msg.suggestedNextTopics && msg.suggestedNextTopics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestedNextTopics.map((topic) => (
                        <button
                          key={topic}
                          onClick={() => handleSendMessage(topic)}
                          disabled={loading}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/60 hover:bg-violet-100 transition-colors disabled:opacity-40"
                        >
                          → {topic}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Timestamp & Copy row */}
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 px-1">
                    <span>{msg.timestamp}</span>
                    {msg.role === 'assistant' && !msg.isError && (
                      <button
                        onClick={() => copyToClipboard(msg.content, msg.id)}
                        className="hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-1 cursor-pointer"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-500">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 justify-start animate-fade-in">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800/90 rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-3 border border-slate-200/60 dark:border-slate-700/60 shadow-xs">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-violet-600 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    Consulting curriculum database & formulating guidance...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={loading}
                rows={1}
                placeholder={loading ? "CourseMentor AI is consulting database..." : "Ask about courses, career transitions, roadmaps, or free certificates..."}
                className="w-full pl-4 pr-12 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-none shadow-xs disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="absolute right-2 p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 transition-colors cursor-pointer"
                title={loading ? "Request is in progress..." : "Send message"}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              CourseMentor AI strictly references verified academic and provider data. Never claims to issue third-party degrees.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

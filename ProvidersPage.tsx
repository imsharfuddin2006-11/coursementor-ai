import React, { useState, useEffect } from 'react';
import { Provider } from '../types';
import { api } from '../services/api';
import {
  Search,
  Building2,
  ExternalLink,
  ShieldCheck,
  Award,
  CheckCircle2,
  BookOpen,
  Filter,
  Sparkles,
  ArrowRight,
  Globe2,
  GraduationCap
} from 'lucide-react';
import { handleProviderLogoError } from '../utils/courseImages';

interface ProvidersPageProps {
  navigate: (route: string) => void;
}

export const ProvidersPage: React.FC<ProvidersPageProps> = ({ navigate }) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [categoryType, setCategoryType] = useState<string>('all');
  const [domainFilter, setDomainFilter] = useState<string>('all');
  const [freeLearningOnly, setFreeLearningOnly] = useState<boolean>(false);
  const [freeCertOnly, setFreeCertOnly] = useState<boolean>(false);

  useEffect(() => {
    loadProviders();
  }, [categoryType, domainFilter, freeLearningOnly, freeCertOnly]);

  const loadProviders = async () => {
    setLoading(true);
    try {
      const res = await api.providers.getProviders({
        categoryType: categoryType !== 'all' ? categoryType : undefined,
        domain: domainFilter !== 'all' ? domainFilter : undefined,
        freeLearning: freeLearningOnly ? 'true' : undefined,
        freeCert: freeCertOnly ? 'true' : undefined
      });
      setProviders(res.providers || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredProviders = providers.filter(p => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.learningDomains.some(d => d.toLowerCase().includes(q)) ||
      (p.headquarters || '').toLowerCase().includes(q)
    );
  });

  const domainsList = [
    'All',
    'Computer Science',
    'AI & ML',
    'Cybersecurity',
    'Cloud Computing',
    'Data Science',
    'Web Development',
    'Networking',
    'Business',
    'Engineering'
  ];

  const typesList = [
    { label: 'All Providers', value: 'all' },
    { label: 'Global Platforms', value: 'Global Platform' },
    { label: 'Tech & Professional', value: 'Tech & Professional' },
    { label: 'India & International', value: 'India & International' },
    { label: 'Universities & Open', value: 'University & Open' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-xs">
          <Globe2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Global Learning Provider Ecosystem</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Verified Learning Providers & Platforms
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Discover vetted global education platforms, tech giant academies, university open-courseware, and national initiatives. Compare honest pricing, free auditing terms, and official verified certificates.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by provider name, skill domain, or headquarters (e.g. Harvard, Cisco, AWS, NPTEL, Coursera)..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories Tab pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Ecosystem:
          </span>
          {typesList.map((t) => (
            <button
              key={t.value}
              onClick={() => setCategoryType(t.value)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                categoryType === t.value
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Secondary filters: Domains and Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Domain Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">Domain:</span>
            {domainsList.map((d) => (
              <button
                key={d}
                onClick={() => setDomainFilter(d === 'All' ? 'all' : d)}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  (domainFilter === 'all' && d === 'All') || domainFilter === d
                    ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Quick Toggles */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={freeLearningOnly}
                onChange={(e) => setFreeLearningOnly(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>Free Learning Available</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={freeCertOnly}
                onChange={(e) => setFreeCertOnly(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>Free Certificates</span>
            </label>
          </div>
        </div>
      </div>

      {/* Directory Count */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <p>Showing {filteredProviders.length} verified learning providers</p>
        <p className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          Every official link & certificate term verified
        </p>
      </div>

      {/* Providers Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : filteredProviders.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <Building2 className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No providers found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords or clearing your domain and category filters.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setCategoryType('all');
              setDomainFilter('all');
              setFreeLearningOnly(false);
              setFreeCertOnly(false);
            }}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((prov) => (
            <div
              key={prov.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Top Badge & Logo Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={prov.logoUrl}
                      alt={prov.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs group-hover:scale-105 transition-transform"
                      onError={(e) => handleProviderLogoError(e, prov.id)}
                    />
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">
                        {prov.name}
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-500 block">
                        {prov.categoryType}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {prov.description}
                </p>

                {/* Learning Domains Chips */}
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Key Domains:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {prov.learningDomains.slice(0, 4).map(d => (
                      <span key={d} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        {d}
                      </span>
                    ))}
                    {prov.learningDomains.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800/60 text-slate-400">
                        +{prov.learningDomains.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing and Certificate Conditions Badge */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Learning Cost:</span>
                    <span className={`font-bold ${prov.isFreeLearningAvailable ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                      {prov.isFreeLearningAvailable ? 'Free Access / Audit' : 'Paid Subscription'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Certificates:</span>
                    <span className={`font-bold ${prov.hasFreeCertificates ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {prov.hasFreeCertificates ? 'Free Certificate Available' : 'Paid Upgrade / Exam'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight pt-1 border-t border-slate-200/60 dark:border-slate-700/60 line-clamp-1">
                    {prov.certificateConditions}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <a
                  href={prov.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
                  title="Visit official website"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Official Portal</span>
                </a>

                <button
                  onClick={() => navigate(`/providers/${prov.slug}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

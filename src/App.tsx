import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CompareTray } from './components/CompareTray';
import { Course } from './types';

// Pages
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { MentorPage } from './pages/MentorPage';
import { CareersPage } from './pages/CareersPage';
import { CareerDetailPage } from './pages/CareerDetailPage';
import { ComparePage } from './pages/ComparePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { ProvidersPage } from './pages/ProvidersPage';
import { ProviderDetailPage } from './pages/ProviderDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { SkillsPage } from './pages/SkillsPage';
import { SkillDetailPage } from './pages/SkillDetailPage';

function AppContent() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null);
  const [exploreParams, setExploreParams] = useState<{
    search?: string;
    category?: string;
    pricing?: string;
    freeCertificate?: string;
  }>({});

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      parseAndSetRoute(path);
    };

    window.addEventListener('popstate', handlePopState);
    parseAndSetRoute(window.location.pathname || '/');

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const parseAndSetRoute = (pathWithSearch: string) => {
    const [path, search] = pathWithSearch.split('?');
    setCurrentRoute(path);

    if (search) {
      const urlParams = new URLSearchParams(search);
      setExploreParams({
        search: urlParams.get('search') || undefined,
        category: urlParams.get('category') || undefined,
        pricing: urlParams.get('pricing') || undefined,
        freeCertificate: urlParams.get('freeCertificate') || undefined
      });
    }

    if (path.startsWith('/courses/')) {
      const id = path.replace('/courses/', '');
      setSelectedCourseId(id);
    } else {
      setSelectedCourseId(null);
    }

    if (path.startsWith('/careers/')) {
      const id = path.replace('/careers/', '');
      setSelectedCareerId(id);
    } else {
      setSelectedCareerId(null);
    }
  };

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    parseAndSetRoute(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourseId(course.id);
    navigate(`/courses/${course.id}`);
  };

  const handleSelectCareer = (careerId: string) => {
    setSelectedCareerId(careerId);
    navigate(`/careers/${careerId}`);
  };

  const renderCurrentPage = () => {
    // 1. Course Details Page
    if (currentRoute.startsWith('/courses/') || selectedCourseId) {
      const courseId = selectedCourseId || currentRoute.replace('/courses/', '');
      return (
        <CourseDetailPage
          courseId={courseId}
          onBack={() => navigate('/explore')}
          onSelectCourse={handleSelectCourse}
          navigate={navigate}
        />
      );
    }

    // 2. Career Details Page
    if (currentRoute.startsWith('/careers/') && currentRoute !== '/careers') {
      const careerId = selectedCareerId || currentRoute.replace('/careers/', '');
      return (
        <CareerDetailPage
          careerId={careerId}
          onBack={() => navigate('/careers')}
          onSelectCourse={handleSelectCourse}
          navigate={navigate}
        />
      );
    }

    // 3. Provider Details Page
    if (currentRoute.startsWith('/providers/') && currentRoute !== '/providers') {
      const providerSlug = currentRoute.replace('/providers/', '');
      return (
        <ProviderDetailPage
          providerSlugOrId={providerSlug}
          onBack={() => navigate('/providers')}
          onSelectCourse={handleSelectCourse}
          navigate={navigate}
        />
      );
    }

    // 4. Category Details Page
    if (currentRoute.startsWith('/categories/') && currentRoute !== '/categories') {
      const categorySlug = currentRoute.replace('/categories/', '');
      return (
        <CategoryDetailPage
          categorySlugOrId={categorySlug}
          onBack={() => navigate('/categories')}
          onSelectCourse={handleSelectCourse}
          navigate={navigate}
        />
      );
    }

    // 5. Skill Details Page
    if (currentRoute.startsWith('/skills/') && currentRoute !== '/skills') {
      const skillSlug = currentRoute.replace('/skills/', '');
      return (
        <SkillDetailPage
          skillSlugOrId={skillSlug}
          onBack={() => navigate('/skills')}
          onSelectCourse={handleSelectCourse}
          navigate={navigate}
        />
      );
    }

    // 6. Dashboard Routes (supports /dashboard, /dashboard/my-courses, /dashboard/roadmap, etc.)
    if (currentRoute.startsWith('/dashboard')) {
      const sub = currentRoute.replace('/dashboard', '').replace(/^\//, '');
      const initialTab = sub || 'overview';
      return (
        <DashboardPage
          initialTab={initialTab}
          onSelectCourse={handleSelectCourse}
          navigate={navigate}
        />
      );
    }

    // 7. Admin Routes (supports /admin, /admin/courses, /admin/providers, etc.)
    if (currentRoute.startsWith('/admin')) {
      return <AdminPage navigate={navigate} />;
    }

    // 8. Main Routes
    switch (currentRoute) {
      case '/skills':
        return <SkillsPage navigate={navigate} />;
      case '/explore':
        return (
          <ExplorePage
            initialSearch={exploreParams.search}
            initialCategory={exploreParams.category}
            initialPricing={exploreParams.pricing}
            initialFreeCert={exploreParams.freeCertificate}
            onSelectCourse={handleSelectCourse}
            navigate={navigate}
          />
        );

      case '/mentor':
        return (
          <MentorPage
            onSelectCourse={handleSelectCourse}
            navigate={navigate}
          />
        );

      case '/careers':
        return (
          <CareersPage
            onSelectCareer={handleSelectCareer}
            navigate={navigate}
          />
        );

      case '/compare':
        return (
          <ComparePage
            onSelectCourse={handleSelectCourse}
            navigate={navigate}
          />
        );

      case '/providers':
        return <ProvidersPage navigate={navigate} />;

      case '/categories':
        return <CategoriesPage navigate={navigate} />;

      case '/about':
        return <AboutPage navigate={navigate} />;

      case '/contact':
        return <ContactPage navigate={navigate} />;

      case '/faq':
        return <FAQPage navigate={navigate} />;

      case '/login':
        return <AuthPage initialMode="login" navigate={navigate} />;

      case '/register':
        return <AuthPage initialMode="register" navigate={navigate} />;

      case '/forgot-password':
        return <AuthPage initialMode="forgot-password" navigate={navigate} />;

      case '/':
      default:
        return (
          <HomePage
            navigate={navigate}
            onSelectCourse={handleSelectCourse}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar currentRoute={currentRoute} navigate={navigate} />

      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      <Footer navigate={navigate} />
      <CompareTray navigate={navigate} />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

import { Course, Category, Provider, Career, Skill, User, Roadmap, CertificateRecord, SavedCourse, EnrolledCourse } from '../types';

const API_BASE = '/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('coursementor_token');
  const userStr = localStorage.getItem('coursementor_user');
  let userId = 'user-demo-student';
  if (userStr) {
    try {
      const u = JSON.parse(userStr);
      if (u.id) userId = u.id;
    } catch (e) {
      // ignore
    }
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'x-user-id': userId
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

export const api = {
  // Authentication
  auth: {
    async login(email?: string, password?: string, role: 'student' | 'admin' = 'student') {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      const data = await res.json();
      if (data.token && data.user) {
        localStorage.setItem('coursementor_token', data.token);
        localStorage.setItem('coursementor_user', JSON.stringify(data.user));
      }
      return data;
    },

    async register(userData: { name: string; email: string; interests?: string[]; careerGoals?: string }) {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (data.token && data.user) {
        localStorage.setItem('coursementor_token', data.token);
        localStorage.setItem('coursementor_user', JSON.stringify(data.user));
      }
      return data;
    },

    async getMe(): Promise<{ user: User }> {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders()
      });
      return res.json();
    },

    async updateProfile(profileData: Partial<User>): Promise<{ success: boolean; user: User }> {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
      });
      const data = await res.json();
      if (data.user) {
        localStorage.setItem('coursementor_user', JSON.stringify(data.user));
      }
      return data;
    },

    logout() {
      localStorage.removeItem('coursementor_token');
      localStorage.removeItem('coursementor_user');
    }
  },

  // Courses
  courses: {
    async getCourses(params?: {
      search?: string;
      view?: string;
      category?: string;
      subcategory?: string;
      provider?: string;
      level?: string;
      pricing?: string;
      freeCertificate?: string;
      duration?: string;
      format?: string;
      minRating?: string;
      sort?: string;
    }): Promise<{ courses: Course[]; total: number }> {
      const searchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          if (v && v !== 'all') searchParams.append(k, v);
        });
      }
      const res = await fetch(`${API_BASE}/courses?${searchParams.toString()}`);
      return res.json();
    },

    async getCourse(id: string): Promise<{ course: Course; related: Course[] }> {
      const res = await fetch(`${API_BASE}/courses/${id}`);
      return res.json();
    },

    async createCourse(course: Partial<Course>): Promise<{ success: boolean; course: Course }> {
      const res = await fetch(`${API_BASE}/courses`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(course)
      });
      return res.json();
    },

    async updateCourse(id: string, course: Partial<Course>): Promise<{ success: boolean; course: Course }> {
      const res = await fetch(`${API_BASE}/courses/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(course)
      });
      return res.json();
    },

    async deleteCourse(id: string): Promise<{ success: boolean }> {
      const res = await fetch(`${API_BASE}/courses/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    }
  },

  // Categories & Sub-Categories
  categories: {
    async getCategories(): Promise<{ categories: Category[] }> {
      const res = await fetch(`${API_BASE}/categories`);
      return res.json();
    },

    async getCategory(id: string): Promise<{ category: Category; courses: Course[]; providers: Provider[]; subcategories: any[] }> {
      const res = await fetch(`${API_BASE}/categories/${id}`);
      return res.json();
    },

    async createCategory(categoryData: Partial<Category>): Promise<{ success: boolean; category: Category }> {
      const res = await fetch(`${API_BASE}/categories`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(categoryData)
      });
      return res.json();
    },

    async updateCategory(id: string, categoryData: Partial<Category>): Promise<{ success: boolean; category: Category }> {
      const res = await fetch(`${API_BASE}/categories/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(categoryData)
      });
      return res.json();
    },

    async deleteCategory(id: string): Promise<{ success: boolean }> {
      const res = await fetch(`${API_BASE}/categories/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    },

    async addSubcategory(categoryId: string, subcategory: { name: string; description?: string }): Promise<{ success: boolean; subcategory: any }> {
      const res = await fetch(`${API_BASE}/categories/${categoryId}/subcategories`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(subcategory)
      });
      return res.json();
    }
  },

  // Providers Directory & Admin
  providers: {
    async getProviders(params?: {
      search?: string;
      domain?: string;
      categoryType?: string;
      freeLearning?: string;
      freeCert?: string;
      featured?: string;
    }): Promise<{ providers: Provider[]; total: number }> {
      const searchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          if (v && v !== 'all') searchParams.append(k, v);
        });
      }
      const res = await fetch(`${API_BASE}/providers?${searchParams.toString()}`);
      return res.json();
    },

    async getProvider(id: string): Promise<{ provider: Provider; courses: Course[]; totalCourses: number }> {
      const res = await fetch(`${API_BASE}/providers/${id}`);
      return res.json();
    },

    async createProvider(providerData: Partial<Provider>): Promise<{ success: boolean; provider: Provider }> {
      const res = await fetch(`${API_BASE}/providers`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(providerData)
      });
      return res.json();
    },

    async updateProvider(id: string, providerData: Partial<Provider>): Promise<{ success: boolean; provider: Provider }> {
      const res = await fetch(`${API_BASE}/providers/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(providerData)
      });
      return res.json();
    },

    async deleteProvider(id: string): Promise<{ success: boolean }> {
      const res = await fetch(`${API_BASE}/providers/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    }
  },

  // Careers & Skill Gap
  careers: {
    async getCareers(): Promise<{ careers: Career[] }> {
      const res = await fetch(`${API_BASE}/careers`);
      return res.json();
    },

    async getCareer(id: string): Promise<{ career: Career; recommendedCourses: Course[] }> {
      const res = await fetch(`${API_BASE}/careers/${id}`);
      return res.json();
    }
  },

  // Skills Explorer
  skills: {
    async getSkills(params?: {
      search?: string;
      category?: string;
      difficulty?: string;
      popular?: boolean;
    }): Promise<{ skills: Skill[]; total: number }> {
      const searchParams = new URLSearchParams();
      if (params?.search) searchParams.append('search', params.search);
      if (params?.category && params.category !== 'all') searchParams.append('category', params.category);
      if (params?.difficulty && params.difficulty !== 'all') searchParams.append('difficulty', params.difficulty);
      if (params?.popular) searchParams.append('popular', 'true');
      const res = await fetch(`${API_BASE}/skills?${searchParams.toString()}`);
      return res.json();
    },

    async getSkill(slug: string): Promise<{
      skill: Skill;
      courses: Course[];
      beginnerCourses: Course[];
      intermediateCourses: Course[];
      advancedCourses: Course[];
      relatedSkills: Skill[];
      careerLinks: {
        careerId: string;
        careerTitle: string;
        careerSlug: string;
        demandLevel: 'Very High' | 'High' | 'Steady';
        averageSalaryRange: string;
        overview: string;
      }[];
    }> {
      const res = await fetch(`${API_BASE}/skills/${encodeURIComponent(slug)}`);
      return res.json();
    },

    async generateSkillRoadmap(slug: string, availableHours: number = 8): Promise<{ success: boolean; roadmap: Roadmap }> {
      const res = await fetch(`${API_BASE}/skills/${encodeURIComponent(slug)}/roadmap`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ availableHours })
      });
      return res.json();
    }
  },

  // Bookmarks / Saved Courses
  savedCourses: {
    async getSaved(): Promise<{ savedCourses: { courseId: string; savedAt: string; notes?: string; course: Course }[] }> {
      const res = await fetch(`${API_BASE}/saved-courses`, {
        headers: getAuthHeaders()
      });
      return res.json();
    },

    async toggle(courseId: string, notes?: string): Promise<{ success: boolean; saved: boolean; message: string }> {
      const res = await fetch(`${API_BASE}/saved-courses`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ courseId, notes })
      });
      return res.json();
    }
  },

  // Enrollments & Study Progress
  myCourses: {
    async getMyCourses(): Promise<{ enrolledCourses: (EnrolledCourse & { course: Course })[] }> {
      const res = await fetch(`${API_BASE}/my-courses`, {
        headers: getAuthHeaders()
      });
      return res.json();
    },

    async updateProgress(courseId: string, progress: number, status: 'In Progress' | 'Completed' = 'In Progress') {
      const res = await fetch(`${API_BASE}/my-courses`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ courseId, progress, status })
      });
      return res.json();
    }
  },

  // Certificates Vault
  certificates: {
    async getCertificates(): Promise<{ certificates: CertificateRecord[] }> {
      const res = await fetch(`${API_BASE}/certificates`, {
        headers: getAuthHeaders()
      });
      return res.json();
    },

    async addCertificate(cert: Partial<CertificateRecord>): Promise<{ success: boolean; certificate: CertificateRecord }> {
      const res = await fetch(`${API_BASE}/certificates`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(cert)
      });
      return res.json();
    },

    async deleteCertificate(id: string): Promise<{ success: boolean }> {
      const res = await fetch(`${API_BASE}/certificates/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    }
  },

  // Roadmaps
  roadmaps: {
    async getRoadmaps(): Promise<{ roadmaps: Roadmap[] }> {
      const res = await fetch(`${API_BASE}/roadmaps`, {
        headers: getAuthHeaders()
      });
      return res.json();
    },

    async saveRoadmap(roadmap: Partial<Roadmap>): Promise<{ success: boolean; roadmap: Roadmap }> {
      const res = await fetch(`${API_BASE}/roadmaps`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(roadmap)
      });
      return res.json();
    },

    async updateRoadmap(id: string, updates: Partial<Roadmap>): Promise<{ success: boolean; roadmap: Roadmap }> {
      const res = await fetch(`${API_BASE}/roadmaps/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      });
      return res.json();
    }
  },

  // AI Integration (Server-side Gemini proxy routes)
  ai: {
    async chat(
      message: string,
      history: { role: string; content: string }[],
      userGoal?: string,
      userLevel?: string,
      signal?: AbortSignal
    ) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      if (signal) {
        signal.addEventListener('abort', () => controller.abort());
      }

      try {
        const res = await fetch(`${API_BASE}/ai/chat`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ message, history, userGoal, userLevel }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Server returned error (${res.status})`);
        }

        return await res.json();
      } catch (err: any) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          throw new Error('Mentor request timed out. Please click Retry.');
        }
        throw err;
      }
    },

    async recommend(profile: {
      interests: string[];
      careerGoal: string;
      currentSkills: string[];
      skillLevel: string;
      budget?: string;
      weeklyHours?: number;
      certificatePreference?: string;
    }) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      try {
        const res = await fetch(`${API_BASE}/ai/recommend`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(profile),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Server returned error (${res.status})`);
        }

        return await res.json();
      } catch (err: any) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          throw new Error('Course recommendation request timed out.');
        }
        throw err;
      }
    },

    async generateRoadmap(params: {
      careerGoal: string;
      currentLevel: string;
      availableHours: number;
      specificInterests?: string[];
    }) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      try {
        const res = await fetch(`${API_BASE}/ai/roadmap`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(params),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Server returned error (${res.status})`);
        }

        return await res.json();
      } catch (err: any) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          throw new Error('Roadmap generation request timed out.');
        }
        throw err;
      }
    },

    async compareCourses(courseIds: string[], studentGoal?: string) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      try {
        const res = await fetch(`${API_BASE}/ai/compare`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ courseIds, studentGoal }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Server returned error (${res.status})`);
        }

        return await res.json();
      } catch (err: any) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          throw new Error('Comparison request timed out.');
        }
        throw err;
      }
    },

    async analyzeSkillGap(careerId: string, userSkills: string[]) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      try {
        const res = await fetch(`${API_BASE}/ai/skill-gap`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ careerId, userSkills }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Server returned error (${res.status})`);
        }

        return await res.json();
      } catch (err: any) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          throw new Error('Skill gap analysis request timed out.');
        }
        throw err;
      }
    }
  },

  // Admin Telemetry & Analytics
  admin: {
    async getAnalytics() {
      const res = await fetch(`${API_BASE}/admin/analytics`, {
        headers: getAuthHeaders()
      });
      return res.json();
    },

    async getUsers() {
      const res = await fetch(`${API_BASE}/admin/users`, {
        headers: getAuthHeaders()
      });
      return res.json();
    },

    async getReports() {
      const res = await fetch(`${API_BASE}/admin/reports`, {
        headers: getAuthHeaders()
      });
      return res.json();
    }
  }
};

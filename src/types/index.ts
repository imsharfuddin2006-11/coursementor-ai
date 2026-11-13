export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  country: string;
  preferredLanguage: string;
  currency: string;
  interests: string[];
  skills: string[];
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  careerGoals: string;
  weeklyLearningHours: number;
  createdAt: string;
  updatedAt: string;
}

export type VerificationStatus = 'Verified' | 'Pending' | 'Expired' | 'Needs Review';
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
export type CourseFormat = 'Self-paced' | 'Instructor-led';

export interface CoursePricing {
  isFree: boolean;
  originalPrice?: number;
  discountPrice?: number;
  currency: string;
  freeAuditAvailable: boolean; // e.g., Coursera free audit vs paid certificate
}

export interface CertificateInfo {
  hasCertificate: boolean;
  isCertificateFree: boolean;
  certificateCondition: string; // e.g. "Free upon passing final project", "Paid upgrade", "Free statement of participation"
}

export interface SyllabusModule {
  week: number;
  title: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  providerId: string;
  providerName: string;
  providerLogo?: string;
  categoryId: string;
  categoryName?: string;
  skills: string[];
  level: CourseLevel;
  language: string;
  duration: string; // e.g. "6 Weeks (4 hrs/wk)"
  pricing: CoursePricing;
  certificateInformation: CertificateInfo;
  syllabus: SyllabusModule[];
  prerequisites: string[];
  learningOutcomes: string[];
  officialUrl: string;
  rating: number;
  reviewCount: number;
  verificationStatus: VerificationStatus;
  lastVerifiedAt: string;
  format: CourseFormat;
  matchScore?: number;
  whyRecommended?: string;
  subcategoryId?: string;
  subcategoryName?: string;
  featured?: boolean;
  trending?: boolean;
  isNew?: boolean;
  isProfessionalCertification?: boolean;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  courseCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  courseCount: number;
  popularCareers: string[];
  subcategories: Subcategory[];
  relatedSkills: string[];
  featured?: boolean;
}

export interface Provider {
  id: string;
  name: string;
  slug: string;
  description: string;
  logoUrl: string;
  verifiedCourseCount: number;
  websiteUrl: string;
  categoryType: 'Global Platform' | 'Tech & Professional' | 'India & International' | 'University & Open';
  learningDomains: string[];
  isFreeLearningAvailable: boolean; // Free audit or 100% free
  hasFreeCertificates: boolean;
  certificateConditions: string;
  headquarters?: string;
  foundedYear?: number;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
  featured?: boolean;
}

export interface CareerProject {
  title: string;
  description: string;
  tech: string[];
}

export interface SkillResource {
  title: string;
  type: 'Documentation' | 'Tutorial' | 'Interactive' | 'Open Course' | 'Handbook';
  url: string;
  provider: string;
}

export interface SkillCertificate {
  title: string;
  provider: string;
  type: 'Free Certificate' | 'Professional Certification' | 'Digital Badge';
  url: string;
}

export interface SkillProject {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  deliverables: string[];
}

export interface SkillCareerLink {
  careerId: string;
  careerTitle: string;
  demandLevel: 'Very High' | 'High' | 'Steady';
}

export interface Skill {
  id: string;
  name: string;
  slug: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  whyLearn: string;
  prerequisites: string[];
  relatedSkills: string[];
  recommendedCourseIds: string[];
  freeResources: SkillResource[];
  certificateOpportunities: SkillCertificate[];
  practicalProjects: SkillProject[];
  careerLinks: SkillCareerLink[];
  courseCount?: number;
  popular?: boolean;
}

export interface Career {
  id: string;
  title: string;
  slug: string;
  category: string;
  iconName: string;
  overview: string;
  responsibilities: string[];
  requiredSkills: string[];
  recommendedCourses: string[]; // Course IDs
  suggestedProjects: CareerProject[];
  toolsToLearn: string[];
  entryQualifications: string;
  averageSalaryRange: string;
  marketDemand: 'Very High' | 'High' | 'Steady';
}

export interface RoadmapTask {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  resourceUrl?: string;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  order: number;
  description: string;
  estimatedWeeks: number;
  tasks: RoadmapTask[];
  courseLinks?: { courseId: string; title: string; provider: string }[];
}

export interface Roadmap {
  id: string;
  userId: string;
  careerGoal: string;
  title: string;
  description: string;
  milestones: RoadmapMilestone[];
  estimatedDuration: string;
  progress: number;
  status: 'Active' | 'Completed' | 'Archived';
  createdAt: string;
  updatedAt: string;
}

export interface CertificateRecord {
  id: string;
  userId: string;
  title: string;
  issuingOrganization: string;
  courseName: string;
  issueDate: string;
  verificationUrl?: string;
  skillsGained: string[];
  status: 'Verified' | 'Uploaded' | 'Unverified';
  fileUrl?: string;
  credentialId?: string;
}

export interface SavedCourse {
  courseId: string;
  savedAt: string;
  notes?: string;
}

export interface EnrolledCourse {
  courseId: string;
  enrolledAt: string;
  progress: number; // 0 - 100
  status: 'In Progress' | 'Completed';
  lastStudiedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  recommendedCourseIds?: string[];
  suggestedNextTopics?: string[];
}

export interface SkillGapAnalysis {
  careerTitle: string;
  matchedSkills: string[];
  missingSkills: string[];
  gapPercentage: number;
  recommendedCourseIds: string[];
  learningStrategy: string;
  estimatedWeeksToBridge: number;
}

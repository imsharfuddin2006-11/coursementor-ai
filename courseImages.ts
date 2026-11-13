import React from 'react';
import { Course } from '../types';

/**
 * Curated, verified subject-specific imagery for CourseMentor AI.
 * Guaranteed to match academic and technical disciplines:
 * - Machine Learning: Neural network graphs, deep learning lattices, AI tensor models
 * - Artificial Intelligence: Generative AI visualization, computational models
 * - Computer Science: Algorithms, data structures, terminal computation, IDE code
 * - Web Development: Modern responsive layouts, developer setups, full-stack screens
 * - Cloud & DevOps: Datacenters, global cloud infrastructure, server architectures
 * - Cybersecurity: Encryption, network defense, threat analysis, digital padlocks
 * - UI/UX Design: Figma wireframes, interactive user journey maps, design systems
 * - Project Management & Agile: Sprint boards, product roadmaps, workflow matrix
 */

export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  // Machine Learning & Deep Learning
  'cat-ml': 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&auto=format&fit=crop&q=80',
  'sub-deep-learning': 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&auto=format&fit=crop&q=80',
  'sub-nlp': 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
  'sub-computer-vision': 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',

  // Artificial Intelligence
  'cat-ai': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  'sub-genai': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  'sub-llms': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
  'sub-applied-ai': 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&auto=format&fit=crop&q=80',

  // Computer Science & Programming
  'cat-programming': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
  'sub-python': 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80',
  'sub-c': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
  'sub-algorithms': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',

  // Web Development
  'cat-web-dev': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
  'sub-react': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
  'sub-html': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
  'sub-fullstack': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',

  // Cloud Computing & DevOps
  'cat-cloud': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
  'sub-aws': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
  'sub-azure': 'https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?w=800&auto=format&fit=crop&q=80',
  'sub-devops': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',

  // Cybersecurity
  'cat-cybersecurity': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
  'sub-network-security': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
  'sub-soc': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
  'sub-ethical-hacking': 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop&q=80',

  // UI/UX & Design
  'cat-design': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80',
  'sub-ui-ux': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80',

  // Project Management & Agile
  'cat-pm': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
  'sub-agile': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',

  // Data Science
  'cat-data-science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',

  // Business & Finance
  'cat-business': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',

  // Creative Skills
  'cat-creative': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',

  // Universal Default
  'default': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80'
};

/**
 * List of known blacklisted / mismatched photo IDs that should NEVER be displayed
 * for technology and academic courses (e.g. food, barbecues, unrelated stock photos).
 */
const BLACKLISTED_IMAGE_PATTERNS = [
  'photo-1555939594', // Barbecue chicken / fast food grill
  'photo-1565299624', // Pizza / fast food
  'photo-1568901346', // Burger
  'photo-1482049016', // Food plate
];

/**
 * Returns a verified, subject-appropriate thumbnail URL for any course.
 * Automatically sanitizes any legacy or mismatched food/unrelated photos.
 */
export function getCourseThumbnail(course: Partial<Course> | null | undefined): string {
  if (!course) {
    return CATEGORY_FALLBACK_IMAGES['default'];
  }

  const rawUrl = course.thumbnail?.trim();

  // Check if raw URL contains a blacklisted pattern (e.g. barbecued chicken)
  const isBlacklisted = rawUrl && BLACKLISTED_IMAGE_PATTERNS.some(pattern => rawUrl.includes(pattern));

  if (rawUrl && !isBlacklisted) {
    return rawUrl;
  }

  // Find the most appropriate fallback based on subcategoryId or categoryId
  if (course.subcategoryId && CATEGORY_FALLBACK_IMAGES[course.subcategoryId]) {
    return CATEGORY_FALLBACK_IMAGES[course.subcategoryId];
  }

  if (course.categoryId && CATEGORY_FALLBACK_IMAGES[course.categoryId]) {
    return CATEGORY_FALLBACK_IMAGES[course.categoryId];
  }

  // Infer by course title or skills
  const textContext = `${course.title || ''} ${course.skills?.join(' ') || ''}`.toLowerCase();

  if (textContext.includes('machine learning') || textContext.includes('deep learning') || textContext.includes('neural')) {
    return CATEGORY_FALLBACK_IMAGES['cat-ml'];
  }
  if (textContext.includes('generative ai') || textContext.includes('llm') || textContext.includes('artificial intelligence') || textContext.includes('gpt')) {
    return CATEGORY_FALLBACK_IMAGES['cat-ai'];
  }
  if (textContext.includes('cybersecurity') || textContext.includes('security') || textContext.includes('soc') || textContext.includes('hacker')) {
    return CATEGORY_FALLBACK_IMAGES['cat-cybersecurity'];
  }
  if (textContext.includes('cloud') || textContext.includes('aws') || textContext.includes('azure') || textContext.includes('devops')) {
    return CATEGORY_FALLBACK_IMAGES['cat-cloud'];
  }
  if (textContext.includes('python') || textContext.includes('algorithm') || textContext.includes('data structure')) {
    return CATEGORY_FALLBACK_IMAGES['sub-python'];
  }
  if (textContext.includes('ux') || textContext.includes('ui') || textContext.includes('design') || textContext.includes('figma')) {
    return CATEGORY_FALLBACK_IMAGES['cat-design'];
  }
  if (textContext.includes('project management') || textContext.includes('agile') || textContext.includes('scrum')) {
    return CATEGORY_FALLBACK_IMAGES['cat-pm'];
  }
  if (textContext.includes('web') || textContext.includes('react') || textContext.includes('frontend') || textContext.includes('full stack')) {
    return CATEGORY_FALLBACK_IMAGES['cat-web-dev'];
  }

  return CATEGORY_FALLBACK_IMAGES['default'];
}

/**
 * React onError handler for <img> tags displaying course thumbnails.
 * Replaces broken or failed images with a clean, topic-matched fallback
 * and prevents infinite loop reloading.
 */
export function handleCourseImageError(
  event: React.SyntheticEvent<HTMLImageElement>,
  categoryId?: string,
  subcategoryId?: string
) {
  const target = event.currentTarget;
  if (target.dataset.hasFallback === 'true') {
    return; // Already attempted fallback, stop to prevent loops
  }

  target.dataset.hasFallback = 'true';
  const fallback =
    (subcategoryId && CATEGORY_FALLBACK_IMAGES[subcategoryId]) ||
    (categoryId && CATEGORY_FALLBACK_IMAGES[categoryId]) ||
    CATEGORY_FALLBACK_IMAGES['default'];

  target.src = fallback;
}

/**
 * Curated provider fallback logos.
 */
export const PROVIDER_FALLBACK_LOGOS: Record<string, string> = {
  'prov-coursera': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
  'prov-cs50': 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&auto=format&fit=crop&q=80',
  'prov-mit': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&auto=format&fit=crop&q=80',
  'prov-nptel': 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&auto=format&fit=crop&q=80',
  'prov-google-cloud': 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80',
  'prov-nvidia-dli': 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=100&auto=format&fit=crop&q=80',
  'prov-aws-builder': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&auto=format&fit=crop&q=80',
  'prov-microsoft-learn': 'https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?w=100&auto=format&fit=crop&q=80',
  'prov-cisco-skillsforall': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100&auto=format&fit=crop&q=80',
  'prov-freecodecamp': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&auto=format&fit=crop&q=80',
  'default': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80'
};

export function handleProviderLogoError(
  event: React.SyntheticEvent<HTMLImageElement>,
  providerId?: string
) {
  const target = event.currentTarget;
  if (target.dataset.hasFallback === 'true') {
    return;
  }
  target.dataset.hasFallback = 'true';
  target.src = (providerId && PROVIDER_FALLBACK_LOGOS[providerId]) || PROVIDER_FALLBACK_LOGOS['default'];
}

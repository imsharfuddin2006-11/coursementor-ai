import { Course, Category, Provider, Career, Skill } from '../types';

export const INITIAL_PROVIDERS: Provider[] = [
  // 1. GLOBAL EDUCATION PLATFORMS
  {
    id: 'prov-coursera',
    name: 'Coursera',
    slug: 'coursera',
    description: 'Leading global learning platform partnering with 300+ top universities and companies like Stanford, Yale, and Google to offer degrees, specializations, and certificates.',
    logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 12,
    websiteUrl: 'https://www.coursera.org',
    categoryType: 'Global Platform',
    learningDomains: ['Computer Science', 'Data Science', 'Business', 'AI & ML', 'Health'],
    isFreeLearningAvailable: true, // Free video audit on almost all courses
    hasFreeCertificates: false, // Graded certificates require paid subscription or financial aid
    certificateConditions: 'Free course audit available. Graded assignments & verified certificates require Coursera Plus or financial aid.',
    headquarters: 'Mountain View, California, USA',
    foundedYear: 2012,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: true
  },
  {
    id: 'prov-edx',
    name: 'edX',
    slug: 'edx',
    description: 'Founded by Harvard University and MIT, edX brings university-level courses, MicroMasters, and professional certificates to learners worldwide.',
    logoUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 9,
    websiteUrl: 'https://www.edx.org',
    categoryType: 'Global Platform',
    learningDomains: ['Computer Science', 'Engineering', 'Humanities', 'Data Science'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: false,
    certificateConditions: 'Audit mode is 100% free with full access to videos and readings. Verified certificates require paid upgrade.',
    headquarters: 'Cambridge, Massachusetts, USA',
    foundedYear: 2012,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: true
  },
  {
    id: 'prov-udemy',
    name: 'Udemy',
    slug: 'udemy',
    description: 'Massive global online learning marketplace featuring over 210,000 video courses taught by real-world practitioners and industry experts.',
    logoUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 6,
    websiteUrl: 'https://www.udemy.com',
    categoryType: 'Global Platform',
    learningDomains: ['Web Development', 'Design', 'Marketing', 'IT & Software', 'Music'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: false,
    certificateConditions: 'Select free courses offer video viewing. Paid courses include lifetime access and a Certificate of Completion.',
    headquarters: 'San Francisco, California, USA',
    foundedYear: 2010,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: true
  },
  {
    id: 'prov-futurelearn',
    name: 'FutureLearn',
    slug: 'futurelearn',
    description: 'UK-based online learning platform owned by The Open University and SEEK, offering courses from British and international universities.',
    logoUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 4,
    websiteUrl: 'https://www.futurelearn.com',
    categoryType: 'Global Platform',
    learningDomains: ['Healthcare', 'Teaching', 'Business', 'Literature', 'Psychology'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: false,
    certificateConditions: 'Free access for duration of course + 14 days. Upgrades include ongoing access and digital certificate.',
    headquarters: 'London, United Kingdom',
    foundedYear: 2012,
    lastVerifiedAt: '2026-11-08',
    verificationStatus: 'Verified',
    featured: false
  },
  {
    id: 'prov-alison',
    name: 'Alison',
    slug: 'alison',
    description: 'Free online education platform focused on workplace-based skills, diplomas, and CPD-accredited courses across global disciplines.',
    logoUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 4,
    websiteUrl: 'https://alison.com',
    categoryType: 'Global Platform',
    learningDomains: ['IT', 'Health', 'Language', 'Business', 'Management'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: 'Free digital learner record on completion (80%+ score). Optional printed diplomas available for purchase.',
    headquarters: 'Galway, Ireland',
    foundedYear: 2007,
    lastVerifiedAt: '2026-11-08',
    verificationStatus: 'Verified',
    featured: false
  },
  {
    id: 'prov-saylor',
    name: 'Saylor Academy',
    slug: 'saylor-academy',
    description: 'Non-profit initiative dedicated to providing 100% free college-level courses and tuition-free pathways to earn transferable college credit.',
    logoUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 4,
    websiteUrl: 'https://www.saylor.org',
    categoryType: 'Global Platform',
    learningDomains: ['Computer Science', 'Economics', 'History', 'Math', 'Business'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: '100% Free certificate of completion upon scoring 70%+ on final exam. College credit transfer options available.',
    headquarters: 'Washington, DC, USA',
    foundedYear: 2008,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: false
  },
  {
    id: 'prov-openlearn',
    name: 'OpenLearn (The Open University)',
    slug: 'openlearn',
    description: 'Free educational resources platform from The Open University UK, offering over 1,000 free short courses and digital badging.',
    logoUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 4,
    websiteUrl: 'https://www.open.edu/openlearn',
    categoryType: 'Global Platform',
    learningDomains: ['Science', 'Society', 'Languages', 'Education', 'Environment'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: '100% Free statement of participation and digital badge upon completion.',
    headquarters: 'Milton Keynes, United Kingdom',
    foundedYear: 2006,
    lastVerifiedAt: '2026-11-07',
    verificationStatus: 'Verified',
    featured: false
  },
  {
    id: 'prov-mit',
    name: 'MIT OpenCourseWare',
    slug: 'mit-ocw',
    description: 'Pioneering open web-based publication of virtually all MIT course materials, freely accessible to any curious mind worldwide.',
    logoUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 5,
    websiteUrl: 'https://ocw.mit.edu',
    categoryType: 'University & Open',
    learningDomains: ['Electrical Engineering', 'Computer Science', 'Mathematics', 'Physics', 'Aeronautics'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: false,
    certificateConditions: 'Pure academic open courseware. Materials and lectures are 100% free; does not grant degree credit or certificates.',
    headquarters: 'Cambridge, Massachusetts, USA',
    foundedYear: 2001,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: true
  },
  {
    id: 'prov-cs50',
    name: 'Harvard CS50',
    slug: 'harvard-cs50',
    description: 'Harvard University’s legendary computer science program led by Professor David J. Malan, renowned for pedagogical rigor and hands-on problem sets.',
    logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 5,
    websiteUrl: 'https://cs50.harvard.edu',
    categoryType: 'University & Open',
    learningDomains: ['Computer Science', 'Python', 'Web Programming', 'AI with Python', 'Cybersecurity'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: '100% Free verified CS50 certificate directly from Harvard CS50 portal upon completing all problem sets with >= 70%.',
    headquarters: 'Cambridge, Massachusetts, USA',
    foundedYear: 1989,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: true
  },
  {
    id: 'prov-linkedin',
    name: 'LinkedIn Learning',
    slug: 'linkedin-learning',
    description: 'Professional development library with thousands of courses taught by industry luminaries, integrated into the global LinkedIn talent network.',
    logoUrl: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 4,
    websiteUrl: 'https://www.linkedin.com/learning',
    categoryType: 'Global Platform',
    learningDomains: ['Business', 'Technology', 'Creative', 'Leadership', 'Productivity'],
    isFreeLearningAvailable: false,
    hasFreeCertificates: false,
    certificateConditions: 'Requires monthly/annual LinkedIn Learning subscription or free 1-month trial. Certificates automatically display on LinkedIn profile.',
    headquarters: 'Sunnyvale, California, USA',
    foundedYear: 1995,
    lastVerifiedAt: '2026-11-08',
    verificationStatus: 'Verified',
    featured: false
  },
  {
    id: 'prov-pluralsight',
    name: 'Pluralsight',
    slug: 'pluralsight',
    description: 'Enterprise technology skills platform offering skill assessments, cloud labs, and deep developer and infrastructure paths.',
    logoUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 4,
    websiteUrl: 'https://www.pluralsight.com',
    categoryType: 'Tech & Professional',
    learningDomains: ['Software Development', 'IT Ops', 'Information Security', 'Cloud', 'Data'],
    isFreeLearningAvailable: false,
    hasFreeCertificates: false,
    certificateConditions: 'Paid subscription model. Free weekend/trial promotions available periodically.',
    headquarters: 'Draper, Utah, USA',
    foundedYear: 2004,
    lastVerifiedAt: '2026-11-08',
    verificationStatus: 'Verified',
    featured: false
  },
  {
    id: 'prov-codecademy',
    name: 'Codecademy',
    slug: 'codecademy',
    description: 'Pioneer of interactive, in-browser coding education helping over 50 million learners write code and build real-world software.',
    logoUrl: 'https://images.unsplash.com/photo-1555066931-bf19f8fd1085?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 4,
    websiteUrl: 'https://www.codecademy.com',
    categoryType: 'Tech & Professional',
    learningDomains: ['Web Development', 'Data Science', 'Python', 'SQL', 'C++'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: false,
    certificateConditions: 'Basic syntax lessons are free. Projects, career paths, and certificates require Codecademy Pro.',
    headquarters: 'New York, USA',
    foundedYear: 2011,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: false
  },
  {
    id: 'prov-sololearn',
    name: 'SoloLearn',
    slug: 'sololearn',
    description: 'Mobile-first social coding community offering bite-sized coding lessons, peer challenges, and in-app code compilers.',
    logoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 3,
    websiteUrl: 'https://www.sololearn.com',
    categoryType: 'Tech & Professional',
    learningDomains: ['Python', 'JavaScript', 'HTML/CSS', 'Java', 'SQL'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: 'Free course completion certificate upon finishing all lesson quizzes and code bits.',
    headquarters: 'Pleasanton, California, USA',
    foundedYear: 2014,
    lastVerifiedAt: '2026-11-08',
    verificationStatus: 'Verified',
    featured: false
  },

  // 2. TECHNOLOGY AND PROFESSIONAL SKILLS
  {
    id: 'prov-ibm-skillsbuild',
    name: 'IBM SkillsBuild',
    slug: 'ibm-skillsbuild',
    description: 'Free education program from IBM focused on underrepresented communities, high school & university students, and career changers.',
    logoUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 5,
    websiteUrl: 'https://skillsbuild.org',
    categoryType: 'Tech & Professional',
    learningDomains: ['AI', 'Cybersecurity', 'Cloud Computing', 'Data Fundamentals', 'Professional Skills'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: '100% Free IBM digital credentials and Credly badges issued upon course and assessment completion.',
    headquarters: 'Armonk, New York, USA',
    foundedYear: 2019,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: true
  },
  {
    id: 'prov-cisco-netacad',
    name: 'Cisco Networking Academy',
    slug: 'cisco-netacad',
    description: 'Global IT and cybersecurity education program partnering with schools and governments to transform lives and drive tech careers.',
    logoUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 4,
    websiteUrl: 'https://www.netacad.com',
    categoryType: 'Tech & Professional',
    learningDomains: ['Networking', 'Cybersecurity', 'IoT', 'Python', 'Packet Tracer'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: 'Free digital badges and certificates of completion for self-paced courses. Exam discounts for CCNA.',
    headquarters: 'San Jose, California, USA',
    foundedYear: 1997,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: true
  },
  {
    id: 'prov-cisco-skillsforall',
    name: 'Cisco Skills for All',
    slug: 'cisco-skills-for-all',
    description: 'Free-to-all learning platform by Cisco offering beginner-friendly cybersecurity, networking, and Python pathways.',
    logoUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 4,
    websiteUrl: 'https://skillsforall.com',
    categoryType: 'Tech & Professional',
    learningDomains: ['Cybersecurity', 'Networking', 'Python', 'Data Analytics'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: '100% Free digital badges on Credly and verified certificates on passing course exams.',
    headquarters: 'San Jose, California, USA',
    foundedYear: 2021,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: false
  },
  {
    id: 'prov-aws-builder',
    name: 'AWS Skill Builder',
    slug: 'aws-skill-builder',
    description: 'Official digital learning center from Amazon Web Services offering 600+ free digital courses and certification preparation.',
    logoUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 5,
    websiteUrl: 'https://explore.skillbuilder.aws',
    categoryType: 'Tech & Professional',
    learningDomains: ['Cloud Architecture', 'AWS Solutions', 'Serverless', 'DevOps', 'Machine Learning'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: false,
    certificateConditions: '600+ courses are 100% free to learn. Official AWS Certified exams require standard testing fees.',
    headquarters: 'Seattle, Washington, USA',
    foundedYear: 2021,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: true
  },
  {
    id: 'prov-google-cloud',
    name: 'Google Cloud Skills Boost',
    slug: 'google-cloud-skills-boost',
    description: 'Hands-on learning platform for Google Cloud with real-time console labs, quest badges, and role-based learning paths.',
    logoUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 5,
    websiteUrl: 'https://www.cloudskillsboost.google',
    categoryType: 'Tech & Professional',
    learningDomains: ['Google Cloud', 'Generative AI', 'Kubernetes', 'BigQuery', 'TensorFlow'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: 'Free courses available (including Gen AI Learning Path) with digital skill badges. Cloud labs require credits or Innovators pass.',
    headquarters: 'Sunnyvale, California, USA',
    foundedYear: 2021,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: true
  },
  {
    id: 'prov-microsoft-learn',
    name: 'Microsoft Learn',
    slug: 'microsoft-learn',
    description: 'Free, interactive, modular training platform for Microsoft technologies, Azure, Power Platform, Microsoft 365, and AI.',
    logoUrl: 'https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 6,
    websiteUrl: 'https://learn.microsoft.com',
    categoryType: 'Tech & Professional',
    learningDomains: ['Azure', 'Power BI', '.NET', 'C#', 'Copilot', 'Cybersecurity'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: '100% Free interactive modules and Applied Skills credentials with free verified lab verification.',
    headquarters: 'Redmond, Washington, USA',
    foundedYear: 2018,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: true
  },
  {
    id: 'prov-salesforce-trailhead',
    name: 'Salesforce Trailhead',
    slug: 'salesforce-trailhead',
    description: 'Gamified online learning platform that empowers anyone to learn in-demand Salesforce, marketing, and leadership skills.',
    logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 4,
    websiteUrl: 'https://trailhead.salesforce.com',
    categoryType: 'Tech & Professional',
    learningDomains: ['CRM', 'Salesforce Admin', 'Apex Development', 'AI CRM', 'Business Analysis'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: '100% Free learning badges, superbadges, and trail points. Proctored certifications require separate exam fee.',
    headquarters: 'San Francisco, California, USA',
    foundedYear: 2014,
    lastVerifiedAt: '2026-11-08',
    verificationStatus: 'Verified',
    featured: false
  },
  {
    id: 'prov-oracle-uni',
    name: 'Oracle University',
    slug: 'oracle-university',
    description: 'Official enterprise learning hub for Oracle Cloud Infrastructure (OCI), Database administration, ERP, and Java applications.',
    logoUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 3,
    websiteUrl: 'https://education.oracle.com',
    categoryType: 'Tech & Professional',
    learningDomains: ['OCI Cloud', 'Oracle Database', 'Java', 'SQL', 'Financials'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: false,
    certificateConditions: 'Free OCI Foundation video modules and training paths. Proctored certifications periodically offered free during campaigns.',
    headquarters: 'Austin, Texas, USA',
    foundedYear: 1980,
    lastVerifiedAt: '2026-11-07',
    verificationStatus: 'Verified',
    featured: false
  },
  {
    id: 'prov-nvidia-dli',
    name: 'NVIDIA Deep Learning Institute',
    slug: 'nvidia-dli',
    description: 'Hands-on training in AI, accelerated computing, generative AI, and robotics running on fully configured GPU-accelerated cloud workstations.',
    logoUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 4,
    websiteUrl: 'https://www.nvidia.com/en-us/training/',
    categoryType: 'Tech & Professional',
    learningDomains: ['Deep Learning', 'CUDA Programming', 'Large Language Models', 'Computer Vision', 'Omniverse'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: 'Select self-paced courses are free. Hands-on GPU-assessment workshops offer verified certificate of competency.',
    headquarters: 'Santa Clara, California, USA',
    foundedYear: 2016,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: true
  },
  {
    id: 'prov-sap-learning',
    name: 'SAP Learning',
    slug: 'sap-learning',
    description: 'Official digital learning site from SAP offering free role-based developer and consultant journeys across SAP BTP, S/4HANA, and ABAP.',
    logoUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 3,
    websiteUrl: 'https://learning.sap.com',
    categoryType: 'Tech & Professional',
    learningDomains: ['Enterprise ERP', 'SAP BTP', 'ABAP Development', 'Integration', 'Analytics'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: false,
    certificateConditions: 'Free access to learning journeys and self-study materials. Certification exam requires SAP Certification Hub subscription.',
    headquarters: 'Walldorf, Germany',
    foundedYear: 1972,
    lastVerifiedAt: '2026-11-07',
    verificationStatus: 'Verified',
    featured: false
  },
  {
    id: 'prov-github-skills',
    name: 'GitHub Skills',
    slug: 'github-skills',
    description: 'Interactive learning courses built right into GitHub repositories, guiding developers through pull requests, GitHub Actions, and Git workflow.',
    logoUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 4,
    websiteUrl: 'https://skills.github.com',
    categoryType: 'Tech & Professional',
    learningDomains: ['Git', 'GitHub Actions', 'CI/CD', 'Markdown', 'Open Source'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: '100% Free interactive hands-on bots with permanent commit history and digital skill evidence.',
    headquarters: 'San Francisco, California, USA',
    foundedYear: 2008,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: true
  },
  {
    id: 'prov-freecodecamp',
    name: 'freeCodeCamp',
    slug: 'freecodecamp',
    description: 'World-renowned 501(c)(3) non-profit organization providing a verified 3,000-hour full stack developer and data science curriculum 100% free.',
    logoUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 6,
    websiteUrl: 'https://www.freecodecamp.org',
    categoryType: 'Tech & Professional',
    learningDomains: ['Responsive Web Design', 'JavaScript Algorithms', 'Front End Libraries', 'Python Data Analysis', 'Machine Learning'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: '100% Free verified certifications upon completing and submitting 5 required capstone portfolio projects for each track.',
    headquarters: 'Austin, Texas, USA',
    foundedYear: 2014,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: true
  },
  {
    id: 'prov-kaggle-learn',
    name: 'Kaggle Learn',
    slug: 'kaggle-learn',
    description: 'Hands-on practical data science, machine learning, and generative AI micro-courses directly inside interactive Jupyter cloud notebooks.',
    logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 4,
    websiteUrl: 'https://www.kaggle.com/learn',
    categoryType: 'Tech & Professional',
    learningDomains: ['Python', 'Pandas', 'Machine Learning', 'Deep Learning', 'SQL'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: '100% Free verified certificates of completion upon finishing all interactive notebook exercises.',
    headquarters: 'San Francisco, California, USA',
    foundedYear: 2010,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: true
  },
  {
    id: 'prov-hp-life',
    name: 'HP LIFE',
    slug: 'hp-life',
    description: 'Global business and IT skills training program from the HP Foundation, offering 30+ free courses in 8 languages for entrepreneurs and students.',
    logoUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 3,
    websiteUrl: 'https://www.life-global.org',
    categoryType: 'Tech & Professional',
    learningDomains: ['Business Operations', 'Finance', 'Marketing', 'Communication', 'Technology'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: '100% Free certificate of completion available in multiple languages upon finishing each course.',
    headquarters: 'Palo Alto, California, USA',
    foundedYear: 2012,
    lastVerifiedAt: '2026-11-08',
    verificationStatus: 'Verified',
    featured: false
  },

  // 3. INDIA AND INTERNATIONAL EDUCATION
  {
    id: 'prov-nptel',
    name: 'NPTEL',
    slug: 'nptel',
    description: 'National Programme on Technology Enhanced Learning — joint venture by 7 Indian Institutes of Technology (IITs) and IISc Bangalore providing free university-level STEM courses.',
    logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 5,
    websiteUrl: 'https://nptel.ac.in',
    categoryType: 'India & International',
    learningDomains: ['Engineering', 'Computer Science', 'Mathematics', 'Management', 'Physical Sciences'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: false,
    certificateConditions: 'All video lectures and assignments are 100% free. Proctored exam with government-recognized IIT certificate requires nominal fee (₹1000).',
    headquarters: 'IIT Madras, Chennai, India',
    foundedYear: 2003,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: true
  },
  {
    id: 'prov-swayam',
    name: 'SWAYAM',
    slug: 'swayam',
    description: 'Government of India initiative designed to achieve the three cardinal principles of Education Policy: access, equity, and quality for school through post-graduate levels.',
    logoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 4,
    websiteUrl: 'https://swayam.gov.in',
    categoryType: 'India & International',
    learningDomains: ['School Education', 'Engineering', 'Law', 'Commerce', 'Humanities'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: false,
    certificateConditions: 'Courses are free to audit. Proctored final exam certificate with college credit transfer requires nominal exam fee.',
    headquarters: 'Ministry of Education, New Delhi, India',
    foundedYear: 2017,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: true
  },
  {
    id: 'prov-infosys-springboard',
    name: 'Infosys Springboard',
    slug: 'infosys-springboard',
    description: 'Digital literacy and professional upskilling program from Infosys delivering rich curated learning pathways from primary education to industry skills.',
    logoUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 4,
    websiteUrl: 'https://infyspringboard.onwingspan.com',
    categoryType: 'India & International',
    learningDomains: ['Software Engineering', 'Cloud Tech', 'Data Analytics', 'Professional Soft Skills'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: '100% Free verified completion certificates and industry co-branded credentials on successful test submission.',
    headquarters: 'Bengaluru, Karnataka, India',
    foundedYear: 2021,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: true
  },
  {
    id: 'prov-tcs-ion',
    name: 'TCS iON Digital Learning Hub',
    slug: 'tcs-ion',
    description: 'Tata Consultancy Services digital ecosystem offering industry career readiness, vocational certifications, and academic assessments.',
    logoUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 3,
    websiteUrl: 'https://learning.tcsionhub.in',
    categoryType: 'India & International',
    learningDomains: ['Career Readiness', 'Corporate Communication', 'Business Finance', 'Industry Tech'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: 'Offers free courses (e.g. TCS iON Career Edge) with free digital certificate. Specialized corporate programs have nominal fees.',
    headquarters: 'Mumbai, Maharashtra, India',
    foundedYear: 2011,
    lastVerifiedAt: '2026-11-08',
    verificationStatus: 'Verified',
    featured: false
  },
  {
    id: 'prov-simplilearn',
    name: 'Simplilearn SkillUp',
    slug: 'simplilearn',
    description: 'Global bootcamp and digital upskilling leader offering both free SkillUp foundational courses and university-certified post-graduate programs.',
    logoUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 4,
    websiteUrl: 'https://www.simplilearn.com/skillup-free-online-courses',
    categoryType: 'India & International',
    learningDomains: ['Cybersecurity', 'Project Management', 'Data Science', 'AI & ML', 'Digital Marketing'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: 'SkillUp portal provides 100% free self-paced courses with free certificates of completion upon scoring 80% on assessment.',
    headquarters: 'San Francisco, USA & Bengaluru, India',
    foundedYear: 2010,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: false
  },
  {
    id: 'prov-greatlearning',
    name: 'Great Learning Academy',
    slug: 'great-learning',
    description: 'EdTech platform offering over 1,000 free digital courses across technology, business, and data in partnership with global university faculties.',
    logoUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 4,
    websiteUrl: 'https://www.mygreatlearning.com/academy',
    categoryType: 'India & International',
    learningDomains: ['Artificial Intelligence', 'Data Analytics', 'Software Development', 'Cloud Computing', 'Management'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: 'Great Learning Academy tracks provide 100% free courses with verified digital certificate upon module completion.',
    headquarters: 'Bengaluru, Karnataka, India',
    foundedYear: 2013,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: false
  },
  {
    id: 'prov-skillslearn-in',
    name: 'SkillsLearn.in',
    slug: 'skillslearn-in',
    description: 'Investigated Indian career skills initiative providing accessible micro-credentials, full-stack workshops, and regional language skill pathways.',
    logoUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=120&auto=format&fit=crop&q=80',
    verifiedCourseCount: 3,
    websiteUrl: 'https://skillslearn.in',
    categoryType: 'India & International',
    learningDomains: ['Full Stack Development', 'Digital Literacy', 'Data Operations', 'Indian Tech Career Readiness'],
    isFreeLearningAvailable: true,
    hasFreeCertificates: true,
    certificateConditions: 'Free community courses offer completion badges. Intensive job-track mentorship programs have nominal enrollment.',
    headquarters: 'Hyderabad, Telangana, India',
    foundedYear: 2022,
    lastVerifiedAt: '2026-11-09',
    verificationStatus: 'Verified',
    featured: false
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-ai',
    name: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    description: 'Generative AI, prompt engineering, large language models, autonomous agents, and applied neural systems.',
    iconName: 'Sparkles',
    courseCount: 8,
    popularCareers: ['AI Engineer', 'AI Agent Architect', 'Prompt Specialist'],
    relatedSkills: ['Generative AI', 'Prompt Engineering', 'LLMs', 'AI Agents', 'RAG', 'LangChain'],
    featured: true,
    subcategories: [
      { id: 'sub-genai', name: 'Generative AI', slug: 'generative-ai', courseCount: 3 },
      { id: 'sub-prompt-eng', name: 'Prompt Engineering', slug: 'prompt-engineering', courseCount: 2 },
      { id: 'sub-llms', name: 'Large Language Models', slug: 'large-language-models', courseCount: 2 },
      { id: 'sub-ai-agents', name: 'AI Agents', slug: 'ai-agents', courseCount: 2 },
      { id: 'sub-applied-ai', name: 'Applied AI', slug: 'applied-ai', courseCount: 3 }
    ]
  },
  {
    id: 'cat-ml',
    name: 'Machine Learning',
    slug: 'machine-learning',
    description: 'Deep neural networks, natural language processing, computer vision, and reinforcement learning.',
    iconName: 'BrainCircuit',
    courseCount: 7,
    popularCareers: ['Machine Learning Engineer', 'NLP Researcher', 'Computer Vision Specialist'],
    relatedSkills: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Deep Learning', 'Computer Vision', 'NLP'],
    featured: true,
    subcategories: [
      { id: 'sub-deep-learning', name: 'Deep Learning', slug: 'deep-learning', courseCount: 3 },
      { id: 'sub-nlp', name: 'NLP', slug: 'nlp', courseCount: 2 },
      { id: 'sub-computer-vision', name: 'Computer Vision', slug: 'computer-vision', courseCount: 2 },
      { id: 'sub-reinforcement-learning', name: 'Reinforcement Learning', slug: 'reinforcement-learning', courseCount: 1 }
    ]
  },
  {
    id: 'cat-data-science',
    name: 'Data Science',
    slug: 'data-science',
    description: 'Statistical analysis, predictive modeling, data visualization, business intelligence, and big data pipeline engineering.',
    iconName: 'Database',
    courseCount: 6,
    popularCareers: ['Data Scientist', 'Data Analyst', 'BI Developer'],
    relatedSkills: ['Python', 'Pandas', 'SQL', 'Tableau', 'Power BI', 'Statistics'],
    featured: true,
    subcategories: [
      { id: 'sub-data-analytics', name: 'Data Analytics', slug: 'data-analytics', courseCount: 3 },
      { id: 'sub-statistics', name: 'Statistics', slug: 'statistics', courseCount: 2 },
      { id: 'sub-data-viz', name: 'Data Visualization', slug: 'data-visualization', courseCount: 2 },
      { id: 'sub-big-data', name: 'Big Data', slug: 'big-data', courseCount: 1 }
    ]
  },
  {
    id: 'cat-programming',
    name: 'Programming',
    slug: 'programming',
    description: 'Core computational thinking, memory allocation, algorithms, data structures, and foundational programming languages.',
    iconName: 'Code',
    courseCount: 9,
    popularCareers: ['Software Engineer', 'Systems Programmer', 'Algorithm Engineer'],
    relatedSkills: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'TypeScript'],
    featured: true,
    subcategories: [
      { id: 'sub-python', name: 'Python', slug: 'python', courseCount: 4 },
      { id: 'sub-java', name: 'Java', slug: 'java', courseCount: 2 },
      { id: 'sub-c', name: 'C', slug: 'c', courseCount: 1 },
      { id: 'sub-cpp', name: 'C++', slug: 'cpp', courseCount: 1 },
      { id: 'sub-javascript', name: 'JavaScript', slug: 'javascript', courseCount: 3 },
      { id: 'sub-typescript', name: 'TypeScript', slug: 'typescript', courseCount: 2 }
    ]
  },
  {
    id: 'cat-web-dev',
    name: 'Web Development',
    slug: 'web-development',
    description: 'Modern front-end user interfaces, semantic HTML5, CSS design systems, server-side Node.js, and Next.js full-stack architectures.',
    iconName: 'Globe',
    courseCount: 8,
    popularCareers: ['Full Stack Developer', 'Front-End Engineer', 'Node.js Developer'],
    relatedSkills: ['HTML', 'CSS', 'React', 'Angular', 'Node.js', 'Next.js', 'Tailwind CSS'],
    featured: true,
    subcategories: [
      { id: 'sub-html', name: 'HTML', slug: 'html', courseCount: 2 },
      { id: 'sub-css', name: 'CSS', slug: 'css', courseCount: 2 },
      { id: 'sub-react', name: 'React', slug: 'react', courseCount: 3 },
      { id: 'sub-angular', name: 'Angular', slug: 'angular', courseCount: 1 },
      { id: 'sub-nodejs', name: 'Node.js', slug: 'node-js', courseCount: 2 },
      { id: 'sub-nextjs', name: 'Next.js', slug: 'next-js', courseCount: 2 }
    ]
  },
  {
    id: 'cat-mobile-dev',
    name: 'Mobile Development',
    slug: 'mobile-development',
    description: 'Cross-platform and native mobile applications for iOS and Android using Swift, Kotlin, Flutter, and React Native.',
    iconName: 'Smartphone',
    courseCount: 4,
    popularCareers: ['Mobile App Developer', 'Flutter Engineer', 'iOS Engineer'],
    relatedSkills: ['Android', 'iOS', 'Flutter', 'React Native', 'Kotlin', 'Swift'],
    subcategories: [
      { id: 'sub-android', name: 'Android', slug: 'android', courseCount: 2 },
      { id: 'sub-ios', name: 'iOS', slug: 'ios', courseCount: 1 },
      { id: 'sub-flutter', name: 'Flutter', slug: 'flutter', courseCount: 2 },
      { id: 'sub-react-native', name: 'React Native', slug: 'react-native', courseCount: 1 }
    ]
  },
  {
    id: 'cat-cybersecurity',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Offensive ethical hacking, defensive security operations, threat triage, digital forensics, and network auditing.',
    iconName: 'ShieldCheck',
    courseCount: 6,
    popularCareers: ['Cybersecurity Analyst', 'SOC Analyst', 'Ethical Hacker'],
    relatedSkills: ['Ethical Hacking', 'Network Security', 'SOC', 'Digital Forensics', 'Cryptography'],
    featured: true,
    subcategories: [
      { id: 'sub-ethical-hacking', name: 'Ethical Hacking', slug: 'ethical-hacking', courseCount: 2 },
      { id: 'sub-network-security', name: 'Network Security', slug: 'network-security', courseCount: 3 },
      { id: 'sub-soc', name: 'SOC', slug: 'soc', courseCount: 1 },
      { id: 'sub-digital-forensics', name: 'Digital Forensics', slug: 'digital-forensics', courseCount: 1 }
    ]
  },
  {
    id: 'cat-cloud',
    name: 'Cloud Computing',
    slug: 'cloud-computing',
    description: 'Scalable infrastructure, serverless architectures, and multi-cloud solutions across AWS, Microsoft Azure, and Google Cloud.',
    iconName: 'Cloud',
    courseCount: 6,
    popularCareers: ['Cloud Architect', 'AWS Engineer', 'Azure Solutions Specialist'],
    relatedSkills: ['AWS', 'Microsoft Azure', 'Google Cloud', 'IAM', 'Cloud Storage'],
    featured: true,
    subcategories: [
      { id: 'sub-aws', name: 'AWS', slug: 'aws', courseCount: 3 },
      { id: 'sub-azure', name: 'Microsoft Azure', slug: 'microsoft-azure', courseCount: 2 },
      { id: 'sub-gcp', name: 'Google Cloud', slug: 'google-cloud', courseCount: 2 }
    ]
  },
  {
    id: 'cat-devops',
    name: 'DevOps',
    slug: 'devops',
    description: 'Containerization, orchestration with Kubernetes, CI/CD automated deployment pipelines, and infrastructure-as-code.',
    iconName: 'Server',
    courseCount: 4,
    popularCareers: ['DevOps Engineer', 'Site Reliability Engineer', 'Platform Engineer'],
    relatedSkills: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Terraform', 'Linux'],
    subcategories: [
      { id: 'sub-docker', name: 'Docker', slug: 'docker', courseCount: 2 },
      { id: 'sub-k8s', name: 'Kubernetes', slug: 'kubernetes', courseCount: 2 },
      { id: 'sub-cicd', name: 'CI/CD', slug: 'cicd', courseCount: 2 },
      { id: 'sub-automation', name: 'Automation', slug: 'automation', courseCount: 1 }
    ]
  },
  {
    id: 'cat-database',
    name: 'Database Management',
    slug: 'database-management',
    description: 'Relational data modeling, SQL optimization, NoSQL document stores, PostgreSQL, and enterprise Oracle database systems.',
    iconName: 'HardDrive',
    courseCount: 4,
    popularCareers: ['Database Administrator', 'Data Engineer', 'SQL Specialist'],
    relatedSkills: ['SQL', 'MongoDB', 'PostgreSQL', 'Oracle', 'Indexing'],
    subcategories: [
      { id: 'sub-sql', name: 'SQL', slug: 'sql', courseCount: 3 },
      { id: 'sub-mongodb', name: 'MongoDB', slug: 'mongodb', courseCount: 1 },
      { id: 'sub-postgres', name: 'PostgreSQL', slug: 'postgresql', courseCount: 2 },
      { id: 'sub-oracle-db', name: 'Oracle', slug: 'oracle', courseCount: 1 }
    ]
  },
  {
    id: 'cat-networking',
    name: 'Networking',
    slug: 'networking',
    description: 'IP addressing, TCP/IP protocol stack, Cisco CCNA routing and switching, LAN/WAN architecture, and subnetting.',
    iconName: 'Network',
    courseCount: 4,
    popularCareers: ['Network Administrator', 'Network Engineer', 'Telecommunications Specialist'],
    relatedSkills: ['CCNA', 'Network Administration', 'Routing and Switching', 'TCP/IP', 'Subnetting'],
    subcategories: [
      { id: 'sub-ccna', name: 'CCNA', slug: 'ccna', courseCount: 2 },
      { id: 'sub-net-admin', name: 'Network Administration', slug: 'network-administration', courseCount: 2 },
      { id: 'sub-routing-switching', name: 'Routing and Switching', slug: 'routing-and-switching', courseCount: 2 }
    ]
  },
  {
    id: 'cat-business',
    name: 'Business and Management',
    slug: 'business-and-management',
    description: 'Executive leadership, organizational strategy, business analytics, operational excellence, and organizational scaling.',
    iconName: 'Briefcase',
    courseCount: 5,
    popularCareers: ['Business Analyst', 'Operations Manager', 'Management Consultant'],
    relatedSkills: ['Leadership', 'Operations', 'Strategy', 'Business Analytics', 'Decision Making'],
    featured: true,
    subcategories: [
      { id: 'sub-leadership', name: 'Leadership', slug: 'leadership', courseCount: 2 },
      { id: 'sub-operations', name: 'Operations', slug: 'operations', courseCount: 2 },
      { id: 'sub-strategy', name: 'Strategy', slug: 'strategy', courseCount: 2 },
      { id: 'sub-business-analytics', name: 'Business Analytics', slug: 'business-analytics', courseCount: 2 }
    ]
  },
  {
    id: 'cat-finance',
    name: 'Finance and Accounting',
    slug: 'finance-and-accounting',
    description: 'Financial statement analysis, corporate valuation, managerial accounting, portfolio management, and modern investment banking.',
    iconName: 'TrendingUp',
    courseCount: 4,
    popularCareers: ['Financial Analyst', 'Accountant', 'Investment Associate'],
    relatedSkills: ['Financial Analysis', 'Accounting', 'Investment', 'Banking', 'Valuation'],
    subcategories: [
      { id: 'sub-financial-analysis', name: 'Financial Analysis', slug: 'financial-analysis', courseCount: 2 },
      { id: 'sub-accounting', name: 'Accounting', slug: 'accounting', courseCount: 2 },
      { id: 'sub-investment', name: 'Investment', slug: 'investment', courseCount: 1 },
      { id: 'sub-banking', name: 'Banking', slug: 'banking', courseCount: 1 }
    ]
  },
  {
    id: 'cat-marketing',
    name: 'Digital Marketing',
    slug: 'digital-marketing',
    description: 'Search engine optimization, paid search (SEM), omnichannel social media marketing, analytics, and content strategy.',
    iconName: 'Target',
    courseCount: 4,
    popularCareers: ['Digital Marketing Manager', 'SEO Strategist', 'Content Creator'],
    relatedSkills: ['SEO', 'SEM', 'Social Media', 'Content Marketing', 'Google Analytics'],
    subcategories: [
      { id: 'sub-seo', name: 'SEO', slug: 'seo', courseCount: 2 },
      { id: 'sub-sem', name: 'SEM', slug: 'sem', courseCount: 1 },
      { id: 'sub-social-media', name: 'Social Media', slug: 'social-media', courseCount: 2 },
      { id: 'sub-content-marketing', name: 'Content Marketing', slug: 'content-marketing', courseCount: 1 }
    ]
  },
  {
    id: 'cat-design',
    name: 'Design',
    slug: 'design',
    description: 'User experience research, wireframing, interactive prototyping in Figma, visual hierarchy, and digital product design systems.',
    iconName: 'Palette',
    courseCount: 5,
    popularCareers: ['UI/UX Designer', 'Product Designer', 'Graphic Designer'],
    relatedSkills: ['UI/UX', 'Graphic Design', 'Figma', 'Product Design', 'Design Thinking'],
    featured: true,
    subcategories: [
      { id: 'sub-ui-ux', name: 'UI/UX', slug: 'ui-ux', courseCount: 3 },
      { id: 'sub-graphic-design', name: 'Graphic Design', slug: 'graphic-design', courseCount: 2 },
      { id: 'sub-figma', name: 'Figma', slug: 'figma', courseCount: 2 },
      { id: 'sub-product-design', name: 'Product Design', slug: 'product-design', courseCount: 2 }
    ]
  },
  {
    id: 'cat-entrepreneurship',
    name: 'Entrepreneurship',
    slug: 'entrepreneurship',
    description: 'Lean startup methodology, business model canvas, venture capital pitching, product validation, and agile innovation.',
    iconName: 'Rocket',
    courseCount: 3,
    popularCareers: ['Startup Founder', 'Innovation Consultant', 'Venture Associate'],
    relatedSkills: ['Startup Development', 'Business Planning', 'Innovation', 'Fundraising'],
    subcategories: [
      { id: 'sub-startup-dev', name: 'Startup Development', slug: 'startup-development', courseCount: 2 },
      { id: 'sub-business-planning', name: 'Business Planning', slug: 'business-planning', courseCount: 1 },
      { id: 'sub-innovation', name: 'Innovation', slug: 'innovation', courseCount: 1 }
    ]
  },
  {
    id: 'cat-pm',
    name: 'Project Management',
    slug: 'project-management',
    description: 'Agile sprints, Scrum ceremonies, Kanban visualization, PMP certification standards, and digital product management.',
    iconName: 'CheckSquare',
    courseCount: 4,
    popularCareers: ['Project Manager', 'Scrum Master', 'Technical Product Manager'],
    relatedSkills: ['Agile', 'Scrum', 'PMP', 'Product Management', 'Jira'],
    subcategories: [
      { id: 'sub-agile', name: 'Agile', slug: 'agile', courseCount: 2 },
      { id: 'sub-scrum', name: 'Scrum', slug: 'scrum', courseCount: 2 },
      { id: 'sub-pmp', name: 'PMP', slug: 'pmp', courseCount: 1 },
      { id: 'sub-product-mgmt', name: 'Product Management', slug: 'product-management', courseCount: 2 }
    ]
  },
  {
    id: 'cat-communication',
    name: 'Communication Skills',
    slug: 'communication-skills',
    description: 'Persuasive public speaking, executive business correspondence, cross-cultural collaboration, and professional English fluency.',
    iconName: 'MessageSquare',
    courseCount: 4,
    popularCareers: ['Executive Communications Manager', 'Corporate Trainer', 'Client Solutions Lead'],
    relatedSkills: ['Public Speaking', 'Business Communication', 'English Fluency', 'Active Listening'],
    subcategories: [
      { id: 'sub-public-speaking', name: 'Public Speaking', slug: 'public-speaking', courseCount: 2 },
      { id: 'sub-biz-comm', name: 'Business Communication', slug: 'business-communication', courseCount: 2 },
      { id: 'sub-english-fluency', name: 'English Fluency', slug: 'english-fluency', courseCount: 2 }
    ]
  },
  {
    id: 'cat-hr',
    name: 'Human Resources',
    slug: 'human-resources',
    description: 'Modern talent acquisition, human capital analytics, compensation and benefits, employee retention, and labor law compliance.',
    iconName: 'Users',
    courseCount: 3,
    popularCareers: ['HR Business Partner', 'Talent Acquisition Specialist', 'People Analytics Lead'],
    relatedSkills: ['Recruitment', 'HR Management', 'HR Analytics', 'Onboarding'],
    subcategories: [
      { id: 'sub-recruitment', name: 'Recruitment', slug: 'recruitment', courseCount: 1 },
      { id: 'sub-hr-mgmt', name: 'HR Management', slug: 'hr-management', courseCount: 2 },
      { id: 'sub-hr-analytics', name: 'HR Analytics', slug: 'hr-analytics', courseCount: 1 }
    ]
  },
  {
    id: 'cat-engineering',
    name: 'Engineering',
    slug: 'engineering',
    description: 'Core disciplines of mechanical systems, electrical circuits, civil structures, electronics, and embedded robotics.',
    iconName: 'Wrench',
    courseCount: 4,
    popularCareers: ['Electrical Engineer', 'Mechanical Engineer', 'Civil Design Specialist'],
    relatedSkills: ['Mechanical', 'Electrical', 'Civil', 'Electronics', 'CAD', 'Circuits'],
    subcategories: [
      { id: 'sub-mechanical', name: 'Mechanical', slug: 'mechanical', courseCount: 1 },
      { id: 'sub-electrical', name: 'Electrical', slug: 'electrical', courseCount: 2 },
      { id: 'sub-civil', name: 'Civil', slug: 'civil', courseCount: 1 },
      { id: 'sub-electronics', name: 'Electronics', slug: 'electronics', courseCount: 1 }
    ]
  },
  {
    id: 'cat-science',
    name: 'Science',
    slug: 'science',
    description: 'Foundations of classical physics, organic chemistry, molecular biology, differential calculus, and applied mathematics.',
    iconName: 'Atom',
    courseCount: 4,
    popularCareers: ['Research Scientist', 'Laboratory Analyst', 'Biotechnologist'],
    relatedSkills: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Calculus'],
    subcategories: [
      { id: 'sub-physics', name: 'Physics', slug: 'physics', courseCount: 1 },
      { id: 'sub-chemistry', name: 'Chemistry', slug: 'chemistry', courseCount: 1 },
      { id: 'sub-biology', name: 'Biology', slug: 'biology', courseCount: 1 },
      { id: 'sub-mathematics', name: 'Mathematics', slug: 'mathematics', courseCount: 2 }
    ]
  },
  {
    id: 'cat-education',
    name: 'Education',
    slug: 'education',
    description: 'Pedagogical theory, online learning management systems, instructional design for adults, and classroom educational technology.',
    iconName: 'BookOpen',
    courseCount: 3,
    popularCareers: ['Instructional Designer', 'Educational Technologist', 'Corporate Trainer'],
    relatedSkills: ['Teaching', 'Educational Technology', 'Instructional Design', 'Curriculum Design'],
    subcategories: [
      { id: 'sub-teaching', name: 'Teaching', slug: 'teaching', courseCount: 1 },
      { id: 'sub-edtech', name: 'Educational Technology', slug: 'educational-technology', courseCount: 2 },
      { id: 'sub-instructional-design', name: 'Instructional Design', slug: 'instructional-design', courseCount: 1 }
    ]
  },
  {
    id: 'cat-languages',
    name: 'Languages',
    slug: 'languages',
    description: 'Immersive language acquisition, conversational fluency, grammar mastery, and cultural nuances across world languages.',
    iconName: 'Languages',
    courseCount: 5,
    popularCareers: ['Translator', 'International Business Liaison', 'Language Instructor'],
    relatedSkills: ['English', 'German', 'French', 'Spanish', 'Japanese', 'Grammar'],
    subcategories: [
      { id: 'sub-english', name: 'English', slug: 'english', courseCount: 2 },
      { id: 'sub-german', name: 'German', slug: 'german', courseCount: 1 },
      { id: 'sub-french', name: 'French', slug: 'french', courseCount: 1 },
      { id: 'sub-spanish', name: 'Spanish', slug: 'spanish', courseCount: 1 },
      { id: 'sub-japanese', name: 'Japanese', slug: 'japanese', courseCount: 1 }
    ]
  },
  {
    id: 'cat-personal-dev',
    name: 'Personal Development',
    slug: 'personal-development',
    description: 'Self-mastery, cognitive habits, deep productivity workflows, critical reasoning, and mindful time management.',
    iconName: 'Compass',
    courseCount: 4,
    popularCareers: ['Life & Executive Coach', 'Productivity Consultant', 'Team Facilitator'],
    relatedSkills: ['Leadership', 'Productivity', 'Critical Thinking', 'Time Management', 'Resilience'],
    subcategories: [
      { id: 'sub-pers-leadership', name: 'Leadership', slug: 'personal-leadership', courseCount: 1 },
      { id: 'sub-productivity', name: 'Productivity', slug: 'productivity', courseCount: 2 },
      { id: 'sub-critical-thinking', name: 'Critical Thinking', slug: 'critical-thinking', courseCount: 1 },
      { id: 'sub-time-mgmt', name: 'Time Management', slug: 'time-management', courseCount: 1 }
    ]
  },
  {
    id: 'cat-creative',
    name: 'Creative Skills',
    slug: 'creative-skills',
    description: 'Digital video production, commercial photography, 2D/3D animation, storytelling, and digital content creation.',
    iconName: 'Film',
    courseCount: 4,
    popularCareers: ['Video Producer', 'Motion Designer', 'Content Creator'],
    relatedSkills: ['Video Editing', 'Photography', 'Animation', 'Content Creation', 'Premiere Pro'],
    subcategories: [
      { id: 'sub-video-editing', name: 'Video Editing', slug: 'video-editing', courseCount: 2 },
      { id: 'sub-photography', name: 'Photography', slug: 'photography', courseCount: 1 },
      { id: 'sub-animation', name: 'Animation', slug: 'animation', courseCount: 1 },
      { id: 'sub-content-creation', name: 'Content Creation', slug: 'content-creation', courseCount: 1 }
    ]
  }
];

export const INITIAL_COURSES: Course[] = [
  // Computer Science & Programming
  {
    id: 'course-cs50x',
    title: 'CS50x: Introduction to Computer Science',
    slug: 'cs50x-introduction-to-computer-science',
    description: 'Harvard University’s introduction to the intellectual enterprises of computer science and the art of programming for majors and non-majors alike. Taught by David J. Malan, this course covers computational thinking, memory allocation, data structures, algorithms, and web applications.',
    shortDescription: 'Harvard’s benchmark introduction to computer science, C, Python, SQL, and web development with free verified certificate.',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    providerId: 'prov-cs50',
    providerName: 'Harvard CS50',
    providerLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&auto=format&fit=crop&q=80',
    categoryId: 'cat-programming',
    categoryName: 'Programming',
    subcategoryId: 'sub-c',
    subcategoryName: 'C',
    skills: ['C', 'Python', 'SQL', 'Algorithms', 'Data Structures', 'Memory Management'],
    level: 'Beginner',
    language: 'English',
    duration: '12 Weeks (10-15 hrs/wk)',
    pricing: { isFree: true, currency: 'USD', freeAuditAvailable: true },
    certificateInformation: {
      hasCertificate: true,
      isCertificateFree: true,
      certificateCondition: '100% Free verified certificate directly from Harvard CS50 upon scoring >=70% on all problem sets.'
    },
    syllabus: [
      { week: 1, title: 'Computational Thinking & Scratch', topics: ['Binary', 'ASCII', 'Algorithms', 'Conditionals'] },
      { week: 2, title: 'C Programming & Memory', topics: ['Compilation', 'Variables', 'Memory Addressing', 'Arrays'] },
      { week: 3, title: 'Algorithms & Complexity', topics: ['Linear Search', 'Binary Search', 'Merge Sort', 'Big O'] },
      { week: 4, title: 'Memory & Pointers', topics: ['Pointers', 'Dynamic Memory', 'malloc', 'Valgrind'] },
      { week: 5, title: 'Data Structures', topics: ['Linked Lists', 'Hash Tables', 'Tries', 'Trees'] },
      { week: 6, title: 'Python Syntax & OOP', topics: ['Python Control Flow', 'Data Structures', 'Python Libraries'] },
      { week: 7, title: 'SQL & Relational Databases', topics: ['Schema Design', 'Queries', 'JOINs', 'Database Indexing'] }
    ],
    prerequisites: ['None. Designed for students with zero prior programming experience.'],
    learningOutcomes: [
      'Understand how computers store memory and execute code at the machine level',
      'Implement fundamental sorting and searching algorithms from scratch',
      'Build end-to-end web applications with Python, Flask, and SQL'
    ],
    officialUrl: 'https://cs50.harvard.edu/x/',
    rating: 4.9,
    reviewCount: 38240,
    verificationStatus: 'Verified',
    lastVerifiedAt: '2026-11-09',
    format: 'Self-paced',
    featured: true,
    trending: true
  },
  {
    id: 'course-mit-6001',
    title: 'MIT 6.0001: Introduction to Computer Science and Programming in Python',
    slug: 'mit-introduction-to-computer-science-and-programming-in-python',
    description: 'An introductory computer science course from MIT designed for learners with little or no programming experience. It aims to provide students with an understanding of the role computation can play in solving problems.',
    shortDescription: 'MIT’s foundational Python course emphasizing computational thinking, algorithmic efficiency, and object-oriented design.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    providerId: 'prov-mit',
    providerName: 'MIT OpenCourseWare',
    providerLogo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&auto=format&fit=crop&q=80',
    categoryId: 'cat-programming',
    categoryName: 'Programming',
    subcategoryId: 'sub-python',
    subcategoryName: 'Python',
    skills: ['Python', 'Computational Thinking', 'Object-Oriented Programming', 'Recursion', 'Complexity'],
    level: 'Beginner',
    language: 'English',
    duration: '9 Weeks (6 hrs/wk)',
    pricing: { isFree: true, currency: 'USD', freeAuditAvailable: true },
    certificateInformation: {
      hasCertificate: false,
      isCertificateFree: false,
      certificateCondition: 'MIT OpenCourseWare is 100% free open educational material; does not grant verified certificates.'
    },
    syllabus: [
      { week: 1, title: 'What is Computation?', topics: ['Branching', 'Iteration', 'Strings', 'Guess and Check'] },
      { week: 2, title: 'Functions and Abstraction', topics: ['Decomposition', 'Abstraction', 'Scope', 'Specifications'] },
      { week: 3, title: 'Tuples, Lists, and Mutation', topics: ['Aliases', 'Cloning', 'List Comprehensions'] },
      { week: 4, title: 'Testing and Debugging', topics: ['Defensive Programming', 'Unit Tests', 'Exceptions'] }
    ],
    prerequisites: ['Basic high school algebra.'],
    learningOutcomes: [
      'Write clean, idiomatic Python programs to solve numerical problems',
      'Analyze algorithmic time and space complexity using Big-O notation',
      'Structure code cleanly using object-oriented principles'
    ],
    officialUrl: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/',
    rating: 4.8,
    reviewCount: 14210,
    verificationStatus: 'Verified',
    lastVerifiedAt: '2026-11-09',
    format: 'Self-paced',
    featured: true
  },
  {
    id: 'course-fcc-responsive-web',
    title: 'Responsive Web Design Certification',
    slug: 'freecodecamp-responsive-web-design',
    description: 'Learn the modern foundations of web design with HTML5, CSS3, Flexbox, CSS Grid, and responsive viewport techniques. Includes 5 mandatory portfolio projects evaluated for certification.',
    shortDescription: 'FreeCodeCamp’s 300-hour comprehensive HTML & CSS certification with 5 portfolio projects and 100% free certificate.',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    providerId: 'prov-freecodecamp',
    providerName: 'freeCodeCamp',
    providerLogo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&auto=format&fit=crop&q=80',
    categoryId: 'cat-web-dev',
    categoryName: 'Web Development',
    subcategoryId: 'sub-html',
    subcategoryName: 'HTML',
    skills: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid', 'Responsive Design', 'Web Accessibility (a11y)'],
    level: 'Beginner',
    language: 'English',
    duration: '300 Hours (Self-paced)',
    pricing: { isFree: true, currency: 'USD', freeAuditAvailable: true },
    certificateInformation: {
      hasCertificate: true,
      isCertificateFree: true,
      certificateCondition: '100% Free verified credential issued automatically upon passing all 5 required portfolio projects.'
    },
    syllabus: [
      { week: 1, title: 'HTML Foundations', topics: ['Semantic HTML5', 'Forms', 'Media Elements', 'Tables'] },
      { week: 2, title: 'CSS Visual Layouts', topics: ['Box Model', 'Typography', 'Color Schemes', 'Positioning'] },
      { week: 3, title: 'Modern Flexbox & Grid', topics: ['Flex Direction', 'Grid Templates', 'Responsive Breakpoints'] },
      { week: 4, title: 'Portfolio Capstone Projects', topics: ['Survey Form', 'Tribute Page', 'Technical Documentation Page'] }
    ],
    prerequisites: ['None. A modern web browser is all you need.'],
    learningOutcomes: [
      'Construct accessible, standards-compliant web pages with HTML5',
      'Master responsive grid and flexbox layouts without relying on CSS frameworks',
      'Earn a verified digital certificate to link directly on LinkedIn'
    ],
    officialUrl: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
    rating: 4.9,
    reviewCount: 42100,
    verificationStatus: 'Verified',
    lastVerifiedAt: '2026-11-09',
    format: 'Self-paced',
    featured: true,
    trending: true
  },

  // AI & Machine Learning
  {
    id: 'course-ml-specialization',
    title: 'Machine Learning Specialization',
    slug: 'machine-learning-specialization-andrew-ng',
    description: 'Created by AI pioneer Andrew Ng and taught in collaboration between DeepLearning.AI and Stanford University. Master foundational ML concepts and practical machine learning techniques using Python and NumPy.',
    shortDescription: 'The gold standard introductory machine learning specialization by Andrew Ng, Stanford, and DeepLearning.AI.',
    thumbnail: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&auto=format&fit=crop&q=80',
    providerId: 'prov-coursera',
    providerName: 'Coursera',
    providerLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    categoryId: 'cat-ml',
    categoryName: 'Machine Learning',
    subcategoryId: 'sub-deep-learning',
    subcategoryName: 'Deep Learning',
    skills: ['Supervised Learning', 'Linear Regression', 'Logistic Regression', 'Neural Networks', 'Decision Trees', 'Scikit-Learn'],
    level: 'Beginner',
    language: 'English',
    duration: '3 Months (8 hrs/wk)',
    pricing: { isFree: false, originalPrice: 49, discountPrice: 49, currency: 'USD', freeAuditAvailable: true },
    certificateInformation: {
      hasCertificate: true,
      isCertificateFree: false,
      certificateCondition: 'Audit mode is 100% free to watch all lectures and readings. Graded coding labs and shareable certificate require subscription or financial aid.'
    },
    syllabus: [
      { week: 1, title: 'Supervised Machine Learning: Regression and Classification', topics: ['Linear Regression', 'Cost Function', 'Gradient Descent'] },
      { week: 2, title: 'Advanced Learning Algorithms', topics: ['Neural Networks', 'Activation Functions', 'Decision Trees'] },
      { week: 3, title: 'Unsupervised Learning, Recommenders, Reinforcement Learning', topics: ['Clustering', 'PCA', 'Collaborative Filtering'] }
    ],
    prerequisites: ['Basic Python programming and high school mathematics.'],
    learningOutcomes: [
      'Build and train supervised machine learning models for prediction and binary classification',
      'Apply best practices for machine learning development and diagnostics',
      'Construct neural network models with TensorFlow to recognize complex patterns'
    ],
    officialUrl: 'https://www.coursera.org/specializations/machine-learning-introduction',
    rating: 4.9,
    reviewCount: 22800,
    verificationStatus: 'Verified',
    lastVerifiedAt: '2026-11-09',
    format: 'Self-paced',
    featured: true,
    trending: true
  },
  {
    id: 'course-google-genai-path',
    title: 'Introduction to Generative AI Learning Path',
    slug: 'google-introduction-to-generative-ai',
    description: 'An official learning path from Google Cloud covering generative AI fundamentals, Large Language Models (LLMs), attention mechanisms, and responsible AI deployment principles.',
    shortDescription: 'Google Cloud’s official 5-course foundational pathway to understand LLMs, transformer models, and prompt engineering.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    providerId: 'prov-google-cloud',
    providerName: 'Google Cloud Skills Boost',
    providerLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80',
    categoryId: 'cat-ai',
    categoryName: 'Artificial Intelligence',
    subcategoryId: 'sub-genai',
    subcategoryName: 'Generative AI',
    skills: ['Generative AI', 'Large Language Models', 'Attention Mechanisms', 'Transformer Models', 'Responsible AI'],
    level: 'Beginner',
    language: 'English',
    duration: '5 Hours',
    pricing: { isFree: true, currency: 'USD', freeAuditAvailable: true },
    certificateInformation: {
      hasCertificate: true,
      isCertificateFree: true,
      certificateCondition: '100% Free Google digital completion badges awarded directly to your Google Cloud profile upon passing quizzes.'
    },
    syllabus: [
      { week: 1, title: 'Introduction to Generative AI', topics: ['What is Gen AI', 'Differences from traditional ML', 'Use cases'] },
      { week: 2, title: 'Introduction to Large Language Models', topics: ['Pre-training', 'Fine-tuning', 'Prompt Engineering basics'] },
      { week: 3, title: 'Attention Mechanism & Transformers', topics: ['Self-attention', 'Encoder-Decoder', 'BERT vs GPT'] },
      { week: 4, title: 'Responsible AI Principles', topics: ['Bias mitigation', 'Safety filters', 'Google AI governance'] }
    ],
    prerequisites: ['None. Conceptual introductory path.'],
    learningOutcomes: [
      'Articulate how generative AI differs from discriminative machine learning',
      'Explain the architecture of Transformer models and attention mechanisms',
      'Earn official Google Cloud digital badges for your portfolio'
    ],
    officialUrl: 'https://www.cloudskillsboost.google/paths/118',
    rating: 4.8,
    reviewCount: 31200,
    verificationStatus: 'Verified',
    lastVerifiedAt: '2026-11-09',
    format: 'Self-paced',
    featured: true,
    trending: true
  },
  {
    id: 'course-nvidia-genai-llm',
    title: 'Generative AI Explained by NVIDIA',
    slug: 'nvidia-generative-ai-explained',
    description: 'Explore the foundations of Generative AI, how generative models are architected, and real-world deployment challenges with high-performance computing.',
    shortDescription: 'Free foundational AI briefing from NVIDIA Deep Learning Institute demystifying modern generative AI pipelines.',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    providerId: 'prov-nvidia-dli',
    providerName: 'NVIDIA Deep Learning Institute',
    providerLogo: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=100&auto=format&fit=crop&q=80',
    categoryId: 'cat-ai',
    categoryName: 'Artificial Intelligence',
    subcategoryId: 'sub-llms',
    subcategoryName: 'Large Language Models',
    skills: ['Generative AI', 'GPU Acceleration', 'Model Architectures', 'Diffusion Models', 'LLMs'],
    level: 'Beginner',
    language: 'English',
    duration: '2 Hours',
    pricing: { isFree: true, currency: 'USD', freeAuditAvailable: true },
    certificateInformation: {
      hasCertificate: true,
      isCertificateFree: true,
      certificateCondition: '100% Free certificate of course completion from NVIDIA DLI upon finishing all video modules.'
    },
    syllabus: [
      { week: 1, title: 'Generative AI Overview', topics: ['History of Generative Models', 'Text to Image Models', 'Prompting'] },
      { week: 2, title: 'Hardware Acceleration & Enterprise Deployment', topics: ['CUDA', 'TensorRT-LLM', 'Inference Latency'] }
    ],
    prerequisites: ['General interest in modern artificial intelligence.'],
    learningOutcomes: [
      'Understand how LLMs and diffusion models operate at a conceptual level',
      'Recognize GPU acceleration requirements for low-latency AI inference'
    ],
    officialUrl: 'https://www.nvidia.com/en-us/training/online/',
    rating: 4.8,
    reviewCount: 9400,
    verificationStatus: 'Verified',
    lastVerifiedAt: '2026-11-09',
    format: 'Self-paced',
    featured: false
  },

  // Cloud Computing & DevOps
  {
    id: 'course-aws-cloud-practitioner',
    title: 'AWS Cloud Practitioner Essentials',
    slug: 'aws-cloud-practitioner-essentials',
    description: 'Official digital fundamental course from Amazon Web Services for learners seeking an overall understanding of the AWS Cloud, independent of specific technical roles.',
    shortDescription: 'Official free AWS curriculum covering cloud architecture, security, compute, storage, and pricing models.',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    providerId: 'prov-aws-builder',
    providerName: 'AWS Skill Builder',
    providerLogo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&auto=format&fit=crop&q=80',
    categoryId: 'cat-cloud',
    categoryName: 'Cloud Computing',
    subcategoryId: 'sub-aws',
    subcategoryName: 'AWS',
    skills: ['AWS Cloud', 'EC2', 'S3', 'IAM', 'VPC', 'Cloud Economics', 'Well-Architected Framework'],
    level: 'Beginner',
    language: 'English',
    duration: '6 Hours',
    pricing: { isFree: true, currency: 'USD', freeAuditAvailable: true },
    certificateInformation: {
      hasCertificate: false,
      isCertificateFree: false,
      certificateCondition: 'Course is 100% free on AWS Skill Builder. Official AWS Certified Cloud Practitioner proctored exam is optional and requires standard test fee.'
    },
    syllabus: [
      { week: 1, title: 'Introduction to AWS Cloud', topics: ['Global Infrastructure', 'Regions & Availability Zones'] },
      { week: 2, title: 'Compute & Networking', topics: ['Amazon EC2', 'AWS Lambda', 'Amazon VPC', 'Subnets'] },
      { week: 3, title: 'Storage and Databases', topics: ['Amazon S3', 'Amazon EBS', 'Amazon RDS', 'DynamoDB'] },
      { week: 4, title: 'Cloud Security and Pricing', topics: ['Shared Responsibility Model', 'AWS IAM', 'Cost Explorer'] }
    ],
    prerequisites: ['General familiarity with basic IT concepts.'],
    learningOutcomes: [
      'Define what the AWS cloud is and its basic global infrastructure',
      'Describe core AWS services, including compute, network, database, and storage',
      'Prepare effectively for the AWS Certified Cloud Practitioner examination'
    ],
    officialUrl: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials',
    rating: 4.8,
    reviewCount: 34500,
    verificationStatus: 'Verified',
    lastVerifiedAt: '2026-11-09',
    format: 'Self-paced',
    featured: true,
    isProfessionalCertification: true
  },
  {
    id: 'course-microsoft-azure-fund',
    title: 'Microsoft Azure Fundamentals (AZ-900)',
    slug: 'microsoft-azure-fundamentals-az-900',
    description: 'Learn fundamental cloud concepts, Azure architectural components, Azure compute and networking services, and security, privacy, and compliance features.',
    shortDescription: 'Free interactive Microsoft Learn path to master Azure cloud services, governance, and AZ-900 core exam objectives.',
    thumbnail: 'https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?w=800&auto=format&fit=crop&q=80',
    providerId: 'prov-microsoft-learn',
    providerName: 'Microsoft Learn',
    providerLogo: 'https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?w=100&auto=format&fit=crop&q=80',
    categoryId: 'cat-cloud',
    categoryName: 'Cloud Computing',
    subcategoryId: 'sub-azure',
    subcategoryName: 'Microsoft Azure',
    skills: ['Microsoft Azure', 'Virtual Machines', 'Blob Storage', 'Azure AD / Entra ID', 'Cost Management'],
    level: 'Beginner',
    language: 'English',
    duration: '10 Hours',
    pricing: { isFree: true, currency: 'USD', freeAuditAvailable: true },
    certificateInformation: {
      hasCertificate: true,
      isCertificateFree: true,
      certificateCondition: '100% Free Microsoft Learn modules, sandbox exercises, and digital badges. Proctored AZ-900 exam requires standard Microsoft exam registration.'
    },
    syllabus: [
      { week: 1, title: 'Cloud Concepts', topics: ['IaaS vs PaaS vs SaaS', 'High Availability', 'Disaster Recovery'] },
      { week: 2, title: 'Azure Architecture & Services', topics: ['Subscriptions', 'Resource Groups', 'Virtual Networks'] },
      { week: 3, title: 'Azure Management & Governance', topics: ['Azure Policy', 'Role-Based Access Control', 'Azure Advisor'] }
    ],
    prerequisites: ['Basic computing background.'],
    learningOutcomes: [
      'Navigate the Azure portal and deploy virtual compute resources',
      'Implement enterprise identity management with Microsoft Entra ID',
      'Optimize monthly cloud expenditure using Azure Cost Management'
    ],
    officialUrl: 'https://learn.microsoft.com/en-us/training/paths/az-900-describe-cloud-concepts/',
    rating: 4.8,
    reviewCount: 29000,
    verificationStatus: 'Verified',
    lastVerifiedAt: '2026-11-09',
    format: 'Self-paced',
    isProfessionalCertification: true
  },

  // Cybersecurity & Networking
  {
    id: 'course-cisco-intro-cyber',
    title: 'Introduction to Cybersecurity by Cisco',
    slug: 'cisco-introduction-to-cybersecurity',
    description: 'Explore the world of cybersecurity and the vital need for cybersecurity controls in business and society. Learn how to protect your personal privacy online while discovering career opportunities in cybersecurity.',
    shortDescription: 'Cisco Networking Academy’s premier free introductory course into global threat landscapes and defensive protocols.',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    providerId: 'prov-cisco-skillsforall',
    providerName: 'Cisco Skills for All',
    providerLogo: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100&auto=format&fit=crop&q=80',
    categoryId: 'cat-cybersecurity',
    categoryName: 'Cybersecurity',
    subcategoryId: 'sub-network-security',
    subcategoryName: 'Network Security',
    skills: ['Cybersecurity', 'Threat Detection', 'Social Engineering', 'Malware', 'Network Defense', 'Incident Response'],
    level: 'Beginner',
    language: 'English',
    duration: '15 Hours',
    pricing: { isFree: true, currency: 'USD', freeAuditAvailable: true },
    certificateInformation: {
      hasCertificate: true,
      isCertificateFree: true,
      certificateCondition: '100% Free verified Cisco digital badge on Credly and Certificate of Completion upon passing final quiz.'
    },
    syllabus: [
      { week: 1, title: 'The Need for Cybersecurity', topics: ['Personal Data', 'Organizational Assets', 'Warfare & Cybercrime'] },
      { week: 2, title: 'Attacks, Concepts and Techniques', topics: ['Security Vulnerabilities', 'Malware Types', 'Social Engineering'] },
      { week: 3, title: 'Protecting Your Data and Privacy', topics: ['Firewalls', 'Antivirus', 'Strong Passwords', 'Wi-Fi Security'] },
      { week: 4, title: 'Protecting the Organization', topics: ['Firewalls', 'Intrusion Detection', 'Incident Handling'] }
    ],
    prerequisites: ['Basic internet literacy.'],
    learningOutcomes: [
      'Identify different types of cyber attacks, malware, and social engineering techniques',
      'Explain how organizations defend against cyberattacks using security appliances',
      'Earn an official Cisco Credly badge to highlight on your resume'
    ],
    officialUrl: 'https://skillsforall.com/course/introduction-to-cybersecurity',
    rating: 4.8,
    reviewCount: 18400,
    verificationStatus: 'Verified',
    lastVerifiedAt: '2026-11-09',
    format: 'Self-paced',
    featured: true
  },
  {
    id: 'course-google-cybersecurity',
    title: 'Google Cybersecurity Professional Certificate',
    slug: 'google-cybersecurity-professional-certificate',
    description: 'Developed by Google’s security experts, this certificate teaches hands-on skills with Python, Linux, SQL, SIEM tools (Chronicle, Splunk), and IDS systems to prepare for entry-level cybersecurity analyst jobs.',
    shortDescription: 'Google’s hands-on industry certificate with Python, Linux, SQL, SIEM tools, and portfolio case studies.',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    providerId: 'prov-coursera',
    providerName: 'Coursera',
    providerLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    categoryId: 'cat-cybersecurity',
    categoryName: 'Cybersecurity',
    subcategoryId: 'sub-soc',
    subcategoryName: 'SOC',
    skills: ['Python', 'Linux', 'SQL', 'SIEM', 'Chronicle', 'Splunk', 'IDS', 'Security Audits'],
    level: 'Beginner',
    language: 'English',
    duration: '6 Months (7 hrs/wk)',
    pricing: { isFree: false, originalPrice: 49, discountPrice: 49, currency: 'USD', freeAuditAvailable: true },
    certificateInformation: {
      hasCertificate: true,
      isCertificateFree: false,
      certificateCondition: 'Audit video lessons free. Dual badge with CompTIA Security+ discount voucher upon paid certificate completion.'
    },
    syllabus: [
      { week: 1, title: 'Play It Safe: Manage Security Risks', topics: ['CIA Triad', 'Security Frameworks', 'NIST CSF'] },
      { week: 2, title: 'Connect and Protect: Networks and Network Security', topics: ['TCP/IP', 'VPNs', 'Firewalls', 'Packets'] },
      { week: 3, title: 'Tools of the Trade: Linux and SQL', topics: ['Bash CLI', 'Permissions', 'Database Queries'] },
      { week: 4, title: 'Assets, Threats, and Vulnerabilities', topics: ['Vulnerability Scanners', 'OWASP Top 10'] },
      { week: 5, title: 'Automate Cybersecurity Tasks with Python', topics: ['Python Functions', 'Regular Expressions', 'Parsing Logs'] }
    ],
    prerequisites: ['None. No prior security or IT background required.'],
    learningOutcomes: [
      'Triage network security events using industry-standard SIEM dashboards',
      'Automate repetitive security auditing tasks using Python scripts',
      'Gain dual credential credit toward CompTIA Security+ exam'
    ],
    officialUrl: 'https://www.coursera.org/professional-certificates/google-cybersecurity',
    rating: 4.9,
    reviewCount: 31000,
    verificationStatus: 'Verified',
    lastVerifiedAt: '2026-11-09',
    format: 'Self-paced',
    isProfessionalCertification: true
  },

  // India & National Programs (NPTEL, SWAYAM, Infosys)
  {
    id: 'course-nptel-dsa-java',
    title: 'NPTEL: Programming, Data Structures And Algorithms In Python',
    slug: 'nptel-programming-data-structures-and-algorithms-in-python',
    description: 'Offered by Indian Institute of Technology Madras (IIT Madras) through NPTEL. Rigorous university-level computer science course emphasizing algorithmic design, sorting techniques, and object-oriented abstractions.',
    shortDescription: 'IIT Madras & NPTEL official university course on algorithmic problem solving and data structures in Python.',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80',
    providerId: 'prov-nptel',
    providerName: 'NPTEL',
    providerLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&auto=format&fit=crop&q=80',
    categoryId: 'cat-programming',
    categoryName: 'Programming',
    subcategoryId: 'sub-python',
    subcategoryName: 'Python',
    skills: ['Python', 'Data Structures', 'Algorithms', 'Recursion', 'Search Trees', 'Dynamic Programming'],
    level: 'Intermediate',
    language: 'English',
    duration: '8 Weeks (5 hrs/wk)',
    pricing: { isFree: true, currency: 'INR', freeAuditAvailable: true },
    certificateInformation: {
      hasCertificate: true,
      isCertificateFree: false,
      certificateCondition: 'All video lectures, problem sets, and discussion forums are 100% free. Proctored in-person IIT certification exam requires ₹1000 fee.'
    },
    syllabus: [
      { week: 1, title: 'Algorithms and Python Basics', topics: ['GCD Algorithm', 'Control Flow', 'Python Functions'] },
      { week: 2, title: 'Searching and Sorting', topics: ['Binary Search', 'Selection Sort', 'Insertion Sort', 'Merge Sort'] },
      { week: 3, title: 'Algorithmic Complexity', topics: ['Asymptotic Analysis', 'Order of Magnitude', 'Divide & Conquer'] },
      { week: 4, title: 'Data Structures', topics: ['Linked Lists', 'Binary Search Trees', 'Balancing Trees'] }
    ],
    prerequisites: ['Prior familiarity with school-level mathematics and logic.'],
    learningOutcomes: [
      'Master fundamental algorithms and mathematical analysis of runtimes',
      'Implement binary search trees, hash tables, and graphs in Python',
      'Earn academic credits eligible for credit transfer across Indian universities'
    ],
    officialUrl: 'https://nptel.ac.in/courses/106106145',
    rating: 4.8,
    reviewCount: 16800,
    verificationStatus: 'Verified',
    lastVerifiedAt: '2026-11-09',
    format: 'Self-paced',
    featured: true
  },
  {
    id: 'course-infosys-ai-foundation',
    title: 'Infosys Springboard: Artificial Intelligence Foundation',
    slug: 'infosys-springboard-artificial-intelligence-foundation',
    description: 'An industry curriculum by Infosys designed to impart practical AI, data science, and neural network concepts to students and professionals across India.',
    shortDescription: 'Infosys Springboard’s free corporate AI curriculum with real-world case studies and digital completion certificates.',
    thumbnail: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&auto=format&fit=crop&q=80',
    providerId: 'prov-infosys-springboard',
    providerName: 'Infosys Springboard',
    providerLogo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&auto=format&fit=crop&q=80',
    categoryId: 'cat-ai',
    categoryName: 'Artificial Intelligence',
    subcategoryId: 'sub-applied-ai',
    subcategoryName: 'Applied AI',
    skills: ['AI Basics', 'Machine Learning', 'Computer Vision', 'Chatbots', 'Responsible AI'],
    level: 'Beginner',
    language: 'English',
    duration: '18 Hours',
    pricing: { isFree: true, currency: 'INR', freeAuditAvailable: true },
    certificateInformation: {
      hasCertificate: true,
      isCertificateFree: true,
      certificateCondition: '100% Free certificate of completion issued by Infosys on passing the module assessment with >=60%.'
    },
    syllabus: [
      { week: 1, title: 'Introduction to AI and Cognitive Systems', topics: ['Definitions', 'History', 'Industry Applications'] },
      { week: 2, title: 'Machine Learning Workflow', topics: ['Data Preprocessing', 'Training', 'Validation'] },
      { week: 3, title: 'Computer Vision & Conversational AI', topics: ['Image Classification', 'NLP Pipeline', 'Chatbot Architectures'] }
    ],
    prerequisites: ['Basic computer science literacy.'],
    learningOutcomes: [
      'Understand enterprise AI workflows deployed by Fortune 500 companies',
      'Explore ethical frameworks in real-world artificial intelligence',
      'Add an authentic Infosys Springboard certificate to your credentials'
    ],
    officialUrl: 'https://infyspringboard.onwingspan.com/',
    rating: 4.8,
    reviewCount: 19400,
    verificationStatus: 'Verified',
    lastVerifiedAt: '2026-11-09',
    format: 'Self-paced',
    featured: true
  },
  {
    id: 'course-skillslearn-fullstack',
    title: 'SkillsLearn.in: Modern Full Stack Web Engineering',
    slug: 'skillslearn-modern-full-stack-web-engineering',
    description: 'Investigated community initiative by SkillsLearn.in focusing on Indian tech job-readiness, hands-on React development, RESTful APIs, and database connectivity.',
    shortDescription: 'Project-centric full stack curriculum covering React, Node.js, and SQL for Indian software developer transitions.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    providerId: 'prov-skillslearn-in',
    providerName: 'SkillsLearn.in',
    providerLogo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&auto=format&fit=crop&q=80',
    categoryId: 'cat-web-dev',
    categoryName: 'Web Development',
    subcategoryId: 'sub-react',
    subcategoryName: 'React',
    skills: ['React', 'JavaScript', 'Node.js', 'Express', 'SQL', 'Git'],
    level: 'Beginner',
    language: 'English',
    duration: '8 Weeks (6 hrs/wk)',
    pricing: { isFree: true, currency: 'INR', freeAuditAvailable: true },
    certificateInformation: {
      hasCertificate: true,
      isCertificateFree: true,
      certificateCondition: '100% Free digital skill achievement badge on successfully building and submitting the final project.'
    },
    syllabus: [
      { week: 1, title: 'Front End Architecture', topics: ['React Components', 'State Management', 'Hooks'] },
      { week: 2, title: 'API Integration & Backend', topics: ['Node.js', 'Express Endpoints', 'CORS', 'Postman'] },
      { week: 3, title: 'Database & Production Deployment', topics: ['SQL Models', 'CRUD', 'Vercel & Render Deployment'] }
    ],
    prerequisites: ['HTML and fundamental JavaScript.'],
    learningOutcomes: [
      'Build reactive full-stack web applications from front-end to database',
      'Deploy live applications on free modern cloud hosts with continuous integration'
    ],
    officialUrl: 'https://skillslearn.in',
    rating: 4.7,
    reviewCount: 3800,
    verificationStatus: 'Verified',
    lastVerifiedAt: '2026-11-09',
    format: 'Self-paced'
  },

  // Design, Business & Management
  {
    id: 'course-google-ux',
    title: 'Google UX Design Professional Certificate',
    slug: 'google-ux-design-professional-certificate',
    description: 'Learn the foundations of UX design, including empathizing with users, defining user pain points, ideating solutions, wireframing, and creating high-fidelity interactive prototypes in Figma.',
    shortDescription: 'Google’s premier entry-level UX design certificate covering Figma, user research, wireframing, and 3 portfolio case studies.',
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80',
    providerId: 'prov-coursera',
    providerName: 'Coursera',
    providerLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    categoryId: 'cat-design',
    categoryName: 'Design',
    subcategoryId: 'sub-ui-ux',
    subcategoryName: 'UI/UX',
    skills: ['UI/UX', 'Figma', 'Wireframing', 'User Research', 'Usability Testing', 'Prototyping'],
    level: 'Beginner',
    language: 'English',
    duration: '6 Months (10 hrs/wk)',
    pricing: { isFree: false, originalPrice: 49, discountPrice: 49, currency: 'USD', freeAuditAvailable: true },
    certificateInformation: {
      hasCertificate: true,
      isCertificateFree: false,
      certificateCondition: 'Audit video lessons free. Shareable Google certificate and 3 finished portfolio projects require paid subscription or financial aid.'
    },
    syllabus: [
      { week: 1, title: 'Foundations of User Experience (UX) Design', topics: ['Design Thinking', 'Accessibility', 'User Personas'] },
      { week: 2, title: 'Start the UX Design Process', topics: ['Empathy Maps', 'Problem Statements', 'User Journey Maps'] },
      { week: 3, title: 'Build Wireframes and Low-Fidelity Prototypes', topics: ['Paper Wireframes', 'Figma Basics', 'Information Architecture'] },
      { week: 4, title: 'Conduct UX Research and Test Early Concepts', topics: ['Usability Studies', 'Affinity Diagrams', 'Design Iteration'] },
      { week: 5, title: 'Create High-Fidelity Designs and Prototypes in Figma', topics: ['Design Systems', 'Typography', 'Micro-interactions'] }
    ],
    prerequisites: ['None. No design degree or prior experience required.'],
    learningOutcomes: [
      'Complete 3 end-to-end design projects: mobile app, responsive website, cross-platform experience',
      'Create high-fidelity interactive prototypes ready for user testing in Figma',
      'Assemble a professional UX design portfolio to apply for entry-level roles'
    ],
    officialUrl: 'https://www.coursera.org/professional-certificates/google-ux-design',
    rating: 4.8,
    reviewCount: 46200,
    verificationStatus: 'Verified',
    lastVerifiedAt: '2026-11-09',
    format: 'Self-paced',
    featured: true,
    isProfessionalCertification: true
  },
  {
    id: 'course-google-project-mgmt',
    title: 'Google Project Management Professional Certificate',
    slug: 'google-project-management-professional-certificate',
    description: 'Learn project documentation, agile project management frameworks (Scrum, Kanban), project charters, risk matrices, and strategic communication from senior Google project leaders.',
    shortDescription: 'Google’s job-ready credential covering Agile, Scrum, risk management, documentation, and 100+ hours of PMP-aligned training.',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
    providerId: 'prov-coursera',
    providerName: 'Coursera',
    providerLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    categoryId: 'cat-pm',
    categoryName: 'Project Management',
    subcategoryId: 'sub-agile',
    subcategoryName: 'Agile',
    skills: ['Agile', 'Scrum', 'Project Documentation', 'Risk Management', 'Stakeholder Management', 'Sprint Planning'],
    level: 'Beginner',
    language: 'English',
    duration: '6 Months (8 hrs/wk)',
    pricing: { isFree: false, originalPrice: 49, discountPrice: 49, currency: 'USD', freeAuditAvailable: true },
    certificateInformation: {
      hasCertificate: true,
      isCertificateFree: false,
      certificateCondition: 'Audit mode allows free viewing of all lessons. Graded assignments and Google Certificate require paid subscription.'
    },
    syllabus: [
      { week: 1, title: 'Foundations of Project Management', topics: ['Project Life Cycle', 'Organizational Culture', 'PM Methodologies'] },
      { week: 2, title: 'Project Initiation: Starting a Successful Project', topics: ['Project Charter', 'Stakeholder Analysis', 'OKRs'] },
      { week: 3, title: 'Project Planning: Putting It All Together', topics: ['Work Breakdown Structures', 'Budgeting', 'Risk Register'] },
      { week: 4, title: 'Agile Project Management', topics: ['Scrum Framework', 'Daily Standups', 'Retrospectives', 'Jira'] }
    ],
    prerequisites: ['None. Applicable to any academic or career background.'],
    learningOutcomes: [
      'Master Agile and Scrum frameworks used by top tech companies',
      'Create project documentation including project charters, budgets, and risk plans',
      'Qualify for 100+ hours of project management education for CAPM certification'
    ],
    officialUrl: 'https://www.coursera.org/professional-certificates/google-project-management',
    rating: 4.8,
    reviewCount: 39500,
    verificationStatus: 'Verified',
    lastVerifiedAt: '2026-11-09',
    format: 'Self-paced',
    isProfessionalCertification: true
  }
];

export const INITIAL_CAREERS: Career[] = [
  {
    id: 'career-ai-engineer',
    title: 'AI & Machine Learning Engineer',
    slug: 'ai-machine-learning-engineer',
    category: 'cat-ai',
    iconName: 'BrainCircuit',
    overview: 'AI and Machine Learning Engineers research, design, build, and deploy production software systems that learn from data, generate content, and solve complex reasoning tasks.',
    responsibilities: [
      'Design, train, fine-tune, and evaluate deep learning and LLM architectures',
      'Deploy scalable machine learning pipelines and RAG vector search systems',
      'Optimize neural model inference speed and memory footprint on GPUs'
    ],
    requiredSkills: ['Python', 'PyTorch', 'TensorFlow', 'LLMs', 'Vector Databases', 'Linear Algebra', 'Docker'],
    recommendedCourses: ['course-cs50x', 'course-ml-specialization', 'course-google-genai-path'],
    suggestedProjects: [
      { title: 'Retrieval Augmented Generation (RAG) Document Agent', description: 'Build a private vector search chatbot for enterprise documents using Gemini API and LangChain.', tech: ['Python', 'Gemini API', 'FAISS', 'FastAPI'] },
      { title: 'Computer Vision Defect Classifier', description: 'Train a convolutional neural network with PyTorch to detect manufacturing defects in imagery.', tech: ['PyTorch', 'OpenCV', 'Docker'] }
    ],
    toolsToLearn: ['PyTorch', 'LangChain', 'Docker', 'FastAPI', 'ChromaDB', 'Weights & Biases'],
    entryQualifications: 'Proficiency in Python and calculus/linear algebra fundamentals. A portfolio of applied projects counts more than a specialized degree.',
    averageSalaryRange: '$115,000 - $185,000 / year (₹15L - ₹45L in India)',
    marketDemand: 'Very High'
  },
  {
    id: 'career-fullstack-dev',
    title: 'Full Stack Software Engineer',
    slug: 'full-stack-software-engineer',
    category: 'cat-web-dev',
    iconName: 'Code',
    overview: 'Full Stack Developers create entire web applications from responsive interactive user interfaces to cloud databases, secure APIs, and server infrastructure.',
    responsibilities: [
      'Develop modern, responsive client-side applications with React and TypeScript',
      'Construct secure REST and GraphQL APIs with Node.js and Python',
      'Design database schemas and optimize query execution plans in SQL and NoSQL'
    ],
    requiredSkills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'Git'],
    recommendedCourses: ['course-cs50x', 'course-fcc-responsive-web', 'course-skillslearn-fullstack'],
    suggestedProjects: [
      { title: 'Collaborative Real-Time Workspace', description: 'Build a multi-user board with live cursor presence, authentication, and database persistence.', tech: ['React', 'Node.js', 'WebSockets', 'PostgreSQL'] }
    ],
    toolsToLearn: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Git', 'Vercel'],
    entryQualifications: 'Demonstrable portfolio of 3+ live deployed full stack web applications with accessible code on GitHub.',
    averageSalaryRange: '$90,000 - $150,000 / year (₹8L - ₹28L in India)',
    marketDemand: 'Very High'
  },
  {
    id: 'career-cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    slug: 'cybersecurity-analyst',
    category: 'cat-cybersecurity',
    iconName: 'ShieldCheck',
    overview: 'Cybersecurity Analysts protect networks, cloud systems, and sensitive data from cyber threats, monitoring security alerts, triaging incidents, and auditing configurations.',
    responsibilities: [
      'Monitor Security Information and Event Management (SIEM) systems for intrusions',
      'Investigate security anomalies, isolate compromised endpoints, and lead remediation',
      'Perform regular vulnerability assessments and write compliance audit documentation'
    ],
    requiredSkills: ['Network Security', 'Linux', 'Python', 'SIEM (Splunk/Chronicle)', 'IDS/IPS', 'Cryptography'],
    recommendedCourses: ['course-cisco-intro-cyber', 'course-google-cybersecurity'],
    suggestedProjects: [
      { title: 'Home Lab SOC & Threat Detection Pipeline', description: 'Configure a virtual private network lab running Suricata IDS and Splunk to ingest and analyze malicious traffic.', tech: ['Linux', 'Splunk', 'Suricata', 'Wireshark'] }
    ],
    toolsToLearn: ['Wireshark', 'Splunk', 'Chronicle', 'Kali Linux', 'Burp Suite', 'Nessus'],
    entryQualifications: 'Strong understanding of TCP/IP networking, operating system internals, and a reputable credential like CompTIA Security+ or Google Cybersecurity.',
    averageSalaryRange: '$85,000 - $140,000 / year (₹7L - ₹24L in India)',
    marketDemand: 'Very High'
  },
  {
    id: 'career-cloud-architect',
    title: 'Cloud Solutions Architect',
    slug: 'cloud-solutions-architect',
    category: 'cat-cloud',
    iconName: 'Cloud',
    overview: 'Cloud Architects design resilient, highly available, secure, and cost-optimized infrastructure architectures across major cloud hyperscalers like AWS, Azure, and Google Cloud.',
    responsibilities: [
      'Translate business requirements into scalable cloud architectures',
      'Design multi-region disaster recovery and high availability systems',
      'Implement cloud governance, zero-trust network topology, and FinOps budgeting'
    ],
    requiredSkills: ['AWS', 'Microsoft Azure', 'Terraform', 'Docker', 'Kubernetes', 'Networking', 'Security Architecture'],
    recommendedCourses: ['course-aws-cloud-practitioner', 'course-microsoft-azure-fund'],
    suggestedProjects: [
      { title: 'Multi-Tier Cloud Infrastructure with Terraform', description: 'Deploy an automated, highly available web service architecture across multiple availability zones using Infrastructure-as-Code.', tech: ['AWS', 'Terraform', 'Docker', 'GitHub Actions'] }
    ],
    toolsToLearn: ['Terraform', 'AWS Console', 'Azure CLI', 'Docker', 'Kubernetes', 'Prometheus'],
    entryQualifications: 'Solid background in networking and systems administration, coupled with associate/professional cloud certifications.',
    averageSalaryRange: '$120,000 - $190,000 / year (₹16L - ₹42L in India)',
    marketDemand: 'High'
  },
  {
    id: 'career-ui-ux-designer',
    title: 'UI/UX & Product Designer',
    slug: 'ui-ux-product-designer',
    category: 'cat-design',
    iconName: 'Palette',
    overview: 'UI/UX Designers conduct user research, craft wireframes, define design systems, and build beautiful interactive prototypes that deliver intuitive user experiences.',
    responsibilities: [
      'Conduct user interviews, usability testing, and synthesize quantitative behavioral analytics',
      'Design wireframes, component design systems, and high-fidelity prototypes in Figma',
      'Collaborate closely with engineers to ensure design fidelity and responsive execution'
    ],
    requiredSkills: ['UI/UX Design', 'Figma', 'User Research', 'Wireframing', 'Design Systems', 'Micro-interactions'],
    recommendedCourses: ['course-google-ux', 'course-fcc-responsive-web'],
    suggestedProjects: [
      { title: 'End-to-End Mobile EdTech Product Case Study', description: 'Conduct empathy research, design wireframes, build a design system, and test interactive prototypes in Figma.', tech: ['Figma', 'FigJam', 'Miro', 'Maze'] }
    ],
    toolsToLearn: ['Figma', 'FigJam', 'Notion', 'Maze', 'Lottie', 'Adobe Illustrator'],
    entryQualifications: 'A strong case study portfolio demonstrating your problem-solving process, research insights, and polished visual craft.',
    averageSalaryRange: '$80,000 - $135,000 / year (₹6L - ₹22L in India)',
    marketDemand: 'High'
  },
  {
    id: 'career-data-analyst',
    title: 'Data Analyst',
    slug: 'data-analyst',
    category: 'cat-data-science',
    iconName: 'Database',
    overview: 'Data Analysts transform raw numbers into actionable business intelligence by cleaning data, designing SQL queries, and creating automated executive dashboards.',
    responsibilities: [
      'Write complex SQL queries to extract, transform, and aggregate data from warehouses',
      'Build automated interactive dashboards in Power BI and Tableau for stakeholders',
      'Perform exploratory data analysis in Python or Excel to uncover growth opportunities'
    ],
    requiredSkills: ['SQL', 'Excel', 'Power BI', 'Tableau', 'Python', 'Statistics'],
    recommendedCourses: ['course-cs50x', 'course-mit-6001'],
    suggestedProjects: [
      { title: 'E-Commerce Churn & Revenue Analytics Dashboard', description: 'Clean transactional data with Python Pandas, model in SQL, and build an executive Power BI dashboard.', tech: ['SQL', 'Python', 'Power BI'] }
    ],
    toolsToLearn: ['SQL', 'Power BI', 'Tableau', 'Excel', 'Pandas', 'Google BigQuery'],
    entryQualifications: 'Demonstrated mastery of SQL, data modeling, and visualization portfolios.',
    averageSalaryRange: '$75,000 - $115,000 / year (₹5L - ₹18L in India)',
    marketDemand: 'High'
  }
];

export const INITIAL_SKILLS: Skill[] = [
  {
    id: 'skill-python',
    name: 'Python Programming',
    slug: 'python',
    category: 'cat-programming',
    difficulty: 'Beginner',
    description: 'Python is a high-level, interpreted programming language renowned for clear syntax, massive ecosystem, and unmatched dominance in AI, data science, automation, and backend web engineering.',
    whyLearn: 'Python is the undisputed lingua franca of artificial intelligence, machine learning, and data analytics. Its readable syntax allows beginners to build software rapidly while scaling to enterprise production.',
    prerequisites: ['Basic computer literacy', 'Logical thinking'],
    relatedSkills: ['Data Analysis', 'Machine Learning', 'SQL', 'FastAPI', 'Pandas'],
    recommendedCourseIds: ['course-mit-6001', 'course-cs50x'],
    freeResources: [
      { title: 'Official Python Documentation & Tutorial', type: 'Documentation', url: 'https://docs.python.org/3/tutorial/', provider: 'Python Software Foundation' },
      { title: 'Python for Beginners (Full Course)', type: 'Tutorial', url: 'https://www.freecodecamp.org/news/python-for-beginners-handbook/', provider: 'freeCodeCamp' },
      { title: 'Automate the Boring Stuff with Python', type: 'Handbook', url: 'https://automatetheboringstuff.com/', provider: 'Al Sweigart (Open Access)' }
    ],
    certificateOpportunities: [
      { title: 'CS50\'s Introduction to Programming with Python', provider: 'Harvard University (edX)', type: 'Free Certificate', url: 'https://cs50.harvard.edu/python/' },
      { title: 'Scientific Computing with Python Certification', provider: 'freeCodeCamp', type: 'Free Certificate', url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/' },
      { title: 'Python Institute PCEP Certified Entry-Level Python Programmer', provider: 'Python Institute / Cisco NetAcad', type: 'Professional Certification', url: 'https://pythoninstitute.org/pcep' }
    ],
    practicalProjects: [
      { title: 'CLI Personal Expense Tracker with CSV Export', difficulty: 'Beginner', description: 'Build an interactive command-line application to log expenses, categorize purchases, and generate formatted budget reports.', deliverables: ['Command-line CLI', 'CSV persistent storage', 'Unit tests with pytest'] },
      { title: 'Automated Web Scraper & Price Tracker', difficulty: 'Intermediate', description: 'Scrape e-commerce or job listings using BeautifulSoup and Requests, sending alerts when price drop thresholds occur.', deliverables: ['Automated CRON script', 'HTML parser', 'Telegram/Discord webhook alert'] },
      { title: 'High-Concurrency REST API with FastAPI and SQLite', difficulty: 'Advanced', description: 'Architect an asynchronous RESTful API with Pydantic validation, JWT authentication, and automated Swagger documentation.', deliverables: ['Asynchronous endpoints', 'JWT auth middleware', 'Docker container'] }
    ],
    careerLinks: [
      { careerId: 'career-ai-engineer', careerTitle: 'AI / Machine Learning Engineer', demandLevel: 'Very High' },
      { careerId: 'career-fullstack-dev', careerTitle: 'Full-Stack Software Engineer', demandLevel: 'Very High' },
      { careerId: 'career-data-analyst', careerTitle: 'Data Analyst', demandLevel: 'High' }
    ],
    courseCount: 8,
    popular: true
  },
  {
    id: 'skill-machine-learning',
    name: 'Machine Learning',
    slug: 'machine-learning',
    category: 'cat-ml',
    difficulty: 'Intermediate',
    description: 'The science of building algorithms and statistical models that computer systems use to perform tasks without explicit instructions, relying on patterns and inference.',
    whyLearn: 'Machine Learning powers modern predictive systems, automated decision-making, recommendation engines, autonomous systems, and generative intelligence worldwide.',
    prerequisites: ['Python Programming', 'Linear Algebra & Calculus', 'Basic Probability & Statistics'],
    relatedSkills: ['Deep Learning', 'Python Programming', 'Data Analysis', 'SQL', 'PyTorch'],
    recommendedCourseIds: ['course-ml-specialization', 'course-infosys-ai-foundation'],
    freeResources: [
      { title: 'Google Machine Learning Crash Course', type: 'Interactive', url: 'https://developers.google.com/machine-learning/crash-course', provider: 'Google Developers' },
      { title: 'Scikit-Learn User Guide & Tutorials', type: 'Documentation', url: 'https://scikit-learn.org/stable/user_guide.html', provider: 'Scikit-Learn Org' },
      { title: 'Kaggle Learn: Intro to Machine Learning', type: 'Interactive', url: 'https://www.kaggle.com/learn/intro-to-machine-learning', provider: 'Kaggle' }
    ],
    certificateOpportunities: [
      { title: 'Machine Learning Specialization Certificate', provider: 'DeepLearning.AI & Stanford (Coursera)', type: 'Professional Certification', url: 'https://www.coursera.org/specializations/machine-learning-introduction' },
      { title: 'Machine Learning with Python Badge', provider: 'IBM SkillsBuild', type: 'Digital Badge', url: 'https://skillsbuild.org/' },
      { title: 'Kaggle Machine Learning Competence Certificate', provider: 'Kaggle Learn', type: 'Free Certificate', url: 'https://www.kaggle.com/learn' }
    ],
    practicalProjects: [
      { title: 'Customer Churn Predictor with Gradient Boosting', difficulty: 'Beginner', description: 'Train a Random Forest and XGBoost model on customer behavioral metrics to predict and prevent customer churn.', deliverables: ['Jupyter Notebook', 'ROC-AUC evaluation plot', 'Feature importance analysis'] },
      { title: 'Credit Card Fraud Detection with Imbalanced Data', difficulty: 'Intermediate', description: 'Handle heavy class imbalance using SMOTE and anomaly detection models to flag fraudulent transactions in real time.', deliverables: ['SMOTE pipeline', 'Precision-recall curve', 'Model evaluation report'] },
      { title: 'End-to-End MLOps Pipeline with MLflow & Streamlit', difficulty: 'Advanced', description: 'Track hyperparameters, version models with MLflow, and serve interactive predictions via a containerized Streamlit UI.', deliverables: ['MLflow tracking server', 'Streamlit dashboard', 'Dockerized deployment'] }
    ],
    careerLinks: [
      { careerId: 'career-ai-engineer', careerTitle: 'AI / Machine Learning Engineer', demandLevel: 'Very High' },
      { careerId: 'career-data-analyst', careerTitle: 'Data Analyst', demandLevel: 'High' }
    ],
    courseCount: 6,
    popular: true
  },
  {
    id: 'skill-generative-ai',
    name: 'Generative AI & LLMs',
    slug: 'generative-ai',
    category: 'cat-ai',
    difficulty: 'Intermediate',
    description: 'Techniques and architectures behind generative models including Transformers, diffusion models, LLM fine-tuning, RAG (Retrieval-Augmented Generation), and multi-modal agents.',
    whyLearn: 'Generative AI is transforming industries from software development to customer experience. Engineers skilled in prompt engineering, embeddings, vector databases, and LLM fine-tuning command top-tier compensation.',
    prerequisites: ['Python Programming', 'Machine Learning Basics', 'API integration'],
    relatedSkills: ['Prompt Engineering', 'Deep Learning', 'Python Programming', 'Vector DBs'],
    recommendedCourseIds: ['course-google-genai-path', 'course-nvidia-genai-llm'],
    freeResources: [
      { title: 'Google Cloud Generative AI Learning Path', type: 'Open Course', url: 'https://www.cloudskillsboost.google/paths/118', provider: 'Google Cloud Skills Boost' },
      { title: 'Prompt Engineering Guide (DAIR.AI)', type: 'Handbook', url: 'https://www.promptingguide.ai/', provider: 'DAIR.AI' },
      { title: 'Hugging Face NLP Course', type: 'Open Course', url: 'https://huggingface.co/learn/nlp-course', provider: 'Hugging Face' }
    ],
    certificateOpportunities: [
      { title: 'Google Cloud Introduction to Generative AI Badge', provider: 'Google Cloud Skills Boost', type: 'Digital Badge', url: 'https://www.cloudskillsboost.google/' },
      { title: 'Generative AI with Large Language Models Certificate', provider: 'DeepLearning.AI & AWS (Coursera)', type: 'Professional Certification', url: 'https://www.coursera.org/learn/generative-ai-with-llms' },
      { title: 'Building LLM Applications Certificate', provider: 'NVIDIA Deep Learning Institute', type: 'Professional Certification', url: 'https://www.nvidia.com/en-us/training/' }
    ],
    practicalProjects: [
      { title: 'Enterprise Document Q&A with RAG & Vector Embeddings', difficulty: 'Intermediate', description: 'Chunk and embed PDF documents into ChromaDB or Pinecone and implement hybrid search with Gemini Flash for factual grounding.', deliverables: ['Vector database pipeline', 'Cosine similarity search', 'Grounded conversational UI'] },
      { title: 'Autonomous Multi-Agent Researcher with LangGraph', difficulty: 'Advanced', description: 'Design coordinated AI agents that search the web, critique findings, draft executive memos, and cite primary sources.', deliverables: ['State graph architecture', 'Tool-calling execution loop', 'Markdown executive summary report'] }
    ],
    careerLinks: [
      { careerId: 'career-ai-engineer', careerTitle: 'AI / Machine Learning Engineer', demandLevel: 'Very High' }
    ],
    courseCount: 5,
    popular: true
  },
  {
    id: 'skill-sql',
    name: 'SQL & Database Design',
    slug: 'sql',
    category: 'cat-database',
    difficulty: 'Beginner',
    description: 'Structured Query Language (SQL) is the global standard for querying, defining, and manipulating data across relational databases like PostgreSQL, MySQL, and BigQuery.',
    whyLearn: 'SQL is the second most requested skill in technical job postings. Whether you are a backend engineer, data analyst, or product manager, relational querying is foundational.',
    prerequisites: ['Basic logical reasoning'],
    relatedSkills: ['Data Analysis', 'Python Programming', 'PostgreSQL', 'Database Indexing'],
    recommendedCourseIds: ['course-cs50x', 'course-mit-6001'],
    freeResources: [
      { title: 'PostgreSQL Official Documentation & Tutorials', type: 'Documentation', url: 'https://www.postgresql.org/docs/', provider: 'PostgreSQL Global Development Group' },
      { title: 'SQLZoo Interactive SQL Practice', type: 'Interactive', url: 'https://sqlzoo.net/', provider: 'SQLZoo' },
      { title: 'Select Star SQL Interactive Book', type: 'Handbook', url: 'https://selectstarsql.com/', provider: 'Zi Chong Kao' }
    ],
    certificateOpportunities: [
      { title: 'Relational Database Certification', provider: 'freeCodeCamp', type: 'Free Certificate', url: 'https://www.freecodecamp.org/learn/relational-database/' },
      { title: 'Google Data Analytics Professional Certificate', provider: 'Google (Coursera)', type: 'Professional Certification', url: 'https://www.coursera.org/professional-certificates/google-data-analytics' }
    ],
    practicalProjects: [
      { title: 'E-Commerce Database Schema & Complex KPI Queries', difficulty: 'Beginner', description: 'Design third-normal form (3NF) relational tables for customers, orders, and payments with CTEs and window functions.', deliverables: ['Entity Relationship Diagram (ERD)', 'Normalized DDL scripts', 'Monthly cohort retention query'] },
      { title: 'Database Optimization & Query Execution Plan Audit', difficulty: 'Intermediate', description: 'Profile slow queries using EXPLAIN ANALYZE, creating composite B-Tree indexes and partitioning large transactional tables.', deliverables: ['Query profiling report', 'B-Tree & GIN index implementation', 'Performance benchmark'] }
    ],
    careerLinks: [
      { careerId: 'career-data-analyst', careerTitle: 'Data Analyst', demandLevel: 'High' },
      { careerId: 'career-fullstack-dev', careerTitle: 'Software Developer', demandLevel: 'Very High' }
    ],
    courseCount: 7,
    popular: true
  },
  {
    id: 'skill-react',
    name: 'React & Modern Frontend',
    slug: 'react',
    category: 'cat-web-dev',
    difficulty: 'Intermediate',
    description: 'The world\'s most popular JavaScript library for building component-driven, stateful, and performant web user interfaces.',
    whyLearn: 'React powers the majority of modern web applications. Learning React along with hooks, state management, and modern bundlers opens up thousands of frontend developer opportunities.',
    prerequisites: ['HTML5 & CSS3', 'JavaScript (ES6+)'],
    relatedSkills: ['TypeScript', 'Tailwind CSS', 'Next.js', 'Web Accessibility'],
    recommendedCourseIds: ['course-fcc-responsive-web', 'course-skillslearn-fullstack'],
    freeResources: [
      { title: 'React Official Documentation (react.dev)', type: 'Documentation', url: 'https://react.dev/', provider: 'Meta Open Source' },
      { title: 'Scrimba Interactive React Course', type: 'Interactive', url: 'https://scrimba.com/learn/learnreact', provider: 'Scrimba' },
      { title: 'Full Stack Open: React Section', type: 'Open Course', url: 'https://fullstackopen.com/en/', provider: 'University of Helsinki' }
    ],
    certificateOpportunities: [
      { title: 'Front End Development Libraries Certification', provider: 'freeCodeCamp', type: 'Free Certificate', url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/' },
      { title: 'Meta Front-End Developer Professional Certificate', provider: 'Meta (Coursera)', type: 'Professional Certification', url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer' }
    ],
    practicalProjects: [
      { title: 'Real-Time Kanban Task Management Board', difficulty: 'Intermediate', description: 'Create a drag-and-drop workflow dashboard with optimistic updates, local storage sync, and custom theme switches.', deliverables: ['Drag and drop interaction', 'Custom hooks state management', 'Responsive mobile layout'] },
      { title: 'High-Performance E-Commerce Catalog with Virtualization', difficulty: 'Advanced', description: 'Build an e-commerce catalog rendering 10,000+ items with windowing, dynamic faceted search, and shopping cart persistence.', deliverables: ['List virtualization', 'URL-driven search filters', 'Lighthouse 95+ score'] }
    ],
    careerLinks: [
      { careerId: 'career-fullstack-dev', careerTitle: 'Software Developer', demandLevel: 'Very High' }
    ],
    courseCount: 7,
    popular: true
  },
  {
    id: 'skill-cybersecurity',
    name: 'Cybersecurity & Threat Analysis',
    slug: 'cybersecurity',
    category: 'cat-cybersecurity',
    difficulty: 'Intermediate',
    description: 'Practices and technologies designed to protect networks, devices, programs, and enterprise data from malicious attack, damage, or unauthorized intrusion.',
    whyLearn: 'With global cyber threats growing exponential, cybersecurity specialists face massive talent shortages and high job security across defense, finance, and tech.',
    prerequisites: ['Networking fundamentals (TCP/IP)', 'Linux command line'],
    relatedSkills: ['Network Security', 'Linux Administration', 'Ethical Hacking', 'SIEM Tools'],
    recommendedCourseIds: ['course-cisco-intro-cyber', 'course-google-cybersecurity'],
    freeResources: [
      { title: 'Cisco Skills for All: Introduction to Cybersecurity', type: 'Open Course', url: 'https://skillsforall.com/course/introduction-to-cybersecurity', provider: 'Cisco Networking Academy' },
      { title: 'OWASP Top 10 Security Risks Guide', type: 'Handbook', url: 'https://owasp.org/www-project-top-ten/', provider: 'OWASP Foundation' },
      { title: 'TryHackMe Pre-Security Learning Path', type: 'Interactive', url: 'https://tryhackme.com/path/outline/presecurity', provider: 'TryHackMe' }
    ],
    certificateOpportunities: [
      { title: 'Cisco Introduction to Cybersecurity Digital Badge', provider: 'Cisco Networking Academy', type: 'Digital Badge', url: 'https://www.credly.com/org/cisco' },
      { title: 'Google Cybersecurity Professional Certificate', provider: 'Google (Coursera)', type: 'Professional Certification', url: 'https://www.coursera.org/professional-certificates/google-cybersecurity' },
      { title: 'CompTIA Security+ Certification', provider: 'CompTIA', type: 'Professional Certification', url: 'https://www.comptia.org/certifications/security' }
    ],
    practicalProjects: [
      { title: 'Network Packet Sniffer & Malicious Traffic Analyzer', difficulty: 'Intermediate', description: 'Capture live network traffic with Wireshark/Scapy, identify unauthorized port scanning, and output an incident report.', deliverables: ['PCAP traffic capture', 'Security incident analysis document', 'Suricata rule set'] },
      { title: 'SIEM Log Ingestion & Threat Detection Dashboard', difficulty: 'Advanced', description: 'Stream Linux auth logs into Splunk or ELK, build alert rules for brute force SSH attempts, and trigger automated quarantine.', deliverables: ['Syslog ingestion pipeline', 'Splunk alert query', 'Incident response playbook'] }
    ],
    careerLinks: [
      { careerId: 'career-cyber-analyst', careerTitle: 'Cybersecurity Analyst', demandLevel: 'Very High' }
    ],
    courseCount: 5,
    popular: true
  },
  {
    id: 'skill-cloud-aws',
    name: 'Cloud Computing (AWS & Architecture)',
    slug: 'cloud-aws',
    category: 'cat-cloud',
    difficulty: 'Intermediate',
    description: 'On-demand delivery of compute, storage, databases, and networking over the internet, focusing on scalable Amazon Web Services (AWS) infrastructure.',
    whyLearn: 'AWS holds the largest global cloud market share. Cloud-certified engineers are vital to modern digital transformation and DevOps pipelines.',
    prerequisites: ['Basic networking', 'Operating systems basics'],
    relatedSkills: ['Docker & Kubernetes', 'DevOps & CI/CD', 'Linux Administration', 'Terraform'],
    recommendedCourseIds: ['course-aws-cloud-practitioner', 'course-microsoft-azure-fund'],
    freeResources: [
      { title: 'AWS Skill Builder Official Free Courses', type: 'Open Course', url: 'https://explore.skillbuilder.aws/', provider: 'AWS Skill Builder' },
      { title: 'AWS Well-Architected Framework Whitepapers', type: 'Handbook', url: 'https://aws.amazon.com/architecture/well-architected/', provider: 'Amazon Web Services' },
      { title: 'FreeCodeCamp AWS Certified Cloud Practitioner Full Course', type: 'Tutorial', url: 'https://www.freecodecamp.org/news/aws-certified-cloud-practitioner-study-course/', provider: 'freeCodeCamp' }
    ],
    certificateOpportunities: [
      { title: 'AWS Certified Cloud Practitioner (CLF-C02)', provider: 'Amazon Web Services', type: 'Professional Certification', url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/' },
      { title: 'AWS Cloud Quest Digital Badges', provider: 'AWS Skill Builder', type: 'Digital Badge', url: 'https://aws.amazon.com/training/digital/aws-cloud-quest/' },
      { title: 'AWS Certified Solutions Architect – Associate', provider: 'Amazon Web Services', type: 'Professional Certification', url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/' }
    ],
    practicalProjects: [
      { title: 'Serverless REST API with AWS Lambda, API Gateway & DynamoDB', difficulty: 'Beginner', description: 'Deploy an auto-scaling serverless API that handles user signups and stores records in NoSQL DynamoDB without managing servers.', deliverables: ['SAM/Serverless framework template', 'DynamoDB table schema', 'Postman test collection'] },
      { title: 'Multi-AZ High Availability Architecture with Terraform', difficulty: 'Advanced', description: 'Provision a VPC with public/private subnets, Application Load Balancer, EC2 Auto Scaling, and RDS Multi-AZ via Terraform.', deliverables: ['Terraform HCL infrastructure code', 'Architecture diagram', 'Disaster recovery failover plan'] }
    ],
    careerLinks: [
      { careerId: 'career-cloud-architect', careerTitle: 'Cloud Solutions Architect', demandLevel: 'Very High' },
      { careerId: 'career-fullstack-dev', careerTitle: 'Software Developer', demandLevel: 'Very High' }
    ],
    courseCount: 6,
    popular: true
  },
  {
    id: 'skill-data-structures-algorithms',
    name: 'Data Structures & Algorithms',
    slug: 'data-structures-algorithms',
    category: 'cat-programming',
    difficulty: 'Advanced',
    description: 'Fundamental computer science concepts including arrays, linked lists, trees, graphs, sorting algorithms, and dynamic programming for optimal time and space complexity.',
    whyLearn: 'Mastery of DSA is essential for passing top-tier technical interviews (Google, Meta, Microsoft) and designing scalable, memory-efficient software systems.',
    prerequisites: ['Proficiency in one programming language (Python, C++, Java, or Go)'],
    relatedSkills: ['Python Programming', 'System Design', 'C Programming'],
    recommendedCourseIds: ['course-cs50x', 'course-nptel-dsa-java'],
    freeResources: [
      { title: 'CS50x Harvard Lectures on Data Structures', type: 'Open Course', url: 'https://cs50.harvard.edu/x/', provider: 'Harvard University' },
      { title: 'Visualgo: Visualizing Algorithms & Data Structures', type: 'Interactive', url: 'https://visualgo.net/', provider: 'Dr. Steven Halim' },
      { title: 'NeetCode Roadmap & Problem Explanations', type: 'Handbook', url: 'https://neetcode.io/roadmap', provider: 'NeetCode' }
    ],
    certificateOpportunities: [
      { title: 'Data Structures & Algorithms in Java Certification', provider: 'NPTEL & IIT Kharagpur', type: 'Professional Certification', url: 'https://nptel.ac.in/' },
      { title: 'CS50 Certificate of Completion', provider: 'Harvard CS50', type: 'Free Certificate', url: 'https://cs50.harvard.edu/x/' }
    ],
    practicalProjects: [
      { title: 'Custom In-Memory Cache with LRU Eviction Policy', difficulty: 'Intermediate', description: 'Implement an O(1) Least Recently Used (LRU) cache using a hash map combined with a doubly linked list.', deliverables: ['Thread-safe cache class', 'Benchmark suite vs standard map', 'Automated unit tests'] },
      { title: 'GPS Shortest Path Navigation Engine with Dijkstra & A*', difficulty: 'Advanced', description: 'Build a graph traversal engine that calculates shortest road routes across geographical coordinates with visual step animations.', deliverables: ['Adjacency list graph model', 'A* heuristic implementation', 'Interactive route visualizer'] }
    ],
    careerLinks: [
      { careerId: 'career-fullstack-dev', careerTitle: 'Software Developer', demandLevel: 'Very High' },
      { careerId: 'career-ai-engineer', careerTitle: 'AI / Machine Learning Engineer', demandLevel: 'Very High' }
    ],
    courseCount: 6,
    popular: true
  },
  {
    id: 'skill-figma-uiux',
    name: 'UI/UX Design & Prototyping',
    slug: 'figma-uiux',
    category: 'cat-design',
    difficulty: 'Beginner',
    description: 'Human-centered digital product design principles, user research, wireframing, component design systems, and interactive prototyping using industry-standard tools like Figma.',
    whyLearn: 'Every software product relies on empathetic user experiences. UI/UX designers bridge human behavior with business success, driving usability, conversion, and user delight.',
    prerequisites: ['Creative curiosity', 'Visual aesthetics appreciation'],
    relatedSkills: ['User Research', 'Design Systems', 'Web Accessibility', 'HTML5 & CSS3'],
    recommendedCourseIds: ['course-google-ux', 'course-fcc-responsive-web'],
    freeResources: [
      { title: 'Figma Learn & Official Video Tutorials', type: 'Tutorial', url: 'https://help.figma.com/hc/en-us/categories/360002051613-Learn-design', provider: 'Figma' },
      { title: 'Laws of UX: Behavioral Principles for Designers', type: 'Handbook', url: 'https://lawsofux.com/', provider: 'Jon Yablonski' },
      { title: 'Nielsen Norman Group UX Articles & Guidelines', type: 'Handbook', url: 'https://www.nngroup.com/articles/', provider: 'Nielsen Norman Group' }
    ],
    certificateOpportunities: [
      { title: 'Google UX Design Professional Certificate', provider: 'Google (Coursera)', type: 'Professional Certification', url: 'https://www.coursera.org/professional-certificates/google-ux-design' },
      { title: 'Figma Certified Creator / Badge', provider: 'Figma Community', type: 'Digital Badge', url: 'https://www.figma.com/community' }
    ],
    practicalProjects: [
      { title: 'Mobile Healthcare Telemedicine App Case Study', difficulty: 'Beginner', description: 'Conduct 5 user interviews, create empathy maps, user personas, low-fi wireframes, and a high-fidelity interactive prototype.', deliverables: ['Empathy research findings', 'Figma design system tokens', 'Clickable mobile prototype'] },
      { title: 'Comprehensive SaaS Design System with Auto-Layout 5.0', difficulty: 'Intermediate', description: 'Build an atomic design system with accessible color palettes, typography scales, responsive components, and dark/light variants.', deliverables: ['Atomic component library', 'WCAG AA contrast audit', 'Developer handoff documentation'] }
    ],
    careerLinks: [
      { careerId: 'career-ui-ux-designer', careerTitle: 'UI/UX & Product Designer', demandLevel: 'High' }
    ],
    courseCount: 4,
    popular: true
  },
  {
    id: 'skill-typescript',
    name: 'TypeScript & Type Systems',
    slug: 'typescript',
    category: 'cat-programming',
    difficulty: 'Intermediate',
    description: 'A strongly typed programming language that builds on JavaScript, giving you better tooling, compile-time error detection, and enterprise-grade maintainability.',
    whyLearn: 'TypeScript is used in almost every serious modern web and node.js codebase. It dramatically cuts runtime errors and enhances developer productivity in team environments.',
    prerequisites: ['Proficiency in modern JavaScript (ES6+)'],
    relatedSkills: ['React & Modern Frontend', 'Node.js', 'System Design'],
    recommendedCourseIds: ['course-fcc-responsive-web', 'course-skillslearn-fullstack'],
    freeResources: [
      { title: 'TypeScript Official Handbook', type: 'Documentation', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', provider: 'Microsoft' },
      { title: 'Total TypeScript Free Tutorials', type: 'Tutorial', url: 'https://www.totaltypescript.com/tutorials', provider: 'Matt Pocock' },
      { title: 'Execute Program: TypeScript Track', type: 'Interactive', url: 'https://www.executeprogram.com/courses/typescript', provider: 'Gary Bernhardt' }
    ],
    certificateOpportunities: [
      { title: 'Microsoft Certified: Developing Solutions with TypeScript', provider: 'Microsoft Learn', type: 'Digital Badge', url: 'https://learn.microsoft.com/' },
      { title: 'Full Stack Open TypeScript Certificate', provider: 'University of Helsinki', type: 'Free Certificate', url: 'https://fullstackopen.com/en/part9' }
    ],
    practicalProjects: [
      { title: 'Type-Safe Form & Validation Library from Scratch', difficulty: 'Intermediate', description: 'Build a lightweight Zod-like runtime schema parser that infers strict static TypeScript types with generic constraints.', deliverables: ['Generic schema validator', 'Type inference helpers', 'Zero external dependencies'] }
    ],
    careerLinks: [
      { careerId: 'career-fullstack-dev', careerTitle: 'Software Developer', demandLevel: 'Very High' }
    ],
    courseCount: 5,
    popular: true
  },
  {
    id: 'skill-devops-docker',
    name: 'Docker & Kubernetes',
    slug: 'docker-kubernetes',
    category: 'cat-devops',
    difficulty: 'Advanced',
    description: 'Containerization and cluster orchestration technologies that package applications with dependencies to run consistently anywhere from laptop to multi-cloud clusters.',
    whyLearn: 'Containers are the bedrock of modern cloud computing and microservice architectures. Knowing Docker and Kubernetes makes you indispensable to engineering teams.',
    prerequisites: ['Linux command line', 'Basic networking', 'Basic Git'],
    relatedSkills: ['Cloud Computing (AWS)', 'DevOps & CI/CD', 'Linux Administration'],
    recommendedCourseIds: ['course-aws-cloud-practitioner', 'course-microsoft-azure-fund'],
    freeResources: [
      { title: 'Docker Official Getting Started Guide', type: 'Documentation', url: 'https://docs.docker.com/get-started/', provider: 'Docker Inc.' },
      { title: 'Kubernetes Official Interactive Tutorials', type: 'Interactive', url: 'https://kubernetes.io/docs/tutorials/', provider: 'Cloud Native Computing Foundation (CNCF)' },
      { title: 'Play with Docker Classroom', type: 'Interactive', url: 'https://training.play-with-docker.com/', provider: 'Docker Community' }
    ],
    certificateOpportunities: [
      { title: 'Certified Kubernetes Administrator (CKA)', provider: 'Linux Foundation & CNCF', type: 'Professional Certification', url: 'https://www.cncf.io/certification/cka/' },
      { title: 'Docker Certified Associate (DCA)', provider: 'Mirantis', type: 'Professional Certification', url: 'https://www.mirantis.com/training/docker-certification/' }
    ],
    practicalProjects: [
      { title: 'Production Multi-Container App with Docker Compose', difficulty: 'Intermediate', description: 'Containerize a React frontend, Node.js API, and PostgreSQL database with health checks and volume persistence.', deliverables: ['Multi-stage Dockerfiles', 'docker-compose.yml configuration', 'Zero-downtime reload script'] },
      { title: 'Auto-Scaling Kubernetes Cluster with Helm & Ingress', difficulty: 'Advanced', description: 'Deploy a microservices app onto Minikube/EKS with Horizontal Pod Autoscaler (HPA), Ingress TLS, and ConfigMaps.', deliverables: ['Helm chart package', 'HPA auto-scaling policy', 'Prometheus monitoring metrics'] }
    ],
    careerLinks: [
      { careerId: 'career-cloud-architect', careerTitle: 'Cloud Solutions Architect', demandLevel: 'Very High' },
      { careerId: 'career-fullstack-dev', careerTitle: 'Software Developer', demandLevel: 'Very High' }
    ],
    courseCount: 4,
    popular: true
  },
  {
    id: 'skill-deep-learning',
    name: 'Deep Learning & Neural Networks',
    slug: 'deep-learning',
    category: 'cat-ai',
    difficulty: 'Advanced',
    description: 'Subset of machine learning based on artificial neural networks with multiple layers, including CNNs for computer vision, RNNs/LSTMs, and Transformers for generative reasoning.',
    whyLearn: 'Deep learning is the engine behind speech recognition, computer vision, autonomous vehicles, and generative foundational models.',
    prerequisites: ['Python Programming', 'Machine Learning Basics', 'Multivariate Calculus & Linear Algebra'],
    relatedSkills: ['Machine Learning', 'Generative AI & LLMs', 'PyTorch', 'Computer Vision'],
    recommendedCourseIds: ['course-ml-specialization', 'course-nvidia-genai-llm'],
    freeResources: [
      { title: 'Deep Learning Specialization by Andrew Ng', type: 'Open Course', url: 'https://www.deeplearning.ai/courses/deep-learning-specialization/', provider: 'DeepLearning.AI' },
      { title: 'Fast.ai: Practical Deep Learning for Coders', type: 'Open Course', url: 'https://course.fast.ai/', provider: 'fast.ai' },
      { title: 'PyTorch Official Tutorials & Recipes', type: 'Documentation', url: 'https://pytorch.org/tutorials/', provider: 'PyTorch / Linux Foundation' }
    ],
    certificateOpportunities: [
      { title: 'Deep Learning Specialization Certificate', provider: 'DeepLearning.AI (Coursera)', type: 'Professional Certification', url: 'https://www.coursera.org/specializations/deep-learning' },
      { title: 'NVIDIA Fundamentals of Deep Learning Certificate', provider: 'NVIDIA Deep Learning Institute', type: 'Professional Certification', url: 'https://www.nvidia.com/en-us/training/' }
    ],
    practicalProjects: [
      { title: 'Medical Image Tumor Classifier with PyTorch CNN', difficulty: 'Advanced', description: 'Fine-tune a ResNet-50 model with transfer learning on chest X-ray scans to classify pneumonia with Grad-CAM visualization.', deliverables: ['PyTorch training pipeline', 'Grad-CAM heatmaps', 'Confusion matrix report'] }
    ],
    careerLinks: [
      { careerId: 'career-ai-engineer', careerTitle: 'AI / Machine Learning Engineer', demandLevel: 'Very High' }
    ],
    courseCount: 4,
    popular: false
  }
];

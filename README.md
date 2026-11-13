# CourseMentor AI
> **"Discover Your Path. Learn with Purpose. Build Your Future."**

CourseMentor AI is a global, AI-powered learning ecosystem, course discovery marketplace, and career guidance platform. It helps students and lifelong learners worldwide navigate online education, demystify technical terms, evaluate authentic course quality, compare offerings, and bridge their skill gaps toward dream careers.

---

## 🌟 Key Features

1. **Course Discovery Marketplace (`/explore`)**:
   - Comprehensive multi-faceted filtering: Pricing (Free vs Free Audit vs Paid), Free Verified Certificate filter, Level (Beginner to Advanced), Provider (Harvard, DeepLearning.AI, freeCodeCamp, MIT, Google, IBM), Format (Self-paced / Instructor-led), Minimum Rating.
   - Text search across course titles, skills, providers, and descriptions.
   - Smart AI recommendation mode combining algorithmic suitability scoring with Gemini AI rationale.

2. **Course Details Page (`/courses/:id`)**:
   - Explicit distinction between **Free Course Access (Auditing)** and **Verified Certificate Costs**.
   - Verified provider badges with last-verified audit date.
   - Direct official external enrollment links (un-marked-up).
   - Week-by-week syllabus breakdown, prerequisites, and learning outcomes.
   - Gemini AI Course Suitability Explainer ("Is this course right for a beginner?").

3. **Gemini AI Personal Mentor (`/mentor`)**:
   - Powered by `@google/genai` (model: `gemini-3.8-flash`) running securely on the backend.
   - Adapts to student career aspirations and experience levels.
   - Embeds verified course cards directly inside chat responses with 1-click details and bookmarks.
   - Provides suggested next prompt pills, markdown formatting, and conversation clear/reset.

4. **Career Exploration & Interactive Skill Gap Analyzer (`/careers`, `/careers/:id`)**:
   - Deep-dive guides for high-demand digital careers (AI Engineer, Full Stack Developer, Data Analyst, Cloud Solutions Architect, Cybersecurity Analyst, UI/UX Designer).
   - Interactive checklist of required skills. Learner checks what they know; Gemini calculates gap percentage, missing skills, estimated study weeks, and priority course sequence.
   - Suggested Capstone portfolio projects with modern tech stacks.

5. **Multi-Course Comparison Engine (`/compare`)**:
   - Compare up to 4 courses side-by-side in a responsive feature matrix.
   - **"Ask AI to Compare"**: Gemini AI evaluates pedagogical depth, prerequisites, project work, and delivers an objective recommendation tailored to student goals.

6. **Student Dashboard (`/dashboard`)**:
   - Overview: Saved courses, in-progress courses, completed courses, certificates recorded, hours logged, and study streak counter.
   - My Courses: Progress sliders (0-100%) and confetti celebrations on course completion.
   - Saved Courses: Bookmarked courses tray with quick compare shortcuts.
   - AI Roadmap Generator: Structured milestones, weekly targets, checkable tasks that update progress in real time.
   - Certificate Vault: Upload or record credentials (freeCodeCamp, Harvard, Google, Coursera), credential ID, verification URLs, and public shareable portfolio link!
   - Analytics: Visual weekly study hours distribution and competencies mastery radar.

7. **Admin Control Center (`/admin`)**:
   - Platform analytics & telemetry (total verified listings, active users, top searched skills).
   - Full Course Catalog CRUD with verification status management (`Verified`, `Pending`, `Expired`, `Needs Review`).
   - Provider directory management (Coursera, edX, freeCodeCamp, Google, MIT, DeepLearning.AI).
   - User roles & audit activity logs.

8. **Global Internationalization & Theme**:
   - Multi-currency switcher (USD, EUR, GBP, INR, CAD, AUD) with dynamic exchange conversion.
   - Light and Dark mode toggle.
   - Mobile-first responsive layout with slide-out drawer.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti, Motion
- **Backend**: Node.js, Express, REST APIs, tsx runner
- **AI**: Gemini API (`@google/genai`, model `gemini-3.8-flash`) executed strictly server-side
- **Storage / Database**: Enterprise in-memory database store with verified pre-seeds; full MongoDB Atlas schema compatibility
- **Dev Server**: Express full-stack server mounted with Vite development middlewares on port 3000

---

## 🚀 Getting Started

### Local Development
```bash
# 1. Install dependencies
npm install

# 2. Run dev server (Express + Vite on port 3000)
npm run dev

# 3. Build for production
npm run build

# 4. Typecheck & Lint
npm run lint
```

### Environment Configuration (`.env.example`)
```env
PORT=3000
GEMINI_API_KEY="MY_GEMINI_API_KEY"
APP_URL="MY_APP_URL"
JWT_SECRET="coursementor-ai-secure-jwt-secret-key-2026"
```
*(AI Studio automatically injects `GEMINI_API_KEY` at runtime from your Secrets panel).*

---

## 🔒 Academic Disclosure
Course access conditions (such as free auditing) and verified credentials are established solely by the original course providers (Harvard, edX, Coursera, freeCodeCamp, MIT, Google). CourseMentor AI never claims to issue third-party degrees or invent free certificate offers. All enrollments redirect directly to verified provider landing pages.

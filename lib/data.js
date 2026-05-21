import { PurpleTitle, GrayTitle } from "@/components/reusables";

export const LOGOS = [
  { src: "/amazon.svg", alt: "Amazon" },
  { src: "/atlassian.svg", alt: "Atlassian" },
  { src: "/google.webp", alt: "Google" },
  { src: "/meta.svg", alt: "Meta" },
  { src: "/microsoft.webp", alt: "Microsoft" },
  { src: "/netflix.png", alt: "Netflix" },
  { src: "/uber.svg", alt: "Uber" },
];

export const AVATARS = [
  { src: "https://randomuser.me/api/portraits/men/32.jpg" },
  { src: "https://randomuser.me/api/portraits/women/44.jpg" },
  { src: "https://randomuser.me/api/portraits/men/76.jpg" },
  { src: "https://randomuser.me/api/portraits/women/68.jpg" },
  { src: "https://randomuser.me/api/portraits/men/12.jpg" },
];

export const AI_TAGS = [
  { label: "Frontend Engineer", active: true },
  { label: "L5 Level", active: true },
  { label: "React Performance", active: false },
  { label: "System Design", active: false },
  { label: "Behavioural", active: true },
  { label: "DSA", active: false },
];

export const SLOTS = [
  {
    label: "Mon 10:00 AM",
    cls: "border-purple-400/30 text-purple-300 bg-purple-400/5",
  },
  { label: "Mon 2:00 PM", cls: "border-white/7 text-stone-500" },
  {
    label: "Tue 11:00 AM",
    cls: "border-purple-400/30 text-purple-300 bg-purple-400/5",
  },
  {
    label: "Wed 9:00 AM ✓",
    cls: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
  },
  {
    label: "Thu 3:00 PM",
    cls: "border-purple-400/30 text-purple-300 bg-purple-400/5",
  },
];

export const PLANS = [
  {
    name: "Free",
    price: "₹0",
    credits: "1 credit / month",
    featured: false,
    planId: null,
    slug: "free",
    features: [
      "1 mock interview session",
      "HD video call via Stream",
      "Persistent chat thread",
      "Job & internship listings access",
    ],
    expectFeatures: [
      "video-call",
      "chat",
    ],
  },
  {
    name: "Standard",
    price: "₹199",
    credits: "5 credits / month",
    featured: true,
    planId: "cplan_3DiDYYCTj2cmbv3XZh12NHoTz3Z",
    slug: "standard",
    features: [
      "5 mock interview sessions",
      "AI feedback report after every session",
      "HD video call via Stream",
      "Persistent chat thread",
      "Credits roll over monthly",
      "Job & internship listings access",
      "Resume review (1 per month)",
    ],
    expectFeatures: [
      "video-call",
      "ai-generator",
      "chat",
      "feedback",
    ],
  },
  {
    name: "Pro",
    price: "₹299",
    credits: "15 credits / month",
    featured: false,
    planId: "cplan_3DiDyucNMQ8iB63yyAt3for41QJ",
    slug: "pro",
    features: [
      "15 mock interview sessions",
      "AI feedback report after every session",
      "HD video call via Stream",
      "Persistent chat thread",
      "Credits roll over monthly",
      "Recording & playback link",
      "Priority job & internship listings",
      "Unlimited resume reviews",
      "Referral network access",
      "Campus & off-campus drive alerts",
    ],
    expectFeatures: [
      "video-call",
      "ai-generator",
      "chat",
      "feedback",
      "recording",
    ],
  },
];

export const ROLES = [
  {
    label: "Interviewee",
    title: <GrayTitle>Land the role you deserve</GrayTitle>,
    desc: "Stop guessing what interviewers want. Practice with people who've been on the other side and know exactly how top companies evaluate candidates — for full-time jobs and internships alike.",
    perks: [
      "Browse by category: Frontend, Backend, System Design, PM",
      "Book sessions using monthly credits from your plan",
      "Receive AI-powered feedback after every session",
      "Access session recordings to review your performance",
      "Chat with your interviewer before and after the call",
      "Browse curated job openings and internship listings",
      "Get resume reviewed by industry professionals",
      "Alerts for off-campus drives and campus recruitment",
    ],
  },
  {
    label: "Interviewer",
    title: <PurpleTitle>Earn doing what you&apos;re great at</PurpleTitle>,
    desc: "Share your knowledge, help engineers grow, and earn meaningful income on your own schedule. Set your slots, post job vacancies, and we handle the rest.",
    perks: [
      "Set your own availability and session rates",
      "AI question generator tailored to each candidate's role",
      "Earn credits per session — withdraw any time",
      "Dashboard with credit balance and withdrawal requests",
      "Post full-time job vacancies from your company",
      "List internship openings and refer top candidates",
      "Access a talent pool of vetted, interview-ready candidates",
    ],
  },
];

export const CATEGORIES = [
  { value: null, label: "All" },
  { value: "FRONTEND", label: "Frontend" },
  { value: "BACKEND", label: "Backend" },
  { value: "FULLSTACK", label: "Full Stack" },
  { value: "DSA", label: "DSA" },
  { value: "SYSTEM_DESIGN", label: "System Design" },
  { value: "BEHAVIORAL", label: "Behavioral" },
  { value: "DEVOPS", label: "DevOps" },
  { value: "MOBILE", label: "Mobile" },
];

export const CATEGORY_LABEL = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  FULLSTACK: "Full Stack",
  DSA: "DSA",
  SYSTEM_DESIGN: "System Design",
  BEHAVIORAL: "Behavioral",
  DEVOPS: "DevOps",
  MOBILE: "Mobile",
};

export const YEARS_OPTIONS = [
  { value: 1, label: "1 yr" },
  { value: 2, label: "2 yrs" },
  { value: 3, label: "3 yrs" },
  { value: 5, label: "5 yrs" },
  { value: 7, label: "7 yrs" },
  { value: 10, label: "10+ yrs" },
];

export const ONBOARDING_ROLES = [
  {
    value: "INTERVIEWEE",
    icon: "🎯",
    title: "I want to practice",
    desc: "Browse expert interviewers, book sessions, and get AI-powered feedback to land your dream job or internship.",
  },
  {
    value: "INTERVIEWER",
    icon: "🧑",
    title: "I want to interview",
    desc: "Share your expertise, earn credits, post job openings, and help engineers level up.",
  },
];

export const STATUS_STYLES = {
  SCHEDULED: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  COMPLETED: "border-green-500/20 bg-green-500/10 text-green-400",
  CANCELLED: "border-red-500/20 bg-red-500/10 text-red-400",
};

export const RATING_STYLES = {
  POOR: "ml-auto border-red-500/20 bg-red-500/10 text-red-400",
  AVERAGE: "ml-auto border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
  GOOD: "ml-auto border-blue-500/20 bg-blue-500/10 text-blue-400",
  EXCELLENT: "ml-auto border-green-500/20 bg-green-500/10 text-green-400",
};

export const RATING_LABEL = {
  POOR: "Poor",
  AVERAGE: "Average",
  GOOD: "Good",
  EXCELLENT: "Excellent",
};

export const RATING_CONFIG = {
  POOR: {
    label: "Poor",
    emoji: "📉",
    className: "border-red-500/20 bg-red-500/10 text-red-400",
    bg: "from-red-500/5",
  },
  AVERAGE: {
    label: "Average",
    emoji: "📊",
    className: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
    bg: "from-yellow-500/5",
  },
  GOOD: {
    label: "Good",
    emoji: "👍",
    className: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    bg: "from-blue-500/5",
  },
  EXCELLENT: {
    label: "Excellent",
    emoji: "🏆",
    className: "border-green-500/20 bg-green-500/10 text-green-400",
    bg: "from-green-500/5",
  },
};

export const EXPECT_ITEMS = [
  {
    feature: "video-call",
    icon: "🎥",
    title: "HD Video Call",
    desc: "45-minute session with screen sharing built in.",
  },
  {
    feature: "ai-generator",
    icon: "🤖",
    title: "AI Question Generator",
    desc: "Role-specific questions generated live during the interview.",
  },
  {
    feature: "chat",
    icon: "💬",
    title: "Persistent Chat",
    desc: "Message before and after — share notes, resources, follow-ups.",
  },
  {
    feature: "feedback",
    icon: "📊",
    title: "AI Feedback Report",
    desc: "Post-interview analysis covering technical depth, communication, and more.",
  },
  {
    feature: "recording",
    icon: "📹",
    title: "Recording & Playback",
    desc: "A shareable recording link is generated automatically after the call.",
  },
];

export const SESSION_DURATIONS = [
  {
    label: "20 min",
    value: 20,
    credits: 1,
  },
  {
    label: "30 min",
    value: 30,
    credits: 2,
  },
  {
    label: "45 min",
    value: 45,
    credits: 3,
  },
  {
    label: "1 hour",
    value: 60,
    credits: 4,
  },
];


export const SOCIALS = [
  {
    href: "https://github.com",
    label: "GitHub",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://twitter.com",
    label: "Twitter / X",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://youtube.com",
    label: "YouTube",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];
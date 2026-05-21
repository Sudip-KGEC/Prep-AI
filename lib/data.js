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
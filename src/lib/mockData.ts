// Mock data for Connectify platform

export type SubcategoryType =
  | "Fun"
  | "Technology"
  | "Education"
  | "Health"
  | "Environment"
  | "Arts"
  | "Sports"
  | "Business"
  | "Social Impact"
  | "Research"
  | "Leadership"
  | "Networking"
  | "Career Development"
  | "ETC";

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  organizationLogo?: string;
  category:
    | "Volunteering"
    | "Workshops"
    | "Competitions"
    | "Internships"
    | "Jobs"
    | "Events";
  subcategory?: SubcategoryType;
  subcategories?: SubcategoryType[];
  verified: boolean;
  verifiedDate?: string;
  isPartnered?: boolean;
  location: string;
  isRemote: boolean;
  date: string;
  deadline: string;
  description: string;
  requirements: string[];
  benefits: string[];
  status: "Open" | "Closed" | "Full";
  capacity: string;
  postedDate: string;
  lastUpdated: string;
  contact: string;
  website: string;
  coordinates: { lat: number; lng: number };
  views: number;
  applications: number;
}

export interface Submission {
  id: string;
  title: string;
  organization: string;
  category: string;
  submittedBy: string;
  submittedDate: string;
  status: "Pending" | "Approved" | "Rejected" | "Flagged";
  priority: "Normal" | "High" | "Urgent";
  timeWaiting: string;
  fullData: Partial<Opportunity>;
}

export interface FlaggedContent {
  id: string;
  contentId: string;
  contentTitle: string;
  reportReason: string;
  reporter: string;
  reportDate: string;
  severity: "Low" | "Medium" | "High";
  status: "New" | "In Progress" | "Resolved";
}

export const allSubcategories: SubcategoryType[] = [
  "Fun",
  "Technology",
  "Education",
  "Health",
  "Environment",
  "Arts",
  "Sports",
  "Business",
  "Social Impact",
  "Research",
  "Leadership",
  "Networking",
  "Career Development",
  "ETC",
];

export const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Community Garden Volunteer Program",
    organization: "Green Earth Initiative Cambodia",
    category: "Volunteering",
    subcategory: "Fun",
    subcategories: ["Fun", "Environment", "Health", "Social Impact", "Education"],
    verified: true,
    verifiedDate: "2025-11-10",
    location: "Phnom Penh, Cambodia",
    isRemote: false,
    date: "2025-11-25",
    deadline: "2025-11-20",
    description:
      "Join us in creating sustainable community gardens across Phnom Penh. Help plant vegetables, maintain green spaces, and teach community members about sustainable farming practices.",
    requirements: [
      "Physical ability to work outdoors",
      "Weekend availability",
      "Passion for sustainability",
    ],
    benefits: [
      "Community service hours",
      "Learn about sustainable farming",
      "Meet like-minded people",
    ],
    status: "Open",
    capacity: "20",
    postedDate: "2025-11-01",
    lastUpdated: "2025-11-10",
    contact: "volunteer@greenearth.org",
    website: "https://greenearth.org",
    coordinates: { lat: 11.5564, lng: 104.9282 },
    views: 234,
    applications: 12,
  },
  {
    id: "2",
    title: "UX Design Workshop: Figma Masterclass",
    organization: "Design Academy Cambodia",
    category: "Workshops",
    subcategory: "Technology",
    subcategories: ["Technology", "Arts", "Career Development", "Networking", "Education", "Business"],
    verified: true,
    verifiedDate: "2025-11-12",
    isPartnered: true,
    location: "Remote",
    isRemote: true,
    date: "2025-12-05",
    deadline: "2025-11-30",
    description:
      "Master Figma with industry professionals. Learn advanced prototyping, design systems, and collaborative workflows in this intensive 2-day workshop.",
    requirements: [
      "Basic design knowledge",
      "Figma account",
      "Computer with internet",
    ],
    benefits: [
      "Certificate of completion",
      "Design portfolio review",
      "Networking with professionals",
    ],
    status: "Open",
    capacity: "50",
    postedDate: "2025-11-05",
    lastUpdated: "2025-11-12",
    contact: "workshops@designacademy.com",
    website: "https://designacademy.com",
    coordinates: { lat: 11.5684, lng: 104.9210 },
    views: 456,
    applications: 38,
  },
  {
    id: "3",
    title: "AI Hackthon 2025: AI Masterclass",
    organization: "TechHub Siem Reap",
    category: "Competitions",
    subcategory: "Technology",
    subcategories: ["Technology", "Research", "Networking", "Career Development"],
    verified: true,
    verifiedDate: "2025-11-08",
    isPartnered: true,
    location: "Siem Reap, Cambodia",
    isRemote: false,
    date: "2025-12-15",
    deadline: "2025-12-01",
    description:
      "Build innovative AI solutions in 48 hours. Compete for $50,000 in prizes while solving real-world problems with machine learning and AI.",
    requirements: [
      "Programming experience",
      "Team of 2-4 members",
      "Bring your own laptop",
    ],
    benefits: [
      "$50,000 prize pool",
      "Mentorship from AI experts",
      "Networking opportunities",
    ],
    status: "Open",
    capacity: "200",
    postedDate: "2025-10-28",
    lastUpdated: "2025-11-08",
    contact: "hackathon@techhub.com",
    website: "https://techhub.com/hackathon",
    coordinates: { lat: 13.3633, lng: 103.8564 },
    views: 1203,
    applications: 89,
  },
  {
    id: "4",
    title: "Software Engineering Internship",
    organization: "CloudTech Cambodia",
    category: "Internships",
    subcategory: "Technology",
    subcategories: ["Technology", "Career Development", "Education", "Business", "Research", "Networking", "Leadership"],
    verified: true,
    verifiedDate: "2025-11-15",
    location: "Battambang, Cambodia",
    isRemote: false,
    date: "2026-01-15",
    deadline: "2025-12-10",
    description:
      "Join our engineering team for a 3-month summer internship. Work on real projects, learn from senior engineers, and build production-ready features.",
    requirements: [
      "Computer Science student",
      "JavaScript/React experience",
      "Available for 3 months",
    ],
    benefits: [
      "$8,000/month stipend",
      "Housing assistance",
      "Full-time conversion opportunity",
    ],
    status: "Open",
    capacity: "10",
    postedDate: "2025-11-15",
    lastUpdated: "2025-11-15",
    contact: "internships@cloudtech.com",
    website: "https://cloudtech.com/careers",
    coordinates: { lat: 13.0957, lng: 103.2022 },
    views: 876,
    applications: 156,
  },
  {
    id: "5",
    title: "Junior Frontend Developer",
    organization: "StartupXYZ Cambodia",
    category: "Jobs",
    subcategory: "Technology",
    subcategories: ["Technology", "Career Development", "Business"],
    verified: false,
    location: "Remote",
    isRemote: true,
    date: "2025-12-01",
    deadline: "2025-11-25",
    description:
      "Looking for a passionate frontend developer to join our growing team. Build beautiful, responsive web applications using React and modern technologies.",
    requirements: [
      "1-2 years React experience",
      "TypeScript knowledge",
      "Portfolio of projects",
    ],
    benefits: [
      "$70-90k salary",
      "Remote work",
      "Equity options",
      "Health insurance",
    ],
    status: "Open",
    capacity: "Unlimited",
    postedDate: "2025-11-16",
    lastUpdated: "2025-11-16",
    contact: "jobs@startupxyz.com",
    website: "https://startupxyz.com",
    coordinates: { lat: 11.5448, lng: 104.8921 },
    views: 543,
    applications: 67,
  },
  {
    id: "6",
    title: "Tech Career Fair 2025",
    organization: "University Career Center",
    category: "Events",
    subcategory: "Education",
    subcategories: ["Education", "Career Development", "Networking", "Technology", "Business"],
    verified: true,
    verifiedDate: "2025-11-11",
    location: "Kampong Cham, Cambodia",
    isRemote: false,
    date: "2025-11-30",
    deadline: "2025-11-28",
    description:
      "Meet 100+ employers including Google, Microsoft, Amazon, and local startups. Bring your resume and prepare for on-site interviews.",
    requirements: [
      "Professional attire",
      "Resume copies",
      "University ID",
    ],
    benefits: [
      "Meet top employers",
      "On-site interviews",
      "Free professional headshots",
    ],
    status: "Open",
    capacity: "500",
    postedDate: "2025-10-20",
    lastUpdated: "2025-11-11",
    contact: "careers@university.edu",
    website: "https://university.edu/careerfair",
    coordinates: { lat: 11.9931, lng: 105.4549 },
    views: 2103,
    applications: 342,
  },
  {
    id: "7",
    title: "Data Science Bootcamp",
    organization: "Learning Hub",
    category: "Workshops",
    subcategory: "Education",
    subcategories: ["Education", "Technology", "Research", "Career Development"],
    verified: true,
    verifiedDate: "2025-11-14",
    location: "Sihanoukville, Cambodia",
    isRemote: false,
    date: "2026-01-10",
    deadline: "2025-12-15",
    description:
      "Intensive 8-week bootcamp covering Python, machine learning, data visualization, and real-world data science projects.",
    requirements: [
      "Basic programming knowledge",
      "Math background helpful",
      "Full-time availability",
    ],
    benefits: [
      "Job placement assistance",
      "Industry certification",
      "Portfolio projects",
    ],
    status: "Open",
    capacity: "30",
    postedDate: "2025-11-10",
    lastUpdated: "2025-11-14",
    contact: "bootcamp@learninghub.com",
    website: "https://learninghub.com",
    coordinates: { lat: 10.6093, lng: 103.5296 },
    views: 678,
    applications: 94,
  },
  {
    id: "8",
    title: "Environmental Research Assistant",
    organization: "Ocean Conservation Lab",
    category: "Internships",
    subcategories: ["Environment", "Research", "Health", "Education", "Social Impact"],
    verified: false,
    location: "Kep, Cambodia",
    isRemote: false,
    date: "2026-02-01",
    deadline: "2025-12-20",
    description:
      "Assist with marine biology research, data collection, and conservation efforts. Perfect for biology or environmental science students.",
    requirements: [
      "Biology or related major",
      "Swimming skills",
      "Research experience preferred",
    ],
    benefits: [
      "$15/hour",
      "Field research experience",
      "Publication opportunities",
    ],
    status: "Open",
    capacity: "5",
    postedDate: "2025-11-17",
    lastUpdated: "2025-11-17",
    contact: "research@oceanlab.org",
    website: "https://oceanlab.org",
    coordinates: { lat: 10.4833, lng: 104.3167 },
    views: 234,
    applications: 28,
  },
];

export const mockSubmissions: Submission[] = [
  {
    id: "SUB-1001",
    title: "Blockchain Development Conference",
    organization: "CryptoEdge",
    category: "Events",
    submittedBy: "john@cryptoedge.com",
    submittedDate: "2025-11-15",
    status: "Pending",
    priority: "High",
    timeWaiting: "3 days",
    fullData: {
      title: "Blockchain Development Conference",
      organization: "CryptoEdge",
      category: "Events",
      description:
        "Learn about the latest in blockchain technology and Web3 development.",
      location: "Denver, CO",
      date: "2025-12-20",
      deadline: "2025-12-15",
      capacity: "300",
    },
  },
  {
    id: "SUB-1002",
    title: "Marketing Internship Summer 2026",
    organization: "BrandWorks Inc",
    category: "Internships",
    submittedBy: "hr@brandworks.com",
    submittedDate: "2025-11-17",
    status: "Pending",
    priority: "Normal",
    timeWaiting: "1 day",
    fullData: {
      title: "Marketing Internship Summer 2026",
      organization: "BrandWorks Inc",
      category: "Internships",
      description:
        "Gain hands-on experience in digital marketing and brand strategy.",
      location: "Chicago, IL",
      date: "2026-06-01",
      deadline: "2025-12-30",
      capacity: "8",
    },
  },
  {
    id: "SUB-1003",
    title: "Free Coding Workshop for Beginners",
    organization: "CodeForAll",
    category: "Workshops",
    submittedBy: "info@codeforall.org",
    submittedDate: "2025-11-10",
    status: "Pending",
    priority: "Urgent",
    timeWaiting: "8 days",
    fullData: {
      title: "Free Coding Workshop for Beginners",
      organization: "CodeForAll",
      category: "Workshops",
      description:
        "Introduction to HTML, CSS, and JavaScript for complete beginners.",
      location: "Remote",
      date: "2025-11-28",
      deadline: "2025-11-25",
      capacity: "100",
    },
  },
  {
    id: "SUB-1004",
    title: "Youth Mentorship Program",
    organization: "Future Leaders Foundation",
    category: "Volunteering",
    submittedBy: "volunteer@futureleaders.org",
    submittedDate: "2025-11-16",
    status: "Approved",
    priority: "Normal",
    timeWaiting: "2 days",
    fullData: {},
  },
  {
    id: "SUB-1005",
    title: "Sales Associate Position",
    organization: "QuickMoney LLC",
    category: "Jobs",
    submittedBy: "contact@quickmoney.biz",
    submittedDate: "2025-11-14",
    status: "Flagged",
    priority: "High",
    timeWaiting: "4 days",
    fullData: {},
  },
];

export const mockFlaggedContent: FlaggedContent[] = [
  {
    id: "FLAG-001",
    contentId: "5",
    contentTitle: "Junior Frontend Developer",
    reportReason: "Inaccurate compensation information",
    reporter: "Anonymous User",
    reportDate: "2025-11-17",
    severity: "Medium",
    status: "New",
  },
  {
    id: "FLAG-002",
    contentId: "SUB-1005",
    contentTitle: "Sales Associate Position",
    reportReason: "Requesting personal information upfront",
    reporter: "user@example.com",
    reportDate: "2025-11-16",
    severity: "High",
    status: "In Progress",
  },
];

export const partnerLogos = [
  "Google",
  "Microsoft",
  "Amazon",
  "Apple",
  "Meta",
  "Netflix",
];

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "Computer Science Student",
    text: "I found my dream internship through Connectify! The verified badge gave me confidence that opportunities were legitimate.",
    avatar: "SC",
  },
  {
    name: "Michael Rodriguez",
    role: "Recent Graduate",
    text: "The platform made it so easy to discover volunteering opportunities that aligned with my interests. Highly recommend!",
    avatar: "MR",
  },
  {
    name: "Emily Taylor",
    role: "Organization Coordinator",
    text: "Posting our workshops was simple, and the admin moderation ensures quality. We reached hundreds of students!",
    avatar: "ET",
  },
];
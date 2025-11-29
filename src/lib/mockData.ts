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

// Cambodia location data for generating mock data
const cambodiaLocations = [
  { name: "Phnom Penh, Cambodia", lat: 11.5564, lng: 104.9282 },
  { name: "Siem Reap, Cambodia", lat: 13.3633, lng: 103.8564 },
  { name: "Battambang, Cambodia", lat: 13.0957, lng: 103.2022 },
  { name: "Sihanoukville, Cambodia", lat: 10.6093, lng: 103.5296 },
  { name: "Kampong Cham, Cambodia", lat: 11.9931, lng: 105.4549 },
  { name: "Kep, Cambodia", lat: 10.4833, lng: 104.3167 },
  { name: "Kampot, Cambodia", lat: 10.6104, lng: 104.1799 },
  { name: "Kratie, Cambodia", lat: 12.4880, lng: 106.0190 },
  { name: "Pursat, Cambodia", lat: 12.5387, lng: 103.9192 },
  { name: "Takeo, Cambodia", lat: 10.9908, lng: 104.7855 },
  { name: "Prey Veng, Cambodia", lat: 11.4864, lng: 105.3242 },
  { name: "Svay Rieng, Cambodia", lat: 11.0879, lng: 105.7990 },
  { name: "Kandal, Cambodia", lat: 11.2232, lng: 105.0000 },
  { name: "Kompong Thom, Cambodia", lat: 12.7111, lng: 104.8891 },
  { name: "Banteay Meanchey, Cambodia", lat: 13.5859, lng: 102.9730 },
  { name: "Remote", lat: 11.5564, lng: 104.9282, isRemote: true },
];

const categories: Opportunity["category"][] = [
  "Volunteering",
  "Workshops",
  "Competitions",
  "Internships",
  "Jobs",
  "Events",
];

const organizations = [
  "Green Earth Initiative Cambodia",
  "Design Academy Cambodia",
  "TechHub Cambodia",
  "CloudTech Cambodia",
  "StartupXYZ Cambodia",
  "University Career Center",
  "Learning Hub",
  "Ocean Conservation Lab",
  "Digital Innovation Center",
  "Youth Empowerment Foundation",
  "Creative Arts Cambodia",
  "Sports Development Organization",
  "Business Leaders Network",
  "Social Impact Hub",
  "Research Institute Cambodia",
  "Leadership Academy",
  "Professional Networking Group",
  "Career Development Center",
  "Tech Innovators Cambodia",
  "Community Development Organization",
  "Environmental Action Group",
  "Health & Wellness Foundation",
  "Education for All Cambodia",
  "Arts & Culture Society",
  "Sports Academy Cambodia",
  "Startup Incubator Cambodia",
  "NGO Coalition Cambodia",
  "Youth Development Initiative",
  "Innovation Lab Phnom Penh",
  "Skill Building Center",
];

const titlePrefixes = [
  "Community",
  "Youth",
  "Digital",
  "Creative",
  "Professional",
  "International",
  "Regional",
  "Local",
  "Advanced",
  "Beginner",
  "Expert",
  "Senior",
  "Junior",
  "Lead",
  "Associate",
];

const titleSuffixes: Record<Opportunity["category"], string[]> = {
  Volunteering: [
    "Volunteer Program",
    "Community Service",
    "Outreach Initiative",
    "Support Program",
    "Assistance Project",
    "Help Campaign",
    "Aid Program",
    "Charity Drive",
  ],
  Workshops: [
    "Workshop",
    "Training Session",
    "Masterclass",
    "Bootcamp",
    "Seminar",
    "Tutorial Series",
    "Skill Building Session",
    "Learning Program",
  ],
  Competitions: [
    "Hackathon",
    "Challenge",
    "Competition",
    "Contest",
    "Tournament",
    "Championship",
    "Pitch Competition",
    "Innovation Challenge",
  ],
  Internships: [
    "Internship",
    "Fellowship",
    "Apprenticeship",
    "Trainee Program",
    "Graduate Program",
    "Summer Internship",
    "Research Internship",
    "Industry Placement",
  ],
  Jobs: [
    "Developer Position",
    "Manager Role",
    "Specialist Position",
    "Coordinator Role",
    "Analyst Position",
    "Engineer Role",
    "Designer Position",
    "Consultant Role",
  ],
  Events: [
    "Conference",
    "Summit",
    "Meetup",
    "Networking Event",
    "Career Fair",
    "Expo",
    "Festival",
    "Symposium",
  ],
};

const subcategoryMapping: Record<Opportunity["category"], SubcategoryType[][]> = {
  Volunteering: [
    ["Fun", "Environment", "Health", "Social Impact", "Education"],
    ["Social Impact", "Education", "Health"],
    ["Environment", "Health", "Social Impact"],
    ["Fun", "Sports", "Social Impact"],
    ["Education", "Social Impact", "Leadership"],
  ],
  Workshops: [
    ["Technology", "Arts", "Career Development", "Networking", "Education", "Business"],
    ["Education", "Technology", "Research", "Career Development"],
    ["Arts", "Education", "Fun"],
    ["Business", "Leadership", "Networking"],
    ["Health", "Education", "Social Impact"],
  ],
  Competitions: [
    ["Technology", "Research", "Networking", "Career Development"],
    ["Business", "Leadership", "Networking"],
    ["Arts", "Fun", "Education"],
    ["Sports", "Fun", "Health"],
    ["Environment", "Research", "Social Impact"],
  ],
  Internships: [
    ["Technology", "Career Development", "Education", "Business", "Research", "Networking", "Leadership"],
    ["Environment", "Research", "Health", "Education", "Social Impact"],
    ["Business", "Career Development", "Networking"],
    ["Arts", "Education", "Career Development"],
    ["Health", "Research", "Education"],
  ],
  Jobs: [
    ["Technology", "Career Development", "Business"],
    ["Business", "Leadership", "Networking"],
    ["Arts", "Career Development"],
    ["Health", "Research", "Education"],
    ["Environment", "Research", "Social Impact"],
  ],
  Events: [
    ["Education", "Career Development", "Networking", "Technology", "Business"],
    ["Fun", "Arts", "Networking"],
    ["Sports", "Fun", "Health"],
    ["Social Impact", "Networking", "Leadership"],
    ["Research", "Education", "Technology"],
  ],
};

// Seeded random number generator for consistent mock data
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function generateMockOpportunities(count: number): Opportunity[] {
  const opportunities: Opportunity[] = [];

  for (let i = 1; i <= count; i++) {
    const seed = i * 12345;
    const random = () => seededRandom(seed + opportunities.length);
    
    const category = categories[Math.floor(random() * categories.length)];
    const locationData = cambodiaLocations[Math.floor(random() * cambodiaLocations.length)];
    const isRemote = 'isRemote' in locationData && locationData.isRemote === true;
    
    const titlePrefix = titlePrefixes[Math.floor(random() * titlePrefixes.length)];
    const titleSuffix = titleSuffixes[category][Math.floor(random() * titleSuffixes[category].length)];
    const subcategoriesOptions = subcategoryMapping[category];
    const selectedSubcategories = subcategoriesOptions[Math.floor(random() * subcategoriesOptions.length)];
    const organization = organizations[Math.floor(random() * organizations.length)];
    
    // Add some coordinate variance to spread markers
    const latVariance = (random() - 0.5) * 0.5;
    const lngVariance = (random() - 0.5) * 0.5;
    
    const verified = random() > 0.3;
    const baseDate = new Date("2025-11-01");
    const dateOffset = Math.floor(random() * 120);
    const opportunityDate = new Date(baseDate);
    opportunityDate.setDate(opportunityDate.getDate() + dateOffset);
    
    const deadlineOffset = Math.floor(random() * 30);
    const deadlineDate = new Date(opportunityDate);
    deadlineDate.setDate(deadlineDate.getDate() - deadlineOffset);
    
    const postedOffset = Math.floor(random() * 60);
    const postedDate = new Date(baseDate);
    postedDate.setDate(postedDate.getDate() - postedOffset);

    const statuses: Opportunity["status"][] = ["Open", "Closed", "Full"];
    const status = statuses[Math.floor(random() * 10) < 7 ? 0 : Math.floor(random() * 3)];

    // Generate organization domain for contact/website
    const orgDomain = organization.toLowerCase().replace(/\s+/g, "");

    opportunities.push({
      id: String(i),
      title: `${titlePrefix} ${titleSuffix} ${Math.floor(random() * 100)}`,
      organization,
      category,
      subcategory: selectedSubcategories[0],
      subcategories: selectedSubcategories,
      verified,
      verifiedDate: verified ? postedDate.toISOString().split("T")[0] : undefined,
      isPartnered: random() > 0.7,
      location: locationData.name,
      isRemote,
      date: opportunityDate.toISOString().split("T")[0],
      deadline: deadlineDate.toISOString().split("T")[0],
      description: `This is a ${category.toLowerCase()} opportunity focused on ${selectedSubcategories.slice(0, 3).join(", ").toLowerCase()}. Join ${organization} for this exciting opportunity.`,
      requirements: [
        "Relevant experience or interest",
        "Good communication skills",
        "Ability to work in a team",
      ],
      benefits: [
        "Gain valuable experience",
        "Networking opportunities",
        "Certificate of participation",
      ],
      status,
      capacity: String(Math.floor(random() * 100) + 10),
      postedDate: postedDate.toISOString().split("T")[0],
      lastUpdated: postedDate.toISOString().split("T")[0],
      contact: `contact@${orgDomain}.org`,
      website: `https://${orgDomain}.org`,
      coordinates: {
        lat: locationData.lat + latVariance,
        lng: locationData.lng + lngVariance,
      },
      views: Math.floor(random() * 2000) + 100,
      applications: Math.floor(random() * 200) + 5,
    });
  }

  return opportunities;
}

// Generate 1000 mock opportunities
export const mockOpportunities: Opportunity[] = generateMockOpportunities(1000);

// Export unique locations for filtering
export const uniqueLocations = [...new Set(mockOpportunities.map(opp => opp.location))].sort();

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
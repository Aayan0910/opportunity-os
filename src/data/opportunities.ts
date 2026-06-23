export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: string;
  description: string;
  deadline: string;
  difficulty: "Easy" | "Medium" | "Hard";
  eligibility: string;
  benefits: string;
  link: string;
  type: "Free" | "Paid";
  mode: "Online" | "Offline" | "Hybrid";
  state?: string;
  country: string;
  ageGroup: string;
  skillsRequired: string[];
  aiScore?: number;
  matchReasons?: string[];
  applicants?: number;
  featured?: boolean;
}

export interface UserProfile {
  age: number;
  class: string;
  country: string;
  state: string;
  skills: string[];
  interests: string[];
  careerGoals: string[];
  budget: number;
  availableHours: number;
}

export interface GamificationData {
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  badges: Achievement[];
  rank: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface DailyDigest {
  newOpportunities: number;
  deadlineAlerts: number;
  matchUpdates: number;
  topPick: Opportunity;
}

export const categories = [
  "Scholarships",
  "Competitions",
  "Olympiads",
  "Hackathons",
  "Startup Programs",
  "Internships",
  "Fellowships",
  "Grants",
  "Events",
  "Workshops",
  "Courses",
  "Leadership Programs",
  "Research Programs",
] as const;

export const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Chandigarh", "Puducherry",
];

export const skills = [
  "JavaScript", "Python", "Java", "C++", "React", "Node.js",
  "Machine Learning", "Data Science", "UI/UX Design", "Graphic Design",
  "Content Writing", "Marketing", "Finance", "Public Speaking",
  "Leadership", "Photography", "Video Editing", "App Development",
  "Web Development", "Blockchain", "AI/ML", "Cloud Computing",
  "Cybersecurity", "Game Development", "3D Modeling", "Animation",
  "Research", "Public Policy", "Social Work", "Entrepreneurship",
];

export const interests = [
  "Technology", "Science", "Mathematics", "Business", "Arts",
  "Sports", "Music", "Social Service", "Environment", "Education",
  "Healthcare", "Engineering", "Law", "Media", "Travel",
  "Photography", "Writing", "Gaming", "Fashion", "Food",
  "Space", "Robotics", "Sustainability", "Finance", "Psychology",
];

export const careerGoals = [
  "Software Engineer", "Data Scientist", "Product Manager",
  "Startup Founder", "Researcher", "Doctor", "Lawyer",
  "Designer", "Marketing Manager", "Investment Banker",
  "Civil Services", "Professor", "Journalist", "Artist",
  "Entrepreneur", "Consultant", "Architect", "Pilot",
  "AI Engineer", "Blockchain Developer", "UX Designer",
  "Management Consultant", "Policy Analyst", "Social Entrepreneur",
];

export const gamificationLevels = [
  { level: 1, name: "Explorer", minXp: 0, icon: "🧭", color: "text-zinc-400" },
  { level: 2, name: "Achiever", minXp: 200, icon: "⭐", color: "text-amber-400" },
  { level: 3, name: "Competitor", minXp: 500, icon: "🏆", color: "text-orange-400" },
  { level: 4, name: "Builder", minXp: 1000, icon: "🚀", color: "text-violet-400" },
  { level: 5, name: "Elite Candidate", minXp: 2000, icon: "👑", color: "text-yellow-400" },
];

export const achievements: Achievement[] = [
  { id: "1", title: "First Steps", description: "Complete your profile", icon: "👤", earned: true, earnedDate: "2026-01-15", rarity: "common" },
  { id: "2", title: "Opportunity Seeker", description: "Save your first opportunity", icon: "🔍", earned: true, earnedDate: "2026-01-15", rarity: "common" },
  { id: "3", title: "Early Bird", description: "Apply to an opportunity before deadline", icon: "🐦", earned: true, earnedDate: "2026-01-20", rarity: "common" },
  { id: "4", title: "Streak Master", description: "Maintain a 7-day streak", icon: "🔥", earned: false, rarity: "rare" },
  { id: "5", title: "Scholar Hunter", description: "Find 5 scholarships", icon: "🎓", earned: true, earnedDate: "2026-02-01", rarity: "rare" },
  { id: "6", title: "Hackathon Hero", description: "Enter your first hackathon", icon: "💻", earned: false, rarity: "rare" },
  { id: "7", title: "Networker", description: "Post in the community", icon: "🤝", earned: false, rarity: "common" },
  { id: "8", title: "Roadmap Builder", description: "Complete a career roadmap", icon: "🗺️", earned: false, rarity: "epic" },
  { id: "9", title: "Century Club", description: "Save 100 opportunities", icon: "💯", earned: false, rarity: "legendary" },
  { id: "10", title: "Elite Status", description: "Reach level 5", icon: "👑", earned: false, rarity: "legendary" },
];

export const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "National Science Olympiad 2026",
    organization: "Science Olympiad Foundation",
    category: "Olympiads",
    description: "India's largest science talent search examination for students from Class 1 to Class 12. Tests aptitude in Physics, Chemistry, Biology, and Mathematics.",
    deadline: "2026-09-15",
    difficulty: "Medium",
    eligibility: "Class 1-12 students",
    benefits: "Scholarships up to ₹5 Lakh, certificates, international recognition",
    link: "https://www.sofworld.org/olympiads/nso/",
    type: "Paid",
    mode: "Offline",
    country: "India",
    ageGroup: "12-18",
    skillsRequired: ["Science", "Mathematics", "Logical Reasoning"],
    aiScore: 92,
    matchReasons: ["Matches your age group", "Strong science background", "High scholarship potential", "Recognized nationally"],
    applicants: 12400,
    featured: true,
  },
  {
    id: "2",
    title: "Google Summer of Code 2026",
    organization: "Google",
    category: "Internships",
    description: "A global program that pairs students with open source organizations for summer internships. Work on real-world projects with mentorship from top engineers.",
    deadline: "2026-04-02",
    difficulty: "Hard",
    eligibility: "College students 18+",
    benefits: "Stipend $3000-6000, certificates, networking with Google engineers",
    link: "https://summerofcode.withgoogle.com/",
    type: "Paid",
    mode: "Online",
    country: "Global",
    ageGroup: "18-25",
    skillsRequired: ["Git", "Python", "JavaScript", "Open Source"],
    aiScore: 85,
    matchReasons: ["Perfect for coders", "Global recognition", "Industry experience", "Remote-friendly"],
    applicants: 8900,
    featured: true,
  },
  {
    id: "3",
    title: "MITACS Globalink Research Internship",
    organization: "MITACS",
    category: "Internships",
    description: "12-week research internship at a Canadian university for international students. Gain hands-on research experience in your field of study.",
    deadline: "2026-09-22",
    difficulty: "Hard",
    eligibility: "3rd/4th year college students",
    benefits: "Travel funding, stipend, research experience, Canadian university connection",
    link: "https://www.mitacs.ca/en/programs/globalink-research-internship",
    type: "Paid",
    mode: "Offline",
    country: "Canada",
    ageGroup: "20-25",
    skillsRequired: ["Research", "Academic Writing", "Domain Knowledge"],
    aiScore: 78,
    matchReasons: ["Research exposure", "International experience", "Strong profile match"],
    applicants: 3200,
  },
  {
    id: "4",
    title: "Atal Innovation Mission Hackathon",
    organization: "NITI Aayog",
    category: "Hackathons",
    description: "National hackathon to solve real-world problems using technology and innovation. Build solutions for India's biggest challenges.",
    deadline: "2026-07-20",
    difficulty: "Medium",
    eligibility: "Students and young professionals",
    benefits: "Prize money up to ₹10 Lakh, incubation support, government recognition",
    link: "https://atalinnovationmission.gov.in/",
    type: "Free",
    mode: "Hybrid",
    country: "India",
    ageGroup: "16-28",
    skillsRequired: ["Problem Solving", "Technology", "Innovation", "Teamwork"],
    aiScore: 88,
    matchReasons: ["Innovation-focused", "Great networking", "Startup ecosystem", "Government backed"],
    applicants: 6700,
    featured: true,
  },
  {
    id: "5",
    title: "AICTE Scholarship for Technical Education",
    organization: "AICTE",
    category: "Scholarships",
    description: "Financial assistance for students pursuing technical education in India. Covers tuition fees and provides monthly stipend.",
    deadline: "2026-11-30",
    difficulty: "Easy",
    eligibility: "AICTE-approved institution students",
    benefits: "Up to ₹50,000 per year financial aid, tuition support",
    link: "https://www.aicte-india.org/schemes/students-development-schemes",
    type: "Free",
    mode: "Online",
    country: "India",
    ageGroup: "17-22",
    skillsRequired: ["Academic Excellence"],
    aiScore: 70,
    matchReasons: ["Financial support", "Easy application", "Technical education focus"],
    applicants: 15600,
  },
  {
    id: "6",
    title: "Young Innovators Program - IIT Bombay",
    organization: "IIT Bombay",
    category: "Startup Programs",
    description: "Incubation program for student-led startups with mentorship from IIT Bombay faculty and industry experts.",
    deadline: "2026-08-15",
    difficulty: "Hard",
    eligibility: "College students with startup ideas",
    benefits: "Funding up to ₹25 Lakh, mentorship, workspace, investor network",
    link: "https://iitb.ac.in/en/hospitality-services",
    type: "Free",
    mode: "Offline",
    country: "India",
    state: "Maharashtra",
    ageGroup: "18-25",
    skillsRequired: ["Entrepreneurship", "Business Planning", "Leadership"],
    aiScore: 95,
    matchReasons: ["Entrepreneurship match", "Top-tier mentorship", "Funding opportunity", "IIT ecosystem"],
    applicants: 2100,
    featured: true,
  },
  {
    id: "7",
    title: "KVPY Fellowship",
    organization: "IISc Bangalore",
    category: "Fellowships",
    description: "Kishore Vaigyanik Protsahan Yojana - fellowship for talented science students to pursue research careers.",
    deadline: "2026-10-15",
    difficulty: "Hard",
    eligibility: "Class 11-12 science students",
    benefits: "Monthly fellowship, annual contingency, summer programs at IISc",
    link: "https://kvpyscience.iisc.ac.in/",
    type: "Free",
    mode: "Offline",
    country: "India",
    ageGroup: "15-18",
    skillsRequired: ["Science", "Mathematics", "Research Aptitude"],
    aiScore: 90,
    matchReasons: ["Science fellowship", "Long-term benefits", "Research pathway", "Prestigious"],
    applicants: 4500,
  },
  {
    id: "8",
    title: "UX Design Professional Certificate",
    organization: "Google via Coursera",
    category: "Courses",
    description: "Professional certificate in UX Design with hands-on projects. Learn from Google designers and build a portfolio.",
    deadline: "2026-12-31",
    difficulty: "Easy",
    eligibility: "Everyone",
    benefits: "Professional certificate, portfolio projects, job-ready skills",
    link: "https://www.coursera.org/professional-certificates/google-ux-design",
    type: "Paid",
    mode: "Online",
    country: "Global",
    ageGroup: "16-35",
    skillsRequired: ["Design Thinking", "Prototyping", "User Research"],
    aiScore: 65,
    matchReasons: ["Career development", "Industry certificate", "Flexible learning", "Google brand"],
    applicants: 21000,
  },
  {
    id: "9",
    title: "Tata Fellowship for Social Impact",
    organization: "Tata Trusts",
    category: "Grants",
    description: "Funding for young professionals working on social impact projects in India. Drive meaningful change in communities.",
    deadline: "2026-06-30",
    difficulty: "Medium",
    eligibility: "Young professionals 21-30",
    benefits: "Grant up to ₹15 Lakh, mentorship, network access",
    link: "https://www.tatatrusts.org/our-initiatives/social-impact",
    type: "Free",
    mode: "Hybrid",
    country: "India",
    ageGroup: "21-30",
    skillsRequired: ["Social Impact", "Project Management", "Community Work"],
    aiScore: 72,
    matchReasons: ["Social impact focus", "Significant funding", "Mentorship network", "Tata brand"],
    applicants: 3800,
  },
  {
    id: "10",
    title: "Smart India Hackathon 2026",
    organization: "Government of India",
    category: "Hackathons",
    description: "World's largest hackathon bringing together technology students and professionals to solve critical problems.",
    deadline: "2026-08-01",
    difficulty: "Medium",
    eligibility: "Students and professionals",
    benefits: "Prize money, government recognition, incubation, national platform",
    link: "https://www.sih.gov.in/",
    type: "Free",
    mode: "Hybrid",
    country: "India",
    ageGroup: "16-30",
    skillsRequired: ["Coding", "Problem Solving", "Innovation"],
    aiScore: 91,
    matchReasons: ["National-level event", "Innovation platform", "Government backed", "Massive exposure"],
    applicants: 18500,
    featured: true,
  },
  {
    id: "11",
    title: "Adobe Creative Residency",
    organization: "Adobe",
    category: "Fellowships",
    description: "Year-long program for creative professionals to develop passion projects with Adobe tools and mentorship.",
    deadline: "2026-03-15",
    difficulty: "Hard",
    eligibility: "Designers and creative professionals",
    benefits: "Stipend, Adobe tools, mentorship, global creative community",
    link: "https://research.adobe.com/creative-residency/",
    type: "Paid",
    mode: "Online",
    country: "Global",
    ageGroup: "20-30",
    skillsRequired: ["Design", "Creativity", "Portfolio"],
    aiScore: 76,
    matchReasons: ["Creative field match", "Industry tools access", "Global community"],
    applicants: 5600,
  },
  {
    id: "12",
    title: "International Mathematics Olympiad",
    organization: "IMO Foundation",
    category: "Olympiads",
    description: "Premier international mathematics competition for pre-university students. Represent India on the world stage.",
    deadline: "2026-07-10",
    difficulty: "Hard",
    eligibility: "Under 20 years, selected via national olympiad",
    benefits: "International recognition, university admissions advantage, medals",
    link: "https://www.imo-official.org/",
    type: "Free",
    mode: "Offline",
    country: "Global",
    ageGroup: "14-20",
    skillsRequired: ["Mathematics", "Problem Solving", "Logic"],
    aiScore: 82,
    matchReasons: ["Prestigious competition", "Academic excellence", "Global platform"],
    applicants: 2800,
  },
  {
    id: "13",
    title: "Post-Matric Scholarship for SC/ST",
    organization: "Ministry of Social Justice",
    category: "Scholarships",
    description: "Government scholarship for SC/ST students pursuing post-matriculation education. Covers tuition, maintenance, and book allowance.",
    deadline: "2026-12-15",
    difficulty: "Easy",
    eligibility: "SC/ST students post Class 10",
    benefits: "Full tuition coverage, monthly maintenance allowance",
    link: "https://scholarships.gov.in/",
    type: "Free",
    mode: "Online",
    country: "India",
    ageGroup: "15-25",
    skillsRequired: ["Academic Excellence"],
    aiScore: 88,
    matchReasons: ["Government scholarship", "Full coverage", "Easy eligibility"],
    applicants: 45000,
  },
  {
    id: "14",
    title: "Coding Ninjas Scholarship Test",
    organization: "Coding Ninjas",
    category: "Scholarships",
    description: "Scholarship test for coding courses. Top performers get up to 100% scholarship on coding bootcamps.",
    deadline: "2026-06-20",
    difficulty: "Easy",
    eligibility: "Students interested in coding",
    benefits: "Up to 100% scholarship on courses worth ₹30,000+",
    link: "https://www.codingninjas.com/scholarship",
    type: "Free",
    mode: "Online",
    country: "India",
    ageGroup: "14-28",
    skillsRequired: ["Coding Basics", "Logical Reasoning"],
    aiScore: 74,
    matchReasons: ["Coding focused", "Scholarship opportunity", "Skill development"],
    applicants: 8900,
  },
  {
    id: "15",
    title: "CERN Summer Student Program",
    organization: "CERN",
    category: "Internships",
    description: "Work at CERN for 8-13 weeks on advanced physics projects. One of the most prestigious research internships in the world.",
    deadline: "2026-01-31",
    difficulty: "Hard",
    eligibility: "Physics/engineering students in 3rd+ year",
    benefits: "Stipend, travel allowance, accommodation, world-class research",
    link: "https://cern.ch/students",
    type: "Paid",
    mode: "Offline",
    country: "Switzerland",
    ageGroup: "20-25",
    skillsRequired: ["Physics", "Programming", "Mathematics"],
    aiScore: 80,
    matchReasons: ["Prestigious research", "International exposure", "Physics career boost"],
    applicants: 4200,
  },
  {
    id: "16",
    title: "Flipkart Runway - Women in Tech",
    organization: "Flipkart",
    category: "Internships",
    description: "Exclusive internship program for women in technology. Get mentored by Flipkart engineers and work on live projects.",
    deadline: "2026-05-15",
    difficulty: "Medium",
    eligibility: "Female college students in CS/IT",
    benefits: "Paid internship, mentorship, PPO opportunities, networking",
    link: "https://runway.flipkart.com/",
    type: "Paid",
    mode: "Offline",
    country: "India",
    state: "Karnataka",
    ageGroup: "19-24",
    skillsRequired: ["Programming", "Data Structures", "Web Development"],
    aiScore: 83,
    matchReasons: ["Women in tech", "Brand name", "PPO potential", "Skill growth"],
    applicants: 6200,
  },
];

export const roadmapData = {
  "Software Engineer": [
    {
      phase: "3-Month Roadmap",
      steps: [
        { month: "Month 1", tasks: ["Master a programming language (Python/JS)", "Learn data structures & algorithms basics", "Build 2 small projects", "Set up GitHub profile with README"] },
        { month: "Month 2", tasks: ["Solve 50+ LeetCode problems", "Learn a framework (React/Next.js)", "Contribute to open source", "Build a portfolio project"] },
        { month: "Month 3", tasks: ["Apply for internships", "Practice system design basics", "Network on LinkedIn daily", "Build capstone project"] },
      ],
    },
    {
      phase: "1-Year Roadmap",
      steps: [
        { month: "Months 1-3", tasks: ["Foundation: Languages, DSA, CS fundamentals", "Build first 3 projects", "Start open source contributions"] },
        { month: "Months 4-6", tasks: ["Learn frameworks deeply", "Build portfolio projects", "Apply for summer internships"] },
        { month: "Months 7-9", tasks: ["Specialize in a domain", "Practice interview prep", "Attend tech meetups"] },
        { month: "Months 10-12", tasks: ["Full-time job applications", "Portfolio polish", "System design preparation"] },
      ],
    },
    {
      phase: "3-Year Roadmap",
      steps: [
        { year: "Year 1", tasks: ["Complete CS fundamentals", "Build 10+ projects", "Get first internship", "Learn system design basics"] },
        { year: "Year 2", tasks: ["Specialize in a domain (ML/Web/Cloud)", "Lead open source projects", "Get return offer or first job", "Build technical blog"] },
        { year: "Year 3", tasks: ["Senior role or switching company", "Mentor juniors", "Speak at events", "Consider masters or entrepreneurship"] },
      ],
    },
  ],
  "Startup Founder": [
    {
      phase: "3-Month Roadmap",
      steps: [
        { month: "Month 1", tasks: ["Validate your startup idea with 50+ interviews", "Create lean canvas and business model", "Join startup communities and incubators", "Research competition landscape"] },
        { month: "Month 2", tasks: ["Build MVP with core features", "Get first 10 beta users", "Pitch to incubators and accelerators", "Learn basic legal/compliance"] },
        { month: "Month 3", tasks: ["Iterate based on user feedback", "Apply to Y Combinator/accelerators", "Register company and set up legal", "Build landing page and waitlist"] },
      ],
    },
    {
      phase: "1-Year Roadmap",
      steps: [
        { month: "Months 1-3", tasks: ["Idea validation, market research, MVP development"] },
        { month: "Months 4-6", tasks: ["Product-market fit, initial traction, team building"] },
        { month: "Months 7-9", tasks: ["Seed funding, scaling operations, partnerships"] },
        { month: "Months 10-12", tasks: ["Growth metrics, Series A prep, team expansion"] },
      ],
    },
    {
      phase: "3-Year Roadmap",
      steps: [
        { year: "Year 1", tasks: ["Idea to MVP to first 100 customers", "Seed funding secured", "Core team of 3-5 built"] },
        { year: "Year 2", tasks: ["Product-market fit achieved", "Seed/Series A raised", "Team of 10-20, revenue growth"] },
        { year: "Year 3", tasks: ["Scale to multiple markets", "Series A/B funding", "Team of 50+, market leadership"] },
      ],
    },
  ],
  "Data Scientist": [
    {
      phase: "3-Month Roadmap",
      steps: [
        { month: "Month 1", tasks: ["Python for data science mastery", "Statistics & probability foundations", "NumPy, Pandas, Matplotlib", "SQL fundamentals"] },
        { month: "Month 2", tasks: ["Machine learning algorithms", "Scikit-learn projects", "Kaggle competitions", "Feature engineering"] },
        { month: "Month 3", tasks: ["Deep learning introduction", "Portfolio projects on GitHub", "Resume optimization", "Apply for DS internships"] },
      ],
    },
    {
      phase: "1-Year Roadmap",
      steps: [
        { month: "Months 1-3", tasks: ["Python, Statistics, Data Wrangling foundations"] },
        { month: "Months 4-6", tasks: ["ML algorithms, feature engineering, Kaggle competitions"] },
        { month: "Months 7-9", tasks: ["Deep learning, NLP/Computer Vision, cloud ML platforms"] },
        { month: "Months 10-12", tasks: ["MLOps, portfolio optimization, job applications"] },
      ],
    },
    {
      phase: "3-Year Roadmap",
      steps: [
        { year: "Year 1", tasks: ["Master Python, Statistics, ML basics", "2+ Kaggle competitions", "First DS internship"] },
        { year: "Year 2", tasks: ["Deep learning specialization", "Research papers published", "First full-time role"] },
        { year: "Year 3", tasks: ["Senior data scientist role", "Domain expertise", "Mentoring and leadership"] },
      ],
    },
  ],
  "Study Abroad": [
    {
      phase: "3-Month Roadmap",
      steps: [
        { month: "Month 1", tasks: ["Research target universities and programs", "Take IELTS/TOEFL practice tests", "Start SOP drafts", "Identify scholarship opportunities"] },
        { month: "Month 2", tasks: ["Prepare for standardized tests (GRE/GMAT)", "Request recommendation letters", "Finalize university shortlist", "Start application essays"] },
        { month: "Month 3", tasks: ["Complete all test scores", "Submit early applications", "Apply for scholarships and financial aid", "Prepare for interviews"] },
      ],
    },
    {
      phase: "1-Year Roadmap",
      steps: [
        { month: "Months 1-3", tasks: ["University research, test preparation, profile building"] },
        { month: "Months 4-6", tasks: ["Application essays, recommendation letters, test scores"] },
        { month: "Months 7-9", tasks: ["Submit applications, scholarship applications, interviews"] },
        { month: "Months 10-12", tasks: ["Accept offers, visa process, pre-departure preparation"] },
      ],
    },
    {
      phase: "3-Year Roadmap",
      steps: [
        { year: "Year 1", tasks: ["Build strong academic profile", "Start test prep", "Research universities", "Build extracurriculars"] },
        { year: "Year 2", tasks: ["Take all required tests", "Complete applications", "Secure admission and funding"] },
        { year: "Year 3", tasks: ["Complete degree", "Build global network", "Career placement or PhD"] },
      ],
    },
  ],
  "AI Engineer": [
    {
      phase: "3-Month Roadmap",
      steps: [
        { month: "Month 1", tasks: ["Python and linear algebra refresher", "Machine learning fundamentals", "TensorFlow/PyTorch basics", "Build first neural network"] },
        { month: "Month 2", tasks: ["Deep learning architectures", "CNNs for computer vision", "NLP basics with transformers", "Kaggle ML competitions"] },
        { month: "Month 3", tasks: ["Advanced topics (RL, GANs)", "Build AI portfolio project", "Read research papers", "Apply for AI internships"] },
      ],
    },
    {
      phase: "1-Year Roadmap",
      steps: [
        { month: "Months 1-3", tasks: ["ML foundations, Python, math fundamentals"] },
        { month: "Months 4-6", tasks: ["Deep learning, NLP, computer vision specializations"] },
        { month: "Months 7-9", tasks: ["Advanced AI topics, research paper implementation"] },
        { month: "Months 10-12", tasks: ["Portfolio projects, job applications, interview prep"] },
      ],
    },
    {
      phase: "3-Year Roadmap",
      steps: [
        { year: "Year 1", tasks: ["ML/AI foundations, first projects, competition participation"] },
        { year: "Year 2", tasks: ["Specialization in a subfield, research contributions", "First industry role"] },
        { year: "Year 3", tasks: ["Senior AI role or research position", "Published papers", "Open source AI tools"] },
      ],
    },
  ],
};

export const communityPosts = [
  {
    id: "1",
    author: "Aakash Mehta",
    avatar: "AM",
    title: "GSoC 2025 selected! here's what actually worked",
    content: "took me 3 attempts before i got in. first year i applied to 5 orgs and heard back from none. second year got to interview round but bombed it. this time i picked a smaller org, started contributing in october (not february like most people), and messaged 3 maintainers on slack before even applying. they remembered me. that's literally it. don't overthink it, just show up early and be useful",
    likes: 312,
    comments: 67,
    timeAgo: "2 hours ago",
    tags: ["GSoC", "Open Source", "Success Story"],
  },
  {
    id: "2",
    author: "Riya Deshmukh",
    avatar: "RD",
    title: "won Smart India Hackathon 2025 - still processing it",
    content: "36 hours no sleep, 4 energy drinks, one near-argument about the tech stack, and somehow we won at the regional level. our idea was a vernacular education app for rural students. the judges loved that we had actual user interviews (we called 20 village teachers on video call). if you're doing SIH this year, talk to real users before you code. seriously.",
    likes: 203,
    comments: 41,
    timeAgo: "5 hours ago",
    tags: ["Hackathon", "Innovation", "Team Work"],
  },
  {
    id: "3",
    author: "Farhan Khan",
    avatar: "FK",
    title: "scholarship masterlist (central + state + private) - took me 2 weeks to compile",
    content: "i went through every govt website, aicte portal, private trust pages, and state scholarship portals. compiled 120+ scholarships with deadlines, eligibility, and application links. some are only open for 2 weeks a year so set reminders. link in my profile. please share with anyone who needs this. i wish someone had made this when i was in 12th",
    likes: 634,
    comments: 98,
    timeAgo: "1 day ago",
    tags: ["Scholarship", "Guide", "Resources"],
  },
  {
    id: "4",
    author: "Nikhil Joshi",
    avatar: "NJ",
    title: "tier-3 college -> Amazon SDE-1. not a motivational post, just facts",
    content: "graduated from a college nobody's heard of in UP. no campus placement. started grinding leetcode in final year, got an internship through a referral from a random linkedin connection. that internship converted. total preparation time: 8 months. things that actually helped: neetcode 150, system design basics from alex xu's book, and doing 2 mock interviews with strangers on pramp. happy to answer questions but please don't ask me for referrals yet, i literally just joined",
    likes: 489,
    comments: 112,
    timeAgo: "2 days ago",
    tags: ["Career", "Success Story", "Coding"],
  },
  {
    id: "5",
    author: "Prachi Verma",
    avatar: "PV",
    title: "Adobe Creative Residency - my portfolio was mid but i still got in",
    content: "not going to lie my work isn't the best in the world. but i think what helped was having a very specific project idea and writing about why it matters to me personally. they don't want perfect work, they want genuine people with something to say. my project is about documenting disappearing crafts in rajasthan through generative art. if you're a designer reading this, just apply. worst case you lose 2 hours",
    likes: 178,
    comments: 34,
    timeAgo: "3 days ago",
    tags: ["Design", "Fellowship", "Creative"],
  },
];

export const pricingPlans = [
  {
    name: "Explorer",
    price: 0,
    period: "",
    description: "Start exploring opportunities",
    features: [
      "Account & profile creation",
      "5 opportunity recommendations/month",
      "Save up to 3 opportunities",
      "Basic search filters",
      "Basic dashboard",
    ],
    excluded: [
      "AI matching & scoring",
      "AI roadmap generation",
      "Deadline alerts",
      "Scholarship matching",
      "Advanced filters",
      "AI Resume Builder",
      "Application Tracker",
      "Weekly reports",
    ],
    cta: "Start Free",
    popular: false,
    planId: "free",
  },
  {
    name: "Trial Pass",
    price: 30,
    period: "/first month",
    description: "Experience premium at low risk",
    features: [
      "Unlimited recommendations",
      "Unlimited saves",
      "AI roadmap generation",
      "AI matching & scoring (85%+ accuracy)",
      "Deadline reminders & email alerts",
      "Advanced filters (15+ parameters)",
      "Full dashboard access",
      "Priority support",
    ],
    excluded: [],
    cta: "Start Trial — ₹30",
    popular: false,
    planId: "trial",
  },
  {
    name: "Pathfinder",
    price: 599,
    period: "/year",
    description: "The smart choice for ambitious students",
    features: [
      "Everything in Trial Pass",
      "Unlimited AI recommendations",
      "AI-powered scholarship matching",
      "AI-powered internship matching",
      "Weekly personalized reports",
      "Smart deadline tracking",
      "Career path analyzer",
      "Skill gap detector",
      "Company/organization insights",
      "Exclusive opportunity alerts",
      "Early application notifications",
    ],
    excluded: [],
    cta: "Get Pathfinder",
    popular: false,
    planId: "pathfinder",
  },
  {
    name: "Navigator",
    price: 799,
    period: "/year",
    description: "Everything you need to stay ahead",
    features: [
      "Everything in Pathfinder",
      "AI Resume Builder (ATS-optimized)",
      "AI Missed Opportunities Detector",
      "Smart Application Tracker",
      "Advanced AI matching (95%+ accuracy)",
      "Career planning tools",
      "Premium analytics dashboard",
      "Priority opportunity alerts",
      "Early access to new features",
      "1-on-1 career guidance session",
      "Exclusive community access",
      "Custom opportunity alerts",
      "Application deadline predictor",
      "Success probability scoring",
    ],
    excluded: [],
    cta: "Get Navigator",
    popular: true,
    planId: "navigator",
  },
];

export const featureComparison = [
  { feature: "Recommendations", free: "5/month", trial: "Unlimited", pathfinder: "Unlimited + AI", navigator: "Unlimited + Advanced AI" },
  { feature: "Save Opportunities", free: "3 max", trial: "Unlimited", pathfinder: "Unlimited", navigator: "Unlimited" },
  { feature: "AI Matching Score", free: "—", trial: "85% accuracy", pathfinder: "90% accuracy", navigator: "95% accuracy" },
  { feature: "AI Roadmap", free: "—", trial: "Basic", pathfinder: "Advanced + Personalized", navigator: "Expert + Custom" },
  { feature: "Deadline Alerts", free: "—", trial: "Email only", pathfinder: "Email + SMS + Push", navigator: "All + Predictions" },
  { feature: "Scholarship Matching", free: "—", trial: "—", pathfinder: "AI-powered", navigator: "AI + Manual Review" },
  { feature: "Internship Matching", free: "—", trial: "—", pathfinder: "AI-powered", navigator: "AI + Insider Tips" },
  { feature: "Weekly Reports", free: "—", trial: "—", pathfinder: "Basic", navigator: "Detailed + Insights" },
  { feature: "AI Resume Builder", free: "—", trial: "—", pathfinder: "—", navigator: "ATS-optimized" },
  { feature: "Missed Opportunities", free: "—", trial: "—", pathfinder: "—", navigator: "AI Detector" },
  { feature: "Application Tracker", free: "—", trial: "—", pathfinder: "—", navigator: "Smart Tracker" },
  { feature: "Career Guidance", free: "—", trial: "—", pathfinder: "—", navigator: "1-on-1 Session" },
  { feature: "Community Access", free: "Basic", trial: "Full", pathfinder: "Full + Groups", navigator: "Exclusive" },
  { feature: "Support", free: "Community", trial: "Priority", pathfinder: "Fast Track", navigator: "Dedicated" },
];

export const missedOpportunities = [
  {
    type: "Scholarships",
    count: 14,
    examples: ["Post-Matric SC/ST Scholarship", "AICTE Technical Scholarship", "State Merit Scholarship"],
    potentialValue: "Up to ₹3.5 Lakh",
  },
  {
    type: "Internships",
    count: 3,
    examples: ["Flipkart Runway", "Google Summer of Code", "CERN Summer Program"],
    potentialValue: "₹50K-6L stipend",
  },
  {
    type: "Competitions",
    count: 5,
    examples: ["Smart India Hackathon", "Atal Innovation Mission", "National Science Olympiad"],
    potentialValue: "₹10L+ in prizes",
  },
];

export const growthRecommendations = [
  {
    category: "Skills to Learn",
    items: [
      { name: "System Design", reason: "High demand for your target roles", priority: "high" },
      { name: "TypeScript", reason: "Used in 78% of top startups", priority: "high" },
      { name: "Cloud (AWS/GCP)", reason: "Essential for modern engineering", priority: "medium" },
    ],
  },
  {
    category: "Projects to Build",
    items: [
      { name: "Full-stack SaaS app", reason: "Demonstrates end-to-end skills", priority: "high" },
      { name: "Open source contribution", reason: "Builds credibility and network", priority: "medium" },
      { name: "AI/ML project", reason: "Hot domain with high demand", priority: "medium" },
    ],
  },
  {
    category: "Certifications",
    items: [
      { name: "AWS Cloud Practitioner", reason: "Industry-recognized credential", priority: "medium" },
      { name: "Google UX Design", reason: "Career pivot potential", priority: "low" },
    ],
  },
];

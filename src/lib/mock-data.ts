export type DomainRole =
  | "Frontend"
  | "Backend"
  | "Full-Stack"
  | "Design (UI/UX)"
  | "Data Science/ML"
  | "DevOps"
  | "Product/PM";

export type Availability = "Actively Looking" | "Open to Offers" | "Not Available";
export type ExperienceLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";
export type Commitment = "1-5 hrs/wk" | "5-10 hrs/wk" | "10-15 hrs/wk" | "15-20 hrs/wk" | "20+ hrs/wk";

export type SkillCategory = "Frontend" | "Backend" | "Design" | "Data" | "DevOps" | "Product";

export const SKILL_CATEGORY: Record<string, SkillCategory> = {
  React: "Frontend",
  TypeScript: "Frontend",
  Tailwind: "Frontend",
  "Vue.js": "Frontend",
  CSS: "Frontend",
  Accessibility: "Frontend",
  "Next.js": "Frontend",
  "Node.js": "Backend",
  PostgreSQL: "Backend",
  AWS: "Backend",
  Django: "Backend",
  Go: "Backend",
  GraphQL: "Backend",
  Figma: "Design",
  Framer: "Design",
  "Design Systems": "Design",
  Prototyping: "Design",
  Python: "Data",
  TensorFlow: "Data",
  Pandas: "Data",
  PyTorch: "Data",
  Docker: "DevOps",
  Kubernetes: "DevOps",
  "CI/CD": "DevOps",
  Terraform: "DevOps",
  Roadmapping: "Product",
  "User Research": "Product",
  Analytics: "Product",
};

export const ALL_SKILLS = Object.keys(SKILL_CATEGORY);

export const DOMAIN_ROLES: DomainRole[] = [
  "Frontend",
  "Backend",
  "Full-Stack",
  "Design (UI/UX)",
  "Data Science/ML",
  "DevOps",
  "Product/PM",
];

export const INTERESTS = [
  "Web Apps",
  "Mobile",
  "AI/ML",
  "Hackathons",
  "Open Source",
  "Startups",
  "Developer Tools",
  "Sustainability",
];

export const COMMITMENTS: Commitment[] = [
  "1-5 hrs/wk",
  "5-10 hrs/wk",
  "10-15 hrs/wk",
  "15-20 hrs/wk",
  "20+ hrs/wk",
];

export const EXPERIENCE_LEVELS: ExperienceLevel[] = ["Beginner", "Intermediate", "Advanced", "Expert"];

export type Candidate = {
  id: string;
  name: string;
  tagline: string;
  bio: string;
  role: DomainRole;
  skills: string[];
  availability: Availability;
  experience: ExperienceLevel;
  interests: string[];
  commitment: Commitment;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  requiredRoles: { role: string; filled: boolean }[];
  missingSkills: string[];
  members: number;
  teamSize: number;
  commitment: Commitment;
  interests: string[];
  deadline: string;
  postedAgo: string;
};

export const CANDIDATES: Candidate[] = [
  {
    id: "alex",
    name: "Alex Chen",
    tagline: "Frontend dev who loves shipping fast at hackathons",
    bio: "Frontend engineer focused on React and design-system work. I've shipped 6 hackathon projects and I'm looking for a UI designer and backend dev to build something ambitious.",
    role: "Frontend",
    skills: ["React", "TypeScript", "Tailwind", "Next.js"],
    availability: "Actively Looking",
    experience: "Advanced",
    interests: ["Web Apps", "Hackathons", "Developer Tools"],
    commitment: "10-15 hrs/wk",
  },
  {
    id: "priya",
    name: "Priya Sharma",
    tagline: "UI/UX designer turning messy ideas into clean flows",
    bio: "Product designer working in Figma and Framer. I care about design systems and motion that actually helps people understand a product.",
    role: "Design (UI/UX)",
    skills: ["Figma", "Framer", "Design Systems", "Prototyping"],
    availability: "Actively Looking",
    experience: "Intermediate",
    interests: ["Mobile", "Startups"],
    commitment: "10-15 hrs/wk",
  },
  {
    id: "marcus",
    name: "Marcus Johnson",
    tagline: "Backend engineer, distributed systems nerd",
    bio: "I build APIs that don't fall over. Node, Postgres, and a lot of AWS. Happy to mentor juniors on a team.",
    role: "Backend",
    skills: ["Node.js", "PostgreSQL", "AWS", "GraphQL"],
    availability: "Open to Offers",
    experience: "Expert",
    interests: ["AI/ML", "Open Source", "Sustainability"],
    commitment: "5-10 hrs/wk",
  },
  {
    id: "sana",
    name: "Sana Iqbal",
    tagline: "Data scientist building models people actually use",
    bio: "ML engineer with a research background. Python, TensorFlow, and a soft spot for education products.",
    role: "Data Science/ML",
    skills: ["Python", "TensorFlow", "Pandas", "PyTorch"],
    availability: "Actively Looking",
    experience: "Advanced",
    interests: ["AI/ML", "Web Apps"],
    commitment: "15-20 hrs/wk",
  },
  {
    id: "diego",
    name: "Diego Ramirez",
    tagline: "Full-stack generalist, zero-to-one specialist",
    bio: "I like being the person who takes a blank repo to a deployed product. React on top, Django underneath, Docker around it.",
    role: "Full-Stack",
    skills: ["React", "Django", "Docker", "PostgreSQL"],
    availability: "Actively Looking",
    experience: "Intermediate",
    interests: ["Startups", "AI/ML", "Web Apps"],
    commitment: "20+ hrs/wk",
  },
  {
    id: "emily",
    name: "Emily Zhang",
    tagline: "PM who writes specs your engineers won't hate",
    bio: "Product manager with a research-first approach. I run discovery, shape roadmaps, and keep scope honest.",
    role: "Product/PM",
    skills: ["Roadmapping", "User Research", "Figma", "Analytics"],
    availability: "Open to Offers",
    experience: "Advanced",
    interests: ["Developer Tools", "Open Source"],
    commitment: "5-10 hrs/wk",
  },
  {
    id: "jordan",
    name: "Jordan Lee",
    tagline: "DevOps engineer — pipelines, clusters, uptime",
    bio: "Kubernetes and Terraform. I make deploys boring on purpose. Currently heads-down at work.",
    role: "DevOps",
    skills: ["Kubernetes", "CI/CD", "Terraform", "Docker"],
    availability: "Not Available",
    experience: "Expert",
    interests: ["Open Source", "Developer Tools"],
    commitment: "1-5 hrs/wk",
  },
  {
    id: "riya",
    name: "Riya Kapoor",
    tagline: "Frontend beginner, accessibility obsessive",
    bio: "Second-year CS student learning Vue and building accessible interfaces. Looking for a first serious team project.",
    role: "Frontend",
    skills: ["Vue.js", "CSS", "Accessibility"],
    availability: "Actively Looking",
    experience: "Beginner",
    interests: ["Hackathons", "Web Apps"],
    commitment: "10-15 hrs/wk",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "ecotrack",
    title: "EcoTrack",
    description:
      "A sustainability tracking app that turns household energy and waste data into weekly habit nudges, with a shared leaderboard for dorms and flatshares.",
    ownerId: "marcus",
    requiredRoles: [
      { role: "Backend Dev", filled: true },
      { role: "Frontend Dev", filled: true },
      { role: "UI Designer", filled: false },
      { role: "Data Scientist", filled: false },
    ],
    missingSkills: ["Figma", "Python"],
    members: 3,
    teamSize: 5,
    commitment: "10-15 hrs/wk",
    interests: ["Sustainability", "Web Apps"],
    deadline: "Oct 12, 2026",
    postedAgo: "2 days ago",
  },
  {
    id: "studybuddy",
    title: "AI Study Buddy",
    description:
      "An AI study companion that reads your lecture notes and generates spaced-repetition quizzes, explanations, and a weekly revision plan.",
    ownerId: "sana",
    requiredRoles: [
      { role: "Data Scientist", filled: true },
      { role: "PM", filled: true },
      { role: "Frontend Dev", filled: false },
      { role: "Backend Dev", filled: false },
    ],
    missingSkills: ["React", "Node.js"],
    members: 2,
    teamSize: 4,
    commitment: "15-20 hrs/wk",
    interests: ["AI/ML", "Web Apps"],
    deadline: "Sep 30, 2026",
    postedAgo: "5 hours ago",
  },
  {
    id: "campusconnect",
    title: "CampusConnect",
    description:
      "A student networking app that matches people by course overlap and interests, with lightweight event meetups on campus.",
    ownerId: "riya",
    requiredRoles: [
      { role: "Frontend Dev", filled: true },
      { role: "Backend Dev", filled: false },
      { role: "PM", filled: false },
      { role: "UI Designer", filled: false },
    ],
    missingSkills: ["Node.js", "PostgreSQL", "Roadmapping"],
    members: 1,
    teamSize: 4,
    commitment: "5-10 hrs/wk",
    interests: ["Mobile", "Startups"],
    deadline: "Nov 01, 2026",
    postedAgo: "1 day ago",
  },
  {
    id: "devmatch",
    title: "DevMatch Hackathon Bot",
    description:
      "A Slack bot that forms balanced hackathon teams from a channel's members using skill vectors and availability windows. Yes, it's meta.",
    ownerId: "alex",
    requiredRoles: [
      { role: "Frontend Dev", filled: true },
      { role: "Backend Dev", filled: true },
      { role: "PM", filled: true },
      { role: "Data Scientist", filled: false },
    ],
    missingSkills: ["Python", "Pandas"],
    members: 3,
    teamSize: 4,
    commitment: "10-15 hrs/wk",
    interests: ["Hackathons", "Developer Tools", "AI/ML"],
    deadline: "Sep 20, 2026",
    postedAgo: "3 days ago",
  },
  {
    id: "recipeai",
    title: "Recipe AI",
    description:
      "Point your camera at an open fridge and get three recipes you can actually cook tonight, ranked by what expires first. Brand new repo, everything open.",
    ownerId: "diego",
    requiredRoles: [
      { role: "Full-Stack Dev", filled: true },
      { role: "UI Designer", filled: false },
      { role: "Data Scientist", filled: false },
      { role: "Backend Dev", filled: false },
      { role: "PM", filled: false },
    ],
    missingSkills: ["Figma", "TensorFlow", "Node.js"],
    members: 1,
    teamSize: 5,
    commitment: "20+ hrs/wk",
    interests: ["AI/ML", "Mobile", "Startups"],
    deadline: "Dec 15, 2026",
    postedAgo: "6 hours ago",
  },
  {
    id: "portfolio",
    title: "OpenSource Portfolio Builder",
    description:
      "A tool that reads a GitHub profile and auto-generates a clean, deployable portfolio site with real project write-ups instead of empty template text.",
    ownerId: "emily",
    requiredRoles: [
      { role: "PM", filled: true },
      { role: "Backend Dev", filled: true },
      { role: "Frontend Dev", filled: false },
      { role: "UI Designer", filled: false },
    ],
    missingSkills: ["React", "TypeScript", "Figma"],
    members: 2,
    teamSize: 4,
    commitment: "5-10 hrs/wk",
    interests: ["Open Source", "Developer Tools"],
    deadline: "Oct 28, 2026",
    postedAgo: "4 days ago",
  },
];

export const CURRENT_USER_ID = "alex";

export function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function avatarGradient(id: string) {
  const palettes = [
    "linear-gradient(135deg, oklch(0.63 0.222 302), oklch(0.79 0.14 197))",
    "linear-gradient(135deg, oklch(0.72 0.19 348), oklch(0.63 0.222 302))",
    "linear-gradient(135deg, oklch(0.8 0.16 82), oklch(0.72 0.19 348))",
    "linear-gradient(135deg, oklch(0.79 0.14 197), oklch(0.75 0.18 152))",
  ];
  const sum = [...id].reduce((a, c) => a + c.charCodeAt(0), 0);
  return palettes[sum % palettes.length];
}

export function candidateById(id: string) {
  return CANDIDATES.find((c) => c.id === id);
}

const COMMITMENT_HOURS: Record<Commitment, number> = {
  "1-5 hrs/wk": 3,
  "5-10 hrs/wk": 7.5,
  "10-15 hrs/wk": 12.5,
  "15-20 hrs/wk": 17.5,
  "20+ hrs/wk": 24,
};

export type MatchBreakdown = {
  score: number;
  skillOverlap: number;
  interestAlignment: number;
  availabilityFit: number;
};

function clamp(n: number) {
  return Math.max(42, Math.min(97, Math.round(n)));
}

export function matchCandidateToProject(candidate: Candidate, project: Project): MatchBreakdown {
  const needed = project.missingSkills;
  const hit = needed.filter((s) => candidate.skills.includes(s)).length;
  const skillOverlap = clamp(needed.length ? 45 + (hit / needed.length) * 55 : 65);

  const sharedInterests = project.interests.filter((i) => candidate.interests.includes(i)).length;
  const interestAlignment = clamp(
    45 + (sharedInterests / Math.max(1, project.interests.length)) * 60,
  );

  const diff = Math.abs(COMMITMENT_HOURS[candidate.commitment] - COMMITMENT_HOURS[project.commitment]);
  const availabilityBase = 100 - diff * 6;
  const availabilityPenalty =
    candidate.availability === "Not Available" ? 40 : candidate.availability === "Open to Offers" ? 10 : 0;
  const availabilityFit = clamp(availabilityBase - availabilityPenalty);

  const score = clamp(skillOverlap * 0.5 + interestAlignment * 0.28 + availabilityFit * 0.22);
  return { score, skillOverlap, interestAlignment, availabilityFit };
}

export function matchReasons(candidate: Candidate, project: Project): string[] {
  const reasons: string[] = [];
  const shared = project.missingSkills.filter((s) => candidate.skills.includes(s));
  if (shared.length) {
    reasons.push(`✓ Strong skill overlap in ${shared.join(" & ")} — exactly what the team is missing`);
  } else {
    reasons.push(
      `✓ ${candidate.skills.slice(0, 2).join(" & ")} experience adds depth beyond the listed gaps`,
    );
  }

  const sharedInterests = project.interests.filter((i) => candidate.interests.includes(i));
  if (sharedInterests.length) {
    reasons.push(`✓ Both interested in ${sharedInterests.join(" and ")}`);
  }

  if (candidate.commitment === project.commitment) {
    reasons.push(`✓ Availability aligns (${project.commitment})`);
  } else {
    reasons.push(
      `⚠ Commitment differs — ${candidate.name.split(" ")[0]} has ${candidate.commitment} vs project's ${project.commitment}`,
    );
  }

  const gaps = project.missingSkills.filter((s) => !candidate.skills.includes(s));
  if (gaps.length) {
    reasons.push(`⚠ Still open: ${gaps.join(", ")} — consider pairing with a specialist`);
  }
  return reasons;
}

export type ActivityEvent = { id: string; text: string; time: string; kind: "request" | "match" | "sent" };

export const INITIAL_ACTIVITY: ActivityEvent[] = [
  { id: "a1", text: "Priya Sharma requested to join your project 'DevMatch Hackathon Bot'", time: "12m ago", kind: "request" },
  { id: "a2", text: "You were matched 91% with 'AI Study Buddy'", time: "3h ago", kind: "match" },
  { id: "a3", text: "Marcus Johnson viewed your profile after you applied to 'EcoTrack'", time: "1d ago", kind: "sent" },
  { id: "a4", text: "Sana Iqbal accepted your invite to 'DevMatch Hackathon Bot'", time: "2d ago", kind: "match" },
];

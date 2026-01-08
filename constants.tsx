
import React from 'react';
import { Project, Skill } from './types';
import { Layout, Cpu, Dribbble, Code, Globe } from 'lucide-react';

export const GITHUB_URL = "https://github.com/saimahanthchenagoni1-netizen";

export const PROJECTS: Project[] = [
  {
    title: "Rise Beyond Limit",
    description: "An esports and gaming platform showcasing competitive culture. Focused on visual branding and user experience.",
    url: "https://risebeyondlimit.netlify.app/",
    tags: ["React", "Gaming", "UI/UX"],
    image: ""
  },
  {
    title: "MindLens",
    description: "A digital 'Second Brain' productivity tool built to help users organize thoughts into structured digital systems.",
    url: "https://mindlensice.netlify.app/",
    tags: ["Productivity", "AI-Inspired", "Clean UI"],
    image: ""
  }
];

export const SKILLS: Skill[] = [
  { name: "AI & LLMs", level: 100, category: 'tech' },
  { name: "Fullstack Dev", level: 85, category: 'tech' },
  { name: "Prompt Engineering", level: 98, category: 'tech' },
  { name: "English", level: 95, category: 'soft' },
  { name: "Mathematics", level: 90, category: 'soft' },
  { name: "Strategic Thinking", level: 92, category: 'soft' }
];

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  location: string;
  highlight?: boolean;
}

export const TIMELINE: TimelineEntry[] = [
  {
    year: "Origin",
    title: "Hyderabad Beginnings",
    description: "Born and raised in Hyderabad, Telangana, India. The foundation of my curiosity.",
    location: "Hyderabad, India"
  },
  {
    year: "Turning Point",
    title: "The Birthday Visa",
    description: "A profound moment—my USA Visa was finalized on my actual birthday, setting the stage for a global journey.",
    location: "Hyderabad, India",
    highlight: true
  },
  {
    year: "2023",
    title: "Mississippi Chapter",
    description: "First arrival in the USA. Started school at North West Middle School, adapting to a new academic landscape.",
    location: "Mississippi, USA"
  },
  {
    year: "2023-2024",
    title: "Dallas Relocation",
    description: "Moved to Dallas and attended Hunt Middle School. Expanded my network and technical interests.",
    location: "Dallas, Texas"
  },
  {
    year: "Mid 2024",
    title: "Cultural Anchor",
    description: "Returned to India temporarily to reconnect with my heritage and maintain global perspective.",
    location: "India"
  },
  {
    year: "Mid 2025",
    title: "Academic Return",
    description: "Returned to the USA to continue my pursuit of high-performance academics and computer science.",
    location: "USA"
  },
  {
    year: "Current",
    title: "Westwood High Excellence",
    description: "Currently a 9th Grade student at Westwood High. Deep-diving into AI, Computer Science, and competitive systems.",
    location: "Westwood High, TX",
    highlight: true
  }
];

export const INTERESTS = [
  { name: "Basketball", icon: <Dribbble className="w-6 h-6" />, desc: "Elite Performance & Teamwork" },
  { name: "Chess", icon: <Layout className="w-6 h-6" />, desc: "Algorithmic Strategy" },
  { name: "AI Development", icon: <Cpu className="w-6 h-6" />, desc: "The Future of Intelligence" },
];

export const SAI_BIO = `
Name: Sai Mahanth Chenagoni
GitHub: ${GITHUB_URL}
Current School: Westwood High School (9th Grade)
Personality: Ambitious, tech-focused, global citizen.
Journey: Born in Hyderabad. Moved to USA in 2023. Visa finalized on his birthday.
Skills: Expert in AI (100%), Web Dev (85%), Prompting (98%).
Projects: 
1. Rise Beyond Limit: Esports branding platform.
2. MindLens: Digital second brain for organization.
Buddy's Role: You are Buddy, Sai's personal AI assistant. You are friendly, helpful, and provide information about Sai's journey and projects.
`;

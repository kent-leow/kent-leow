export interface ContactInfo {
  phone: string;
  email?: string;
  location: string;
  residence: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  startDate: string;
  endDate: string;
}

export interface PersonalProject {
  id: string;
  title: string;
  description: string;
  url: string;
  preview: string;
  technologies: string[];
  features: string[];
}

export type ExternalLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  tagline: string;
  headline: string[];
  introduction: string;
  body: string;
  interests: string[];
  personalNote: string;
  socials: (ExternalLink & { description: string })[];
};

export type Project = {
  /** Stable anchor, independent of the title or illustration. */
  id: string;
  title: string;
  summary: string;
  description?: string;
  category: string;
  technologies: string[];
  links: ExternalLink[];
  featured?: boolean;
  image?: { src: `/projects/${string}`; alt: string };
};

export type Activity = {
  id: string;
  /** ISO year, year-month, or full date; display is derived from this value. */
  date: string;
  /** Optional ISO end date, or "present" for an ongoing activity. */
  endDate?: string;
  title: string;
  description?: string;
  kind: "work" | "event" | "project" | "learning";
  links?: ExternalLink[];
};

export type SkillGroup = {
  id: string;
  title: string;
  technologies: string[];
  description?: string;
};

export const portfolioSectionIds = ["works", "about", "skills", "activities", "contact"] as const;
export type PortfolioSectionId = typeof portfolioSectionIds[number];

export type PortfolioSectionConfig = {
  id: PortfolioSectionId;
  label: string;
  enabled: boolean;
};

export type PortfolioContent = {
  profile: Profile;
  projects: Project[];
  activities: Activity[];
  skillGroups: SkillGroup[];
  sections: PortfolioSectionConfig[];
};

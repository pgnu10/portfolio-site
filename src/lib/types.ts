export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  company: string;
  tags: string[];
  tldr: string;
  impact: string[];
  featured: boolean;
  order: number;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  highlight?: boolean;
}


export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string | null;
  published_at: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
  repo_url: string | null;
  demo_url: string | null;
  thumbnail: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  name: string;
  bio: string;
  skills: string[];
  experience: Experience[];
  photo: string | null;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface User {
  id: string;
  email: string;
}

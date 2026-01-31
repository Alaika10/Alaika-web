
import { createClient } from '@supabase/supabase-js';

// NEXT_PUBLIC_ prefixes are standard for Vercel/Next.js environment variables
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* 
DATABASE SCHEMA SETUP (Run this in Supabase SQL Editor):

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: Blogs
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL,
  repo_url TEXT,
  demo_url TEXT,
  thumbnail TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: Profile
CREATE TABLE profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio TEXT,
  skills TEXT[],
  experience JSONB,
  photo TEXT
);

-- BUCKET SETUP:
-- Create a public bucket named 'uploads' in Supabase Storage dashboard.

-- RLS Policies
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read blogs" ON blogs FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read profile" ON profile FOR SELECT USING (true);

CREATE POLICY "Admin CRUD blogs" ON blogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin CRUD projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin CRUD profile" ON profile FOR ALL USING (auth.role() = 'authenticated');
*/

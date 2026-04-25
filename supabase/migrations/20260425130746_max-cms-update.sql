-- Update Profile Table
ALTER TABLE profile 
ADD COLUMN IF NOT EXISTS tagline2 TEXT,
ADD COLUMN IF NOT EXISTS about_description TEXT;

-- Create Blog Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  image_url TEXT,
  category TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS for Blog
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Blog Policies
CREATE POLICY "Public read access" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Admin write access" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');

-- Storage Bucket check (Ensure 'portfolio' bucket exists)
-- This is handled via UI usually, but good to have policies here
-- (Assumes bucket 'portfolio' exists)

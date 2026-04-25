-- Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabel Profil Utama
CREATE TABLE profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  portrait_url TEXT,
  location TEXT,
  birth_date DATE,
  education TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Tabel Proyek
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  role TEXT,
  situation TEXT,
  result TEXT,
  category TEXT,
  image_url TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Tabel Keahlian (Skills)
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT, -- 'Strategic' atau 'Human'
  level INTEGER DEFAULT 90,
  icon TEXT
);

-- Tabel Pengalaman
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year TEXT,
  role TEXT,
  organization TEXT,
  description TEXT,
  impact TEXT,
  icon TEXT,
  is_dark BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0
);

-- Tabel Penghargaan
CREATE TABLE awards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  year TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;

-- Create Policies (Allow public read, authenticated write)
CREATE POLICY "Public read access" ON profile FOR SELECT USING (true);
CREATE POLICY "Admin write access" ON profile FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Admin write access" ON projects FOR ALL USING (all);

CREATE POLICY "Public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Admin write access" ON skills FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read access" ON experience FOR SELECT USING (true);
CREATE POLICY "Admin write access" ON experience FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read access" ON awards FOR SELECT USING (true);
CREATE POLICY "Admin write access" ON awards FOR ALL USING (auth.role() = 'authenticated');

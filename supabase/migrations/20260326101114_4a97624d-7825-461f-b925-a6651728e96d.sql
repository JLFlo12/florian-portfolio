
-- Table for dynamic projects
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description_fr TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  thumbnail_url TEXT,
  slideshow_url TEXT,
  slideshow_type TEXT DEFAULT 'canva',
  status TEXT NOT NULL DEFAULT 'completed',
  detailed_content JSONB DEFAULT '[]',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Public read access
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read projects"
ON public.projects
FOR SELECT
TO anon, authenticated
USING (true);

-- Storage bucket for thumbnails
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-thumbnails', 'project-thumbnails', true);

CREATE POLICY "Anyone can read thumbnails"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'project-thumbnails');

CREATE POLICY "Authenticated can upload thumbnails"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'project-thumbnails');

CREATE POLICY "Authenticated can delete thumbnails"
ON storage.objects
FOR DELETE
TO anon, authenticated
USING (bucket_id = 'project-thumbnails');

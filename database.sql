-- Run this in your Supabase SQL Editor

-- 1. Create Portfolio Table
CREATE TABLE public.portfolio (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT,
    services TEXT,
    size TEXT,
    challenge TEXT,
    result TEXT,
    image_url TEXT,
    seo_title TEXT,
    seo_desc TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Articles Table
CREATE TABLE public.articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    category TEXT,
    author TEXT,
    read_time TEXT,
    image_url TEXT,
    seo_title TEXT,
    seo_desc TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Setup Row Level Security (RLS)
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to portfolio
CREATE POLICY "Allow public read access on portfolio" 
ON public.portfolio FOR SELECT USING (true);

-- Allow public read access to articles
CREATE POLICY "Allow public read access on articles" 
ON public.articles FOR SELECT USING (true);

-- Allow authenticated users to manage portfolio
CREATE POLICY "Allow authenticated users all access on portfolio" 
ON public.portfolio FOR ALL USING (auth.role() = 'authenticated');

-- Allow authenticated users to manage articles
CREATE POLICY "Allow authenticated users all access on articles" 
ON public.articles FOR ALL USING (auth.role() = 'authenticated');

-- 4. Create Storage Bucket for Images (Optional if you want to use Supabase Storage)
insert into storage.buckets (id, name, public) values ('images', 'images', true);
create policy "Allow public viewing of images" on storage.objects for select using ( bucket_id = 'images' );
create policy "Allow authenticated users to upload images" on storage.objects for insert with check ( bucket_id = 'images' and auth.role() = 'authenticated' );
create policy "Allow authenticated users to update images" on storage.objects for update using ( bucket_id = 'images' and auth.role() = 'authenticated' );
create policy "Allow authenticated users to delete images" on storage.objects for delete using ( bucket_id = 'images' and auth.role() = 'authenticated' );

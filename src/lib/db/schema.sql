-- ============================================================================
-- PAM MEDIA — PRODUCTION SUPABASE POSTGRESQL SCHEMA & RLS POLICIES
-- ============================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    base_price_ghs DECIMAL(10,2) NOT NULL,
    base_price_usd DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    duration VARCHAR(100),
    cover_image TEXT NOT NULL,
    popular BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_number VARCHAR(50) UNIQUE NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    service_id VARCHAR(255) NOT NULL,
    service_title VARCHAR(255) NOT NULL,
    shoot_date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    budget_range VARCHAR(100) NOT NULL,
    details TEXT,
    inspiration_urls JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. GALLERIES TABLE
CREATE TABLE IF NOT EXISTS public.galleries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    cover_image TEXT NOT NULL,
    pin_code VARCHAR(10) NOT NULL,
    password_hash TEXT,
    status VARCHAR(50) DEFAULT 'active',
    expires_at TIMESTAMP WITH TIME ZONE,
    allow_downloads BOOLEAN DEFAULT true,
    watermark_enabled BOOLEAN DEFAULT false,
    image_count INT DEFAULT 0,
    favorite_count INT DEFAULT 0,
    total_downloads INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. GALLERY IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gallery_id UUID REFERENCES public.galleries(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    original_url TEXT NOT NULL,
    large_url TEXT NOT NULL,
    medium_url TEXT NOT NULL,
    thumb_url TEXT NOT NULL,
    blur_data_url TEXT,
    width INT NOT NULL,
    height INT NOT NULL,
    camera VARCHAR(100),
    lens VARCHAR(100),
    aperture VARCHAR(50),
    shutter_speed VARCHAR(50),
    iso INT,
    focal_length VARCHAR(50),
    taken_at TIMESTAMP WITH TIME ZONE,
    favorites_count INT DEFAULT 0,
    download_count INT DEFAULT 0,
    position INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(255),
    details TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_galleries_slug ON public.galleries(slug);
CREATE INDEX IF NOT EXISTS idx_gallery_images_gallery ON public.gallery_images(gallery_id);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Public can read services
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (true);

-- Anyone can submit a booking
CREATE POLICY "Public Create Booking" ON public.bookings FOR INSERT WITH CHECK (true);

-- Public can read active galleries by slug (PIN checked at application layer)
CREATE POLICY "Public Read Active Galleries" ON public.galleries FOR SELECT USING (status = 'active');

-- Public can view gallery images
CREATE POLICY "Public Read Gallery Images" ON public.gallery_images FOR SELECT USING (true);

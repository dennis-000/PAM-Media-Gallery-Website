import { Service, Booking, Gallery, GalleryImage, Testimonial, BlogPost, Invoice, ActivityLog, AdminStats } from '../types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-wedding-mastery',
    title: 'Luxury Wedding Storytelling',
    slug: 'luxury-wedding-storytelling',
    category: 'weddings',
    basePriceGHS: 25000,
    basePriceUSD: 2000,
    description: 'Complete cinematic documentation of your love story. Full-day coverage with dual photographers, drone imagery, luxury heirloom album, and private online gallery.',
    features: [
      'Full Day Coverage (Up to 14 Hours)',
      'Lead Photographer & Associate Photographer',
      'High-Resolution Drone Aerial Photography',
      'Handcrafted Italian Leather Heirloom Album',
      'Private Password & PIN Protected Online Gallery',
      'Pre-Wedding / Engagement Session Included',
      'Sneak Peek Images within 48 Hours',
    ],
    duration: 'Full Day',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600',
    popular: true,
  },
  {
    id: 'srv-corporate-brand',
    title: 'Corporate & Executive Branding',
    slug: 'corporate-executive-branding',
    category: 'corporate',
    basePriceGHS: 12000,
    basePriceUSD: 1000,
    description: 'Elevate your enterprise presence with executive headshots, editorial team photography, facilities imagery, and corporate event documentation.',
    features: [
      'Half-Day or Full-Day On-Location Studio Setup',
      'Executive Headshots with Tethered Live Preview',
      'Commercial Usage & PR Licensing Included',
      'Professional Retouching & Color Grading',
      'High-Speed Cloud Gallery & Instant Web Delivery',
    ],
    duration: 'Half Day / Full Day',
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1600',
  },
  {
    id: 'srv-fine-art-portrait',
    title: 'Editorial Portraiture & Studio',
    slug: 'editorial-portraiture',
    category: 'portrait',
    basePriceGHS: 5000,
    basePriceUSD: 400,
    description: 'Bespoke portrait sessions crafted in-studio or at signature locations across Accra. Styled lighting, mood creation, and high-end magazine finishing.',
    features: [
      '2 Hour Styled Studio / Location Session',
      'Up to 4 Look & Outfit Changes',
      'Professional Makeup Artist Recommendation',
      '25 Fine Art Retouched Master Files',
      'Private Download Portal',
    ],
    duration: '2 Hours',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1600',
    popular: true,
  },
  {
    id: 'srv-event-coverage',
    title: 'Galas, Expos & Cultural Celebrations',
    slug: 'galas-expos-cultural-events',
    category: 'events',
    basePriceGHS: 8500,
    basePriceUSD: 700,
    description: 'Comprehensive documentary coverage for high-profile galas, cultural festivals, product launches, and milestone anniversaries.',
    features: [
      'Up to 8 Hours Event Coverage',
      'Candid & Red Carpet Step-and-Repeat Photography',
      'Real-Time Express Delivery for Social Media / Press',
      'Full High-Res Archival Collection',
    ],
    duration: '8 Hours',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600',
  },
  {
    id: 'srv-branding-commercial',
    title: 'Commercial Campaign & Content',
    slug: 'commercial-campaign-content',
    category: 'branding',
    basePriceGHS: 18000,
    basePriceUSD: 1500,
    description: 'End-to-end creative direction, lifestyle product photography, and brand narrative asset creation for fashion, hospitality, and tech brands.',
    features: [
      'Creative Direction & Moodboard Planning',
      'Model Sourcing & Location Scouting',
      'Social Media Assets + Billboard Resolution Files',
      'Full Commercial Distribution Rights',
    ],
    duration: 'Full Project',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600',
  },
  {
    id: 'srv-cinematic-video',
    title: 'Cinematic Videography & Film',
    slug: 'cinematic-videography-film',
    category: 'videography',
    basePriceGHS: 30000,
    basePriceUSD: 2400,
    description: 'Ultra HD 4K cinema productions, wedding highlight films, documentary stories, and high-impact commercial reels with sound design.',
    features: [
      '4K Cinema Cameras & Cinema Lenses',
      'Professional Audio Recording & Sound Design',
      'Drone 4K Aerial Videography',
      '3-5 Minute Highlight Film + Full Feature Edit',
      'Color Graded in DaVinci Resolve',
    ],
    duration: 'Full Day',
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1600',
  },
];

export const INITIAL_GALLERIES: Gallery[] = [
  {
    id: 'gal-kwame-ama-2026',
    title: 'Kwame & Ama — Royal Wedding at Labadi Beach',
    slug: 'kwame-ama-wedding',
    accessKey: 'PAM-8892',
    clientName: 'Kwame & Ama Mensah',
    clientEmail: 'kwame.mensah@example.com',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600',
    pinCode: '2026',
    status: 'active',
    allowDownloads: true,
    watermarkEnabled: false,
    imageCount: 12,
    favoriteCount: 8,
    totalDownloads: 42,
    createdAt: '2026-06-15T10:00:00Z',
    images: [
      {
        id: 'img-1',
        galleryId: 'gal-kwame-ama-2026',
        fileName: 'PAM_Kwame_Ama_001.jpg',
        originalUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2400',
        largeUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600',
        mediumUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1080',
        thumbUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400',
        blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
        width: 2400,
        height: 1600,
        exif: {
          camera: 'Canon EOS R5',
          lens: 'RF 50mm f/1.2L USM',
          aperture: 'f/1.4',
          shutterSpeed: '1/2000s',
          iso: 100,
          focalLength: '50mm',
          takenAt: '2026-06-14 15:30:00',
        },
        favoritesCount: 5,
        downloadCount: 12,
        position: 1,
        createdAt: '2026-06-15T10:00:00Z',
      },
      {
        id: 'img-2',
        galleryId: 'gal-kwame-ama-2026',
        fileName: 'PAM_Kwame_Ama_002.jpg',
        originalUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2400',
        largeUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1600',
        mediumUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1080',
        thumbUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400',
        width: 1600,
        height: 2400,
        exif: {
          camera: 'Canon EOS R5',
          lens: 'RF 85mm f/1.2L USM',
          aperture: 'f/1.8',
          shutterSpeed: '1/1600s',
          iso: 100,
          focalLength: '85mm',
        },
        favoritesCount: 3,
        downloadCount: 9,
        position: 2,
        createdAt: '2026-06-15T10:00:00Z',
      },
      {
        id: 'img-3',
        galleryId: 'gal-kwame-ama-2026',
        fileName: 'PAM_Kwame_Ama_003.jpg',
        originalUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=2400',
        largeUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1600',
        mediumUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1080',
        thumbUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=400',
        width: 2400,
        height: 1600,
        exif: {
          camera: 'Sony A1',
          lens: 'FE 24-70mm f/2.8 GM II',
          aperture: 'f/2.8',
          shutterSpeed: '1/1000s',
          iso: 200,
          focalLength: '35mm',
        },
        favoritesCount: 7,
        downloadCount: 15,
        position: 3,
        createdAt: '2026-06-15T10:00:00Z',
      },
      {
        id: 'img-4',
        galleryId: 'gal-kwame-ama-2026',
        fileName: 'PAM_Kwame_Ama_004.jpg',
        originalUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=2400',
        largeUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1600',
        mediumUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1080',
        thumbUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=400',
        width: 1600,
        height: 2400,
        exif: {
          camera: 'Canon EOS R5',
          lens: 'RF 50mm f/1.2L USM',
          aperture: 'f/1.2',
          shutterSpeed: '1/3200s',
          iso: 100,
          focalLength: '50mm',
        },
        favoritesCount: 2,
        downloadCount: 6,
        position: 4,
        createdAt: '2026-06-15T10:00:00Z',
      },
    ],
  },
  {
    id: 'gal-mtn-summit',
    title: 'MTN Ghana Leadership Summit — Kempinski Hotel',
    slug: 'mtn-ghana-summit-2026',
    clientName: 'MTN Corporate Communications',
    clientEmail: 'corp@mtn.com.gh',
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1600',
    pinCode: '7788',
    status: 'active',
    allowDownloads: true,
    watermarkEnabled: false,
    imageCount: 24,
    favoriteCount: 12,
    totalDownloads: 110,
    createdAt: '2026-07-01T14:30:00Z',
    images: [
      {
        id: 'img-10',
        galleryId: 'gal-mtn-summit',
        fileName: 'MTN_Summit_Keynote_01.jpg',
        originalUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2400',
        largeUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1600',
        mediumUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1080',
        thumbUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
        width: 2400,
        height: 1600,
        exif: {
          camera: 'Sony A7IV',
          lens: 'FE 70-200mm f/2.8 GM II',
          aperture: 'f/2.8',
          shutterSpeed: '1/500s',
          iso: 800,
          focalLength: '135mm',
        },
        favoritesCount: 8,
        downloadCount: 45,
        position: 1,
        createdAt: '2026-07-01T14:30:00Z',
      },
    ],
  },
  {
    id: 'gal-evelyn-branding',
    title: 'Evelyn Addo — Executive Branding Session',
    slug: 'evelyn-branding-portraits',
    clientName: 'Evelyn Addo',
    clientEmail: 'evelyn.addo@example.com',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1600',
    pinCode: '1234',
    status: 'active',
    allowDownloads: true,
    watermarkEnabled: false,
    imageCount: 8,
    favoriteCount: 4,
    totalDownloads: 19,
    createdAt: '2026-07-10T11:20:00Z',
    images: [
      {
        id: 'img-20',
        galleryId: 'gal-evelyn-branding',
        fileName: 'Evelyn_Addo_Portrait_01.jpg',
        originalUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=2400',
        largeUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1600',
        mediumUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1080',
        thumbUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        width: 1600,
        height: 2400,
        exif: {
          camera: 'Hasselblad X2D 100C',
          lens: 'XCD 90mm f/2.5',
          aperture: 'f/4.0',
          shutterSpeed: '1/160s',
          iso: 64,
          focalLength: '90mm',
        },
        favoritesCount: 4,
        downloadCount: 19,
        position: 1,
        createdAt: '2026-07-10T11:20:00Z',
      },
    ],
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-1001',
    bookingNumber: 'PAM-2026-089',
    clientName: 'Dr. Kojo & Abigail Osei',
    clientEmail: 'kojo.osei@example.com',
    clientPhone: '+233 24 555 0192',
    serviceId: 'srv-wedding-mastery',
    serviceTitle: 'Luxury Wedding Storytelling',
    shootDate: '2026-08-20',
    location: 'Peduase Valley Resort, Aburi',
    budgetRange: 'GHS 25,000 - 35,000',
    details: 'Traditional ceremony followed by white wedding reception in Aburi. Expecting 250 guests. We want heavy emphasis on candid storytelling and drone footage of the Aburi mountains.',
    status: 'confirmed',
    createdAt: '2026-07-18T09:15:00Z',
  },
  {
    id: 'bk-1002',
    bookingNumber: 'PAM-2026-090',
    clientName: 'GoldKey Properties Ghana',
    clientEmail: 'marketing@goldkey.com.gh',
    clientPhone: '+233 30 299 8811',
    serviceId: 'srv-branding-commercial',
    serviceTitle: 'Commercial Campaign & Content',
    shootDate: '2026-08-05',
    location: 'Cantonments Luxury Apartments, Accra',
    budgetRange: 'GHS 18,000 - 25,000',
    details: 'Architectural interior photography and commercial lifestyle shoot with models for our new penthouse development.',
    status: 'pending',
    createdAt: '2026-07-20T14:40:00Z',
  },
  {
    id: 'bk-1003',
    bookingNumber: 'PAM-2026-091',
    clientName: 'Nana Yaa Kyei',
    clientEmail: 'nanayaa.kyei@example.com',
    clientPhone: '+233 50 112 3344',
    serviceId: 'srv-fine-art-portrait',
    serviceTitle: 'Editorial Portraiture & Studio',
    shootDate: '2026-07-30',
    location: 'PAM Media Studio, Airport Residential, Accra',
    budgetRange: 'GHS 5,000 - 8,000',
    details: '30th Birthday editorial shoot with 3 glam outfit changes. Wants warm golden hour aesthetic.',
    status: 'confirmed',
    createdAt: '2026-07-21T16:05:00Z',
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    clientName: 'Kwame & Ama Mensah',
    roleOrEvent: 'Wedding at Labadi Beach Hotel',
    quote: 'PAM Media delivered beyond our wildest expectations. Every single photograph looks like a fine art print. They captured the raw joy and emotion of our families effortlessly.',
    rating: 5,
    featured: true,
    gallerySlug: 'kwame-ama-wedding',
  },
  {
    id: 't-2',
    clientName: 'Evelyn Addo',
    roleOrEvent: 'Managing Director, Horizon West',
    quote: 'The executive portraits PAM Media produced redefined my personal brand across Forbes Africa and LinkedIn. The atmosphere in their studio is calm, precise, and world-class.',
    rating: 5,
    featured: true,
    gallerySlug: 'evelyn-branding-portraits',
  },
  {
    id: 't-3',
    clientName: 'Kofi Owusu',
    roleOrEvent: 'Corporate Communications Head, MTN',
    quote: 'Prompt, discrete, and technically flawless. Delivering edited press imagery on the night of the summit gave us a huge advantage across national headlines.',
    rating: 5,
    featured: true,
    gallerySlug: 'mtn-ghana-summit-2026',
  },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Crafting Timeless Wedding Photography in Aburi & Accra',
    slug: 'crafting-timeless-wedding-photography-ghana',
    excerpt: 'How lighting, cultural nuances, and natural greenery come together to create emotional wedding portraits in West Africa.',
    content: `Ghanaian weddings are a vibrant blend of heritage, rich textures, kente colors, and heartfelt celebration. At PAM Media, our approach to wedding photography balances documentary intimacy with high-fashion editorial polish...`,
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    author: 'Pamela Media Team',
    publishedAt: '2026-06-20',
    readTimeMinutes: 5,
    category: 'Wedding Inspiration',
  },
  {
    id: 'blog-2',
    title: 'The Power of Executive Portraiture for Modern African Leaders',
    slug: 'executive-portraiture-modern-african-leaders',
    excerpt: 'Why high-impact visual branding is essential for executives, founders, and public figures in today’s digital market.',
    content: `In an era defined by first impressions, your executive photograph is often your primary introduction to global investors, press outlets, and key partners...`,
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200',
    author: 'Chief Creative Officer',
    publishedAt: '2026-07-05',
    readTimeMinutes: 4,
    category: 'Corporate & Branding',
  },
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    action: 'Gallery Access',
    entityType: 'gallery',
    entityId: 'gal-kwame-ama-2026',
    details: 'Client Kwame Mensah unlocked gallery with PIN code ****',
    timestamp: '10 minutes ago',
  },
  {
    id: 'act-2',
    action: 'High-Res Download',
    entityType: 'download',
    entityId: 'img-1',
    details: 'Downloaded PAM_Kwame_Ama_001.jpg (12.4 MB)',
    timestamp: '25 minutes ago',
  },
  {
    id: 'act-3',
    action: 'New Booking Request',
    entityType: 'booking',
    entityId: 'bk-1003',
    details: 'Nana Yaa Kyei submitted booking request for Editorial Portraiture',
    timestamp: '2 hours ago',
  },
];

// In-Memory Database Store class
class MockDatabase {
  private services: Service[] = [...INITIAL_SERVICES];
  private galleries: Gallery[] = [...INITIAL_GALLERIES];
  private bookings: Booking[] = [...INITIAL_BOOKINGS];
  private testimonials: Testimonial[] = [...INITIAL_TESTIMONIALS];
  private blogPosts: BlogPost[] = [...INITIAL_BLOG_POSTS];
  private activityLogs: ActivityLog[] = [...INITIAL_ACTIVITY_LOGS];

  getServices(): Service[] {
    return this.services;
  }

  getServiceBySlug(slug: string): Service | undefined {
    return this.services.find(s => s.slug === slug);
  }

  getBookings(): Booking[] {
    return this.bookings;
  }

  addBooking(booking: Omit<Booking, 'id' | 'bookingNumber' | 'createdAt' | 'status'>): Booking {
    const newBooking: Booking = {
      ...booking,
      id: `bk-${Date.now()}`,
      bookingNumber: `PAM-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    this.bookings.unshift(newBooking);

    this.addActivityLog({
      action: 'New Booking',
      entityType: 'booking',
      entityId: newBooking.id,
      details: `${newBooking.clientName} booked ${newBooking.serviceTitle}`,
    });

    return newBooking;
  }

  updateBookingStatus(id: string, status: Booking['status']): Booking | undefined {
    const bk = this.bookings.find(b => b.id === id);
    if (bk) {
      bk.status = status;
      this.addActivityLog({
        action: 'Booking Status Update',
        entityType: 'booking',
        entityId: id,
        details: `Booking ${bk.bookingNumber} marked as ${status}`,
      });
    }
    return bk;
  }

  getGalleries(): Gallery[] {
    return this.galleries;
  }

  getGalleryBySlug(slug: string): Gallery | undefined {
    return this.galleries.find(g => g.slug === slug);
  }

  verifyGalleryPin(slug: string, pin: string): boolean {
    const gallery = this.getGalleryBySlug(slug);
    return gallery ? gallery.pinCode === pin : false;
  }

  addGallery(gallery: Omit<Gallery, 'id' | 'createdAt' | 'imageCount' | 'favoriteCount' | 'totalDownloads'>): Gallery {
    const newGallery: Gallery = {
      ...gallery,
      id: `gal-${Date.now()}`,
      imageCount: gallery.images?.length || 0,
      favoriteCount: 0,
      totalDownloads: 0,
      createdAt: new Date().toISOString(),
    };
    this.galleries.unshift(newGallery);

    this.addActivityLog({
      action: 'Gallery Created',
      entityType: 'gallery',
      entityId: newGallery.id,
      details: `Created gallery "${newGallery.title}" for ${newGallery.clientName}`,
    });

    return newGallery;
  }

  toggleFavorite(gallerySlug: string, imageId: string): boolean {
    const gallery = this.getGalleryBySlug(gallerySlug);
    if (!gallery || !gallery.images) return false;

    const img = gallery.images.find(i => i.id === imageId);
    if (img) {
      img.favoritesCount = (img.favoritesCount || 0) + 1;
      gallery.favoriteCount = (gallery.favoriteCount || 0) + 1;
      return true;
    }
    return false;
  }

  recordDownload(gallerySlug: string, imageId?: string): void {
    const gallery = this.getGalleryBySlug(gallerySlug);
    if (gallery) {
      gallery.totalDownloads = (gallery.totalDownloads || 0) + 1;
      if (imageId && gallery.images) {
        const img = gallery.images.find(i => i.id === imageId);
        if (img) img.downloadCount = (img.downloadCount || 0) + 1;
      }
      this.addActivityLog({
        action: 'Image Download',
        entityType: 'download',
        entityId: gallery.id,
        details: `Download triggered from gallery ${gallery.title}`,
      });
    }
  }

  getTestimonials(): Testimonial[] {
    return this.testimonials;
  }

  getBlogPosts(): BlogPost[] {
    return this.blogPosts;
  }

  getActivityLogs(): ActivityLog[] {
    return this.activityLogs;
  }

  addActivityLog(log: Omit<ActivityLog, 'id' | 'timestamp'>): ActivityLog {
    const newLog: ActivityLog = {
      ...log,
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
    };
    this.activityLogs.unshift(newLog);
    return newLog;
  }

  getAdminStats(): AdminStats {
    const totalBookings = this.bookings.length;
    const pendingBookings = this.bookings.filter(b => b.status === 'pending').length;
    const activeGalleries = this.galleries.filter(g => g.status === 'active').length;
    const totalDownloads = this.galleries.reduce((sum, g) => sum + g.totalDownloads, 0);

    return {
      totalBookings: 372,
      pendingBookings,
      activeProjects: 46,
      activeGalleries,
      totalClients: 125,
      totalRevenueGHS: 485000,
      storageUsedTB: 7.4,
      totalDownloadsToday: 84,
      conversionRatePercent: 68.5,
      repeatClientPercent: 34.2,
      averageDeliveryDays: 4.2,
      totalPhotosDelivered: 42800,
      mostViewedGallerySlug: 'kwame-ama-wedding',
      inquirySources: {
        instagram: 42,
        website: 28,
        whatsapp: 18,
        referrals: 12,
      },
    };
  }
}

export const mockDb = new MockDatabase();

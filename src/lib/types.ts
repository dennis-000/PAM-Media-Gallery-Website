export type ServiceCategory = 
  | 'weddings' 
  | 'events' 
  | 'corporate' 
  | 'portrait' 
  | 'graduation' 
  | 'branding' 
  | 'videography' 
  | 'content';

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  basePriceGHS: number;
  basePriceUSD: number;
  description: string;
  features: string[];
  duration: string;
  coverImage: string;
  popular?: boolean;
}

export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  bookingNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  serviceTitle: string;
  shootDate: string;
  location: string;
  budgetRange: string;
  details: string;
  inspirationUrls?: string[];
  status: BookingStatus;
  createdAt: string;
}

export type ProjectStage = 
  | 'booked' 
  | 'planning' 
  | 'shooting' 
  | 'editing' 
  | 'review' 
  | 'gallery_ready' 
  | 'completed' 
  | 'archived';

export interface Project {
  id: string;
  projectNumber: string;
  title: string;
  clientName: string;
  clientEmail: string;
  serviceCategory: string;
  stage: ProjectStage;
  shootDate: string;
  dueDate: string;
  assignedLead: string;
  progressPercent: number;
  totalPhotosExpected: number;
  photosEdited: number;
  gallerySlug?: string;
  createdAt: string;
}

export interface ClientProfile {
  id: string;
  clientCode: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  avatarUrl?: string;
  totalBookings: number;
  totalSpendGHS: number;
  inquirySource: 'Instagram' | 'Website' | 'WhatsApp' | 'Referral' | 'Event';
  isRepeatClient: boolean;
  notes?: string;
  lastActive: string;
  createdAt: string;
}

export interface EXIFData {
  camera?: string;
  lens?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: number;
  focalLength?: string;
  takenAt?: string;
  dimensions?: { width: number; height: number };
}

export interface GalleryImage {
  id: string;
  galleryId: string;
  fileName: string;
  originalUrl: string;
  largeUrl: string;
  mediumUrl: string;
  thumbUrl: string;
  blurDataUrl?: string;
  width: number;
  height: number;
  exif?: EXIFData;
  favoritesCount: number;
  downloadCount: number;
  position: number;
  createdAt: string;
}

export type GalleryStatus = 'draft' | 'active' | 'archived' | 'expired';

export interface Gallery {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  clientEmail: string;
  coverImage: string;
  pinCode: string;
  password?: string;
  status: GalleryStatus;
  expiresAt?: string;
  allowDownloads: boolean;
  watermarkEnabled: boolean;
  imageCount: number;
  favoriteCount: number;
  totalDownloads: number;
  viewCount?: number;
  images?: GalleryImage[];
  createdAt: string;
}

export interface InvoiceItem {
  description: string;
  amountGHS: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  bookingId?: string;
  clientName: string;
  clientEmail: string;
  amountDueGHS: number;
  amountPaidGHS: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: string;
  items: InvoiceItem[];
  createdAt: string;
}

export interface MessageThread {
  id: string;
  clientName: string;
  clientEmail: string;
  subject: string;
  snippet: string;
  unread: boolean;
  channel: 'WhatsApp' | 'Email' | 'Website';
  updatedAt: string;
  messages: Array<{
    id: string;
    sender: 'client' | 'studio';
    text: string;
    timestamp: string;
  }>;
}

export type UserRole = 'owner' | 'photographer' | 'editor' | 'admin';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  activeProjects: number;
  completedShoots: number;
  status: 'active' | 'on_shoot' | 'offline';
}

export interface Testimonial {
  id: string;
  clientName: string;
  roleOrEvent: string;
  quote: string;
  avatarUrl?: string;
  rating: number;
  featured: boolean;
  gallerySlug?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  readTimeMinutes: number;
  category: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  entityType: 'booking' | 'gallery' | 'image' | 'download' | 'system' | 'invoice' | 'project';
  entityId?: string;
  details: string;
  timestamp: string;
}

export interface AdminStats {
  totalBookings: number;
  pendingBookings: number;
  activeProjects: number;
  activeGalleries: number;
  totalClients: number;
  totalRevenueGHS: number;
  storageUsedTB: number;
  totalDownloadsToday: number;
  conversionRatePercent: number;
  repeatClientPercent: number;
  averageDeliveryDays: number;
  totalPhotosDelivered: number;
  mostViewedGallerySlug: string;
  inquirySources: {
    instagram: number;
    website: number;
    whatsapp: number;
    referrals: number;
  };
}

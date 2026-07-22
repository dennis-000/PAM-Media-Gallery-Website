import { 
  Service, 
  Booking, 
  Gallery, 
  GalleryImage, 
  Testimonial, 
  BlogPost, 
  ActivityLog, 
  AdminStats,
  Project,
  ClientProfile,
  Invoice,
  MessageThread,
  TeamMember
} from '../types';
import { 
  INITIAL_SERVICES, 
  INITIAL_GALLERIES, 
  INITIAL_BOOKINGS, 
  INITIAL_TESTIMONIALS, 
  INITIAL_BLOG_POSTS, 
  INITIAL_ACTIVITY_LOGS 
} from './mock-db';

// Safely resolve Node.js modules only in server environment
const isServer = typeof window === 'undefined';
let fs: any = null;
let path: any = null;

if (isServer) {
  try {
    fs = eval("require('fs')");
    path = eval("require('path')");
  } catch (e) {
    console.warn('Node fs/path module resolution skipped in browser runtime.');
  }
}

const DATA_DIR = path ? path.join(process.cwd(), 'data') : '';
const STORE_FILE = path ? path.join(DATA_DIR, 'store.json') : '';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'prj-101',
    projectNumber: 'PRJ-2026-042',
    title: 'Kwame & Ama — Royal Wedding',
    clientName: 'Kwame & Ama Mensah',
    clientEmail: 'kwame.mensah@example.com',
    serviceCategory: 'Luxury Weddings',
    stage: 'gallery_ready',
    shootDate: '2026-06-14',
    dueDate: '2026-07-01',
    assignedLead: 'Pamela Addo (Chief Photographer)',
    progressPercent: 100,
    totalPhotosExpected: 850,
    photosEdited: 850,
    gallerySlug: 'kwame-ama-wedding',
    createdAt: '2026-05-10T08:00:00Z',
  },
];

export const INITIAL_CLIENTS: ClientProfile[] = [
  {
    id: 'cli-01',
    clientCode: 'CLI-801',
    name: 'Kwame & Ama Mensah',
    email: 'kwame.mensah@example.com',
    phone: '+233 24 555 0192',
    company: 'Mensah Capital Accra',
    totalBookings: 3,
    totalSpendGHS: 42000,
    inquirySource: 'Instagram',
    isRepeatClient: true,
    notes: 'VVIP Client. Prefers high-contrast editorial tones and drone highlights.',
    lastActive: '2 hours ago',
    createdAt: '2025-02-14T10:00:00Z',
  },
];

export const INITIAL_INVOICES: Invoice[] = [];

export const INITIAL_MESSAGES: MessageThread[] = [];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Pamela Media Addo',
    email: 'pamela@pammedia.com',
    role: 'owner',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    activeProjects: 12,
    completedShoots: 240,
    status: 'active',
  },
  {
    id: 'tm-2',
    name: 'Kojo Asante',
    email: 'kojo@pammedia.com',
    role: 'photographer',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    activeProjects: 8,
    completedShoots: 110,
    status: 'on_shoot',
  },
  {
    id: 'tm-3',
    name: 'Kofi Boateng',
    email: 'kofi@pammedia.com',
    role: 'editor',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    activeProjects: 14,
    completedShoots: 185,
    status: 'active',
  },
  {
    id: 'tm-4',
    name: 'Abena Mensah',
    email: 'abena@pammedia.com',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    activeProjects: 5,
    completedShoots: 60,
    status: 'active',
  },
];

export interface DatabaseStoreData {
  services: Service[];
  bookings: Booking[];
  galleries: Gallery[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  activityLogs: ActivityLog[];
  projects: Project[];
  clients: ClientProfile[];
  invoices: Invoice[];
  messages: MessageThread[];
  team: TeamMember[];
}

class PersistentDatabase {
  private data: DatabaseStoreData;

  constructor() {
    this.data = this.loadStore();
  }

  private ensureDirectory() {
    if (fs && DATA_DIR) {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
    }
  }

  private loadStore(): DatabaseStoreData {
    try {
      if (fs && STORE_FILE) {
        this.ensureDirectory();
        if (fs.existsSync(STORE_FILE)) {
          const fileContent = fs.readFileSync(STORE_FILE, 'utf-8');
          const parsed = JSON.parse(fileContent);
          return {
            services: parsed.services || INITIAL_SERVICES,
            bookings: parsed.bookings || [],
            galleries: parsed.galleries || [],
            testimonials: parsed.testimonials || INITIAL_TESTIMONIALS,
            blogPosts: parsed.blogPosts || INITIAL_BLOG_POSTS,
            activityLogs: parsed.activityLogs || INITIAL_ACTIVITY_LOGS,
            projects: parsed.projects || [],
            clients: parsed.clients || [],
            invoices: parsed.invoices || [],
            messages: parsed.messages || [],
            team: parsed.team || INITIAL_TEAM,
          };
        }
      }
    } catch (error) {
      console.warn('Error loading store file, initializing operating database:', error);
    }

    const initialData: DatabaseStoreData = {
      services: INITIAL_SERVICES,
      bookings: [],
      galleries: [],
      testimonials: INITIAL_TESTIMONIALS,
      blogPosts: INITIAL_BLOG_POSTS,
      activityLogs: INITIAL_ACTIVITY_LOGS,
      projects: [],
      clients: [],
      invoices: [],
      messages: [],
      team: INITIAL_TEAM,
    };

    this.saveStore(initialData);
    return initialData;
  }

  private saveStore(dataToSave?: DatabaseStoreData): void {
    try {
      if (fs && STORE_FILE) {
        this.ensureDirectory();
        const payload = dataToSave || this.data;
        fs.writeFileSync(STORE_FILE, JSON.stringify(payload, null, 2), 'utf-8');
      }
    } catch (error) {
      console.error('Failed to save persistent store:', error);
    }
  }

  // --- PUBLIC OPERATING SYSTEM METHODS ---

  getServices(): Service[] {
    return this.data.services;
  }

  getServiceBySlug(slug: string): Service | undefined {
    return this.data.services.find(s => s.slug === slug);
  }

  getBookings(): Booking[] {
    return this.data.bookings;
  }

  addBooking(bookingData: Omit<Booking, 'id' | 'bookingNumber' | 'createdAt' | 'status'>): Booking {
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      bookingNumber: `PAM-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    this.data.bookings.unshift(newBooking);
    
    // Automatically create associated active Project workflow
    this.addProject({
      title: `${bookingData.clientName} — ${bookingData.serviceTitle}`,
      clientName: bookingData.clientName,
      clientEmail: bookingData.clientEmail,
      serviceCategory: bookingData.serviceTitle,
      stage: 'booked',
      shootDate: bookingData.shootDate,
      dueDate: new Date((bookingData.shootDate ? new Date(bookingData.shootDate).getTime() : Date.now()) + 14 * 86400000).toISOString().split('T')[0],
      assignedLead: 'Pamela Addo (Chief Photographer)',
      totalPhotosExpected: 500,
    });

    // Automatically create or update Client profile
    const existingClient = this.data.clients.find(c => c.email.toLowerCase() === bookingData.clientEmail.toLowerCase());
    if (existingClient) {
      existingClient.totalBookings += 1;
      existingClient.lastActive = 'Just now';
    } else {
      this.addClient({
        name: bookingData.clientName,
        email: bookingData.clientEmail,
        phone: bookingData.clientPhone,
        inquirySource: 'Website',
      });
    }

    this.addActivityLog({
      action: 'New Booking Registered',
      entityType: 'booking',
      entityId: newBooking.id,
      details: `${newBooking.clientName} requested ${newBooking.serviceTitle} (${newBooking.location})`,
    });

    this.saveStore();
    return newBooking;
  }

  updateBookingStatus(id: string, status: Booking['status']): Booking | undefined {
    const bk = this.data.bookings.find(b => b.id === id);
    if (bk) {
      bk.status = status;
      this.addActivityLog({
        action: 'Booking Status Update',
        entityType: 'booking',
        entityId: id,
        details: `Booking ${bk.bookingNumber} marked as ${status.toUpperCase()}`,
      });
      this.saveStore();
    }
    return bk;
  }

  getProjects(): Project[] {
    return this.data.projects;
  }

  addProject(prjData: {
    title: string;
    clientName: string;
    clientEmail: string;
    serviceCategory: string;
    stage: Project['stage'];
    shootDate: string;
    dueDate: string;
    assignedLead: string;
    totalPhotosExpected: number;
  }): Project {
    const newPrj: Project = {
      ...prjData,
      id: `prj-${Date.now()}`,
      projectNumber: `PRJ-2026-${Math.floor(100 + Math.random() * 900)}`,
      progressPercent: 15,
      photosEdited: 0,
      createdAt: new Date().toISOString(),
    };
    this.data.projects.unshift(newPrj);
    this.saveStore();
    return newPrj;
  }

  updateProjectStage(id: string, stage: Project['stage']): Project | undefined {
    const prj = this.data.projects.find(p => p.id === id);
    if (prj) {
      prj.stage = stage;
      if (stage === 'completed' || stage === 'gallery_ready') {
        prj.progressPercent = 100;
        prj.photosEdited = prj.totalPhotosExpected;
      }
      this.addActivityLog({
        action: 'Project Workflow Stage Shift',
        entityType: 'project',
        entityId: id,
        details: `Project ${prj.projectNumber} moved to ${stage.toUpperCase()}`,
      });
      this.saveStore();
    }
    return prj;
  }

  getClients(): ClientProfile[] {
    return this.data.clients;
  }

  getClientById(id: string): ClientProfile | undefined {
    return this.data.clients.find(c => c.id === id || c.clientCode === id);
  }

  addClient(clientData: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    inquirySource?: ClientProfile['inquirySource'];
  }): ClientProfile {
    const newClient: ClientProfile = {
      id: `cli-${Date.now()}`,
      clientCode: `CLI-${Math.floor(800 + Math.random() * 200)}`,
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
      company: clientData.company || '',
      totalBookings: 1,
      totalSpendGHS: 0,
      inquirySource: clientData.inquirySource || 'Website',
      isRepeatClient: false,
      notes: 'New production client registered.',
      lastActive: 'Just now',
      createdAt: new Date().toISOString(),
    };

    this.data.clients.unshift(newClient);
    this.saveStore();
    return newClient;
  }

  getGalleries(): Gallery[] {
    return this.data.galleries;
  }

  getGalleryBySlug(slug: string): Gallery | undefined {
    return this.data.galleries.find(g => g.slug === slug);
  }

  verifyPin(slug: string, pin: string): boolean {
    const gallery = this.getGalleryBySlug(slug);
    return gallery ? gallery.pinCode === pin : false;
  }

  addGallery(galleryData: Omit<Gallery, 'id' | 'createdAt' | 'imageCount' | 'favoriteCount' | 'totalDownloads' | 'viewCount'>): Gallery {
    const newGallery: Gallery = {
      ...galleryData,
      id: `gal-${Date.now()}`,
      imageCount: galleryData.images?.length || 0,
      favoriteCount: 0,
      totalDownloads: 0,
      viewCount: 1,
      createdAt: new Date().toISOString(),
    };

    this.data.galleries.unshift(newGallery);
    this.addActivityLog({
      action: 'Client Gallery Created',
      entityType: 'gallery',
      entityId: newGallery.id,
      details: `Gallery "${newGallery.title}" initialized for ${newGallery.clientName}`,
    });

    this.saveStore();
    return newGallery;
  }

  addGalleryImage(gallerySlug: string, image: GalleryImage): void {
    const gallery = this.getGalleryBySlug(gallerySlug);
    if (gallery) {
      if (!gallery.images) gallery.images = [];
      gallery.images.push(image);
      gallery.imageCount = gallery.images.length;
      this.saveStore();
    }
  }

  toggleFavorite(gallerySlug: string, imageId: string): boolean {
    const gallery = this.getGalleryBySlug(gallerySlug);
    if (!gallery || !gallery.images) return false;

    const img = gallery.images.find(i => i.id === imageId);
    if (img) {
      img.favoritesCount = (img.favoritesCount || 0) + 1;
      gallery.favoriteCount = (gallery.favoriteCount || 0) + 1;
      this.saveStore();
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
        action: 'High-Res Download',
        entityType: 'download',
        entityId: gallery.id,
        details: `File downloaded from gallery "${gallery.title}"`,
      });
      this.saveStore();
    }
  }

  getInvoices(): Invoice[] {
    return this.data.invoices;
  }

  addInvoice(invoiceData: {
    clientName: string;
    clientEmail: string;
    amountDueGHS: number;
    dueDate: string;
    items: Invoice['items'];
  }): Invoice {
    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `PAM-INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      clientName: invoiceData.clientName,
      clientEmail: invoiceData.clientEmail,
      amountDueGHS: invoiceData.amountDueGHS,
      amountPaidGHS: 0,
      status: 'sent',
      dueDate: invoiceData.dueDate,
      items: invoiceData.items,
      createdAt: new Date().toISOString(),
    };

    this.data.invoices.unshift(newInvoice);
    this.saveStore();
    return newInvoice;
  }

  getMessages(): MessageThread[] {
    return this.data.messages;
  }

  getTeam(): TeamMember[] {
    return this.data.team;
  }

  getActivityLogs(): ActivityLog[] {
    return this.data.activityLogs;
  }

  addActivityLog(log: Omit<ActivityLog, 'id' | 'timestamp'>): ActivityLog {
    const newLog: ActivityLog = {
      ...log,
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
    };
    this.data.activityLogs.unshift(newLog);
    this.saveStore();
    return newLog;
  }

  getAdminStats(): AdminStats {
    const totalBookings = this.data.bookings.length;
    const pendingBookings = this.data.bookings.filter(b => b.status === 'pending').length;
    const activeProjects = this.data.projects.filter(p => p.stage !== 'completed' && p.stage !== 'archived').length;
    const activeGalleries = this.data.galleries.length;
    const totalClients = this.data.clients.length;

    const totalRevenueGHS = this.data.invoices.reduce((sum, inv) => sum + inv.amountPaidGHS, 0);

    return {
      totalBookings,
      pendingBookings,
      activeProjects,
      activeGalleries,
      totalClients,
      totalRevenueGHS,
      storageUsedTB: 0.2,
      totalDownloadsToday: this.data.galleries.reduce((sum, g) => sum + g.totalDownloads, 0),
      conversionRatePercent: totalBookings > 0 ? 75 : 0,
      repeatClientPercent: totalClients > 0 ? 33 : 0,
      averageDeliveryDays: 4.2,
      totalPhotosDelivered: this.data.galleries.reduce((sum, g) => sum + g.imageCount, 0),
      mostViewedGallerySlug: this.data.galleries[0]?.slug || 'kwame-ama-wedding',
      inquirySources: {
        instagram: 40,
        website: 30,
        whatsapp: 20,
        referrals: 10,
      },
    };
  }
}

export const persistentDb = new PersistentDatabase();

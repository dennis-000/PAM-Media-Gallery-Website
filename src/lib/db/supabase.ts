import { createClient } from '@supabase/supabase-js';
import { persistentDb } from './persistent-db';
import { Booking, Gallery, GalleryImage, Service, Project, ClientProfile, Invoice, MessageThread, TeamMember } from '../types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Unified Studio OS Database Layer
export const db = {
  async getServices(): Promise<Service[]> {
    if (supabase) {
      const { data, error } = await supabase.from('services').select('*').order('created_at');
      if (!error && data && data.length > 0) return data as Service[];
    }
    return persistentDb.getServices();
  },

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    if (supabase) {
      const { data, error } = await supabase.from('services').select('*').eq('slug', slug).single();
      if (!error && data) return data as Service;
    }
    return persistentDb.getServiceBySlug(slug);
  },

  async getBookings(): Promise<Booking[]> {
    if (supabase) {
      const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as Booking[];
    }
    return persistentDb.getBookings();
  },

  async createBooking(bookingData: Parameters<typeof persistentDb.addBooking>[0]): Promise<Booking> {
    if (supabase) {
      const bookingNumber = `PAM-2026-${Math.floor(100 + Math.random() * 900)}`;
      const { data, error } = await supabase.from('bookings').insert([{
        booking_number: bookingNumber,
        client_name: bookingData.clientName,
        client_email: bookingData.clientEmail,
        client_phone: bookingData.clientPhone,
        service_id: bookingData.serviceId,
        service_title: bookingData.serviceTitle,
        shoot_date: bookingData.shootDate,
        location: bookingData.location,
        budget_range: bookingData.budgetRange,
        details: bookingData.details,
        inspiration_urls: bookingData.inspirationUrls || [],
        status: 'pending',
      }]).select().single();

      if (!error && data) return data as Booking;
    }
    return persistentDb.addBooking(bookingData);
  },

  async updateBookingStatus(id: string, status: Booking['status']): Promise<Booking | undefined> {
    if (supabase) {
      const { data, error } = await supabase.from('bookings').update({ status }).eq('id', id).select().single();
      if (!error && data) return data as Booking;
    }
    return persistentDb.updateBookingStatus(id, status);
  },

  async getProjects(): Promise<Project[]> {
    return persistentDb.getProjects();
  },

  async updateProjectStage(id: string, stage: Project['stage']): Promise<Project | undefined> {
    return persistentDb.updateProjectStage(id, stage);
  },

  async getClients(): Promise<ClientProfile[]> {
    return persistentDb.getClients();
  },

  async getClientById(id: string): Promise<ClientProfile | undefined> {
    return persistentDb.getClientById(id);
  },

  async getGalleries(): Promise<Gallery[]> {
    if (supabase) {
      const { data, error } = await supabase.from('galleries').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as Gallery[];
    }
    return persistentDb.getGalleries();
  },

  async getGalleryBySlug(slug: string): Promise<Gallery | undefined> {
    if (supabase) {
      const { data, error } = await supabase.from('galleries').select('*, images:gallery_images(*)').eq('slug', slug).single();
      if (!error && data) return data as Gallery;
    }
    return persistentDb.getGalleryBySlug(slug);
  },

  async verifyPin(slug: string, pin: string): Promise<boolean> {
    if (supabase) {
      const { data, error } = await supabase.from('galleries').select('pin_code').eq('slug', slug).single();
      if (!error && data) return data.pin_code === pin;
    }
    return persistentDb.verifyPin(slug, pin);
  },

  async createGallery(galleryData: Parameters<typeof persistentDb.addGallery>[0]): Promise<Gallery> {
    if (supabase) {
      const { data, error } = await supabase.from('galleries').insert([{
        title: galleryData.title,
        slug: galleryData.slug,
        client_name: galleryData.clientName,
        client_email: galleryData.clientEmail,
        cover_image: galleryData.coverImage,
        pin_code: galleryData.pinCode,
        status: 'active',
        allow_downloads: galleryData.allowDownloads,
        watermark_enabled: galleryData.watermarkEnabled,
      }]).select().single();

      if (!error && data) return data as Gallery;
    }
    return persistentDb.addGallery(galleryData);
  },

  async addGalleryImage(gallerySlug: string, image: GalleryImage): Promise<void> {
    persistentDb.addGalleryImage(gallerySlug, image);
  },

  async getInvoices(): Promise<Invoice[]> {
    return persistentDb.getInvoices();
  },

  async getMessages(): Promise<MessageThread[]> {
    return persistentDb.getMessages();
  },

  async getTeam(): Promise<TeamMember[]> {
    return persistentDb.getTeam();
  },

  async getAdminStats() {
    return persistentDb.getAdminStats();
  },

  async getActivityLogs() {
    return persistentDb.getActivityLogs();
  },
};

'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../db/supabase';
import { persistentDb } from '../db/persistent-db';
import { sendGalleryReadyEmail } from '../email/resend';
import { Booking, ProjectStage } from '../types';

export async function updateBookingStatusAction(id: string, status: Booking['status']) {
  const updated = await db.updateBookingStatus(id, status);
  revalidatePath('/admin/bookings');
  revalidatePath('/admin');
  return { success: Boolean(updated) };
}

export async function updateProjectStageAction(id: string, stage: ProjectStage) {
  const updated = persistentDb.updateProjectStage(id, stage);
  revalidatePath('/admin/projects');
  revalidatePath('/admin');
  return { success: Boolean(updated) };
}

export async function createGalleryAction(data: {
  title: string;
  slug: string;
  clientName: string;
  clientEmail: string;
  coverImage: string;
  pinCode: string;
  allowDownloads: boolean;
  watermarkEnabled: boolean;
}) {
  const newGallery = await db.createGallery({
    ...data,
    status: 'active',
  });

  await sendGalleryReadyEmail({
    clientName: data.clientName,
    clientEmail: data.clientEmail,
    galleryTitle: data.title,
    gallerySlug: data.slug,
    pinCode: data.pinCode,
  });

  revalidatePath('/admin/galleries');
  revalidatePath('/admin');
  return { success: true, gallery: newGallery };
}

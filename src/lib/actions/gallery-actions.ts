'use server';

import { db } from '../db/supabase';
import { mockDb } from '../db/mock-db';

export async function verifyGalleryPinAction(slug: string, pin: string) {
  const isValid = await db.verifyPin(slug, pin);
  return { success: isValid };
}

export async function toggleFavoriteAction(slug: string, imageId: string) {
  const success = mockDb.toggleFavorite(slug, imageId);
  return { success };
}

export async function recordDownloadAction(slug: string, imageId?: string) {
  mockDb.recordDownload(slug, imageId);
  return { success: true };
}

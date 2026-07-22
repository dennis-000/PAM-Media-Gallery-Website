'use server';

import { db } from '../db/supabase';
import { sendBookingConfirmationEmail } from '../email/resend';
import { z } from 'zod';

const bookingSchema = z.object({
  clientName: z.string().min(2, 'Name is required'),
  clientEmail: z.string().email('Invalid email address'),
  clientPhone: z.string().min(8, 'Phone number is required'),
  serviceId: z.string().min(1, 'Please select a service'),
  serviceTitle: z.string().min(1, 'Service title is required'),
  shootDate: z.string().min(1, 'Please choose a shoot date'),
  location: z.string().min(2, 'Location is required'),
  budgetRange: z.string().min(1, 'Budget range is required'),
  details: z.string().optional(),
  inspirationUrls: z.array(z.string()).optional(),
});

export async function submitBookingAction(formData: z.infer<typeof bookingSchema>) {
  try {
    const validated = bookingSchema.parse(formData);

    const booking = await db.createBooking({
      clientName: validated.clientName,
      clientEmail: validated.clientEmail,
      clientPhone: validated.clientPhone,
      serviceId: validated.serviceId,
      serviceTitle: validated.serviceTitle,
      shootDate: validated.shootDate,
      location: validated.location,
      budgetRange: validated.budgetRange,
      details: validated.details || '',
      inspirationUrls: validated.inspirationUrls || [],
    });

    // Dispatch notification email
    await sendBookingConfirmationEmail({
      clientName: booking.clientName,
      clientEmail: booking.clientEmail,
      bookingNumber: booking.bookingNumber,
      serviceTitle: booking.serviceTitle,
      shootDate: booking.shootDate,
      location: booking.location,
    });

    return {
      success: true,
      bookingNumber: booking.bookingNumber,
      bookingId: booking.id,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: 'Failed to record booking. Please try again.' };
  }
}

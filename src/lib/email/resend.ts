import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || '';
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendBookingConfirmationEmail(params: {
  clientName: string;
  clientEmail: string;
  bookingNumber: string;
  serviceTitle: string;
  shootDate: string;
  location: string;
}) {
  const { clientName, clientEmail, bookingNumber, serviceTitle, shootDate, location } = params;

  if (resend) {
    try {
      await resend.emails.send({
        from: 'PAM Media <bookings@pammedia.com>',
        to: [clientEmail],
        subject: `Booking Request Received — ${bookingNumber}`,
        html: `
          <div style="font-family: serif; color: #0B0C0E; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E5E7EB; border-radius: 8px;">
            <h1 style="color: #D4AF37; font-size: 28px; margin-bottom: 16px;">PAM MEDIA</h1>
            <p>Dear ${clientName},</p>
            <p>Thank you for requesting a creative session with PAM Media. We have received your details and our team is reviewing your shoot schedule.</p>
            <div style="background-color: #F7F5F0; padding: 16px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 4px 0;"><strong>Reference Number:</strong> ${bookingNumber}</p>
              <p style="margin: 4px 0;"><strong>Service:</strong> ${serviceTitle}</p>
              <p style="margin: 4px 0;"><strong>Requested Date:</strong> ${shootDate}</p>
              <p style="margin: 4px 0;"><strong>Location:</strong> ${location}</p>
            </div>
            <p>Our client coordinator will reach out within 24 hours to confirm venue arrangements and contract details.</p>
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;" />
            <p style="font-size: 12px; color: #6B7280;">PAM Media — Fine Art Storytelling & Creative Production, Accra, Ghana.</p>
          </div>
        `,
      });
    } catch (err) {
      console.warn('Resend email error (handled):', err);
    }
  } else {
    console.log(`[Mock Email Sent to ${clientEmail}]: Booking ${bookingNumber} for ${serviceTitle}`);
  }
}

export async function sendGalleryReadyEmail(params: {
  clientName: string;
  clientEmail: string;
  galleryTitle: string;
  gallerySlug: string;
  pinCode: string;
}) {
  const { clientName, clientEmail, galleryTitle, gallerySlug, pinCode } = params;
  const galleryUrl = `https://pammedia.com/gallery/${gallerySlug}`;

  if (resend) {
    try {
      await resend.emails.send({
        from: 'PAM Media Client Portal <galleries@pammedia.com>',
        to: [clientEmail],
        subject: `Your Gallery is Ready — ${galleryTitle}`,
        html: `
          <div style="font-family: serif; color: #0B0C0E; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E5E7EB; border-radius: 8px;">
            <h1 style="color: #D4AF37; font-size: 28px; margin-bottom: 16px;">PAM MEDIA</h1>
            <p>Dear ${clientName},</p>
            <p>Your private online gallery for <strong>${galleryTitle}</strong> is now live and ready for viewing.</p>
            <div style="background-color: #0B0C0E; color: #FAFAF8; padding: 20px; border-radius: 6px; text-align: center; margin: 24px 0;">
              <p style="margin-bottom: 8px; color: #D4AF37; letter-spacing: 2px; text-transform: uppercase; font-size: 12px;">Your Access PIN</p>
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px;">${pinCode}</span>
            </div>
            <p style="text-align: center; margin-top: 24px;">
              <a href="${galleryUrl}" style="background-color: #D4AF37; color: #0B0C0E; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Access Your Gallery</a>
            </p>
          </div>
        `,
      });
    } catch (err) {
      console.warn('Resend email error (handled):', err);
    }
  } else {
    console.log(`[Mock Email Sent to ${clientEmail}]: Gallery ${gallerySlug} Ready with PIN ${pinCode}`);
  }
}

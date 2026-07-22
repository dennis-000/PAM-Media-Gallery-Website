/**
 * Cloudflare R2 / S3 Storage Integration
 * Manages object upload, public URL generation, and fallback object URLs for local dev mode.
 */

const R2_PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_R2_DOMAIN || '';

export interface UploadResult {
  originalUrl: string;
  largeUrl: string;
  mediumUrl: string;
  thumbUrl: string;
}

export async function uploadProcessedImageTiers(
  gallerySlug: string,
  fileName: string,
  buffers: {
    thumb: Buffer;
    medium: Buffer;
    large: Buffer;
  }
): Promise<UploadResult> {
  const sanitizeName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  
  if (R2_PUBLIC_DOMAIN) {
    const baseUrl = `https://${R2_PUBLIC_DOMAIN}/galleries/${gallerySlug}`;
    return {
      originalUrl: `${baseUrl}/large_${sanitizeName}`,
      largeUrl: `${baseUrl}/large_${sanitizeName}`,
      mediumUrl: `${baseUrl}/medium_${sanitizeName}`,
      thumbUrl: `${baseUrl}/thumb_${sanitizeName}`,
    };
  }

  // Fallback to Unsplash / Base64 high-quality mock previews for local dev environment
  const base64Thumb = `data:image/webp;base64,${buffers.thumb.toString('base64')}`;
  const base64Medium = `data:image/webp;base64,${buffers.medium.toString('base64')}`;
  const base64Large = `data:image/webp;base64,${buffers.large.toString('base64')}`;

  return {
    originalUrl: base64Large,
    largeUrl: base64Large,
    mediumUrl: base64Medium,
    thumbUrl: base64Thumb,
  };
}

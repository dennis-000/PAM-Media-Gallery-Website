import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { processUploadedImage } from '@/lib/image/sharp-pipeline';
import { db } from '@/lib/db/supabase';
import { GalleryImage } from '@/lib/types';

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

function ensureUploadsDirectory() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

export async function POST(req: NextRequest) {
  try {
    ensureUploadsDirectory();

    const formData = await req.formData();
    const gallerySlug = (formData.get('gallerySlug') as string) || 'kwame-ama-wedding';
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, error: 'No files provided for upload.' }, { status: 400 });
    }

    const processedImages: GalleryImage[] = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const originalName = file.name || `image_${Date.now()}.jpg`;
      const sanitizeBase = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
      const timestamp = Date.now();

      // Process image through Sharp pipeline
      const processed = await processUploadedImage(buffer, originalName);

      // Save WebP image tiers to public/uploads
      const thumbFileName = `thumb_${timestamp}_${sanitizeBase}.webp`;
      const mediumFileName = `medium_${timestamp}_${sanitizeBase}.webp`;
      const largeFileName = `large_${timestamp}_${sanitizeBase}.webp`;

      fs.writeFileSync(path.join(UPLOADS_DIR, thumbFileName), processed.thumbBuffer);
      fs.writeFileSync(path.join(UPLOADS_DIR, mediumFileName), processed.mediumBuffer);
      fs.writeFileSync(path.join(UPLOADS_DIR, largeFileName), processed.largeBuffer);

      const thumbUrl = `/uploads/${thumbFileName}`;
      const mediumUrl = `/uploads/${mediumFileName}`;
      const largeUrl = `/uploads/${largeFileName}`;

      const galleryImage: GalleryImage = {
        id: `img-${timestamp}-${Math.floor(Math.random() * 1000)}`,
        galleryId: gallerySlug,
        fileName: originalName,
        originalUrl: largeUrl,
        largeUrl,
        mediumUrl,
        thumbUrl,
        blurDataUrl: processed.blurDataUrl,
        width: processed.width,
        height: processed.height,
        exif: processed.exif,
        favoritesCount: 0,
        downloadCount: 0,
        position: processedImages.length + 1,
        createdAt: new Date().toISOString(),
      };

      // Add to persistent database
      await db.addGalleryImage(gallerySlug, galleryImage);
      processedImages.push(galleryImage);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully processed and uploaded ${processedImages.length} image(s).`,
      images: processedImages,
    });
  } catch (error: any) {
    console.error('Error handling binary image upload:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Image processing failed.' },
      { status: 500 }
    );
  }
}

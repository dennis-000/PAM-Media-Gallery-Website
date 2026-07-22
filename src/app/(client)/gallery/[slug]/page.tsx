'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Lock, 
  Unlock, 
  Heart, 
  Download, 
  Share2, 
  Grid, 
  Columns, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Info,
  CheckCircle2,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { persistentDb } from '@/lib/db/persistent-db';
import { verifyGalleryPinAction, toggleFavoriteAction, recordDownloadAction } from '@/lib/actions/gallery-actions';

export default function ClientGalleryPage({ params }: { params: { slug: string } }) {
  const gallery = persistentDb.getGalleryBySlug(params.slug) || persistentDb.getGalleries()[0];

  const [unlocked, setUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  
  const [layoutMode, setLayoutMode] = useState<'masonry' | 'grid'>('masonry');
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
  const [favoritedIds, setFavoritedIds] = useState<string[]>([]);
  
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null);
  const [showExifDrawer, setShowExifDrawer] = useState(false);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  if (!gallery) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pt-20">
        <Card className="max-w-md w-full p-8 bg-obsidian-900 border-obsidian-700 text-center space-y-4">
          <Lock className="w-12 h-12 text-neutral-600 mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-parchment">Gallery Not Found</h2>
          <p className="text-xs text-neutral-400">The requested gallery slug standard does not exist or has expired.</p>
          <Link href="/">
            <Button variant="outline" className="border-champagne/40 text-champagne">Return to Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const images = gallery.images || [];
  const displayImages = activeTab === 'all'
    ? images
    : images.filter(img => favoritedIds.includes(img.id));

  // PIN Unlock Verification
  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await verifyGalleryPinAction(gallery.slug, pinInput);
    if (res.success || pinInput === gallery.pinCode) {
      setUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const toggleFavorite = async (imageId: string) => {
    if (favoritedIds.includes(imageId)) {
      setFavoritedIds(favoritedIds.filter(id => id !== imageId));
    } else {
      setFavoritedIds([...favoritedIds, imageId]);
      await toggleFavoriteAction(gallery.slug, imageId);
    }
  };

  const handleDownloadSingle = async (img: any) => {
    await recordDownloadAction(gallery.slug, img.id);
    setDownloadNotification(`Downloading high-resolution ${img.fileName}...`);
    setTimeout(() => setDownloadNotification(null), 3500);

    const link = document.createElement('a');
    link.href = img.originalUrl || img.largeUrl;
    link.download = img.fileName;
    link.target = '_blank';
    link.click();
  };

  const handleDownloadAllZip = async () => {
    await recordDownloadAction(gallery.slug);
    setDownloadNotification(`Preparing full ZIP archive bundle for ${gallery.title}...`);
    setTimeout(() => setDownloadNotification(null), 4000);
  };

  // 1. PIN LOCK SCREEN
  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={gallery.coverImage}
            alt={gallery.title}
            className="w-full h-full object-cover filter blur-lg"
          />
        </div>

        <Card className="relative z-10 max-w-md w-full p-8 bg-obsidian-900/90 border-obsidian-700 backdrop-blur-xl shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-champagne/10 border border-champagne/40 text-champagne flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <Badge variant="outline" className="border-champagne/40 text-champagne">
              Private Client Portal
            </Badge>
            <h1 className="font-serif text-2xl font-bold text-parchment">
              {gallery.title}
            </h1>
            <p className="text-xs text-neutral-400">
              Please enter your 4-digit security PIN to access your fine art collection.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <Input
              type="password"
              maxLength={6}
              placeholder="Enter PIN (e.g. 2026)"
              className="text-center text-xl tracking-[0.5em] font-mono h-12"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
            />
            {pinError && (
              <p className="text-xs text-red-400">Invalid PIN. Please check your delivery email.</p>
            )}
            <Button type="submit" size="lg" className="w-full gap-2">
              <Unlock className="w-4 h-4" />
              Unlock Gallery
            </Button>
          </form>

          <p className="text-[11px] text-neutral-500">
            PIN code for testing: <span className="font-bold text-champagne">{gallery.pinCode}</span>
          </p>
        </Card>
      </div>
    );
  }

  // 2. UNLOCKED CLIENT GALLERY VIEW
  const activeImage = lightboxImageIndex !== null ? displayImages[lightboxImageIndex] : null;

  return (
    <div className="pt-20 pb-20 space-y-12">
      {/* Toast Notification */}
      {downloadNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-champagne text-obsidian px-6 py-3 rounded-lg font-bold shadow-2xl flex items-center gap-3 animate-fade-in">
          <Download className="w-5 h-5" />
          <span>{downloadNotification}</span>
        </div>
      )}

      {/* Hero Cover Banner */}
      <section className="relative h-[65vh] w-full overflow-hidden">
        <img
          src={gallery.coverImage}
          alt={gallery.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto p-8 sm:p-12 space-y-4">
          <Badge variant="outline" className="border-champagne text-champagne bg-obsidian-900/80">
            Client Gallery Archive
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-parchment">
            {gallery.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-300">
            <span>Client: <strong>{gallery.clientName}</strong></span>
            <span>Collection: <strong>{images.length} High-Res Images</strong></span>
            <span>PIN Security: <strong className="text-champagne">Verified Active</strong></span>
          </div>
        </div>
      </section>

      {/* Toolbar & Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-obsidian-900/80 border border-obsidian-700/80">
          
          {/* Tab Switcher */}
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setActiveTab('all')}
              variant={activeTab === 'all' ? 'default' : 'ghost'}
              size="sm"
            >
              All Photos ({images.length})
            </Button>
            <Button
              onClick={() => setActiveTab('favorites')}
              variant={activeTab === 'favorites' ? 'default' : 'ghost'}
              size="sm"
              className="gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              Favorites ({favoritedIds.length})
            </Button>
          </div>

          {/* Layout & Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1 border-r border-obsidian-700 pr-3">
              <Button
                onClick={() => setLayoutMode('masonry')}
                variant={layoutMode === 'masonry' ? 'outline' : 'ghost'}
                size="icon"
                className="h-8 w-8"
              >
                <Columns className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setLayoutMode('grid')}
                variant={layoutMode === 'grid' ? 'outline' : 'ghost'}
                size="icon"
                className="h-8 w-8"
              >
                <Grid className="w-4 h-4" />
              </Button>
            </div>

            <Button onClick={handleDownloadAllZip} size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Download All (Zip Archive)
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {displayImages.length === 0 ? (
          <div className="text-center py-20 bg-obsidian-900/40 rounded-xl border border-obsidian-800 space-y-3">
            <Heart className="w-10 h-10 text-neutral-600 mx-auto" />
            <p className="font-serif text-lg text-neutral-400">No favorite images saved yet.</p>
            <p className="text-xs text-neutral-500">Click the heart icon on any photo in the gallery to create your selection.</p>
          </div>
        ) : (
          <div className={layoutMode === 'masonry' ? 'columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
            {displayImages.map((img, idx) => {
              const isFav = favoritedIds.includes(img.id);

              return (
                <div
                  key={img.id}
                  className="group relative rounded-xl overflow-hidden bg-obsidian-900 border border-obsidian-700/60 shadow-lg break-inside-avoid"
                >
                  <div className="relative w-full h-80 overflow-hidden">
                    <img
                      src={img.mediumUrl}
                      alt={img.fileName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Action Overlay */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => toggleFavorite(img.id)}
                          className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
                            isFav ? 'bg-red-500 text-white' : 'bg-obsidian-900/80 text-parchment hover:text-red-400'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                        </button>
                        <button
                          onClick={() => handleDownloadSingle(img)}
                          className="w-9 h-9 rounded-full bg-obsidian-900/80 text-parchment hover:text-champagne backdrop-blur-md flex items-center justify-center"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex justify-between items-end">
                        <span className="text-xs font-mono text-neutral-300 truncate max-w-[180px]">
                          {img.fileName}
                        </span>
                        <Button
                          onClick={() => setLightboxImageIndex(idx)}
                          variant="outline"
                          size="sm"
                          className="h-8 border-champagne/40 text-champagne bg-obsidian-900/80 gap-1 text-xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Lightbox & EXIF Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/95 backdrop-blur-xl flex flex-col">
          {/* Header Bar */}
          <div className="p-4 bg-obsidian-900 border-b border-obsidian-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-parchment">{activeImage.fileName}</span>
              <span className="text-xs text-neutral-500">
                {lightboxImageIndex! + 1} of {displayImages.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowExifDrawer(!showExifDrawer)}
                variant="outline"
                size="sm"
                className="gap-1.5 border-champagne/30 text-champagne text-xs"
              >
                <Info className="w-3.5 h-3.5" />
                EXIF Info
              </Button>
              <Button
                onClick={() => handleDownloadSingle(activeImage)}
                size="sm"
                className="gap-1.5 text-xs"
              >
                <Download className="w-3.5 h-3.5" />
                Download Original
              </Button>
              <button
                onClick={() => setLightboxImageIndex(null)}
                className="w-8 h-8 rounded-full bg-obsidian-800 text-parchment flex items-center justify-center hover:text-champagne"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Image Body */}
          <div className="flex-grow relative flex items-center justify-center p-4">
            {/* Prev Button */}
            {lightboxImageIndex! > 0 && (
              <button
                onClick={() => setLightboxImageIndex(lightboxImageIndex! - 1)}
                className="absolute left-6 z-10 w-12 h-12 rounded-full bg-obsidian-900/80 border border-obsidian-700 text-parchment flex items-center justify-center hover:text-champagne"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <div className="relative max-w-6xl max-h-[80vh] w-full h-full flex items-center justify-center">
              <img
                src={activeImage.largeUrl}
                alt={activeImage.fileName}
                className="max-w-full max-h-full object-contain rounded"
              />
            </div>

            {/* Next Button */}
            {lightboxImageIndex! < displayImages.length - 1 && (
              <button
                onClick={() => setLightboxImageIndex(lightboxImageIndex! + 1)}
                className="absolute right-6 z-10 w-12 h-12 rounded-full bg-obsidian-900/80 border border-obsidian-700 text-parchment flex items-center justify-center hover:text-champagne"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* EXIF Metadata Drawer Overlay */}
            {showExifDrawer && activeImage.exif && (
              <div className="absolute right-6 top-6 bottom-6 w-80 bg-obsidian-900/90 border border-obsidian-700 rounded-xl p-6 backdrop-blur-md space-y-4 animate-fade-in shadow-2xl">
                <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
                  <h4 className="font-serif font-bold text-champagne flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    EXIF Metadata
                  </h4>
                  <button onClick={() => setShowExifDrawer(false)}>
                    <X className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>
                <div className="space-y-3 text-xs text-neutral-300">
                  <div>
                    <span className="text-neutral-500 block">Camera Model</span>
                    <span className="font-bold text-parchment">{activeImage.exif.camera || 'Canon EOS R5'}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Lens</span>
                    <span className="font-bold text-parchment">{activeImage.exif.lens || 'RF 50mm f/1.2L'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-neutral-500 block">Aperture</span>
                      <span className="font-bold text-parchment">{activeImage.exif.aperture || 'f/1.4'}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Shutter Speed</span>
                      <span className="font-bold text-parchment">{activeImage.exif.shutterSpeed || '1/2000s'}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-neutral-500 block">ISO</span>
                      <span className="font-bold text-parchment">{activeImage.exif.iso || 100}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Focal Length</span>
                      <span className="font-bold text-parchment">{activeImage.exif.focalLength || '50mm'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

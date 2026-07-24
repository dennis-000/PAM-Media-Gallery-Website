'use client';

import { useState, useEffect } from 'react';
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
  Play,
  Film,
  FolderHeart,
  Sliders,
  Calendar,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { persistentDb } from '@/lib/db/persistent-db';
import { verifyGalleryPinAction, toggleFavoriteAction, recordDownloadAction } from '@/lib/actions/gallery-actions';
import { useMounted } from '@/lib/hooks/use-mounted';
import { Gallery } from '@/lib/types';

export default function ClientGalleryPage({ params }: { params: { slug: string } }) {
  const mounted = useMounted();
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [loading, setLoading] = useState(true);

  const [unlocked, setUnlocked] = useState(false);
  const [galleryStarted, setGalleryStarted] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  
  const [viewMode, setViewMode] = useState<'grid' | 'story'>('grid');
  const [storyIndex, setStoryIndex] = useState(0);
  const [layoutMode, setLayoutMode] = useState<'masonry' | 'grid'>('masonry');
  
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
  const [smartCategory, setSmartCategory] = useState<string>('all');
  const [favoritedIds, setFavoritedIds] = useState<string[]>([]);
  
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null);
  const [showExifDrawer, setShowExifDrawer] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      await persistentDb.syncFromApi();
      const loaded = persistentDb.getGalleryBySlug(params.slug);
      setGallery(loaded || null);
      setLoading(false);
    }
    loadData();
  }, [params.slug]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pt-20">
        <Card className="max-w-md w-full p-8 bg-obsidian-900 border-obsidian-700 text-center space-y-4 animate-pulse">
          <Lock className="w-12 h-12 text-champagne/40 mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-parchment">Loading Media Vault...</h2>
          <p className="text-xs text-neutral-400">Authenticating private client media vault.</p>
        </Card>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pt-20">
        <Card className="max-w-lg w-full p-8 bg-obsidian-900 border-obsidian-700 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-obsidian-800 border border-obsidian-700 text-neutral-500 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <Badge variant="outline" className="border-champagne/30 text-champagne">
              Private Media Vault
            </Badge>
            <h2 className="font-serif text-3xl font-bold text-parchment">Gallery Not Found or Expired</h2>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto">
              This gallery link is private or does not exist. If you are a client expecting your deliverable, please check your delivery email or contact the studio.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="/contact">
              <Button variant="outline" className="w-full sm:w-auto border-champagne/40 text-champagne text-xs">
                Contact Studio Support
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button className="w-full sm:w-auto text-xs">
                View Public Portfolio
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const images = gallery.images || [];

  // Categorize images into smart collection tabs
  const smartCategories = [
    { id: 'all', label: 'All Photos' },
    { id: 'prep', label: 'Preparation' },
    { id: 'ceremony', label: 'Ceremony' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'reception', label: 'Reception' },
  ];

  const filteredImages = images.filter((img, idx) => {
    if (activeTab === 'favorites') return favoritedIds.includes(img.id);
    if (smartCategory === 'prep') return idx % 4 === 0;
    if (smartCategory === 'ceremony') return idx % 4 === 1;
    if (smartCategory === 'portraits') return idx % 4 === 2;
    if (smartCategory === 'reception') return idx % 4 === 3;
    return true;
  });

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

  const handleDownloadSingle = async (img: any, format: string = 'high-res') => {
    await recordDownloadAction(gallery.slug, img.id);
    setDownloadNotification(`Downloading ${format} (${img.fileName})...`);
    setTimeout(() => setDownloadNotification(null), 3500);

    const link = document.createElement('a');
    link.href = img.originalUrl || img.largeUrl;
    link.download = `${format}_${img.fileName}`;
    link.target = '_blank';
    link.click();
  };

  const handleDownloadZipBundle = async (type: string) => {
    await recordDownloadAction(gallery.slug);
    setDownloadNotification(`Packaging ${type} ZIP archive for ${gallery.title}...`);
    setTimeout(() => setDownloadNotification(null), 4000);
    setShowDownloadModal(false);
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
            Vault Key: <span className="font-mono text-champagne">{gallery.accessKey || 'PAM-8892'}</span> • PIN: <span className="font-bold text-champagne">{gallery.pinCode}</span>
          </p>
        </Card>
      </div>
    );
  }

  // 2. UNLOCKED COVER LANDING SCREEN
  if (!galleryStarted) {
    return (
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden pt-16">
        <img src={gallery.coverImage} alt={gallery.title} className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4]" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-6">
          <Badge variant="outline" className="border-champagne text-champagne bg-obsidian-950/80">
            PAM Media Fine Art Collection
          </Badge>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-parchment leading-tight">
            {gallery.title}
          </h1>
          
          <div className="p-6 rounded-2xl bg-obsidian-900/80 border border-obsidian-700/80 backdrop-blur-md space-y-3 max-w-xl mx-auto text-left">
            <p className="font-serif italic text-champagne text-sm sm:text-base">
              "Dear {gallery.clientName}, it was our absolute honor to document your moments. Every photograph in this private collection has been color-graded to stand the test of time."
            </p>
            <p className="text-xs text-neutral-400 text-right">— Pamela & The PAM Media Team</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-300 font-mono">
            <span>Client: <strong>{gallery.clientName}</strong></span>
            <span>Photos: <strong>{images.length} Masters</strong></span>
            <span>Vault Key: <strong className="text-champagne">{gallery.accessKey || 'PAM-8892'}</strong></span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => setGalleryStarted(true)} size="lg" className="gap-2 shadow-2xl shadow-champagne/20">
              <Play className="w-5 h-5 fill-current" />
              Start Gallery Experience
            </Button>
            <Button onClick={() => { setGalleryStarted(true); setViewMode('story'); }} variant="outline" size="lg" className="gap-2 border-champagne/40 text-champagne">
              <Film className="w-5 h-5" />
              Launch Cinematic Story Mode
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 3. CINEMATIC STORY MODE PRESENTATION
  if (viewMode === 'story') {
    const currentStoryImg = images[storyIndex] || images[0];

    return (
      <div className="fixed inset-0 z-50 bg-obsidian-950 flex flex-col justify-between p-6">
        {/* Header Bar */}
        <div className="flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <Film className="w-5 h-5 text-champagne" />
            <span className="font-serif font-bold text-parchment text-lg">{gallery.title}</span>
            <Badge variant="outline" className="border-champagne/40 text-champagne text-xs">
              Story Chapter {storyIndex + 1} of {images.length}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={() => setViewMode('grid')} variant="outline" size="sm" className="text-xs border-obsidian-700">
              <Grid className="w-4 h-4 mr-1" /> Return to Grid View
            </Button>
          </div>
        </div>

        {/* Slide Presentation */}
        <div className="relative flex-grow flex items-center justify-center my-4">
          {storyIndex > 0 && (
            <button
              onClick={() => setStoryIndex(storyIndex - 1)}
              className="absolute left-6 z-10 w-12 h-12 rounded-full bg-obsidian-900/80 border border-obsidian-700 text-parchment flex items-center justify-center hover:text-champagne"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <div className="relative max-w-5xl max-h-[75vh] w-full h-full flex flex-col items-center justify-center space-y-4">
            <img src={currentStoryImg.largeUrl} alt={currentStoryImg.fileName} className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl" />
            <p className="font-serif italic text-neutral-300 text-sm text-center">
              "{currentStoryImg.fileName} — Chapter moment captured by PAM Media"
            </p>
          </div>

          {storyIndex < images.length - 1 && (
            <button
              onClick={() => setStoryIndex(storyIndex + 1)}
              className="absolute right-6 z-10 w-12 h-12 rounded-full bg-obsidian-900/80 border border-obsidian-700 text-parchment flex items-center justify-center hover:text-champagne"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Footer Progress Timeline */}
        <div className="flex justify-between items-center border-t border-obsidian-800 pt-4 text-xs font-mono text-neutral-400">
          <span>Use left/right arrows to navigate story timeline.</span>
          <div className="flex items-center gap-2">
            <span>Progress</span>
            <div className="w-48 bg-obsidian-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-champagne h-full transition-all duration-300" style={{ width: `${((storyIndex + 1) / images.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. UNLOCKED CLIENT GALLERY GRID VIEW
  const activeImage = lightboxImageIndex !== null ? filteredImages[lightboxImageIndex] : null;

  return (
    <div className="pt-20 pb-20 space-y-12">
      {/* Toast Notification */}
      {downloadNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-champagne text-obsidian px-6 py-3 rounded-lg font-bold shadow-2xl flex items-center gap-3 animate-fade-in text-xs">
          <Download className="w-4 h-4" />
          <span>{downloadNotification}</span>
        </div>
      )}

      {/* Hero Cover Banner */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <img
          src={gallery.coverImage}
          alt={gallery.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto p-8 sm:p-12 space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-champagne text-champagne bg-obsidian-900/80">
              Client Gallery Archive
            </Badge>
            <Button onClick={() => setViewMode('story')} size="sm" variant="outline" className="h-6 text-[10px] border-champagne/40 text-champagne gap-1">
              <Film className="w-3 h-3" /> Cinematic Story Mode
            </Button>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-parchment">
            {gallery.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-300">
            <span>Client: <strong>{gallery.clientName}</strong></span>
            <span>Collection: <strong>{images.length} High-Res Images</strong></span>
            <span>Vault Key: <strong className="text-champagne">{gallery.accessKey || 'PAM-8892'}</strong></span>
          </div>
        </div>
      </section>

      {/* Toolbar & Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-obsidian-900/80 border border-obsidian-700/80">
          
          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={() => { setActiveTab('all'); setSmartCategory('all'); }}
              variant={activeTab === 'all' && smartCategory === 'all' ? 'default' : 'ghost'}
              size="sm"
              className="text-xs"
            >
              All Photos ({images.length})
            </Button>
            <Button
              onClick={() => setActiveTab('favorites')}
              variant={activeTab === 'favorites' ? 'default' : 'ghost'}
              size="sm"
              className="gap-1.5 text-xs text-red-400"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              Favorites ({favoritedIds.length})
            </Button>

            <div className="h-4 w-[1px] bg-obsidian-700 mx-1 hidden sm:block" />

            {smartCategories.slice(1).map(cat => (
              <Button
                key={cat.id}
                onClick={() => { setActiveTab('all'); setSmartCategory(cat.id); }}
                variant={smartCategory === cat.id ? 'outline' : 'ghost'}
                size="sm"
                className={`text-xs ${smartCategory === cat.id ? 'border-champagne/40 text-champagne' : 'text-neutral-400'}`}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowShareModal(true)}
              variant="outline"
              size="sm"
              className="gap-2 border-champagne/30 text-champagne hover:bg-champagne/10 text-xs"
            >
              <Share2 className="w-4 h-4" />
              Share Vault
            </Button>

            <Button onClick={() => setShowDownloadModal(true)} size="sm" className="gap-2 text-xs">
              <Download className="w-4 h-4" />
              Download Vault Options
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredImages.length === 0 ? (
          <div className="text-center py-20 bg-obsidian-900/40 rounded-xl border border-obsidian-800 space-y-3">
            <Heart className="w-10 h-10 text-neutral-600 mx-auto" />
            <p className="font-serif text-lg text-neutral-400">No images match your filter.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((img, idx) => {
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
                          onClick={() => handleDownloadSingle(img, 'high-res')}
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

      {/* Download Options Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 bg-obsidian-900 border-obsidian-700 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-champagne" />
                <h3 className="font-serif text-xl font-bold text-parchment">Download Vault Options</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowDownloadModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <Button onClick={() => handleDownloadZipBundle('Master Print (300 DPI)')} variant="outline" className="w-full justify-start gap-3 h-14 border-obsidian-700">
                <Download className="w-5 h-5 text-champagne" />
                <div className="text-left">
                  <div className="font-bold text-sm text-parchment">Master Print Archive (300 DPI)</div>
                  <div className="text-[11px] text-neutral-400">Full original resolution for photo frames & heirlooms</div>
                </div>
              </Button>

              <Button onClick={() => handleDownloadZipBundle('Social Media Optimized (2040w)')} variant="outline" className="w-full justify-start gap-3 h-14 border-obsidian-700">
                <Share2 className="w-5 h-5 text-champagne" />
                <div className="text-left">
                  <div className="font-bold text-sm text-parchment">Social Media Pack (WebP 2040w)</div>
                  <div className="text-[11px] text-neutral-400">Fast upload optimized for Instagram & LinkedIn</div>
                </div>
              </Button>

              <Button onClick={() => handleDownloadZipBundle('Favorites Only')} variant="outline" className="w-full justify-start gap-3 h-14 border-obsidian-700">
                <Heart className="w-5 h-5 text-red-400" />
                <div className="text-left">
                  <div className="font-bold text-sm text-parchment">Favorites Selection ({favoritedIds.length} Photos)</div>
                  <div className="text-[11px] text-neutral-400">Download only photos you have hearted</div>
                </div>
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 bg-obsidian-900 border-obsidian-700 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-champagne" />
                <h3 className="font-serif text-xl font-bold text-parchment">Share Vault with Family</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowShareModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-neutral-300 leading-relaxed">
                Invite your family and friends to view, heart, and download your high-resolution fine art collection.
              </p>

              <div className="p-4 rounded-xl bg-obsidian-950 border border-obsidian-800 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Vault Access Key:</span>
                  <span className="font-bold text-champagne">{gallery.accessKey || 'PAM-8892'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Family PIN Code:</span>
                  <span className="font-bold text-parchment">{gallery.pinCode}</span>
                </div>
              </div>

              <Button
                onClick={() => {
                  const url = `${window.location.origin}/gallery/${gallery.slug}`;
                  const msg = `✨ PAM Media Fine Art Vault Invitation ✨\n\nYou are invited by ${gallery.clientName} to view our official photo collection!\n\n🔐 Vault Access Key: ${gallery.accessKey || 'PAM-8892'}\n🔑 Family PIN: ${gallery.pinCode}\n🌐 Direct Access Link: ${url}`;
                  navigator.clipboard.writeText(msg);
                  setDownloadNotification('Family invitation copied! Ready to paste into WhatsApp or Email.');
                  setTimeout(() => setDownloadNotification(null), 4000);
                  setShowShareModal(false);
                }}
                className="w-full gap-2"
              >
                <Sparkles className="w-4 h-4" /> Copy Invitation for WhatsApp / Email
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Images, Plus, Upload, Lock, Sparkles, CheckCircle2, Eye, ShieldCheck, HardDrive, Key, Copy, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { createGalleryAction } from '@/lib/actions/admin-actions';
import { persistentDb } from '@/lib/db/persistent-db';
import { useMounted } from '@/lib/hooks/use-mounted';
import { useAuthProtection } from '@/lib/hooks/use-auth-protection';
import { Gallery } from '@/lib/types';

export default function AdminGalleriesPage() {
  const { mounted, authorized } = useAuthProtection();
  const [galleries, setGalleries] = useState<Gallery[]>(persistentDb.getGalleries());
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const [newGallery, setNewGallery] = useState({
    title: '',
    slug: '',
    accessKey: `PAM-${Math.floor(1000 + Math.random() * 9000)}`,
    clientName: '',
    clientEmail: '',
    pinCode: Math.floor(1000 + Math.random() * 9000).toString(),
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600',
  });

  useEffect(() => {
    async function loadData() {
      await persistentDb.syncFromApi();
      setGalleries(persistentDb.getGalleries());
    }
    loadData();
  }, []);

  if (!mounted || !authorized) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-16 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    // Simulate Sharp processing & R2 Upload Tiers progress
    for (let i = 10; i <= 100; i += 20) {
      setUploadProgress(i);
      await new Promise(r => setTimeout(r, 200));
    }

    const slug = newGallery.slug || newGallery.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    await createGalleryAction({
      ...newGallery,
      slug,
      allowDownloads: true,
      watermarkEnabled: false,
    });

    setUploading(false);
    setShowModal(false);
    setGalleries(persistentDb.getGalleries());
    setNewGallery({
      title: '',
      slug: '',
      accessKey: `PAM-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: '',
      clientEmail: '',
      pinCode: Math.floor(1000 + Math.random() * 9000).toString(),
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600',
    });
  };

  const copyInviteToClipboard = (gal: Gallery) => {
    const key = gal.accessKey || 'PAM-8892';
    const link = `${window.location.origin}/gallery/${gal.slug}`;
    const msg = `✨ PAM Media Fine Art Vault Invitation ✨\n\nClient: ${gal.clientName}\nGallery: ${gal.title}\n\n🔐 Vault Access Key: ${key}\n🔑 Security PIN: ${gal.pinCode}\n🌐 Direct Vault Link: ${link}`;
    navigator.clipboard.writeText(msg);
    setCopiedNotification(`Client delivery invite for ${gal.clientName} copied!`);
    setTimeout(() => setCopiedNotification(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {copiedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-champagne text-obsidian px-6 py-3 rounded-lg font-bold shadow-2xl flex items-center gap-3 animate-fade-in text-xs">
          <Copy className="w-4 h-4" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            Client Media Vault Control
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Galleries & Media Delivery
          </h1>
        </div>

        <Button onClick={() => setShowModal(true)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Create New Client Gallery
        </Button>
      </div>

      {/* Galleries Directory */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleries.map((gal) => (
          <Card key={gal.id} className="overflow-hidden border-obsidian-700 bg-obsidian-900/60 flex flex-col justify-between">
            <div>
              <div className="relative h-48 w-full">
                <img src={gal.coverImage} alt={gal.title} className="w-full h-full object-cover" />
                
                <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                  <Badge variant="default" className="text-[10px] gap-1 bg-obsidian-950/90 border border-champagne/40 text-champagne">
                    <Key className="w-3 h-3" /> Key: {gal.accessKey || 'PAM-8892'}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] gap-1 bg-obsidian-950/90 border border-obsidian-700 text-parchment">
                    <Lock className="w-3 h-3 text-champagne" /> PIN: {gal.pinCode}
                  </Badge>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-serif font-bold text-parchment text-lg leading-snug">{gal.title}</h3>
                <p className="text-xs text-neutral-400">Client: <strong className="text-neutral-200">{gal.clientName}</strong></p>
                <p className="text-[11px] text-neutral-500 font-mono">Email: {gal.clientEmail}</p>

                <div className="flex items-center gap-4 text-xs text-neutral-500 pt-2 border-t border-obsidian-800">
                  <span>{gal.imageCount} Images</span>
                  <span>•</span>
                  <span>{gal.totalDownloads} Downloads</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-obsidian-800 flex justify-between items-center gap-2 pt-3">
              <Button
                onClick={() => copyInviteToClipboard(gal)}
                variant="outline"
                size="sm"
                className="h-8 border-obsidian-700 text-neutral-300 hover:text-champagne text-xs gap-1"
              >
                <Copy className="w-3 h-3" />
                Copy Invite
              </Button>

              <Link href={`/gallery/${gal.slug}`} target="_blank">
                <Button variant="outline" size="sm" className="h-8 border-champagne/30 text-champagne text-xs gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  View Portal
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* New Gallery & Batch Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="max-w-xl w-full p-8 bg-obsidian-900 border-obsidian-700 shadow-2xl space-y-6">
            <div className="border-b border-obsidian-800 pb-4 flex justify-between items-center">
              <h3 className="font-serif text-2xl font-bold text-parchment">Create Client Gallery & Vault Key</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
            </div>

            <form onSubmit={handleCreateGallery} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Gallery Title</label>
                <Input
                  required
                  placeholder="e.g. Kwame & Ama — Wedding Reception"
                  value={newGallery.title}
                  onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Client Name</label>
                  <Input
                    required
                    placeholder="Kwame Mensah"
                    value={newGallery.clientName}
                    onChange={(e) => setNewGallery({ ...newGallery, clientName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Client Email</label>
                  <Input
                    required
                    type="email"
                    placeholder="kwame@example.com"
                    value={newGallery.clientEmail}
                    onChange={(e) => setNewGallery({ ...newGallery, clientEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Vault Access Key</label>
                  <Input
                    required
                    value={newGallery.accessKey}
                    onChange={(e) => setNewGallery({ ...newGallery, accessKey: e.target.value })}
                    className="font-mono text-center font-bold text-champagne"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Security PIN Code</label>
                  <Input
                    required
                    value={newGallery.pinCode}
                    onChange={(e) => setNewGallery({ ...newGallery, pinCode: e.target.value })}
                    className="font-mono text-center font-bold tracking-widest text-parchment"
                  />
                </div>
              </div>

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-obsidian-700 rounded-xl p-8 text-center space-y-2 bg-obsidian-800/20">
                <Upload className="w-8 h-8 text-champagne mx-auto" />
                <p className="font-serif text-sm text-parchment font-bold">Batch Image Upload (Sharp Processing)</p>
                <p className="text-xs text-neutral-400">Generates 400w, 1080w, 2040w WebP tiers + EXIF extraction automatically.</p>
              </div>

              {uploading && (
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs text-champagne font-bold">
                    <span>Processing Sharp WebP Tiers & Cloudflare Sync...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-obsidian-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-champagne h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              )}

              <Button type="submit" size="lg" disabled={uploading} className="w-full gap-2 mt-4">
                <Sparkles className="w-4 h-4" /> Save Gallery & Generate Client Delivery Key
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

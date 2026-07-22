'use client';

import { useState } from 'react';
import { UploadCloud, FileImage, CheckCircle2, Pause, Play, RefreshCw, X, HardDrive, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { mockDb } from '@/lib/db/mock-db';

interface QueueItem {
  id: string;
  file: File;
  name: string;
  sizeMB: string;
  progress: number;
  status: 'queued' | 'uploading' | 'processing' | 'completed' | 'error';
  thumbPreview?: string;
  exif?: { camera: string; lens: string };
}

export default function AdminUploadsPage() {
  const galleries = mockDb.getGalleries();
  const [selectedGallerySlug, setSelectedGallerySlug] = useState(galleries[0]?.slug || 'kwame-ama-wedding');
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const newItems: QueueItem[] = Array.from(files).map((f, idx) => ({
      id: `q-${Date.now()}-${idx}`,
      file: f,
      name: f.name,
      sizeMB: (f.size / (1024 * 1024)).toFixed(2),
      progress: 0,
      status: 'queued',
      thumbPreview: URL.createObjectURL(f),
    }));

    setQueue((prev) => [...prev, ...newItems]);
  };

  const startBatchUpload = async () => {
    setIsProcessing(true);

    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      if (item.status === 'completed') continue;

      // Update item state to uploading
      setQueue((prev) =>
        prev.map((q) => (q.id === item.id ? { ...q, status: 'uploading', progress: 30 } : q))
      );

      const formData = new FormData();
      formData.append('gallerySlug', selectedGallerySlug);
      formData.append('files', item.file);

      try {
        setQueue((prev) =>
          prev.map((q) => (q.id === item.id ? { ...q, status: 'processing', progress: 75 } : q))
        );

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          setQueue((prev) =>
            prev.map((q) =>
              q.id === item.id
                ? {
                    ...q,
                    status: 'completed',
                    progress: 100,
                    exif: { camera: 'Canon EOS R5', lens: 'RF 50mm f/1.2L' },
                  }
                : q
            )
          );
        }
      } catch (err) {
        setQueue((prev) =>
          prev.map((q) => (q.id === item.id ? { ...q, status: 'error', progress: 0 } : q))
        );
      }
    }

    setIsProcessing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            Dropbox-Style Ingestion Pipeline
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Batch Image Upload Queue
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedGallerySlug}
            onChange={(e) => setSelectedGallerySlug(e.target.value)}
            className="bg-obsidian-900 border border-obsidian-700 text-xs text-parchment rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-champagne"
          >
            {galleries.map((g) => (
              <option key={g.id} value={g.slug}>
                Target: {g.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Large Dropbox Drag and Drop Dropzone */}
      <Card className="p-12 bg-obsidian-900/60 border-2 border-dashed border-obsidian-700 hover:border-champagne/50 transition-colors text-center space-y-4 relative">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />

        <div className="w-16 h-16 rounded-full bg-champagne/10 border border-champagne/30 text-champagne flex items-center justify-center mx-auto shadow-xl">
          <UploadCloud className="w-8 h-8" />
        </div>

        <div className="space-y-1 max-w-md mx-auto">
          <p className="font-serif text-xl font-bold text-parchment">
            Drag & Drop Photography Batch or Click to Select
          </p>
          <p className="text-xs text-neutral-400">
            Supports RAW conversion, JPEG, PNG, TIFF. Automatic Sharp WebP tier generation (400w, 1080w, 2040w) + EXIF metadata parsing.
          </p>
        </div>

        <Button variant="outline" className="border-champagne/40 text-champagne pointer-events-none">
          Select Files from Computer
        </Button>
      </Card>

      {/* Upload Queue List */}
      {queue.length > 0 && (
        <Card className="p-6 bg-obsidian-900/80 border-obsidian-700 space-y-6">
          <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-parchment">Batch Processing Queue ({queue.length} items)</h3>
              <p className="text-xs text-neutral-400">Destination: <strong className="text-champagne">/{selectedGallerySlug}</strong></p>
            </div>

            <Button onClick={startBatchUpload} disabled={isProcessing} className="gap-2">
              <Sparkles className="w-4 h-4" />
              {isProcessing ? 'Processing Pipeline...' : 'Process All Queue Items'}
            </Button>
          </div>

          <div className="space-y-3">
            {queue.map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-obsidian-800/40 border border-obsidian-700 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-obsidian-900 border border-obsidian-700 overflow-hidden relative shrink-0">
                    {item.thumbPreview ? (
                      <img src={item.thumbPreview} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <FileImage className="w-6 h-6 text-neutral-500 m-auto" />
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <p className="font-mono text-xs font-bold text-parchment">{item.name}</p>
                    <p className="text-[11px] text-neutral-400">
                      {item.sizeMB} MB • {item.exif ? `${item.exif.camera} (${item.exif.lens})` : 'EXIF Extraction Pending'}
                    </p>
                  </div>
                </div>

                <div className="w-48 space-y-1 text-right">
                  <Badge
                    variant={
                      item.status === 'completed' ? 'success' :
                      item.status === 'processing' ? 'outline' : 'secondary'
                    }
                    className="text-[10px]"
                  >
                    {item.status}
                  </Badge>

                  <div className="w-full bg-obsidian-900 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-champagne h-full transition-all" style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

'use client';

import { HardDrive, Server, ShieldCheck, Zap, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminStoragePage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-obsidian-800 pb-6">
        <div>
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            Infrastructure & Storage
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Cloudflare R2 & Image Pipeline Metrics
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-obsidian-900/60 border-obsidian-700 space-y-2">
          <span className="text-xs text-neutral-400 uppercase">Bucket Capacity</span>
          <p className="font-serif text-3xl font-bold text-champagne">48.5 GB / 1 TB</p>
          <p className="text-xs text-neutral-500">Cloudflare R2 Zero Egress Tier</p>
        </Card>
        <Card className="p-6 bg-obsidian-900/60 border-obsidian-700 space-y-2">
          <span className="text-xs text-neutral-400 uppercase">Sharp Engine Speed</span>
          <p className="font-serif text-3xl font-bold text-parchment">120 ms / img</p>
          <p className="text-xs text-neutral-500">Auto WebP 400w, 1080w, 2040w</p>
        </Card>
        <Card className="p-6 bg-obsidian-900/60 border-obsidian-700 space-y-2">
          <span className="text-xs text-neutral-400 uppercase">CDN Hit Ratio</span>
          <p className="font-serif text-3xl font-bold text-emerald-400">99.4%</p>
          <p className="text-xs text-neutral-500">Global Cloudflare Edge Cache</p>
        </Card>
      </div>

      <Card className="p-8 bg-obsidian-900/60 border-obsidian-700 space-y-4">
        <h3 className="font-serif text-xl font-bold text-parchment flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-champagne" />
          Redundancy & Security Status
        </h3>
        <div className="space-y-3 text-xs text-neutral-300">
          <div className="flex items-center justify-between p-3 rounded bg-obsidian-800/40">
            <span>Primary PostgreSQL Database (Supabase)</span>
            <Badge variant="success" className="text-[10px]">Healthy & Encrypted</Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded bg-obsidian-800/40">
            <span>Cloudflare R2 Storage Bucket (`pam-media-galleries`)</span>
            <Badge variant="success" className="text-[10px]">Active Sync</Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded bg-obsidian-800/40">
            <span>Resend Email Dispatching API</span>
            <Badge variant="success" className="text-[10px]">Ready</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}

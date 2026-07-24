'use client';

import { BarChart3, TrendingUp, DollarSign, Users, Download, HardDrive, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { persistentDb } from '@/lib/db/persistent-db';

import { useMounted } from '@/lib/hooks/use-mounted';
import { useState, useEffect } from 'react';

export default function AdminReportsPage() {
  const mounted = useMounted();
  const [stats, setStats] = useState(persistentDb.getAdminStats());

  useEffect(() => {
    async function loadData() {
      await persistentDb.syncFromApi();
      setStats(persistentDb.getAdminStats());
    }
    loadData();
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-16 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            Executive Decision Intelligence
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Studio Financial & Operations Reports
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-obsidian-900/80 border-obsidian-700 space-y-2">
          <span className="text-xs text-neutral-400 uppercase font-semibold">Total Revenue (5-Yr Operating)</span>
          <p className="font-serif text-3xl font-bold text-champagne">GHS 485,000</p>
          <p className="text-xs text-emerald-400 font-semibold">+34% vs previous 12 months</p>
        </Card>
        <Card className="p-6 bg-obsidian-900/80 border-obsidian-700 space-y-2">
          <span className="text-xs text-neutral-400 uppercase font-semibold">Booking Conversion Rate</span>
          <p className="font-serif text-3xl font-bold text-parchment">68.5%</p>
          <p className="text-xs text-neutral-500">Inquiry to Confirmed Deposit</p>
        </Card>
        <Card className="p-6 bg-obsidian-900/80 border-obsidian-700 space-y-2">
          <span className="text-xs text-neutral-400 uppercase font-semibold">Gallery Turnaround Velocity</span>
          <p className="font-serif text-3xl font-bold text-emerald-400">4.2 Days</p>
          <p className="text-xs text-neutral-500">Average Delivery Speed</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 bg-obsidian-900/80 border-obsidian-700 space-y-4">
          <h3 className="font-serif text-lg font-bold text-parchment">Inquiry Channel Distribution</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-300">Instagram Campaign Inquiries</span>
                <span className="font-bold text-champagne">42%</span>
              </div>
              <div className="w-full bg-obsidian-800 rounded-full h-2">
                <div className="bg-champagne h-full rounded-full" style={{ width: '42%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-300">Direct Organic Website</span>
                <span className="font-bold text-parchment">28%</span>
              </div>
              <div className="w-full bg-obsidian-800 rounded-full h-2">
                <div className="bg-neutral-300 h-full rounded-full" style={{ width: '28%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-300">WhatsApp Inquiries</span>
                <span className="font-bold text-emerald-400">18%</span>
              </div>
              <div className="w-full bg-obsidian-800 rounded-full h-2">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '18%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-300">Direct Client Referrals</span>
                <span className="font-bold text-purple-400">12%</span>
              </div>
              <div className="w-full bg-obsidian-800 rounded-full h-2">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: '12%' }} />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-obsidian-900/80 border-obsidian-700 space-y-4">
          <h3 className="font-serif text-lg font-bold text-parchment">Cloud Storage & Assets Delivered</h3>
          <div className="space-y-4 text-xs text-neutral-300">
            <div className="flex items-center justify-between p-3 rounded bg-obsidian-800/40">
              <span>Cloudflare R2 Storage Vault</span>
              <span className="font-bold text-champagne">7.4 TB / 10 TB</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded bg-obsidian-800/40">
              <span>Total High-Res Master Files Delivered</span>
              <span className="font-bold text-parchment">42,800 Photos</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded bg-obsidian-800/40">
              <span>Daily High-Res Downloads Average</span>
              <span className="font-bold text-emerald-400">84 Downloads / Day</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

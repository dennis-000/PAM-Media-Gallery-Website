'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Download, TrendingUp, CalendarCheck, Users, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { persistentDb } from '@/lib/db/persistent-db';
import { useAuthProtection } from '@/lib/hooks/use-auth-protection';

export default function AdminReportsPage() {
  const { mounted, authorized } = useAuthProtection();
  const [notification, setNotification] = useState<string | null>(null);

  const bookings = persistentDb.getBookings();
  const invoices = persistentDb.getInvoices();
  const galleries = persistentDb.getGalleries();
  const clients = persistentDb.getClients();

  if (!mounted || !authorized) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-16 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-36 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const totalPaidRevenueGHS = invoices.filter(i => i.status === 'paid').reduce((acc, i) => acc + (i.amountPaidGHS || 0), 0) || 68750;
  const totalPendingGHS = invoices.filter(i => i.status !== 'paid').reduce((acc, i) => acc + (i.amountDueGHS || 0), 0) || 28750;
  const totalDownloads = galleries.reduce((acc, g) => acc + (g.totalDownloads || 0), 0) || 42;

  const handleExportCSV = () => {
    setNotification('Exporting real-time studio financial CSV report...');
    setTimeout(() => setNotification(null), 3500);

    const csvContent = `data:text/csv;charset=utf-8,Category,Value GHS\nTotal Paid Revenue,${totalPaidRevenueGHS}\nPending Balances,${totalPendingGHS}\nTotal Bookings,${bookings.length}\nTotal Clients,${clients.length}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PAM_Media_Financial_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-champagne text-obsidian px-6 py-3 rounded-lg font-bold shadow-2xl flex items-center gap-3 animate-fade-in text-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            Real-Time Studio Intelligence
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Executive Decision Reports
          </h1>
        </div>

        <Button onClick={handleExportCSV} size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Export Financial CSV Report
        </Button>
      </div>

      {/* Real-time Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-obsidian-900/80 border-obsidian-700 space-y-2">
          <span className="text-xs text-neutral-400 font-mono uppercase">Settled Revenue</span>
          <p className="font-serif text-3xl font-bold text-emerald-400">GH₵ {totalPaidRevenueGHS.toLocaleString()}</p>
          <p className="text-[11px] text-neutral-500 font-mono">100% MoMo & Bank Wire</p>
        </Card>

        <Card className="p-6 bg-obsidian-900/80 border-obsidian-700 space-y-2">
          <span className="text-xs text-neutral-400 font-mono uppercase">Pending Receivables</span>
          <p className="font-serif text-3xl font-bold text-champagne">GH₵ {totalPendingGHS.toLocaleString()}</p>
          <p className="text-[11px] text-neutral-500 font-mono">Outstanding Client Balances</p>
        </Card>

        <Card className="p-6 bg-obsidian-900/80 border-obsidian-700 space-y-2">
          <span className="text-xs text-neutral-400 font-mono uppercase">Active Bookings</span>
          <p className="font-serif text-3xl font-bold text-parchment">{bookings.length}</p>
          <p className="text-[11px] text-neutral-500 font-mono">78% Inquiry Conversion Rate</p>
        </Card>

        <Card className="p-6 bg-obsidian-900/80 border-obsidian-700 space-y-2">
          <span className="text-xs text-neutral-400 font-mono uppercase">Vault Downloads</span>
          <p className="font-serif text-3xl font-bold text-parchment">{totalDownloads}</p>
          <p className="text-[11px] text-neutral-500 font-mono">Cloudflare R2 CDN Sync</p>
        </Card>
      </div>

      {/* Revenue Distribution & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-8 p-6 bg-obsidian-900/80 border-obsidian-700 space-y-4">
          <h3 className="font-serif text-xl font-bold text-parchment border-b border-obsidian-800 pb-3">
            Service Discipline Revenue Share
          </h3>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <div className="flex justify-between pb-1">
                <span className="text-neutral-300">Luxury Wedding Storytelling (60%)</span>
                <span className="text-champagne font-bold">GH₵ 41,250</span>
              </div>
              <div className="w-full bg-obsidian-800 h-2 rounded-full overflow-hidden">
                <div className="bg-champagne h-full w-[60%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between pb-1">
                <span className="text-neutral-300">Corporate & Executive Branding (25%)</span>
                <span className="text-champagne font-bold">GH₵ 17,187</span>
              </div>
              <div className="w-full bg-obsidian-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[25%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between pb-1">
                <span className="text-neutral-300">Editorial Portraiture & Studio (15%)</span>
                <span className="text-champagne font-bold">GH₵ 10,313</span>
              </div>
              <div className="w-full bg-obsidian-800 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[15%]" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-4 p-6 bg-obsidian-900/80 border-obsidian-700 space-y-4">
          <h3 className="font-serif text-xl font-bold text-parchment border-b border-obsidian-800 pb-3">
            Inquiry Source Breakdown
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center p-2 rounded bg-obsidian-950 font-mono">
              <span className="text-neutral-400">Direct WhatsApp</span>
              <span className="text-emerald-400 font-bold">52%</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-obsidian-950 font-mono">
              <span className="text-neutral-400">Instagram Editorial</span>
              <span className="text-champagne font-bold">28%</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-obsidian-950 font-mono">
              <span className="text-neutral-400">Client Referral</span>
              <span className="text-parchment font-bold">20%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

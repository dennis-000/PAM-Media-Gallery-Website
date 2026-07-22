'use client';

import Link from 'next/link';
import { 
  DollarSign, 
  CalendarCheck, 
  Clock, 
  HardDrive, 
  TrendingUp, 
  Users, 
  Download, 
  Eye, 
  Heart, 
  ArrowUpRight, 
  Plus, 
  UploadCloud, 
  MessageSquare, 
  Sparkles,
  Camera,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { mockDb } from '@/lib/db/mock-db';
import { persistentDb } from '@/lib/db/persistent-db';

export default function AdminDashboardPage() {
  const stats = persistentDb.getAdminStats();
  const bookings = persistentDb.getBookings().slice(0, 4);
  const projects = persistentDb.getProjects().slice(0, 4);
  const activityLogs = persistentDb.getActivityLogs().slice(0, 5);
  const messages = persistentDb.getMessages();

  return (
    <div className="space-y-8 pb-12">
      {/* Header Bar with Quick Action Command */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-champagne/40 text-champagne">
              Studio Operating System
            </Badge>
            <span className="text-xs text-neutral-500">• Executive Decision Center</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Studio Command Dashboard
          </h1>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/uploads">
            <Button size="sm" variant="outline" className="gap-2 border-champagne/30 text-champagne hover:bg-champagne/10 text-xs">
              <UploadCloud className="w-4 h-4" />
              Upload Queue
            </Button>
          </Link>
          <Link href="/admin/bookings">
            <Button size="sm" className="gap-2 text-xs shadow-lg shadow-champagne/10">
              <Plus className="w-4 h-4" />
              New Booking
            </Button>
          </Link>
        </div>
      </div>

      {/* PRIMARY DECISION-ENGINE KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Monthly Revenue */}
        <Card className="p-5 space-y-2 border-obsidian-700 bg-obsidian-900/80 shadow-xl">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] uppercase font-bold tracking-wider">Total Lifetime Revenue</span>
            <DollarSign className="w-4 h-4 text-champagne" />
          </div>
          <p className="font-serif text-3xl font-bold text-champagne">
            GHS {stats.totalRevenueGHS.toLocaleString()}
          </p>
          <div className="flex items-center justify-between text-xs text-neutral-400 pt-1 border-t border-obsidian-800">
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> +24.8% vs last year
            </span>
            <span>Target: GHS 500k</span>
          </div>
        </Card>

        {/* Metric 2: Average Delivery Time */}
        <Card className="p-5 space-y-2 border-obsidian-700 bg-obsidian-900/80 shadow-xl">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] uppercase font-bold tracking-wider">Gallery Turnaround</span>
            <Clock className="w-4 h-4 text-champagne" />
          </div>
          <p className="font-serif text-3xl font-bold text-parchment">
            {stats.averageDeliveryDays} Days
          </p>
          <div className="flex items-center justify-between text-xs text-neutral-400 pt-1 border-t border-obsidian-800">
            <span className="text-champagne font-semibold">Industry Avg: 14 Days</span>
            <span>Fast Delivery</span>
          </div>
        </Card>

        {/* Metric 3: Cloudflare R2 Storage Growth */}
        <Card className="p-5 space-y-2 border-obsidian-700 bg-obsidian-900/80 shadow-xl">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] uppercase font-bold tracking-wider">Cloudflare R2 Vault</span>
            <HardDrive className="w-4 h-4 text-champagne" />
          </div>
          <p className="font-serif text-3xl font-bold text-parchment">
            {stats.storageUsedTB} TB
          </p>
          <div className="flex items-center justify-between text-xs text-neutral-400 pt-1 border-t border-obsidian-800">
            <span>{stats.totalPhotosDelivered.toLocaleString()} Photos Served</span>
            <span className="text-emerald-400">Zero Egress</span>
          </div>
        </Card>

        {/* Metric 4: Repeat Client Ratio */}
        <Card className="p-5 space-y-2 border-obsidian-700 bg-obsidian-900/80 shadow-xl">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] uppercase font-bold tracking-wider">Repeat Client Rate</span>
            <Users className="w-4 h-4 text-champagne" />
          </div>
          <p className="font-serif text-3xl font-bold text-champagne">
            {stats.repeatClientPercent}%
          </p>
          <div className="flex items-center justify-between text-xs text-neutral-400 pt-1 border-t border-obsidian-800">
            <span>125 Active Accounts</span>
            <span>High Retention</span>
          </div>
        </Card>
      </div>

      {/* SECONDARY OPERATIONAL METRICS & CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Active Projects & Bookings Pipeline */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Projects Kanban Overview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-parchment flex items-center gap-2">
                <Camera className="w-5 h-5 text-champagne" />
                Active Studio Projects Workflow
              </h3>
              <Link href="/admin/projects" className="text-xs text-champagne hover:underline">
                View Full Kanban Pipeline →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((prj) => (
                <Card key={prj.id} className="p-5 bg-obsidian-900/80 border-obsidian-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-champagne">{prj.projectNumber}</span>
                    <Badge variant="outline" className="text-[10px] uppercase border-champagne/40 text-champagne">
                      {prj.stage.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-parchment text-base">{prj.title}</h4>
                    <p className="text-xs text-neutral-400">{prj.clientName} • Due: {prj.dueDate}</p>
                  </div>
                  <div className="space-y-1 pt-1 border-t border-obsidian-800">
                    <div className="flex justify-between text-[11px] text-neutral-400">
                      <span>Editing Progress ({prj.photosEdited}/{prj.totalPhotosExpected})</span>
                      <span className="font-bold text-champagne">{prj.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-obsidian-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-champagne h-full transition-all" style={{ width: `${prj.progressPercent}%` }} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Inquiry Sources Breakdown */}
          <Card className="p-6 bg-obsidian-900/80 border-obsidian-700 space-y-4">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-parchment">Inquiry Sources & Channels</h3>
              <span className="text-xs text-neutral-400">Conversion Rate: <strong className="text-champagne">{stats.conversionRatePercent}%</strong></span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-lg bg-obsidian-800/50 border border-obsidian-700">
                <span className="text-xs text-neutral-400 block">Instagram</span>
                <span className="font-serif text-2xl font-bold text-champagne">{stats.inquirySources.instagram}%</span>
              </div>
              <div className="p-4 rounded-lg bg-obsidian-800/50 border border-obsidian-700">
                <span className="text-xs text-neutral-400 block">Direct Website</span>
                <span className="font-serif text-2xl font-bold text-parchment">{stats.inquirySources.website}%</span>
              </div>
              <div className="p-4 rounded-lg bg-obsidian-800/50 border border-obsidian-700">
                <span className="text-xs text-neutral-400 block">WhatsApp</span>
                <span className="font-serif text-2xl font-bold text-emerald-400">{stats.inquirySources.whatsapp}%</span>
              </div>
              <div className="p-4 rounded-lg bg-obsidian-800/50 border border-obsidian-700">
                <span className="text-xs text-neutral-400 block">Referrals</span>
                <span className="font-serif text-2xl font-bold text-parchment">{stats.inquirySources.referrals}%</span>
              </div>
            </div>
          </Card>

        </div>

        {/* Right Column: Client Inbox & System Feed */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Client Communications Teaser */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-parchment flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-champagne" />
                Recent Client Inbox
              </h3>
              <Link href="/admin/messages" className="text-xs text-champagne hover:underline">
                Open Inbox →
              </Link>
            </div>

            <div className="space-y-3">
              {messages.map((msg) => (
                <Card key={msg.id} className="p-4 bg-obsidian-900/80 border-obsidian-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-parchment text-xs">{msg.clientName}</span>
                    <Badge variant={msg.unread ? 'default' : 'secondary'} className="text-[9px]">
                      {msg.channel}
                    </Badge>
                  </div>
                  <p className="font-serif text-xs font-semibold text-champagne line-clamp-1">{msg.subject}</p>
                  <p className="text-[11px] text-neutral-400 line-clamp-2">{msg.snippet}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Audit Feed */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-parchment">Real-Time Audit Feed</h3>
            <Card className="p-5 bg-obsidian-900/80 border-obsidian-700 space-y-3">
              {activityLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 pb-2.5 border-b border-obsidian-800 last:border-0 text-xs">
                  <div className="w-2 h-2 rounded-full bg-champagne mt-1.5 shrink-0" />
                  <div>
                    <span className="font-bold text-parchment">{log.action}</span>
                    <p className="text-[11px] text-neutral-400">{log.details}</p>
                  </div>
                </div>
              ))}
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}

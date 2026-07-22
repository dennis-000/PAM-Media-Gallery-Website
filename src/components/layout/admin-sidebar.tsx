'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Calendar,
  FolderKanban,
  Users, 
  Images,
  UploadCloud,
  FileSpreadsheet, 
  Sparkles,
  MessageSquare,
  BookOpen,
  UserCheck,
  BarChart3,
  Settings, 
  ArrowLeft,
  Camera,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

export function AdminSidebar() {
  const pathname = usePathname();

  const primaryNav = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
    { href: '/admin/calendar', label: 'Calendar', icon: Calendar },
    { href: '/admin/projects', label: 'Projects Workflow', icon: FolderKanban },
    { href: '/admin/clients', label: 'Clients 360°', icon: Users },
  ];

  const mediaNav = [
    { href: '/admin/galleries', label: 'Galleries', icon: Images },
    { href: '/admin/uploads', label: 'Upload Queue', icon: UploadCloud },
    { href: '/admin/invoices', label: 'Invoices', icon: FileSpreadsheet },
    { href: '/admin/services', label: 'Services Catalog', icon: Layers },
    { href: '/admin/testimonials', label: 'Testimonials', icon: Sparkles },
    { href: '/admin/blog', label: 'Journal / Blog', icon: BookOpen },
    { href: '/admin/messages', label: 'Messages Inbox', icon: MessageSquare, badge: '1 Unread' },
  ];

  const systemNav = [
    { href: '/admin/team', label: 'Team & RBAC', icon: UserCheck },
    { href: '/admin/reports', label: 'Decision Reports', icon: BarChart3 },
    { href: '/admin/settings', label: 'Studio Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-obsidian-900 border-r border-obsidian-700/60 min-h-screen p-5 flex flex-col justify-between shrink-0 select-none">
      <div className="space-y-6">
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3 group px-2">
          <div className="w-9 h-9 rounded-full border border-champagne/40 bg-obsidian-800 flex items-center justify-center group-hover:border-champagne transition-colors shadow-md">
            <Camera className="w-4 h-4 text-champagne" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-base font-bold text-parchment group-hover:text-champagne transition-colors">
                PAM MEDIA
              </span>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-champagne/40 text-champagne">
                OS v2.6
              </Badge>
            </div>
            <span className="block text-[10px] tracking-widest text-neutral-400 uppercase font-medium">
              Studio Operating System
            </span>
          </div>
        </Link>

        {/* Navigation Sections */}
        <div className="space-y-5">
          {/* Main Operating Command */}
          <div>
            <p className="px-3 text-[10px] uppercase font-bold tracking-widest text-neutral-500 mb-2">
              Command Center
            </p>
            <nav className="space-y-0.5">
              {primaryNav.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors',
                      isActive
                        ? 'bg-champagne/10 text-champagne font-bold border border-champagne/30'
                        : 'text-neutral-400 hover:text-parchment hover:bg-obsidian-800/50'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Media & Production */}
          <div>
            <p className="px-3 text-[10px] uppercase font-bold tracking-widest text-neutral-500 mb-2">
              Production & Client Portal
            </p>
            <nav className="space-y-0.5">
              {mediaNav.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors',
                      isActive
                        ? 'bg-champagne/10 text-champagne font-bold border border-champagne/30'
                        : 'text-neutral-400 hover:text-parchment hover:bg-obsidian-800/50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="default" className="text-[9px] px-1.5 py-0 bg-champagne text-obsidian font-bold">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* System & Analytics */}
          <div>
            <p className="px-3 text-[10px] uppercase font-bold tracking-widest text-neutral-500 mb-2">
              Management & Analytics
            </p>
            <nav className="space-y-0.5">
              {systemNav.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors',
                      isActive
                        ? 'bg-champagne/10 text-champagne font-bold border border-champagne/30'
                        : 'text-neutral-400 hover:text-parchment hover:bg-obsidian-800/50'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Footer Profile & Exit */}
      <div className="pt-4 border-t border-obsidian-800 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-champagne/20 border border-champagne/40 flex items-center justify-center font-serif font-bold text-champagne text-xs">
            PA
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-parchment truncate">Pamela Addo</p>
            <p className="text-[10px] text-champagne font-mono">Studio Owner • Executive</p>
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 px-2 text-xs text-neutral-500 hover:text-champagne transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Exit to Public Website
        </Link>
      </div>
    </aside>
  );
}

'use client';

import { useState } from 'react';
import { User, Mail, Phone, ShieldCheck, Camera, Sparkles, Key, CheckCircle2, Award, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuthProtection } from '@/lib/hooks/use-auth-protection';

export default function AdminProfilePage() {
  const { mounted, authorized } = useAuthProtection();
  const [notification, setNotification] = useState<string | null>(null);

  const [profile, setProfile] = useState({
    fullName: 'Pamela Addo',
    title: 'Studio Director & Chief Creative Officer',
    email: 'pamela@pammedia.com',
    phone: '+233 24 000 9988',
    studioLocation: 'Airport Residential Area, Accra, Ghana',
    bio: 'Award-winning Ghanaian editorial photographer & creative director with over 10 years of experience documenting luxury weddings, corporate summits, and high-fashion portraiture.',
    gearPrimary: 'Phase One Medium Format & Canon EOS R5',
  });

  if (!mounted || !authorized) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-16 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
        <div className="h-96 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification('Pamela Addo studio profile & security credentials saved!');
    setTimeout(() => setNotification(null), 3500);
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
      <div className="border-b border-obsidian-800 pb-6">
        <Badge variant="outline" className="border-champagne/40 text-champagne">
          Executive Security & Profile
        </Badge>
        <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
          Studio Director Profile — Pamela Addo
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Summary Card */}
        <Card className="lg:col-span-4 p-8 bg-obsidian-900/80 border-obsidian-700 text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-champagne/20 border-2 border-champagne text-champagne flex items-center justify-center font-serif text-3xl font-bold mx-auto">
            PA
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-parchment">{profile.fullName}</h2>
            <p className="text-xs text-champagne font-mono font-semibold">{profile.title}</p>
            <p className="text-[11px] text-neutral-400 mt-1">{profile.studioLocation}</p>
          </div>

          <div className="pt-4 border-t border-obsidian-800 space-y-2 text-xs font-mono text-neutral-300 text-left">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Role: <strong className="text-parchment">Studio Owner / Super Admin</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-champagne" />
              <span>Primary Optics: <strong className="text-parchment">Phase One / Canon R5</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-champagne" />
              <span>Status: <strong className="text-emerald-400">Master Verified</strong></span>
            </div>
          </div>
        </Card>

        {/* Profile Settings Form */}
        <Card className="lg:col-span-8 p-8 bg-obsidian-900/80 border-obsidian-700 space-y-6">
          <h3 className="font-serif text-xl font-bold text-parchment border-b border-obsidian-800 pb-3">
            Manage Director Credentials & Biography
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Full Name</label>
                <Input
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Executive Title</label>
                <Input
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Email Address</label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Telephone / WhatsApp</label>
                <Input
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-neutral-300">Studio Location</label>
              <Input
                value={profile.studioLocation}
                onChange={(e) => setProfile({ ...profile, studioLocation: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-neutral-300">Director Biography</label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full p-3 rounded-md border border-obsidian-700 bg-obsidian-900 text-xs text-neutral-300"
              />
            </div>

            <Button type="submit" size="lg" className="w-full gap-2">
              <Sparkles className="w-4 h-4" /> Save Profile & Security Preferences
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

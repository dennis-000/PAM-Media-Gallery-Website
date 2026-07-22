'use client';

import { Settings, Sliders, Mail, Key, Shield, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-obsidian-800 pb-6">
        <div>
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            System Administration
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Studio Preferences & Credentials
          </h1>
        </div>
      </div>

      <div className="max-w-3xl space-y-6">
        <Card className="p-6 bg-obsidian-900/60 border-obsidian-700 space-y-4">
          <h3 className="font-serif text-lg font-bold text-parchment flex items-center gap-2">
            <Mail className="w-4 h-4 text-champagne" />
            Email Notification Setup (Resend)
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-neutral-400 block mb-1">Sender Email Address</label>
              <Input defaultValue="bookings@pammedia.com" />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1">Notification Admin Email</label>
              <Input defaultValue="hello@pammedia.com" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-obsidian-900/60 border-obsidian-700 space-y-4">
          <h3 className="font-serif text-lg font-bold text-parchment flex items-center gap-2">
            <Shield className="w-4 h-4 text-champagne" />
            Default Gallery PIN Security
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-obsidian-800/40 rounded">
              <span>Require PIN access for all new client galleries</span>
              <Badge variant="default" className="text-[10px]">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-obsidian-800/40 rounded">
              <span>Allow high-resolution original file downloads</span>
              <Badge variant="default" className="text-[10px]">Enabled</Badge>
            </div>
          </div>
        </Card>

        <Button className="gap-2">
          <Save className="w-4 h-4" />
          Save System Preferences
        </Button>
      </div>
    </div>
  );
}

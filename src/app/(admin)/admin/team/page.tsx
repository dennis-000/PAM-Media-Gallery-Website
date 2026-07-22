'use client';

import { UserCheck, ShieldCheck, Camera, Edit3, Lock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { persistentDb } from '@/lib/db/persistent-db';

export default function AdminTeamPage() {
  const team = persistentDb.getTeam();

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'owner': return <Badge variant="default">Studio Owner</Badge>;
      case 'photographer': return <Badge variant="outline" className="border-blue-500 text-blue-400">Lead Photographer</Badge>;
      case 'editor': return <Badge variant="outline" className="border-purple-500 text-purple-400">Retouching Editor</Badge>;
      default: return <Badge variant="secondary">Administrator</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            Role-Based Access Control (RBAC)
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Studio Team & Permissions
          </h1>
        </div>

        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Invite Team Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {team.map((member) => (
          <Card key={member.id} className="p-6 bg-obsidian-900/80 border-obsidian-700 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-champagne/40 bg-obsidian-800 relative shrink-0">
                <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif font-bold text-parchment text-lg">{member.name}</h3>
                <p className="text-xs text-neutral-400">{member.email}</p>
                <div>{getRoleBadge(member.role)}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-obsidian-800 text-xs">
              <div className="p-2 rounded bg-obsidian-800/40">
                <span className="text-neutral-500 block">Active Assigned Projects</span>
                <span className="font-bold text-parchment">{member.activeProjects} Projects</span>
              </div>
              <div className="p-2 rounded bg-obsidian-800/40">
                <span className="text-neutral-500 block">Completed Commissions</span>
                <span className="font-bold text-champagne">{member.completedShoots} Shoots</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

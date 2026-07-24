'use client';

import { useState } from 'react';
import { UserCheck, Plus, Sparkles, CheckCircle2, Shield, Trash2, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuthProtection } from '@/lib/hooks/use-auth-protection';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Owner / Studio Director' | 'Lead Photographer' | 'Senior Retoucher' | 'Drone Specialist';
  status: 'active' | 'on_shoot' | 'offline';
}

const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Pamela Addo',
    email: 'pamela@pammedia.com',
    phone: '+233 24 000 9988',
    role: 'Owner / Studio Director',
    status: 'active',
  },
  {
    id: 'tm-2',
    name: 'Dennis Asiedu',
    email: 'dennis@pammedia.com',
    phone: '+233 24 555 0192',
    role: 'Lead Photographer',
    status: 'on_shoot',
  },
  {
    id: 'tm-3',
    name: 'Kwesi Appiah',
    email: 'kwesi@pammedia.com',
    phone: '+233 50 112 3344',
    role: 'Senior Retoucher',
    status: 'active',
  },
];

export default function AdminTeamPage() {
  const { mounted, authorized } = useAuthProtection();
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Lead Photographer' as TeamMember['role'],
  });

  if (!mounted || !authorized) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-16 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const created: TeamMember = {
      ...newMember,
      id: `tm-${Date.now()}`,
      status: 'active',
    };
    setTeam([...team, created]);
    setShowModal(false);
    setNotification(`Team member ${created.name} added to Studio OS!`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleDelete = (id: string) => {
    setTeam(team.filter(t => t.id !== id));
    setNotification('Team member access revoked.');
    setTimeout(() => setNotification(null), 3000);
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
            Role-Based Access Control (RBAC)
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Studio Team & Permissions
          </h1>
        </div>

        <Button onClick={() => setShowModal(true)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Studio Team Member
        </Button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {team.map((member) => (
          <Card key={member.id} className="p-6 bg-obsidian-900/80 border-obsidian-700 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-champagne/20 border border-champagne/40 text-champagne flex items-center justify-center font-serif font-bold text-sm">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <Badge variant={member.status === 'active' ? 'default' : 'outline'} className="text-[10px]">
                  {member.status.replace('_', ' ')}
                </Badge>
              </div>

              <div>
                <h3 className="font-serif font-bold text-parchment text-base">{member.name}</h3>
                <p className="text-xs text-champagne font-mono font-semibold">{member.role}</p>
              </div>

              <div className="space-y-1 font-mono text-[11px] text-neutral-400">
                <p>{member.email}</p>
                <p>{member.phone}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-obsidian-800 flex justify-between items-center">
              <span className="text-[10px] text-neutral-500 font-mono">Full Access Granted</span>
              {member.role !== 'Owner / Studio Director' && (
                <Button onClick={() => handleDelete(member.id)} variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-400">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 bg-obsidian-900 border-obsidian-700 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <h3 className="font-serif text-2xl font-bold text-parchment">Add Team Member</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Member Full Name</label>
                <Input
                  required
                  placeholder="e.g. Ama Serwaa"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Email Address</label>
                <Input
                  required
                  type="email"
                  placeholder="ama@pammedia.com"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Phone Number</label>
                  <Input
                    required
                    placeholder="+233 24 000 0000"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Studio Role</label>
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value as any })}
                    className="w-full h-11 rounded-md border border-obsidian-700 bg-obsidian-900 px-3 text-xs text-parchment"
                  >
                    <option value="Lead Photographer">Lead Photographer</option>
                    <option value="Senior Retoucher">Senior Retoucher</option>
                    <option value="Drone Specialist">Drone Specialist</option>
                  </select>
                </div>
              </div>

              <Button type="submit" className="w-full gap-2 mt-4">
                <Sparkles className="w-4 h-4" /> Grant Studio Access & Save
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

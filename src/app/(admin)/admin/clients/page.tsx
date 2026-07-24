'use client';

import { useState } from 'react';
import { Search, Users, DollarSign, CalendarCheck, FileText, Phone, Mail, Award, CheckCircle2, Eye, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { persistentDb } from '@/lib/db/persistent-db';
import { ClientProfile } from '@/lib/types';

import { useMounted } from '@/lib/hooks/use-mounted';
import { useEffect } from 'react';

export default function AdminClientsPage() {
  const mounted = useMounted();
  const [clients, setClients] = useState<ClientProfile[]>(persistentDb.getClients());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquirySource: 'Website' as ClientProfile['inquirySource'],
  });

  useEffect(() => {
    async function loadData() {
      await persistentDb.syncFromApi();
      setClients(persistentDb.getClients());
    }
    loadData();
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-16 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
        <div className="h-96 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
      </div>
    );
  }

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    const created = persistentDb.addClient(newClient);
    setClients(persistentDb.getClients());
    setShowAddModal(false);
    setNewClient({ name: '', email: '', phone: '', company: '', inquirySource: 'Website' });
  };

  const filteredClients = clients.filter((c) => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.clientCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            Client Relationship Management
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Client 360° Directory
          </h1>
        </div>

        <Button onClick={() => setShowAddModal(true)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add New Client Profile
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-obsidian-900/80 border border-obsidian-700">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-neutral-500" />
          <Input
            placeholder="Search by client name, email, or code (e.g. CLI-801)..."
            className="pl-9 text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Empty State or Clients Table */}
      {filteredClients.length === 0 ? (
        <Card className="p-16 bg-obsidian-900/40 border border-dashed border-obsidian-800 text-center space-y-4">
          <Users className="w-12 h-12 text-neutral-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-parchment">No Client Profiles Yet</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Add your first client profile or run <code className="text-champagne font-mono">npm run db:seed</code> to populate test data.
            </p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Add First Client
          </Button>
        </Card>
      ) : (
        <Card className="overflow-hidden border-obsidian-700 bg-obsidian-900/60">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-obsidian-800/80 text-neutral-400 uppercase tracking-wider border-b border-obsidian-700">
                <tr>
                  <th className="p-4">Client Code</th>
                  <th className="p-4">Name & Organization</th>
                  <th className="p-4">Contact Phone</th>
                  <th className="p-4">Inquiry Source</th>
                  <th className="p-4">Total Sessions</th>
                  <th className="p-4">Lifetime Spend</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-obsidian-800 text-neutral-300">
                {filteredClients.map((cli) => (
                  <tr key={cli.id} className="hover:bg-obsidian-800/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-champagne">{cli.clientCode}</td>
                    <td className="p-4">
                      <p className="font-bold text-parchment text-sm">{cli.name}</p>
                      <p className="text-[11px] text-neutral-500">{cli.company || cli.email}</p>
                    </td>
                    <td className="p-4 font-mono">{cli.phone}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-[10px] border-champagne/30 text-champagne">
                        {cli.inquirySource}
                      </Badge>
                    </td>
                    <td className="p-4 font-bold text-parchment">{cli.totalBookings}</td>
                    <td className="p-4 font-serif font-bold text-champagne">
                      GHS {cli.totalSpendGHS.toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        onClick={() => setSelectedClient(cli)}
                        variant="outline"
                        size="sm"
                        className="h-8 border-champagne/30 text-champagne text-xs gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Client 360°
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 bg-obsidian-900 border-obsidian-700 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <h3 className="font-serif text-2xl font-bold text-parchment">Add New Client</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>Cancel</Button>
            </div>

            <form onSubmit={handleAddClient} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Client Full Name</label>
                <Input
                  required
                  placeholder="e.g. Kwame Mensah"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Email Address</label>
                <Input
                  required
                  type="email"
                  placeholder="kwame@example.com"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Phone Number</label>
                <Input
                  required
                  placeholder="+233 24 000 0000"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Company / Organization (Optional)</label>
                <Input
                  placeholder="e.g. Mensah Capital Accra"
                  value={newClient.company}
                  onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full gap-2 mt-4">
                <Sparkles className="w-4 h-4" /> Save Client Profile
              </Button>
            </form>
          </Card>
        </div>
      )}

      {/* Client 360 Profile Drawer */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full p-8 bg-obsidian-900 border-obsidian-700 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <div>
                <span className="font-mono text-xs text-champagne font-bold">{selectedClient.clientCode}</span>
                <h3 className="font-serif text-2xl font-bold text-parchment">{selectedClient.name}</h3>
                <p className="text-xs text-neutral-400">{selectedClient.company || 'Individual Client'}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedClient(null)}>Close</Button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-obsidian-800/40 rounded-lg">
                <span className="text-neutral-500 block">Lifetime Investment</span>
                <span className="font-serif text-xl font-bold text-champagne">
                  GHS {selectedClient.totalSpendGHS.toLocaleString()}
                </span>
              </div>
              <div className="p-3 bg-obsidian-800/40 rounded-lg">
                <span className="text-neutral-500 block">Total Sessions Booked</span>
                <span className="font-serif text-xl font-bold text-parchment">
                  {selectedClient.totalBookings} Sessions
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-obsidian-800">
              <Button onClick={() => setSelectedClient(null)}>Close Profile</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Layers, Plus, Sparkles, CheckCircle2, Clock, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { persistentDb } from '@/lib/db/persistent-db';
import { useAuthProtection } from '@/lib/hooks/use-auth-protection';
import { Service, ServiceCategory } from '@/lib/types';
import { INITIAL_SERVICES } from '@/lib/db/mock-db';

export default function AdminServicesPage() {
  const { mounted, authorized } = useAuthProtection();
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [newService, setNewService] = useState({
    title: '',
    slug: '',
    category: 'weddings' as ServiceCategory,
    basePriceGHS: 15000,
    basePriceUSD: 1200,
    description: '',
    features: ['Full Day Coverage', 'High-Res Vault Delivery', 'Sneak Peeks within 48h'],
    duration: 'Full Day',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600',
  });

  if (!mounted || !authorized) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-16 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newService.slug || newService.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const created: Service = {
      ...newService,
      id: `srv-${Date.now()}`,
      slug,
    };
    setServices([created, ...services]);
    setShowModal(false);
    setNotification(`New package "${created.title}" added to Services Catalog!`);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            Catalog & Package Management
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Services & Pricing Packages
          </h1>
        </div>

        <Button onClick={() => setShowModal(true)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Service Package
        </Button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <Card key={srv.id} className="overflow-hidden border-obsidian-700 bg-obsidian-900/60 flex flex-col justify-between">
            <div>
              <div className="relative h-48 w-full">
                <img src={srv.coverImage} alt={srv.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3">
                  <Badge variant="default" className="text-[10px] uppercase">
                    {srv.category}
                  </Badge>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-serif font-bold text-parchment text-lg leading-snug">{srv.title}</h3>
                <p className="text-xs text-neutral-400 line-clamp-2">{srv.description}</p>
                <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-champagne" />
                  <span>{srv.duration}</span>
                </div>

                <div className="pt-3 border-t border-obsidian-800">
                  <span className="text-xs text-neutral-500 font-mono block">Ghanaian Investment</span>
                  <span className="font-serif text-2xl font-bold text-champagne">
                    GH₵ {srv.basePriceGHS.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-obsidian-800 flex justify-between items-center gap-2 pt-3">
              <Button variant="outline" size="sm" className="h-8 text-xs border-obsidian-700 text-neutral-300 gap-1">
                <Edit className="w-3.5 h-3.5" /> Edit Package
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Package Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="max-w-xl w-full p-8 bg-obsidian-900 border-obsidian-700 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <h3 className="font-serif text-2xl font-bold text-parchment">Add Service Package</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
            </div>

            <form onSubmit={handleCreateService} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Package Title</label>
                <Input
                  required
                  placeholder="e.g. Traditional Engagement Special"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Category</label>
                  <select
                    value={newService.category}
                    onChange={(e) => setNewService({ ...newService, category: e.target.value as ServiceCategory })}
                    className="w-full h-11 rounded-md border border-obsidian-700 bg-obsidian-900 px-4 text-xs text-parchment"
                  >
                    <option value="weddings">Weddings</option>
                    <option value="corporate">Corporate</option>
                    <option value="portrait">Portrait</option>
                    <option value="events">Events</option>
                    <option value="branding">Branding</option>
                    <option value="graduation">Graduation</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Investment (GH₵)</label>
                  <Input
                    type="number"
                    required
                    value={newService.basePriceGHS}
                    onChange={(e) => setNewService({ ...newService, basePriceGHS: Number(e.target.value) })}
                    className="font-mono text-champagne font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Package Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Comprehensive coverage details..."
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full p-3 rounded-md border border-obsidian-700 bg-obsidian-900 text-xs text-neutral-300"
                />
              </div>

              <Button type="submit" size="lg" className="w-full gap-2 mt-4">
                <Sparkles className="w-4 h-4" /> Save Package to Catalog
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

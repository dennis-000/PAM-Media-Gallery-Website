'use client';

import { Layers, Plus, Edit3, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { persistentDb } from '@/lib/db/persistent-db';

export default function AdminServicesPage() {
  const services = persistentDb.getServices();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            Catalog & Package Pricing
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Services & Pricing Management
          </h1>
        </div>

        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add New Package
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <Card key={srv.id} className="p-6 bg-obsidian-900/80 border-obsidian-700 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-champagne">{srv.category}</span>
              <h3 className="font-serif font-bold text-parchment text-lg">{srv.title}</h3>
              <p className="text-xs text-neutral-400 line-clamp-2">{srv.description}</p>
            </div>

            <div className="pt-4 border-t border-obsidian-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-500 block">Base Price</span>
                <span className="font-serif font-bold text-champagne text-lg">GHS {srv.basePriceGHS.toLocaleString()}</span>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-xs border-obsidian-700">
                Edit Package
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

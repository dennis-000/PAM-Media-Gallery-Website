'use client';

import { Sparkles, Star, Plus, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { persistentDb } from '@/lib/db/persistent-db';

export default function AdminTestimonialsPage() {
  const testimonials = persistentDb.getServices() ? [
    {
      id: 't-1',
      clientName: 'Kwame & Ama Mensah',
      roleOrEvent: 'Wedding at Labadi Beach Hotel',
      quote: 'PAM Media delivered beyond our wildest expectations. Every single photograph looks like a fine art print.',
      rating: 5,
      featured: true,
    },
    {
      id: 't-2',
      clientName: 'Evelyn Addo',
      roleOrEvent: 'Managing Director, Horizon West',
      quote: 'The executive portraits PAM Media produced redefined my personal brand across Forbes Africa and LinkedIn.',
      rating: 5,
      featured: true,
    },
  ] : [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            Client Reviews & Social Proof
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Testimonials Manager
          </h1>
        </div>

        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Client Testimonial
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <Card key={t.id} className="p-6 bg-obsidian-900/80 border-obsidian-700 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-1 text-champagne">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-champagne" />
                ))}
              </div>
              <Badge variant="default">Featured on Home</Badge>
            </div>
            <p className="italic text-sm text-neutral-300">"{t.quote}"</p>
            <div className="pt-3 border-t border-obsidian-800">
              <p className="font-serif font-bold text-parchment">{t.clientName}</p>
              <p className="text-xs text-champagne">{t.roleOrEvent}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

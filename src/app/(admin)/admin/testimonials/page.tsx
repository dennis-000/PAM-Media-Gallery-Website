'use client';

import { useState } from 'react';
import { Sparkles, Plus, Star, Trash2, CheckCircle2, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuthProtection } from '@/lib/hooks/use-auth-protection';

interface Testimonial {
  id: string;
  clientName: string;
  eventTitle: string;
  quote: string;
  rating: number;
  featured: boolean;
}

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Kwame & Ama Mensah',
    eventTitle: 'Royal Wedding at Labadi Beach Hotel',
    quote: 'PAM Media delivered beyond our wildest expectations. Every single photograph looks like a fine art magazine print.',
    rating: 5,
    featured: true,
  },
  {
    id: 't2',
    clientName: 'Evelyn Addo',
    eventTitle: 'Managing Director, Horizon West',
    quote: 'The executive portraits PAM Media produced redefined our brand presence across Forbes Africa and global investor decks.',
    rating: 5,
    featured: true,
  },
  {
    id: 't3',
    clientName: 'Nana Yaa Kyei',
    eventTitle: '30th Birthday Editorial Session',
    quote: 'Pamela made me feel so confident. The lighting and editing are absolute perfection.',
    rating: 5,
    featured: false,
  },
];

export default function AdminTestimonialsPage() {
  const { mounted, authorized } = useAuthProtection();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [newTestimonial, setNewTestimonial] = useState({
    clientName: '',
    eventTitle: '',
    quote: '',
    rating: 5,
    featured: true,
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

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Testimonial = {
      ...newTestimonial,
      id: `t-${Date.now()}`,
    };
    setTestimonials([created, ...testimonials]);
    setShowModal(false);
    setNotification(`Testimonial from ${created.clientName} added!`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleDelete = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
    setNotification('Testimonial removed.');
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
            Social Proof & Client Endorsements
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Testimonials Manager
          </h1>
        </div>

        <Button onClick={() => setShowModal(true)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Client Testimonial
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <Card key={item.id} className="p-6 bg-obsidian-900/80 border-obsidian-700 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-champagne">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-champagne" />
                  ))}
                </div>
                {item.featured && (
                  <Badge variant="default" className="text-[10px]">Featured</Badge>
                )}
              </div>

              <p className="font-serif italic text-xs text-neutral-300 leading-relaxed">
                "{item.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-obsidian-800 flex items-center justify-between">
              <div>
                <p className="font-serif font-bold text-parchment text-xs">{item.clientName}</p>
                <p className="text-[10px] text-neutral-500">{item.eventTitle}</p>
              </div>

              <Button onClick={() => handleDelete(item.id)} variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-400">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 bg-obsidian-900 border-obsidian-700 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <h3 className="font-serif text-2xl font-bold text-parchment">Add Client Review</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Client Name</label>
                <Input
                  required
                  placeholder="e.g. Kwame & Ama Mensah"
                  value={newTestimonial.clientName}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Event / Commission Title</label>
                <Input
                  required
                  placeholder="e.g. Royal Wedding at Labadi Beach"
                  value={newTestimonial.eventTitle}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, eventTitle: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Client Endorsement Quote</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Enter endorsement quote..."
                  value={newTestimonial.quote}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                  className="w-full p-3 rounded-md border border-obsidian-700 bg-obsidian-900 text-xs text-neutral-300"
                />
              </div>

              <Button type="submit" className="w-full gap-2 mt-4">
                <Sparkles className="w-4 h-4" /> Publish Review to Public Site
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

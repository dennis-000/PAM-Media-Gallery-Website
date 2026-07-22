'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Eye, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxImage, setActiveLightboxImage] = useState<any | null>(null);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'weddings', label: 'Luxury Weddings' },
    { id: 'corporate', label: 'Corporate & Executive' },
    { id: 'portrait', label: 'Editorial Portraits' },
    { id: 'events', label: 'Galas & Events' },
    { id: 'branding', label: 'Commercial Campaigns' },
  ];

  const portfolioItems = [
    {
      id: 'p1',
      title: 'Kwame & Ama — Royal Wedding at Labadi Beach',
      category: 'weddings',
      categoryLabel: 'Luxury Weddings',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600',
      aspect: 'aspect-[4/3]',
      description: 'Sunset beachfront wedding ceremony featuring traditional kente attire and modern high-fashion styling.',
    },
    {
      id: 'p2',
      title: 'Executive Headshots — Horizon West Headquarters',
      category: 'corporate',
      categoryLabel: 'Corporate & Executive',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
      aspect: 'aspect-[3/4]',
      description: 'Studio-style executive portraits engineered for annual reports and Forbes Africa editorial coverage.',
    },
    {
      id: 'p3',
      title: 'MTN Ghana Leadership Summit — Kempinski Hotel',
      category: 'events',
      categoryLabel: 'Galas & Events',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1600',
      aspect: 'aspect-[16/9]',
      description: 'Comprehensive keynote and VIP red carpet press documentation.',
    },
    {
      id: 'p4',
      title: 'Evelyn Addo — Studio Fine Art Portraiture',
      category: 'portrait',
      categoryLabel: 'Editorial Portraits',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1600',
      aspect: 'aspect-[4/3]',
      description: 'Low-key dramatically lit studio portrait session with golden hour tones.',
    },
    {
      id: 'p5',
      title: 'Cantonments Luxury Real Estate Campaign',
      category: 'branding',
      categoryLabel: 'Commercial Campaigns',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600',
      aspect: 'aspect-[16/9]',
      description: 'Commercial interior architectural photography and lifestyle video assets.',
    },
    {
      id: 'p6',
      title: 'Traditional Engagement Ceremony — Aburi',
      category: 'weddings',
      categoryLabel: 'Luxury Weddings',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200',
      aspect: 'aspect-[3/4]',
      description: 'Rich cultural storytelling capturing family blessings and traditional drumming rituals.',
    },
  ];

  const filteredItems = selectedCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="pt-28 pb-20 space-y-12">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <Badge variant="outline" className="border-champagne/40 text-champagne">
          Craftsmanship Archive
        </Badge>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-parchment">
          Curated Portfolio
        </h1>
        <p className="text-neutral-300 font-light text-base max-w-xl mx-auto">
          Explore a selection of our finest wedding, corporate, editorial, and commercial storytelling commissions.
        </p>
      </section>

      {/* Category Filter Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pb-6 border-b border-obsidian-800">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              className={selectedCategory === cat.id ? 'shadow-md' : 'border-obsidian-700 text-neutral-400 hover:text-parchment'}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Portfolio Masonry Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveLightboxImage(item)}
                className="group relative rounded-xl overflow-hidden cursor-pointer border border-obsidian-700/60 bg-obsidian-900"
              >
                <div className={`relative w-full ${item.aspect} overflow-hidden`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                  {/* Hover Info */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-end">
                      <div className="w-10 h-10 rounded-full bg-obsidian-900/80 backdrop-blur-md border border-champagne/40 flex items-center justify-center text-champagne">
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Badge variant="outline" className="border-champagne/40 text-champagne bg-obsidian-900/80">
                        {item.categoryLabel}
                      </Badge>
                      <h3 className="font-serif text-xl font-bold text-parchment leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-neutral-300 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      {activeLightboxImage && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fade-in">
          <button
            onClick={() => setActiveLightboxImage(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-obsidian-800 border border-obsidian-700 text-parchment flex items-center justify-center hover:text-champagne transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full bg-obsidian-900 border border-obsidian-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="relative w-full md:w-2/3 h-96 md:h-[600px] bg-black">
              <Image
                src={activeLightboxImage.image}
                alt={activeLightboxImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="w-full md:w-1/3 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <Badge variant="outline" className="border-champagne/40 text-champagne">
                  {activeLightboxImage.categoryLabel}
                </Badge>
                <h3 className="font-serif text-2xl font-bold text-parchment">
                  {activeLightboxImage.title}
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {activeLightboxImage.description}
                </p>
              </div>

              <div className="pt-6 border-t border-obsidian-800 space-y-3">
                <p className="text-xs text-neutral-400">Captured by PAM Media Chief Photographer</p>
                <Button onClick={() => setActiveLightboxImage(null)} className="w-full">
                  Close Lightbox
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Camera, 
  ArrowRight, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Star, 
  CalendarCheck, 
  CheckCircle2, 
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { INITIAL_SERVICES, INITIAL_TESTIMONIALS } from '@/lib/db/mock-db';

export default function HomePage() {
  const featuredPortfolio = [
    {
      id: 'p1',
      title: 'Royal Wedding at Labadi Beach',
      category: 'Luxury Weddings',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
      span: 'col-span-1 md:col-span-2 row-span-2',
    },
    {
      id: 'p2',
      title: 'Executive Portraiture Session',
      category: 'Corporate',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000',
      span: 'col-span-1 row-span-1',
    },
    {
      id: 'p3',
      title: 'MTN Leadership Summit',
      category: 'Events & Galas',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1000',
      span: 'col-span-1 row-span-1',
    },
    {
      id: 'p4',
      title: 'High-Fashion Editorial Studio',
      category: 'Fine Art',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200',
      span: 'col-span-1 md:col-span-2 row-span-1',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        {/* Background Editorial Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000"
            alt="PAM Media Photography Hero"
            fill
            priority
            className="object-cover object-center scale-105 filter brightness-40 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8 pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-1.5 border-champagne/40 text-champagne bg-obsidian-900/80 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Ghana’s Premier Creative Media House
            </Badge>
            
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-parchment leading-[1.15]">
              Photography is <span className="italic text-champagne font-normal">Storytelling</span>.
            </h1>
            
            <p className="max-w-2xl mx-auto text-base sm:text-xl text-neutral-300 font-light leading-relaxed pt-4">
              We capture moments of timeless elegance, Ghanaian cultural heritage, and executive authority with editorial precision.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/booking">
              <Button size="lg" className="w-full sm:w-auto text-base gap-3 shadow-xl shadow-champagne/20">
                <CalendarCheck className="w-5 h-5" />
                Book Your Experience
              </Button>
            </Link>
            
            <Link href="/portfolio">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base gap-3 border-neutral-600 text-parchment hover:border-champagne">
                Explore Portfolio
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-parchment/10 text-left"
          >
            <div>
              <p className="font-serif text-3xl font-bold text-champagne">10+ Years</p>
              <p className="text-xs text-neutral-400 uppercase tracking-wider pt-1">Mastery & Craft</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-champagne">500+</p>
              <p className="text-xs text-neutral-400 uppercase tracking-wider pt-1">Weddings & Galas</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-champagne">100%</p>
              <p className="text-xs text-neutral-400 uppercase tracking-wider pt-1">Client Satisfaction</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-champagne">4K Ultra</p>
              <p className="text-xs text-neutral-400 uppercase tracking-wider pt-1">Cinema Production</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. PHILOSOPHY & STORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold tracking-widest text-champagne uppercase">
              Our Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-parchment leading-tight">
              Not luxury for the sake of luxury. Premium through simplicity.
            </h2>
            <p className="text-neutral-300 text-base leading-relaxed">
              At PAM Media, we believe a photograph should feel like a memory carved in time. We eliminate chaos to let real emotion, natural light, and authentic human connections shine.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-champagne shrink-0" />
                <span className="text-sm font-medium text-neutral-200">Uncompromising Color Accuracy & Fine Art Editing</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-champagne shrink-0" />
                <span className="text-sm font-medium text-neutral-200">Seamless Client Experience from Booking to Gallery</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-champagne shrink-0" />
                <span className="text-sm font-medium text-neutral-200">Private PIN-Protected Cloud Gallery Delivery</span>
              </div>
            </div>
            <div className="pt-4">
              <Link href="/about">
                <Button variant="link" className="px-0 text-champagne text-base gap-2">
                  Read Full Story & Studio Philosophy
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden shadow-2xl border border-obsidian-700">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000"
                alt="Editorial Portraiture"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden shadow-2xl border border-obsidian-700 mt-8">
              <Image
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1000"
                alt="Ghanaian Wedding Details"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES PREVIEW */}
      <section className="bg-obsidian-900/60 py-20 border-y border-obsidian-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-champagne uppercase">
              Craftsmanship Spectrum
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-parchment">
              Tailored Creative Services
            </h2>
            <p className="text-neutral-400 text-sm">
              Each session is orchestrated with meticulous attention to detail, lighting design, and narrative flow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INITIAL_SERVICES.map((srv) => (
              <Card key={srv.id} className="group relative overflow-hidden flex flex-col justify-between">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={srv.coverImage}
                    alt={srv.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent" />
                  {srv.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="default">Signature Package</Badge>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs uppercase font-bold tracking-wider text-champagne">
                      {srv.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-parchment group-hover:text-champagne transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-3">
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-obsidian-700/60 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-neutral-500 block">Investment Starting at</span>
                      <span className="font-serif text-lg font-bold text-champagne">
                        GHS {srv.basePriceGHS.toLocaleString()}
                      </span>
                    </div>
                    <Link href={`/booking?service=${srv.id}`}>
                      <Button variant="outline" size="sm" className="border-champagne/30 text-champagne hover:bg-champagne/10">
                        Book Service
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PORTFOLIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-obsidian-800 pb-6">
          <div>
            <span className="text-xs font-bold tracking-widest text-champagne uppercase">
              Selected Works
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-parchment mt-1">
              Curated Portfolio
            </h2>
          </div>
          <Link href="/portfolio">
            <Button variant="outline" className="border-champagne/30 text-champagne hover:bg-champagne/10 gap-2">
              View All Works
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPortfolio.map((item) => (
            <div
              key={item.id}
              className={`relative group rounded-xl overflow-hidden h-96 border border-obsidian-700/60 ${item.span}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                <Badge variant="outline" className="border-champagne/40 text-champagne bg-obsidian-900/60">
                  {item.category}
                </Badge>
                <h3 className="font-serif text-2xl font-bold text-parchment group-hover:text-champagne transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CLIENT TESTIMONIALS */}
      <section className="bg-obsidian-900/40 py-20 border-y border-obsidian-800">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-12">
          <div className="space-y-2">
            <div className="flex justify-center gap-1 text-champagne">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-champagne" />
              ))}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-parchment">
              Words of Trust
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {INITIAL_TESTIMONIALS.map((t) => (
              <Card key={t.id} className="p-6 space-y-4 bg-obsidian-800/40 border-obsidian-700 flex flex-col justify-between">
                <p className="italic text-sm text-neutral-300 leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-obsidian-700/60">
                  <p className="font-serif font-bold text-parchment">{t.clientName}</p>
                  <p className="text-xs text-champagne">{t.roleOrEvent}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GUIDED BOOKING CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden p-10 sm:p-16 border border-champagne/30 bg-gradient-to-r from-obsidian-900 via-obsidian-800 to-obsidian-900 shadow-2xl text-center space-y-6">
          <Badge variant="outline" className="border-champagne text-champagne uppercase tracking-widest px-4 py-1">
            Effortless 7-Step Experience
          </Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-parchment max-w-2xl mx-auto">
            Ready to Document Your Legacy?
          </h2>
          <p className="text-neutral-300 max-w-xl mx-auto text-base">
            Select your preferred package, date, location, and project vision in less than two minutes.
          </p>
          <div className="pt-4">
            <Link href="/booking">
              <Button size="lg" className="px-8 py-6 text-lg gap-3 shadow-2xl shadow-champagne/30">
                Begin Guided Booking
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

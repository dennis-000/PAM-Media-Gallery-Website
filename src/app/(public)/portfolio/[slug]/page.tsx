import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  Camera, 
  User, 
  ArrowLeft, 
  Sparkles, 
  Star, 
  ChevronRight,
  Clock,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { persistentDb } from '@/lib/db/persistent-db';

interface StoryDetail {
  slug: string;
  title: string;
  category: string;
  date: string;
  location: string;
  leadPhotographer: string;
  heroImage: string;
  narrative: string[];
  specs: {
    camera: string;
    lens: string;
    atmosphere: string;
    guestCount: string;
  };
  testimonial: {
    quote: string;
    client: string;
  };
  gallery: string[];
}

const DOCUMENTED_STORIES: Record<string, StoryDetail> = {
  'kwame-ama-wedding': {
    slug: 'kwame-ama-wedding',
    title: 'Kwame & Ama — Royal Wedding at Labadi Beach',
    category: 'Weddings',
    date: 'June 15, 2026',
    location: 'Labadi Beach Hotel & Peduase Valley, Accra',
    leadPhotographer: 'Pamela Asiedu',
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600',
    narrative: [
      'The morning began with serene ocean breezes at Labadi Beach, where Ama prepared alongside her bridesmaids in custom silk robes. The traditional ceremony paid homage to Ghanaian Ashanti heritage, featuring rich Kente textiles and royal gold ornaments.',
      'During the golden hour transition, we moved to the lush mountain gardens of Peduase. Using soft, warm prime lenses, we captured intimate candid glances during their first dance under ambient festoon lighting.'
    ],
    specs: {
      camera: 'Canon EOS R5 & Leica M11',
      lens: 'RF 50mm f/1.2L & 85mm f/1.2L',
      atmosphere: 'Warm Sunset, Golden Hour & Festival Warmth',
      guestCount: '250 VVIP Guests'
    },
    testimonial: {
      quote: 'Looking through these pictures brings back every single emotion. PAM Media didn’t just take photos; they documented our history.',
      client: 'Kwame & Ama Mensah'
    },
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  'goldkey-headquarters': {
    slug: 'goldkey-headquarters',
    title: 'GoldKey Properties — Executive Leadership & Architecture',
    category: 'Corporate',
    date: 'July 10, 2026',
    location: 'Cantonments Penthouse Tower, Accra',
    leadPhotographer: 'Dennis Asiedu',
    heroImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1600',
    narrative: [
      'A comprehensive corporate portraiture session for GoldKey Properties executive board and architectural documentation of their flagship Cantonments penthouse development.',
      'Using tethered 27" 4K monitors on set, each C-suite executive reviewed and selected their approved headshots in real-time, ensuring seamless PR publishing readiness.'
    ],
    specs: {
      camera: 'Phase One Medium Format & Sony A7R V',
      lens: '24-70mm f/2.8 GM II & 90mm Macro',
      atmosphere: 'Clean, Modern Architectural Precision',
      guestCount: '24 Executive Board Members'
    },
    testimonial: {
      quote: 'Professional, efficient, and magazine-ready quality. PAM Media is our exclusive media agency.',
      client: 'GoldKey Marketing Team'
    },
    gallery: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200'
    ]
  }
};

export default function StoryDetailPage({ params }: { params: { slug: string } }) {
  const storyKey = Object.keys(DOCUMENTED_STORIES).includes(params.slug) ? params.slug : 'kwame-ama-wedding';
  const story = DOCUMENTED_STORIES[storyKey];

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-champagne transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio Stories
        </Link>
      </div>

      {/* Story Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-3 text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            Documented Story • {story.category}
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-parchment leading-tight">
            {story.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 pt-2">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-champagne" /> {story.date}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-champagne" /> {story.location}</span>
            <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-champagne" /> {story.leadPhotographer}</span>
          </div>
        </div>

        <div className="relative h-[65vh] w-full rounded-2xl overflow-hidden border border-obsidian-700 shadow-2xl">
          <img src={story.heroImage} alt={story.title} className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Narrative & Technical Specs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Narrative Body */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-champagne">The Story Behind The Lens</h2>
            {story.narrative.map((p, idx) => (
              <p key={idx} className="text-neutral-300 font-light text-base leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Specs Card */}
          <Card className="lg:col-span-4 p-6 bg-obsidian-900/80 border-obsidian-700 space-y-4 font-mono text-xs">
            <h3 className="font-serif font-bold text-parchment text-sm border-b border-obsidian-800 pb-2">
              Production Metadata
            </h3>
            <div>
              <span className="text-neutral-500 block">Camera Bodies</span>
              <span className="text-parchment font-bold">{story.specs.camera}</span>
            </div>
            <div>
              <span className="text-neutral-500 block">Prime Optics</span>
              <span className="text-parchment font-bold">{story.specs.lens}</span>
            </div>
            <div>
              <span className="text-neutral-500 block">Atmosphere</span>
              <span className="text-parchment font-bold">{story.specs.atmosphere}</span>
            </div>
            <div>
              <span className="text-neutral-500 block">Attendance</span>
              <span className="text-parchment font-bold">{story.specs.guestCount}</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Curated Story Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="font-serif text-2xl font-bold text-parchment text-center">Curated Gallery Highlights</h2>
        <div className="columns-1 md:columns-2 gap-6 space-y-6">
          {story.gallery.map((img, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden border border-obsidian-700 bg-obsidian-900 break-inside-avoid">
              <img src={img} alt={`Story Image ${idx}`} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Client Testimonial */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 bg-obsidian-900 border-champagne/30 text-center space-y-4">
          <p className="font-serif italic text-lg text-parchment">"{story.testimonial.quote}"</p>
          <p className="font-serif font-bold text-champagne text-sm">— {story.testimonial.client}</p>
        </Card>
      </section>

      {/* Booking Trigger */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h3 className="font-serif text-2xl font-bold text-parchment">Document Your Event With PAM Media</h3>
        <Link href="/booking">
          <Button size="lg" className="gap-2">
            <Sparkles className="w-4 h-4" /> Book Your Custom Session
          </Button>
        </Link>
      </section>
    </div>
  );
}

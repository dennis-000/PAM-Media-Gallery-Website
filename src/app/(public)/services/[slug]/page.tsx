import Image from 'next/image';
import Link from 'next/link';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Camera, 
  Award, 
  ShieldCheck, 
  Star, 
  HelpCircle,
  CalendarCheck,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { persistentDb } from '@/lib/db/persistent-db';

interface ServiceDetail {
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  basePriceGHS: number;
  basePriceUSD: number;
  heroImage: string;
  deliverables: string[];
  processTimeline: Array<{ step: string; title: string; desc: string }>;
  faqs: Array<{ q: string; a: string }>;
  testimonial: { quote: string; client: string; event: string };
  galleryPreviews: string[];
}

const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  weddings: {
    slug: 'weddings',
    title: 'Luxury Wedding Storytelling & Cinema',
    category: 'Weddings & Celebrations',
    subtitle: 'Documentary intimacy meets high-fashion editorial polish.',
    description: 'We believe wedding photography should feel authentic, timeless, and deeply emotional. From traditional engagement ceremonies in Accra to mountain golden-hour receptions in Aburi, we document the tears, laughter, and cultural heritage of your day.',
    basePriceGHS: 25000,
    basePriceUSD: 2000,
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600',
    deliverables: [
      'Full Day Coverage (Up to 14 Hours)',
      'Lead Photographer & Associate Photographer',
      'High-Resolution Drone 4K Aerial Photography',
      'Handcrafted Italian Leather Heirloom Album',
      'Private Password & PIN Protected Online Vault',
      'Pre-Wedding / Engagement Session Included',
      'Sneak Peek Highlight Reel within 48 Hours',
    ],
    processTimeline: [
      { step: '01', title: 'Consultation & Vision Call', desc: 'We discuss your wedding timeline, moodboards, attire details, and key family moments.' },
      { step: '02', title: 'Pre-Wedding Engagement Session', desc: 'A relaxed portrait shoot to get comfortable behind the camera before your big day.' },
      { step: '03', title: 'The Wedding Day', desc: 'Dual photographers capture candid preparation, ceremony emotions, and reception party.' },
      { step: '04', title: 'Color Grading & Retouching', desc: 'Hand-edited imagery applying signature skin tone preservation and color profiles.' },
      { step: '05', title: 'Vault Delivery & Heirloom Album', desc: 'PIN-protected online gallery delivery plus custom leather album design proofing.' },
    ],
    faqs: [
      { q: 'How far in advance should we book our wedding date?', a: 'We recommend booking 6 to 12 months in advance, especially for peak Ghanaian wedding seasons (December, Easter, and August).' },
      { q: 'Do you travel outside Accra and Aburi?', a: 'Yes! We regularly document weddings across Kumasi, Takoradi, Cape Coast, and international destination weddings across Africa and Europe.' },
      { q: 'When will we receive our wedding gallery?', a: 'Sneak peek highlights are delivered within 48 hours. Your complete private online gallery is ready within 14 days.' },
    ],
    testimonial: {
      quote: 'PAM Media delivered beyond our wildest expectations. Every single photograph looks like a fine art magazine print.',
      client: 'Kwame & Ama Mensah',
      event: 'Royal Wedding at Labadi Beach Hotel',
    },
    galleryPreviews: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800',
    ],
  },
  corporate: {
    slug: 'corporate',
    title: 'Corporate & Executive Branding',
    category: 'Corporate & Industry',
    subtitle: 'Command authority and approachability for global investors & press.',
    description: 'Empower your leadership team, founders, and enterprise brand with world-class executive headshots, facility imagery, and live press documentation.',
    basePriceGHS: 12000,
    basePriceUSD: 1000,
    heroImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1600',
    deliverables: [
      'On-Location Studio Setup with Key Softbox Lighting',
      'Tethered 27" Monitor Live Review for CEOs & Executives',
      'Commercial PR & Global Publishing Rights Included',
      'Express 48-Hour Retouching Turnaround',
      'High-Speed Corporate Vault Delivery',
    ],
    processTimeline: [
      { step: '01', title: 'Brand Alignment Brief', desc: 'Define corporate tone, wardrobe standards, and media publishing channels.' },
      { step: '02', title: 'Studio Mobile Setup', desc: 'We install professional lighting and tethered monitors at your headquarters.' },
      { step: '03', title: 'Executive Session', desc: 'Live review on calibrated monitors ensures every executive selects their best frame.' },
      { step: '04', title: 'High-Resolution Retouching', desc: 'Skin smoothing, jacket tailoring alignment, and backdrop clean-up.' },
    ],
    faqs: [
      { q: 'Can you shoot at our corporate office in Accra?', a: 'Yes! We bring our complete mobile studio, backdrop, softboxes, and live monitors directly to your offices.' },
      { q: 'Are commercial distribution rights included?', a: 'Yes, full commercial PR and publishing rights for LinkedIn, Forbes, annual reports, and press releases are included.' },
    ],
    testimonial: {
      quote: 'The executive portraits PAM Media produced redefined our brand presence across Forbes Africa and global investor decks.',
      client: 'Evelyn Addo',
      event: 'Managing Director, Horizon West',
    },
    galleryPreviews: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    ],
  },
  portraits: {
    slug: 'portraits',
    title: 'Editorial Portraiture & Studio',
    category: 'Fine Art Portraiture',
    subtitle: 'High-fashion lighting and cinematic mood creation.',
    description: 'Designed for artists, public figures, and individuals seeking magazine-grade portraits at our Airport Residential studio or curated Accra locations.',
    basePriceGHS: 5000,
    basePriceUSD: 400,
    heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1600',
    deliverables: [
      '2-Hour In-Studio or Location Session',
      'Up to 4 Outfit Changes',
      'Creative Lighting Direction & Styling Assistance',
      '15 High-Resolution Express Retouched Masters',
      'Private Digital Vault Download',
    ],
    processTimeline: [
      { step: '01', title: 'Moodboard & Wardrobe', desc: 'Select color palettes, outfit choices, and lighting mood.' },
      { step: '02', title: 'Studio Session', desc: 'Guided posing and artistic lighting in our climate-controlled studio.' },
      { step: '03', title: 'Selection & Retouch', desc: 'Heart your favorite proofs in your private proofing portal.' },
    ],
    faqs: [
      { q: 'Is hair and makeup styling available?', a: 'Yes, we can arrange top Ghanaian celebrity makeup artists and hair stylists upon request.' },
    ],
    testimonial: {
      quote: 'Pamela made me feel so confident. The lighting and editing are absolute perfection.',
      client: 'Nana Yaa Kyei',
      event: '30th Birthday Editorial Session',
    },
    galleryPreviews: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    ],
  },
};

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const serviceKey = Object.keys(SERVICE_DETAILS).includes(params.slug) ? params.slug : 'weddings';
  const detail = SERVICE_DETAILS[serviceKey];

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Link href="/services" className="hover:text-champagne transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-champagne font-semibold">{detail.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="outline" className="border-champagne/40 text-champagne">
              {detail.category}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-parchment leading-tight">
              {detail.title}
            </h1>
            <p className="text-xl text-champagne font-serif italic">{detail.subtitle}</p>
            <p className="text-neutral-300 leading-relaxed font-light text-base">{detail.description}</p>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-obsidian-800">
              <div>
                <span className="text-xs text-neutral-500 block uppercase tracking-wider font-mono">Ghanaian Investment</span>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-champagne">
                  GH₵ {detail.basePriceGHS.toLocaleString()}
                </span>
                <span className="text-[11px] text-emerald-400 block font-mono">✓ MTN MoMo, Telecel Cash & Bank Wire Accepted</span>
              </div>

              <Link href={`/booking?service=${detail.slug}`}>
                <Button size="lg" className="gap-2 shadow-xl shadow-champagne/10">
                  <CalendarCheck className="w-5 h-5" />
                  Reserve This Experience
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-[480px] rounded-2xl overflow-hidden border border-obsidian-700 shadow-2xl">
              <img
                src={detail.heroImage}
                alt={detail.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Previews Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end border-b border-obsidian-800 pb-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-parchment">Recent Documented Stories</h2>
            <p className="text-xs text-neutral-400">Authentic moments captured under this service discipline.</p>
          </div>
          <Link href="/portfolio">
            <Button variant="outline" size="sm" className="text-xs border-champagne/30 text-champagne">
              View Complete Portfolio →
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {detail.galleryPreviews.map((img, idx) => (
            <div key={idx} className="relative h-72 rounded-xl overflow-hidden border border-obsidian-700/80 group">
              <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Deliverables & Process Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Deliverables Checklist */}
          <Card className="lg:col-span-5 p-8 bg-obsidian-900/80 border-obsidian-700 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-parchment flex items-center gap-2">
              <Award className="w-6 h-6 text-champagne" />
              What’s Included
            </h3>
            <div className="space-y-4">
              {detail.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* 5-Step Process Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-parchment flex items-center gap-2">
              <Clock className="w-6 h-6 text-champagne" />
              The Client Journey & Timeline
            </h3>

            <div className="space-y-4">
              {detail.processTimeline.map((step) => (
                <div key={step.step} className="p-5 rounded-xl bg-obsidian-900/60 border border-obsidian-800 flex items-start gap-4">
                  <span className="font-mono text-champagne font-bold text-lg">{step.step}</span>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-parchment text-sm">{step.title}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h3 className="font-serif text-2xl font-bold text-parchment text-center flex items-center justify-center gap-2">
          <HelpCircle className="w-6 h-6 text-champagne" />
          Service FAQs
        </h3>

        <div className="space-y-4">
          {detail.faqs.map((faq, idx) => (
            <Card key={idx} className="p-6 bg-obsidian-900/80 border-obsidian-700 space-y-2">
              <h4 className="font-serif font-bold text-parchment text-base">{faq.q}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">{faq.a}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonial Quote */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-10 bg-obsidian-900 border-champagne/30 text-center space-y-4 shadow-2xl">
          <div className="flex justify-center gap-1 text-champagne">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-champagne" />
            ))}
          </div>
          <p className="font-serif italic text-lg sm:text-xl text-parchment max-w-2xl mx-auto leading-relaxed">
            "{detail.testimonial.quote}"
          </p>
          <div>
            <p className="font-serif font-bold text-champagne">{detail.testimonial.client}</p>
            <p className="text-xs text-neutral-400">{detail.testimonial.event}</p>
          </div>
        </Card>
      </section>

      {/* Final Booking CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="p-12 rounded-3xl bg-gradient-to-b from-obsidian-900 to-obsidian border border-obsidian-700 space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-parchment">Ready to Begin Your Story?</h2>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Reserve your date with PAM Media. Our team works with a limited number of clients each season to ensure uncompromising quality.
          </p>
          <Link href={`/booking?service=${detail.slug}`}>
            <Button size="lg" className="gap-2">
              <Sparkles className="w-4 h-4" /> Book {detail.title}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

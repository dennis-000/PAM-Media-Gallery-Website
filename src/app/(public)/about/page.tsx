import Image from 'next/image';
import Link from 'next/link';
import { Camera, Award, ShieldCheck, Heart, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'About Us | PAM Media Story & Philosophy — Ghana',
  description: 'Learn about PAM Media, Ghana’s premiere fine art photography and media house. Our craftsmanship, studio values, and dedication to storytelling.',
};

export default function AboutPage() {
  const pillars = [
    {
      title: 'Craftsmanship Over Quantity',
      description: 'We limit our annual wedding and corporate calendar to guarantee uncompromised focus, meticulous color grading, and personal client care.',
      icon: Award,
    },
    {
      title: 'Understated Elegance',
      description: 'We avoid trendy filters or artificial poses. Our goal is timeless fine art imagery that looks as striking today as it will 50 years from now.',
      icon: Sparkles,
    },
    {
      title: 'Discrete Professionalism',
      description: 'Whether working with global CEOs, high-profile diplomats, or royal traditional families, privacy, punctuality, and discretion are paramount.',
      icon: ShieldCheck,
    },
    {
      title: 'Authentic Storytelling',
      description: 'Every smile, glance, and cultural ritual is recorded with documentary authenticity and emotional depth.',
      icon: Heart,
    },
  ];

  return (
    <div className="pt-28 pb-20 space-y-20">
      {/* Header Banner */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <Badge variant="outline" className="border-champagne/40 text-champagne">
          Ghana • Fine Art Studio
        </Badge>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-parchment">
          Where Craftsmanship Meets Emotion
        </h1>
        <p className="text-lg text-neutral-300 font-light leading-relaxed">
          PAM Media was founded on a simple truth: photography is not merely capturing light. It is preserving heritage, legacy, and human emotion.
        </p>
      </section>

      {/* Hero Image Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative h-96 rounded-xl overflow-hidden border border-obsidian-700 shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000"
              alt="PAM Media Wedding Craft"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-96 rounded-xl overflow-hidden border border-obsidian-700 shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000"
              alt="Studio Portraiture"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-96 rounded-xl overflow-hidden border border-obsidian-700 shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1000"
              alt="Corporate Branding Session"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-champagne uppercase">
            Our Core Values
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-parchment">
            The PAM Media Standard
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="p-6 space-y-4 bg-obsidian-900/60 border-obsidian-700">
                <div className="w-12 h-12 rounded-full border border-champagne/40 bg-champagne/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-champagne" />
                </div>
                <h3 className="font-serif text-xl font-bold text-parchment">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Studio & Equipment Standard */}
      <section className="bg-obsidian-900/60 py-16 border-y border-obsidian-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <Badge variant="outline" className="border-champagne/40 text-champagne">
              World-Class Infrastructure
            </Badge>
            <h2 className="font-serif text-3xl font-bold text-parchment">
              Studio & Technical Equipment
            </h2>
            <p className="text-neutral-400 text-sm max-w-xl mx-auto">
              We invest in high-end medium format digital backs, cinema primes, tethered live previews, and dual-backup storage systems to ensure absolute reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-center">
            <div className="p-6 rounded-lg bg-obsidian-800/40 border border-obsidian-700">
              <h4 className="font-serif font-bold text-champagne text-lg">Cameras & Lenses</h4>
              <p className="text-xs text-neutral-400 mt-2">Canon EOS R5, Hasselblad Medium Format & RF f/1.2 L Cinema Primes</p>
            </div>
            <div className="p-6 rounded-lg bg-obsidian-800/40 border border-obsidian-700">
              <h4 className="font-serif font-bold text-champagne text-lg">Lighting & Studio</h4>
              <p className="text-xs text-neutral-400 mt-2">Profoto B10X High Speed Sync & Tethered Live Monitor Setup</p>
            </div>
            <div className="p-6 rounded-lg bg-obsidian-800/40 border border-obsidian-700">
              <h4 className="font-serif font-bold text-champagne text-lg">Redundant Backups</h4>
              <p className="text-xs text-neutral-400 mt-2">Dual Card Recording + On-Site Cloudflare R2 Off-site Sync</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-serif text-3xl font-bold text-parchment">
          Let’s Tell Your Story Together
        </h2>
        <div className="flex justify-center gap-4">
          <Link href="/booking">
            <Button size="lg" className="gap-2">
              Book a Session
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="border-champagne/40 text-champagne">
              Contact Studio
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

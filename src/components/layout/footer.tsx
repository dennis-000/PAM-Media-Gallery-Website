'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera, MapPin, Mail, Phone, Instagram, Facebook, Youtube, ShieldCheck } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-obsidian-900 border-t border-obsidian-700/60 text-neutral-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-obsidian-800">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-champagne/40 bg-obsidian-800 flex items-center justify-center">
                <Camera className="w-5 h-5 text-champagne" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-parchment">
                PAM MEDIA
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400 max-w-sm">
              Ghana’s premiere creative media house. Photography is storytelling—capturing heritage, romance, executive presence, and cultural grandeur with timeless editorial craftsmanship.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-obsidian-700 flex items-center justify-center hover:border-champagne hover:text-champagne transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-obsidian-700 flex items-center justify-center hover:border-champagne hover:text-champagne transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-obsidian-700 flex items-center justify-center hover:border-champagne hover:text-champagne transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-parchment uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-champagne transition-colors">About Our Studio</Link></li>
              <li><Link href="/services" className="hover:text-champagne transition-colors">Services & Pricing</Link></li>
              <li><Link href="/portfolio" className="hover:text-champagne transition-colors">Curated Portfolio</Link></li>
              <li><Link href="/blog" className="hover:text-champagne transition-colors">Journal & Articles</Link></li>
              <li><Link href="/booking" className="hover:text-champagne transition-colors">Guided Booking</Link></li>
            </ul>
          </div>

          {/* Specializations */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-parchment uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services" className="hover:text-champagne transition-colors">Luxury Weddings</Link></li>
              <li><Link href="/services" className="hover:text-champagne transition-colors">Corporate Branding</Link></li>
              <li><Link href="/services" className="hover:text-champagne transition-colors">Editorial Portraits</Link></li>
              <li><Link href="/services" className="hover:text-champagne transition-colors">Galas & Events</Link></li>
              <li><Link href="/services" className="hover:text-champagne transition-colors">Cinematic 4K Film</Link></li>
            </ul>
          </div>

          {/* Contact & Studio Location */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-parchment uppercase mb-4">
              Accra Studio
            </h4>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-4 h-4 text-champagne shrink-0 mt-1" />
              <span>Airport Residential Area, Accra, Ghana</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-champagne shrink-0" />
              <span>+233 24 000 9988</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-champagne shrink-0" />
              <span>hello@pammedia.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} PAM Media Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:text-champagne flex items-center gap-1 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

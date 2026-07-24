'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Camera, Menu, X, Lock, ArrowRight, Sparkles, Key } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalModalOpen, setPortalModalOpen] = useState(false);
  const [gallerySlugInput, setGallerySlugInput] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePortalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gallerySlugInput) return;
    const cleanSlug = gallerySlugInput.trim().toLowerCase().replace(/\s+/g, '-');
    setPortalModalOpen(false);
    router.push(`/gallery/${cleanSlug}`);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Journal' },
    { href: '/contact', label: 'Contact' },
  ];

  const isAdminRoute = pathname?.startsWith('/admin');
  if (isAdminRoute) return null;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-obsidian/90 backdrop-blur-md border-b border-obsidian-700/50 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-obsidian/80 to-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-champagne/40 bg-obsidian-800/80 flex items-center justify-center group-hover:border-champagne transition-colors">
              <Camera className="w-5 h-5 text-champagne group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-parchment group-hover:text-champagne transition-colors">
                PAM MEDIA
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-champagne/80 uppercase font-medium">
                Ghana • Fine Art
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium tracking-wider transition-colors relative py-1',
                    isActive
                      ? 'text-champagne'
                      : 'text-neutral-300 hover:text-parchment'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-champagne rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={() => setPortalModalOpen(true)}
              variant="outline"
              size="sm"
              className="gap-2 border-champagne/30 text-champagne hover:bg-champagne/10"
            >
              <Lock className="w-3.5 h-3.5" />
              Client Portal
            </Button>

            <Link href="/booking">
              <Button size="sm" className="gap-2 shadow-lg shadow-champagne/10">
                Book Experience
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-300 hover:text-parchment focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-obsidian-900/95 backdrop-blur-xl border-b border-obsidian-700 px-6 py-6 space-y-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block text-lg font-serif tracking-wide py-2 transition-colors',
                  pathname === link.href ? 'text-champagne' : 'text-neutral-300'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-obsidian-700 flex flex-col gap-3">
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setPortalModalOpen(true);
                }}
                variant="outline"
                className="w-full justify-center gap-2 border-champagne/40 text-champagne"
              >
                <Lock className="w-4 h-4" />
                Client Portal
              </Button>
              <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-center gap-2">
                  Book Experience
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Client Portal Lookup Modal */}
      {portalModalOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 bg-obsidian-900 border-obsidian-700 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-champagne" />
                <h3 className="font-serif text-xl font-bold text-parchment">Access Client Vault</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setPortalModalOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form onSubmit={handlePortalSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">
                  Enter Your Private Gallery Link or Slug
                </label>
                <Input
                  required
                  placeholder="e.g. kwame-ama-wedding"
                  value={gallerySlugInput}
                  onChange={(e) => setGallerySlugInput(e.target.value)}
                  className="text-sm font-mono"
                />
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  PAM Media delivers private, PIN-protected fine art collections directly to booked clients.
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full gap-2">
                <Key className="w-4 h-4" /> Open Private Vault
              </Button>
            </form>

            <div className="pt-4 border-t border-obsidian-800 space-y-3 text-center">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-parchment">Not a booked client yet?</p>
                <p className="text-[11px] text-neutral-400">
                  Explore our public work or reserve your custom media session.
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-1">
                <Link href="/portfolio" onClick={() => setPortalModalOpen(false)}>
                  <Button variant="outline" size="sm" className="text-xs border-obsidian-700">
                    View Public Portfolio
                  </Button>
                </Link>
                <Link href="/booking" onClick={() => setPortalModalOpen(false)}>
                  <Button size="sm" className="text-xs">
                    Book Session
                  </Button>
                </Link>
              </div>

              <div className="pt-2">
                <Link
                  href="/gallery/kwame-ama-wedding"
                  onClick={() => setPortalModalOpen(false)}
                  className="text-[11px] text-champagne hover:underline font-serif block"
                >
                  Test Demo Vault (PIN: 2026) →
                </Link>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera, Menu, X, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <Link href="/gallery/kwame-ama-wedding">
            <Button variant="outline" size="sm" className="gap-2 border-champagne/30 text-champagne hover:bg-champagne/10">
              <Lock className="w-3.5 h-3.5" />
              Client Portal
            </Button>
          </Link>

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
            <Link href="/gallery/kwame-ama-wedding" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center gap-2 border-champagne/40 text-champagne">
                <Lock className="w-4 h-4" />
                Client Portal
              </Button>
            </Link>
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
  );
}

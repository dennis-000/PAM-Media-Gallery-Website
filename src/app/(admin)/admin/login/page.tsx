'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Camera, Lock, Mail, ArrowRight, ShieldCheck, Sparkles, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function AdminLoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('pamela@pammedia.com');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('Pamela Addo');
  const [role, setRole] = useState('owner');
  const [loading, setLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const sessionData = {
      name: fullName || 'Pamela Asiedu (Studio Director)',
      email: email || 'admin@pammedia.com',
      role: role || 'owner',
      token: `session-${Date.now()}`
    };
    localStorage.setItem('pam_admin_session', JSON.stringify(sessionData));
    setTimeout(() => {
      setLoading(false);
      router.push('/admin/bookings');
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden bg-obsidian text-parchment">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-champagne/10 via-obsidian to-obsidian pointer-events-none" />

      <Card className="relative z-10 max-w-md w-full p-8 bg-obsidian-900/90 border-obsidian-700/80 backdrop-blur-xl shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border border-champagne/40 bg-obsidian-800 flex items-center justify-center shadow-lg">
              <Camera className="w-6 h-6 text-champagne" />
            </div>
          </Link>

          <div>
            <span className="font-serif text-2xl font-bold tracking-wider text-parchment">
              PAM MEDIA
            </span>
            <span className="block text-[10px] tracking-[0.25em] text-champagne uppercase font-medium mt-0.5">
              Studio Operating System
            </span>
          </div>

          <Badge variant="outline" className="border-champagne/30 text-champagne">
            {isSignUp ? 'Staff Registration' : 'Secure Staff Authentication'}
          </Badge>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-neutral-300">Full Name</label>
              <Input
                required
                placeholder="e.g. Pamela Addo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-neutral-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3.5 text-neutral-500" />
              <Input
                required
                type="email"
                placeholder="staff@pammedia.com"
                className="pl-9 text-xs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-neutral-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3.5 text-neutral-500" />
              <Input
                required
                type="password"
                placeholder="••••••••••••"
                className="pl-9 text-xs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {isSignUp && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-neutral-300">Studio Staff Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-11 rounded-md border border-obsidian-700 bg-obsidian-900/80 px-4 text-xs text-parchment focus:outline-none focus:ring-1 focus:ring-champagne"
              >
                <option value="owner">Studio Owner (Full Access)</option>
                <option value="photographer">Lead Photographer</option>
                <option value="editor">Retouching Editor</option>
                <option value="admin">Studio Administrator</option>
              </select>
            </div>
          )}

          <Button type="submit" size="lg" disabled={loading} className="w-full gap-2 mt-2">
            {loading ? 'Authenticating...' : isSignUp ? 'Create Staff Account' : 'Sign In to Studio OS'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Toggle Mode */}
        <div className="pt-4 border-t border-obsidian-800 text-center text-xs text-neutral-400">
          {isSignUp ? (
            <p>
              Already have a staff account?{' '}
              <button onClick={() => setIsSignUp(false)} className="text-champagne font-bold hover:underline">
                Sign In
              </button>
            </p>
          ) : (
            <p>
              New studio team member?{' '}
              <button onClick={() => setIsSignUp(true)} className="text-champagne font-bold hover:underline">
                Register Account
              </button>
            </p>
          )}
        </div>

        {/* Back Link */}
        <div className="text-center pt-2">
          <Link href="/" className="text-[11px] text-neutral-500 hover:text-champagne transition-colors">
            ← Return to PAM Media Public Website
          </Link>
        </div>
      </Card>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 space-y-16">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <Badge variant="outline" className="border-champagne/40 text-champagne">
          Accra Studio & Consultations
        </Badge>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-parchment">
          Connect With PAM Media
        </h1>
        <p className="text-neutral-300 font-light text-base max-w-xl mx-auto">
          We welcome studio appointments, commission inquiries, and corporate consultation requests in Airport Residential Area, Accra.
        </p>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Studio Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <Card className="p-8 space-y-6 bg-obsidian-900/80 border-obsidian-700">
              <h2 className="font-serif text-2xl font-bold text-parchment">
                Accra Studio Details
              </h2>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-champagne/30 bg-champagne/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-champagne" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-parchment">Studio Address</h4>
                    <p className="text-xs text-neutral-400">14 Liberation Road, Airport Residential Area</p>
                    <p className="text-xs text-neutral-400">Accra, Ghana</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-champagne/30 bg-champagne/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-champagne" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-parchment">Telephone & WhatsApp</h4>
                    <p className="text-xs text-neutral-400">+233 24 000 9988</p>
                    <p className="text-xs text-neutral-400">+233 30 299 0011 (Studio Landline)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-champagne/30 bg-champagne/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-champagne" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-parchment">Email Inquiries</h4>
                    <p className="text-xs text-neutral-400">hello@pammedia.com</p>
                    <p className="text-xs text-neutral-400">bookings@pammedia.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-champagne/30 bg-champagne/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-champagne" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-parchment">Consultation Hours</h4>
                    <p className="text-xs text-neutral-400">Monday – Saturday: 9:00 AM – 6:00 PM</p>
                    <p className="text-xs text-neutral-400">Sunday: By Appointment Only</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-obsidian-700">
                <a
                  href="https://wa.me/233240009988?text=Hello%20PAM%20Media%20Studio!%20I%20would%20like%20to%20inquire%20about%20a%20photography%20session."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-emerald-700/80 hover:bg-emerald-600 text-white font-medium text-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat Directly on WhatsApp (Instant SLA)
                </a>
              </div>
            </Card>

            {/* Studio Guarantee & Insurance */}
            <Card className="p-6 bg-obsidian-900/60 border-obsidian-800 space-y-3 font-mono text-xs">
              <h4 className="font-serif font-bold text-champagne text-sm uppercase tracking-wider flex items-center gap-2">
                🛡 Studio Production Guarantee
              </h4>
              <p className="text-neutral-400 leading-relaxed">
                • <strong>Dual-Card Redundancy</strong>: All cameras record simultaneously to two card slots on set.
              </p>
              <p className="text-neutral-400 leading-relaxed">
                • <strong>$50,000 Insurance</strong>: Complete public liability & equipment loss coverage.
              </p>
              <p className="text-neutral-400 leading-relaxed">
                • <strong>2-Hour SLA</strong>: Inquiry responses guaranteed within 2 hours during studio business hours.
              </p>
            </Card>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <Card className="p-8 bg-obsidian-900/80 border-obsidian-700">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-champagne/20 text-champagne flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-parchment">
                    Message Received
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto">
                    Thank you for reaching out to PAM Media. Our client operations manager will respond within 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)} className="border-champagne/40 text-champagne">
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="font-serif text-2xl font-bold text-parchment">
                      Send an Inquiry
                    </h2>
                    <p className="text-xs text-neutral-400">
                      Fill out the form below or use our guided booking tool for custom package selection.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-neutral-300">Your Name</label>
                      <Input
                        required
                        placeholder="e.g. Kwame Asante"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-neutral-300">Email Address</label>
                      <Input
                        required
                        type="email"
                        placeholder="kwame@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-neutral-300">Phone Number</label>
                      <Input
                        placeholder="+233 24 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-neutral-300">Subject</label>
                      <Input
                        placeholder="e.g. Wedding Photography Inquiry"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-neutral-300">Your Message / Project Details</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full rounded-md border border-obsidian-700 bg-obsidian-900/80 px-4 py-3 text-sm text-parchment placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-champagne"
                      placeholder="Tell us about your event, preferred dates, venue, or vision..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2">
                    <Send className="w-4 h-4" />
                    Submit Inquiry
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

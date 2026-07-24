'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  DollarSign, 
  FileText, 
  Upload, 
  Sparkles, 
  User, 
  Mail, 
  Phone,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { INITIAL_SERVICES } from '@/lib/db/mock-db';
import { submitBookingAction } from '@/lib/actions/booking-actions';

export default function BookingPage() {
  const searchParams = useSearchParams();
  const initialServiceId = searchParams?.get('service') || 'srv-wedding-mastery';

  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [bookingResult, setBookingResult] = useState<{ bookingNumber: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceId: initialServiceId,
    shootDate: '',
    location: 'Accra (Airport, Cantonments, Labadi)',
    budgetRange: 'GHS 20,000 - 35,000',
    preferredContact: 'WhatsApp',
    details: '',
    inspirationUrl: '',
  });

  // Draft Autosave Effect
  useEffect(() => {
    const saved = localStorage.getItem('pam_media_booking_draft');
    if (saved) {
      try {
        setFormData(prev => ({ ...prev, ...JSON.parse(saved) }));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pam_media_booking_draft', JSON.stringify(formData));
  }, [formData]);

  const selectedService = INITIAL_SERVICES.find(s => s.id === formData.serviceId) || INITIAL_SERVICES[0];

  const locations = [
    'Accra (Airport, Cantonments, Labadi)',
    'Aburi / Peduase Valley',
    'Kumasi / Ashanti Region',
    'Cape Coast / Elmina Beach',
    'Takoradi / Western Region',
    'International Destination Shoot',
  ];

  const budgetOptions = [
    'GH₵ 5,000 - 10,000',
    'GH₵ 10,000 - 20,000',
    'GH₵ 20,000 - 35,000',
    'GH₵ 35,000+',
  ];

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await submitBookingAction({
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      shootDate: formData.shootDate || '2026-09-15',
      location: formData.location,
      budgetRange: formData.budgetRange,
      details: formData.details,
      inspirationUrls: formData.inspirationUrl ? [formData.inspirationUrl] : [],
    });

    setSubmitting(false);

    if (res.success && res.bookingNumber) {
      setBookingResult({ bookingNumber: res.bookingNumber });
      setStep(7);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FAFAF8', '#141518'],
        });
      } catch (e) {}
    }
  };

  return (
    <div className="pt-28 pb-20 space-y-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="outline" className="border-champagne/40 text-champagne">
          Guided Booking Journey
        </Badge>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-parchment">
          Reserve Your PAM Media Session
        </h1>
        <p className="text-neutral-300 font-light text-sm max-w-xl mx-auto">
          Step {step} of 7 — {step === 7 ? 'Confirmation' : 'Customizing Your Session'}
        </p>
      </div>

      {/* Progress Bar Header */}
      {step < 7 && (
        <div className="w-full bg-obsidian-900 border border-obsidian-700/80 rounded-full p-1.5 flex items-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div
              key={num}
              className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                step >= num ? 'bg-champagne shadow-sm shadow-champagne/50' : 'bg-obsidian-800'
              }`}
            />
          ))}
        </div>
      )}

      {/* Step Content Card */}
      <Card className="p-8 bg-obsidian-900/90 border-obsidian-700/80 shadow-2xl relative">
        {/* STEP 1: CHOOSE SERVICE */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="font-serif text-2xl font-bold text-parchment">
                Step 1: Choose Your Specialization
              </h2>
              <p className="text-xs text-neutral-400">
                Select the core media service you wish to commission.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INITIAL_SERVICES.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => setFormData({ ...formData, serviceId: srv.id })}
                  className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                    formData.serviceId === srv.id
                      ? 'border-champagne bg-champagne/10 shadow-lg'
                      : 'border-obsidian-700/60 bg-obsidian-800/40 hover:border-obsidian-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-champagne">
                        {srv.category}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-parchment">
                        {srv.title}
                      </h3>
                    </div>
                    {formData.serviceId === srv.id && (
                      <CheckCircle2 className="w-5 h-5 text-champagne shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-2">{srv.description}</p>
                  <div className="pt-2 flex items-center justify-between border-t border-obsidian-700/40 text-xs">
                    <span className="text-neutral-400">{srv.duration}</span>
                    <span className="font-bold text-champagne">GHS {srv.basePriceGHS.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 flex justify-end">
              <Button onClick={handleNext} size="lg" className="gap-2">
                Continue to Date & Schedule
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: CHOOSE DATE */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="font-serif text-2xl font-bold text-parchment">
                Step 2: Choose Your Date
              </h2>
              <p className="text-xs text-neutral-400">
                Select your intended session or event date.
              </p>
            </div>

            <div className="space-y-4 max-w-md">
              <label className="text-xs font-semibold uppercase text-neutral-300 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-champagne" />
                Select Event / Session Date
              </label>
              <Input
                type="date"
                required
                className="text-base"
                value={formData.shootDate}
                onChange={(e) => setFormData({ ...formData, shootDate: e.target.value })}
              />
              <p className="text-xs text-neutral-500">
                * Note: Booking dates are tentatively held for 48 hours pending deposit confirmation.
              </p>
            </div>

            <div className="pt-6 flex justify-between">
              <Button variant="outline" onClick={handlePrev} className="gap-2 border-obsidian-700">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button onClick={handleNext} disabled={!formData.shootDate} size="lg" className="gap-2">
                Continue to Location
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: CHOOSE LOCATION */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="font-serif text-2xl font-bold text-parchment">
                Step 3: Choose Location & Venue
              </h2>
              <p className="text-xs text-neutral-400">
                Select the region or specific venue for your shoot.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {locations.map((loc) => (
                <div
                  key={loc}
                  onClick={() => setFormData({ ...formData, location: loc })}
                  className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                    formData.location === loc
                      ? 'border-champagne bg-champagne/10 text-champagne font-bold'
                      : 'border-obsidian-700 bg-obsidian-800/40 text-neutral-300 hover:border-obsidian-600'
                  }`}
                >
                  <span className="text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-champagne" />
                    {loc}
                  </span>
                  {formData.location === loc && <CheckCircle2 className="w-4 h-4 text-champagne" />}
                </div>
              ))}
            </div>

            <div className="pt-6 flex justify-between">
              <Button variant="outline" onClick={handlePrev} className="gap-2 border-obsidian-700">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button onClick={handleNext} size="lg" className="gap-2">
                Continue to Budget
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: BUDGET */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="font-serif text-2xl font-bold text-parchment">
                Step 4: Target Budget Range
              </h2>
              <p className="text-xs text-neutral-400">
                Help us align coverage scale, team size, and deliverables to your investment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {budgetOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => setFormData({ ...formData, budgetRange: opt })}
                  className={`p-5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    formData.budgetRange === opt
                      ? 'border-champagne bg-champagne/10 text-champagne font-bold'
                      : 'border-obsidian-700 bg-obsidian-800/40 text-neutral-300 hover:border-obsidian-600'
                  }`}
                >
                  <span className="text-base font-serif">{opt}</span>
                  {formData.budgetRange === opt && <CheckCircle2 className="w-5 h-5 text-champagne" />}
                </div>
              ))}
            </div>

            <div className="pt-6 flex justify-between">
              <Button variant="outline" onClick={handlePrev} className="gap-2 border-obsidian-700">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button onClick={handleNext} size="lg" className="gap-2">
                Continue to Project Details
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 5: PROJECT DETAILS */}
        {step === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="font-serif text-2xl font-bold text-parchment">
                Step 5: Contact Info & Vision Details
              </h2>
              <p className="text-xs text-neutral-400">
                Provide your contact information and tell us about your vision.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Full Name</label>
                <Input
                  required
                  placeholder="e.g. Kwame Mensah"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Email Address</label>
                <Input
                  required
                  type="email"
                  placeholder="kwame@example.com"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Phone Number</label>
                <Input
                  required
                  placeholder="+233 24 123 4567"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-neutral-300">Story & Specific Requirements</label>
              <textarea
                rows={4}
                className="w-full rounded-md border border-obsidian-700 bg-obsidian-900/80 px-4 py-3 text-sm text-parchment placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-champagne"
                placeholder="Tell us about the schedule, ceremony details, guest count, or key moments you want captured..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              />
            </div>

            <div className="pt-6 flex justify-between">
              <Button variant="outline" onClick={handlePrev} className="gap-2 border-obsidian-700">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!formData.clientName || !formData.clientEmail || !formData.clientPhone}
                size="lg"
                className="gap-2"
              >
                Continue to Moodboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 6: MOODBOARD & CONFIRMATION SUBMISSION */}
        {step === 6 && (
          <form onSubmit={handleSubmitBooking} className="space-y-6 animate-fade-in">
            <div>
              <h2 className="font-serif text-2xl font-bold text-parchment">
                Step 6: Moodboard & Review
              </h2>
              <p className="text-xs text-neutral-400">
                Attach inspiration Pinterest links or moodboard URLs, then confirm.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-neutral-300">Inspiration / Pinterest / Drive URL (Optional)</label>
              <Input
                placeholder="https://pinterest.com/your-board-link"
                value={formData.inspirationUrl}
                onChange={(e) => setFormData({ ...formData, inspirationUrl: e.target.value })}
              />
            </div>

            {/* Order Summary */}
            <div className="bg-obsidian-800/60 p-6 rounded-xl border border-obsidian-700 space-y-4">
              <h3 className="font-serif text-lg font-bold text-champagne border-b border-obsidian-700 pb-2">
                Booking Summary Review
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs text-neutral-300">
                <div>
                  <span className="text-neutral-500 block">Service:</span>
                  <span className="font-bold text-parchment">{selectedService.title}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Requested Date:</span>
                  <span className="font-bold text-parchment">{formData.shootDate || 'Not Specified'}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Location:</span>
                  <span className="font-bold text-parchment">{formData.location}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Client:</span>
                  <span className="font-bold text-parchment">{formData.clientName} ({formData.clientEmail})</span>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-between">
              <Button type="button" variant="outline" onClick={handlePrev} className="gap-2 border-obsidian-700">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button type="submit" disabled={submitting} size="lg" className="gap-2 px-8">
                {submitting ? 'Processing Submission...' : 'Confirm & Send Request'}
                <Sparkles className="w-4 h-4" />
              </Button>
            </div>
          </form>
        )}

        {/* STEP 7: CONFIRMATION SUCCESS */}
        {step === 7 && bookingResult && (
          <div className="text-center py-12 space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-champagne/20 border-2 border-champagne text-champagne flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="border-champagne/40 text-champagne uppercase">
                Request Recorded
              </Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-parchment">
                Thank You, {formData.clientName}!
              </h2>
              <p className="text-sm text-neutral-300 max-w-md mx-auto">
                Your booking request has been registered in the PAM Media scheduling platform.
              </p>
            </div>

            <div className="bg-obsidian-800/80 p-6 rounded-xl border border-obsidian-700 max-w-md mx-auto space-y-2">
              <span className="text-xs text-neutral-400 uppercase tracking-widest">Booking Reference</span>
              <p className="font-serif text-3xl font-bold text-champagne tracking-wider">
                {bookingResult.bookingNumber}
              </p>
              <p className="text-xs text-neutral-400 pt-2">
                A confirmation summary email has been dispatched to <strong className="text-parchment">{formData.clientEmail}</strong>.
              </p>
            </div>

            <div className="pt-6 flex justify-center gap-4">
              <Button onClick={() => (window.location.href = '/')} variant="outline" className="border-champagne/40 text-champagne">
                Return to Home
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

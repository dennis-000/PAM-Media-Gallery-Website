import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, Clock, DollarSign, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { INITIAL_SERVICES } from '@/lib/db/mock-db';

export const metadata = {
  title: 'Services & Pricing | PAM Media — Ghana',
  description: 'Explore photography and videography investment packages for luxury weddings, corporate executive branding, editorial portraits, and events in Ghana.',
};

export default function ServicesPage() {
  const faqs = [
    {
      q: 'How far in advance should we book our wedding or corporate session?',
      a: 'We recommend booking 6 to 12 months in advance for weddings, especially for peak dates in December, Easter, and August. Corporate shoots can typically be scheduled 2 to 4 weeks in advance.',
    },
    {
      q: 'What is the delivery timeline for final retouched galleries?',
      a: 'A 48-hour sneak peek gallery (20-30 retouched images) is delivered immediately following your event. Full high-resolution private client galleries are delivered within 3 to 4 weeks.',
    },
    {
      q: 'Do you travel across Ghana and internationally?',
      a: 'Yes. While our primary studio is in Airport Residential Area, Accra, we regularly shoot across Kumasi, Takoradi, Cape Coast, Aburi, as well as destination events worldwide.',
    },
    {
      q: 'How does client gallery access work?',
      a: 'Each client receives a private, PIN-protected cloud gallery where you can view high-res images, create personal favorite lists, and download single files or full zip archives.',
    },
  ];

  return (
    <div className="pt-28 pb-20 space-y-20">
      {/* Header Banner */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <Badge variant="outline" className="border-champagne/40 text-champagne">
          Investment & Experiences
        </Badge>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-parchment">
          Curated Media Packages
        </h1>
        <p className="text-lg text-neutral-300 font-light leading-relaxed">
          Transparent pricing, bespoke add-ons, and world-class craftsmanship. Tailored for individuals, couples, and brands.
        </p>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INITIAL_SERVICES.map((service) => (
            <Card key={service.id} className="relative flex flex-col justify-between overflow-hidden border-obsidian-700 bg-obsidian-900/80 hover:border-champagne/40 transition-all">
              <div>
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={service.coverImage}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent" />
                  {service.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="default">Signature Experience</Badge>
                    </div>
                  )}
                </div>

                <CardHeader className="space-y-2">
                  <span className="text-xs font-bold tracking-wider text-champagne uppercase">
                    {service.category}
                  </span>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-neutral-300 leading-relaxed text-xs">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-xs text-neutral-400 pb-3 border-b border-obsidian-700">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-champagne" />
                      {service.duration}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs uppercase font-bold text-neutral-400">Included Features:</p>
                    <ul className="space-y-2 text-xs text-neutral-300">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-champagne shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </div>

              <CardFooter className="pt-6 border-t border-obsidian-700/60 flex flex-col gap-4">
                <div className="w-full flex items-center justify-between">
                  <div>
                    <span className="text-xs text-neutral-500 block">Investment</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-bold text-champagne">
                        GHS {service.basePriceGHS.toLocaleString()}
                      </span>
                      <span className="text-xs text-neutral-400">
                        (~${service.basePriceUSD.toLocaleString()})
                      </span>
                    </div>
                  </div>
                </div>

                <Link href={`/booking?service=${service.id}`} className="w-full">
                  <Button className="w-full gap-2">
                    Reserve Experience
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-champagne uppercase">
            Questions & Clarity
          </span>
          <h2 className="font-serif text-3xl font-bold text-parchment">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <Card key={idx} className="p-6 bg-obsidian-900/60 border-obsidian-700 space-y-2">
              <h3 className="font-serif text-lg font-bold text-parchment flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-champagne shrink-0" />
                {faq.q}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed pl-6">
                {faq.a}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

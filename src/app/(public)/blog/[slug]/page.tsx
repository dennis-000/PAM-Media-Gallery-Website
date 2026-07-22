import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { persistentDb } from '@/lib/db/persistent-db';

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const articles = persistentDb.getServices() ? [
    {
      id: 'blog-1',
      title: 'Crafting Timeless Wedding Photography in Aburi & Accra',
      slug: 'crafting-timeless-wedding-photography-ghana',
      excerpt: 'How lighting, cultural nuances, and natural greenery come together to create emotional wedding portraits in West Africa.',
      content: `
        Ghanaian weddings are a vibrant blend of heritage, rich textures, kente colors, and heartfelt celebration. At PAM Media, our approach to wedding photography balances documentary intimacy with high-fashion editorial polish.

        ### 1. Harnessing the Aburi Golden Hour
        Nestled in the lush hills of the Eastern Region, Aburi offers cool ambient light and sweeping mountain backdrops. We schedule bride and groom portrait sessions during the 45-minute golden hour window just before dusk, using wide-aperture lenses (f/1.2 - f/1.4) to separate our subjects from soft botanical bokeh.

        ### 2. Preserving Kente Textures and Cultural Details
        Kente cloth is rich with symbolism and intricate hand-woven patterns. Standard digital sensors can oversaturate deep golds and royal blues. We utilize custom HSL color profiles engineered specifically for African skin tones and rich textiles, preserving the authentic craftsmanship of traditional weavers.

        ### 3. Documentary Intimacy vs Staged Perfection
        While formal family portraits are essential, the moments that evoke tears 20 years later are candid: a grandmother's tear of joy, a quiet moment between newlyweds before entering the reception, or traditional fontomfrom drummers in full rhythm.
      `,
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600',
      author: 'Pamela Media Team',
      publishedAt: 'June 20, 2026',
      readTimeMinutes: 5,
      category: 'Wedding Inspiration',
    },
    {
      id: 'blog-2',
      title: 'The Power of Executive Portraiture for Modern African Leaders',
      slug: 'executive-portraiture-modern-african-leaders',
      excerpt: 'Why high-impact visual branding is essential for executives, founders, and public figures in today’s digital market.',
      content: `
        In an era defined by first impressions, your executive photograph is often your primary introduction to global investors, press outlets, and key partners.

        ### 1. Studio Lighting for Executive Authority
        A great executive portrait balances approachability with distinct authority. At our Airport Residential studio in Accra, we employ a 3-point key lighting setup with large softboxes to create subtle catchlights and dimensional rim lighting.

        ### 2. Tethered Live Preview for Perfect Wardrobe Fit
        During executive sessions, we transmit images live to a calibrated 27-inch studio monitor. This allows CEOs and founders to review their poses, jacket tailoring, and expressions in real time, making immediate micro-adjustments.
      `,
      coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1600',
      author: 'Chief Creative Officer',
      publishedAt: 'July 5, 2026',
      readTimeMinutes: 4,
      category: 'Corporate & Branding',
    },
  ] : [];

  const article = articles.find((a) => a.slug === params.slug) || articles[0];

  return (
    <div className="pt-28 pb-20 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back to Journal */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-champagne hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to All Articles
      </Link>

      {/* Article Header */}
      <div className="space-y-4">
        <Badge variant="outline" className="border-champagne/40 text-champagne">
          {article.category}
        </Badge>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-parchment leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-6 text-xs text-neutral-400 border-y border-obsidian-800 py-3">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-champagne" /> {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-champagne" /> {article.publishedAt}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-champagne" /> {article.readTimeMinutes} min read
          </span>
        </div>
      </div>

      {/* Hero Cover */}
      <div className="relative h-96 w-full rounded-2xl overflow-hidden border border-obsidian-700 shadow-2xl">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body Content */}
      <Card className="p-8 sm:p-12 bg-obsidian-900/80 border-obsidian-700 space-y-6 text-neutral-300 leading-relaxed font-light text-base">
        {article.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.trim().startsWith('###')) {
            return (
              <h3 key={idx} className="font-serif text-2xl font-bold text-parchment pt-4">
                {paragraph.replace('###', '').trim()}
              </h3>
            );
          }
          return <p key={idx}>{paragraph.trim()}</p>;
        })}
      </Card>

      {/* Article Footer & CTA */}
      <div className="p-8 rounded-2xl bg-obsidian-900 border border-champagne/30 text-center space-y-4">
        <h3 className="font-serif text-2xl font-bold text-parchment">Ready to Capture Your Story?</h3>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          Reserve your wedding, corporate, or portrait session with PAM Media.
        </p>
        <Link href="/booking">
          <Button size="lg">Book Experience Now</Button>
        </Link>
      </div>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { INITIAL_BLOG_POSTS } from '@/lib/db/mock-db';

export const metadata = {
  title: 'Journal | Storytelling & Photography Insights — PAM Media',
  description: 'Articles, wedding guides, and executive portrait insights from PAM Media Ghana.',
};

export default function BlogPage() {
  return (
    <div className="pt-28 pb-20 space-y-12">
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <Badge variant="outline" className="border-champagne/40 text-champagne">
          Stories & Insights
        </Badge>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-parchment">
          The PAM Media Journal
        </h1>
        <p className="text-neutral-300 font-light text-base max-w-xl mx-auto">
          Reflections on Ghanaian culture, wedding planning, executive branding, and fine art photography techniques.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INITIAL_BLOG_POSTS.map((post) => (
            <Card key={post.id} className="overflow-hidden border-obsidian-700 bg-obsidian-900/60 hover:border-champagne/40 transition-all flex flex-col justify-between">
              <div>
                <div className="relative h-64 w-full">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="default">{post.category}</Badge>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-neutral-400">
                    <span>{post.publishedAt}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-champagne" />
                      {post.readTimeMinutes} min read
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-parchment hover:text-champagne transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-obsidian-800 flex items-center justify-between">
                <span className="text-xs text-neutral-400">By {post.author}</span>
                <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-champagne flex items-center gap-1 hover:underline">
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

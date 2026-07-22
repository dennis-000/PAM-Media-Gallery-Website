'use client';

import { BookOpen, Plus, Clock, Eye, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { INITIAL_BLOG_POSTS } from '@/lib/db/mock-db';

export default function AdminBlogPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            Content Marketing & Journal
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Journal & Article Publisher
          </h1>
        </div>

        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Create New Article
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INITIAL_BLOG_POSTS.map((post) => (
          <Card key={post.id} className="p-6 bg-obsidian-900/80 border-obsidian-700 space-y-4">
            <div className="space-y-2">
              <Badge variant="default" className="text-[10px]">{post.category}</Badge>
              <h3 className="font-serif font-bold text-parchment text-xl">{post.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{post.excerpt}</p>
            </div>

            <div className="pt-4 border-t border-obsidian-800 flex items-center justify-between text-xs text-neutral-400">
              <span>Published: {post.publishedAt}</span>
              <Button variant="outline" size="sm" className="h-8 border-obsidian-700 gap-1 text-xs">
                <Edit3 className="w-3.5 h-3.5" /> Edit Article
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

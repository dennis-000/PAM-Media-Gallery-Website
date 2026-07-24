'use client';

import { useState } from 'react';
import { BookOpen, Plus, Sparkles, CheckCircle2, Eye, Trash2, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuthProtection } from '@/lib/hooks/use-auth-protection';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  coverImage: string;
}

const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Art of Ghanaian Wedding Photography: Kente & Gold Heritage',
    slug: 'art-of-ghanaian-wedding-photography',
    excerpt: 'Exploring lighting setups and color profiles suited for traditional Ashanti Kente fabrics and outdoor sunset receptions.',
    category: 'Editorial Storytelling',
    author: 'Pamela Addo',
    publishedAt: 'July 18, 2026',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'b2',
    title: '5 Preparation Tips for Executive Headshot Sessions in Accra',
    slug: 'executive-headshot-preparation-tips',
    excerpt: 'How C-suite executives and founders can select wardrobes and poses for Forbes Africa and corporate PR releases.',
    category: 'Corporate Insights',
    author: 'Dennis Asiedu',
    publishedAt: 'July 12, 2026',
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200',
  },
];

export default function AdminBlogPage() {
  const { mounted, authorized } = useAuthProtection();
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [newPost, setNewPost] = useState({
    title: '',
    slug: '',
    excerpt: '',
    category: 'Editorial Storytelling',
    author: 'Pamela Addo',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
  });

  if (!mounted || !authorized) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-16 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <div key={i} className="h-64 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newPost.slug || newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const created: BlogPost = {
      ...newPost,
      id: `b-${Date.now()}`,
      slug,
      publishedAt: 'Just now',
    };
    setPosts([created, ...posts]);
    setShowModal(false);
    setNotification(`Article "${created.title}" published!`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
    setNotification('Article removed.');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-champagne text-obsidian px-6 py-3 rounded-lg font-bold shadow-2xl flex items-center gap-3 animate-fade-in text-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            Editorial CMS & Thought Leadership
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Journal & Article Publisher
          </h1>
        </div>

        <Button onClick={() => setShowModal(true)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Publish New Article
        </Button>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden border-obsidian-700 bg-obsidian-900/60 flex flex-col justify-between">
            <div>
              <div className="relative h-56 w-full">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3">
                  <Badge variant="default" className="text-[10px]">
                    {post.category}
                  </Badge>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-serif font-bold text-parchment text-xl leading-snug">{post.title}</h3>
                <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-[11px] text-neutral-400 pt-2 border-t border-obsidian-800 font-mono">
                  <span>Author: {post.author}</span>
                  <span>•</span>
                  <span>Published: {post.publishedAt}</span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 flex justify-between items-center border-t border-obsidian-800 pt-4">
              <span className="text-[11px] font-mono text-champagne">/blog/{post.slug}</span>
              <Button onClick={() => handleDelete(post.id)} variant="ghost" size="sm" className="h-8 text-red-400">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Article Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="max-w-xl w-full p-8 bg-obsidian-900 border-obsidian-700 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <h3 className="font-serif text-2xl font-bold text-parchment">Publish Journal Article</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Article Title</label>
                <Input
                  required
                  placeholder="e.g. Masterclass in Lighting Traditional Weddings"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Category</label>
                  <Input
                    required
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Author</label>
                  <Input
                    required
                    value={newPost.author}
                    onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Article Excerpt</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Brief summary for preview cards..."
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                  className="w-full p-3 rounded-md border border-obsidian-700 bg-obsidian-900 text-xs text-neutral-300"
                />
              </div>

              <Button type="submit" size="lg" className="w-full gap-2 mt-4">
                <Sparkles className="w-4 h-4" /> Publish Article Live
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

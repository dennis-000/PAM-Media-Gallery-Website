'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Send, CheckCircle2, User, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { persistentDb } from '@/lib/db/persistent-db';
import { MessageThread } from '@/lib/types';
import { useMounted } from '@/lib/hooks/use-mounted';

export default function AdminMessagesPage() {
  const mounted = useMounted();
  const [threads, setThreads] = useState<MessageThread[]>(persistentDb.getMessages());
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    async function loadData() {
      await persistentDb.syncFromApi();
      const loadedThreads = persistentDb.getMessages();
      setThreads(loadedThreads);
      if (loadedThreads.length > 0) {
        setSelectedThread(loadedThreads[0]);
      }
    }
    loadData();
  }, []);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText || !selectedThread) return;

    selectedThread.messages.push({
      id: `m-${Date.now()}`,
      sender: 'studio',
      text: replyText,
      timestamp: 'Just now',
    });

    setReplyText('');
  };

  if (!mounted) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-16 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
        <div className="h-96 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            Client Communications Channel
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Studio Communications Inbox
          </h1>
        </div>
      </div>

      {threads.length === 0 || !selectedThread ? (
        <Card className="p-16 bg-obsidian-900/40 border border-dashed border-obsidian-800 text-center space-y-4">
          <MessageSquare className="w-12 h-12 text-neutral-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-parchment">No Message Threads Yet</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Run <code className="text-champagne font-mono">npm run db:seed</code> to inject client inquiry message threads.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[650px]">
          {/* Threads List */}
          <Card className="lg:col-span-4 bg-obsidian-900/80 border-obsidian-700 p-4 space-y-3 overflow-y-auto">
            <h3 className="font-serif text-sm font-bold text-neutral-400 uppercase tracking-wider">Active Threads</h3>
            <div className="space-y-2">
              {threads.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedThread(t)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all space-y-1 ${
                    selectedThread?.id === t.id
                      ? 'border-champagne bg-champagne/10'
                      : 'border-obsidian-800 bg-obsidian-800/30 hover:border-obsidian-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-parchment text-xs">{t.clientName}</span>
                    <Badge variant="outline" className="text-[9px] border-champagne/30 text-champagne">
                      {t.channel}
                    </Badge>
                  </div>
                  <p className="text-xs text-neutral-300 line-clamp-1">{t.subject}</p>
                  <p className="text-[11px] text-neutral-500">{t.updatedAt}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Active Thread Detail & Reply */}
          <Card className="lg:col-span-8 bg-obsidian-900/80 border-obsidian-700 p-6 flex flex-col justify-between">
            <div className="space-y-6 overflow-y-auto">
              <div className="border-b border-obsidian-800 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-parchment">{selectedThread.subject}</h3>
                  <p className="text-xs text-neutral-400">
                    From: {selectedThread.clientName} ({selectedThread.clientEmail})
                  </p>
                </div>
                <Badge variant="default" className="text-xs">
                  {selectedThread.channel} Thread
                </Badge>
              </div>

              <div className="space-y-4">
                {selectedThread.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col max-w-[80%] space-y-1 ${
                      m.sender === 'studio' ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}
                  >
                    <div
                      className={`p-4 rounded-2xl text-xs leading-relaxed ${
                        m.sender === 'studio'
                          ? 'bg-champagne text-obsidian font-medium rounded-tr-none'
                          : 'bg-obsidian-800 text-neutral-200 rounded-tl-none border border-obsidian-700'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[10px] text-neutral-500">{m.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Reply Form */}
            <form onSubmit={handleSendReply} className="pt-4 border-t border-obsidian-800 flex gap-3">
              <Input
                placeholder="Type response to client..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="text-xs flex-1"
              />
              <Button type="submit" size="sm" className="gap-2">
                <Send className="w-4 h-4" /> Send Reply
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

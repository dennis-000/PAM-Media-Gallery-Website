'use client';

import { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, User, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { persistentDb } from '@/lib/db/persistent-db';
import { MessageThread } from '@/lib/types';

export default function AdminMessagesPage() {
  const threads = persistentDb.getMessages();
  const [selectedThread, setSelectedThread] = useState<MessageThread>(threads[0]);
  const [replyText, setReplyText] = useState('');

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText) return;

    selectedThread.messages.push({
      id: `m-${Date.now()}`,
      sender: 'studio',
      text: replyText,
      timestamp: 'Just now',
    });

    setReplyText('');
  };

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
                  selectedThread.id === t.id
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
                <p className="font-serif text-xs text-champagne font-semibold line-clamp-1">{t.subject}</p>
                <p className="text-[11px] text-neutral-400 line-clamp-1">{t.snippet}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Message Conversation Viewer */}
        <Card className="lg:col-span-8 bg-obsidian-900/80 border-obsidian-700 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-obsidian-800 pb-4 flex justify-between items-center">
              <div>
                <h3 className="font-serif text-xl font-bold text-parchment">{selectedThread.subject}</h3>
                <p className="text-xs text-neutral-400">{selectedThread.clientName} ({selectedThread.clientEmail})</p>
              </div>
              <Badge variant="default">{selectedThread.channel} Sync</Badge>
            </div>

            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
              {selectedThread.messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'studio' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-md p-4 rounded-xl text-xs space-y-1 ${
                      m.sender === 'studio'
                        ? 'bg-champagne/20 text-parchment border border-champagne/40'
                        : 'bg-obsidian-800 text-neutral-300 border border-obsidian-700'
                    }`}
                  >
                    <p className="font-semibold text-[10px] text-champagne uppercase">
                      {m.sender === 'studio' ? 'PAM Media Studio' : selectedThread.clientName}
                    </p>
                    <p className="leading-relaxed">{m.text}</p>
                    <span className="text-[9px] text-neutral-500 block text-right pt-1">{m.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSendReply} className="pt-4 border-t border-obsidian-800 flex gap-3">
            <Input
              placeholder="Type your response to the client..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="text-xs"
            />
            <Button type="submit" className="gap-2 shrink-0">
              <Send className="w-4 h-4" /> Send Reply
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

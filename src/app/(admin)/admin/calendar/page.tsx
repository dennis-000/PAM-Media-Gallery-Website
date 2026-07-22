'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { persistentDb } from '@/lib/db/persistent-db';

export default function AdminCalendarPage() {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'timeline'>('month');
  const bookings = persistentDb.getBookings();

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const getShootCategoryColor = (title: string) => {
    if (title.toLowerCase().includes('wedding')) return 'bg-champagne/20 border-champagne text-champagne';
    if (title.toLowerCase().includes('corporate') || title.toLowerCase().includes('brand')) return 'bg-blue-950/60 border-blue-600 text-blue-300';
    return 'bg-purple-950/60 border-purple-600 text-purple-300';
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            Studio Shoot Schedule
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Production Calendar
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-obsidian-900 border border-obsidian-700 p-1 rounded-lg">
            {(['month', 'week', 'day', 'timeline'] as const).map((m) => (
              <Button
                key={m}
                onClick={() => setViewMode(m)}
                variant={viewMode === m ? 'default' : 'ghost'}
                size="sm"
                className="text-xs uppercase"
              >
                {m}
              </Button>
            ))}
          </div>

          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Schedule Shoot
          </Button>
        </div>
      </div>

      {/* Month Header Navigation */}
      <div className="flex items-center justify-between p-4 bg-obsidian-900/80 border border-obsidian-700 rounded-xl">
        <div className="flex items-center gap-4">
          <h2 className="font-serif text-2xl font-bold text-parchment">August 2026</h2>
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            18 Scheduled Shoots
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8 border-obsidian-700">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs border-obsidian-700">
            Today
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 border-obsidian-700">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Monthly Grid View */}
      {viewMode === 'month' && (
        <Card className="p-6 bg-obsidian-900/60 border-obsidian-700 overflow-hidden">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-neutral-400 uppercase pb-4 border-b border-obsidian-800">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div className="grid grid-cols-7 gap-2 pt-4">
            {daysInMonth.map((day) => {
              const dateStr = `2026-08-${day < 10 ? '0' + day : day}`;
              const dayBookings = bookings.filter((b) => b.shootDate === dateStr || (day === 5 || day === 14 || day === 20));

              return (
                <div
                  key={day}
                  className="min-h-[110px] p-2 rounded-lg bg-obsidian-800/30 border border-obsidian-800 space-y-1 hover:border-obsidian-700 transition-colors"
                >
                  <span className="text-xs font-bold text-neutral-400 block">{day}</span>
                  {dayBookings.slice(0, 2).map((bk) => (
                    <div
                      key={bk.id}
                      className={`p-1.5 rounded text-[10px] border truncate font-medium ${getShootCategoryColor(bk.serviceTitle)}`}
                    >
                      <p className="truncate font-bold">{bk.clientName}</p>
                      <p className="truncate text-[9px] opacity-80">{bk.location.split(',')[0]}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <div className="space-y-4">
          {bookings.map((bk) => (
            <Card key={bk.id} className="p-5 bg-obsidian-900/80 border-obsidian-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl border border-champagne/40 bg-champagne/10 flex flex-col items-center justify-center font-serif text-champagne shrink-0">
                  <span className="text-xs uppercase font-bold">Aug</span>
                  <span className="text-xl font-bold">20</span>
                </div>
                <div className="space-y-1">
                  <Badge variant="outline" className="text-[10px] border-champagne/40 text-champagne">
                    {bk.serviceTitle}
                  </Badge>
                  <h3 className="font-serif font-bold text-parchment text-lg">{bk.clientName}</h3>
                  <p className="text-xs text-neutral-400 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-champagne" /> {bk.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={bk.status === 'confirmed' ? 'success' : 'outline'} className="text-xs">
                  {bk.status}
                </Badge>
                <Button variant="outline" size="sm" className="border-obsidian-700 text-xs">
                  View Shoot Order
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

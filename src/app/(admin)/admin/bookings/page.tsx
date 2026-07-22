'use client';

import { useState } from 'react';
import { Search, Filter, CalendarCheck, CheckCircle2, XCircle, Clock, Eye, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { persistentDb } from '@/lib/db/persistent-db';
import { updateBookingStatusAction } from '@/lib/actions/admin-actions';
import { Booking } from '@/lib/types';
import { INITIAL_SERVICES } from '@/lib/db/mock-db';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(persistentDb.getBookings());
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const [newBooking, setNewBooking] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceId: INITIAL_SERVICES[0].id,
    serviceTitle: INITIAL_SERVICES[0].title,
    shootDate: '',
    location: 'Accra, Ghana',
    budgetRange: 'GHS 20,000 - 35,000',
    details: '',
  });

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const created = persistentDb.addBooking(newBooking);
    setBookings(persistentDb.getBookings());
    setShowCreateModal(false);
    setNewBooking({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      serviceId: INITIAL_SERVICES[0].id,
      serviceTitle: INITIAL_SERVICES[0].title,
      shootDate: '',
      location: 'Accra, Ghana',
      budgetRange: 'GHS 20,000 - 35,000',
      details: '',
    });
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesSearch = b.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (id: string, newStatus: Booking['status']) => {
    await updateBookingStatusAction(id, newStatus);
    setBookings(persistentDb.getBookings());
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-800 pb-6">
        <div>
          <Badge variant="outline" className="border-champagne/40 text-champagne">
            Booking Operations
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Client Booking Pipeline
          </h1>
        </div>

        <Button onClick={() => setShowCreateModal(true)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Create New Booking
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-obsidian-900/80 border border-obsidian-700">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-neutral-500" />
          <Input
            placeholder="Search by client, number or venue..."
            className="pl-9 text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
            <Button
              key={st}
              onClick={() => setStatusFilter(st)}
              variant={statusFilter === st ? 'default' : 'outline'}
              size="sm"
              className="text-xs uppercase border-obsidian-700"
            >
              {st}
            </Button>
          ))}
        </div>
      </div>

      {/* Bookings Directory Table or Empty State */}
      {filteredBookings.length === 0 ? (
        <Card className="p-16 bg-obsidian-900/40 border border-dashed border-obsidian-800 text-center space-y-4">
          <CalendarCheck className="w-12 h-12 text-neutral-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-parchment">No Bookings Registered Yet</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Create your first booking or execute <code className="text-champagne font-mono">npm run db:seed</code> to inject 5 years of sample studio bookings.
            </p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Create First Booking
          </Button>
        </Card>
      ) : (
        <Card className="overflow-hidden border-obsidian-700 bg-obsidian-900/60">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-obsidian-800/80 text-neutral-400 uppercase tracking-wider border-b border-obsidian-700">
                <tr>
                  <th className="p-4">Ref Number</th>
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Shoot Date</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-obsidian-800 text-neutral-300">
                {filteredBookings.map((bk) => (
                  <tr key={bk.id} className="hover:bg-obsidian-800/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-champagne">{bk.bookingNumber}</td>
                    <td className="p-4">
                      <p className="font-bold text-parchment">{bk.clientName}</p>
                      <p className="text-[11px] text-neutral-500">{bk.clientEmail}</p>
                    </td>
                    <td className="p-4">{bk.serviceTitle}</td>
                    <td className="p-4 font-mono">{bk.shootDate}</td>
                    <td className="p-4">{bk.location}</td>
                    <td className="p-4">
                      <Badge
                        variant={
                          bk.status === 'confirmed' ? 'success' :
                          bk.status === 'pending' ? 'outline' : 'secondary'
                        }
                        className="text-[10px]"
                      >
                        {bk.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        onClick={() => setSelectedBooking(bk)}
                        variant="outline"
                        size="sm"
                        className="h-8 border-champagne/30 text-champagne text-xs gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Create Booking Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="max-w-xl w-full p-8 bg-obsidian-900 border-obsidian-700 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <h3 className="font-serif text-2xl font-bold text-parchment">Create Studio Booking</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowCreateModal(false)}>Cancel</Button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Client Name</label>
                  <Input
                    required
                    placeholder="Kwame Mensah"
                    value={newBooking.clientName}
                    onChange={(e) => setNewBooking({ ...newBooking, clientName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Client Email</label>
                  <Input
                    required
                    type="email"
                    placeholder="kwame@example.com"
                    value={newBooking.clientEmail}
                    onChange={(e) => setNewBooking({ ...newBooking, clientEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Client Phone</label>
                  <Input
                    required
                    placeholder="+233 24 000 0000"
                    value={newBooking.clientPhone}
                    onChange={(e) => setNewBooking({ ...newBooking, clientPhone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Shoot Date</label>
                  <Input
                    type="date"
                    required
                    value={newBooking.shootDate}
                    onChange={(e) => setNewBooking({ ...newBooking, shootDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Service Category</label>
                <select
                  value={newBooking.serviceId}
                  onChange={(e) => {
                    const selectedSrv = INITIAL_SERVICES.find(s => s.id === e.target.value);
                    setNewBooking({
                      ...newBooking,
                      serviceId: e.target.value,
                      serviceTitle: selectedSrv?.title || INITIAL_SERVICES[0].title,
                    });
                  }}
                  className="w-full h-11 rounded-md border border-obsidian-700 bg-obsidian-900/80 px-4 text-sm text-parchment"
                >
                  {INITIAL_SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>{s.title} ({s.category})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Venue Location</label>
                <Input
                  required
                  placeholder="e.g. Labadi Beach Hotel, Accra"
                  value={newBooking.location}
                  onChange={(e) => setNewBooking({ ...newBooking, location: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full gap-2 mt-4">
                <Sparkles className="w-4 h-4" /> Save Booking
              </Button>
            </form>
          </Card>
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full p-8 bg-obsidian-900 border-obsidian-700 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <div>
                <span className="font-mono text-xs text-champagne font-bold">{selectedBooking.bookingNumber}</span>
                <h3 className="font-serif text-2xl font-bold text-parchment">{selectedBooking.clientName}</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedBooking(null)}>Close</Button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-neutral-500 block">Service Selected:</span>
                <span className="font-bold text-parchment text-sm">{selectedBooking.serviceTitle}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Requested Date:</span>
                <span className="font-bold text-parchment text-sm">{selectedBooking.shootDate}</span>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-obsidian-800 pt-4">
              <div className="flex gap-2">
                <Button
                  onClick={() => handleStatusChange(selectedBooking.id, 'confirmed')}
                  size="sm"
                  className="bg-emerald-700 hover:bg-emerald-600 text-white gap-1 text-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Approve Booking
                </Button>
                <Button
                  onClick={() => handleStatusChange(selectedBooking.id, 'cancelled')}
                  variant="outline"
                  size="sm"
                  className="border-red-800 text-red-400 hover:bg-red-950/40 text-xs gap-1"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  Decline
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedBooking(null)}>
                Done
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

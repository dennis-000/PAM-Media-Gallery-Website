'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, CalendarCheck, CheckCircle2, XCircle, Clock, Eye, Plus, Sparkles, ExternalLink, FileText, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { persistentDb } from '@/lib/db/persistent-db';
import { updateBookingStatusAction } from '@/lib/actions/admin-actions';
import { submitBookingAction } from '@/lib/actions/booking-actions';
import { Booking } from '@/lib/types';
import { INITIAL_SERVICES } from '@/lib/db/mock-db';
import { useAuthProtection } from '@/lib/hooks/use-auth-protection';

export default function AdminBookingsPage() {
  const { mounted, authorized } = useAuthProtection();
  const [bookings, setBookings] = useState<Booking[]>(persistentDb.getBookings());
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [newBooking, setNewBooking] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceId: INITIAL_SERVICES[0].id,
    serviceTitle: INITIAL_SERVICES[0].title,
    shootDate: '',
    location: 'Accra, Ghana',
    budgetRange: 'GH₵ 20,000 - 35,000',
    details: '',
    inspirationUrl: '',
  });

  useEffect(() => {
    async function loadData() {
      await persistentDb.syncFromApi();
      setBookings(persistentDb.getBookings());
    }
    loadData();
  }, []);

  if (!mounted || !authorized) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-16 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
        <div className="h-64 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
      </div>
    );
  }

  const handleStatusChange = async (id: string, status: Booking['status']) => {
    await updateBookingStatusAction(id, status);
    
    // Automatically create a Project & Invoice if Approved
    if (status === 'confirmed') {
      const targetBk = bookings.find(b => b.id === id);
      if (targetBk) {
        persistentDb.addProject({
          title: `${targetBk.clientName} — ${targetBk.serviceTitle}`,
          clientName: targetBk.clientName,
          clientEmail: targetBk.clientEmail,
          stage: 'planning',
          shootDate: targetBk.shootDate,
          dueDate: targetBk.shootDate,
          assignedLead: 'Pamela Asiedu',
          totalPhotosExpected: 250,
        });

        persistentDb.createInvoice({
          clientName: targetBk.clientName,
          clientEmail: targetBk.clientEmail,
          serviceTitle: targetBk.serviceTitle,
          subtotalGHS: 25000,
          vatGHS: 3750,
          totalGHS: 28750,
          status: 'sent',
          dueDate: targetBk.shootDate,
        });
      }
      setNotification(`Booking approved! Created active project & draft invoice for ${targetBk?.clientName}.`);
    } else {
      setNotification(`Booking status updated to ${status}.`);
    }

    setTimeout(() => setNotification(null), 4000);
    setBookings(persistentDb.getBookings());
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({ ...selectedBooking, status });
    }
  };

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitBookingAction(newBooking);
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
      budgetRange: 'GH₵ 20,000 - 35,000',
      details: '',
      inspirationUrl: '',
    });
    setNotification('New booking inquiry saved!');
    setTimeout(() => setNotification(null), 3500);
  };

  const filteredBookings = bookings.filter((bk) => {
    const matchesStatus = statusFilter === 'all' || bk.status === statusFilter;
    const matchesSearch =
      bk.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bk.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bk.clientEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
            Studio Operations Management
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Client Bookings & Inquiries
          </h1>
        </div>

        <Button onClick={() => setShowCreateModal(true)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          New Booking Entry
        </Button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-obsidian-900/80 border border-obsidian-700/80">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
          <Input
            placeholder="Search ref number, client name, or email..."
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

      {/* Bookings Directory Table */}
      {filteredBookings.length === 0 ? (
        <Card className="p-16 bg-obsidian-900/40 border border-dashed border-obsidian-800 text-center space-y-4">
          <CalendarCheck className="w-12 h-12 text-neutral-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-parchment">No Bookings Registered</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Create your first booking entry or execute seed command.
            </p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Create Booking Entry
          </Button>
        </Card>
      ) : (
        <Card className="overflow-hidden border-obsidian-700 bg-obsidian-900/60">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-obsidian-800/80 text-neutral-400 uppercase tracking-wider border-b border-obsidian-700 font-mono">
                <tr>
                  <th className="p-4">Ref Number</th>
                  <th className="p-4">Client Details</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Shoot Date</th>
                  <th className="p-4">Venue Location</th>
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
                      <p className="text-[11px] text-neutral-500 font-mono">{bk.clientEmail}</p>
                    </td>
                    <td className="p-4">{bk.serviceTitle}</td>
                    <td className="p-4 font-mono">{bk.shootDate}</td>
                    <td className="p-4">{bk.location}</td>
                    <td className="p-4">
                      <Badge
                        variant={
                          bk.status === 'confirmed' ? 'default' :
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
              <h3 className="font-serif text-2xl font-bold text-parchment">Create Studio Booking Entry</h3>
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
                <label className="text-xs font-semibold uppercase text-neutral-300">Inspiration / Pinterest / Drive Link</label>
                <Input
                  placeholder="https://pinterest.com/pin/12345 or Google Drive URL"
                  value={newBooking.inspirationUrl}
                  onChange={(e) => setNewBooking({ ...newBooking, inspirationUrl: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full gap-2 mt-4">
                <Sparkles className="w-4 h-4" /> Save Booking Inquiry
              </Button>
            </form>
          </Card>
        </div>
      )}

      {/* Booking Details & Action Modal */}
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

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-neutral-500 block">Service Selected:</span>
                <span className="font-bold text-parchment text-sm">{selectedBooking.serviceTitle}</span>
              </div>
              <div className="space-y-1">
                <span className="text-neutral-500 block">Shoot Date & Location:</span>
                <span className="font-bold text-parchment text-sm">{selectedBooking.shootDate} ({selectedBooking.location})</span>
              </div>
              <div className="space-y-1">
                <span className="text-neutral-500 block">Client Contact Info:</span>
                <span className="text-neutral-300 block">{selectedBooking.clientEmail} • {selectedBooking.clientPhone}</span>
              </div>
              <div className="space-y-1">
                <span className="text-neutral-500 block">Budget Range:</span>
                <span className="font-bold text-champagne">{selectedBooking.budgetRange || 'GH₵ 25,000'}</span>
              </div>
            </div>

            {/* Inspiration Link Section */}
            <div className="p-4 rounded-xl bg-obsidian-950 border border-obsidian-800 space-y-2">
              <span className="text-xs text-neutral-400 font-semibold uppercase flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-champagne" />
                Client Inspiration Board / Drive Link
              </span>
              {selectedBooking.inspirationUrl ? (
                <a
                  href={selectedBooking.inspirationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-champagne hover:underline flex items-center gap-1 truncate"
                >
                  {selectedBooking.inspirationUrl}
                </a>
              ) : (
                <p className="text-xs text-neutral-500 italic">No Pinterest/Drive link attached by client.</p>
              )}
            </div>

            {selectedBooking.details && (
              <div className="space-y-1 text-xs">
                <span className="text-neutral-500 font-semibold block">Client Event Details & Notes:</span>
                <p className="p-3 rounded-lg bg-obsidian-950 border border-obsidian-800 text-neutral-300 leading-relaxed">
                  {selectedBooking.details}
                </p>
              </div>
            )}

            {/* Action Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-obsidian-800 pt-4">
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => handleStatusChange(selectedBooking.id, 'confirmed')}
                  size="sm"
                  className="bg-emerald-700 hover:bg-emerald-600 text-white gap-1 text-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Approve Booking & Create Project
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

              <Link href="/admin/invoices">
                <Button variant="outline" size="sm" className="text-xs border-champagne/40 text-champagne gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  Go to Invoices Manager
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

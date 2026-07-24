'use client';

import { useState, useEffect } from 'react';
import { FileSpreadsheet, Plus, DollarSign, CheckCircle2, Clock, Eye, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { persistentDb } from '@/lib/db/persistent-db';
import { useAuthProtection } from '@/lib/hooks/use-auth-protection';
import { Invoice } from '@/lib/types';
import { INITIAL_SERVICES } from '@/lib/db/mock-db';

export default function AdminInvoicesPage() {
  const { mounted, authorized } = useAuthProtection();
  const [invoices, setInvoices] = useState<Invoice[]>(persistentDb.getInvoices());
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [newInvoice, setNewInvoice] = useState({
    clientName: '',
    clientEmail: '',
    serviceTitle: INITIAL_SERVICES[0].title,
    subtotalGHS: 25000,
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  useEffect(() => {
    async function loadData() {
      await persistentDb.syncFromApi();
      setInvoices(persistentDb.getInvoices());
    }
    loadData();
  }, []);

  if (!mounted || !authorized) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-16 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
        <div className="h-96 bg-obsidian-900 border border-obsidian-800 rounded-xl" />
      </div>
    );
  }

  const vatGHS = Math.round(newInvoice.subtotalGHS * 0.15);
  const totalGHS = newInvoice.subtotalGHS + vatGHS;

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    persistentDb.createInvoice({
      clientName: newInvoice.clientName,
      clientEmail: newInvoice.clientEmail,
      serviceTitle: newInvoice.serviceTitle,
      subtotalGHS: newInvoice.subtotalGHS,
      vatGHS,
      totalGHS,
      status: 'pending',
      dueDate: newInvoice.dueDate,
    });
    setInvoices(persistentDb.getInvoices());
    setShowModal(false);
    setNotification(`Invoice created for ${newInvoice.clientName}!`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleMarkPaid = (id: string) => {
    persistentDb.markInvoicePaid(id);
    setInvoices(persistentDb.getInvoices());
    setNotification('Invoice marked as PAID!');
    setTimeout(() => setNotification(null), 3500);
  };

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + (i.amountPaidGHS || 0), 0);
  const totalPending = invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + (i.amountDueGHS || 0), 0);

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
            Financial Operations
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-parchment mt-1">
            Studio Invoices & Billing
          </h1>
        </div>

        <Button onClick={() => setShowModal(true)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Create Invoice
        </Button>
      </div>

      {/* Invoice Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-5 bg-obsidian-900/80 border-obsidian-700 space-y-1">
          <span className="text-xs text-neutral-400 uppercase font-mono">Paid Receipts</span>
          <p className="font-serif text-3xl font-bold text-emerald-400">GH₵ {totalPaid.toLocaleString()}</p>
          <p className="text-xs text-neutral-500">Settled Account Invoices</p>
        </Card>
        <Card className="p-5 bg-obsidian-900/80 border-obsidian-700 space-y-1">
          <span className="text-xs text-neutral-400 uppercase font-mono">Pending Balances</span>
          <p className="font-serif text-3xl font-bold text-champagne">GH₵ {totalPending.toLocaleString()}</p>
          <p className="text-xs text-neutral-500">Outstanding Invoices</p>
        </Card>
        <Card className="p-5 bg-obsidian-900/80 border-obsidian-700 space-y-1">
          <span className="text-xs text-neutral-400 uppercase font-mono">MoMo & Bank Direct</span>
          <p className="font-serif text-3xl font-bold text-parchment">100% Verified</p>
          <p className="text-xs text-neutral-500">MTN MoMo & Telecel Active</p>
        </Card>
      </div>

      {/* Invoices Directory Table */}
      <Card className="overflow-hidden border-obsidian-700 bg-obsidian-900/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-obsidian-800/80 text-neutral-400 uppercase tracking-wider border-b border-obsidian-700 font-mono">
              <tr>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Client</th>
                <th className="p-4">Service</th>
                <th className="p-4">Amount Due</th>
                <th className="p-4">Amount Paid</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-800 text-neutral-300">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-obsidian-800/40">
                  <td className="p-4 font-mono font-bold text-champagne">{inv.invoiceNumber}</td>
                  <td className="p-4">
                    <p className="font-bold text-parchment">{inv.clientName}</p>
                    <p className="text-[11px] text-neutral-500 font-mono">{inv.clientEmail}</p>
                  </td>
                  <td className="p-4">{inv.serviceTitle || 'Luxury Photography'}</td>
                  <td className="p-4 font-serif font-bold text-parchment">GH₵ {(inv.amountDueGHS || inv.totalGHS || 0).toLocaleString()}</td>
                  <td className="p-4 font-serif font-bold text-emerald-400">GH₵ {(inv.amountPaidGHS || 0).toLocaleString()}</td>
                  <td className="p-4 font-mono">{inv.dueDate}</td>
                  <td className="p-4">
                    <Badge variant={inv.status === 'paid' ? 'default' : 'outline'} className="text-[10px]">
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    {inv.status !== 'paid' && (
                      <Button onClick={() => handleMarkPaid(inv.id)} size="sm" className="h-8 text-xs bg-emerald-700 hover:bg-emerald-600">
                        Mark Paid
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Invoice Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 bg-obsidian-900 border-obsidian-700 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <h3 className="font-serif text-2xl font-bold text-parchment">Create Studio Invoice</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Client Name</label>
                <Input
                  required
                  placeholder="Kwame Mensah"
                  value={newInvoice.clientName}
                  onChange={(e) => setNewInvoice({ ...newInvoice, clientName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Client Email</label>
                <Input
                  required
                  type="email"
                  placeholder="kwame@example.com"
                  value={newInvoice.clientEmail}
                  onChange={(e) => setNewInvoice({ ...newInvoice, clientEmail: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-300">Service Line Item</label>
                <Input
                  required
                  value={newInvoice.serviceTitle}
                  onChange={(e) => setNewInvoice({ ...newInvoice, serviceTitle: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Subtotal (GH₵)</label>
                  <Input
                    type="number"
                    required
                    value={newInvoice.subtotalGHS}
                    onChange={(e) => setNewInvoice({ ...newInvoice, subtotalGHS: Number(e.target.value) })}
                    className="font-mono text-champagne font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-300">Due Date</label>
                  <Input
                    type="date"
                    required
                    value={newInvoice.dueDate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-950 border border-obsidian-800 space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Subtotal:</span>
                  <span className="text-parchment">GH₵ {newInvoice.subtotalGHS.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">VAT (15%):</span>
                  <span className="text-parchment">GH₵ {vatGHS.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-obsidian-800 pt-2 font-bold text-sm">
                  <span className="text-champagne">Grand Total Due:</span>
                  <span className="text-champagne">GH₵ {totalGHS.toLocaleString()}</span>
                </div>
              </div>

              <Button type="submit" className="w-full gap-2 mt-4">
                <Sparkles className="w-4 h-4" /> Issue Official Studio Invoice
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

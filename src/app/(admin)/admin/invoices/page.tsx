'use client';

import { useState } from 'react';
import { FileSpreadsheet, Plus, DollarSign, CheckCircle2, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { persistentDb } from '@/lib/db/persistent-db';

export default function AdminInvoicesPage() {
  const invoices = persistentDb.getInvoices();

  return (
    <div className="space-y-8">
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

        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Create Invoice
        </Button>
      </div>

      {/* Invoice Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-5 bg-obsidian-900/80 border-obsidian-700 space-y-1">
          <span className="text-xs text-neutral-400 uppercase">Paid Invoices</span>
          <p className="font-serif text-3xl font-bold text-emerald-400">GHS 23,000</p>
          <p className="text-xs text-neutral-500">Settled Account Invoices</p>
        </Card>
        <Card className="p-5 bg-obsidian-900/80 border-obsidian-700 space-y-1">
          <span className="text-xs text-neutral-400 uppercase">Pending Deposits</span>
          <p className="font-serif text-3xl font-bold text-champagne">GHS 12,500</p>
          <p className="text-xs text-neutral-500">Outstanding Balance</p>
        </Card>
        <Card className="p-5 bg-obsidian-900/80 border-obsidian-700 space-y-1">
          <span className="text-xs text-neutral-400 uppercase">Overdue Collections</span>
          <p className="font-serif text-3xl font-bold text-neutral-400">GHS 0</p>
          <p className="text-xs text-neutral-500">Zero Default Rate</p>
        </Card>
      </div>

      {/* Invoices Directory Table */}
      <Card className="overflow-hidden border-obsidian-700 bg-obsidian-900/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-obsidian-800/80 text-neutral-400 uppercase tracking-wider border-b border-obsidian-700">
              <tr>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Client</th>
                <th className="p-4">Amount Due</th>
                <th className="p-4">Amount Paid</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-800 text-neutral-300">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-obsidian-800/40">
                  <td className="p-4 font-mono font-bold text-champagne">{inv.invoiceNumber}</td>
                  <td className="p-4">
                    <p className="font-bold text-parchment">{inv.clientName}</p>
                    <p className="text-[11px] text-neutral-500">{inv.clientEmail}</p>
                  </td>
                  <td className="p-4 font-serif font-bold text-parchment">GHS {inv.amountDueGHS.toLocaleString()}</td>
                  <td className="p-4 font-serif font-bold text-emerald-400">GHS {inv.amountPaidGHS.toLocaleString()}</td>
                  <td className="p-4 font-mono">{inv.dueDate}</td>
                  <td className="p-4">
                    <Badge variant={inv.status === 'paid' ? 'success' : 'outline'} className="text-[10px]">
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="outline" size="sm" className="h-8 text-xs border-champagne/30 text-champagne">
                      View PDF Invoice
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

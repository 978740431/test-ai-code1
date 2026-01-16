"use client";

import React, { useState } from 'react';
import { Invoice, InvoiceStatus, EmailStatus } from '../types';

interface NewInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: Invoice) => void;
}

/**
 * NewInvoiceModal allows users to create a new invoice entry.
 */
export const NewInvoiceModal: React.FC<NewInvoiceModalProps> = ({ isOpen, onClose, onSave }) => {
  const [clientName, setClientName] = useState('');
  const [amount, setAmount] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!clientName || !amount) {
      alert('Please fill in all fields');
      return;
    }

    const newInvoice: Invoice = {
      id: Math.random().toString(36).substring(2, 9),
      invoiceNumber: `INV-${Math.floor(10000 + Math.random() * 90000)}`,
      clientName,
      issueDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      emailStatus: EmailStatus.UNSENT,
      status: InvoiceStatus.PENDING,
      amount: parseFloat(amount),
    };

    onSave(newInvoice);
    setClientName('');
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-lg p-8 shadow-2xl border border-gray-200 dark:border-gray-800 transform transition-all animate-in zoom-in-95 duration-200">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-primary dark:text-white uppercase tracking-tight">New Invoice</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-widest">Client Name</label>
            <input 
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Acme Cloud Services"
              className="w-full h-12 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl px-4 text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-widest">Total Amount ($)</label>
            <input 
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full h-12 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl px-4 text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
            />
          </div>

          <div className="pt-6 flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-400 rounded-xl font-black hover:bg-slate-200 transition-all uppercase tracking-widest text-xs"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="flex-1 py-4 bg-primary text-white rounded-xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs"
            >
              Create Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

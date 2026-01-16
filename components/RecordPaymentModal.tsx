"use client";

import React from 'react';

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceBalance: number;
}

/**
 * RecordPaymentModal provides a simple interface for confirming a payment against an invoice.
 */
export const RecordPaymentModal: React.FC<RecordPaymentModalProps> = ({ isOpen, onClose, invoiceBalance }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md p-8 shadow-2xl border border-gray-200 dark:border-gray-800 transform transition-all animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-success/10 rounded-xl flex items-center justify-center text-success">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <h2 className="text-xl font-black text-primary dark:text-white uppercase tracking-tight">Record Payment</h2>
          </div>
          <button 
            onClick={onClose} 
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-slate-100 dark:border-gray-800">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Total Balance Due</p>
            <p className="text-4xl font-black text-primary dark:text-white">
              ${invoiceBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={onClose} 
              className="w-full py-4 bg-primary text-white rounded-xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs"
            >
              Confirm Full Payment
            </button>
            <button 
              onClick={onClose}
              className="w-full py-4 bg-white dark:bg-gray-800 text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-gray-700 rounded-xl font-black hover:bg-slate-50 transition-all uppercase tracking-widest text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


import React from 'react';

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceBalance: number;
}

export const RecordPaymentModal: React.FC<RecordPaymentModalProps> = ({ isOpen, onClose, invoiceBalance }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl shadow-2xl border border-border-slate dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-border-slate dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-primary dark:text-white">Record Payment</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-gray-800/50 rounded-lg border border-slate-100 dark:border-gray-800">
            <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">receipt_long</span>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Invoice Balance</p>
              <p className="text-lg font-black text-primary dark:text-white">${invoiceBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="pb-1 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-tight">Mark as fully paid</span>
                <span className="text-[11px] text-slate-500">Update invoice status to "Paid" automatically</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input checked readOnly className="sr-only peer" type="checkbox"/>
                <div className="relative w-10 h-5 bg-slate-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-tight mb-1.5">Amount Received</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input className="w-full pl-7 pr-4 py-2 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded text-sm font-semibold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" type="text" defaultValue={invoiceBalance.toFixed(2)}/>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-tight mb-1.5">Payment Date</label>
              <input className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded text-sm font-semibold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" type="date" defaultValue="2023-10-24"/>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-tight mb-1.5">Payment Method</label>
              <select className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded text-sm font-semibold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                <option>Bank Transfer</option>
                <option>Stripe (Card)</option>
                <option>Cash</option>
                <option>PayPal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-tight mb-1.5">Reference #</label>
              <input className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded text-sm font-semibold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="e.g. TXN-99201" type="text"/>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 dark:bg-gray-800/30 border-t border-border-slate dark:border-gray-800 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-gray-400 hover:text-primary transition-colors">Cancel</button>
          <button onClick={onClose} className="px-6 py-2 bg-primary text-white rounded text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors">Save Payment</button>
        </div>
      </div>
    </div>
  );
};

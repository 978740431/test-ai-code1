
import React, { useState, useMemo } from 'react';
import { MOCK_CLIENTS, MOCK_ITEMS } from '../constants';
import { Invoice, InvoiceStatus, EmailStatus } from '../types';

interface NewInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: Invoice) => void;
}

export const NewInvoiceModal: React.FC<NewInvoiceModalProps> = ({ isOpen, onClose, onSave }) => {
  const [selectedClientId, setSelectedClientId] = useState(MOCK_CLIENTS[0].id);
  const [lineItems, setLineItems] = useState<{ itemId: string; quantity: number }[]>([
    { itemId: MOCK_ITEMS[0].id, quantity: 1 }
  ]);
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });

  const totals = useMemo(() => {
    const subtotal = lineItems.reduce((acc, line) => {
      const item = MOCK_ITEMS.find(i => i.id === line.itemId);
      return acc + (item ? item.amount * line.quantity : 0);
    }, 0);
    const tax = subtotal * 0.1; // 10% mock tax
    return { subtotal, tax, total: subtotal + tax };
  }, [lineItems]);

  if (!isOpen) return null;

  const handleAddLine = () => setLineItems([...lineItems, { itemId: MOCK_ITEMS[0].id, quantity: 1 }]);
  const handleRemoveLine = (index: number) => setLineItems(lineItems.filter((_, i) => i !== index));

  const handleSave = () => {
    const client = MOCK_CLIENTS.find(c => c.id === selectedClientId);
    const newInvoice: Invoice = {
      id: Math.random().toString(36).substr(2, 9),
      invoiceNumber: `INV-${Math.floor(10000 + Math.random() * 90000)}`,
      clientName: client?.name || 'Unknown Client',
      issueDate: new Date(issueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      dueDate: new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      emailStatus: EmailStatus.UNSENT,
      status: InvoiceStatus.DRAFT,
      amount: totals.total,
    };
    onSave(newInvoice);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-border-slate dark:border-gray-700 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-8 py-5 border-b border-border-slate dark:border-gray-800 flex items-center justify-between bg-slate-50 dark:bg-gray-800/50">
          <div>
            <h3 className="text-xl font-black text-primary dark:text-white">Create New Invoice</h3>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-0.5">Draft Mode</p>
          </div>
          <button onClick={onClose} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Bill To</label>
              <select 
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-xl font-bold text-primary dark:text-white focus:ring-2 focus:ring-primary/20 transition-all"
              >
                {MOCK_CLIENTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {selectedClientId && (
                <div className="p-4 bg-slate-50 dark:bg-gray-800/30 rounded-xl border border-dashed border-slate-200 dark:border-gray-700">
                   <p className="text-sm font-semibold text-slate-700 dark:text-gray-300">
                     {MOCK_CLIENTS.find(c => c.id === selectedClientId)?.address}
                   </p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Issue Date</label>
                <input 
                  type="date" 
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-xl text-sm font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Due Date</label>
                <input 
                  type="date" 
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-xl text-sm font-bold" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border-slate dark:border-gray-800 pb-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Line Items</label>
              <button onClick={handleAddLine} className="text-xs font-black text-blue-500 hover:text-blue-600 flex items-center gap-1">
                <span className="material-symbols-outlined !text-sm">add_circle</span> Add Item
              </button>
            </div>
            
            <div className="space-y-3">
              {lineItems.map((line, idx) => (
                <div key={idx} className="flex items-end gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex-1 space-y-1.5">
                    <select 
                      value={line.itemId}
                      onChange={(e) => {
                        const newLines = [...lineItems];
                        newLines[idx].itemId = e.target.value;
                        setLineItems(newLines);
                      }}
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-xl text-sm font-bold"
                    >
                      {MOCK_ITEMS.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                  </div>
                  <div className="w-24 space-y-1.5">
                    <input 
                      type="number" 
                      min="1"
                      value={line.quantity}
                      onChange={(e) => {
                        const newLines = [...lineItems];
                        newLines[idx].quantity = parseInt(e.target.value) || 0;
                        setLineItems(newLines);
                      }}
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-xl text-sm font-bold text-center" 
                    />
                  </div>
                  <div className="w-32 text-right py-2.5">
                    <p className="text-sm font-black text-primary dark:text-white">
                      ${((MOCK_ITEMS.find(i => i.id === line.itemId)?.amount || 0) * line.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <button onClick={() => handleRemoveLine(idx)} className="p-2.5 text-slate-300 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-8 py-6 bg-slate-50 dark:bg-gray-800/50 border-t border-border-slate dark:border-gray-800 flex justify-between items-center">
          <div className="flex gap-8">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subtotal</p>
              <p className="text-sm font-bold text-slate-600 dark:text-gray-400">${totals.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tax (10%)</p>
              <p className="text-sm font-bold text-slate-600 dark:text-gray-400">${totals.tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="text-right pl-4 border-l border-slate-200 dark:border-gray-700">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Due</p>
              <p className="text-2xl font-black text-primary dark:text-white">${totals.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={onClose} className="px-6 py-2.5 text-sm font-black text-slate-500 hover:text-primary transition-colors">Discard</button>
            <button onClick={handleSave} className="px-8 py-2.5 bg-primary text-white rounded-xl text-sm font-black shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">Save & Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

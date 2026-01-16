
import React, { useState, useRef, useEffect } from 'react';
import { Invoice, InvoiceStatus, EmailStatus } from '../types';

interface InvoiceTableProps {
  invoices: Invoice[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onRecordPayment: (id: string) => void;
  onNewInvoice: () => void;
  onExport: () => void;
}

export const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices, selectedIds, onToggleSelect, onRecordPayment, onNewInvoice, onExport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.PAID:
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 text-success text-[10px] font-black uppercase tracking-tighter"><span className="w-1.5 h-1.5 rounded-full bg-success"></span>Paid</span>;
      case InvoiceStatus.PENDING:
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-tighter"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>Pending</span>;
      case InvoiceStatus.OVERDUE:
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[10px] font-black uppercase tracking-tighter"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Overdue</span>;
      case InvoiceStatus.DRAFT:
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-tighter"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>Draft</span>;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-transparent">
      <header className="flex h-20 items-center justify-between px-8 border-b border-border-slate dark:border-gray-800 shrink-0">
        <div className="flex flex-col">
          <h2 className="text-2xl font-black text-primary dark:text-white tracking-tight">Invoice Ledger</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Total: {invoices.length} Entries</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onExport} className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-xl text-sm font-black text-slate-700 dark:text-gray-300 hover:bg-slate-50 transition-all active:scale-95">
            <span className="material-symbols-outlined !text-xl">upload</span>
            Export
          </button>
          <button onClick={onNewInvoice} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95">
            <span className="material-symbols-outlined !text-xl">add</span>
            Create Invoice
          </button>
        </div>
      </header>
      
      <div className="px-8 py-6 bg-slate-50/50 dark:bg-transparent border-b border-border-slate dark:border-gray-800 flex items-center justify-between">
        <div className="relative flex items-center w-full max-w-xl">
          <span className="material-symbols-outlined absolute left-4 text-slate-400">search</span>
          <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-2xl pl-12 pr-4 text-sm font-semibold focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm" 
            placeholder="Search by invoice number, client or status..."
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 rounded-xl text-xs font-black uppercase tracking-widest">
            <span className="material-symbols-outlined !text-lg">tune</span>
            Filters: Active
          </div>
          <button onClick={() => setSearchTerm('')} className="text-xs font-black text-primary dark:text-blue-400 hover:underline px-2">Clear</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-8 py-8">
        <div className="bg-white dark:bg-gray-900 border border-border-slate dark:border-gray-800 rounded-3xl shadow-sm overflow-visible flex flex-col">
          <div className="overflow-visible">
            <table className="w-full text-left condensed-grid border-collapse min-w-[900px]">
              <thead className="bg-slate-50/80 dark:bg-gray-800/80 text-[#5c738a] dark:text-gray-400 border-b border-border-slate dark:border-gray-700 backdrop-blur-sm sticky top-0 z-20">
                <tr>
                  <th className="w-16 py-5 text-center">
                    <input 
                      type="checkbox" 
                      className="rounded-md h-5 w-5 text-primary focus:ring-primary border-slate-300 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                      onChange={(e) => {
                         if (e.target.checked) filteredInvoices.forEach(inv => !selectedIds.has(inv.id) && onToggleSelect(inv.id));
                         else filteredInvoices.forEach(inv => selectedIds.has(inv.id) && onToggleSelect(inv.id));
                      }}
                    />
                  </th>
                  <th className="font-black uppercase tracking-widest text-[10px] py-5">
                    <div className="flex items-center gap-1.5 group cursor-pointer hover:text-primary transition-colors">
                      Invoice ID <span className="material-symbols-outlined !text-sm">unfold_more</span>
                    </div>
                  </th>
                  <th className="font-black uppercase tracking-widest text-[10px] py-5">Client Name</th>
                  <th className="font-black uppercase tracking-widest text-[10px] py-5">Issue Date</th>
                  <th className="font-black uppercase tracking-widest text-[10px] py-5">Due Date</th>
                  <th className="font-black uppercase tracking-widest text-[10px] py-5 text-center">Messaging</th>
                  <th className="font-black uppercase tracking-widest text-[10px] py-5">Status</th>
                  <th className="font-black uppercase tracking-widest text-[10px] py-5 text-right">Amount Due</th>
                  <th className="w-16 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-slate dark:divide-gray-800">
                {filteredInvoices.map(inv => (
                  <tr 
                    key={inv.id} 
                    className={`group hover:bg-slate-50 dark:hover:bg-blue-500/5 transition-all border-l-4 border-l-transparent relative ${selectedIds.has(inv.id) ? 'bg-blue-50/50 dark:bg-blue-500/5 border-l-primary' : ''}`}
                    onClick={() => onToggleSelect(inv.id)}
                  >
                    <td className="text-center py-5" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.has(inv.id)}
                        className="rounded-md h-5 w-5 text-primary focus:ring-primary border-slate-300 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                        onChange={() => onToggleSelect(inv.id)}
                      />
                    </td>
                    <td className="font-black text-primary dark:text-blue-400 py-5">{inv.invoiceNumber}</td>
                    <td className="font-bold text-slate-700 dark:text-gray-300 py-5">{inv.clientName}</td>
                    <td className="text-slate-500 font-medium py-5">{inv.issueDate}</td>
                    <td className="text-slate-500 font-medium py-5">{inv.dueDate}</td>
                    <td className="text-center py-5">
                      <div className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${inv.emailStatus === EmailStatus.SENT ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        <span className="material-symbols-outlined !text-[14px]">
                          {inv.emailStatus === EmailStatus.SENT ? 'mail_lock' : 'mail_outline'}
                        </span>
                        {inv.emailStatus === EmailStatus.SENT ? 'Delivered' : 'Awaiting'}
                      </div>
                    </td>
                    <td className="py-5">{getStatusBadge(inv.status)}</td>
                    <td className={`font-black text-right py-5 text-base ${inv.status === InvoiceStatus.OVERDUE ? 'text-red-600' : 'text-primary dark:text-white'}`}>
                      ${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-5 px-4 text-center overflow-visible" onClick={(e) => e.stopPropagation()}>
                      <div className="relative inline-block text-left">
                        <button 
                          onClick={() => setActiveMenuId(activeMenuId === inv.id ? null : inv.id)} 
                          className={`h-9 w-9 flex items-center justify-center rounded-xl transition-all ${activeMenuId === inv.id ? 'bg-primary text-white' : 'text-slate-300 hover:text-primary hover:bg-primary/10 opacity-0 group-hover:opacity-100'}`}
                        >
                           <span className="material-symbols-outlined">more_vert</span>
                        </button>
                        
                        {activeMenuId === inv.id && (
                          <div ref={menuRef} className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                            <div className="py-1">
                              <button 
                                onClick={() => { onRecordPayment(inv.id); setActiveMenuId(null); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors"
                              >
                                <span className="material-symbols-outlined !text-lg text-primary">payments</span>
                                Record payment
                              </button>
                              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
                                <span className="material-symbols-outlined !text-lg">mail</span>
                                Email
                              </button>
                              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
                                <span className="material-symbols-outlined !text-lg">print</span>
                                Print
                              </button>
                              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
                                <span className="material-symbols-outlined !text-lg">content_copy</span>
                                Copy
                              </button>
                              <div className="h-px bg-slate-100 dark:bg-gray-700 my-1"></div>
                              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                <span className="material-symbols-outlined !text-lg">delete</span>
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-5 bg-slate-50/50 dark:bg-gray-800/30 border-t border-border-slate dark:border-gray-700 flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-widest">
            <div>Result 1 - {filteredInvoices.length} of {invoices.length}</div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 hover:text-primary transition-colors disabled:opacity-20" disabled>
                <span className="material-symbols-outlined !text-lg">arrow_back</span> Previous
              </button>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-lg text-primary shadow-sm">1</span>
                <span>of 32</span>
              </div>
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                Next <span className="material-symbols-outlined !text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

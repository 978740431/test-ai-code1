"use client";

import React, { useState } from 'react';
import { Client } from '../types';
import { MOCK_CLIENTS } from '../constants';

/**
 * ClientManagement handles the customer database, providing a list view with advanced 
 * filtering and a detailed creation/editing experience.
 */
export const ClientManagement: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingClient(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingClient(null);
  };

  if (isFormOpen) {
    return (
      <div className="flex flex-col h-full bg-background-light font-display animate-in fade-in duration-300">
        <header className="h-16 bg-white border-b border-border-slate flex items-center justify-between px-8 shrink-0 z-50">
          <div className="flex items-center gap-4">
            <button onClick={handleCloseForm} className="text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined !text-2xl">arrow_back</span>
            </button>
            <h1 className="text-lg font-black text-primary uppercase tracking-tight">
              {editingClient ? `Edit Client: ${editingClient.name}` : 'Create New Client'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleCloseForm} className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors uppercase tracking-wider">
              Cancel
            </button>
            <button onClick={handleCloseForm} className="px-8 py-2.5 bg-primary text-white text-sm font-bold rounded shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all uppercase tracking-widest">
              {editingClient ? 'Save Changes' : 'Save Client'}
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto scrollbar-hide flex justify-center py-12 px-6">
          <div className="w-full max-w-3xl bg-white border border-border-slate shadow-sm rounded-3xl p-10 space-y-12 mb-12">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-slate-50 border-2 border-dashed border-border-slate flex flex-col items-center justify-center cursor-pointer group-hover:bg-slate-100 group-hover:border-primary/30 transition-all">
                  <span className="material-symbols-outlined !text-3xl text-slate-300 group-hover:text-primary/50">add_a_photo</span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-full border-2 border-white shadow-sm">
                  <span className="material-symbols-outlined !text-[14px]">edit</span>
                </div>
              </div>
              <span className="mt-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Client Photo</span>
            </div>

            <section className="space-y-8">
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 sm:col-span-1">
                  <FormLabel>Client Name</FormLabel>
                  <FormInput placeholder="e.g. Acme Corp" defaultValue={editingClient?.name} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <FormLabel>Email Address</FormLabel>
                  <FormInput placeholder="billing@client.com" type="email" defaultValue={editingClient?.email} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <FormLabel>Mobile / Phone</FormLabel>
                  <FormInput placeholder="+1 (555) 000-0000" type="tel" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <FormLabel>Website</FormLabel>
                  <FormInput placeholder="https://www.client.com" type="url" />
                </div>
                <div className="col-span-2">
                  <FormLabel>Billing Address</FormLabel>
                  <textarea className="w-full border-border-slate focus:border-primary focus:ring-1 focus:ring-primary/20 text-[13px] rounded-xl py-4 px-5 transition-all min-h-[80px] outline-none" placeholder="Street, City, Zip Code..." defaultValue={editingClient?.address}></textarea>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Financial Details
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <FormLabel>Tax Number / VAT</FormLabel>
                  <FormInput placeholder="TX-123456789" />
                </div>
                <div>
                  <FormLabel>Payment Terms</FormLabel>
                  <select className="w-full h-11 border-border-slate rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 text-[13px] font-bold px-4 bg-white transition-all outline-none">
                    <option>Net 15</option>
                    <option selected>Net 30</option>
                    <option>Net 60</option>
                    <option>Due on Receipt</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <FormLabel>Default Discount</FormLabel>
                  <div className="flex">
                    <div className="relative flex-1">
                      <input className="w-full h-11 border-border-slate !rounded-l-xl focus:border-primary focus:ring-1 focus:ring-primary/20 text-[13px] px-4 transition-all outline-none border-r-0" placeholder="0.00" />
                    </div>
                    <div className="inline-flex rounded-r-xl bg-slate-100 p-1 border border-border-slate">
                      <button className="px-4 py-1 text-[10px] font-black rounded-lg bg-white text-primary shadow-sm uppercase tracking-widest" type="button">Amount</button>
                      <button className="px-4 py-1 text-[10px] font-black rounded-lg text-slate-500 hover:text-primary transition-colors uppercase tracking-widest" type="button">Percent</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Shipping Information
                </h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input className="sr-only peer" type="checkbox" defaultChecked />
                  <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  <span className="ml-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Same as billing</span>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-6 opacity-40 grayscale pointer-events-none">
                <div className="col-span-2">
                  <FormLabel>Shipping Name</FormLabel>
                  <FormInput placeholder="Recipient Name" disabled />
                </div>
                <div className="col-span-2">
                  <FormLabel>Shipping Address</FormLabel>
                  <textarea disabled className="w-full border-border-slate rounded-xl py-4 px-5 text-[13px] outline-none min-h-[80px]" placeholder="Shipping destination..."></textarea>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Internal Notes
              </h3>
              <div className="w-full">
                <FormLabel>Private Notes</FormLabel>
                <textarea className="w-full border-border-slate focus:border-primary focus:ring-1 focus:ring-primary/20 text-[13px] rounded-xl py-4 px-5 transition-all min-h-[120px] outline-none" placeholder="Add any private details about this client..."></textarea>
                <p className="mt-2 text-[10px] text-slate-400 font-bold italic uppercase tracking-widest">These notes are only visible to your internal team.</p>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark animate-in fade-in duration-300 relative">
      <header className="flex h-16 items-center justify-between px-8 bg-white dark:bg-background-dark border-b border-border-slate dark:border-gray-800 shrink-0">
        <h2 className="text-2xl font-black text-primary dark:text-white tracking-tight uppercase">Clients</h2>
      </header>
      
      <div className="bg-white/50 dark:bg-transparent px-8 py-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex items-center flex-1 max-w-2xl">
            <span className="material-symbols-outlined absolute left-4 text-slate-400">search</span>
            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full h-12 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-2xl pl-12 pr-4 text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none" placeholder="Search clients, email, address..." />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-xl text-sm font-black text-slate-700 dark:text-gray-300 hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
              <span className="material-symbols-outlined !text-xl">upload</span> Export
            </button>
            <button onClick={handleCreate} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95">
              <span className="material-symbols-outlined !text-xl">add</span> New Client
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap">
            <span className="material-symbols-outlined !text-[16px]">filter_alt</span> Filters: 1
          </div>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-full text-[11px] font-bold text-slate-700 dark:text-gray-300 hover:border-primary transition-all">
            Type: <span className="font-black text-primary dark:text-blue-400 uppercase">All</span>
            <span className="material-symbols-outlined !text-lg">expand_more</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-full text-[11px] font-bold text-slate-700 dark:text-gray-300 hover:border-primary transition-all">
            Location: <span className="font-black text-primary dark:text-blue-400 uppercase">Anywhere</span>
            <span className="material-symbols-outlined !text-lg">expand_more</span>
          </button>
          <button className="ml-auto text-[11px] font-black text-primary hover:text-primary/80 uppercase tracking-widest underline underline-offset-4 decoration-2">Clear All</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-8 pb-8">
        <div className="bg-white dark:bg-gray-900 border border-border-slate dark:border-gray-800 rounded-[2rem] shadow-sm overflow-hidden flex flex-col">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-gray-50/80 dark:bg-gray-800/80 text-[#5c738a] dark:text-gray-400 border-b border-border-slate dark:border-gray-700 backdrop-blur sticky top-0 z-10">
              <tr>
                <th className="w-16 py-6 text-center">
                  <input type="checkbox" className="rounded-md h-5 w-5 text-primary focus:ring-primary border-slate-300 dark:bg-gray-700 cursor-pointer" />
                </th>
                <th className="w-12"></th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-primary dark:text-white cursor-pointer group">
                  <div className="flex items-center gap-1.5">
                    Client Name
                    <span className="material-symbols-outlined !text-sm group-hover:translate-y-0.5 transition-transform">arrow_downward</span>
                  </div>
                </th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Email Address</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Location / Address</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-right cursor-pointer group">
                   <div className="flex items-center justify-end gap-1.5">
                    Balance Due
                    <span className="material-symbols-outlined !text-sm opacity-20 group-hover:opacity-100 transition-opacity">unfold_more</span>
                  </div>
                </th>
                <th className="w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-slate dark:divide-gray-800">
              {MOCK_CLIENTS.map(client => (
                <tr 
                  key={client.id} 
                  onClick={() => handleEdit(client)} 
                  className={`group hover:bg-primary/5 transition-all cursor-pointer border-l-4 border-l-transparent ${selectedIds.has(client.id) ? 'bg-primary/5 !border-l-primary' : ''}`}
                >
                  <td className="py-6 text-center" onClick={e => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.has(client.id)} 
                      onChange={() => toggleSelect(client.id)} 
                      className="rounded-md h-5 w-5 text-primary border-slate-300 dark:bg-gray-700 cursor-pointer" 
                    />
                  </td>
                  <td className="py-6">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs border uppercase tracking-tighter ${
                      client.id === '1' ? 'bg-blue-100 text-blue-600 border-blue-200' :
                      client.id === '2' ? 'bg-emerald-100 text-emerald-600 border-emerald-200' :
                      'bg-amber-100 text-amber-600 border-amber-200'
                    }`}>
                      {client.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                  </td>
                  <td className="px-6 py-6 font-black text-slate-800 dark:text-gray-100 uppercase tracking-tight text-[13px]">{client.name}</td>
                  <td className="px-6 py-6 text-[13px] font-bold text-slate-500 dark:text-gray-400">{client.email}</td>
                  <td className="px-6 py-6 text-[13px] font-bold text-slate-500 dark:text-gray-400 truncate max-w-[280px]">{client.address}</td>
                  <td className={`px-6 py-6 font-black text-right text-[15px] ${client.balanceDue > 10000 ? 'text-red-500' : 'text-primary dark:text-white'}`}>
                    ${client.balanceDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-6 text-center" onClick={e => e.stopPropagation()}>
                    <button className="h-9 w-9 flex items-center justify-center rounded-xl text-slate-200 hover:text-primary hover:bg-primary/10 transition-all opacity-0 group-hover:opacity-100">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-10 py-6 bg-gray-50/50 dark:bg-gray-800/30 border-t border-border-slate dark:border-gray-700 flex items-center justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
            <div>Result 1 - {MOCK_CLIENTS.length} of 42 clients</div>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-1 hover:text-primary transition-colors disabled:opacity-20" disabled>
                <span className="material-symbols-outlined !text-lg">chevron_left</span> Previous
              </button>
              <div className="flex items-center gap-2">
                <span>Page</span>
                <select className="bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded px-3 py-1 font-black text-primary outline-none focus:ring-1 focus:ring-primary cursor-pointer">
                  <option>01</option>
                  <option>02</option>
                </select>
                <span>of 11</span>
              </div>
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                Next <span className="material-symbols-outlined !text-lg">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedIds.size > 0 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 w-fit animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500">
          <div className="flex items-center justify-center px-2 py-2 bg-[#1A2233]/95 backdrop-blur-md text-white rounded-full shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-white/10 gap-0 overflow-hidden">
            <div className="flex items-center gap-3 px-8 py-3 bg-white/5 rounded-l-full border-r border-white/10">
              <span className="flex items-center justify-center w-7 h-7 bg-blue-500 text-[11px] font-black rounded-xl shadow-xl shadow-blue-500/40">{selectedIds.size}</span>
              <span className="text-[12px] font-black uppercase tracking-widest">Selected</span>
            </div>
            <div className="flex items-center gap-1 px-4">
              <button className="flex items-center gap-2 text-[11px] font-black hover:text-blue-400 transition-colors uppercase tracking-widest px-6 py-3">
                <span className="material-symbols-outlined !text-xl text-blue-400">upload</span> Export
              </button>
              <div className="h-4 w-[1px] bg-white/10"></div>
              <button className="flex items-center gap-2 text-[11px] font-black hover:text-red-400 transition-colors uppercase tracking-widest px-6 py-3 text-red-400">
                <span className="material-symbols-outlined !text-xl">delete_sweep</span> Delete
              </button>
            </div>
            <button onClick={() => setSelectedIds(new Set())} className="px-6 py-4 bg-white/5 hover:bg-white/10 transition-colors border-l border-white/10">
              <span className="material-symbols-outlined !text-lg text-white/40 hover:text-white">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const FormLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] mb-1.5">{children}</label>
);

const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className="w-full h-11 border-border-slate focus:border-primary focus:ring-4 focus:ring-primary/5 text-sm font-bold placeholder:text-slate-300 rounded-xl py-2 px-4 transition-all outline-none" />
);

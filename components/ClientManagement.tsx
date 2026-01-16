
import React, { useState } from 'react';
import { Client } from '../types';
import { MOCK_CLIENTS } from '../constants';

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
            <button onClick={handleCloseForm} className="px-5 py-2 text-xs font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">
              Cancel
            </button>
            <button onClick={handleCloseForm} className="px-6 py-2 bg-primary text-white text-xs font-black rounded shadow-sm hover:bg-primary/90 transition-all uppercase tracking-widest">
              {editingClient ? 'Save Changes' : 'Save Client'}
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto scrollbar-hide flex justify-center py-12 px-6">
          <div className="w-full max-w-3xl bg-white border border-border-slate shadow-sm rounded p-10 space-y-12">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-slate-50 border-2 border-dashed border-border-slate flex flex-col items-center justify-center cursor-pointer group-hover:bg-slate-100 group-hover:border-primary/30 transition-all overflow-hidden">
                  <span className="material-symbols-outlined !text-3xl text-slate-300 group-hover:text-primary/50">add_a_photo</span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-full border-2 border-white shadow-sm">
                  <span className="material-symbols-outlined !text-[14px]">edit</span>
                </div>
              </div>
              <span className="mt-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Photo</span>
            </div>

            <section className="border-b border-border-slate/60 pb-10">
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <FormInput label="Client Name" placeholder="e.g. Acme Corp" defaultValue={editingClient?.name} />
                <FormInput label="Email Address" placeholder="billing@client.com" type="email" defaultValue={editingClient?.email} />
                <FormInput label="Mobile / Phone" placeholder="+1 (555) 000-0000" type="tel" />
                <FormInput label="Website" placeholder="https://www.client.com" type="url" />
                <div className="col-span-2 space-y-1.5">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Billing Address</label>
                  <textarea 
                    className="w-full border-border-slate focus:border-primary focus:ring-1 focus:ring-primary/20 text-[13px] rounded-sm py-2 px-3 transition-all min-h-[80px]" 
                    placeholder="Street, City, Zip Code..."
                    defaultValue={editingClient?.address}
                  ></textarea>
                </div>
              </div>
            </section>

            <section className="border-b border-border-slate/60 pb-10">
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Financial Details
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <FormInput label="Tax Number / VAT" placeholder="TX-123456789" />
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Payment Terms</label>
                  <select className="w-full border-border-slate focus:border-primary focus:ring-1 focus:ring-primary/20 text-[13px] rounded-sm py-2 px-3 bg-white">
                    <option>Net 15</option>
                    <option selected>Net 30</option>
                    <option>Net 60</option>
                    <option>Due on Receipt</option>
                  </select>
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Default Discount</label>
                  <div className="flex">
                    <input className="flex-1 border-border-slate border-r-0 rounded-l-sm focus:border-primary focus:ring-1 focus:ring-primary/20 text-[13px] py-2 px-3" placeholder="0.00" />
                    <div className="inline-flex rounded-r-sm bg-slate-100 p-1 border border-border-slate border-l-0">
                      <button className="px-4 py-1 text-[10px] font-black rounded-sm bg-white text-primary shadow-sm uppercase tracking-widest">Amount</button>
                      <button className="px-4 py-1 text-[10px] font-black rounded-sm text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">Percent</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-b border-border-slate/60 pb-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Shipping Information
                </h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input checked readOnly className="sr-only peer" type="checkbox"/>
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  <span className="ml-3 text-[11px] font-black text-slate-500 uppercase tracking-widest">Same as billing</span>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-6 opacity-40 grayscale pointer-events-none">
                <div className="col-span-2">
                  <FormInput label="Shipping Name" placeholder="Recipient Name" />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Shipping Address</label>
                  <textarea className="w-full border-border-slate rounded-sm py-2 px-3 text-[13px]" placeholder="Shipping destination..."></textarea>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Internal Notes
              </h3>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Private Notes</label>
                <textarea className="w-full border-border-slate focus:border-primary focus:ring-1 focus:ring-primary/20 text-[13px] rounded-sm py-3 px-4 min-h-[120px]" placeholder="Add any private details..."></textarea>
                <p className="mt-2 text-[10px] text-slate-400 font-bold italic">These notes are only visible to your team.</p>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark animate-in fade-in duration-300 relative">
      <header className="flex h-16 items-center justify-between px-6 bg-white dark:bg-background-dark border-b border-border-slate dark:border-gray-800 shrink-0">
        <h2 className="text-2xl font-black text-primary dark:text-white tracking-tight uppercase">Clients</h2>
      </header>

      <div className="bg-white/50 dark:bg-transparent px-6 py-5 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex items-center flex-1 max-w-2xl">
            <span className="material-symbols-outlined absolute left-3 text-slate-400">search</span>
            <input 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full h-11 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-xl pl-11 pr-4 text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary/5 transition-all" 
              placeholder="Search clients, email, address..."
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-xl text-sm font-black text-slate-700 dark:text-gray-300 hover:bg-gray-50 transition-all">
              <span className="material-symbols-outlined !text-xl">upload</span> Export
            </button>
            <button onClick={handleCreate} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              <span className="material-symbols-outlined !text-xl">add</span> New Client
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest">
            <span className="material-symbols-outlined !text-sm">filter_alt</span> Filters: 1
          </div>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-full text-xs font-bold text-slate-700 dark:text-gray-300 hover:border-primary transition-all">
            Type: <span className="font-black text-primary dark:text-blue-400">All</span>
            <span className="material-symbols-outlined !text-sm">expand_more</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-full text-xs font-bold text-slate-700 dark:text-gray-300 hover:border-primary transition-all">
            Location: <span className="font-black text-primary dark:text-blue-400">Anywhere</span>
            <span className="material-symbols-outlined !text-sm">expand_more</span>
          </button>
          <button onClick={() => setSearchTerm('')} className="ml-auto text-[10px] font-black text-primary hover:underline uppercase tracking-widest">Clear All</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 pb-6">
        <div className="bg-white dark:bg-gray-900 border border-border-slate dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/80 dark:bg-gray-800/80 text-[#5c738a] dark:text-gray-400 border-b border-border-slate dark:border-gray-700 backdrop-blur sticky top-0 z-10">
              <tr>
                <th className="w-12 py-4 text-center">
                  <input type="checkbox" className="rounded-md h-5 w-5 text-primary border-slate-300 dark:bg-gray-700" />
                </th>
                <th className="w-12"></th>
                <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-primary dark:text-white cursor-pointer">
                  <div className="flex items-center gap-1.5">Client Name <span className="material-symbols-outlined !text-sm">arrow_downward</span></div>
                </th>
                <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest">Email</th>
                <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest">Address</th>
                <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-right">
                   <div className="flex items-center justify-end gap-1.5">Balance Due <span className="material-symbols-outlined !text-sm opacity-30">unfold_more</span></div>
                </th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-slate dark:divide-gray-800">
              {MOCK_CLIENTS.map(client => (
                <tr 
                  key={client.id} 
                  onClick={() => handleEdit(client)}
                  className={`group hover:bg-primary/5 transition-all cursor-pointer ${selectedIds.has(client.id) ? 'bg-primary/5 border-l-2 border-l-primary' : 'border-l-2 border-l-transparent'}`}
                >
                  <td className="py-5 text-center" onClick={e => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.has(client.id)}
                      onChange={() => toggleSelect(client.id)}
                      className="rounded-md h-5 w-5 text-primary border-slate-300 dark:bg-gray-700" 
                    />
                  </td>
                  <td className="py-5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-[10px] border border-blue-200 dark:border-blue-800 uppercase">
                      {client.name.substring(0, 2)}
                    </div>
                  </td>
                  <td className="px-4 py-5 font-bold text-slate-800 dark:text-gray-200">{client.name}</td>
                  <td className="px-4 py-5 text-xs font-bold text-slate-500 dark:text-gray-400">{client.email}</td>
                  <td className="px-4 py-5 text-xs font-bold text-slate-500 dark:text-gray-400 truncate max-w-[200px]">{client.address}</td>
                  <td className={`px-4 py-5 font-black text-right ${client.balanceDue > 10000 ? 'text-red-600' : 'text-primary dark:text-white'}`}>
                    ${client.balanceDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-5 text-center" onClick={e => e.stopPropagation()}>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-slate-500 cursor-pointer">more_vert</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/30 border-t border-border-slate dark:border-gray-700 flex items-center justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
            <div>Showing 1 - {MOCK_CLIENTS.length} of 42 entries</div>
            <div className="flex items-center gap-4">
              <button className="p-1 hover:bg-slate-200 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-30" disabled>
                <span className="material-symbols-outlined !text-lg">chevron_left</span>
              </button>
              <div className="flex items-center gap-2">
                <span>Page</span>
                <select className="bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-lg px-2 py-0.5 text-primary">
                  <option>1</option>
                  <option>2</option>
                </select>
                <span>of 11</span>
              </div>
              <button className="p-1 hover:bg-slate-200 dark:hover:bg-gray-700 rounded transition-colors">
                <span className="material-symbols-outlined !text-lg">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedIds.size > 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-fit animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-center px-5 py-2.5 bg-bulk-bg/95 backdrop-blur text-white rounded-full shadow-2xl border border-white/10 gap-0">
            <div className="flex items-center gap-2 pr-5 border-r border-white/10">
              <span className="flex items-center justify-center w-5 h-5 bg-blue-500 text-[10px] font-black rounded-full">{selectedIds.size}</span>
              <span className="text-[13px] font-bold uppercase tracking-widest">Selected</span>
            </div>
            <div className="flex items-center">
              <button className="flex items-center gap-2 text-[11px] font-black hover:text-blue-400 transition-colors uppercase tracking-widest px-5 py-2">
                <span className="material-symbols-outlined !text-lg text-blue-400">upload</span> Export
              </button>
              <div className="h-4 w-[1px] bg-white/10"></div>
              <button className="flex items-center gap-2 text-[11px] font-black hover:text-red-400 transition-colors uppercase tracking-widest px-5 py-2 text-red-400/90">
                <span className="material-symbols-outlined !text-lg">delete</span> Delete
              </button>
            </div>
            <button onClick={() => setSelectedIds(new Set())} className="ml-3 p-1.5 hover:bg-white/10 rounded-full transition-all text-white/50 hover:text-white">
              <span className="material-symbols-outlined !text-sm">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const FormInput: React.FC<{ label: string; placeholder: string; type?: string; defaultValue?: string }> = ({ label, placeholder, type = "text", defaultValue }) => (
  <div className="space-y-1.5">
    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">{label}</label>
    <input 
      type={type} 
      defaultValue={defaultValue}
      className="w-full border-border-slate focus:border-primary focus:ring-1 focus:ring-primary/20 text-[13px] rounded-sm py-2 px-3 transition-all placeholder:text-slate-300 font-medium" 
      placeholder={placeholder} 
    />
  </div>
);

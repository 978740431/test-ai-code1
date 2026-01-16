"use client";

import React, { useState } from 'react';
import { Item } from '../types';
import { MOCK_ITEMS } from '../constants';

/**
 * ItemManagement handles the inventory, services, and physical goods catalog.
 */
export const ItemManagement: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
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

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
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
              {editingItem ? `Edit Item: ${editingItem.name}` : 'Create New Item'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleCloseForm} className="px-5 py-2 text-xs font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">
              Cancel
            </button>
            <button onClick={handleCloseForm} className="px-8 py-2.5 bg-primary text-white text-xs font-black rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all uppercase tracking-[0.15em]">
              {editingItem ? 'Save Changes' : 'Save Item'}
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto scrollbar-hide flex justify-center py-12 px-6">
          <div className="w-full max-w-3xl bg-white border border-border-slate shadow-sm rounded-3xl p-10 space-y-12 mb-12">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-36 h-36 bg-slate-50 border-2 border-dashed border-border-slate flex flex-col items-center justify-center cursor-pointer group-hover:bg-slate-100 group-hover:border-primary/30 transition-all rounded-3xl overflow-hidden">
                  {editingItem?.imageUrl ? (
                    <img src={editingItem.imageUrl} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <span className="material-symbols-outlined !text-4xl text-slate-300 group-hover:text-primary/50">add_photo_alternate</span>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl border-4 border-white shadow-xl">
                  <span className="material-symbols-outlined !text-[16px]">edit</span>
                </div>
              </div>
              <span className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Visualization</span>
            </div>

            <section className="space-y-8">
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-primary rounded-full"></span> Basic Specification
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Item Name</label>
                  <input type="text" defaultValue={editingItem?.name} className="w-full h-11 px-4 text-sm font-bold border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all" placeholder="e.g. Professional Consulting Service" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Detailed Description</label>
                  <textarea 
                    className="w-full border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 text-sm font-medium rounded-2xl py-4 px-5 transition-all min-h-[140px] outline-none" 
                    placeholder="Provide a detailed breakdown of features, SKU details, or service scope..."
                    defaultValue={editingItem?.description}
                  ></textarea>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-primary rounded-full"></span> Pricing & Billing Model
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Unit Rate ($)</label>
                  <input type="number" defaultValue={editingItem?.amount} className="w-full h-11 px-4 text-sm font-bold border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all" placeholder="0.00" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Cost Basis ($)</label>
                  <input type="number" className="w-full h-11 px-4 text-sm font-bold border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all" placeholder="0.00" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Billing Unit</label>
                  <select 
                    className="w-full h-11 px-4 text-sm font-bold border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none bg-white transition-all"
                    defaultValue={editingItem?.unit || 'Each'}
                  >
                    <option value="Each">Each</option>
                    <option value="pcs">Pieces (pcs)</option>
                    <option value="hours">Hours (hrs)</option>
                    <option value="days">Days</option>
                    <option value="User / Month">User / Month</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-primary rounded-full"></span> Inventory Control
                </h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input className="sr-only peer" type="checkbox" defaultChecked={editingItem?.inventory !== 'Unlimited'} />
                  <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  <span className="ml-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">Track Quantity</span>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Current Stock Count</label>
                  <input 
                    type="number" 
                    className="w-full h-11 px-4 text-sm font-bold border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all" 
                    placeholder="0"
                    defaultValue={typeof editingItem?.inventory === 'number' ? editingItem.inventory : '0'}
                  />
                  <p className="mt-2 text-[10px] text-slate-400 font-bold italic uppercase tracking-tighter">Automatic updates will reflect on sales invoices.</p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark animate-in fade-in duration-300 relative">
      <header className="flex h-20 items-center justify-between px-8 bg-white dark:bg-background-dark border-b border-border-slate dark:border-gray-800 shrink-0">
        <div className="flex flex-col">
          <h2 className="text-2xl font-black text-primary dark:text-white tracking-tight uppercase">Product Catalog</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Manage inventory and service rates</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleCreate} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95">
            <span className="material-symbols-outlined !text-xl">add</span> New Item
          </button>
        </div>
      </header>

      <div className="px-8 py-6 flex items-center justify-between gap-4">
        <div className="relative flex items-center flex-1 max-w-2xl">
          <span className="material-symbols-outlined absolute left-4 text-slate-300">search</span>
          <input 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full h-12 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl pl-12 pr-4 text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none" 
            placeholder="Search catalog by name, SKU or description..."
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl text-[11px] font-black text-slate-500 dark:text-gray-400 hover:bg-gray-50 transition-all uppercase tracking-widest shadow-sm">
          <span className="material-symbols-outlined !text-lg">upload</span> Bulk Export
        </button>
      </div>

      <div className="flex-1 overflow-auto px-8 pb-8">
        <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-slate-50/80 dark:bg-gray-800/80 text-slate-400 border-b border-slate-100 dark:border-gray-700 backdrop-blur sticky top-0 z-10">
              <tr>
                <th className="w-16 py-6 text-center">
                  <input type="checkbox" className="rounded-md h-5 w-5 text-primary border-slate-300 dark:bg-gray-700 cursor-pointer" />
                </th>
                <th className="w-20 py-6 text-[10px] font-black uppercase tracking-widest px-4 text-center">Preview</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-primary dark:text-white">Item Details</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-right">Standard Rate</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest">Inventory Status</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-center">Unit</th>
                <th className="w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
              {MOCK_ITEMS.map(item => (
                <tr 
                  key={item.id} 
                  onClick={() => handleEdit(item)}
                  className={`group hover:bg-primary/5 transition-all cursor-pointer ${selectedIds.has(item.id) ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                >
                  <td className="py-6 text-center" onClick={e => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.has(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="rounded-md h-5 w-5 text-primary border-slate-300 dark:bg-gray-700 cursor-pointer" 
                    />
                  </td>
                  <td className="px-4 py-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-gray-800 border border-slate-100 dark:border-gray-700 overflow-hidden shadow-inner mx-auto group-hover:scale-110 transition-transform">
                      <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-black text-slate-800 dark:text-gray-100 uppercase tracking-tight text-[13px]">{item.name}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight line-clamp-1 opacity-70">{item.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right font-black text-primary dark:text-white text-base">
                    ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-6">
                    {typeof item.inventory === 'number' ? (
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${item.inventory < 5 ? 'bg-amber-500 animate-pulse' : 'bg-success'}`}></div>
                        <span className={`text-[11px] font-black uppercase tracking-tight ${item.inventory < 5 ? 'text-amber-600' : 'text-success'}`}>{item.inventory} units in stock</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-300 dark:text-gray-600">
                        <span className="material-symbols-outlined !text-lg">all_inclusive</span>
                        <span className="text-[11px] font-black uppercase tracking-widest">Unlimited</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.1em] px-3 py-1 bg-slate-100 dark:bg-gray-800 rounded-full">{item.unit}</span>
                  </td>
                  <td className="py-6 text-center" onClick={e => e.stopPropagation()}>
                    <button className="h-9 w-9 flex items-center justify-center rounded-xl text-slate-200 hover:text-primary hover:bg-primary/10 transition-all">
                      <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="px-10 py-6 bg-slate-50 dark:bg-gray-800/30 border-t border-slate-100 dark:border-gray-700 flex items-center justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
            <div>Catalog summary: {MOCK_ITEMS.length} line items</div>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-1 hover:text-primary transition-colors disabled:opacity-20" disabled>
                <span className="material-symbols-outlined !text-lg">chevron_left</span> Previous
              </button>
              <span className="text-primary dark:text-blue-400">Page 01 <span className="text-slate-300 mx-2">/</span> 12</span>
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                Next <span className="material-symbols-outlined !text-lg">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedIds.size > 0 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 w-fit animate-in fade-in zoom-in slide-in-from-bottom-6 duration-500">
          <div className="flex items-center justify-center px-2 py-2 bg-gray-900/95 backdrop-blur-md text-white rounded-full shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-white/10 gap-0 overflow-hidden">
            <div className="flex items-center gap-3 px-8 py-3 bg-white/5 rounded-l-full border-r border-white/10">
              <span className="flex items-center justify-center w-7 h-7 bg-primary text-[11px] font-black rounded-xl shadow-xl shadow-primary/40">{selectedIds.size}</span>
              <span className="text-[12px] font-black uppercase tracking-widest">Selected Items</span>
            </div>
            <div className="flex items-center gap-2 px-6">
              <button className="group flex flex-col items-center justify-center px-6 py-2 hover:bg-white/5 transition-all rounded-2xl">
                <span className="material-symbols-outlined !text-xl group-hover:scale-125 transition-transform text-blue-400">add_shopping_cart</span>
                <span className="text-[9px] font-black uppercase tracking-tighter mt-1 opacity-60">To Invoice</span>
              </button>
              <div className="h-8 w-[1px] bg-white/10 mx-1"></div>
              <button className="group flex flex-col items-center justify-center px-6 py-2 hover:bg-red-500/20 text-red-400 transition-all rounded-2xl">
                <span className="material-symbols-outlined !text-xl group-hover:scale-125 transition-transform">delete_sweep</span>
                <span className="text-[9px] font-black uppercase tracking-tighter mt-1 opacity-60">Delete</span>
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

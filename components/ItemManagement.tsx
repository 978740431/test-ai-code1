
import React, { useState } from 'react';
import { Item } from '../types';
import { MOCK_ITEMS } from '../constants';

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
            <button onClick={handleCloseForm} className="px-6 py-2 bg-primary text-white text-xs font-black rounded shadow-sm hover:bg-primary/90 transition-all uppercase tracking-widest">
              {editingItem ? 'Save Changes' : 'Save Item'}
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto scrollbar-hide flex justify-center py-12 px-6">
          <div className="w-full max-w-3xl bg-white border border-border-slate shadow-sm rounded p-10 space-y-12">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-32 h-32 bg-slate-50 border-2 border-dashed border-border-slate flex flex-col items-center justify-center cursor-pointer group-hover:bg-slate-100 group-hover:border-primary/30 transition-all rounded overflow-hidden">
                  {editingItem?.imageUrl ? (
                    <img src={editingItem.imageUrl} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <span className="material-symbols-outlined !text-4xl text-slate-300 group-hover:text-primary/50">add_photo_alternate</span>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-full border-2 border-white shadow-sm">
                  <span className="material-symbols-outlined !text-[14px]">edit</span>
                </div>
              </div>
              <span className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Item Photo</span>
            </div>

            <section className="border-b border-border-slate/60 pb-10">
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Basic Information
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <FormInput label="Item Name" placeholder="e.g. Professional Consulting Service" defaultValue={editingItem?.name} />
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Description</label>
                  <textarea 
                    className="w-full border-border-slate focus:border-primary focus:ring-1 focus:ring-primary/20 text-[13px] rounded-sm py-3 px-4 transition-all min-h-[120px]" 
                    placeholder="Provide a detailed description of the item or service..."
                    defaultValue={editingItem?.description}
                  ></textarea>
                </div>
              </div>
            </section>

            <section className="border-b border-border-slate/60 pb-10">
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Pricing Details
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <FormInput label="Rate ($)" placeholder="0.00" type="number" defaultValue={editingItem?.amount?.toString()} />
                <FormInput label="Cost ($)" placeholder="0.00" type="number" />
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Unit</label>
                  <select 
                    className="w-full border-border-slate focus:border-primary focus:ring-1 focus:ring-primary/20 text-[13px] rounded-sm py-2 px-3 bg-white"
                    defaultValue={editingItem?.unit}
                  >
                    <option value="Each">Each</option>
                    <option value="pcs">Pieces (pcs)</option>
                    <option value="hours">Hours (hrs)</option>
                    <option value="days">Days</option>
                    <option value="box">Box</option>
                    <option value="User / Month">User / Month</option>
                  </select>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Inventory Management
                </h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input className="sr-only peer" type="checkbox" defaultChecked={editingItem?.inventory !== 'Unlimited'} />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  <span className="ml-3 text-[11px] font-black text-slate-500 uppercase tracking-widest">Track Quantity</span>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-1 space-y-1.5">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Initial Stock</label>
                  <input 
                    type="number" 
                    className="w-full border-border-slate focus:border-primary focus:ring-1 focus:ring-primary/20 text-[13px] rounded-sm py-2 px-3" 
                    placeholder="0"
                    defaultValue={typeof editingItem?.inventory === 'number' ? editingItem.inventory.toString() : '0'}
                  />
                  <p className="mt-2 text-[10px] text-slate-400 font-bold italic uppercase tracking-tighter">Stock level at time of creation.</p>
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
      <header className="flex h-16 items-center justify-between px-6 bg-white dark:bg-background-dark border-b border-border-slate dark:border-gray-800 shrink-0">
        <h2 className="text-2xl font-black text-primary dark:text-white tracking-tight uppercase">Items</h2>
      </header>

      <div className="bg-white/50 dark:bg-transparent px-6 py-5 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex items-center flex-1 max-w-2xl">
            <span className="material-symbols-outlined absolute left-3 text-slate-400">search</span>
            <input 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full h-11 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-xl pl-11 pr-4 text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary/5 transition-all" 
              placeholder="Search items, descriptions..."
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-xl text-sm font-black text-slate-700 dark:text-gray-300 hover:bg-gray-50 transition-all">
              <span className="material-symbols-outlined !text-xl">upload</span> Export
            </button>
            <button onClick={handleCreate} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              <span className="material-symbols-outlined !text-xl">add</span> New Item
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest">
            <span className="material-symbols-outlined !text-sm">filter_alt</span> Filters: 2
          </div>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-full text-xs font-bold text-slate-700 dark:text-gray-300 hover:border-primary transition-all">
            Category: <span className="font-black text-primary dark:text-blue-400">All</span>
            <span className="material-symbols-outlined !text-sm">expand_more</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-full text-xs font-bold text-slate-700 dark:text-gray-300 hover:border-primary transition-all">
            Stock: <span className="font-black text-primary dark:text-blue-400">In Stock</span>
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
                <th className="w-16 py-4 text-[10px] font-black uppercase tracking-widest px-4">Image</th>
                <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-primary dark:text-white cursor-pointer">
                  <div className="flex items-center gap-1.5">Item Name <span className="material-symbols-outlined !text-sm">arrow_downward</span></div>
                </th>
                <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-right">Amount</th>
                <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest cursor-pointer">
                  <div className="flex items-center gap-1.5">Inventory <span className="material-symbols-outlined !text-sm opacity-30">unfold_more</span></div>
                </th>
                <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest">Unit</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-slate dark:divide-gray-800">
              {MOCK_ITEMS.map(item => (
                <tr 
                  key={item.id} 
                  onClick={() => handleEdit(item)}
                  className={`group hover:bg-primary/5 transition-all cursor-pointer ${selectedIds.has(item.id) ? 'bg-primary/5 border-l-2 border-l-primary' : 'border-l-2 border-l-transparent'}`}
                >
                  <td className="py-5 text-center" onClick={e => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.has(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="rounded-md h-5 w-5 text-primary border-slate-300 dark:bg-gray-700" 
                    />
                  </td>
                  <td className="px-4 py-5">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-gray-800 border border-border-slate dark:border-gray-700 overflow-hidden shadow-sm">
                      <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 dark:text-gray-200">{item.name}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.description}</span>
                    </div>
                  </td>
                  <td className="px-4 py-5 font-black text-right text-slate-700 dark:text-gray-300">
                    ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-5">
                    {typeof item.inventory === 'number' ? (
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${item.inventory < 5 ? 'bg-amber-500' : 'bg-success'}`}></span>
                        <span className={`text-xs font-black uppercase ${item.inventory < 5 ? 'text-amber-600' : 'text-success'}`}>{item.inventory} in stock</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <span className="material-symbols-outlined !text-base">all_inclusive</span>
                        <span className="text-xs font-black uppercase">Unlimited</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-5 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">{item.unit}</td>
                  <td className="py-5 text-center" onClick={e => e.stopPropagation()}>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-slate-500 cursor-pointer">more_vert</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/30 border-t border-border-slate dark:border-gray-700 flex items-center justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
            <div>Showing 1 - {MOCK_ITEMS.length} of 84 entries</div>
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
                <span>of 28</span>
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
                <span className="material-symbols-outlined !text-lg">receipt_long</span> Create Invoice
              </button>
              <div className="h-4 w-[1px] bg-white/10"></div>
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

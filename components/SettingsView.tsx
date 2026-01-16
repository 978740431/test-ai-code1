
import React, { useState } from 'react';

type SettingsSection = 'INFO' | 'PAYMENTS' | 'TAX' | 'DESIGN' | 'OPTION' | 'LABELS' | 'REMINDERS' | 'NUMBERS' | 'ACCOUNT' | 'FEEDBACK';

export const SettingsView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('INFO');

  const navItems = [
    { section: 'COMPANY', items: [
      { id: 'INFO' as SettingsSection, label: 'Company Info' },
      { id: 'PAYMENTS' as SettingsSection, label: 'Payment Methods' },
      { id: 'TAX' as SettingsSection, label: 'Tax' },
    ]},
    { section: 'ACCOUNT & SECURITY', items: [
      { id: 'ACCOUNT' as SettingsSection, label: 'Account Detail' },
    ]},
    { section: 'APP PREFERENCES', items: [
      { id: 'DESIGN' as SettingsSection, label: 'PDF Design' },
      { id: 'OPTION' as SettingsSection, label: 'Option' },
      { id: 'LABELS' as SettingsSection, label: 'Labels' },
      { id: 'REMINDERS' as SettingsSection, label: 'Invoice Reminders' },
      { id: 'NUMBERS' as SettingsSection, label: 'Numbers' },
    ]},
    { section: 'OTHERS', items: [
      { id: 'FEEDBACK' as SettingsSection, label: 'Send Feedback' },
    ]}
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'INFO': return <CompanyInfoSection />;
      case 'PAYMENTS': return <PaymentMethodsSection />;
      case 'TAX': return <TaxSection />;
      case 'LABELS': return <LabelsSection />;
      case 'ACCOUNT': return <AccountDetailSection />;
      case 'REMINDERS': return <RemindersSection />;
      case 'NUMBERS': return <NumbersSection />;
      case 'FEEDBACK': return <FeedbackSection />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <span className="material-symbols-outlined !text-4xl mb-2">construction</span>
          <p className="font-bold">This settings section is under development.</p>
        </div>
      );
    }
  };

  const getHeaderTitle = () => {
    const allItems = navItems.flatMap(g => g.items);
    return allItems.find(i => i.id === activeSection)?.label || 'Settings';
  };

  return (
    <div className="flex h-full bg-white dark:bg-gray-950 overflow-hidden relative">
      {/* Settings Sub-Sidebar */}
      <aside className="w-64 border-r border-border-slate dark:border-gray-800 flex flex-col shrink-0 bg-slate-50/30 dark:bg-gray-900/20">
        <div className="h-16 flex items-center px-6 border-b border-border-slate dark:border-gray-800">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Settings</h2>
        </div>
        <div className="flex-1 overflow-y-auto py-6 space-y-8 scrollbar-hide">
          {navItems.map((group) => (
            <div key={group.section}>
              <h3 className="px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-3">{group.section}</h3>
              <nav className="space-y-0.5">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left px-6 py-2.5 text-[13px] font-semibold transition-all border-r-2 ${
                      activeSection === item.id
                        ? 'bg-primary/5 text-primary border-primary font-bold'
                        : 'text-slate-600 dark:text-gray-400 border-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </aside>

      {/* Settings Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-16 flex items-center justify-between px-8 border-b border-border-slate dark:border-gray-800 shrink-0 bg-white dark:bg-gray-950">
          <h1 className="text-xl font-black text-primary dark:text-white uppercase tracking-tight">{getHeaderTitle()}</h1>
          <div className="flex items-center gap-3">
            {activeSection === 'FEEDBACK' ? (
              <div className="text-xs font-bold text-slate-400 px-3 py-1 bg-slate-100 dark:bg-gray-800 rounded">
                LAST FEEDBACK: 2 DAYS AGO
              </div>
            ) : (
              <>
                <button className="px-4 py-2 border border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-300 rounded font-bold text-xs uppercase hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  Reset Defaults
                </button>
                <button className="px-6 py-2 bg-primary text-white rounded font-bold text-sm shadow-sm hover:bg-primary/90 transition-colors">
                  Save Changes
                </button>
              </>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

// --- Sub-sections ---

const LabelInput: React.FC<{ label: string; value: string; type?: string; readOnly?: boolean }> = ({ label, value, type = "text", readOnly = false }) => (
  <div className="space-y-1.5">
    <label className="block text-[11px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-tight">{label}</label>
    <input 
      type={type} 
      defaultValue={value} 
      readOnly={readOnly}
      className={`w-full h-10 px-4 text-sm bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium text-slate-700 dark:text-gray-200 ${readOnly ? 'bg-slate-50 dark:bg-gray-900 cursor-not-allowed opacity-80' : ''}`}
    />
  </div>
);

const CompanyInfoSection = () => (
  <div className="p-10 max-w-5xl mx-auto flex gap-12 animate-in fade-in duration-300">
    <div className="shrink-0 flex flex-col items-center gap-4">
      <div className="relative group">
        <div className="w-32 h-32 rounded-full border-4 border-dashed border-slate-200 dark:border-gray-700 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 overflow-hidden hover:border-primary transition-colors cursor-pointer">
          <span className="material-symbols-outlined !text-4xl text-slate-300 group-hover:text-primary">add_a_photo</span>
          <span className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">Upload Logo</span>
        </div>
        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <span className="material-symbols-outlined text-white">edit</span>
        </div>
      </div>
    </div>
    <div className="flex-1 space-y-10">
      <section>
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full"></span> Basic Information
        </h4>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          <div className="col-span-2">
            <LabelInput label="Business Name" value="Acme Digital Solutions Ltd." />
          </div>
          <LabelInput label="Email Address" value="billing@acmedigital.com" type="email" />
          <LabelInput label="Phone Number" value="+1 (555) 000-1234" />
          <div className="col-span-2">
            <LabelInput label="Address Line 1" value="123 Innovation Drive, Suite 400" />
          </div>
          <div className="col-span-2">
            <LabelInput label="Address Line 2" value="Silicon Valley, CA 94025" />
          </div>
        </div>
      </section>
      <section>
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full"></span> Financial & Tax Details
        </h4>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          <LabelInput label="Tax Registration Number" value="VAT-99283741" />
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase">Default Currency</label>
            <select className="w-full h-10 px-4 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded bg-white dark:bg-gray-800 font-medium">
              <option>USD ($) - United States Dollar</option>
              <option>EUR (€) - Euro</option>
              <option>GBP (£) - British Pound</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase">Tax Year Start</label>
            <select className="w-full h-10 px-4 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded bg-white dark:bg-gray-800 font-medium">
              <option>January</option>
              <option>April</option>
              <option>July</option>
            </select>
          </div>
          <div className="col-span-2 space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase">Payment Terms (Default)</label>
            <textarea className="w-full px-4 py-2 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded min-h-[80px]" defaultValue="Please pay within 30 days of receiving this invoice. Late payments are subject to a 2% monthly interest fee."></textarea>
          </div>
        </div>
      </section>
      <section>
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full"></span> Authorized Signature
        </h4>
        <div className="border-2 border-dashed border-slate-200 dark:border-gray-700 rounded-xl p-8 bg-gray-50 dark:bg-gray-800/30 flex flex-col items-center justify-center gap-3">
          <div className="h-20 flex items-center justify-center italic text-4xl font-serif text-primary opacity-30 select-none">Alex Thompson</div>
          <button className="text-[11px] font-black text-primary hover:underline uppercase tracking-widest">Replace Signature</button>
        </div>
      </section>
    </div>
  </div>
);

const PaymentMethodsSection = () => (
  <div className="p-10 max-w-5xl animate-in fade-in duration-300">
    <section>
      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
        <span className="w-1 h-4 bg-primary rounded-full"></span> Payment Instructions
      </h4>
      <p className="text-xs text-slate-400 leading-relaxed mb-6 font-medium">
        These instructions will be displayed at the bottom of every invoice. Include bank transfer details, online payment links, or other relevant payment information.
      </p>
      <textarea 
        className="w-full p-8 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary min-h-[500px] font-mono leading-relaxed shadow-inner bg-slate-50/50 dark:bg-gray-900/50" 
        placeholder="Enter your detailed payment instructions here..."
      ></textarea>
    </section>
  </div>
);

const TaxSection = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingTax, setEditingTax] = useState<any>(null);

  const taxes = [
    { label: 'Standard VAT', rate: '20%', enabled: true },
    { label: 'Compound Sales Tax', rate: '5% + 2%', enabled: false },
    { label: 'Municipal Surcharge', rate: '1.5%', enabled: true },
    { label: 'Service Fee Tax', rate: '8%', enabled: true },
  ];

  const handleEdit = (tax: any) => {
    setEditingTax(tax);
    setIsDrawerOpen(true);
  };

  const handleNewTax = () => {
    setEditingTax(null);
    setIsDrawerOpen(true);
  };

  return (
    <div className="p-10 animate-in fade-in duration-300 relative">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-900 border border-border-slate dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-gray-800/50 border-b border-border-slate dark:border-gray-800">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 w-1/3">Tax Label</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 w-1/4">Rate (%)</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 w-1/4">Tax Inclusive</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
              {taxes.map((tax, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-700 dark:text-gray-200">{tax.label}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-gray-400 font-semibold">{tax.rate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      tax.enabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${tax.enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                      {tax.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(tax)} className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined !text-lg">edit</span>
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined !text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-4 bg-slate-50/50 dark:bg-gray-800/30 border-t border-border-slate dark:border-gray-800">
            <button onClick={handleNewTax} className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:underline">
              <span className="material-symbols-outlined !text-lg">add_circle</span> Add New Tax
            </button>
          </div>
        </div>
      </div>

      {/* Tax Drawer */}
      <TaxEditDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        tax={editingTax}
      />
    </div>
  );
};

const TaxEditDrawer: React.FC<{ isOpen: boolean; onClose: () => void; tax?: any }> = ({ isOpen, onClose, tax }) => {
  const [rates, setRates] = useState<string[]>(tax?.rate?.split(' + ')?.map((r: string) => r.replace('%', '')) || ['5.00']);
  
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[60] transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-[420px] bg-white dark:bg-gray-900 border-l border-border-slate dark:border-gray-800 shadow-2xl flex flex-col z-[70] animate-in slide-in-from-right duration-300">
        <header className="h-16 flex items-center justify-between px-6 border-b border-border-slate dark:border-gray-800">
          <h3 className="text-sm font-black uppercase tracking-widest text-primary dark:text-white">
            {tax ? 'Edit Tax Label' : 'New Tax Label'}
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tax Label</label>
            <input 
              type="text" 
              defaultValue={tax?.label || ''}
              className="w-full bg-slate-50 dark:bg-gray-800 border-border-slate dark:border-gray-700 rounded-xl text-sm font-bold py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              placeholder="e.g. Sales Tax"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">Rate (%)</label>
            
            {rates.map((rate, idx) => (
              <div key={idx} className="space-y-1.5 animate-in fade-in slide-in-from-top-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                    {idx === 0 ? 'Primary Rate' : 'Secondary Rate'}
                  </span>
                  {idx > 0 && (
                    <button 
                      onClick={() => setRates(rates.filter((_, i) => i !== idx))}
                      className="text-[10px] font-black text-red-500 hover:text-red-600 uppercase tracking-widest"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    value={rate}
                    onChange={(e) => {
                      const newRates = [...rates];
                      newRates[idx] = e.target.value;
                      setRates(newRates);
                    }}
                    className="w-full bg-slate-50 dark:bg-gray-800 border-border-slate dark:border-gray-700 rounded-xl text-sm font-black py-3 px-4 pr-8 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-black">%</span>
                </div>
              </div>
            ))}

            {rates.length < 2 && (
              <button 
                onClick={() => setRates([...rates, '0.00'])}
                className="flex items-center gap-1.5 text-xs font-black text-primary dark:text-blue-400 hover:underline pt-2 uppercase tracking-widest"
              >
                <span className="material-symbols-outlined !text-base">add_circle</span>
                Add rate
              </button>
            )}
          </div>

          <div className="h-px bg-slate-100 dark:bg-gray-800"></div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="block text-sm font-black text-slate-700 dark:text-gray-200">Tax Inclusive</span>
                <span className="block text-[11px] text-slate-400 font-medium">Rates already include tax in price</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={tax?.inclusive}/>
                <div className="w-10 h-5 bg-slate-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="block text-sm font-black text-slate-700 dark:text-gray-200">Apply to Items</span>
                <span className="block text-[11px] text-slate-400 font-medium">Automatically apply to all new items</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={true}/>
                <div className="w-10 h-5 bg-slate-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        <footer className="p-6 border-t border-border-slate dark:border-gray-800 bg-slate-50/50 dark:bg-gray-950 flex items-center gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-3 text-sm font-black text-slate-500 dark:text-gray-400 bg-white dark:bg-gray-900 border border-border-slate dark:border-gray-800 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-800 transition-all uppercase tracking-widest"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="flex-1 py-3 bg-primary text-white text-sm font-black rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all uppercase tracking-widest"
          >
            Save
          </button>
        </footer>
      </div>
    </>
  );
};

const LabelsSection = () => (
  <div className="p-10 lg:p-12 animate-in fade-in duration-300">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
      <div className="shrink-0">
        <div className="w-36 h-36 rounded border-2 border-dashed border-slate-200 dark:border-gray-700 flex flex-col items-center justify-center bg-slate-50 dark:bg-gray-900 group hover:border-primary transition-colors cursor-pointer relative overflow-hidden">
          <span className="material-symbols-outlined !text-4xl text-slate-300 group-hover:text-primary mb-1">add_a_photo</span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logo</span>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="material-symbols-outlined text-white">edit</span>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-12 pb-24">
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-4 bg-primary rounded-full"></div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Primary Document Titles</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <LabelInput label="Invoice" value="Invoice" />
            <LabelInput label="Estimate" value="Estimate" />
            <LabelInput label="Purchase Order" value="Purchase Order" />
          </div>
        </section>
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-4 bg-primary rounded-full"></div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Common Labels & Fields</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <LabelInput label="Bill To" value="Bill To" />
            <LabelInput label="For" value="For" />
            <LabelInput label="Date" value="Date" />
            <LabelInput label="Term" value="Terms" />
            <LabelInput label="Invoice No." value="Invoice #" />
            <LabelInput label="Estimate No." value="Estimate #" />
            <LabelInput label="PO No." value="P.O. #" />
            <LabelInput label="Due Date" value="Due Date" />
          </div>
        </section>
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-4 bg-primary rounded-full"></div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Item Grid Columns</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <LabelInput label="Code" value="Code" />
            <LabelInput label="Description" value="Description" />
            <LabelInput label="Quantity" value="Qty" />
            <LabelInput label="Rate" value="Rate" />
            <LabelInput label="Tax" value="Tax" />
            <LabelInput label="Amount" value="Amount" />
            <LabelInput label="Total" value="Total" />
            <LabelInput label="Balance Due" value="Balance Due" />
          </div>
        </section>
      </div>
    </div>
  </div>
);

const AccountDetailSection = () => (
  <div className="p-10 max-w-5xl animate-in fade-in duration-300">
    <div className="space-y-12 pt-6">
      <section>
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full"></span> User Credentials
        </h4>
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-gray-800 group">
            <div className="flex-1">
              <label className="block text-[11px] font-black text-slate-400 uppercase mb-1 tracking-wider">Email Address</label>
              <div className="text-sm font-bold text-slate-700 dark:text-gray-200">billing@acmedigital.com</div>
            </div>
            <button className="text-[11px] font-black text-primary hover:underline uppercase tracking-tight">Edit</button>
          </div>
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-gray-800 group">
            <div className="flex-1">
              <label className="block text-[11px] font-black text-slate-400 uppercase mb-1 tracking-wider">Password</label>
              <div className="text-sm font-bold text-slate-700 dark:text-gray-200 tracking-widest">••••••••••••</div>
            </div>
            <button className="text-[11px] font-black text-primary hover:underline uppercase tracking-tight">Edit</button>
          </div>
        </div>
      </section>
      <section className="pt-8 border-t border-slate-100 dark:border-gray-800">
        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-red-500 mb-4 flex items-center gap-2">Danger Zone</h4>
        <p className="text-[13px] text-slate-500 font-medium mb-8 leading-relaxed">Once you delete your account, there is no going back. All your data including invoices, client history and reports will be permanently purged.</p>
        <button className="px-6 py-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm">Delete Account</button>
      </section>
    </div>
  </div>
);

const RemindersSection = () => (
  <div className="p-10 max-w-4xl animate-in fade-in duration-300">
    <div className="space-y-12 pt-4">
      <section>
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full"></span> Due Date Reminder
          </h4>
          <label className="relative inline-flex items-center cursor-pointer">
            <input checked readOnly className="sr-only peer" type="checkbox"/>
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Schedule</label>
            <select className="w-full h-11 px-4 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl bg-white dark:bg-gray-800 font-bold">
              <option>On due date</option>
              <option>1 day before</option>
              <option>3 days before</option>
              <option>1 week before</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Time</label>
            <input className="w-full h-11 px-4 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl font-bold" type="time" defaultValue="09:00"/>
          </div>
        </div>
      </section>
      <section>
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <span className="w-1 h-4 bg-orange-500 rounded-full"></span> Overdue Reminder
          </h4>
          <label className="relative inline-flex items-center cursor-pointer">
            <input checked readOnly className="sr-only peer" type="checkbox"/>
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Schedule</label>
            <select className="w-full h-11 px-4 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl bg-white dark:bg-gray-800 font-bold">
              <option>1 day after due date</option>
              <option>3 days after due date</option>
              <option>7 days after due date</option>
              <option>Every week until paid</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Time</label>
            <input className="w-full h-11 px-4 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl font-bold" type="time" defaultValue="10:00"/>
          </div>
        </div>
      </section>
    </div>
  </div>
);

const NumbersSection = () => (
  <div className="p-10 max-w-5xl animate-in fade-in duration-300">
    <section>
      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
        <span className="w-1 h-4 bg-primary rounded-full"></span> Invoice Sequence Settings
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-2">
          <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Next Number</label>
          <input className="w-full h-12 px-4 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl font-black text-lg focus:ring-4 focus:ring-primary/5" type="number" defaultValue="1054"/>
          <p className="text-[11px] text-slate-400 font-bold italic opacity-70">This is the number that will be assigned to your next invoice.</p>
        </div>
        <div className="space-y-2">
          <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest">Number Format</label>
          <select className="w-full h-12 px-4 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl bg-white dark:bg-gray-800 font-black">
            <option>NNNN (Default)</option>
            <option>No number</option>
            <option>NNN</option>
            <option>NNNNYY</option>
            <option>YYNNN</option>
            <option>Custom</option>
          </select>
          <p className="text-[11px] text-slate-400 font-black italic opacity-70">Preview: <span className="text-primary dark:text-blue-400">INV-2023-1054</span></p>
        </div>
      </div>
    </section>
  </div>
);

const FeedbackSection = () => (
  <div className="p-10 max-w-3xl animate-in fade-in duration-300">
    <div className="mb-10">
      <h1 className="text-3xl font-black text-primary dark:text-white mb-2">Help us improve</h1>
      <p className="text-slate-500 dark:text-gray-400 text-sm font-medium">Your feedback is vital in helping us provide the best experience for our enterprise billing platform.</p>
    </div>
    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-2">
        <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Feedback Category</label>
        <select className="w-full h-12 px-4 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl bg-white dark:bg-gray-800 font-bold">
          <option>General Suggestion</option>
          <option>Bug Report</option>
          <option>Feature Request</option>
          <option>Billing Issue</option>
          <option>Others</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Your Message</label>
        <textarea className="w-full p-6 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary min-h-[220px] font-medium resize-none shadow-inner" placeholder="Please describe your experience or suggestion in detail..."></textarea>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl border-2 border-dashed border-slate-200 dark:border-gray-700 flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 hover:border-primary transition-colors cursor-pointer group">
            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary !text-2xl">attach_file</span>
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-600 dark:text-gray-300 uppercase tracking-widest">Attach Screenshot</p>
            <p className="text-[10px] text-slate-400 font-bold opacity-70">JPG, PNG (Max 5MB)</p>
          </div>
        </div>
        <button className="px-10 h-14 bg-primary text-white rounded-xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all uppercase tracking-[0.15em]" type="submit">
          Submit Feedback
        </button>
      </div>
    </form>
  </div>
);

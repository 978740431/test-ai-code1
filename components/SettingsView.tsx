"use client";

import React, { useState } from 'react';

type SettingsTab = 
  | 'COMPANY_INFO' 
  | 'PAYMENT_METHODS' 
  | 'TAX' 
  | 'ACCOUNT_DETAIL' 
  | 'PDF_DESIGN' 
  | 'OPTION' 
  | 'LABELS' 
  | 'REMINDERS' 
  | 'NUMBERS' 
  | 'FEEDBACK';

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('COMPANY_INFO');

  const navGroups = [
    {
      title: 'Company',
      items: [
        { id: 'COMPANY_INFO', label: 'Company Info' },
        { id: 'PAYMENT_METHODS', label: 'Payment Methods' },
        { id: 'TAX', label: 'Tax' },
      ]
    },
    {
      title: 'Account & Security',
      items: [
        { id: 'ACCOUNT_DETAIL', label: 'Account Detail' },
      ]
    },
    {
      title: 'App Preferences',
      items: [
        { id: 'PDF_DESIGN', label: 'PDF Design' },
        { id: 'OPTION', label: 'Option' },
        { id: 'LABELS', label: 'Labels' },
        { id: 'REMINDERS', label: 'Invoice Reminders' },
        { id: 'NUMBERS', label: 'Numbers' },
      ]
    },
    {
      title: 'Others',
      items: [
        { id: 'FEEDBACK', label: 'Send Feedback' },
      ]
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'COMPANY_INFO': return <CompanyInfoSection />;
      case 'PAYMENT_METHODS': return <PaymentMethodsSection />;
      case 'TAX': return <TaxSection />;
      case 'ACCOUNT_DETAIL': return <AccountDetailSection />;
      case 'REMINDERS': return <InvoiceRemindersSection />;
      case 'NUMBERS': return <NumberingFormatsSection />;
      case 'FEEDBACK': return <FeedbackSection />;
      default: return <PlaceholderSection title={activeTab.replace('_', ' ')} />;
    }
  };

  return (
    <div className="flex h-full bg-white dark:bg-gray-900 overflow-hidden">
      <aside className="w-64 border-r border-border-slate dark:border-gray-800 flex flex-col shrink-0 bg-white dark:bg-gray-900">
        <div className="h-16 flex items-center px-6 border-b border-border-slate dark:border-gray-800">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Settings</h2>
        </div>
        <div className="flex-1 overflow-y-auto py-6 space-y-8 scrollbar-hide">
          {navGroups.map(group => (
            <div key={group.title}>
              <h3 className="px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">{group.title}</h3>
              <nav className="space-y-1">
                {group.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as SettingsTab)}
                    className={`w-full flex items-center px-6 py-2.5 text-[13px] transition-all text-left ${
                      activeTab === item.id 
                        ? 'bg-primary/5 text-primary font-bold border-r-2 border-primary dark:text-blue-400 dark:border-blue-400' 
                        : 'text-slate-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
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

      <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

// --- Common UI Components ---

const SectionHeader: React.FC<{ title: string; rightElement?: React.ReactNode }> = ({ title, rightElement }) => (
  <header className="flex h-16 items-center justify-between px-8 bg-white dark:bg-background-dark border-b border-border-slate dark:border-gray-800 shrink-0">
    <div className="text-xl font-black text-primary dark:text-white uppercase tracking-tight">
      {title}
    </div>
    {rightElement || (
      <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded font-bold text-sm shadow-sm hover:bg-primary/90 transition-colors uppercase tracking-wider">
        <span className="material-symbols-outlined !text-lg">save</span>
        Save Changes
      </button>
    )}
  </header>
);

const FormLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">{children}</label>
);

const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className="w-full h-10 px-4 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" />
);

// --- Content Sections ---

const CompanyInfoSection = () => (
  <div className="flex flex-col h-full bg-white dark:bg-gray-900">
    <SectionHeader title="Company Info" />
    <div className="flex-1 overflow-auto p-8 max-w-5xl">
      <div className="flex items-start gap-12 pt-4">
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-dashed border-slate-200 dark:border-gray-700 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 overflow-hidden hover:border-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined !text-4xl text-slate-300 group-hover:text-primary">add_a_photo</span>
              <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Upload Logo</span>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-12 pb-12">
          <section className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full"></span> Basic Information
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              <div className="col-span-2 space-y-1.5">
                <FormLabel>Business Name</FormLabel>
                <FormInput defaultValue="Acme Digital Solutions Ltd." />
              </div>
              <div className="space-y-1.5">
                <FormLabel>Email Address</FormLabel>
                <FormInput type="email" defaultValue="billing@acmedigital.com" />
              </div>
              <div className="space-y-1.5">
                <FormLabel>Phone Number</FormLabel>
                <FormInput defaultValue="+1 (555) 000-1234" />
              </div>
              <div className="col-span-2 space-y-1.5">
                <FormLabel>Address Line 1</FormLabel>
                <FormInput defaultValue="123 Innovation Drive, Suite 400" />
              </div>
              <div className="col-span-2 space-y-1.5">
                <FormLabel>Address Line 2</FormLabel>
                <FormInput defaultValue="Silicon Valley, CA 94025" />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full"></span> Financial & Tax Details
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              <div className="space-y-1.5">
                <FormLabel>Tax Registration Number</FormLabel>
                <FormInput defaultValue="VAT-99283741" />
              </div>
              <div className="space-y-1.5">
                <FormLabel>Default Currency</FormLabel>
                <select className="w-full h-10 px-4 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded focus:border-primary focus:ring-1 focus:ring-primary bg-white dark:bg-gray-800 outline-none">
                  <option>USD ($) - United States Dollar</option>
                  <option>EUR (€) - Euro</option>
                  <option>GBP (£) - British Pound</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <FormLabel>Tax Year Start</FormLabel>
                <select className="w-full h-10 px-4 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded focus:border-primary focus:ring-1 focus:ring-primary bg-white dark:bg-gray-800 outline-none">
                  <option>January</option>
                  <option>April</option>
                  <option>July</option>
                </select>
              </div>
              <div className="col-span-2 space-y-1.5">
                <FormLabel>Payment Terms (Default)</FormLabel>
                <textarea className="w-full px-4 py-3 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded focus:border-primary focus:ring-1 focus:ring-primary min-h-[100px] outline-none" defaultValue="Please pay within 30 days of receiving this invoice. Late payments are subject to a 2% monthly interest fee."></textarea>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full"></span> Authorized Signature
            </h4>
            <div className="border-2 border-dashed border-slate-200 dark:border-gray-700 rounded-2xl p-8 bg-gray-50 dark:bg-gray-800/30 flex flex-col items-center justify-center gap-3">
              <div className="h-16 flex items-center justify-center italic text-3xl font-serif text-primary dark:text-blue-400 opacity-60">Alex Thompson</div>
              <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">Replace Signature</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
);

const PaymentMethodsSection = () => (
  <div className="flex flex-col h-full bg-white dark:bg-gray-900">
    <SectionHeader title="Payment Methods" />
    <div className="flex-1 overflow-auto p-8 max-w-5xl space-y-10">
      <section className="space-y-6">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full"></span> Payment Instructions
        </h4>
        <div className="space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            These instructions will be displayed at the bottom of every invoice. Include bank transfer details, online payment links, or other relevant payment information.
          </p>
          <textarea 
            className="w-full p-6 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded focus:border-primary focus:ring-1 focus:ring-primary min-h-[480px] font-mono leading-relaxed outline-none transition-all shadow-inner"
            placeholder="Enter your detailed payment instructions here..."
          ></textarea>
        </div>
      </section>
    </div>
  </div>
);

const TaxSection = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 relative">
      <SectionHeader 
        title="Taxes" 
        rightElement={
          <button className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded font-bold text-sm shadow-sm hover:bg-primary/90 transition-colors uppercase tracking-wider">
            <span className="material-symbols-outlined !text-lg">add</span> New Tax
          </button>
        }
      />
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white dark:bg-gray-900 border border-border-slate dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left condensed-grid border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-gray-800/50 border-b border-border-slate dark:border-gray-800">
                <th className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-5 w-1/3">Tax Label</th>
                <th className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-5 w-1/4">Rate (%)</th>
                <th className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-5 w-1/4">Tax Inclusive</th>
                <th className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
              {[
                { name: 'Standard VAT', rate: '20%', enabled: true },
                { name: 'Compound Sales Tax', rate: '5% + 2%', enabled: false },
                { name: 'Municipal Surcharge', rate: '1.5%', enabled: true },
                { name: 'Service Fee Tax', rate: '8%', enabled: true },
              ].map((tax, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="font-bold text-slate-700 dark:text-gray-200 py-5">{tax.name}</td>
                  <td className="text-slate-600 dark:text-gray-400 font-medium py-5">{tax.rate}</td>
                  <td className="py-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${tax.enabled ? 'bg-success/10 text-success' : 'bg-slate-100 dark:bg-gray-700 text-slate-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${tax.enabled ? 'bg-success' : 'bg-slate-300'}`}></span>
                      {tax.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td className="text-right py-5">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setIsEditing(true)} className="p-2 text-slate-300 hover:text-primary transition-colors"><span className="material-symbols-outlined !text-xl">edit</span></button>
                      <button className="p-2 text-slate-300 hover:text-red-500 transition-colors"><span className="material-symbols-outlined !text-xl">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditing && (
        <div className="absolute inset-y-0 right-0 w-[420px] bg-white dark:bg-gray-900 border-l border-border-slate dark:border-gray-800 shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
          <header className="h-16 flex items-center justify-between px-6 border-b border-border-slate dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary dark:text-white">Edit Tax Label</h3>
            <button onClick={() => setIsEditing(false)} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </header>
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            <div className="space-y-1.5">
              <FormLabel>Tax Label</FormLabel>
              <FormInput defaultValue="Compound Sales Tax" />
            </div>
            <div className="space-y-6">
              <FormLabel>Rate (%)</FormLabel>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Rate</span>
                  <div className="relative">
                    <FormInput type="text" defaultValue="5.00" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">%</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secondary Rate</span>
                    <button className="text-[10px] font-black text-red-500 hover:text-red-600 uppercase tracking-widest">Remove</button>
                  </div>
                  <div className="relative">
                    <FormInput type="text" defaultValue="2.00" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">%</span>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-black text-primary dark:text-blue-400 hover:underline uppercase tracking-widest pt-2">
                  <span className="material-symbols-outlined !text-lg">add_circle</span>
                  Add rate
                </button>
              </div>
            </div>
            
            <div className="h-px bg-slate-100 dark:bg-gray-800"></div>

            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="block text-sm font-black text-slate-700 dark:text-gray-200 uppercase tracking-tight">Tax Inclusive</span>
                  <span className="block text-[11px] text-slate-400 font-medium">Rates already include tax in price</span>
                </div>
                <button className="w-11 h-6 bg-slate-200 rounded-full relative p-1 transition-all">
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="block text-sm font-black text-slate-700 dark:text-gray-200 uppercase tracking-tight">Apply to Items</span>
                  <span className="block text-[11px] text-slate-400 font-medium">Automatically apply to all new items</span>
                </div>
                <button className="w-11 h-6 bg-primary rounded-full relative p-1 transition-all">
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm ml-auto"></div>
                </button>
              </div>
            </div>
          </div>
          <footer className="p-6 border-t border-border-slate dark:border-gray-800 bg-slate-50/50 dark:bg-gray-800/30 flex items-center justify-between gap-4">
            <button onClick={() => setIsEditing(false)} className="flex-1 py-3 text-sm font-black text-slate-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-border-slate dark:border-gray-700 rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest">Cancel</button>
            <button onClick={() => setIsEditing(false)} className="flex-1 py-3 bg-primary text-white text-sm font-black rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">Save</button>
          </footer>
        </div>
      )}
    </div>
  );
};

const AccountDetailSection = () => (
  <div className="flex flex-col h-full bg-white dark:bg-gray-900">
    <SectionHeader title="Account Detail" />
    <div className="flex-1 overflow-auto p-8 max-w-5xl space-y-16 pt-16">
      <section className="space-y-10">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full"></span> User Credentials
        </h4>
        <div className="space-y-0">
          <div className="flex items-center justify-between py-8 border-b border-slate-100 dark:border-gray-800">
            <div className="flex-1 space-y-1">
              <FormLabel>Email Address</FormLabel>
              <div className="text-sm font-black text-slate-700 dark:text-gray-200">billing@acmedigital.com</div>
            </div>
            <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">Edit</button>
          </div>
          <div className="flex items-center justify-between py-8 border-b border-slate-100 dark:border-gray-800">
            <div className="flex-1 space-y-1">
              <FormLabel>Password</FormLabel>
              <div className="text-sm font-black text-slate-700 dark:text-gray-200 tracking-[0.3em]">••••••••••••</div>
            </div>
            <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">Edit</button>
          </div>
        </div>
      </section>

      <section className="pt-8 space-y-6">
        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-red-500 flex items-center gap-2">
          Danger Zone
        </h4>
        <div className="p-8 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-black text-red-600 uppercase tracking-tight">Delete Account</p>
            <p className="text-xs text-red-400 font-medium">Once you delete your account, there is no going back. All workspace data will be wiped.</p>
          </div>
          <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all">
            Delete Forever
          </button>
        </div>
      </section>
    </div>
  </div>
);

const InvoiceRemindersSection = () => (
  <div className="flex flex-col h-full bg-white dark:bg-gray-900">
    <SectionHeader title="Invoice Reminders" />
    <div className="flex-1 overflow-auto p-8 max-w-4xl pt-12 space-y-16">
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full"></span> Due Date Reminder
          </h4>
          <button className="w-11 h-6 bg-primary rounded-full relative p-1 transition-all">
            <div className="w-4 h-4 bg-white rounded-full shadow-sm ml-auto"></div>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-1.5">
            <FormLabel>Schedule</FormLabel>
            <select className="w-full h-11 px-4 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl focus:border-primary outline-none transition-all">
              <option>On due date</option>
              <option>1 day before</option>
              <option>3 days before</option>
              <option>1 week before</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <FormLabel>Time</FormLabel>
            <div className="relative">
              <input type="time" defaultValue="09:00" className="w-full h-11 px-4 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl focus:border-primary outline-none" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined !text-slate-300 pointer-events-none">schedule</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <span className="w-1 h-4 bg-orange-500 rounded-full"></span> Overdue Reminder
          </h4>
          <button className="w-11 h-6 bg-primary rounded-full relative p-1 transition-all">
            <div className="w-4 h-4 bg-white rounded-full shadow-sm ml-auto"></div>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-1.5">
            <FormLabel>Schedule</FormLabel>
            <select className="w-full h-11 px-4 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl focus:border-primary outline-none transition-all">
              <option>1 day after due date</option>
              <option>3 days after due date</option>
              <option>7 days after due date</option>
              <option>Every week until paid</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <FormLabel>Time</FormLabel>
            <div className="relative">
              <input type="time" defaultValue="10:00" className="w-full h-11 px-4 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl focus:border-primary outline-none" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined !text-slate-300 pointer-events-none">schedule</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);

const NumberingFormatsSection = () => (
  <div className="flex flex-col h-full bg-white dark:bg-gray-900">
    <SectionHeader title="Numbering Formats" />
    <div className="flex-1 overflow-auto p-12 max-w-5xl space-y-12">
      <section className="space-y-10">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full"></span> Invoice Sequence Settings
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="space-y-2">
            <FormLabel>Next Number</FormLabel>
            <FormInput type="number" defaultValue="1054" />
            <p className="text-[11px] text-slate-400 font-bold italic uppercase tracking-tight">This is the number that will be assigned to your next invoice.</p>
          </div>
          <div className="space-y-2">
            <FormLabel>Number Format</FormLabel>
            <select className="w-full h-11 px-4 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl focus:border-primary outline-none bg-white transition-all shadow-sm">
              <option>NNNN (Default)</option>
              <option>No number</option>
              <option>NNN</option>
              <option>NNNNYY</option>
              <option>YYNNN</option>
              <option>YYNN</option>
              <option>Custom</option>
            </select>
            <p className="text-[11px] text-slate-400 font-bold italic uppercase tracking-tight">Preview: <span className="text-primary dark:text-blue-400 font-black">INV-2023-1054</span></p>
          </div>
        </div>
      </section>
    </div>
  </div>
);

const FeedbackSection = () => (
  <div className="flex flex-col h-full bg-white dark:bg-gray-900">
    <SectionHeader 
      title="Send Feedback" 
      rightElement={
        <div className="text-[10px] font-black text-slate-400 px-4 py-1.5 bg-slate-100 dark:bg-gray-800 rounded-full uppercase tracking-widest">
          Last Feedback: 2 days ago
        </div>
      }
    />
    <div className="flex-1 overflow-auto p-12 max-w-4xl">
      <div className="mb-12 space-y-3">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Help us improve</h1>
        <p className="text-slate-500 font-medium text-sm">Your feedback is vital in helping us provide the best experience for our enterprise billing platform.</p>
      </div>
      <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <FormLabel>Feedback Category</FormLabel>
          <select className="w-full h-12 px-5 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded-2xl focus:border-primary outline-none transition-all shadow-sm">
            <option>General Suggestion</option>
            <option>Bug Report</option>
            <option>Feature Request</option>
            <option>Billing Issue</option>
            <option>Others</option>
          </select>
        </div>
        <div className="space-y-2">
          <FormLabel>Your Message</FormLabel>
          <textarea className="w-full p-6 text-sm border-slate-200 dark:border-gray-700 dark:bg-gray-800 rounded-2xl focus:border-primary outline-none min-h-[220px] resize-none shadow-inner" placeholder="Please describe your experience or suggestion in detail..."></textarea>
        </div>
        <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-gray-800">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-slate-200 dark:border-gray-700 flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 group-hover:border-primary group-hover:bg-primary/5 transition-all">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary !text-2xl">attach_file</span>
            </div>
            <div className="space-y-0.5">
              <p className="text-[11px] font-black text-slate-700 dark:text-gray-300 uppercase tracking-widest">Attach Screenshot</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">JPG, PNG (Max 5MB)</p>
            </div>
          </div>
          <button className="px-12 h-14 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all uppercase tracking-[0.2em]">
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  </div>
);

const PlaceholderSection: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col h-full">
    <SectionHeader title={title} />
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-gray-900">
      <div className="h-20 w-20 bg-slate-50 dark:bg-gray-800 rounded-3xl flex items-center justify-center mb-6 border border-border-slate dark:border-gray-700">
        <span className="material-symbols-outlined !text-4xl text-slate-300">settings</span>
      </div>
      <h3 className="text-xl font-black text-primary dark:text-white uppercase mb-2">Configure {title}</h3>
      <p className="text-sm text-slate-500 max-w-sm">This section allows you to customize advanced parameters for your workspace.</p>
    </div>
  </div>
);

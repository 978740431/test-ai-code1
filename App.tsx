
import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { InvoiceTable } from './components/InvoiceTable';
import { Dashboard } from './components/Dashboard';
import { RecordPaymentModal } from './components/RecordPaymentModal';
import { NewInvoiceModal } from './components/NewInvoiceModal';
import { SubscriptionView } from './components/SubscriptionView';
import { SettingsView } from './components/SettingsView';
import { ClientManagement } from './components/ClientManagement';
import { ItemManagement } from './components/ItemManagement';
import { MOCK_INVOICES } from './constants';
import { ViewType, InvoiceStatus, Invoice } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('OVERVIEW');
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [selectedInvoices, setSelectedInvoices] = useState<Set<string>>(new Set());
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isNewInvoiceModalOpen, setIsNewInvoiceModalOpen] = useState(false);
  const [activeInvoiceId, setActiveInvoiceId] = useState<string | null>(null);

  const activeInvoice = useMemo(() => 
    invoices.find(inv => inv.id === activeInvoiceId), 
    [activeInvoiceId, invoices]
  );

  const toggleInvoiceSelection = (id: string) => {
    setSelectedInvoices(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleRecordPayment = (id: string) => {
    setActiveInvoiceId(id);
    setIsPaymentModalOpen(true);
  };

  const handleSaveInvoice = (newInv: Invoice) => {
    setInvoices([newInv, ...invoices]);
  };

  const handleExport = () => {
    alert('Exporting data as CSV...');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'OVERVIEW':
        return <Dashboard />;
      case 'INVOICES':
        return (
          <InvoiceTable 
            invoices={invoices} 
            selectedIds={selectedInvoices}
            onToggleSelect={toggleInvoiceSelection}
            onRecordPayment={handleRecordPayment}
            onNewInvoice={() => setIsNewInvoiceModalOpen(true)}
            onExport={handleExport}
          />
        );
      case 'CLIENTS':
        return <ClientManagement />;
      case 'ITEMS':
        return <ItemManagement />;
      case 'SUBSCRIPTION':
        return <SubscriptionView />;
      case 'SETTINGS':
        return <SettingsView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>

        {selectedInvoices.size > 0 && currentView === 'INVOICES' && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 w-fit animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-0 px-1 py-1 bg-gray-900/95 backdrop-blur-md text-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden">
              <div className="flex items-center gap-3 px-8 py-4 bg-white/5 rounded-l-2xl">
                <span className="flex items-center justify-center w-7 h-7 bg-blue-500 text-[12px] font-black rounded-xl shadow-xl shadow-blue-500/40">
                  {selectedInvoices.size}
                </span>
                <span className="text-[15px] font-black uppercase tracking-widest">Invoices</span>
              </div>
              <div className="flex items-center px-4">
                <button className="group flex flex-col items-center justify-center px-8 py-3 hover:bg-white/5 transition-all rounded-xl">
                  <span className="material-symbols-outlined !text-2xl group-hover:scale-125 transition-transform text-blue-400">payments</span>
                  <span className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-60">Pay</span>
                </button>
                <div className="h-12 w-[1px] bg-white/10 mx-2"></div>
                <button className="group flex flex-col items-center justify-center px-8 py-3 hover:bg-white/5 transition-all rounded-xl">
                  <span className="material-symbols-outlined !text-2xl group-hover:scale-125 transition-transform text-emerald-400">mail</span>
                  <span className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-60">Send</span>
                </button>
                <div className="h-12 w-[1px] bg-white/10 mx-2"></div>
                <button className="group flex flex-col items-center justify-center px-8 py-3 hover:bg-red-500/20 text-red-400 transition-all rounded-xl">
                  <span className="material-symbols-outlined !text-2xl group-hover:scale-125 transition-transform">delete</span>
                  <span className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-60">Del</span>
                </button>
              </div>
              <button 
                onClick={() => setSelectedInvoices(new Set())} 
                className="px-6 py-4 bg-white/5 hover:bg-white/10 transition-colors border-l border-white/10"
              >
                <span className="material-symbols-outlined !text-xl text-white/40 hover:text-white transition-colors">close</span>
              </button>
            </div>
          </div>
        )}
      </main>

      <RecordPaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        invoiceBalance={activeInvoice?.amount || 0}
      />

      <NewInvoiceModal 
        isOpen={isNewInvoiceModalOpen}
        onClose={() => setIsNewInvoiceModalOpen(false)}
        onSave={handleSaveInvoice}
      />
    </div>
  );
};

export default App;


import React from 'react';
import { MOCK_INVOICES } from '../constants';
import { InvoiceStatus } from '../types';

export const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Revenue', value: '$124,592.00', change: '+12.5%', icon: 'payments', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Invoices', value: '12', change: '-2', icon: 'schedule', color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Overdue Amount', value: '$22,000.00', change: '+5.2%', icon: 'warning', color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Active Clients', value: '48', change: '+4', icon: 'group', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full scrollbar-hide">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-primary tracking-tight">Financial Overview</h1>
        <p className="text-sm text-slate-500 font-medium">Welcome back, Alex. Here's what's happening with your business today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-border-slate dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`h-12 w-12 ${stat.bg} dark:bg-gray-800 rounded-lg flex items-center justify-center ${stat.color}`}>
                <span className="material-symbols-outlined !text-2xl">{stat.icon}</span>
              </div>
              <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-primary dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-border-slate dark:border-gray-800 shadow-sm p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-primary dark:text-white uppercase tracking-wider text-xs">Revenue Trend</h3>
            <select className="text-xs font-bold border-none bg-slate-100 dark:bg-gray-800 rounded-lg px-3 py-1.5 focus:ring-0">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 px-2 relative">
             {/* Mock Chart using CSS/Borders */}
             {[45, 70, 55, 90, 65, 85].map((height, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                 <div 
                   className="w-full bg-primary/10 dark:bg-primary/20 rounded-t-lg relative group-hover:bg-primary/30 transition-all cursor-pointer" 
                   style={{ height: `${height}%` }}
                 >
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                     ${(height * 200).toLocaleString()}
                   </div>
                 </div>
                 <span className="text-[10px] font-bold text-slate-400 uppercase">
                   {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][i]}
                 </span>
               </div>
             ))}
             {/* Simple background grid lines */}
             <div className="absolute inset-x-0 bottom-8 h-[1px] bg-slate-100 dark:bg-gray-800 z-0"></div>
             <div className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-100 dark:bg-gray-800 z-0"></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-border-slate dark:border-gray-800 shadow-sm p-6 flex flex-col">
          <h3 className="font-black text-primary dark:text-white uppercase tracking-wider text-xs mb-6">Recent Activity</h3>
          <div className="space-y-6 flex-1">
            {MOCK_INVOICES.slice(0, 4).map((inv, i) => (
              <div key={i} className="flex items-start gap-3 relative">
                {i !== 3 && <div className="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-slate-100 dark:bg-gray-800"></div>}
                <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                  inv.status === InvoiceStatus.PAID ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  <span className="material-symbols-outlined !text-[14px]">
                    {inv.status === InvoiceStatus.PAID ? 'check' : 'history'}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-700 dark:text-gray-300">
                    Invoice <span className="text-primary font-black">#{inv.invoiceNumber}</span> was {inv.status === InvoiceStatus.PAID ? 'marked as paid' : 'sent to client'}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">{inv.clientName} • 2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 text-xs font-bold text-primary hover:underline flex items-center gap-1">
            View all activity <span className="material-symbols-outlined !text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

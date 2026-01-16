"use client";

import React from 'react';

/**
 * SubscriptionView displays the current billing status and available plans.
 */
export const SubscriptionView: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-primary dark:text-white tracking-tight">Subscription Plan</h2>
        <p className="text-slate-500 font-medium">Manage your billing cycles and workspace limitations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Active Plan */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border-2 border-primary shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">
            Currently Active
          </div>
          <h3 className="text-xl font-black text-primary dark:text-white mb-2">Enterprise Pro</h3>
          <p className="text-5xl font-black text-primary dark:text-white mb-6">$49<span className="text-lg text-slate-400 font-bold">/mo</span></p>
          
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-gray-300">
              <span className="material-symbols-outlined text-success">check_circle</span>
              Unlimited Invoices & Clients
            </li>
            <li className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-gray-300">
              <span className="material-symbols-outlined text-success">check_circle</span>
              Advanced White-labeling
            </li>
            <li className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-gray-300">
              <span className="material-symbols-outlined text-success">check_circle</span>
              Team Collaboration (10 Users)
            </li>
          </ul>

          <button className="w-full py-4 bg-slate-100 dark:bg-gray-800 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-xs cursor-not-allowed">
            Current Plan
          </button>
        </div>

        {/* Upgrade Card */}
        <div className="bg-slate-50 dark:bg-gray-800/20 p-8 rounded-[2rem] border border-dashed border-slate-300 dark:border-gray-700 flex flex-col justify-center items-center text-center">
          <div className="h-16 w-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center mb-6">
            <span className="material-symbols-outlined !text-3xl text-primary">rocket_launch</span>
          </div>
          <h3 className="text-lg font-black text-primary dark:text-white mb-2">Need more power?</h3>
          <p className="text-sm text-slate-500 mb-8 max-w-[240px]">Upgrade to custom dedicated infrastructure and unlimited team members.</p>
          <button className="px-8 py-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-primary dark:text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

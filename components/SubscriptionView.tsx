
import React from 'react';

export const SubscriptionView: React.FC = () => {
  const plans = [
    { name: 'Starter', price: '0', features: ['5 Invoices / Mo', '1 User', 'Standard Support'], current: false },
    { name: 'Professional', price: '29', features: ['Unlimited Invoices', '5 Users', 'Priority Support', 'Custom Branding'], current: true },
    { name: 'Enterprise', price: '99', features: ['Unlimited Everything', 'White-labeling', 'API Access', 'Dedicated Account Manager'], current: false },
  ];

  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full scrollbar-hide">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-primary dark:text-white tracking-tight">Subscription & Billing</h1>
        <p className="text-sm text-slate-500 font-medium">Manage your plan, payment methods, and billing history.</p>
      </div>

      <div className="bg-gradient-to-br from-primary to-blue-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">Current Plan</span>
            <h2 className="text-3xl font-black mb-2">Professional Tier</h2>
            <p className="text-blue-100 font-medium">Your next billing date is <span className="font-bold">Nov 24, 2023</span> for <span className="font-bold">$29.00</span></p>
          </div>
          <button className="px-6 py-3 bg-white text-primary rounded-xl font-black text-sm shadow-xl hover:bg-blue-50 transition-colors">Manage Payment</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div key={i} className={`p-8 rounded-3xl border ${plan.current ? 'border-primary bg-white dark:bg-gray-800 shadow-xl scale-105' : 'border-border-slate bg-white/50 dark:bg-gray-900/50'} relative flex flex-col`}>
            {plan.current && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-[10px] font-black rounded-full uppercase tracking-tighter">Current Plan</span>}
            <h3 className="text-lg font-black text-primary dark:text-white mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-black text-primary dark:text-white">${plan.price}</span>
              <span className="text-slate-400 font-bold text-sm">/month</span>
            </div>
            <ul className="space-y-4 mb-12 flex-1">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-gray-400">
                  <span className="material-symbols-outlined !text-lg text-success">check_circle</span>
                  {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 rounded-xl font-black text-sm transition-all ${plan.current ? 'bg-slate-100 dark:bg-gray-700 text-slate-400 cursor-not-allowed' : 'bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02]'}`}>
              {plan.current ? 'Active' : 'Upgrade Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

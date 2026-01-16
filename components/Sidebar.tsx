
import React, { useEffect, useState } from 'react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // The sidebar shrinks when in Settings view to allow more space for sub-navigation
  const isCollapsed = currentView === 'SETTINGS';

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navItems = [
    { id: 'OVERVIEW' as ViewType, label: 'Overview', icon: 'dashboard' },
    { id: 'INVOICES' as ViewType, label: 'Invoices', icon: 'description' },
    { id: 'CLIENTS' as ViewType, label: 'Clients', icon: 'group' },
    { id: 'ITEMS' as ViewType, label: 'Items', icon: 'inventory_2' },
    { id: 'SUBSCRIPTION' as ViewType, label: 'Subscription', icon: 'credit_card' },
    { id: 'SETTINGS' as ViewType, label: 'Settings', icon: 'settings' },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-60'} bg-sidebar-bg flex flex-col shrink-0 border-r border-gray-700/30 transition-all duration-300 ease-in-out`}>
      <div className={`px-4 h-16 flex items-center border-b border-gray-700/30 ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
        <a className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity" href="#">
          <div className="h-9 w-9 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
            <span className="material-symbols-outlined !text-xl text-white">account_balance_wallet</span>
          </div>
          {!isCollapsed && <span className="text-lg font-black tracking-tight whitespace-nowrap">Invoice Mate</span>}
        </a>
      </div>
      
      <nav className="flex-1 flex flex-col py-4 gap-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            title={isCollapsed ? item.label : ''}
            className={`flex items-center rounded-xl transition-all group relative mx-2 py-3 ${
              isCollapsed ? 'justify-center' : 'px-4 gap-4'
            } ${
              currentView === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-sidebar-text hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <span className={`material-symbols-outlined !text-[22px] ${currentView === item.id ? 'text-white' : 'group-hover:text-blue-400'}`}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <span className={`text-sm tracking-wide whitespace-nowrap ${currentView === item.id ? 'font-black' : 'font-bold'}`}>
                {item.label}
              </span>
            )}
            {currentView === item.id && isCollapsed && (
              <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-white rounded-r-full"></span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-3 mt-auto bg-gray-900/40 border-t border-gray-700 space-y-4">
        <div className={`flex flex-col gap-3 ${isCollapsed ? 'items-center' : ''}`}>
          <div className="flex items-center justify-between w-full px-1">
             {!isCollapsed && <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Interface</span>}
             <button 
               onClick={() => setIsDarkMode(!isDarkMode)}
               className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
             >
               <span className="material-symbols-outlined !text-sm text-amber-400">
                 {isDarkMode ? 'dark_mode' : 'light_mode'}
               </span>
             </button>
          </div>
          
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-1'}`}>
            <div className="h-9 w-9 rounded-xl bg-cover bg-center border border-gray-600 shrink-0 shadow-inner" 
                 style={{ backgroundImage: `url('https://picsum.photos/200/200?random=user')` }}></div>
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-black text-white truncate leading-tight">Alex Thompson</p>
                <p className="text-[10px] text-sidebar-text truncate font-bold uppercase tracking-tighter opacity-70">Pro Account</p>
              </div>
            )}
          </div>
          
          <button className={`w-full flex items-center justify-center gap-2 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl transition-all text-[11px] font-black uppercase tracking-widest ${isCollapsed ? 'px-0' : 'px-3'}`}>
            <span className="material-symbols-outlined !text-[18px]">logout</span>
            {!isCollapsed && "Sign Out"}
          </button>
        </div>
      </div>
    </aside>
  );
};

import React from 'react';
import { 
  BarChart3, 
  LayoutDashboard, 
  Terminal, 
  Sparkles, 
  History, 
  Settings, 
  Plus, 
  HelpCircle,
  Database
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false }) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative ${
      active 
        ? 'bg-indigo-600/10 text-indigo-400' 
        : 'text-slate-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon size={20} strokeWidth={active ? 2.5 : 2} />
    <span className={`text-sm font-medium ${active ? 'font-semibold' : ''}`}>{label}</span>
    {active && (
      <div className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full" />
    )}
  </button>
);

const Sidebar = ({ currentView, onNavigate }) => {
  return (
    <aside className="w-68 h-full bg-[#0a0f1c] border-r border-white/5 flex flex-col p-6 z-50">
      {/* Logo */}
      <div 
        className="flex items-center gap-3 px-2 mb-10 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => onNavigate('dashboard')}
      >
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Database size={24} className="text-white" fill="white" fillOpacity={0.2} />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-white leading-none mb-1">QueryCart</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-indigo-400/80 font-bold">Analytical Luminary</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1.5">
        <div onClick={() => onNavigate('dashboard')}>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={currentView === 'dashboard'} />
        </div>
        <div onClick={() => onNavigate('query-studio')}>
          <SidebarItem icon={Terminal} label="Query Studio" active={currentView === 'query-studio'} />
        </div>
        <div onClick={() => onNavigate('insights')}>
          <SidebarItem icon={Sparkles} label="Insights" active={currentView === 'insights'} />
        </div>
        <div onClick={() => onNavigate('history')}>
          <SidebarItem icon={History} label="History" active={currentView === 'history'} />
        </div>
        
        <div className="pt-6 pb-2">
          <span className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">System</span>
        </div>
        <div onClick={() => onNavigate('settings')}>
          <SidebarItem icon={Settings} label="Settings" active={currentView === 'settings'} />
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
        <button 
          onClick={() => onNavigate('new-analysis')}
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-semibold shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus size={18} />
          <span className="text-sm">New Analysis</span>
        </button>
        
        <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-slate-300 transition-colors">
          <HelpCircle size={18} />
          <span className="text-sm font-medium">Support</span>
        </button>
      </div>

      {/* Version */}
      <div className="mt-4 px-4">
        <span className="text-[10px] text-slate-600 font-mono">v2.1.0-stable</span>
      </div>
    </aside>
  );
};


export default Sidebar;

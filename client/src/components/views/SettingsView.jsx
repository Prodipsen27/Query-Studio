import React, { useState } from 'react';
import { 
  User, 
  Key, 
  Lock,
  Bell, 
  Shield, 
  Monitor, 
  Database, 
  Save,
  RefreshCw
} from 'lucide-react';


const SettingsSection = ({ title, description, children }) => (
  <div className="glass-card p-8 rounded-3xl space-y-6">
    <div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-sm text-slate-500 font-medium mt-1">{description}</p>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const SettingsField = ({ label, icon: Icon, children }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400">
        <Icon size={16} />
      </div>
      <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{label}</span>
    </div>
    <div className="flex-1 max-w-md w-full">
      {children}
    </div>
  </div>
);

const SettingsView = ({ theme, setTheme, stats }) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const themes = [
    { id: 'midnight', label: 'Midnight' },
    { id: 'oceanic', label: 'Oceanic' },
    { id: 'deep-space', label: 'Deep Space' }
  ];

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("studio_theme", newTheme);
  };

  return (
    <div className="max-w-4xl space-y-10 animate-fade-in pb-20">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold text-white">System Configuration</h1>
        <p className="text-slate-500 text-sm">Manage your analysis credentials and interface preferences</p>
      </section>

      {/* Profile Section */}
      <SettingsSection 
        title="User Profile" 
        description="Public identity and analyst credentials within the Studio."
      >
        <SettingsField label="Full Name" icon={User}>
          <input 
            type="text" 
            defaultValue="Alex Rivera" 
            className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-primary/50 transition-all font-medium"
          />
        </SettingsField>
        <SettingsField label="Current Role" icon={Shield}>
          <input 
            type="text" 
            defaultValue="Lead Business Analyst" 
            className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-primary/50 transition-all font-medium"
          />
        </SettingsField>
      </SettingsSection>

      {/* API Credentials */}
      <SettingsSection 
        title="API Credentials" 
        description="Encryption-protected tokens for AI model access."
      >
        <SettingsField label="GitHub Token" icon={Lock}>
          <input 
            type="password" 
            defaultValue="********************************" 
            className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-primary outline-none focus:border-primary/50 transition-all font-mono"
          />
        </SettingsField>
        <SettingsField label="Model Version" icon={RefreshCw}>
          <select className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-primary/50 transition-all font-medium appearance-none">
            <option>GPT-4o (Standard)</option>
            <option>GPT-4o Mini (High Efficiency)</option>
            <option>Claude 3.5 Sonnet</option>
          </select>
        </SettingsField>
      </SettingsSection>

      {/* Interface Settings */}
      <SettingsSection 
        title="Interface" 
        description="Customize the workspace aesthetics and behavior."
      >
        <SettingsField label="Studio Theme" icon={Monitor}>
          <div className="flex gap-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                  theme === t.id
                    ? 'bg-primary/20 border border-primary/40 text-primary shadow-lg shadow-primary/10'
                    : 'bg-white/5 border border-white/5 text-slate-500 hover:text-white hover:bg-white/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </SettingsField>
        <SettingsField label="Notification" icon={Bell}>
          <div className="flex items-center gap-4">
             <label className="flex items-center gap-2 cursor-pointer group">
               <div className="w-10 h-5 bg-primary rounded-full relative transition-colors">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
               </div>
               <span className="text-xs font-bold text-slate-500 group-hover:text-slate-300">Analysis Alerts</span>
             </label>
          </div>
        </SettingsField>
      </SettingsSection>

      {/* System Status */}
      <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-2xl flex items-center justify-center">
            <Database size={24} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Database Connectivity: Active</h4>
            <p className="text-[10px] text-emerald-500/60 font-bold uppercase tracking-[0.15em]">{stats?.dbName || "Loading..."} Connection Node</p>
          </div>
        </div>
        <button className="px-6 py-2.5 bg-background/50 hover:bg-white/5 text-xs font-bold text-white rounded-xl border border-white/10 transition-all">
          Connection Test
        </button>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-8 py-3 bg-primary hover:opacity-90 text-white rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSaving ? (
            <>
              <RefreshCw size={18} className="animate-spin" />
              Applying Settings...
            </>
          ) : (
            <>
              <Save size={18} />
              Save Configuration
            </>
          )}
        </button>
      </div>
    </div>
  );
};


export default SettingsView;

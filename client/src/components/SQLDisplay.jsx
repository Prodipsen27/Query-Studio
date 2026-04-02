import React from 'react';
import { Terminal, Copy, Check, Sparkles, Cpu } from 'lucide-react';
import { useState } from 'react';

const SQLDisplay = ({ sql }) => {
  const [copied, setCopied] = useState(false);

  if (!sql) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-fade-in">
      <div className="flex flex-col lg:flex-row">
        {/* Left Side: Interpretation */}
        <div className="lg:w-1/3 p-6 border-b lg:border-b-0 lg:border-r border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Query Strategy</h3>
            <span className="flex items-center gap-1 text-[10px] font-bold bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">
              <Cpu size={10} />
              GPT-4 Optimized
            </span>
          </div>
          
          <p className="text-sm text-slate-300 leading-relaxed">
            Interpreting your question to extract <span className="text-indigo-400 font-medium">categorical groupings</span> and 
            <span className="text-indigo-400 font-medium"> aggregated metrics</span>. 
            Joining relevant transactional tables to provide a comprehensive dimensional view.
          </p>

          <div className="pt-2">
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-[11px] text-slate-500">
                <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                Index optimized execution
              </li>
              <li className="flex items-center gap-2 text-[11px] text-slate-500">
                <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                Read-only safety enforced
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Code Terminal */}
        <div className="lg:w-2/3 bg-black/40 p-1 flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-500">PostgreSQL v16.2</span>
              <button 
                onClick={copyToClipboard}
                className="p-1.5 hover:bg-white/5 rounded-md transition-colors text-slate-500 hover:text-white"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
          
          <div className="p-6 font-mono text-xs leading-relaxed text-indigo-300/90 overflow-x-auto whitespace-pre">
            {sql}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SQLDisplay;
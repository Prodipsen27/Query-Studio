import React from 'react';
import { 
  History as HistoryIcon, 
  Search, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  Database,
  Type
} from 'lucide-react';

const HistoryView = ({ history = [], onReRun, onClear }) => {
  return (
    <div className="space-y-10 animate-fade-in max-w-4xl">
      <section className="flex items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
             <div className="p-2 rounded-xl bg-primary/20 text-primary">
               <HistoryIcon size={24} />
             </div>
             Query History
          </h1>

          <p className="text-slate-500 text-sm">Review and re-run your previous natural language analyses</p>
        </div>
        {history.length > 0 && (
          <button 
            onClick={onClear}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-xs font-bold rounded-xl transition-all border border-rose-500/20"
          >
            <Trash2 size={14} />
            Empty Archives
          </button>
        )}
      </section>

      {/* History List */}
      <div className="space-y-4">
        {history.length === 0 ? (
          <div className="py-32 flex flex-col items-center text-center space-y-6 opacity-30">
            <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/5">
               <HistoryIcon size={32} className="text-slate-500" />
            </div>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">No past queries found. Start analyzing in the Query Studio to build your history.</p>
          </div>
        ) : (
          history.map((item, index) => (
            <div 
              key={index}
              className="glass-card group hover:border-primary/30 transition-all cursor-pointer p-1 rounded-2xl"
              onClick={() => onReRun(item.question)}
            >

              <div className="p-5 flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                    <Search size={16} />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors tracking-tight">
                      {item.question}
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                       <span className="flex items-center gap-1"><Database size={10} /> {item.rowCount || 0} Records</span>
                       <span className="flex items-center gap-1"><Type size={10} /> {item.timestamp || 'Just now'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                   <button className="p-2 text-slate-500 hover:text-primary">
                     <ExternalLink size={16} />
                   </button>
                   <ChevronRight size={18} className="text-primary" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tip */}
      {history.length > 0 && (
        <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">!</div>
           <p className="text-xs text-slate-400 leading-relaxed font-medium">
             History is stored locally in your browser cache. Clearing site data will reset these archives.
           </p>
        </div>
      )}

    </div>
  );
};

export default HistoryView;

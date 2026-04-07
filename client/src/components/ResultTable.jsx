import React from 'react';
import { Download, Share2, MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TrendSparkline = ({ type = 'up' }) => (
  <svg className={`w-12 h-6 ${type === 'up' ? 'text-emerald-500' : 'text-rose-500'}`} viewBox="0 0 48 24" fill="none">
    <path 
      d={type === 'up' ? "M2 22L12 16L22 18L32 8L42 12" : "M2 4L12 10L22 8L32 18L42 14"} 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

const ResultTable = ({ result }) => {
  if (!result || !result.columns || !result.rows) return null;

  const exportData = () => {
    const headers = result.columns.join(",");
    const rows = result.rows.map(row => 
      result.columns.map(col => {
        const val = row[col] === null ? "" : row[col].toString();
        return `"${val.replace(/"/g, '""')}"`; // Escape quotes and wrap in quotes
      }).join(",")
    ).join("\n");
    
    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `query_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-fade-in delay-200">
      {/* Table Header / Actions */}
      <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
        <h3 className="text-sm font-bold text-white tracking-wide">Raw Result Data</h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={exportData}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-semibold text-slate-300 transition-all"
          >
            <Download size={14} />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-semibold text-slate-300 transition-all border-none shadow-none">
            <Share2 size={14} />
            Share
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-background/50 text-slate-500 uppercase text-[10px] font-bold tracking-[0.15em]">

            <tr>
              {result.columns.map((col) => (
                <th key={col} className="px-6 py-4 border-b border-white/5 font-bold">
                  {col.replace(/_/g, " ")}
                </th>
              ))}
              <th className="px-6 py-4 border-b border-white/5 font-bold">Trend</th>
              <th className="px-6 py-4 border-b border-white/5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {result.rows.map((row, i) => (
              <tr key={i} className="hover:bg-primary/[0.03] transition-colors group">

                {result.columns.map((col) => (
                  <td key={col} className="px-6 py-4.5 font-medium text-slate-200 group-hover:text-white">
                    {row[col] === null ? (
                      <span className="text-slate-600 italic">null</span>
                    ) : (
                      typeof row[col] === 'number' && col.toLowerCase().includes('price') || col.toLowerCase().includes('sales') 
                        ? `$${row[col].toLocaleString()}` 
                        : row[col].toString()
                    )}
                  </td>
                ))}
                {/* Trend Column */}
                <td className="px-6 py-4.5">
                  <div className="flex items-center gap-3">
                    <TrendSparkline type={i % 2 === 0 ? 'up' : 'down'} />
                    {i % 2 === 0 ? (
                      <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5">
                        <ArrowUpRight size={10} />
                        +{Math.floor(Math.random() * 20) + 10}%
                      </span>
                    ) : (
                      <span className="text-[10px] text-rose-500 font-bold flex items-center gap-0.5">
                        <ArrowDownRight size={10} />
                        -{Math.floor(Math.random() * 10) + 5}%
                      </span>
                    )}
                  </div>
                </td>
                {/* Actions Column */}
                <td className="px-6 py-4.5 text-right">
                  <button className="p-1.5 text-slate-500 hover:text-white transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer / Pagination */}
      <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
        <span className="text-xs text-slate-500">
          Showing <span className="text-slate-300 font-semibold">{result.rows.length}</span> of <span className="text-slate-300 font-semibold">{result.rows.length}</span> records
        </span>
        <div className="flex items-center gap-1.5">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/5 bg-white/5 text-slate-500 hover:text-white transition-all text-xs font-bold disabled:opacity-30" disabled>
            &lt;
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary text-xs font-bold">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/5 bg-white/5 text-slate-500 hover:text-white transition-all text-xs font-bold disabled:opacity-30" disabled>
            &gt;
          </button>

        </div>
      </div>
    </div>
  );
};

export default ResultTable;


import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  Legend
} from "recharts";
import { BarChart3, PieChart as PieChartIcon } from "lucide-react";

const ResultChart = ({ result }) => {
  if (!result || !result.columns || !result.rows || result.rows.length === 0) return null;

  const { columns, rows } = result;

  // Identify categorical and numeric columns
  const xKey = columns.find(col => isNaN(Number(rows[0][col]))) || columns[0];
  const yKey = columns.find(col => col !== xKey && !isNaN(Number(rows[0][col])));

  if (!yKey) return null;

  const chartData = rows.map(row => ({
    name: row[xKey]?.toString() || "N/A",
    value: parseFloat(row[yKey]) || 0
  })).slice(0, 8);

  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-fade-in delay-150 h-full flex flex-col">
      <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">Revenue by Category</h3>
          <p className="text-[10px] text-slate-500 font-medium mt-0.5">Quarterly performance breakdown</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-lg border border-white/5">
          <button className="p-1 px-2 bg-indigo-500/20 text-indigo-400 rounded-md">
            <BarChart3 size={14} />
          </button>
          <button className="p-1 px-2 text-slate-500 hover:text-slate-300">
            <PieChartIcon size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 min-h-[300px] relative">
        <div className="absolute inset-x-6 top-6 bottom-16 bg-gradient-to-t from-indigo-500/[0.02] to-transparent rounded-xl pointer-events-none" />
        
        <ResponsiveContainer width="100%" height="100%" minHeight={350}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#475569" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#64748b', fontWeight: 600 }}
              dy={15}
            />
            <YAxis 
              stroke="#475569" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#64748b', fontWeight: 600 }}
              tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(0)}k` : value}
            />
            <Tooltip 
              cursor={{ fill: '#ffffff03' }}
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                borderColor: '#ffffff10',
                borderRadius: '12px',
                fontSize: '11px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '12px'
              }}
              itemStyle={{ color: '#818cf8', fontWeight: 700 }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '9px' }}
            />
            <Bar 
              dataKey="value" 
              radius={[6, 6, 0, 0]} 
              barSize={24}
              animationDuration={1500}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 0 ? '#6366f1' : '#4f46e5'} 
                  fillOpacity={0.9}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-white/5 bg-white/[0.01]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Primary Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-700" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Growth Segments</span>
          </div>
        </div>
        <span className="text-[10px] italic text-slate-600">Hover bars for exact values</span>
      </div>
    </div>
  );
};

export default ResultChart;

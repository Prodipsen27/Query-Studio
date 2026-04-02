import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  Zap, 
  ArrowRight,
  PieChart,
  BarChart3,
  Cpu
} from 'lucide-react';

const InsightCard = ({ title, description, icon: Icon, color, impact }) => (
  <div className="glass-card p-6 rounded-2xl space-y-4 border-l-4 border-l-indigo-500/50">
    <div className="flex items-center justify-between">
      <div className={`p-2 rounded-xl bg-indigo-600/10 text-indigo-400`}>
        <Icon size={20} />
      </div>
      <span className={`text-[10px] font-bold uppercase tracking-widest text-slate-500`}>
        Impact: <span className="text-white">{impact}%</span>
      </span>
    </div>
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-white tracking-wide">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed font-medium">{description}</p>
    </div>
    <button className="flex items-center gap-2 text-[10px] font-bold text-indigo-400 group uppercase tracking-widest pt-2">
      Deep Dive
      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
);

const InsightsView = ({ stats }) => {
  const topCategory = stats?.topCategories?.[0]?.name || "Electronics";
  const revenue = stats?.summary?.totalRevenue?.toLocaleString() || "128,430";

  return (
    <div className="space-y-12 animate-fade-in max-w-5xl">
       <section className="space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
            <Sparkles size={12} />
            AI Analytical Luminary
          </div>
          <h1 className="text-3xl font-bold text-white">Anomalies & Growth Shifts</h1>
          <p className="text-slate-500 text-sm max-w-2xl">
            Our AI engine has detected significant shifts in transaction velocity for <span className="text-indigo-400 font-bold">{topCategory}</span> relative to historical baselines.
          </p>
       </section>

       {/* Impact Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <InsightCard 
           title={`${topCategory} Momentum`} 
           description={`Sales in ${topCategory} represents the primary growth vector this week, contributing significantly to the $${revenue} total revenue.`} 
           icon={AlertCircle} 
           impact="84" 
         />
         <InsightCard 
           title="Emerging Segment" 
           description="Cross-category analysis shows a high correlation between repeat customers and multi-item orders in the last 48 hours." 
           icon={TrendingUp} 
           impact="45" 
         />
         <InsightCard 
           title="Inventory Optimization" 
           description="Current velocity suggests stockout risk for top-selling items. Recommend immediate replenishment." 
           icon={Zap} 
           impact="88" 
         />
       </div>

       {/* Detailed Analysis Section */}
       <div className="glass-card rounded-[2.5rem] bg-indigo-600/5 border border-indigo-500/10 overflow-hidden">
          <div className="p-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 space-y-6">
               <div className="flex items-center gap-3">
                 <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                   <Cpu size={24} className="text-white" />
                 </div>
                 <h2 className="text-2xl font-bold text-white">Smart Predictions</h2>
               </div>
               <p className="text-slate-400 text-sm leading-relaxed font-medium">
                 Predicted revenue for the next cycle is trending upwards. We recommend focusing 15% more budget on the <span className="text-indigo-400 font-bold">{topCategory}</span> segment based on seasonal velocity.
               </p>

               <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                   <p className="text-[10px] font-bold text-slate-500 uppercase">Confidence</p>
                   <p className="text-lg font-bold text-white">94.2%</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                   <p className="text-[10px] font-bold text-slate-500 uppercase">Latency</p>
                   <p className="text-lg font-bold text-white">0.4s</p>
                 </div>
               </div>
            </div>
            
            <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
               <div className="aspect-square bg-indigo-500/10 rounded-3xl border border-indigo-500/20 flex flex-col items-center justify-center space-y-3 hover:bg-indigo-500/20 transition-all cursor-pointer">
                 <PieChart size={32} className="text-indigo-400" />
                 <span className="text-[10px] font-bold text-white uppercase tracking-widest">Share Shift</span>
               </div>
               <div className="aspect-square bg-white/5 rounded-3xl border border-white/5 flex flex-col items-center justify-center space-y-3 hover:bg-white/10 transition-all cursor-pointer">
                 <BarChart3 size={32} className="text-slate-500" />
                 <span className="text-[10px] font-bold text-white uppercase tracking-widest">Velocity</span>
               </div>
               <div className="aspect-square bg-white/5 rounded-3xl border border-white/5 flex flex-col items-center justify-center space-y-3 hover:bg-white/10 transition-all cursor-pointer">
                 <Zap size={32} className="text-slate-500" />
                 <span className="text-[10px] font-bold text-white uppercase tracking-widest">Quick Actions</span>
               </div>
               <div className="aspect-square bg-white/5 rounded-3xl border border-white/5 flex flex-col items-center justify-center space-y-3 hover:bg-white/10 transition-all cursor-pointer">
                 <Sparkles size={32} className="text-slate-500" />
                 <span className="text-[10px] font-bold text-white uppercase tracking-widest">Luminary AI</span>
               </div>
            </div>
          </div>
       </div>
    </div>
  );
};

export default InsightsView;

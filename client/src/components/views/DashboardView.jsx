import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Database,
  Loader2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color, loading }) => (
  <div className="glass-card p-6 rounded-2xl space-y-4">
    <div className="flex items-center justify-between">
      <div className={`p-2 rounded-lg bg-indigo-500/10 text-indigo-400`}>
        <Icon size={20} />
      </div>
      {!loading && (
        <div className={`flex items-center gap-1 text-[10px] font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trendValue}%
        </div>
      )}
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{title}</p>
      {loading ? (
        <div className="h-8 w-24 bg-white/5 animate-pulse rounded mt-1" />
      ) : (
        <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
      )}
    </div>
  </div>
);

const Dashboard = ({ stats }) => {
  const summary = stats?.summary || {};
  const velocity = stats?.velocity || [];
  const loading = !stats;

  return (

    <div className="space-y-10 animate-fade-in">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Enterprise Overview</h1>
        <p className="text-slate-500 text-sm">Real-time synchronization with production cluster</p>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`$${summary.totalRevenue?.toLocaleString() || '0'}`} 
          icon={DollarSign} 
          trend="up" 
          trendValue="12.5" 
          loading={loading} 
        />
        <StatCard 
          title="Active Customers" 
          value={summary.activeCustomers?.toLocaleString() || '0'} 
          icon={Users} 
          trend="up" 
          trendValue="8.2" 
          loading={loading} 
        />
        <StatCard 
          title="Orders Processed" 
          value={summary.ordersProcessed?.toLocaleString() || '0'} 
          icon={ShoppingBag} 
          trend="down" trendValue="3.1" 
          loading={loading} 
        />
        <StatCard 
          title="Average Order" 
          value={`$${summary.avgOrderValue?.toFixed(2) || '0.00'}`} 
          icon={TrendingUp} 
          trend="up" 
          trendValue="5.4" 
          loading={loading} 
        />
      </div>


      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-white">Sales Velocity (Last 7 Days)</h3>
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/5">
              <button className="px-3 py-1 text-[10px] font-bold text-white bg-indigo-500/20 rounded-md uppercase tracking-tighter">Live Dataset</button>
            </div>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center">
            {loading ? (
              <Loader2 className="text-indigo-500 animate-spin" size={32} />
            ) : velocity.length === 0 ? (
              <p className="text-slate-600 text-xs italic tracking-widest font-bold">No historical velocity found in buffer</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={velocity}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ffffff10', borderRadius: '12px', fontSize: '10px' }}
                    itemStyle={{ color: '#818cf8', fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Operational Health */}
        <div className="glass-card p-6 rounded-2xl space-y-6">
          <h3 className="text-sm font-bold text-white">Operational Health</h3>
          <div className="space-y-4">
            {[
              { label: 'DB Latency', value: '14ms', status: 'optimal' },
              { label: 'Cloud Sync', value: 'Active', status: 'optimal' },
              { label: 'API Uptime', value: '99.99%', status: 'optimal' },
              { label: 'Storage', value: '42%', status: 'warning' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-xs text-slate-400 font-medium">{item.label}</span>
                <span className={`text-xs font-bold ${item.status === 'optimal' ? 'text-emerald-400' : 'text-amber-400'}`}>{item.value}</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-white/5">
            <button className="w-full py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-xl transition-all uppercase tracking-widest">
              Live System Audit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


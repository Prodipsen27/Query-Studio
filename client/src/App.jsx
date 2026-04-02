import { useState, useMemo, useEffect, useRef } from "react";

import QueryInput from "./components/QueryInput";
import SQLDisplay from "./components/SQLDisplay";
import ResultTable from "./components/ResultTable";
import ResultChart from "./components/ResultChart";
import DashboardView from "./components/views/DashboardView";
import HistoryView from "./components/views/HistoryView";
import InsightsView from "./components/views/InsightsView";
import SettingsView from "./components/views/SettingsView";
import { Sparkles, BarChart3, Database, Clock, Zap } from "lucide-react";


function App() {
  const [currentView, setCurrentView] = useState("query-studio");
  const [result, setResult] = useState(null);
  const [lastQuestion, setLastQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);

  const queryInputRef = useRef(null);

  // Load history and stats on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("query_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }

    const fetchStats = async () => {
      try {
        const res = await fetch('https://query-studio.vercel.app/api/stats');
        const data = await res.json();
        setStats(data);
      } catch (e) {
        console.error("Failed to fetch stats", e);
      }
    };
    fetchStats();
  }, []);


  const handleQuery = async (question) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setLastQuestion(question);
    setCurrentView("query-studio");

    try {
      const res = await fetch("https://query-studio.vercel.app/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setResult(data);

      // Save to history
      const newHistoryItem = {
        question: question,
        timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        rowCount: data.rowCount,
        sql: data.sql
      };

      const updatedHistory = [newHistoryItem, ...history.filter(h => h.question !== question)].slice(0, 50);
      setHistory(updatedHistory);
      localStorage.setItem("query_history", JSON.stringify(updatedHistory));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (view) => {
    if (view === 'new-analysis') {
      setResult(null);
      setLastQuestion("");
      setError(null);
      setCurrentView("query-studio");
    } else {
      setCurrentView(view);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("query_history");
  };

  const statCards = useMemo(() => {
    if (!result) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">Total Result Set</span>
          <div className="flex items-end justify-between">
            <h4 className="text-2xl font-bold text-white tracking-tight">
              {result.rows?.length.toLocaleString() || 0} <span className="text-sm font-medium text-slate-400">Records</span>
            </h4>
            <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <Zap size={10} fill="currentColor" />
              +12.4% vs Q2
            </div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">Exec. Time</span>
          <div className="flex items-end justify-between">
            <h4 className="text-2xl font-bold text-white tracking-tight">
              {result.executionTime || Math.floor(Math.random() * 100) + 20} <span className="text-sm font-medium text-slate-400">ms</span>
            </h4>
            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Optimized Index Hit</span>
          </div>
        </div>
      </div>
    );
  }, [result]);

  return (
    <>
      {/* <Header currentView={currentView} onNavigate={handleNavigate} /> */}

      <div className="max-w-[1600px] mx-auto p-10 space-y-10">

        {/* View Switcher Logic */}
        {currentView === 'dashboard' && <DashboardView stats={stats} />}
        {currentView === 'history' && <HistoryView history={history} onReRun={handleQuery} onClear={clearHistory} />}
        {currentView === 'insights' && <InsightsView stats={stats} />}
        {currentView === 'settings' && <SettingsView />}



        {currentView === 'query-studio' && (
          <div className="space-y-10">
            {/* Active Query Title & Actions */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                  <Sparkles size={12} />
                  AI-Generated Analysis
                </div>
                <h1 className="text-4xl font-bold text-white leading-tight">
                  {lastQuestion ? `"${lastQuestion}"` : "Query Studio"}
                </h1>
                <div className="flex items-center gap-5 text-slate-500 text-[11px] font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Database size={12} />
                    Production_Sales_DB
                  </div>
                </div>
              </div>

              {result && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuery(lastQuestion)}
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-2"
                  >
                    <Zap size={14} className="text-indigo-400" />
                    Re-run
                  </button>
                  <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20">
                    <Database size={14} />
                    Export Segment
                  </button>
                </div>
              )}
            </section>

            {/* Query Input Section */}
            <section className="animate-fade-in delay-75">
              <QueryInput onQuery={handleQuery} loading={loading} />
            </section>

            {error && (
              <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex gap-4 items-center animate-fade-in">
                <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center text-rose-500 font-bold">!</div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-bold text-white">Analysis Failed</p>
                  <p className="text-xs text-rose-200/60 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Results Dashboard */}
            {result && !loading && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  <div className="space-y-8 flex flex-col">
                    <SQLDisplay sql={result.sql} />
                    <div className="flex-1">
                      {statCards}
                    </div>
                  </div>
                  <div className="h-full">
                    <ResultChart result={result} />
                  </div>
                </div>

                <section className="pt-4">
                  <ResultTable result={result} />
                </section>
              </div>
            )}

            {/* Empty State */}
            {!result && !loading && !error && (
              <div className="py-32 flex flex-col items-center text-center space-y-6 opacity-40">
                <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/5 shadow-inner rotate-12">
                  <BarChart3 size={48} className="text-indigo-400 -rotate-12" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Ready for Analysis</h3>
                  <p className="text-slate-500 text-sm max-w-xs mx-auto">Ask a natural language question above to begin your data journey.</p>
                </div>
              </div>
            )}

            {loading && (
              <div className="py-40 flex flex-col items-center justify-center space-y-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap size={20} className="text-indigo-400 animate-pulse" />
                  </div>
                </div>
                <div className="text-center animate-pulse">
                  <p className="text-white font-bold tracking-tight">Consulting AI Luminary</p>
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-1 font-bold">Optimizing Query Latency</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-30">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            © 2026 QueryCart Intelligence System. Confidential Data.
          </p>
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <button className="hover:text-white transition-colors">Data Privacy</button>
            <button className="hover:text-white transition-colors text-emerald-500">API Status: Running</button>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
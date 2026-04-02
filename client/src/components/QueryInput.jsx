import { useState } from "react";
import { Send, Sparkles } from "lucide-react";

const QueryInput = ({ onQuery, loading }) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || loading) return;
    onQuery(question);
  };

  return (
    <form onSubmit={handleSubmit} className="relative group w-full">
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-violet-600/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-1000" />
      
      <div className="relative bg-[#0f172a]/50 backdrop-blur-xl rounded-2xl border border-white/5 p-2 flex items-center gap-2 shadow-2xl">
        <div className="pl-4 text-indigo-400">
          <Sparkles size={20} />
        </div>
        
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about your sales data..."
          className="flex-1 bg-transparent border-none outline-none px-2 py-4 text-lg placeholder:text-slate-600 text-white"
          disabled={loading}
        />
        
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white font-bold p-4 rounded-xl transition-all flex items-center justify-center min-w-[56px] shadow-lg shadow-indigo-600/20"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send size={20} />
          )}
        </button>
      </div>

      {/* Quick Hints */}
      <div className="mt-3 flex gap-4 px-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
          <span className="w-1 h-1 bg-indigo-500 rounded-full" />
          Natural Language to SQL
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
          <span className="w-1 h-1 bg-violet-500 rounded-full" />
          Real-time Analytics
        </span>
      </div>
    </form>
  );
};

export default QueryInput;

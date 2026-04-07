import { useState } from "react";
import { Send, Sparkles, Tag, Star, Calendar, ShoppingBag, Users, Layers } from "lucide-react";

const suggestionData = [
  { text: "Show me total sales by category", icon: Tag },
  { text: "Which product has the highest revenue?", icon: Star },
  { text: "Show me monthly revenue for the last 6 months", icon: Calendar },
  { text: "How many orders were completed vs cancelled?", icon: ShoppingBag },
  { text: "Top 5 customers by total spending", icon: Users },
  { text: "Which category has the most orders?", icon: Layers }
];

const QueryInput = ({ onQuery, loading }) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || loading) return;
    onQuery(question);
  };

  return (
    <form onSubmit={handleSubmit} className="relative group w-full max-w-4xl mx-auto">
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-10 group-focus-within:opacity-30 transition duration-1000" />
      
      <div className="relative bg-background/80 backdrop-blur-2xl rounded-2xl border border-white/10 p-2 sm:p-3 flex items-center gap-2 sm:gap-4 shadow-2xl overflow-hidden shadow-primary/10">
        {/* Animated Background Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />

        <div className="pl-2 sm:pl-4 text-primary">

          <Sparkles size={24} className="animate-pulse" />
        </div>
        
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about your sales data..."
          className="flex-1 bg-transparent border-none outline-none py-4 text-sm sm:text-base md:text-lg placeholder:text-slate-600 text-white font-medium"
          disabled={loading}
        />
        
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="bg-primary hover:opacity-90 disabled:opacity-40 disabled:hover:bg-primary text-white font-bold h-12 w-12 sm:h-14 sm:w-14 rounded-xl transition-all flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 active:scale-95"
        >

          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send size={22} />
          )}
        </button>
      </div>

      {/* Enhanced Query Suggestions Section */}
      <div className="mt-8 space-y-4">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 pl-2">Recommended Queries</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {suggestionData.map((item, i) => (

            
            <button
              key={i}
              type="button"
              onClick={() => onQuery(item.text)}
              className="flex items-start gap-4 p-4 text-left glass-card rounded-2xl hover:border-primary/30 hover:bg-primary/[0.03] group/btn transition-all duration-300 animate-fade-in opacity-0 fill-mode-forwards"
              style={{ animationDelay: `${i * 75}ms` }}
            >
              <div className="shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 group-hover/btn:text-primary group-hover/btn:border-primary/20 group-hover/btn:bg-primary/10 transition-all">

                <item.icon size={16} />
              </div>
              <span className="text-[11px] font-bold text-slate-400 group-hover/btn:text-white leading-tight">
                {item.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Hints - Stacked on tiny mobile */}
      <div className="mt-10 flex flex-col sm:flex-row gap-6 px-2 justify-center opacity-40">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
          <span className="w-1 h-1 bg-primary rounded-full" />
          Natural Language to SQL
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
          <span className="w-1 h-1 bg-accent rounded-full" />
          Real-time Analytics
        </span>

      </div>
    </form>
  );
};

export default QueryInput;


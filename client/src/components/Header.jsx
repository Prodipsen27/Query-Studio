import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Settings, ChevronDown, Package, Tag, Loader2 } from 'lucide-react';

const Header = ({ currentView, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const viewTitles = {
    'dashboard': 'Enterprise Overview',
    'query-studio': 'Query Neural Studio',
    'history': 'Analytical Archive',
    'insights': 'Growth Intelligence',
    'settings': 'System Configuration'
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length >= 2) {
        performSearch();
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const performSearch = async () => {
    setIsSearching(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResults(data.results || []);
      setShowDropdown(true);
    } catch (e) {
      console.error("Search error:", e);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#0a0f1c]/80 backdrop-blur-xl sticky top-0 z-40">
      {/* View Context Title */}
      <div className="flex flex-col min-w-[200px]">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500 mb-0.5">Current Scope</span>
        <h2 className="text-sm font-bold text-white tracking-wide">{viewTitles[currentView] || 'Analysis'}</h2>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-xl mx-10 relative" ref={dropdownRef}>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            {isSearching ? <Loader2 size={16} className="animate-spin text-indigo-500" /> : <Search size={18} />}
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
            placeholder="Search products or categories..."
            className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all font-medium"
          />
        </div>

        {/* Search Results Dropdown */}
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-2 max-h-[350px] overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <button
                    key={result.id}
                    className="w-full text-left p-3 hover:bg-white/5 rounded-xl transition-all flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                      {result.category ? <Tag size={14} /> : <Package size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{result.name}</p>
                      <p className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">{result.category} • ${result.price}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500">
                  <p className="text-xs font-medium">No direct matches found</p>
                </div>
              )}
            </div>
            <div className="p-3 bg-white/[0.02] border-t border-white/5 text-center">
               <button className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest hover:text-indigo-400">
                 Deep Analysis Engine
               </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 border-r border-white/5 pr-6">
          <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all relative">
            <Bell size={20} />
            <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0a0f1c]" />
          </button>
          <button 
            onClick={() => onNavigate('settings')}
            className={`p-2 rounded-lg transition-all ${currentView === 'settings' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Settings size={20} />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="flex flex-col text-right">
            <span className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors leading-none mb-1">Alex Rivera</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Lead Analyst</span>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 p-[2px]">
              <div className="w-full h-full rounded-[10px] bg-[#0a0f1c] flex items-center justify-center overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <ChevronDown size={14} className="text-slate-500 group-hover:text-white transition-colors" />
        </div>
      </div>
    </header>
  );
};

export default Header;


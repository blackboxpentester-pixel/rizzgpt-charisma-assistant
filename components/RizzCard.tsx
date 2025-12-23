
import React, { useState } from 'react';
import { RizzLine, RizzType } from '../types';

interface RizzCardProps {
  rizz: RizzLine;
}

export const RizzCard: React.FC<RizzCardProps> = ({ rizz }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rizz.line);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBadgeColor = (type: RizzType) => {
    switch (type) {
      case RizzType.SMOOTH: return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case RizzType.WITTY: return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case RizzType.BOLD: return "bg-rose-500/20 text-rose-400 border-rose-500/30";
      case RizzType.WHOLESOME: return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl group transition-all duration-300 hover:scale-[1.02] border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16C10.9124 16 10.017 16.8954 10.017 18L10.017 21H4.01703V12C4.01703 10.8954 4.91246 10 6.01703 10H18.017C19.1216 10 20.017 10.8954 20.017 12V21H14.017Z" /></svg>
      </div>
      
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-widest ${getBadgeColor(rizz.type)}`}>
          {rizz.type}
        </span>
        <button 
          onClick={copyToClipboard}
          className="text-slate-400 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
               Copied!
            </span>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
          )}
        </button>
      </div>

      <p className="text-xl font-medium text-white mb-3 italic leading-relaxed">
        "{rizz.line}"
      </p>
      
      <p className="text-sm text-slate-400 border-t border-white/5 pt-3">
        <span className="text-white/40 font-semibold uppercase text-[10px] block mb-1">Strategist Note:</span>
        {rizz.explanation}
      </p>
    </div>
  );
};

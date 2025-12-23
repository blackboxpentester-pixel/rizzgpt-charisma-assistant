
import React, { useState, useCallback } from 'react';
import { Button } from './components/Button';
import { RizzCard } from './components/RizzCard';
import { generateRizzLines } from './services/geminiService';
import { RizzResponse } from './types';

export default function App() {
  const [input, setInput] = useState('');
  const [intensity, setIntensity] = useState(50);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<RizzResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await generateRizzLines(input, intensity);
      setResults(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while rizzing.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInput('');
    setResults(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="text-center mb-16 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-pink-500/20 blur-3xl rounded-full"></div>
        <div className="absolute -top-10 right-1/4 w-32 h-32 bg-violet-600/10 blur-3xl rounded-full"></div>
        
        <div className="relative">
          <div className="inline-block p-2 px-4 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-pink-400 mb-6 uppercase tracking-[0.2em] backdrop-blur-sm animate-pulse">
            Powered by Gemini AI
          </div>
          <h1 className="text-6xl md:text-7xl font-bold heading-font mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
            RizzGPT
          </h1>
          <p className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
            Analyze their message and craft the perfect comeback. Stop fumbling your chats.
          </p>
        </div>
      </header>

      {/* Main Form */}
      <section className="glass-card rounded-3xl p-8 mb-12 shadow-2xl shadow-black/50 border border-white/10">
        <div className="mb-8">
          <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
            Paste the message you received:
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 'Hey, I had a great time tonight. We should do it again sometime!'"
            className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all resize-none placeholder:text-slate-600"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="w-full md:w-1/2">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                Intensity Level
              </label>
              <span className="text-pink-400 font-mono font-bold">{intensity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={intensity}
              onChange={(e) => setIntensity(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-widest">
              <span>Chilled</span>
              <span>Smooth</span>
              <span>Unstoppable</span>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            {results && (
              <Button variant="secondary" onClick={handleReset}>
                Reset
              </Button>
            )}
            <Button 
              className="flex-1 md:w-48"
              onClick={handleGenerate}
              isLoading={loading}
              disabled={!input.trim()}
            >
              Get Rizz
            </Button>
          </div>
        </div>
      </section>

      {/* Error State */}
      {error && (
        <div className="mb-12 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-center font-medium">
          {error}
        </div>
      )}

      {/* Results */}
      {results && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-[fadeIn_0.5s_ease-out]">
          {results.rizzLines.map((rizz, index) => (
            <RizzCard key={index} rizz={rizz} />
          ))}
        </div>
      )}

      {/* Skeleton Loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-card h-48 rounded-2xl animate-pulse flex flex-col p-6 gap-4">
              <div className="h-6 w-20 bg-slate-700 rounded-full"></div>
              <div className="h-10 w-full bg-slate-800 rounded-lg"></div>
              <div className="mt-auto h-4 w-3/4 bg-slate-800 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-24 text-center text-slate-600 text-sm">
        <p>© 2024 RizzGPT. Don't say we didn't help you get that date.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-pink-400 transition-colors">Twitter</a>
          <a href="#" className="hover:text-pink-400 transition-colors">TikTok</a>
          <a href="#" className="hover:text-pink-400 transition-colors">Privacy</a>
        </div>
      </footer>
    </div>
  );
}

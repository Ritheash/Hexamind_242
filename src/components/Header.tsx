import React from 'react';
import { MapPin } from 'lucide-react';
import { MOILMine } from '../types';

interface HeaderProps {
  mines: MOILMine[];
  selectedMine: MOILMine;
  onSelectMine: (mine: MOILMine) => void;
}

export const Header: React.FC<HeaderProps> = ({
  mines,
  selectedMine,
  onSelectMine
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/10 border border-amber-400/30">
              <span className="text-xl font-bold text-white select-none">⛏</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white font-mono flex items-center gap-2">
                  MineMind AI
                </h1>
                <span className="text-xs text-amber-400/90 font-medium tracking-wide border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded">
                  MOIL Intelligence
                </span>
              </div>
              <p className="text-xs text-slate-400">
                AI-Based Manganese Exploration & Production Intelligence · Central Indian Manganese Belt
              </p>
            </div>
          </div>

          {/* Mine Selector */}
          <div className="flex items-center">
            {/* Mine Selector Dropdown */}
            <div className="relative flex items-center">
              <label htmlFor="mine-select" className="sr-only">
                Select MOIL Mine
              </label>
              <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 rounded-lg px-3 py-1.5 hover:border-amber-500/50 transition-colors shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-400 font-medium">Mine:</span>
                <select
                  id="mine-select"
                  value={selectedMine.mine_id}
                  onChange={(e) => {
                    const found = mines.find((m) => m.mine_id === e.target.value);
                    if (found) onSelectMine(found);
                  }}
                  className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer pr-1"
                >
                  <optgroup label="Maharashtra Manganese Mines">
                    {mines
                      .filter((m) => m.state === 'Maharashtra')
                      .map((m) => (
                        <option key={m.mine_id} value={m.mine_id} className="bg-slate-900 text-white">
                          {m.mine_name} ({m.district}) — Manganese Mine
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Madhya Pradesh Manganese Mines">
                    {mines
                      .filter((m) => m.state !== 'Maharashtra')
                      .map((m) => (
                        <option key={m.mine_id} value={m.mine_id} className="bg-slate-900 text-white">
                          {m.mine_name} ({m.district}) — Manganese Mine
                        </option>
                      ))}
                  </optgroup>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

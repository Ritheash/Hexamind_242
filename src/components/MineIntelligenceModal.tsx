import React from 'react';
import { MineIntelligenceData, MOILMine } from '../types';
import {
  X,
  Layers,
  ArrowDownToLine,
  Compass,
  AlertTriangle,
  TrendingDown,
  Sparkles,
  MapPin,
  CheckCircle2,
  Mountain,
  ChevronRight
} from 'lucide-react';

interface MineIntelligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: MineIntelligenceData;
  mine: MOILMine;
  allMines?: MOILMine[];
  onSelectOtherMine?: (mine: MOILMine) => void;
}

export const MineIntelligenceModal: React.FC<MineIntelligenceModalProps> = ({
  isOpen,
  onClose,
  data,
  mine,
  allMines = [],
  onSelectOtherMine
}) => {
  if (!isOpen) return null;

  const shortfall = data.shortfall_analysis;
  const drill = data.promising_next_drill;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Mine Title & Close */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-xs font-bold tracking-wider uppercase text-amber-400 font-mono">
                Manganese Mining Intelligence Report
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
              {mine.mine_name}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {mine.district}, {mine.state}
              </span>
              <span>·</span>
              <span className="text-slate-400">{mine.mining_method}</span>
              <span>·</span>
              <span className="font-mono text-slate-500">
                {mine.latitude.toFixed(4)}°N, {mine.longitude.toFixed(4)}°E
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body with the 4 Exact Requested Details */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto">
          {/* DETAIL 1: Manganese Availability Percentage */}
          <div className="bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 border border-amber-600/40 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-400 tracking-wider uppercase block">
                    Parameter 1 · Mineral Grade
                  </span>
                  <h3 className="text-sm font-bold text-white">Manganese Availability Percentage</h3>
                </div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-extrabold font-mono text-amber-400 tracking-tight">
                  {data.manganese_availability_pct.toFixed(1)}%
                  <span className="text-sm font-sans font-medium text-amber-300 ml-1">Mn</span>
                </div>
              </div>
            </div>

            <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-300 gap-1.5">
              <span className="text-amber-300/90 font-medium">
                {data.availability_grade_label}
              </span>
              <span className="text-slate-400 text-[11px] font-mono">
                Mineralogy: {mine.key_mineralogy}
              </span>
            </div>
          </div>

          {/* DETAIL 2: Depth Level Manganese Was Extracted Previously */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                <ArrowDownToLine className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-sky-400 tracking-wider uppercase block">
                    Parameter 2 · Historical Underground & Pit Profile
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  Previously Extracted Depth Level
                </h3>

                <div className="mt-2 bg-slate-950/70 border border-slate-800/80 rounded-lg p-3">
                  <div className="text-sm font-semibold text-sky-300 font-mono">
                    {data.previous_extraction_depth}
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Historical production benches and stopes worked across {mine.mining_method.toLowerCase()} operations since establishment in {mine.established_year}.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DETAIL 3: Position Where the Next Drill Would Be Promising */}
          <div className="bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-900 border border-emerald-600/40 rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <Compass className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase block">
                    Parameter 3 · Next Drill Recommendation
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                    ★ Top Exploration Target
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  Promising Next Drill Position
                </h3>

                <div className="mt-2 bg-slate-950/80 border border-slate-800 rounded-lg p-3 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">
                      Target Area: {drill.location_label}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      📍 {drill.latitude.toFixed(4)}°N, {drill.longitude.toFixed(4)}°E
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-slate-900/90 p-2 rounded border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Target Depth</span>
                      <span className="text-sm font-bold font-mono text-sky-400">{drill.target_depth_m} m</span>
                    </div>

                    <div className="bg-slate-900/90 p-2 rounded border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Est. Ore Thickness</span>
                      <span className="text-sm font-bold font-mono text-amber-400">{drill.estimated_thickness_m} m</span>
                    </div>

                    <div className="bg-slate-900/90 p-2 rounded border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Predicted Mn Grade</span>
                      <span className="text-sm font-bold font-mono text-emerald-400">{drill.predicted_mn_grade}% Mn</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 bg-emerald-950/20 border border-emerald-900/40 p-2 rounded">
                    <strong className="text-emerald-400">Geological Rationale:</strong>{' '}
                    {drill.geological_rationale}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DETAIL 4: Manganese Shortfall Percentage If Shortfall Occurs */}
          <div className="bg-gradient-to-br from-rose-950/30 via-slate-900 to-slate-900 border border-rose-600/40 rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-rose-400 tracking-wider uppercase block">
                    Parameter 4 · Operational Shortfall Risk
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/80 border border-rose-800 px-2 py-0.5 rounded">
                    {shortfall.risk_level} RISK
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  Manganese Shortfall Percentage (If Shortfall Occurs)
                </h3>

                <div className="mt-2 bg-slate-950/80 border border-slate-800 rounded-lg p-3 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">Projected Shortfall Rate</span>
                      <div className="text-2xl font-extrabold font-mono text-rose-400 mt-0.5">
                        {shortfall.shortfall_percentage.toFixed(1)}% Shortfall
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Expected Deficit</span>
                      <span className="text-base font-bold font-mono text-rose-300">
                        -{shortfall.expected_shortfall_tonnes.toLocaleString()} Tonnes Mn Ore
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-800/80">
                    <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">Planned Target Output</span>
                      <span className="font-mono font-bold text-slate-200">
                        {shortfall.planned_target_tonnes.toLocaleString()} T
                      </span>
                    </div>

                    <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">Predicted Output If Unmitigated</span>
                      <span className="font-mono font-bold text-sky-400">
                        {shortfall.predicted_tonnes.toLocaleString()} T
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800">
                    <strong className="text-slate-300">Contributing Operational Bottlenecks:</strong>{' '}
                    {shortfall.primary_bottlenecks}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Mine Switcher */}
          {allMines.length > 0 && onSelectOtherMine && (
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Inspect Other Operating MOIL Manganese Mines:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {allMines.map((m) => {
                  const isCurrent = m.mine_id === mine.mine_id;
                  return (
                    <button
                      key={m.mine_id}
                      onClick={() => onSelectOtherMine(m)}
                      className={`text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-semibold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                      }`}
                    >
                      {m.mine_name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-3 text-xs">
          <span className="text-slate-400 text-[11px]">
            Target ML Variable: Manganese Grade & Monthly Operational Telemetry
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};

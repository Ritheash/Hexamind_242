import React from 'react';
import { MineIntelligenceData, MOILMine } from '../types';
import {
  Sparkles,
  ArrowDownToLine,
  Compass,
  AlertTriangle,
  Maximize2,
  MapPin,
  Mountain
} from 'lucide-react';

interface MineSummaryPanelProps {
  mine: MOILMine;
  data: MineIntelligenceData;
  onOpenModal: () => void;
}

export const MineSummaryPanel: React.FC<MineSummaryPanelProps> = ({
  mine,
  data,
  onOpenModal
}) => {
  const shortfall = data.shortfall_analysis;
  const drill = data.promising_next_drill;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between h-full shadow-lg">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Selected Manganese Mine
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
              {mine.mine_name}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{mine.district}, {mine.state}</span>
              <span>·</span>
              <span className="text-slate-300 font-medium">{mine.mining_method}</span>
            </div>
          </div>

          <button
            onClick={onOpenModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            title="Pop up full report"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Open Popup</span>
          </button>
        </div>

        {/* The 4 Specific Target Details */}
        <div className="mt-3.5 space-y-2.5">
          {/* 1. Manganese Availability Percentage */}
          <div
            onClick={onOpenModal}
            className="bg-slate-950/70 border border-amber-900/40 hover:border-amber-500/50 p-2.5 rounded-lg cursor-pointer transition-all hover:bg-slate-950"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Manganese Availability %
              </span>
              <span className="text-base font-extrabold font-mono text-amber-400">
                {data.manganese_availability_pct.toFixed(1)}% Mn
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1 truncate">
              {data.availability_grade_label}
            </p>
          </div>

          {/* 2. Previous Depth Level Extracted */}
          <div
            onClick={onOpenModal}
            className="bg-slate-950/70 border border-sky-900/40 hover:border-sky-500/50 p-2.5 rounded-lg cursor-pointer transition-all hover:bg-slate-950"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <ArrowDownToLine className="w-3 h-3 text-sky-400" />
                Previously Extracted Depth
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-200 mt-1 font-mono">
              {data.previous_extraction_depth}
            </p>
          </div>

          {/* 3. Promising Next Drill Position */}
          <div
            onClick={onOpenModal}
            className="bg-slate-950/70 border border-emerald-900/40 hover:border-emerald-500/50 p-2.5 rounded-lg cursor-pointer transition-all hover:bg-slate-950"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-emerald-400" />
                Promising Next Drill Position
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {drill.predicted_mn_grade}% Mn Grade
              </span>
            </div>
            <div className="text-xs text-slate-200 mt-1 font-medium">
              {drill.location_label} ({drill.latitude.toFixed(4)}°N, {drill.longitude.toFixed(4)}°E)
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Target Depth: <strong className="text-sky-400 font-mono">{drill.target_depth_m} m</strong> · Est. Vein: <strong className="text-amber-400 font-mono">{drill.estimated_thickness_m} m</strong>
            </div>
          </div>

          {/* 4. Manganese Shortfall Percentage */}
          <div
            onClick={onOpenModal}
            className="bg-slate-950/70 border border-rose-900/40 hover:border-rose-500/50 p-2.5 rounded-lg cursor-pointer transition-all hover:bg-slate-950"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3 text-rose-400" />
                Shortfall % If Occurs
              </span>
              <span className="text-base font-extrabold font-mono text-rose-400">
                {shortfall.shortfall_percentage.toFixed(1)}% Shortfall
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-300 mt-1">
              <span>Expected Deficit: <strong className="text-rose-400 font-mono">-{shortfall.expected_shortfall_tonnes.toLocaleString()} T</strong></span>
              <span className="text-slate-400">Target: {shortfall.planned_target_tonnes.toLocaleString()} T</span>
            </div>
          </div>
        </div>
      </div>

      {/* Button to open the full modal popup */}
      <div className="mt-4 pt-3 border-t border-slate-800">
        <button
          onClick={onOpenModal}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white text-xs font-bold rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Pop Up Full Manganese Intelligence Report</span>
        </button>
      </div>
    </div>
  );
};

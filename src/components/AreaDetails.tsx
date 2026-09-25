import React from 'react';
import { ExplorationCell } from '../types';
import { Sparkles, Pickaxe, Ruler, Weight, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';

interface AreaDetailsProps {
  cell: ExplorationCell | null;
  mineName: string;
}

export const AreaDetails: React.FC<AreaDetailsProps> = ({ cell, mineName }) => {
  if (!cell) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 text-center text-slate-400 flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 text-slate-500">
          <Pickaxe className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-semibold text-slate-200">No Exploration Area Selected</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          Click on any exploration grid cell (e.g. A3, B4, C2) on the left to inspect geological
          parameters and calculate prototype estimated resources.
        </p>
      </div>
    );
  }

  const getBadgeStyle = (potential: string) => {
    switch (potential) {
      case 'HIGH':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'MEDIUM':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-mono text-base font-bold text-white bg-slate-800 border border-slate-700 px-2.5 py-0.5 rounded">
              Area {cell.area_id}
            </span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getBadgeStyle(
                cell.potential
              )}`}
            >
              {cell.potential} Potential
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">{mineName}</span>
            <span className="text-[11px] text-slate-500">Grid Cell [{cell.row}, {cell.col}]</span>
          </div>
        </div>

        {/* Primary Prediction KPI Callout */}
        <div className="mt-3.5 bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 p-3 rounded-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Predicted Manganese Grade</span>
            <div className="text-2xl font-bold font-mono text-amber-400 mt-0.5">
              {cell.predicted_mn_grade.toFixed(1)}% Mn
            </div>
            <span className="text-[11px] text-slate-500">
              Random Forest Regressor Inference on Manganese Assays
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">Manganese Potential</span>
            <span
              className={`inline-block mt-1 font-bold text-xs uppercase px-2 py-0.5 rounded ${
                cell.potential === 'HIGH'
                  ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800'
                  : cell.potential === 'MEDIUM'
                  ? 'text-amber-400 bg-amber-950/60 border border-amber-800'
                  : 'text-rose-400 bg-rose-950/60 border border-rose-800'
              }`}
            >
              ● {cell.potential} MN POTENTIAL
            </span>
            <span className="text-[11px] text-slate-500 block mt-1">
              {cell.potential === 'HIGH' ? '> 35% Mn Grade' : cell.potential === 'MEDIUM' ? '25–35% Mn Grade' : '< 25% Mn Grade'}
            </span>
          </div>
        </div>

        {/* Geological Feature Attributes */}
        <div className="mt-3.5">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Manganese Drilling Observations (Model Inputs)
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950/70 border border-slate-800/80 rounded p-2">
              <span className="text-slate-400 text-[11px] block">Manganese Reef Depth</span>
              <span className="text-slate-200 font-semibold font-mono text-sm">{cell.depth_m} m</span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded p-2">
              <span className="text-slate-400 text-[11px] block">Manganese Ore Thickness</span>
              <span className="text-slate-200 font-semibold font-mono text-sm">{cell.ore_thickness_m} m</span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded p-2">
              <span className="text-slate-400 text-[11px] block">Manganese Ore Density</span>
              <span className="text-slate-200 font-semibold font-mono text-sm">{cell.rock_density_t_m3} t/m³</span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded p-2">
              <span className="text-slate-400 text-[11px] block">Silica (SiO₂) Impurity in Mn</span>
              <span className="text-slate-200 font-semibold font-mono text-sm">{cell.silica_content_pct}%</span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded p-2">
              <span className="text-slate-400 text-[11px] block">Iron (Fe) Impurity in Mn</span>
              <span className="text-slate-200 font-semibold font-mono text-sm">{cell.iron_content_pct}%</span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded p-2">
              <span className="text-slate-400 text-[11px] block">Braunite Mn Mineral Facies</span>
              <span className="text-slate-200 font-semibold font-mono text-sm">{cell.geological_indicator_2}</span>
            </div>
          </div>
        </div>

        {/* Prototype Estimated Resource Potential Box */}
        <div className="mt-4 p-3 bg-amber-950/20 border border-amber-600/30 rounded-lg">
          <div className="flex items-center justify-between pb-2 border-b border-amber-700/30">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Prototype Estimated Manganese Resource Potential
            </span>
            <span className="text-[10px] text-amber-400 font-mono">Area × Mn Thickness × Density</span>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2.5 text-center">
            <div className="bg-slate-950/60 p-2 rounded border border-amber-900/40">
              <span className="text-[10px] text-slate-400 block">Estimated Manganese Ore</span>
              <span className="text-sm font-bold text-white font-mono">{cell.estimated_ore_mt} MT</span>
            </div>

            <div className="bg-slate-950/60 p-2 rounded border border-amber-900/40">
              <span className="text-[10px] text-slate-400 block">Predicted Mn Grade</span>
              <span className="text-sm font-bold text-amber-400 font-mono">{cell.predicted_mn_grade}% Mn</span>
            </div>

            <div className="bg-slate-950/60 p-2 rounded border border-amber-900/40">
              <span className="text-[10px] text-slate-400 block">In-Situ Manganese Metal</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">{cell.estimated_mn_content_mt} MT Mn</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Scientific Disclaimer */}
      <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed bg-slate-950/40 p-2.5 rounded border border-slate-800/60">
        <span className="text-amber-400 font-semibold block mb-0.5">⚠️ Scientific Requirement & Limitations for Manganese Estimation:</span>
        This is a demonstration estimate based on ML manganese grade predictions and synthetic geological data. Formal manganese mineral resource/reserve estimation requires validated core drilling, laboratory chemical assaying of manganese, QA/QC, and applicable reporting standards (UNFC/JORC).
      </div>
    </div>
  );
};

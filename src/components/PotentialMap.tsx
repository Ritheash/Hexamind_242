import React from 'react';
import { ExplorationCell, PotentialLevel } from '../types';
import { Layers, Sparkles, Filter, ChevronRight, Check } from 'lucide-react';

interface PotentialMapProps {
  cells: ExplorationCell[];
  selectedCell: ExplorationCell | null;
  onSelectCell: (cell: ExplorationCell) => void;
  mineName: string;
}

export const PotentialMap: React.FC<PotentialMapProps> = ({
  cells,
  selectedCell,
  onSelectCell,
  mineName
}) => {
  const highCount = cells.filter((c) => c.potential === 'HIGH').length;
  const medCount = cells.filter((c) => c.potential === 'MEDIUM').length;
  const lowCount = cells.filter((c) => c.potential === 'LOW').length;

  const rows = ['A', 'B', 'C', 'D', 'E'];
  const cols = [1, 2, 3, 4, 5];

  const getCellColor = (potential: PotentialLevel, isSelected: boolean) => {
    if (isSelected) {
      return 'ring-2 ring-amber-400 border-amber-300 bg-amber-500/20 shadow-md shadow-amber-500/20';
    }
    switch (potential) {
      case 'HIGH':
        return 'border-emerald-600/50 bg-emerald-950/40 hover:bg-emerald-900/50 hover:border-emerald-500 text-emerald-300';
      case 'MEDIUM':
        return 'border-amber-600/50 bg-amber-950/40 hover:bg-amber-900/50 hover:border-amber-500 text-amber-300';
      case 'LOW':
        return 'border-rose-900/50 bg-rose-950/30 hover:bg-rose-900/40 hover:border-rose-600 text-rose-400';
    }
  };

  const getBadgeColor = (potential: PotentialLevel) => {
    switch (potential) {
      case 'HIGH':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'MEDIUM':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'LOW':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Manganese Ore Grade Potential Analysis (Exploration Grid)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            5×5 Spatial Exploration Grid for {mineName} · ML-predicted Manganese Ore Grades (% Mn)
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block"></span>
            <span className="text-slate-300 font-medium">HIGH Mn (&gt;35% Mn)</span>
            <span className="text-slate-500">({highCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block"></span>
            <span className="text-slate-300 font-medium">MEDIUM Mn (25–35%)</span>
            <span className="text-slate-500">({medCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block"></span>
            <span className="text-slate-300 font-medium">LOW Mn (&lt;25%)</span>
            <span className="text-slate-500">({lowCount})</span>
          </div>
        </div>
      </div>

      {/* Grid instructions notice */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-slate-800/60">
        <span>Click any manganese cell to inspect drilled depth, manganese ore thickness, and in-situ Mn content</span>
        <span className="text-amber-400 font-medium">
          {selectedCell ? `Selected Manganese Cell: Area ${selectedCell.area_id}` : 'Select a cell below'}
        </span>
      </div>

      {/* 5x5 Spatial Grid */}
      <div className="mt-4">
        {/* Column Headers (1 to 5) */}
        <div className="grid grid-cols-6 gap-2 mb-1.5 text-center text-xs font-mono font-semibold text-slate-500">
          <div className="flex items-center justify-center">Grid</div>
          {cols.map((c) => (
            <div key={c}>Col {c}</div>
          ))}
        </div>

        {/* Grid Rows (A to E) */}
        <div className="space-y-2">
          {rows.map((r) => {
            return (
              <div key={r} className="grid grid-cols-6 gap-2 items-center">
                {/* Row Header */}
                <div className="text-center font-mono font-bold text-xs text-slate-400">
                  Row {r}
                </div>

                {/* 5 Cells in this row */}
                {cols.map((c) => {
                  const cellId = `${r}${c}`;
                  const cell = cells.find((item) => item.area_id === cellId);
                  if (!cell) return <div key={cellId} className="h-16 bg-slate-950/40 rounded-lg" />;

                  const isSelected = selectedCell?.area_id === cell.area_id;

                  return (
                    <button
                      key={cell.area_id}
                      onClick={() => onSelectCell(cell)}
                      className={`relative p-2.5 rounded-lg border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between h-[74px] ${getCellColor(
                        cell.potential,
                        isSelected
                      )}`}
                    >
                      {/* Top Row: Cell ID & Potential Badge */}
                      <div className="flex items-center justify-between w-full">
                        <span className="font-mono text-xs font-bold tracking-tight text-white">
                          Area {cell.area_id}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${getBadgeColor(
                            cell.potential
                          )}`}
                        >
                          {cell.potential}
                        </span>
                      </div>

                      {/* Bottom Row: Predicted Mn Grade */}
                      <div className="mt-1 flex items-baseline justify-between">
                        <span className="text-[11px] text-slate-400">Predicted Mn:</span>
                        <span className="font-mono text-xs font-bold text-white">
                          {cell.predicted_mn_grade.toFixed(1)}%
                        </span>
                      </div>

                      {/* Active indicator triangle */}
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-amber-300"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid Summary Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <span>Demonstration manganese spatial resolution: 200m × 200m per cell (40,000 m²)</span>
        </div>
        <div className="font-mono text-slate-300">
          Target ML Variable: <span className="text-amber-400 font-semibold">Manganese Grade (% Mn)</span>
        </div>
      </div>
    </div>
  );
};

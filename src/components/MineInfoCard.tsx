import React from 'react';
import { MOILMine } from '../types';
import { Landmark, Compass, Pickaxe, Calendar, FileText } from 'lucide-react';

interface MineInfoCardProps {
  mine: MOILMine;
}

export const MineInfoCard: React.FC<MineInfoCardProps> = ({ mine }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight">{mine.mine_name}</h2>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-medium">
              Selected Manganese Mine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {mine.district} District · {mine.state} · Manganese Deposit
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-amber-400 font-mono font-medium block">
            {mine.latitude.toFixed(4)}° N, {mine.longitude.toFixed(4)}° E
          </span>
          <span className="text-[11px] text-slate-500">{mine.location_accuracy}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3.5 text-xs">
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5">
          <span className="text-slate-400 block text-[11px] flex items-center gap-1">
            <Pickaxe className="w-3 h-3 text-amber-400" />
            Manganese Extraction Method
          </span>
          <span className="text-slate-200 font-semibold mt-1 block truncate" title={mine.mining_method}>
            {mine.mining_method}
          </span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5">
          <span className="text-slate-400 block text-[11px] flex items-center gap-1">
            <Compass className="w-3 h-3 text-sky-400" />
            Manganese Mineralogy
          </span>
          <span className="text-slate-200 font-semibold mt-1 block truncate" title={mine.key_mineralogy}>
            {mine.key_mineralogy}
          </span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5">
          <span className="text-slate-400 block text-[11px] flex items-center gap-1">
            <Calendar className="w-3 h-3 text-purple-400" />
            Manganese Mining Since
          </span>
          <span className="text-slate-200 font-semibold mt-1 block">
            Circa {mine.established_year}
          </span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5">
          <span className="text-slate-400 block text-[11px] flex items-center gap-1">
            <FileText className="w-3 h-3 text-emerald-400" />
            MOIL Report Disclosure
          </span>
          <span className="text-slate-200 font-medium mt-1 block truncate" title={mine.annual_report_ref}>
            {mine.annual_report_ref}
          </span>
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-400 bg-slate-950/40 px-3 py-2 rounded-lg border border-slate-800/50">
        <span className="text-slate-300 font-medium">Manganese Deposit Geological Overview:</span> {mine.remarks}
      </div>
    </div>
  );
};

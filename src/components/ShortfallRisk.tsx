import React from 'react';
import { ShortfallRiskData } from '../types';
import { AlertTriangle, Clock, CloudRain, Flame, Activity } from 'lucide-react';

interface ShortfallRiskProps {
  riskData: ShortfallRiskData;
  mineName: string;
}

export const ShortfallRisk: React.FC<ShortfallRiskProps> = ({ riskData, mineName }) => {
  const {
    planned_production,
    predicted_production,
    expected_shortfall,
    shortfall_percentage,
    risk_level,
    operational_factors
  } = riskData;

  const getRiskTheme = (level: string) => {
    switch (level) {
      case 'HIGH':
        return {
          iconColor: 'text-rose-500',
          badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/50',
          borderHighlight: 'border-rose-500/40',
          indicator: '🔴 HIGH RISK'
        };
      case 'MEDIUM':
        return {
          iconColor: 'text-amber-500',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
          borderHighlight: 'border-amber-500/40',
          indicator: '🟡 MEDIUM RISK'
        };
      default:
        return {
          iconColor: 'text-emerald-500',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
          borderHighlight: 'border-emerald-500/40',
          indicator: '🟢 LOW RISK'
        };
    }
  };

  const theme = getRiskTheme(risk_level);

  return (
    <div className={`bg-slate-900/90 border ${theme.borderHighlight} rounded-xl p-4 shadow-xl flex flex-col justify-between`}>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-4 h-4 ${theme.iconColor}`} />
            <h3 className="text-base font-bold text-white tracking-tight">
              Manganese Ore Production Shortfall Risk
            </h3>
          </div>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${theme.badgeBg}`}>
            {theme.indicator}
          </span>
        </div>

        {/* Shortfall Headline Numbers */}
        <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
          <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg">
            <span className="text-[11px] text-slate-400 block">Planned Mn Ore</span>
            <span className="text-sm font-bold font-mono text-white mt-1 block">
              {planned_production.toLocaleString()} T
            </span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg">
            <span className="text-[11px] text-slate-400 block">Predicted Mn Ore</span>
            <span className="text-sm font-bold font-mono text-sky-400 mt-1 block">
              {predicted_production.toLocaleString()} T
            </span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg">
            <span className="text-[11px] text-slate-400 block">Expected Mn Deficit</span>
            <span className={`text-sm font-bold font-mono mt-1 block ${expected_shortfall > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {expected_shortfall > 0 ? `-${expected_shortfall.toLocaleString()} T` : '0 T'}
            </span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg">
            <span className="text-[11px] text-slate-400 block">Mn Shortfall Rate</span>
            <span className={`text-sm font-bold font-mono mt-1 block ${shortfall_percentage >= 10 ? 'text-rose-400' : shortfall_percentage >= 5 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {shortfall_percentage}%
            </span>
          </div>
        </div>

        {/* Contributing Operational Factors Breakdown */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Manganese Pit Operational Factors (Impact Scores)
            </span>
            <span className="text-[11px] text-slate-500 font-mono">0–100 Scale</span>
          </div>

          <div className="space-y-2.5">
            {/* Equipment Downtime */}
            <div className="bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-lg">
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-medium">Manganese Haulage Machinery Downtime</span>
                  <span className="text-slate-500 font-mono">({operational_factors.equipment_downtime_hrs} hrs)</span>
                </div>
                <span className="font-mono font-bold text-amber-400">
                  {operational_factors.equipment_downtime_impact_score}/100
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${operational_factors.equipment_downtime_impact_score}%` }}
                />
              </div>
            </div>

            {/* Blasting Delay */}
            <div className="bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-lg">
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span className="font-medium">Manganese Face Blasting Delay</span>
                  <span className="text-slate-500 font-mono">({operational_factors.blasting_delay_hrs} hrs)</span>
                </div>
                <span className="font-mono font-bold text-rose-400">
                  {operational_factors.blasting_delay_impact_score}/100
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${operational_factors.blasting_delay_impact_score}%` }}
                />
              </div>
            </div>

            {/* Rainfall */}
            <div className="bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-lg">
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CloudRain className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-medium">Manganese Pit Precipitation / Inundation</span>
                  <span className="text-slate-500 font-mono">({operational_factors.rainfall_mm} mm)</span>
                </div>
                <span className="font-mono font-bold text-sky-400">
                  {operational_factors.rainfall_impact_score}/100
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-sky-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${operational_factors.rainfall_impact_score}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Notice */}
      <div className="mt-4 pt-2.5 border-t border-slate-800 text-[11px] text-slate-400 leading-normal">
        <span className="text-slate-300 font-medium">Metric Notice:</span> Classified as{' '}
        <span className="font-semibold text-white">Manganese Shortfall Risk Level</span> based on monthly manganese production targets
        (Low &lt;5%, Medium 5–10%, High &gt;10%). This is an explainable engineering indicator, not a certified statistical probability.
      </div>
    </div>
  );
};

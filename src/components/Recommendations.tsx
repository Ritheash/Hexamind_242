import React from 'react';
import { Recommendation } from '../types';
import { Bot, CheckCircle2, ChevronRight, Zap, Target, Wrench, CalendarClock, CloudDrizzle } from 'lucide-react';

interface RecommendationsProps {
  recommendations: Recommendation[];
  mineName: string;
}

export const Recommendations: React.FC<RecommendationsProps> = ({
  recommendations,
  mineName
}) => {
  const getCategoryIcon = (category: string) => {
    if (category.includes('Exploration')) return <Target className="w-4 h-4 text-emerald-400" />;
    if (category.includes('Shortfall')) return <Zap className="w-4 h-4 text-rose-400" />;
    if (category.includes('Maintenance') || category.includes('Equipment')) return <Wrench className="w-4 h-4 text-amber-400" />;
    if (category.includes('Blasting')) return <CalendarClock className="w-4 h-4 text-purple-400" />;
    return <CloudDrizzle className="w-4 h-4 text-sky-400" />;
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'MEDIUM':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              AI Recommended Actions (Manganese Decision Intelligence Engine)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Targeted manganese operational directives for {mineName} · Grounded in ML spatial manganese potential & shortfall triggers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-mono text-emerald-400 font-semibold">{recommendations.length} Manganese Directives Active</span>
        </div>
      </div>

      {/* Recommendation Action Cards List */}
      <div className="mt-4 space-y-3">
        {recommendations.map((rec, idx) => (
          <div
            key={rec.id}
            className="bg-slate-950/70 border border-slate-800 rounded-lg p-3.5 hover:border-slate-700 transition-colors"
          >
            {/* Top row: Category, Priority, ID */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                {getCategoryIcon(rec.category)}
                <span className="text-xs font-semibold text-slate-200">
                  {rec.category}
                </span>
                <span className="text-slate-600 font-mono text-[10px]">({rec.id})</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getPriorityStyle(rec.priority)}`}>
                {rec.priority} Priority
              </span>
            </div>

            {/* Action Direct Title */}
            <h4 className="text-sm font-bold text-white tracking-tight flex items-start gap-2">
              <span className="text-amber-400 font-mono text-xs mt-0.5">{idx + 1}.</span>
              <span>{rec.action}</span>
            </h4>

            {/* Structured Reason Box */}
            <div className="mt-2.5 bg-slate-900/90 border border-slate-800/80 rounded-md p-2.5 text-xs space-y-1.5">
              <div className="flex items-start gap-1.5">
                <span className="text-amber-400 font-semibold shrink-0">Reason:</span>
                <span className="text-slate-300">{rec.reason}</span>
              </div>
              <div className="flex items-start gap-1.5 pt-1 border-t border-slate-800/60 text-[11px]">
                <span className="text-slate-500 font-medium shrink-0">Trigger Condition:</span>
                <span className="text-slate-400 font-mono">{rec.trigger}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Every recommended action provides transparent reasoning and trigger metrics for auditability.</span>
        <span className="text-slate-500 font-mono hidden sm:inline">Rule-Based + ML Inference Pipeline</span>
      </div>
    </div>
  );
};

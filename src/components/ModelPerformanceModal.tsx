import React from 'react';
import { ModelPerformanceData } from '../types';
import { X, Activity, Cpu, CheckCircle2, AlertCircle, BarChart3 } from 'lucide-react';

interface ModelPerformanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: ModelPerformanceData;
}

export const ModelPerformanceModal: React.FC<ModelPerformanceModalProps> = ({
  isOpen,
  onClose,
  metrics
}) => {
  if (!isOpen) return null;

  const { manganese_potential_model, production_forecasting_model, dataset_notice } = metrics;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 sticky top-0 bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                ML Model Performance & Evaluation Metrics
              </h3>
              <p className="text-xs text-slate-400">
                Evaluation across 80/20 train/test split (random_state=42)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Prominent Disclaimer Banner */}
          <div className="bg-amber-950/30 border border-amber-500/40 p-3.5 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 leading-relaxed">
              <span className="font-bold text-amber-300 block mb-0.5">
                Performance on demonstration dataset
              </span>
              {dataset_notice} Do NOT imply these values represent real-world MOIL operational model accuracy. Replace with validated core assay and drillhole telemetry for field deployment.
            </div>
          </div>

          {/* Model 1: Manganese Potential Regressor */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-semibold uppercase text-emerald-400 tracking-wider">
                  Model 1 · Spatial Grade Prediction
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {manganese_potential_model.model_name}
                </h4>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Artifact: backend/models/manganese_model.pkl
              </span>
            </div>

            {/* Core Metrics Cards (R², MAE, RMSE) */}
            <div className="grid grid-cols-3 gap-3 mt-3.5 text-center">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <span className="text-xs text-slate-400 block font-medium">Coefficient R²</span>
                <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">
                  {manganese_potential_model.r2_score}
                </span>
                <span className="text-[10px] text-slate-500">Target variance explained</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <span className="text-xs text-slate-400 block font-medium">Mean Absolute Error (MAE)</span>
                <span className="text-xl font-bold font-mono text-amber-400 mt-1 block">
                  {manganese_potential_model.mae}%
                </span>
                <span className="text-[10px] text-slate-500">Average % Mn deviation</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <span className="text-xs text-slate-400 block font-medium">Root Mean Squared Error (RMSE)</span>
                <span className="text-xl font-bold font-mono text-sky-400 mt-1 block">
                  {manganese_potential_model.rmse}%
                </span>
                <span className="text-[10px] text-slate-500">Penalizes large errors</span>
              </div>
            </div>

            {/* Feature Importances */}
            <div className="mt-4">
              <span className="text-xs font-semibold text-slate-300 block mb-2">
                Geological Feature Importances (Gini Impurity Decrease)
              </span>
              <div className="space-y-1.5 text-xs">
                {Object.entries(manganese_potential_model.feature_importances)
                  .sort((a, b) => b[1] - a[1])
                  .map(([feat, imp]) => (
                    <div key={feat} className="flex items-center gap-2">
                      <span className="w-44 text-slate-400 font-mono text-[11px] truncate">
                        {feat}
                      </span>
                      <div className="flex-1 bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${imp * 100}%` }}
                        />
                      </div>
                      <span className="w-12 text-right font-mono text-[11px] text-slate-300">
                        {(imp * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Model 2: Production Forecasting Regressor */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-semibold uppercase text-sky-400 tracking-wider">
                  Model 2 · Monthly Output Forecasting
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {production_forecasting_model.model_name}
                </h4>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Artifact: backend/models/production_model.pkl
              </span>
            </div>

            {/* Core Metrics Cards (R², MAE, RMSE) */}
            <div className="grid grid-cols-3 gap-3 mt-3.5 text-center">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <span className="text-xs text-slate-400 block font-medium">Coefficient R²</span>
                <span className="text-xl font-bold font-mono text-sky-400 mt-1 block">
                  {production_forecasting_model.r2_score}
                </span>
                <span className="text-[10px] text-slate-500">Target variance explained</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <span className="text-xs text-slate-400 block font-medium">MAE (Metric Tonnes)</span>
                <span className="text-xl font-bold font-mono text-amber-400 mt-1 block">
                  {production_forecasting_model.mae.toLocaleString()} T
                </span>
                <span className="text-[10px] text-slate-500">Average tonnage deviation</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <span className="text-xs text-slate-400 block font-medium">RMSE (Metric Tonnes)</span>
                <span className="text-xl font-bold font-mono text-purple-400 mt-1 block">
                  {production_forecasting_model.rmse.toLocaleString()} T
                </span>
                <span className="text-[10px] text-slate-500">Forecast standard error</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close Metrics
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Database, ShieldCheck, AlertTriangle, BookOpen, CheckCircle } from 'lucide-react';

interface DataTransparencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataTransparencyModal: React.FC<DataTransparencyModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 sticky top-0 bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Data Transparency & Scientific Limitations
              </h3>
              <p className="text-xs text-slate-400">
                Clear distinction between public real-world MOIL disclosures and synthetic demonstration data
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

        {/* Body Content */}
        <div className="p-6 space-y-5 text-xs text-slate-300 leading-relaxed">
          {/* Scientific Notice Banner */}
          <div className="bg-amber-950/40 border border-amber-500/40 p-4 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-300 text-sm mb-1">
                Core Scientific Principle
              </h4>
              <p className="text-amber-200/90 text-xs">
                The application does <strong className="text-amber-100">NOT</strong> claim that &ldquo;AI can see manganese underground.&rdquo; Instead, the machine learning models learn statistical and physical relationships between historical geological drilling observations (depth, ore thickness, rock density, host rock indicators) and measured manganese grades, estimating grade probabilities in unsampled exploration blocks.
              </p>
            </div>
          </div>

          {/* Two Columns: Real/Public vs Demonstration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Column 1: Public / Real Data */}
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-800 text-emerald-400 font-bold text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Public / Real Data</span>
              </div>
              <ul className="mt-3 space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Real MOIL Mine Names:</strong> 10 authentic operating mines (Balaghat, Dongri Buzurg, Chikla, Ukwa, Tirodi, Kandri, Munsar, Gumgaon, Sitapatore, Beldongri).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Administrative Locations:</strong> State (Maharashtra & Madhya Pradesh) and districts (Bhandara, Nagpur, Balaghat) from published MOIL Annual Reports.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Approximate Public Coordinates:</strong> Publicly documented coordinates representing verified mining lease clusters without synthetic boundaries.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Mining Methods & Mineralogy:</strong> Published underground shaft, opencast bench types, and host rock formations (Braunite, Pyrolusite, Gondite).
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 2: Synthetic Demonstration Data */}
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-800 text-amber-400 font-bold text-sm">
                <Database className="w-4 h-4" />
                <span>Demonstration / Synthetic Data</span>
              </div>
              <ul className="mt-3 space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">ℹ</span>
                  <div>
                    <strong className="text-white">Geological Drillhole Observations:</strong> 600 synthetic historical sampling records with physical correlations, noise, and impurity features.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">ℹ</span>
                  <div>
                    <strong className="text-white">Exploration Cell Grids (A1–E5):</strong> 5×5 demonstration blocks simulating spatial variance across local Gondite strike trends.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">ℹ</span>
                  <div>
                    <strong className="text-white">Production & Telemetry Series:</strong> 48-month synthetic records of planned vs actual tonnage, equipment downtime, blasting delays, and rainfall.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">ℹ</span>
                  <div>
                    <strong className="text-white">Prototype Resource Estimation:</strong> Mathematical proof-of-concept ($Area \times Thickness \times Density$), not a statutory UNFC/JORC reserve.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Path to Production Deployment */}
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
            <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-400" />
              Deployment Roadmap: Integrating Live MOIL Operational Systems
            </h4>
            <p className="text-slate-400 mb-2">
              To promote this prototype from demonstration to live operational deployment:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-300 pl-1">
              <li>
                <strong className="text-white">Borehole & Core Assay Ingestion:</strong> Connect drillhole databases (collar surveys, lithological logs, assay spectrometry for Mn, Fe, SiO₂, P).
              </li>
              <li>
                <strong className="text-white">Statutory Geostatistical QA/QC:</strong> Incorporate 3D wireframing, ordinary kriging, and variogram modeling matching IBM / UNFC guidelines.
              </li>
              <li>
                <strong className="text-white">SCADA & Fleet Telemetry Linkage:</strong> Stream real-time dumper-loader GPS logs, weighbridge ticketing, and explosive consumption records into the forecasting pipeline.
              </li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};

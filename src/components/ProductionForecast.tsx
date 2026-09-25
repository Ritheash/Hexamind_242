import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { ProductionDataPoint } from '../types';
import { TrendingUp, BarChart2, Calendar, AlertCircle } from 'lucide-react';

interface ProductionForecastProps {
  chartData: ProductionDataPoint[];
  plannedProduction: number;
  predictedProduction: number;
  mineName: string;
}

export const ProductionForecast: React.FC<ProductionForecastProps> = ({
  chartData,
  plannedProduction,
  predictedProduction,
  mineName
}) => {
  // Format numbers with commas
  const formatTonnage = (val: number | null) => {
    if (val === null || val === undefined) return '—';
    return `${val.toLocaleString()} T Mn Ore`;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-sky-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Manganese Ore Production Forecast & Historical Extraction
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Trained Random Forest Regressor · {mineName} Monthly Manganese Ore Telemetry
          </p>
        </div>

        {/* Planned vs Predicted Quick Summary */}
        <div className="flex items-center gap-4 text-xs">
          <div className="bg-slate-950/70 border border-slate-800 px-3 py-1.5 rounded-lg">
            <span className="text-slate-400 block text-[10px]">Planned Mn Ore Target</span>
            <span className="font-mono font-bold text-slate-200">
              {formatTonnage(plannedProduction)}
            </span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 px-3 py-1.5 rounded-lg">
            <span className="text-slate-400 block text-[10px]">Predicted Mn Ore Output</span>
            <span className="font-mono font-bold text-sky-400">
              {formatTonnage(predictedProduction)}
            </span>
          </div>
        </div>
      </div>

      {/* Recharts Chart Area */}
      <div className="mt-4 h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.6} />
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0.5rem',
                fontSize: '12px',
                color: '#f8fafc'
              }}
              formatter={(value: any, name: any) => [
                formatTonnage(Number(value)),
                name === 'historical_actual'
                  ? 'Historical Manganese Ore'
                  : name === 'planned'
                  ? 'Planned Manganese Ore'
                  : 'Predicted Manganese Ore (ML)'
              ]}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
              formatter={(value) => {
                if (value === 'historical_actual') return 'Historical Manganese Ore (Tonnes)';
                if (value === 'planned') return 'Planned Manganese Ore Target (Tonnes)';
                if (value === 'predicted') return 'Predicted Manganese Ore (Random Forest ML)';
                return value;
              }}
            />
            {/* Historical Actual Line */}
            <Line
              type="monotone"
              dataKey="historical_actual"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3, fill: '#10b981' }}
              activeDot={{ r: 5 }}
            />
            {/* Planned Line (dashed amber) */}
            <Line
              type="monotone"
              dataKey="planned"
              stroke="#f59e0b"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
            />
            {/* Predicted Line (bright sky blue with pulsing point) */}
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#38bdf8"
              strokeWidth={2.5}
              dot={{ r: 6, fill: '#0284c7', stroke: '#38bdf8', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Explanatory Caption */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-400"></span>
          <span>Next-period manganese ore prediction incorporates loading machinery downtime, blasting delays, and rainfall telemetry.</span>
        </span>
        <span className="text-slate-500 font-mono">
          Demonstration dataset: 48 monthly manganese operational records
        </span>
      </div>
    </div>
  );
};

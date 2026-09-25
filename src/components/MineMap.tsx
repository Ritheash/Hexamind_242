import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MOILMine } from '../types';
import { Navigation, Sparkles, ArrowDownToLine, Compass, AlertTriangle } from 'lucide-react';
import { getMineIntelligence } from '../services/intelligenceService';

interface MineMapProps {
  mines: MOILMine[];
  selectedMine: MOILMine;
  onSelectMine: (mine: MOILMine) => void;
  onOpenIntelligence?: (mine: MOILMine) => void;
}

// Controller to auto-pan when selected mine changes
const MapRecenter: React.FC<{ coords: [number, number] }> = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(coords, Math.max(map.getZoom(), 9), {
      duration: 1.2
    });
  }, [coords, map]);
  return null;
};

// Create custom SVG Leaflet marker
function createCustomMarker(isSelected: boolean, state: string) {
  const isMP = state.includes('Madhya');
  const primaryColor = isSelected ? '#f59e0b' : isMP ? '#38bdf8' : '#a855f7';
  const pulseRing = isSelected
    ? `<div class="absolute -inset-2 rounded-full border-2 border-amber-400 animate-ping opacity-60 pointer-events-none"></div>`
    : '';

  return L.divIcon({
    className: 'custom-mine-pin',
    html: `
      <div class="relative flex items-center justify-center">
        ${pulseRing}
        <div style="background-color: ${isSelected ? '#b45309' : '#0f172a'}; border: 2px solid ${primaryColor};" 
             class="w-7 h-7 rounded-full shadow-lg flex items-center justify-center text-white transition-transform hover:scale-110">
          <span style="font-size: 13px;">⛏</span>
        </div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
}

export const MineMap: React.FC<MineMapProps> = ({
  mines,
  selectedMine,
  onSelectMine,
  onOpenIntelligence
}) => {
  const center: [number, number] = [21.65, 79.85];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col">
      {/* Map Header / Status Bar */}
      <div className="px-4 py-3 border-b border-slate-800 bg-slate-900 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold text-white">
            Central Indian Manganese Belt (MOIL Manganese Leases)
          </h2>
          <span className="text-xs text-slate-400">· 10 Real MOIL Manganese Mines</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span>
            Maharashtra Mn (6)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block"></span>
            Madhya Pradesh Mn (4)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-amber-400/40 inline-block"></span>
            Active Manganese Mine
          </span>
        </div>
      </div>

      {/* Leaflet Map Canvas */}
      <div className="h-[360px] w-full relative z-0">
        <MapContainer
          center={center}
          zoom={9}
          scrollWheelZoom={true}
          className="h-full w-full bg-slate-950"
        >
          {/* Standard OpenStreetMap public tiles - No API key required */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={18}
          />
          <MapRecenter coords={[selectedMine.latitude, selectedMine.longitude]} />

          {mines.map((mine) => {
            const isSelected = mine.mine_id === selectedMine.mine_id;
            const intel = getMineIntelligence(mine);
            return (
              <Marker
                key={mine.mine_id}
                position={[mine.latitude, mine.longitude]}
                icon={createCustomMarker(isSelected, mine.state)}
                eventHandlers={{
                  click: () => {
                    onSelectMine(mine);
                    if (onOpenIntelligence) {
                      onOpenIntelligence(mine);
                    }
                  }
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-2.5 min-w-[260px] max-w-[320px] text-slate-100 font-sans">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-700">
                      <div>
                        <span className="font-bold text-sm text-white block">{mine.mine_name}</span>
                        <span className="text-[11px] text-slate-400">{mine.district}, {mine.state}</span>
                      </div>
                      <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {mine.mining_method.includes('Deep') ? 'Underground' : 'Active Pit'}
                      </span>
                    </div>

                    {/* The 4 Core Requested Parameters */}
                    <div className="mt-2.5 space-y-2 text-xs">
                      {/* 1. Manganese Availability % */}
                      <div className="bg-slate-900/90 p-2 rounded border border-amber-500/30">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                          1. Manganese Availability
                        </span>
                        <div className="text-sm font-bold font-mono text-amber-300 mt-0.5">
                          {intel.manganese_availability_pct.toFixed(1)}% Mn
                        </div>
                        <span className="text-[10px] text-slate-400 block truncate">
                          {intel.availability_grade_label}
                        </span>
                      </div>

                      {/* 2. Previous Extraction Depth */}
                      <div className="bg-slate-900/90 p-2 rounded border border-sky-500/30">
                        <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                          2. Previously Extracted Depth
                        </span>
                        <div className="text-xs font-semibold text-sky-200 mt-0.5 font-mono">
                          {intel.previous_extraction_depth}
                        </div>
                      </div>

                      {/* 3. Promising Next Drill Position */}
                      <div className="bg-slate-900/90 p-2 rounded border border-emerald-500/30">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                          3. Promising Next Drill Position
                        </span>
                        <div className="text-xs font-semibold text-emerald-300 mt-0.5">
                          {intel.promising_next_drill.location_label}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                          Coords: {intel.promising_next_drill.latitude.toFixed(4)}°N, {intel.promising_next_drill.longitude.toFixed(4)}°E
                        </div>
                        <div className="text-[10px] text-slate-300 mt-0.5">
                          Depth: <strong className="text-white">{intel.promising_next_drill.target_depth_m}m</strong> · Est. Grade: <strong className="text-emerald-400">{intel.promising_next_drill.predicted_mn_grade}% Mn</strong>
                        </div>
                      </div>

                      {/* 4. Shortfall % If Occurs */}
                      <div className="bg-slate-900/90 p-2 rounded border border-rose-500/30">
                        <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                          4. Shortfall % If Occurs
                        </span>
                        <div className="text-xs font-bold text-rose-300 mt-0.5 font-mono">
                          {intel.shortfall_analysis.shortfall_percentage.toFixed(1)}% Shortfall Expected
                        </div>
                        <span className="text-[10px] text-slate-400 block">
                          Deficit: -{intel.shortfall_analysis.expected_shortfall_tonnes.toLocaleString()} T Mn Ore below target
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSelectMine(mine);
                        if (onOpenIntelligence) {
                          onOpenIntelligence(mine);
                        }
                      }}
                      className="mt-2.5 w-full text-center text-xs font-bold py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-lg transition-colors cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Open Full Mine Intelligence Popup</span>
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Selected Mine Quick Bar overlay */}
        <div className="absolute bottom-3 left-3 z-[1000] bg-slate-900/90 backdrop-blur border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 max-w-sm shadow-xl">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400">{selectedMine.mine_name}</span>
            <span className="text-slate-400">·</span>
            <span>Manganese Deposit ({selectedMine.district}, {selectedMine.state})</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
            <span className="text-amber-300">ℹ</span>
            <span>{selectedMine.location_accuracy} · Coordinates: {selectedMine.latitude}° N, {selectedMine.longitude}° E</span>
          </p>
        </div>
      </div>

      {/* Cartographic & Public Data Disclaimer */}
      <div className="px-4 py-2 bg-slate-950/70 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>
          Manganese mine names and administrative districts source: Published MOIL Limited Annual Reports & Ministry of Mines disclosures.
        </span>
        <span className="text-slate-500 hidden sm:inline">
          Approximate public manganese centers mapped without artificial boundary extrapolation.
        </span>
      </div>
    </div>
  );
};

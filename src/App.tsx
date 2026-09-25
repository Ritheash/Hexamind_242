import React, { useState } from 'react';
import { MOILMine } from './types';
import { REAL_MOIL_MINES } from './data/minesData';
import { Header } from './components/Header';
import { MineMap } from './components/MineMap';
import { MineSummaryPanel } from './components/MineSummaryPanel';
import { MineIntelligenceModal } from './components/MineIntelligenceModal';
import { getMineIntelligence } from './services/intelligenceService';

export default function App() {
  const [mines] = useState<MOILMine[]>(REAL_MOIL_MINES);
  // Default to Balaghat Mine (MOIL's flagship deep underground manganese mine)
  const [selectedMine, setSelectedMine] = useState<MOILMine>(
    REAL_MOIL_MINES.find((m) => m.mine_id === 'balaghat') || REAL_MOIL_MINES[0]
  );

  // Intelligence modal popup state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  // Derive intelligence details for the active mine
  const currentIntelligence = getMineIntelligence(selectedMine);

  // Handle mine selection from header or map click: selects mine and pops up intelligence details
  const handleSelectMine = (mine: MOILMine) => {
    setSelectedMine(mine);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Application Header with Mine Selector */}
      <Header
        mines={mines}
        selectedMine={selectedMine}
        onSelectMine={handleSelectMine}
      />

      {/* Main Map & Intelligence Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Central Interactive Leaflet Map (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <MineMap
              mines={mines}
              selectedMine={selectedMine}
              onSelectMine={handleSelectMine}
              onOpenIntelligence={handleSelectMine}
            />
          </div>

          {/* Mine Intelligence Summary Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <MineSummaryPanel
              mine={selectedMine}
              data={currentIntelligence}
              onOpenModal={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">⛏ MineMind AI</span>
            <span>·</span>
            <span>Manganese Exploration & Production Intelligence</span>
          </div>
          <div className="text-[11px] text-slate-500">
            MOIL Manganese Operations: Bhandara, Nagpur, Balaghat
          </div>
        </div>
      </footer>

      {/* Pop-up Intelligence Modal that appears when a particular mine is selected or clicked */}
      <MineIntelligenceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={currentIntelligence}
        mine={selectedMine}
        allMines={mines}
        onSelectOtherMine={handleSelectMine}
      />
    </div>
  );
}

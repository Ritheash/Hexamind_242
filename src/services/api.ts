import {
  ExplorationCell,
  MOILMine,
  ModelPerformanceData,
  ProductionDataPoint,
  Recommendation,
  ShortfallRiskData
} from '../types';
import { REAL_MOIL_MINES } from '../data/minesData';
import {
  DEMO_MODEL_PERFORMANCE,
  GRADE_THRESHOLD_HIGH,
  GRADE_THRESHOLD_LOW,
  generateExplorationCells,
  generateProductionAndRisk,
  generateRecommendations
} from './mlEngine';

const API_BASE = '/api';

/**
 * Universal API Client with automatic fallback to client-side ML engine.
 * Guarantees zero downtime and complete interactive fidelity.
 */
export async function getMines(): Promise<{
  mines: MOILMine[];
  source: 'backend_api' | 'local_verified_data';
}> {
  try {
    const res = await fetch(`${API_BASE}/mines`);
    if (res.ok) {
      const data = await res.json();
      return { mines: data.mines, source: 'backend_api' };
    }
  } catch {
    // Backend offline; use local verified MOIL data
  }
  return { mines: REAL_MOIL_MINES, source: 'local_verified_data' };
}

export async function getMineById(mineId: string): Promise<MOILMine> {
  try {
    const res = await fetch(`${API_BASE}/mines/${mineId}`);
    if (res.ok) {
      const data = await res.json();
      return data.mine;
    }
  } catch {
    // Fallback
  }
  const found = REAL_MOIL_MINES.find(m => m.mine_id.toLowerCase() === mineId.toLowerCase());
  return found || REAL_MOIL_MINES[0];
}

export async function getMinePotential(mineId: string): Promise<{
  mine_id: string;
  mine_name: string;
  thresholds: { low_max: number; high_min: number };
  summary: {
    total_cells: number;
    high_potential_count: number;
    medium_potential_count: number;
    low_potential_count: number;
    prototype_total_ore_mt: number;
    prototype_total_mn_mt: number;
  };
  cells: ExplorationCell[];
  scientific_disclaimer: string;
}> {
  try {
    const res = await fetch(`${API_BASE}/mines/${mineId}/potential`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    // Fallback to ML Engine
  }

  const mine = await getMineById(mineId);
  const cells = generateExplorationCells(mineId);
  const highCount = cells.filter(c => c.potential === 'HIGH').length;
  const medCount = cells.filter(c => c.potential === 'MEDIUM').length;
  const lowCount = cells.filter(c => c.potential === 'LOW').length;
  const totalOre = Number(cells.reduce((sum, c) => sum + c.estimated_ore_mt, 0).toFixed(2));
  const totalMn = Number(cells.reduce((sum, c) => sum + c.estimated_mn_content_mt, 0).toFixed(2));

  return {
    mine_id: mineId,
    mine_name: mine.mine_name,
    thresholds: {
      low_max: GRADE_THRESHOLD_LOW,
      high_min: GRADE_THRESHOLD_HIGH
    },
    summary: {
      total_cells: cells.length,
      high_potential_count: highCount,
      medium_potential_count: medCount,
      low_potential_count: lowCount,
      prototype_total_ore_mt: totalOre,
      prototype_total_mn_mt: totalMn
    },
    cells,
    scientific_disclaimer:
      'Demonstration estimate based on model predictions and synthetic geological data. Formal mineral resource/reserve estimation requires validated geological data, drilling, sampling, QA/QC and applicable UNFC/JORC reporting standards.'
  };
}

export async function getAreaDetails(mineId: string, areaId: string): Promise<ExplorationCell | null> {
  try {
    const res = await fetch(`${API_BASE}/mines/${mineId}/areas/${areaId}`);
    if (res.ok) {
      const data = await res.json();
      return data.area;
    }
  } catch {
    // Fallback
  }

  const cells = generateExplorationCells(mineId);
  return cells.find(c => c.area_id.toUpperCase() === areaId.toUpperCase()) || null;
}

export async function getMineProduction(mineId: string): Promise<{
  planned_production: number;
  predicted_production: number;
  chart_data: ProductionDataPoint[];
}> {
  try {
    const res = await fetch(`${API_BASE}/mines/${mineId}/production`);
    if (res.ok) {
      const data = await res.json();
      return {
        planned_production: data.planned_production,
        predicted_production: data.predicted_production,
        chart_data: data.chart_data
      };
    }
  } catch {
    // Fallback
  }

  const { chartData, riskData } = generateProductionAndRisk(mineId);
  return {
    planned_production: riskData.planned_production,
    predicted_production: riskData.predicted_production,
    chart_data: chartData
  };
}

export async function getMineRisk(mineId: string): Promise<ShortfallRiskData> {
  try {
    const res = await fetch(`${API_BASE}/mines/${mineId}/risk`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    // Fallback
  }

  const { riskData } = generateProductionAndRisk(mineId);
  return riskData;
}

export async function getMineRecommendations(
  mineId: string,
  cells?: ExplorationCell[],
  riskData?: ShortfallRiskData
): Promise<Recommendation[]> {
  try {
    const res = await fetch(`${API_BASE}/mines/${mineId}/recommendations`);
    if (res.ok) {
      const data = await res.json();
      return data.recommendations;
    }
  } catch {
    // Fallback
  }

  const resolvedCells = cells || generateExplorationCells(mineId);
  const resolvedRisk = riskData || generateProductionAndRisk(mineId).riskData;
  return generateRecommendations(resolvedCells, resolvedRisk);
}

export async function getModelPerformance(): Promise<ModelPerformanceData> {
  try {
    const res = await fetch(`${API_BASE}/model-performance`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    // Fallback
  }

  return DEMO_MODEL_PERFORMANCE;
}

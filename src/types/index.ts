export interface MOILMine {
  mine_id: string;
  mine_name: string;
  state: string;
  district: string;
  latitude: number;
  longitude: number;
  location_accuracy: string;
  mining_method: string;
  key_mineralogy: string;
  annual_report_ref: string;
  established_year: number;
  remarks: string;
}

export type PotentialLevel = 'HIGH' | 'MEDIUM' | 'LOW';
export type ShortfallRiskLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface ExplorationCell {
  area_id: string;
  row: string;
  col: number;
  predicted_mn_grade: number;
  potential: PotentialLevel;
  depth_m: number;
  ore_thickness_m: number;
  rock_density_t_m3: number;
  moisture_pct: number;
  iron_content_pct: number;
  silica_content_pct: number;
  geological_indicator_1: number;
  geological_indicator_2: number;
  historical_nearby_production_t: number;
  estimated_ore_mt: number;
  estimated_mn_content_mt: number;
  cell_area_sqm: number;
}

export interface ProductionDataPoint {
  month: string;
  historical_actual: number | null;
  planned: number;
  predicted: number | null;
}

export interface OperationalFactors {
  equipment_downtime_hrs: number;
  equipment_downtime_impact_score: number;
  blasting_delay_hrs: number;
  blasting_delay_impact_score: number;
  rainfall_mm: number;
  rainfall_impact_score: number;
}

export interface ShortfallRiskData {
  planned_production: number;
  predicted_production: number;
  expected_shortfall: number;
  shortfall_percentage: number;
  risk_level: ShortfallRiskLevel;
  risk_thresholds: {
    low_max: number;
    high_min: number;
  };
  operational_factors: OperationalFactors;
  metric_label: string;
}

export interface Recommendation {
  id: string;
  category: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  action: string;
  reason: string;
  trigger: string;
}

export interface ModelMetrics {
  model_name: string;
  r2_score: number;
  mae: number;
  rmse: number;
  train_samples: number;
  test_samples: number;
  random_state: number;
  dataset_type: string;
  feature_importances: Record<string, number>;
  target: string;
  features: string[];
  disclaimer: string;
}

export interface PromisingDrillPosition {
  location_label: string;
  latitude: number;
  longitude: number;
  target_depth_m: number;
  estimated_thickness_m: number;
  predicted_mn_grade: number;
  geological_rationale: string;
}

export interface MineShortfallAnalysis {
  shortfall_percentage: number;
  will_occur: boolean;
  expected_shortfall_tonnes: number;
  planned_target_tonnes: number;
  predicted_tonnes: number;
  risk_level: ShortfallRiskLevel;
  primary_bottlenecks: string;
}

export interface MineIntelligenceData {
  mine_id: string;
  mine_name: string;
  district: string;
  state: string;
  mining_method: string;
  key_mineralogy: string;
  manganese_availability_pct: number;
  availability_grade_label: string;
  previous_extraction_depth: string;
  promising_next_drill: PromisingDrillPosition;
  shortfall_analysis: MineShortfallAnalysis;
}

export interface ModelPerformanceData {
  dataset_notice: string;
  manganese_potential_model: ModelMetrics;
  production_forecasting_model: ModelMetrics;
}

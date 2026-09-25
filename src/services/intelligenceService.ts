import { MineIntelligenceData, MOILMine } from '../types';

export const MINE_INTELLIGENCE_RECORDS: Record<string, MineIntelligenceData> = {
  balaghat: {
    mine_id: 'balaghat',
    mine_name: 'Balaghat Mine',
    district: 'Balaghat',
    state: 'Madhya Pradesh',
    mining_method: 'Deep Underground (Bharweli Deposit)',
    key_mineralogy: 'Braunite, Pyrolusite, Bixbyite',
    manganese_availability_pct: 43.8,
    availability_grade_label: 'High-Grade Metallurgical & Chemical Reserve (>40% Mn)',
    previous_extraction_depth: '120 m to 385 m depth (Levels 1 to 12 via Main Production Shaft & Bharweli Winze stopes)',
    promising_next_drill: {
      location_label: 'Sector North-East Fold Limb (Target Area B2)',
      latitude: 21.8762,
      longitude: 80.2035,
      target_depth_m: 260,
      estimated_thickness_m: 6.8,
      predicted_mn_grade: 46.2,
      geological_rationale: 'Down-dip continuity of high-grade Braunite shoot along synclinal hinge line with rock density 4.15 t/m³.'
    },
    shortfall_analysis: {
      shortfall_percentage: 11.8,
      will_occur: true,
      expected_shortfall_tonnes: 2300,
      planned_target_tonnes: 19500,
      predicted_tonnes: 17200,
      risk_level: 'HIGH',
      primary_bottlenecks: 'Hoisting shaft motor servicing (38.5 hrs) & statutory blasting charging delay (14.0 hrs).'
    }
  },
  dongri_buzurg: {
    mine_id: 'dongri_buzurg',
    mine_name: 'Dongri Buzurg Mine',
    district: 'Bhandara',
    state: 'Maharashtra',
    mining_method: 'Opencast Bench Mining',
    key_mineralogy: 'Pyrolusite, Cryptomelane, Braunite',
    manganese_availability_pct: 41.5,
    availability_grade_label: 'High-Dioxide (MnO₂) Battery & Chemical Grade Reserve',
    previous_extraction_depth: 'Surface benches to 80 m depth (Stages 1 to 5 opencast bench slicing down to pit floor)',
    promising_next_drill: {
      location_label: 'West Extension Hanging Wall (Target Area C2)',
      latitude: 21.5728,
      longitude: 79.6875,
      target_depth_m: 95,
      estimated_thickness_m: 5.6,
      predicted_mn_grade: 43.1,
      geological_rationale: 'Unexploited lateral extension of high-dioxide Pyrolusite-Cryptomelane ore body beyond current pit crest.'
    },
    shortfall_analysis: {
      shortfall_percentage: 8.5,
      will_occur: true,
      expected_shortfall_tonnes: 1200,
      planned_target_tonnes: 14200,
      predicted_tonnes: 13000,
      risk_level: 'MEDIUM',
      primary_bottlenecks: 'Excavator bucket maintenance (29.0 hrs) & pit bench haul road mudding (34.0 mm precipitation).'
    }
  },
  chikla: {
    mine_id: 'chikla',
    mine_name: 'Chikla Mine',
    district: 'Bhandara',
    state: 'Maharashtra',
    mining_method: 'Underground & Opencast Quarry',
    key_mineralogy: 'Braunite, Pyrolusite, Psilomelane',
    manganese_availability_pct: 38.2,
    availability_grade_label: 'Gondite Belt High-Grade Braunite Ore (35–42% Mn)',
    previous_extraction_depth: '65 m to 190 m depth (Sub-level open stoping and intermediate levels via Chikla incline)',
    promising_next_drill: {
      location_label: 'Chikla-East Synclinal Shoot (Target Area B3)',
      latitude: 21.5580,
      longitude: 79.7545,
      target_depth_m: 215,
      estimated_thickness_m: 5.2,
      predicted_mn_grade: 41.4,
      geological_rationale: 'Plunging synclinal fold limb showing consistent bedded Braunite with low iron impurity (Fe < 6.8%).'
    },
    shortfall_analysis: {
      shortfall_percentage: 12.5,
      will_occur: true,
      expected_shortfall_tonnes: 1600,
      planned_target_tonnes: 12800,
      predicted_tonnes: 11200,
      risk_level: 'HIGH',
      primary_bottlenecks: 'Underground locomotive tramming bottlenecks (36.0 hrs) & auxiliary stope ventilation downtime.'
    }
  },
  ukwa: {
    mine_id: 'ukwa',
    mine_name: 'Ukwa Mine',
    district: 'Balaghat',
    state: 'Madhya Pradesh',
    mining_method: 'Underground Incline Haulage',
    key_mineralogy: 'Braunite, Sericite Schist Intercalations',
    manganese_availability_pct: 37.6,
    availability_grade_label: 'Low-Phosphorus Tabular Bedded Ore (34–40% Mn)',
    previous_extraction_depth: '40 m to 145 m depth (Incline haulage levels following the 5 km continuous stratigraphic horizon)',
    promising_next_drill: {
      location_label: 'Ukwa Central Adit Down-Dip (Target Area A3)',
      latitude: 21.9702,
      longitude: 80.4740,
      target_depth_m: 170,
      estimated_thickness_m: 4.9,
      predicted_mn_grade: 39.8,
      geological_rationale: 'Stratiform continuation of low-phosphorus Braunite bed dipping 30° northwards beneath sericite schist.'
    },
    shortfall_analysis: {
      shortfall_percentage: 6.4,
      will_occur: true,
      expected_shortfall_tonnes: 800,
      planned_target_tonnes: 12500,
      predicted_tonnes: 11700,
      risk_level: 'MEDIUM',
      primary_bottlenecks: 'Incline conveyor belt splices (22.5 hrs) & monsoon seepage along haulageway (28.0 mm rainfall).'
    }
  },
  kandri: {
    mine_id: 'kandri',
    mine_name: 'Kandri Mine',
    district: 'Nagpur',
    state: 'Maharashtra',
    mining_method: 'Opencast & Underground Winzes',
    key_mineralogy: 'Braunite, Gondite Host Rock',
    manganese_availability_pct: 36.4,
    availability_grade_label: 'Gondite Hosted High-Grade Braunite (33–39% Mn)',
    previous_extraction_depth: '50 m to 175 m depth (Opencast top slicing transitioning to underground winzes)',
    promising_next_drill: {
      location_label: 'South-West Kandri Deep Strike (Target Area C1)',
      latitude: 21.4295,
      longitude: 79.2720,
      target_depth_m: 205,
      estimated_thickness_m: 4.8,
      predicted_mn_grade: 39.2,
      geological_rationale: 'Steeply plunging shoot identified along quartzite contact; favorable rock density of 3.82 t/m³.'
    },
    shortfall_analysis: {
      shortfall_percentage: 10.4,
      will_occur: true,
      expected_shortfall_tonnes: 1200,
      planned_target_tonnes: 11500,
      predicted_tonnes: 10300,
      risk_level: 'HIGH',
      primary_bottlenecks: 'Haulage dumper availability delays (34.0 hrs) & statutory blasting clearance window (12.0 hrs).'
    }
  },
  tirodi: {
    mine_id: 'tirodi',
    mine_name: 'Tirodi Mine',
    district: 'Balaghat',
    state: 'Madhya Pradesh',
    mining_method: 'Opencast & Underground Adits',
    key_mineralogy: 'Braunite, Spessartine, Rhodonite',
    manganese_availability_pct: 35.2,
    availability_grade_label: 'Spessartine-Braunite Manganese Ore (32–38% Mn)',
    previous_extraction_depth: 'Surface to 85 m depth (South Tirodi open pit benches and intermediate shallow shafts)',
    promising_next_drill: {
      location_label: 'North Tirodi Pit Deepening (Target Area B2)',
      latitude: 21.6830,
      longitude: 79.7145,
      target_depth_m: 125,
      estimated_thickness_m: 4.6,
      predicted_mn_grade: 38.0,
      geological_rationale: 'Uncut lens below historical opencast floor showing persistent manganese grade with minimal silica banding.'
    },
    shortfall_analysis: {
      shortfall_percentage: 9.1,
      will_occur: true,
      expected_shortfall_tonnes: 1000,
      planned_target_tonnes: 11000,
      predicted_tonnes: 10000,
      risk_level: 'MEDIUM',
      primary_bottlenecks: 'Drill rig hydraulic overhaul (28.0 hrs) & face mucking truck cycle queues.'
    }
  },
  gumgaon: {
    mine_id: 'gumgaon',
    mine_name: 'Gumgaon Mine',
    district: 'Nagpur',
    state: 'Maharashtra',
    mining_method: 'Deep Underground Vertical Shaft',
    key_mineralogy: 'Braunite, Jacobsite, Gondite',
    manganese_availability_pct: 34.8,
    availability_grade_label: 'Jacobsite-Braunite Deep Reef Ore (31–37% Mn)',
    previous_extraction_depth: '110 m to 275 m depth (Sublevel stopes via main vertical production shaft)',
    promising_next_drill: {
      location_label: 'Deep Footwall Incline (Target Area D2)',
      latitude: 21.3895,
      longitude: 78.9820,
      target_depth_m: 310,
      estimated_thickness_m: 4.5,
      predicted_mn_grade: 37.5,
      geological_rationale: 'High-density Jacobsite reef continuous along steep westerly dip; structural indicator confirms ore continuity.'
    },
    shortfall_analysis: {
      shortfall_percentage: 13.9,
      will_occur: true,
      expected_shortfall_tonnes: 1500,
      planned_target_tonnes: 10800,
      predicted_tonnes: 9300,
      risk_level: 'HIGH',
      primary_bottlenecks: 'Winder hoist motor emergency maintenance (44.0 hrs) & blast fume evacuation delay (15.5 hrs).'
    }
  },
  munsar: {
    mine_id: 'munsar',
    mine_name: 'Munsar Mine',
    district: 'Nagpur',
    state: 'Maharashtra',
    mining_method: 'Underground Incline & Opencast Pit',
    key_mineralogy: 'Braunite, Hollandite, Pyrolusite',
    manganese_availability_pct: 33.5,
    availability_grade_label: 'Synclinal Fold Manganese Horizon (30–36% Mn)',
    previous_extraction_depth: '45 m to 135 m depth (Synclinal trough extraction through incline drifts and quarry benches)',
    promising_next_drill: {
      location_label: 'Syncline Southern Flank (Target Area C3)',
      latitude: 21.4005,
      longitude: 79.2950,
      target_depth_m: 160,
      estimated_thickness_m: 4.3,
      predicted_mn_grade: 36.4,
      geological_rationale: 'Thickening of manganese ore at the synclinal keel; lower silica impurity detected in adjacent drillholes.'
    },
    shortfall_analysis: {
      shortfall_percentage: 11.8,
      will_occur: true,
      expected_shortfall_tonnes: 1200,
      planned_target_tonnes: 10200,
      predicted_tonnes: 9000,
      risk_level: 'HIGH',
      primary_bottlenecks: 'Front-end loader tire servicing (31.0 hrs) & pit floor drainage pumping after rain (32.0 mm).'
    }
  },
  sitapatore: {
    mine_id: 'sitapatore',
    mine_name: 'Sitapatore Mine',
    district: 'Balaghat',
    state: 'Madhya Pradesh',
    mining_method: 'Opencast & Underground Workings',
    key_mineralogy: 'Braunite, Pyrolusite, Psilomelane',
    manganese_availability_pct: 31.2,
    availability_grade_label: 'Interbedded Braunite-Quartzite Ore (28–34% Mn)',
    previous_extraction_depth: 'Surface benches to 70 m depth (Opencast stripping and shallow auxiliary pits)',
    promising_next_drill: {
      location_label: 'Eastern Boundary Extension (Target Area A2)',
      latitude: 21.5448,
      longitude: 79.7432,
      target_depth_m: 105,
      estimated_thickness_m: 3.9,
      predicted_mn_grade: 34.1,
      geological_rationale: 'Continuous strike projection toward Sukli block with steady iron/silica ratio.'
    },
    shortfall_analysis: {
      shortfall_percentage: 8.0,
      will_occur: true,
      expected_shortfall_tonnes: 700,
      planned_target_tonnes: 8800,
      predicted_tonnes: 8100,
      risk_level: 'MEDIUM',
      primary_bottlenecks: 'Dozer track assembly repair (24.0 hrs) & pit road dust suppression pauses.'
    }
  },
  beldongri: {
    mine_id: 'beldongri',
    mine_name: 'Beldongri Mine',
    district: 'Nagpur',
    state: 'Maharashtra',
    mining_method: 'Opencast Bench Mining',
    key_mineralogy: 'Braunite, Quartzite Intercalations',
    manganese_availability_pct: 29.6,
    availability_grade_label: 'Bedded Manganese Ore with Quartzite (26–33% Mn)',
    previous_extraction_depth: 'Surface benches to 60 m depth (Opencast benches with mechanical shovel loading)',
    promising_next_drill: {
      location_label: 'South Pit Deep Bench (Target Area B4)',
      latitude: 21.3605,
      longitude: 79.2960,
      target_depth_m: 85,
      estimated_thickness_m: 3.7,
      predicted_mn_grade: 32.8,
      geological_rationale: 'Structural fold repeat beneath superficial alluvium; confirmed by high local magnetic indicator.'
    },
    shortfall_analysis: {
      shortfall_percentage: 7.3,
      will_occur: true,
      expected_shortfall_tonnes: 600,
      planned_target_tonnes: 8200,
      predicted_tonnes: 7600,
      risk_level: 'MEDIUM',
      primary_bottlenecks: 'Transport truck dispatch queue delays (21.0 hrs) & secondary boulder breaking.'
    }
  }
};

export function getMineIntelligence(mine: MOILMine): MineIntelligenceData {
  const key = mine.mine_id.toLowerCase();
  const record = MINE_INTELLIGENCE_RECORDS[key];
  if (record) {
    return record;
  }

  // Fallback dynamic generator
  return {
    mine_id: mine.mine_id,
    mine_name: mine.mine_name,
    district: mine.district,
    state: mine.state,
    mining_method: mine.mining_method,
    key_mineralogy: mine.key_mineralogy,
    manganese_availability_pct: 35.0,
    availability_grade_label: 'Medium to High Grade Manganese Deposit',
    previous_extraction_depth: 'Surface to 100 m depth (Opencast & shallow underground stopes)',
    promising_next_drill: {
      location_label: `${mine.mine_name} Central Strike Extension`,
      latitude: mine.latitude + 0.002,
      longitude: mine.longitude + 0.002,
      target_depth_m: 140,
      estimated_thickness_m: 4.5,
      predicted_mn_grade: 38.0,
      geological_rationale: 'Projected strike continuity along the Gondite ore alignment.'
    },
    shortfall_analysis: {
      shortfall_percentage: 8.5,
      will_occur: true,
      expected_shortfall_tonnes: 1000,
      planned_target_tonnes: 12000,
      predicted_tonnes: 11000,
      risk_level: 'MEDIUM',
      primary_bottlenecks: 'Fleet downtime and regional monsoon delays.'
    }
  };
}

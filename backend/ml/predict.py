"""
Inference and Operational Decision Engine for MineMind AI
1. Spatial exploration grid prediction & grade classification
2. Prototype estimated resource potential calculations (Area × Thickness × Density)
3. Production forecasting & shortfall risk calculation
4. Explainable AI operational recommendation engine
"""

import os
import json
import math
import pickle

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, 'models')
DATA_DIR = os.path.join(BASE_DIR, 'data')

GRADE_THRESHOLD_LOW = 25.0
GRADE_THRESHOLD_HIGH = 35.0
SHORTFALL_THRESHOLD_LOW = 5.0
SHORTFALL_THRESHOLD_HIGH = 10.0
CELL_AREA_SQM = 40000.0  # 200m x 200m = 0.04 km²

# Mine geological factors
MINE_FACTORS = {
    "balaghat": {"name": "Balaghat Mine", "base_grade": 41.5, "depth_base": 185.0, "thickness_base": 6.8, "density_base": 4.15, "target_prod": 19500},
    "dongri_buzurg": {"name": "Dongri Buzurg Mine", "base_grade": 38.2, "depth_base": 65.0, "thickness_base": 5.4, "density_base": 3.95, "target_prod": 14200},
    "chikla": {"name": "Chikla Mine", "base_grade": 36.8, "depth_base": 115.0, "thickness_base": 5.1, "density_base": 3.90, "target_prod": 12800},
    "ukwa": {"name": "Ukwa Mine", "base_grade": 35.6, "depth_base": 95.0, "thickness_base": 4.8, "density_base": 3.85, "target_prod": 12500},
    "tirodi": {"name": "Tirodi Mine", "base_grade": 33.4, "depth_base": 75.0, "thickness_base": 4.5, "density_base": 3.75, "target_prod": 11000},
    "kandri": {"name": "Kandri Mine", "base_grade": 34.2, "depth_base": 85.0, "thickness_base": 4.6, "density_base": 3.80, "target_prod": 11500},
    "munsar": {"name": "Munsar Mine", "base_grade": 31.8, "depth_base": 90.0, "thickness_base": 4.2, "density_base": 3.70, "target_prod": 10200},
    "gumgaon": {"name": "Gumgaon Mine", "base_grade": 33.1, "depth_base": 140.0, "thickness_base": 4.4, "density_base": 3.78, "target_prod": 10800},
    "sitapatore": {"name": "Sitapatore Mine", "base_grade": 29.5, "depth_base": 60.0, "thickness_base": 3.8, "density_base": 3.65, "target_prod": 8800},
    "beldongri": {"name": "Beldongri Mine", "base_grade": 28.2, "depth_base": 55.0, "thickness_base": 3.5, "density_base": 3.60, "target_prod": 8200},
}

def load_model(pkl_path):
    if not os.path.exists(pkl_path):
        return None
    try:
        import joblib
        return joblib.load(pkl_path)
    except Exception:
        with open(pkl_path, 'rb') as f:
            return pickle.load(f)

def predict_mn_grade(features, model):
    """Features: [depth, ore_thickness, rock_density, moisture, iron, silica, ind1, ind2, production]"""
    if hasattr(model, 'predict'):
        return float(model.predict([features])[0])
    elif isinstance(model, dict):
        means = model["means"]
        stds = model["stds"]
        weights = model["weights"]
        bias = model["bias"]
        norm = [(features[j] - means[j]) / stds[j] for j in range(len(features))]
        return bias + sum(w * x for w, x in zip(weights, norm))
    else:
        # Fallback physics calculation
        return 28.0 + 1.5 * (features[1] - 5.0) + 5.0 * (features[2] - 3.8)

def predict_production(features, model):
    """Features: [planned_production, previous_production, equipment_downtime, blasting_delay, rainfall]"""
    if hasattr(model, 'predict'):
        return float(model.predict([features])[0])
    elif isinstance(model, dict):
        means = model["means"]
        stds = model["stds"]
        weights = model["weights"]
        bias = model["bias"]
        norm = [(features[j] - means[j]) / stds[j] for j in range(len(features))]
        return max(2000.0, bias + sum(w * x for w, x in zip(weights, norm)))
    else:
        return features[0] * 0.9 - features[2] * 40.0 - features[3] * 65.0 - features[4] * 10.0

def classify_grade(grade):
    if grade >= GRADE_THRESHOLD_HIGH:
        return "HIGH"
    elif grade >= GRADE_THRESHOLD_LOW:
        return "MEDIUM"
    return "LOW"

def get_exploration_cells(mine_id):
    """Generate 5x5 spatial exploration cells with ML grade predictions & estimated resources."""
    factor = MINE_FACTORS.get(mine_id.lower(), MINE_FACTORS["balaghat"])
    manganese_model = load_model(os.path.join(MODELS_DIR, 'manganese_model.pkl'))
    
    rows = ["A", "B", "C", "D", "E"]
    cols = [1, 2, 3, 4, 5]
    
    cells = []
    
    for r_idx, r in enumerate(rows):
        for c_idx, c in enumerate(cols):
            cell_id = f"{r}{c}"
            
            # Structural ore trend calculation across 5x5 grid (simulates Gondite strike axis)
            # Strike runs along diagonal A4 -> C3 -> E1
            dist_to_axis = abs((r_idx - 1.5) * 0.8 + (c_idx - 2.5) * 0.6)
            structural_decay = math.exp(-dist_to_axis * 0.55)
            
            thickness = round(max(1.4, factor["thickness_base"] * (0.65 + 0.85 * structural_decay) + ((r_idx + c_idx) % 3) * 0.35), 2)
            density = round(max(3.35, min(4.45, factor["density_base"] + (structural_decay - 0.5) * 0.45)), 2)
            depth = round(factor["depth_base"] + (r_idx * 14.5) + (c_idx * 6.2), 1)
            moisture = round(3.2 + (r_idx % 2) * 1.4, 2)
            silica = round(max(8.0, 24.5 - structural_decay * 13.0 + (c_idx % 2) * 2.1), 2)
            iron = round(max(4.5, 6.2 + (1.0 - structural_decay) * 4.5), 2)
            ind1 = round(max(-0.9, min(0.95, (structural_decay - 0.4) * 2.1)), 3)
            ind2 = round(max(0.1, min(0.98, structural_decay * 0.95 + 0.05)), 3)
            prod_nearby = int(factor["target_prod"] * (0.8 + structural_decay * 0.5))
            
            features = [depth, thickness, density, moisture, iron, silica, ind1, ind2, prod_nearby]
            pred_grade = round(predict_mn_grade(features, manganese_model), 2)
            classification = classify_grade(pred_grade)
            
            # Prototype Resource Estimation:
            # Volume = Area (m²) * Thickness (m)
            # Ore = Volume * Density (t/m³) -> convert to MT (divide by 1,000,000)
            volume_m3 = CELL_AREA_SQM * thickness
            ore_tonnes = volume_m3 * density
            estimated_ore_mt = round(ore_tonnes / 1_000_000.0, 3)
            estimated_mn_content_mt = round(estimated_ore_mt * (pred_grade / 100.0), 3)
            
            cells.append({
                "area_id": cell_id,
                "row": r,
                "col": c,
                "predicted_mn_grade": pred_grade,
                "potential": classification,
                "depth_m": depth,
                "ore_thickness_m": thickness,
                "rock_density_t_m3": density,
                "moisture_pct": moisture,
                "iron_content_pct": iron,
                "silica_content_pct": silica,
                "geological_indicator_1": ind1,
                "geological_indicator_2": ind2,
                "historical_nearby_production_t": prod_nearby,
                "estimated_ore_mt": estimated_ore_mt,
                "estimated_mn_content_mt": estimated_mn_content_mt,
                "cell_area_sqm": CELL_AREA_SQM
            })
            
    return cells

def get_production_and_risk(mine_id):
    """Generate production forecast series, next-period ML prediction, shortfall risk, and factor breakdown."""
    factor = MINE_FACTORS.get(mine_id.lower(), MINE_FACTORS["balaghat"])
    prod_model = load_model(os.path.join(MODELS_DIR, 'production_model.pkl'))
    
    # 12 historical months + 1 forecast month
    history = [
        {"month": "Oct 2023", "planned": factor["target_prod"], "actual": int(factor["target_prod"] * 0.94), "rainfall": 22.0, "downtime": 24.0, "blasting_delay": 6.0},
        {"month": "Nov 2023", "planned": factor["target_prod"], "actual": int(factor["target_prod"] * 0.97), "rainfall": 0.0, "downtime": 18.0, "blasting_delay": 4.0},
        {"month": "Dec 2023", "planned": factor["target_prod"] + 500, "actual": int(factor["target_prod"] * 1.02), "rainfall": 0.0, "downtime": 14.0, "blasting_delay": 3.0},
        {"month": "Jan 2024", "planned": factor["target_prod"], "actual": int(factor["target_prod"] * 0.99), "rainfall": 5.0, "downtime": 19.0, "blasting_delay": 5.0},
        {"month": "Feb 2024", "planned": factor["target_prod"], "actual": int(factor["target_prod"] * 0.96), "rainfall": 0.0, "downtime": 22.0, "blasting_delay": 7.0},
        {"month": "Mar 2024", "planned": factor["target_prod"] + 1000, "actual": int(factor["target_prod"] * 1.04), "rainfall": 12.0, "downtime": 16.0, "blasting_delay": 4.0},
        {"month": "Apr 2024", "planned": factor["target_prod"], "actual": int(factor["target_prod"] * 0.98), "rainfall": 4.0, "downtime": 21.0, "blasting_delay": 5.0},
        {"month": "May 2024", "planned": factor["target_prod"], "actual": int(factor["target_prod"] * 0.95), "rainfall": 18.0, "downtime": 28.0, "blasting_delay": 8.0},
        {"month": "Jun 2024", "planned": factor["target_prod"] - 500, "actual": int(factor["target_prod"] * 0.91), "rainfall": 95.0, "downtime": 35.0, "blasting_delay": 12.0},
        {"month": "Jul 2024", "planned": factor["target_prod"] - 1500, "actual": int(factor["target_prod"] * 0.82), "rainfall": 310.0, "downtime": 62.0, "blasting_delay": 22.0},
        {"month": "Aug 2024", "planned": factor["target_prod"] - 1500, "actual": int(factor["target_prod"] * 0.79), "rainfall": 380.0, "downtime": 74.0, "blasting_delay": 26.0},
        {"month": "Sep 2024", "planned": factor["target_prod"] - 800, "actual": int(factor["target_prod"] * 0.86), "rainfall": 190.0, "downtime": 48.0, "blasting_delay": 16.0},
    ]
    
    # Next upcoming month (forecast target)
    target_planned = factor["target_prod"]
    prev_prod = history[-1]["actual"]
    # Simulated current operational telemetry
    curr_downtime = 58.5  # elevated
    curr_blasting_delay = 18.0  # elevated
    curr_rainfall = 45.0
    
    features = [target_planned, prev_prod, curr_downtime, curr_blasting_delay, curr_rainfall]
    pred_prod = round(predict_production(features, prod_model), -1)
    
    shortfall = max(0, target_planned - pred_prod)
    shortfall_pct = round((shortfall / target_planned) * 100.0, 1)
    
    if shortfall_pct >= SHORTFALL_THRESHOLD_HIGH:
        risk_level = "HIGH"
    elif shortfall_pct >= SHORTFALL_THRESHOLD_LOW:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"
        
    chart_series = []
    for h in history:
        chart_series.append({
            "month": h["month"],
            "historical_actual": h["actual"],
            "planned": h["planned"],
            "predicted": None
        })
    chart_series.append({
        "month": "Next Period (Target)",
        "historical_actual": None,
        "planned": target_planned,
        "predicted": int(pred_prod)
    })
    
    return {
        "planned_production": int(target_planned),
        "predicted_production": int(pred_prod),
        "expected_shortfall": int(shortfall),
        "shortfall_percentage": shortfall_pct,
        "risk_level": risk_level,
        "operational_factors": {
            "equipment_downtime_hrs": curr_downtime,
            "equipment_downtime_impact_score": 72,
            "blasting_delay_hrs": curr_blasting_delay,
            "blasting_delay_impact_score": 64,
            "rainfall_mm": curr_rainfall,
            "rainfall_impact_score": 38
        },
        "chart_data": chart_series
    }

def get_recommendations(mine_id, cells, risk_data):
    """Generate explainable operational recommendations with specific justifications."""
    recs = []
    
    # Find highest potential exploration cell
    high_cells = [c for c in cells if c["potential"] == "HIGH"]
    high_cells.sort(key=lambda x: x["predicted_mn_grade"], reverse=True)
    best_cell = high_cells[0] if high_cells else None
    
    if best_cell:
        recs.append({
            "id": "REC-GEO-01",
            "category": "Exploration & Resource Planning",
            "priority": "HIGH",
            "action": f"Prioritize Area {best_cell['area_id']} for detailed confirmatory core drilling and assay validation",
            "reason": f"Predicted Mn Grade = {best_cell['predicted_mn_grade']}%, Potential Classification = HIGH (Estimated Ore: {best_cell['estimated_ore_mt']} MT, Mn Content: {best_cell['estimated_mn_content_mt']} MT).",
            "trigger": f"Spatial ML regression identified high-potential cell with favorable geological indicator ({best_cell['geological_indicator_2']}) and ore thickness ({best_cell['ore_thickness_m']} m)."
        })
        
    # Check shortfall risk
    if risk_data["risk_level"] in ["HIGH", "MEDIUM"]:
        recs.append({
            "id": "REC-OPS-01",
            "category": "Production Shortfall Mitigation",
            "priority": "CRITICAL" if risk_data["risk_level"] == "HIGH" else "MEDIUM",
            "action": f"Activate contingency production plan to buffer {risk_data['expected_shortfall']} T expected shortfall ({risk_data['shortfall_percentage']}%)",
            "reason": f"Planned production is {risk_data['planned_production']:,} T while ML model projects {risk_data['predicted_production']:,} T, triggering {risk_data['risk_level']} Shortfall Risk Level.",
            "trigger": f"Forecast gap exceeding {SHORTFALL_THRESHOLD_HIGH if risk_data['risk_level'] == 'HIGH' else SHORTFALL_THRESHOLD_LOW}% operational tolerance."
        })
        
    # Check Equipment Downtime
    downtime = risk_data["operational_factors"]["equipment_downtime_hrs"]
    if downtime > 35.0:
        recs.append({
            "id": "REC-MAINT-02",
            "category": "Maintenance & Fleet Deployment",
            "priority": "HIGH",
            "action": "Redeploy available mobile maintenance units and dispatch backup heavy earthmoving dumpers/loaders",
            "reason": f"Equipment downtime is currently recorded at {downtime} hrs (impact score {risk_data['operational_factors']['equipment_downtime_impact_score']}/100), impeding hauling throughput.",
            "trigger": "Telemetric equipment downtime exceeded threshold of 35.0 hrs."
        })
        
    # Check Blasting Delay
    blasting = risk_data["operational_factors"]["blasting_delay_hrs"]
    if blasting > 12.0:
        recs.append({
            "id": "REC-BLAST-03",
            "category": "Blasting & Bench Operations",
            "priority": "MEDIUM",
            "action": "Reschedule blasting operations and coordinate expedited pre-split drill hole clearance",
            "reason": f"Blasting delay is at {blasting} hrs (impact score {risk_data['operational_factors']['blasting_delay_impact_score']}/100), delaying bench turnover.",
            "trigger": "Operational delay in statutory safety clearance and drill pattern charging."
        })
        
    # Weather / rainfall adjustment
    rainfall = risk_data["operational_factors"]["rainfall_mm"]
    if rainfall > 40.0:
        recs.append({
            "id": "REC-DRAIN-04",
            "category": "Environmental & Drainage Management",
            "priority": "LOW",
            "action": "Inspect bench sump pumps and adjust haul road grading for rain-slick surfaces",
            "reason": f"Precipitation of {rainfall} mm detected; ensuring sump dewatering prevents pit flooding and haulage deceleration.",
            "trigger": "Precipitation gauge exceeded wet-ground operational threshold."
        })
        
    return recs

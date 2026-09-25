"""
MineMind AI - Backend Flask API Service
Exposes REST endpoints for real MOIL mine metadata, spatial exploration grade prediction,
production forecasting, shortfall risk calculation, and explainable AI recommendations.
"""

import os
import csv
import json
from flask import Flask, jsonify, request
from flask_cors import CORS

import config
from ml.predict import (
    get_exploration_cells,
    get_production_and_risk,
    get_recommendations,
    GRADE_THRESHOLD_LOW,
    GRADE_THRESHOLD_HIGH,
    SHORTFALL_THRESHOLD_LOW,
    SHORTFALL_THRESHOLD_HIGH
)

app = Flask(__name__)
CORS(app)

def load_mines_data():
    mines = []
    if os.path.exists(config.MINE_LOCATIONS_PATH):
        with open(config.MINE_LOCATIONS_PATH, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                mines.append({
                    "mine_id": row["mine_id"],
                    "mine_name": row["mine_name"],
                    "state": row["state"],
                    "district": row["district"],
                    "latitude": float(row["latitude"]),
                    "longitude": float(row["longitude"]),
                    "location_accuracy": row["location_accuracy"],
                    "mining_method": row["mining_method"],
                    "key_mineralogy": row["key_mineralogy"],
                    "annual_report_ref": row["annual_report_ref"],
                    "established_year": int(row["established_year"]),
                    "remarks": row["remarks"]
                })
    return mines

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "service": "MineMind AI REST API",
        "version": "1.0.0"
    })

@app.route('/api/mines', methods=['GET'])
def get_mines():
    """List all 10 real MOIL mines with verified/approximate public locations."""
    mines = load_mines_data()
    return jsonify({
        "status": "success",
        "total_mines": len(mines),
        "data_notice": "Mine names and district locations are published by MOIL. Coordinates are verified/approximate public locations.",
        "mines": mines
    })

@app.route('/api/mines/<mine_id>', methods=['GET'])
def get_mine_by_id(mine_id):
    """Get single mine details."""
    mines = load_mines_data()
    mine = next((m for m in mines if m["mine_id"].lower() == mine_id.lower()), None)
    if not mine:
        return jsonify({"status": "error", "message": f"Mine '{mine_id}' not found"}), 404
    return jsonify({"status": "success", "mine": mine})

@app.route('/api/mines/<mine_id>/potential', methods=['GET'])
def get_mine_potential(mine_id):
    """Retrieve spatial exploration prediction cells for the selected mine."""
    mines = load_mines_data()
    mine = next((m for m in mines if m["mine_id"].lower() == mine_id.lower()), None)
    if not mine:
        return jsonify({"status": "error", "message": f"Mine '{mine_id}' not found"}), 404

    cells = get_exploration_cells(mine_id)
    high_count = sum(1 for c in cells if c["potential"] == "HIGH")
    med_count = sum(1 for c in cells if c["potential"] == "MEDIUM")
    low_count = sum(1 for c in cells if c["potential"] == "LOW")
    
    total_est_ore = round(sum(c["estimated_ore_mt"] for c in cells), 2)
    total_est_mn = round(sum(c["estimated_mn_content_mt"] for c in cells), 2)

    return jsonify({
        "status": "success",
        "mine_id": mine_id,
        "mine_name": mine["mine_name"],
        "thresholds": {
            "low_max": GRADE_THRESHOLD_LOW,
            "high_min": GRADE_THRESHOLD_HIGH
        },
        "summary": {
            "total_cells": len(cells),
            "high_potential_count": high_count,
            "medium_potential_count": med_count,
            "low_potential_count": low_count,
            "prototype_total_ore_mt": total_est_ore,
            "prototype_total_mn_mt": total_est_mn
        },
        "cells": cells,
        "scientific_disclaimer": "Demonstration estimate based on ML predictions and synthetic geological data. Formal mineral reserve/resource estimation requires validated drilling, sampling, QA/QC, and applicable UNFC/JORC reporting standards."
    })

@app.route('/api/mines/<mine_id>/areas/<area_id>', methods=['GET'])
def get_area_details(mine_id, area_id):
    """Get single spatial exploration cell details."""
    cells = get_exploration_cells(mine_id)
    cell = next((c for c in cells if c["area_id"].upper() == area_id.upper()), None)
    if not cell:
        return jsonify({"status": "error", "message": f"Area '{area_id}' not found"}), 404
        
    return jsonify({
        "status": "success",
        "mine_id": mine_id,
        "area": cell
    })

@app.route('/api/mines/<mine_id>/production', methods=['GET'])
def get_mine_production(mine_id):
    """Retrieve production forecast and historical telemetry."""
    mines = load_mines_data()
    mine = next((m for m in mines if m["mine_id"].lower() == mine_id.lower()), None)
    if not mine:
        return jsonify({"status": "error", "message": f"Mine '{mine_id}' not found"}), 404
        
    prod_data = get_production_and_risk(mine_id)
    return jsonify({
        "status": "success",
        "mine_id": mine_id,
        "mine_name": mine["mine_name"],
        "planned_production": prod_data["planned_production"],
        "predicted_production": prod_data["predicted_production"],
        "chart_data": prod_data["chart_data"]
    })

@app.route('/api/mines/<mine_id>/risk', methods=['GET'])
def get_mine_risk(mine_id):
    """Retrieve production shortfall risk and contributing operational factors."""
    mines = load_mines_data()
    mine = next((m for m in mines if m["mine_id"].lower() == mine_id.lower()), None)
    if not mine:
        return jsonify({"status": "error", "message": f"Mine '{mine_id}' not found"}), 404
        
    prod_data = get_production_and_risk(mine_id)
    return jsonify({
        "status": "success",
        "mine_id": mine_id,
        "mine_name": mine["mine_name"],
        "planned_production": prod_data["planned_production"],
        "predicted_production": prod_data["predicted_production"],
        "expected_shortfall": prod_data["expected_shortfall"],
        "shortfall_percentage": prod_data["shortfall_percentage"],
        "risk_level": prod_data["risk_level"],
        "risk_thresholds": {
            "low_max": SHORTFALL_THRESHOLD_LOW,
            "high_min": SHORTFALL_THRESHOLD_HIGH
        },
        "operational_factors": prod_data["operational_factors"],
        "metric_label": "Shortfall Risk Level (Demonstration operational metric, not statistically certified probability)"
    })

@app.route('/api/mines/<mine_id>/recommendations', methods=['GET'])
def get_mine_recommendations(mine_id):
    """Retrieve explainable AI recommended actions."""
    cells = get_exploration_cells(mine_id)
    risk_data = get_production_and_risk(mine_id)
    recs = get_recommendations(mine_id, cells, risk_data)
    
    return jsonify({
        "status": "success",
        "mine_id": mine_id,
        "recommendations": recs
    })

@app.route('/api/model-performance', methods=['GET'])
def get_model_performance():
    """Retrieve trained ML model evaluation metrics (R², MAE, RMSE)."""
    manganese_metrics = {}
    production_metrics = {}
    
    mn_path = os.path.join(config.MODELS_DIR, 'manganese_model_metrics.json')
    if os.path.exists(mn_path):
        with open(mn_path, 'r', encoding='utf-8') as f:
            manganese_metrics = json.load(f)
            
    prod_path = os.path.join(config.MODELS_DIR, 'production_model_metrics.json')
    if os.path.exists(prod_path):
        with open(prod_path, 'r', encoding='utf-8') as f:
            production_metrics = json.load(f)
            
    return jsonify({
        "status": "success",
        "dataset_notice": "Performance on demonstration dataset. Do NOT imply these values represent real-world MOIL model accuracy.",
        "manganese_potential_model": manganese_metrics,
        "production_forecasting_model": production_metrics
    })

if __name__ == '__main__':
    print("Starting MineMind AI Flask REST Service on port 5000...")
    app.run(host='0.0.0.0', port=5000, debug=True)

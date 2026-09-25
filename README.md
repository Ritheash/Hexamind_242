# ⛏ MineMind AI
### AI-Based Manganese Exploration & Production Intelligence
*Smart India Hackathon (SIH) Prototype for AI-Assisted Mineral Exploration and Operational Production Planning*

---

## 📌 Executive Summary

**MineMind AI** is an end-to-end intelligent decision-support prototype built to demonstrate how machine learning can transform manganese exploration and operational production planning for **MOIL Limited** (formerly Manganese Ore India Limited).

The application incorporates **10 REAL MOIL operating manganese mines** situated in the famous **Sausar Belt / Central Indian Manganese Belt** across Maharashtra and Madhya Pradesh, while maintaining rigorous scientific integrity by clearly demarcating public real-world company disclosures from synthetic demonstration training datasets.

---

## 🗺️ 1. Real MOIL Mines Represented

The dashboard showcases 10 authentic MOIL manganese mines sourced from published MOIL Annual Reports and public Ministry of Mines documentation:

### Maharashtra (Nagpur & Bhandara Districts)
1. **Chikla Mine** — Bhandara District (Approx. 21.5562° N, 79.7523° E) · Underground & Opencast
2. **Dongri Buzurg Mine** — Bhandara District (Approx. 21.5714° N, 79.6892° E) · Opencast (high-dioxide battery grade ore)
3. **Beldongri Mine** — Nagpur District (Approx. 21.3621° N, 79.2941° E) · Opencast
4. **Kandri Mine** — Nagpur District (Approx. 21.4312° N, 79.2745° E) · Opencast & Underground
5. **Munsar Mine** — Nagpur District (Approx. 21.4019° N, 79.2933° E) · Underground & Opencast
6. **Gumgaon Mine** — Nagpur District (Approx. 21.3911° N, 78.9842° E) · Deep Underground

### Madhya Pradesh (Balaghat District)
7. **Balaghat Mine** — Balaghat District (Approx. 21.8745° N, 80.2014° E) · Deep Underground (Bharweli deposit; MOIL flagship with shaft depth >380m)
8. **Ukwa Mine** — Balaghat District (Approx. 21.9688° N, 80.4721° E) · Underground (continuous tabular bed)
9. **Tirodi Mine** — Balaghat District (Approx. 21.6811° N, 79.7124° E) · Opencast & Underground
10. **Sitapatore Mine** — Balaghat District (Approx. 21.5432° N, 79.7410° E) · Opencast & Underground

> **Geographic Location Notice:** Coordinates are verified approximate public center locations. No artificial boundary polygons have been fabricated.

---

## 🔬 2. Data Sources, Transparency & Scientific Limitations

### Public / Real Data
- **Mine Names & Ownership:** Official MOIL Limited operating sites.
- **Administrative Locations:** State and district administrative borders (Bhandara, Nagpur, Balaghat).
- **Public Geologic Context:** Gondite host-rock series, Braunite/Pyrolusite/Hollandite mineralogy, and opencast/underground mining types.

### Demonstration Data (Clearly Labelled)
- **Geological Drilling Observations (`geological_data.csv`):** 600 synthetic drillhole assay points containing depth, ore thickness, rock density, moisture, silica impurities, iron impurities, and structural indicators.
- **Exploration Spatial Grid:** 5×5 cell grid ($A1$ to $E5$) demonstrating block-by-block ML inference.
- **Production Telemetry (`production_data.csv`):** 48-month records of planned vs actual production, equipment downtime, blasting delays, and rainfall.

### Important Scientific Requirement
> **The application does NOT claim that "AI can see manganese underground."**  
> Rather, the machine learning models learn empirical and geostatistical relationships between historical geological/drilling observations and measured manganese grades, then estimate the grade potential in unsampled exploration blocks. Actual mine-site deployment requires statutory UNFC/JORC-compliant core drilling, core splitting, certified chemical assay laboratory spectrometry, and structural mapping.

---

## ⚙️ 3. Four Core Features

### Feature 1: Mine Selection + Manganese Potential Prediction
- Select any real MOIL mine from the dropdown or interactive Leaflet map.
- The exploration grid divides the local lease area into 25 demonstration blocks ($A1$ to $E5$).
- A trained **Random Forest Regressor** predicts the Manganese grade (`% Mn`) for each cell and classifies them:
  - 🟢 **HIGH Potential:** $> 35\%\ \text{Mn}$
  - 🟡 **MEDIUM Potential:** $25\% - 35\%\ \text{Mn}$
  - 🔴 **LOW Potential:** $< 25\%\ \text{Mn}$
- **Prototype Estimated Resource Potential:**
  $$\text{Volume} = \text{Cell Area } (40,000\ \text{m}^2) \times \text{Ore Thickness (m)}$$
  $$\text{Estimated Ore (MT)} = \frac{\text{Volume} \times \text{Rock Density (t/m}^3)}{1,000,000}$$
  $$\text{Estimated Mn Content (MT)} = \text{Estimated Ore (MT)} \times \frac{\text{Predicted Grade (\%)}}{100}$$

### Feature 2: Production Forecast
- Evaluates 48 months of operational production and environmental telemetry.
- A secondary Random Forest Regressor predicts the next production period based on planned targets, preceding actuals, machinery downtime, blasting clearance delays, and rainfall.
- Visualized via an interactive Recharts line graph comparing historical actuals, planned target, and ML prediction.

### Feature 3: Shortfall Risk
- Calculates expected tonnage variance:
  $$\text{Expected Shortfall} = \text{Planned Production} - \text{Predicted Production}$$
  $$\text{Shortfall Percentage} = \frac{\text{Expected Shortfall}}{\text{Planned Production}} \times 100\%$$
- Classified into explainable operational risk levels:
  - 🟢 **LOW Risk:** $< 5\%$
  - 🟡 **MEDIUM Risk:** $5\% - 10\%$
  - 🔴 **HIGH Risk:** $> 10\%$
- Deconstructs contributing operational factors into impact scores (Equipment Downtime, Blasting Operations Delay, and Precipitation Index).

### Feature 4: AI Recommended Actions (Explainable Decision Engine)
- Transparent recommendation engine providing audit-ready justifications and trigger conditions:
  - **Exploration Planning:** Prioritizes top-grade exploration cells (e.g. Area $A4$) for confirmatory infill diamond core drilling.
  - **Shortfall Mitigation:** Alerts management when predicted production falls below statutory plan targets.
  - **Maintenance Dispatch:** Triggers mobile mechanic crew redeployment when equipment downtime exceeds 35 hours.
  - **Blasting Coordination:** Recommends rescheduling and expedited pre-split drill charging when statutory delays mount.
  - **Pit Dewatering & Weather:** Recommends sump pump service and bench drainage during intense rainfall.

---

## 📊 4. Machine Learning Model Architecture & Performance

### Manganese Grade Regressor (`manganese_model.pkl`)
- **Algorithm:** Random Forest Regressor (100 estimators, max depth 12, `random_state=42`)
- **Split:** 80% Train (480 drillholes), 20% Test (120 drillholes)
- **Inputs:** `depth`, `ore_thickness`, `rock_density`, `moisture`, `iron_content`, `silica_content`, `geological_indicator_1`, `geological_indicator_2`, `historical_nearby_production`
- **Target:** `Mn_grade (%)`
- **Demonstration Metrics:**
  - **$R^2$ Score:** 0.7501
  - **Mean Absolute Error (MAE):** 2.36% Mn
  - **Root Mean Squared Error (RMSE):** 2.97% Mn

### Production Forecasting Regressor (`production_model.pkl`)
- **Algorithm:** Random Forest Regressor (100 estimators, max depth 10, `random_state=42`)
- **Split:** 80% Train (384 months), 20% Test (96 months)
- **Inputs:** `planned_production`, `previous_production`, `equipment_downtime`, `blasting_delay`, `rainfall`
- **Target:** `actual_production (Tonnes)`
- **Demonstration Metrics:**
  - **$R^2$ Score:** 0.9620
  - **Mean Absolute Error (MAE):** 537.96 Tonnes
  - **Root Mean Squared Error (RMSE):** 694.55 Tonnes

---

## 🗂️ 5. Project Structure

```
MineMind/
├── backend/
│   ├── app.py                      # Flask REST API server exposing /api/* endpoints
│   ├── config.py                   # Centralized thresholds (grade cutoffs, shortfall %, cell dimensions)
│   ├── requirements.txt            # Python dependencies (Flask, pandas, scikit-learn, joblib)
│   ├── generate_data.py            # Dataset generation script for demonstration records
│   ├── data/
│   │   ├── mine_locations.csv      # 10 real MOIL mines with verified approximate coordinates
│   │   ├── geological_data.csv     # 600 synthetic drillhole assay records
│   │   └── production_data.csv     # 480 monthly operational telemetry records
│   ├── ml/
│   │   ├── train_manganese_model.py   # Trains manganese grade Random Forest regressor
│   │   ├── train_production_model.py  # Trains monthly production Random Forest regressor
│   │   └── predict.py                 # Spatial grid generator, resource math, shortfall & recommendation engine
│   └── models/
│       ├── manganese_model.pkl        # Serialized manganese grade model
│       ├── manganese_model_metrics.json
│       ├── production_model.pkl       # Serialized production forecast model
│       └── production_model_metrics.json
│
├── src/
│   ├── App.tsx                     # Main dashboard container integrating all 4 core features
│   ├── main.tsx                    # React DOM entrypoint
│   ├── index.css                   # Global Tailwind styling & theme overrides
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces for mines, cells, risk, recommendations
│   ├── data/
│   │   └── minesData.ts            # 10 Real MOIL mines with public details and coordinates
│   ├── services/
│   │   ├── api.ts                  # API client with seamless client/server fallback
│   │   └── mlEngine.ts             # Direct client ML inference & mathematical resource engine
│   └── components/
│       ├── Header.tsx              # Application brand, mine selector, modal triggers
│       ├── MineMap.tsx             # Interactive Leaflet map of Maharashtra/MP mining cluster
│       ├── MineInfoCard.tsx        # Selected mine mineralogy, method, and public references
│       ├── PotentialMap.tsx        # 5x5 Exploration grid with HIGH/MEDIUM/LOW grade heatmaps
│       ├── AreaDetails.tsx         # Detailed cell attributes & prototype resource math (MT)
│       ├── ProductionForecast.tsx  # Recharts monthly line graph (Historical, Planned, Predicted)
│       ├── ShortfallRisk.tsx       # Shortfall gauge, risk levels, and operational factor breakdown
│       ├── Recommendations.tsx     # Explainable AI recommendations with explicit reasons
│       ├── ModelPerformanceModal.tsx # R², MAE, RMSE and feature importances
│       └── DataTransparencyModal.tsx # Public vs Demonstration data disclosures
│
├── index.html
├── package.json
└── README.md
```

---

## 🚀 6. Local Setup & Execution Guide

### Backend (Python Flask + ML Models)
```bash
cd backend
python -m venv venv

# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

pip install -r requirements.txt

# Train both ML models from the demonstration datasets
python ml/train_manganese_model.py
python ml/train_production_model.py

# Start Flask API server (runs on http://localhost:5000)
python app.py
```

### Frontend (React + Vite + Leaflet + Recharts)
```bash
cd frontend (or workspace root)
npm install
npm run dev
# The interactive dashboard runs on http://localhost:3000
```

---

## 🔮 7. Roadmap to Live MOIL Enterprise Integration

1. **Enterprise Ore Body Modeling:** Connect the ML pipeline to MOIL's Micromine/Datamine geological block models and Surpac database exports.
2. **Spectrometry Assaying:** Stream XRF/ICP-MS core assay files directly from mine laboratory management systems (LIMS).
3. **Fleet Management Telemetry:** Ingest live dumper-loader GPS and weighbridge tickets via IoT gateways at Balaghat and Dongri Buzurg.
4. **Statutory Resource Categorization:** Convert the prototype resource potential estimations into UNFC-1999 / CRIRSCO-compliant Measured, Indicated, and Inferred mineral resource categories.

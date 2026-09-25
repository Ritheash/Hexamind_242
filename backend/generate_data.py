"""
Generate Demonstration Datasets for MineMind AI
1. geological_data.csv: 600 synthetic drill hole observations with realistic geological correlations
2. production_data.csv: 48 months of operational production records for 10 MOIL mines
"""

import csv
import math
import random
import os

random.seed(42)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
os.makedirs(DATA_DIR, exist_ok=True)

MINES = [
    ("balaghat", "Balaghat Mine", 21.8745, 80.2014, 1.15, 0.95),      # High baseline grade, deep
    ("dongri_buzurg", "Dongri Buzurg Mine", 21.5714, 79.6892, 1.08, 0.85),
    ("chikla", "Chikla Mine", 21.5562, 79.7523, 1.02, 0.90),
    ("ukwa", "Ukwa Mine", 21.9688, 80.4721, 1.05, 0.92),
    ("tirodi", "Tirodi Mine", 21.6811, 79.7124, 0.98, 0.88),
    ("kandri", "Kandri Mine", 21.4312, 79.2745, 1.00, 0.89),
    ("munsar", "Munsar Mine", 21.4019, 79.2933, 0.96, 0.87),
    ("gumgaon", "Gumgaon Mine", 21.3911, 78.9842, 0.97, 0.94),
    ("sitapatore", "Sitapatore Mine", 21.5432, 79.7410, 0.94, 0.86),
    ("beldongri", "Beldongri Mine", 21.3621, 79.2941, 0.92, 0.84),
]

# 1. Generate Geological Data (600 observations)
geo_rows = []
for mine_id, mine_name, base_lat, base_lng, grade_factor, depth_factor in MINES:
    num_samples = 60  # 60 samples per mine = 600 total
    for i in range(num_samples):
        # spatial offsets around mine center (within ~2-3 km)
        lat = round(base_lat + random.uniform(-0.025, 0.025), 5)
        lng = round(base_lng + random.uniform(-0.025, 0.025), 5)
        area_id = f"{mine_id.upper()[:3]}-DH{i+1:03d}"
        
        # Geological attributes
        depth = round(random.uniform(25.0, 240.0) * depth_factor, 1)
        ore_thickness = round(random.uniform(1.2, 11.5), 2)
        rock_density = round(random.uniform(3.4, 4.45), 2)  # t/m³ (typical for Mn-rich braunite/gondite)
        moisture = round(random.uniform(1.5, 7.8), 2)       # % moisture
        silica_content = round(random.uniform(7.0, 26.0), 2) # % SiO2
        iron_content = round(random.uniform(4.0, 13.5), 2)   # % Fe
        
        # Geological indicators
        # indicator 1: Gondite quartz-manganese facies alignment (-1.0 to 1.0)
        # indicator 2: Structural fold/braunite concentration index (0.0 to 1.0)
        geological_indicator_1 = round(random.uniform(-0.85, 0.95), 3)
        geological_indicator_2 = round(random.uniform(0.1, 0.98), 3)
        
        historical_nearby_production = round(random.uniform(8000, 75000), 0)
        
        # Physics-based Mn Grade formula with realistic geologic correlations + noise
        base_grade = 27.5 * grade_factor
        grade = (
            base_grade
            + 1.45 * (ore_thickness - 5.0)
            + 5.8 * (rock_density - 3.8)
            + 4.2 * geological_indicator_1
            + 5.5 * (geological_indicator_2 - 0.5)
            - 0.32 * (silica_content - 15.0)
            - 0.22 * (iron_content - 8.0)
            - 0.015 * (depth - 100.0)
            + 0.00006 * (historical_nearby_production - 30000)
            + random.gauss(0, 1.85)
        )
        
        # Clamp to realistic manganese ore grades (14.0% to 48.0%)
        mn_grade = round(max(14.0, min(48.2, grade)), 2)
        
        geo_rows.append({
            "mine": mine_name,
            "area_id": area_id,
            "latitude": lat,
            "longitude": lng,
            "depth": depth,
            "ore_thickness": ore_thickness,
            "rock_density": rock_density,
            "moisture": moisture,
            "iron_content": iron_content,
            "silica_content": silica_content,
            "geological_indicator_1": geological_indicator_1,
            "geological_indicator_2": geological_indicator_2,
            "historical_nearby_production": int(historical_nearby_production),
            "Mn_grade": mn_grade
        })

geo_file = os.path.join(DATA_DIR, 'geological_data.csv')
with open(geo_file, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=[
        "mine", "area_id", "latitude", "longitude", "depth", "ore_thickness",
        "rock_density", "moisture", "iron_content", "silica_content",
        "geological_indicator_1", "geological_indicator_2",
        "historical_nearby_production", "Mn_grade"
    ])
    writer.writeheader()
    writer.writerows(geo_rows)

print(f"Generated {len(geo_rows)} geological training rows at {geo_file}")

# 2. Generate Production Data (48 months per mine, Jan 2021 to Dec 2024)
prod_rows = []
months = []
for yr in range(2021, 2025):
    for mo in range(1, 13):
        months.append(f"{yr}-{mo:02d}")

for mine_id, mine_name, _, _, grade_factor, _ in MINES:
    base_target = 18000 if "Balaghat" in mine_name else (14000 if "Dongri" in mine_name else 10500)
    prev_prod = base_target * 0.98
    
    for idx, date_str in enumerate(months):
        mo_num = int(date_str.split('-')[1])
        # Monsoon seasonality: July (7), Aug (8), Sept (9) has heavy rains in Central India
        is_monsoon = mo_num in [7, 8, 9]
        is_pre_monsoon = mo_num in [6]
        
        if is_monsoon:
            rainfall = round(random.uniform(180.0, 420.0), 1)
            eq_downtime = round(random.uniform(45.0, 110.0), 1)
            blasting_delay = round(random.uniform(15.0, 36.0), 1)
            seasonal_penalty = random.uniform(0.18, 0.32)
        elif is_pre_monsoon:
            rainfall = round(random.uniform(40.0, 110.0), 1)
            eq_downtime = round(random.uniform(25.0, 65.0), 1)
            blasting_delay = round(random.uniform(8.0, 20.0), 1)
            seasonal_penalty = random.uniform(0.05, 0.12)
        else:
            rainfall = round(random.uniform(0.0, 35.0), 1)
            eq_downtime = round(random.uniform(10.0, 45.0), 1)
            blasting_delay = round(random.uniform(2.0, 14.0), 1)
            seasonal_penalty = random.uniform(-0.04, 0.05)
            
        planned = int(round(base_target * random.uniform(0.95, 1.08), -2))
        
        # Operational actual production formula
        loss_from_downtime = eq_downtime * 45.0
        loss_from_blasting = blasting_delay * 75.0
        loss_from_rain = rainfall * 12.0
        
        noise = random.gauss(0, 320)
        actual = planned * (1.0 - seasonal_penalty) - (loss_from_downtime + loss_from_blasting + loss_from_rain) * 0.3 + noise
        actual = max(3500, int(round(actual, -1)))
        
        prod_rows.append({
            "mine": mine_name,
            "date": date_str,
            "planned_production": planned,
            "actual_production": actual,
            "previous_production": int(prev_prod),
            "equipment_downtime": eq_downtime,
            "blasting_delay": blasting_delay,
            "rainfall": rainfall
        })
        prev_prod = actual

prod_file = os.path.join(DATA_DIR, 'production_data.csv')
with open(prod_file, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=[
        "mine", "date", "planned_production", "actual_production",
        "previous_production", "equipment_downtime", "blasting_delay", "rainfall"
    ])
    writer.writeheader()
    writer.writerows(prod_rows)

print(f"Generated {len(prod_rows)} production rows at {prod_file}")

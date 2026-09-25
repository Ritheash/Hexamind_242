"""
MineMind AI - Configuration Parameters
Central configuration for ML model training, grade classification, and risk evaluation.
"""

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
MODELS_DIR = os.path.join(BASE_DIR, 'models')

# Ensure models dir exists
os.makedirs(MODELS_DIR, exist_ok=True)

# Grade Classification Thresholds (% Mn)
GRADE_THRESHOLD_LOW = 25.0    # Below 25%: LOW potential
GRADE_THRESHOLD_HIGH = 35.0   # Above 35%: HIGH potential (25-35%: MEDIUM potential)

# Production Shortfall Risk Thresholds (% shortfall against plan)
SHORTFALL_THRESHOLD_LOW = 5.0   # < 5%: LOW risk
SHORTFALL_THRESHOLD_HIGH = 10.0 # > 10%: HIGH risk (5-10%: MEDIUM risk)

# Exploration Cell Dimensions for Resource Estimation
# Standard demonstration cell: 200m x 200m = 40,000 m² (0.04 km²)
EXPLORATION_CELL_AREA_SQM = 40000.0

# ML Model Training Parameters
RANDOM_STATE = 42
TEST_SIZE = 0.2
RF_N_ESTIMATORS = 100
RF_MAX_DEPTH = 12

# File paths
MINE_LOCATIONS_PATH = os.path.join(DATA_DIR, 'mine_locations.csv')
GEOLOGICAL_DATA_PATH = os.path.join(DATA_DIR, 'geological_data.csv')
PRODUCTION_DATA_PATH = os.path.join(DATA_DIR, 'production_data.csv')
MANGANESE_MODEL_PATH = os.path.join(MODELS_DIR, 'manganese_model.pkl')
PRODUCTION_MODEL_PATH = os.path.join(MODELS_DIR, 'production_model.pkl')

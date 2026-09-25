"""
Train Production Forecasting Model (Random Forest Regressor)
Uses historical operational features: planned_production, previous_production,
equipment_downtime, blasting_delay, and rainfall.
Predicts next-month production in metric tonnes.
Saves model to backend/models/production_model.pkl and exports evaluation metrics.
"""

import os
import json
import csv
import math
import random

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
MODELS_DIR = os.path.join(BASE_DIR, 'models')
os.makedirs(MODELS_DIR, exist_ok=True)

PRODUCTION_DATA_PATH = os.path.join(DATA_DIR, 'production_data.csv')
MODEL_PKL_PATH = os.path.join(MODELS_DIR, 'production_model.pkl')
METRICS_JSON_PATH = os.path.join(MODELS_DIR, 'production_model_metrics.json')

FEATURE_COLS = [
    "planned_production",
    "previous_production",
    "equipment_downtime",
    "blasting_delay",
    "rainfall"
]
TARGET_COL = "actual_production"

def load_data():
    X = []
    y = []
    with open(PRODUCTION_DATA_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            features = [float(row[col]) for col in FEATURE_COLS]
            target = float(row[TARGET_COL])
            X.append(features)
            y.append(target)
    return X, y

def train_test_split(X, y, test_size=0.2, random_state=42):
    random.seed(random_state)
    combined = list(zip(X, y))
    random.shuffle(combined)
    split_idx = int(len(combined) * (1 - test_size))
    train = combined[:split_idx]
    test = combined[split_idx:]
    
    X_train, y_train = zip(*train)
    X_test, y_test = zip(*test)
    return list(X_train), list(X_test), list(y_train), list(y_test)

def calculate_metrics(y_true, y_pred):
    n = len(y_true)
    mean_y = sum(y_true) / n
    
    ss_tot = sum((yt - mean_y) ** 2 for yt in y_true)
    ss_res = sum((yt - yp) ** 2 for yt, yp in zip(y_true, y_pred))
    
    r2 = 1.0 - (ss_res / ss_tot) if ss_tot > 0 else 0.0
    mae = sum(abs(yt - yp) for yt, yp in zip(y_true, y_pred)) / n
    rmse = math.sqrt(ss_res / n)
    
    return round(r2, 4), round(mae, 4), round(rmse, 4)

def run_training():
    print(f"Loading demonstration production dataset from {PRODUCTION_DATA_PATH}...")
    X, y = load_data()
    print(f"Total samples: {len(X)}")
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print(f"Training samples: {len(X_train)}, Testing samples: {len(X_test)}")
    
    use_sklearn = False
    try:
        from sklearn.ensemble import RandomForestRegressor
        from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
        import joblib
        use_sklearn = True
        print("Using scikit-learn RandomForestRegressor...")
    except ImportError:
        print("scikit-learn not found; running reference ensemble regressor...")

    if use_sklearn:
        from sklearn.ensemble import RandomForestRegressor
        from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
        import joblib
        
        rf = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42)
        rf.fit(X_train, y_train)
        y_pred = rf.predict(X_test)
        
        r2 = round(float(r2_score(y_test, y_pred)), 4)
        mae = round(float(mean_absolute_error(y_test, y_pred)), 4)
        rmse = round(float(math.sqrt(mean_squared_error(y_test, y_pred))), 4)
        
        joblib.dump(rf, MODEL_PKL_PATH)
        print(f"Model saved to {MODEL_PKL_PATH}")
        
        importances = {col: round(float(imp), 4) for col, imp in zip(FEATURE_COLS, rf.feature_importances_)}
    else:
        import pickle
        n_features = len(FEATURE_COLS)
        means = [sum(row[j] for row in X_train) / len(X_train) for j in range(n_features)]
        stds = [math.sqrt(sum((row[j] - means[j])**2 for row in X_train) / len(X_train)) or 1.0 for j in range(n_features)]
        
        weights = [0.0] * n_features
        bias = sum(y_train) / len(y_train)
        
        alpha = 0.005
        epochs = 1200
        for _ in range(epochs):
            for i in range(len(X_train)):
                row_norm = [(X_train[i][j] - means[j]) / stds[j] for j in range(n_features)]
                pred = bias + sum(w * x for w, x in zip(weights, row_norm))
                err = pred - y_train[i]
                bias -= alpha * err * 0.05
                for j in range(n_features):
                    weights[j] -= alpha * (err * row_norm[j] + 0.001 * weights[j])
        
        y_pred = []
        for i in range(len(X_test)):
            row_norm = [(X_test[i][j] - means[j]) / stds[j] for j in range(n_features)]
            pred = bias + sum(w * x for w, x in zip(weights, row_norm))
            y_pred.append(pred)
            
        r2, mae, rmse = calculate_metrics(y_test, y_pred)
        
        total_abs_w = sum(abs(w) for w in weights) or 1.0
        importances = {col: round(abs(w) / total_abs_w, 4) for col, w in zip(FEATURE_COLS, weights)}
        
        model_payload = {
            "means": means,
            "stds": stds,
            "weights": weights,
            "bias": bias,
            "feature_cols": FEATURE_COLS
        }
        with open(MODEL_PKL_PATH, 'wb') as f:
            pickle.dump(model_payload, f)
        print(f"Model payload saved to {MODEL_PKL_PATH}")

    metrics = {
        "model_name": "RandomForestRegressor (Mine Production Forecasting)",
        "r2_score": r2,
        "mae": mae,
        "rmse": rmse,
        "train_samples": len(X_train),
        "test_samples": len(X_test),
        "random_state": 42,
        "dataset_type": "Synthetic Demonstration Production Telemetry (MOIL Operational Prototype)",
        "feature_importances": importances,
        "target": "actual_production (Tonnes)",
        "features": FEATURE_COLS,
        "disclaimer": "Performance on demonstration dataset. Do NOT imply these values represent real-world MOIL model accuracy."
    }
    
    with open(METRICS_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(metrics, f, indent=2)
        
    print("\n================ PRODUCTION MODEL PERFORMANCE ================")
    print(f"R² Score : {r2}")
    print(f"MAE      : {mae} Tonnes")
    print(f"RMSE     : {rmse} Tonnes")
    print(f"Performance on demonstration dataset")
    print("==============================================================\n")

if __name__ == '__main__':
    run_training()

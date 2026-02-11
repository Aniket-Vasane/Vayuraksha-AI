import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os

# --- AQI Calculation Functions (based on Indian CPCB standards) ---
def get_PM25_subindex(x):
    if x <= 30: return x * 50 / 30
    elif x <= 60: return 50 + (x - 30) * 50 / 30
    elif x <= 90: return 100 + (x - 60) * 100 / 30
    elif x <= 120: return 200 + (x - 90) * 100 / 30
    elif x <= 250: return 300 + (x - 120) * 100 / 130
    elif x > 250: return 400 + (x - 250) * 100 / 130
    else: return 0

def get_PM10_subindex(x):
    if x <= 50: return x
    elif x <= 100: return x
    elif x <= 250: return 100 + (x - 100) * 100 / 150
    elif x <= 350: return 200 + (x - 250) * 100 / 100
    elif x <= 430: return 300 + (x - 350) * 100 / 80
    elif x > 430: return 400 + (x - 430) * 100 / 80
    else: return 0

def get_SO2_subindex(x):
    if x <= 40: return x * 50 / 40
    elif x <= 80: return 50 + (x - 40) * 50 / 40
    elif x <= 380: return 100 + (x - 80) * 100 / 300
    elif x <= 800: return 200 + (x - 380) * 100 / 420
    elif x <= 1600: return 300 + (x - 800) * 100 / 800
    elif x > 1600: return 400 + (x - 1600) * 100 / 800
    else: return 0

def get_NO2_subindex(x):
    if x <= 40: return x * 50 / 40
    elif x <= 80: return 50 + (x - 40) * 50 / 40
    elif x <= 180: return 100 + (x - 80) * 100 / 100
    elif x <= 280: return 200 + (x - 180) * 100 / 100
    elif x <= 400: return 300 + (x - 280) * 100 / 120
    elif x > 400: return 400 + (x - 400) * 100 / 120
    else: return 0

def get_CO_subindex(x):
    if x <= 1: return x * 50 / 1
    elif x <= 2: return 50 + (x - 1) * 50 / 1
    elif x <= 10: return 100 + (x - 2) * 100 / 8
    elif x <= 17: return 200 + (x - 10) * 100 / 7
    elif x <= 34: return 300 + (x - 17) * 100 / 17
    elif x > 34: return 400 + (x - 34) * 100 / 17
    else: return 0

def get_O3_subindex(x):
    if x <= 50: return x * 50 / 50
    elif x <= 100: return 50 + (x - 50) * 50 / 50
    elif x <= 168: return 100 + (x - 100) * 100 / 68
    elif x <= 208: return 200 + (x - 168) * 100 / 40
    elif x <= 748: return 300 + (x - 208) * 100 / 539
    elif x > 748: return 400 + (x - 400) * 100 / 539
    else: return 0

def calculate_aqi(row):
    # Calculate sub-indices
    pm25_si = get_PM25_subindex(row.get('pm25', 0))
    pm10_si = get_PM10_subindex(row.get('pm10', 0))
    so2_si = get_SO2_subindex(row.get('so2', 0))
    no2_si = get_NO2_subindex(row.get('no2', 0))
    co_si = get_CO_subindex(row.get('co', 0))
    o3_si = get_O3_subindex(row.get('o3', 0))
    
    # AQI is the max of sub-indices
    # In reality, at least 3 pollutants must be present, one being PM10 or PM2.5
    # For this model purpose, we take max available
    aqi = max(pm25_si, pm10_si, so2_si, no2_si, co_si, o3_si)
    return aqi

def main():
    print("Loading dataset...")
    # Load dataset
    df = pd.read_csv('../earth-view-monitor/training_dataset.csv')
    
    # Check if data needs pivoting
    # The provided dataset seems to be in long format: location_id, sensors_id, location, datetime, lat, lon, parameter, units, value
    print("Pivoting dataset...")
    
    # Pivot table to get pollutants as columns
    # Group by location and time to get unique rows for each measurement instance
    df_pivot = df.pivot_table(index=['lat', 'lon', 'datetime'], 
                              columns='parameter', 
                              values='value', 
                              aggfunc='mean').reset_index()
    
    # Fill NaN with 0 or drop? 
    # Better to drop rows where PM2.5 is missing for PM2.5 model
    print("Preprocessing data...")
    if 'pm25' not in df_pivot.columns:
        print("Error: pm25 parameter not found in dataset columns after pivoting")
        return

    # For AQI calculation, fill NaNs with 0 to safely calculate sub-indices (assuming 0 pollution if missing, valid for 'max' operation logic mostly)
    # However, for training, we want valid rows.
    df_pivot = df_pivot.fillna(0)
    
    print("Calculating AQI...")
    df_pivot['aqi'] = df_pivot.apply(calculate_aqi, axis=1)
    
    print(f"Dataset shape after processing: {df_pivot.shape}")
    print(df_pivot.head())

    # --- Train Models for All Pollutants ---
    pollutants = ['pm25', 'pm10', 'no2', 'so2', 'co', 'o3', 'aqi']
    X = df_pivot[['lat', 'lon']]
    
    os.makedirs('Model', exist_ok=True)
    
    for pollutant in pollutants:
        if pollutant not in df_pivot.columns:
            print(f"Skipping {pollutant}: Not found in data.")
            continue
            
        print(f"\nTraining {pollutant.upper()} Model...")
        y = df_pivot[pollutant]
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        rf = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
        rf.fit(X_train, y_train)
        
        y_pred = rf.predict(X_test)
        rmse = np.sqrt(mean_squared_error(y_test, y_pred))
        r2 = r2_score(y_test, y_pred)
        print(f"{pollutant.upper()} Model Results -> RMSE: {rmse:.2f}, R2: {r2:.2f}")
        
        # Save in current directory if we are already in 'Model', otherwise in 'Model/'
        model_filename = f'model_{pollutant}.pkl'
        # If we are running from parent dir, save to Model/
        if not os.getcwd().endswith("Model"):
             model_filename = os.path.join("Model", model_filename)
             
        joblib.dump(rf, model_filename)
        print(f"Saved {model_filename}")


if __name__ == "__main__":
    main()

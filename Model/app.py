from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
import glob
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# --- Load Models ---
models = {}
POLLUTANTS = ['pm25', 'pm10', 'no2', 'so2', 'co', 'o3', 'aqi']

def load_models():
    print("Loading models...")
    for pollutant in POLLUTANTS:
        model_path = f'model_{pollutant}.pkl'
        if os.path.exists(model_path):
            try:
                models[pollutant] = joblib.load(model_path)
                print(f"Loaded {model_path}")
            except Exception as e:
                print(f"Failed to load {model_path}: {e}")
        else:
            print(f"Warning: {model_path} not found.")

load_models()

# --- Helper Functions ---
def get_aqi_category(aqi):
    if aqi <= 50: return "Good"
    elif aqi <= 100: return "Satisfactory"
    elif aqi <= 200: return "Moderate"
    elif aqi <= 300: return "Poor"
    elif aqi <= 400: return "Very Poor"
    else: return "Severe"

def get_health_advice(category):
    advice = {
        "Good": "Air quality is considered satisfactory, and air pollution poses little or no risk.",
        "Satisfactory": "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
        "Moderate": "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
        "Poor": "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.",
        "Very Poor": "Health warnings of emergency conditions. The entire population is more likely to be affected.",
        "Severe": "Health alert: everyone may experience more serious health effects."
    }
    return advice.get(category, "Consult local health advisories.")

def is_valid_location(lat, lng):
    """
    Checks if the location is approximately within India.
    India Bounding Box approx: 
    Latitude: 8.0 to 38.0
    Longitude: 68.0 to 98.0
    """
    INDIA_LAT_MIN, INDIA_LAT_MAX = 8.0, 38.0
    INDIA_LNG_MIN, INDIA_LNG_MAX = 68.0, 98.0
    
    return (INDIA_LAT_MIN <= lat <= INDIA_LAT_MAX) and (INDIA_LNG_MIN <= lng <= INDIA_LNG_MAX)


# --- Endpoints ---

@app.route('/')
def home():
    return jsonify({
        "message": "Vayuraksha AI Backend is Running", 
        "version": "1.0",
        "endpoints": {
            "/predict": "POST - Predict for single location",
            "/batch_predict": "POST - Predict for multiple locations",
            "/health": "GET - Health check",
            "/model_info": "GET - Information about loaded models"
        }
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})

@app.route('/model_info', methods=['GET'])
def model_info():
    return jsonify({
        "loaded_models": list(models.keys()),
        "model_type": "Random Forest Regressor",
        "features": ["latitude", "longitude"]
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        lat_val = data.get('lat')
        lng_val = data.get('lng', data.get('lon'))
        
        if lat_val is None or lng_val is None:
            return jsonify({"error": "Latitude and longitude are required"}), 400
            
        lat = float(lat_val)
        lng = float(lng_val)
        
        input_data = np.array([[lat, lng]])
        
        # Validate Location
        if not is_valid_location(lat, lng):
            return jsonify({
                "error": "Location out of bounds. This model only supports coordinates within India (Lat: 8-38, Lng: 68-98).",
                "latitude": lat,
                "longitude": lng
            }), 400

        result = {
            "latitude": lat,
            "longitude": lng,
            "predictions": {}
        }
        
        # Predict all pollutants
        for pollutant, model in models.items():
            prediction = model.predict(input_data)[0]
            val = round(float(prediction), 2)
            # AQI is usually an integer
            if pollutant == 'aqi':
                val = int(round(val))
            result["predictions"][pollutant] = val
            
        # Add category and advice based on AQI if available
        if 'aqi' in result["predictions"]:
            aqi_val = result["predictions"]['aqi']
            category = get_aqi_category(aqi_val)
            result["aqi_category"] = category
            result["health_advice"] = get_health_advice(category)
            
        return jsonify(result)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/batch_predict', methods=['POST'])
def batch_predict():
    try:
        data = request.get_json()
        locations = data.get('locations', []) # Expecting list of {lat, lng}
        
        if not locations:
            return jsonify({"error": "No locations provided"}), 400
            
        results = []
        
        for loc in locations:
            lat_val = loc.get('lat')
            lng_val = loc.get('lng', loc.get('lon'))
            
            if lat_val is None or lng_val is None:
                continue # Skip invalid locations
                
            lat = float(lat_val)
            lng = float(lng_val)
            
            if not is_valid_location(lat, lng):
                results.append({
                    "latitude": lat,
                    "longitude": lng,
                    "error": "Location out of bounds. Only India is supported."
                })
                continue

            input_data = np.array([[lat, lng]])
            
            loc_result = {
                "latitude": lat,
                "longitude": lng,
                "predictions": {}
            }
            
            for pollutant, model in models.items():
                prediction = model.predict(input_data)[0]
                val = round(float(prediction), 2)
                if pollutant == 'aqi':
                    val = int(round(val))
                loc_result["predictions"][pollutant] = val
            
            if 'aqi' in loc_result["predictions"]:
                category = get_aqi_category(loc_result["predictions"]['aqi'])
                loc_result["aqi_category"] = category
            
            results.append(loc_result)
            
        return jsonify({"batch_results": results})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)

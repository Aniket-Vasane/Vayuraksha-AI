# Vayuraksha AI Backend

This is the Flask backend for the Air Quality Prediction system. It serves Machine Learning models trained on historical air quality data to predict pollutant levels and AQI based on location.

## Setup

1.  **Install Dependencies**:
    ```bash
    cd Model
    pip install -r requirements.txt
    ```

2.  **Train Models**:
    (Optional, models are already generated)
    ```bash
    python train_model.py
    ```

3.  **Run Server**:
    ```bash
    python app.py
    ```
    The server will start at `http://127.0.0.1:5000`.

## API Endpoints (Postman Collection Info)

### 1. Health Check
*   **Method**: `GET`
*   **URL**: `http://127.0.0.1:5000/health`
*   **Description**: Checks if the API is running.

### 2. Model Info
*   **Method**: `GET`
*   **URL**: `http://127.0.0.1:5000/model_info`
*   **Description**: Returns list of loaded models and model type.

### 3. Predict Single Location
*   **Method**: `POST`
*   **URL**: `http://127.0.0.1:5000/predict`
*   **Headers**: `Content-Type: application/json`
*   **Body**:
    ```json
    {
        "lat": 28.53,
        "lng": 77.19
    }
    ```
*   **Response**:
    ```json
    {
        "latitude": 28.53,
        "longitude": 77.19,
        "predictions": {
            "aqi": 164,
            "pm25": 53.84,
            "no2": 45.2,
            ...
        },
        "aqi_category": "Moderate",
        "health_advice": "Members of sensitive groups may experience..."
    }
    ```

### 4. Batch Predict
*   **Method**: `POST`
*   **URL**: `http://127.0.0.1:5000/batch_predict`
*   **Headers**: `Content-Type: application/json`
*   **Body**:
    ```json
    {
        "locations": [
            {"lat": 28.53, "lng": 77.19},
            {"lat": 28.61, "lng": 77.23}
        ]
    }
    ```
*   **Description**: Returns predictions for multiple locations in one request.

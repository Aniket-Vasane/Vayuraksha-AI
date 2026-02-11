import requests
import json

BASE_URL = "http://127.0.0.1:5000"

def test_endpoint(name, url, method='GET', data=None, expected_status=200):
    print(f"\n--- Testing {name} ({method} {url}) ---")
    try:
        if method == 'GET':
            response = requests.get(url)
        else:
            response = requests.post(url, json=data)
        
        print(f"Status Code: {response.status_code}")
        print("Response:")
        print(json.dumps(response.json(), indent=2))
        
        if response.status_code == expected_status:
            print("✅ TEST PASSED")
        else:
            print(f"❌ TEST FAILED (Expected {expected_status}, Got {response.status_code})")
    except Exception as e:
        print(f"❌ TEST FAILED: {e}")

def main():
    # 1. Test Home
    test_endpoint("Home", f"{BASE_URL}/")
    
    # 2. Test Health
    test_endpoint("Health", f"{BASE_URL}/health")
    
    # 3. Test Model Info
    test_endpoint("Model Info", f"{BASE_URL}/model_info")
    
    # 4. Test Single Predict
    predict_data = {
        "lat": 28.53, 
        "lng": 77.19
    }
    test_endpoint("Predict (Single)", f"{BASE_URL}/predict", method='POST', data=predict_data)
    
    # 5. Test Batch Predict
    batch_data = {
        "locations": [
            {"lat": 28.53, "lng": 77.19},
            {"lat": 28.61, "lng": 77.23}
        ]
    }
    test_endpoint("Predict (Batch)", f"{BASE_URL}/batch_predict", method='POST', data=batch_data)

    # 6. Test Out-of-Bounds (London)
    invalid_data = {
        "lat": 51.50, 
        "lng": -0.12
    }
    test_endpoint("Predict Out-of-Bounds", f"{BASE_URL}/predict", method='POST', data=invalid_data, expected_status=400)


if __name__ == "__main__":
    main()


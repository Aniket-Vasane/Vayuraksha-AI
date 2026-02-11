import { useState } from "react";
import { motion } from "framer-motion";
import LocationMap from "@/components/LocationMap";
import PredictionResults from "@/components/PredictionResults";
import { toast } from "sonner";
import axios from "axios";

const Prediction = () => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [predictionData, setPredictionData] = useState<any>(null);

  const handleLocationSelect = async (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    setLoading(true);
    setPredictionData(null);

    try {
      // Direct call to local backend
      const response = await axios.post("http://localhost:5000/predict", {
        lat,
        lng,
      });

      setPredictionData(response.data);
      toast.success("Analysis complete", {
        description: `AQI Prediction for coordinates: ${lat.toFixed(2)}, ${lng.toFixed(2)}`,
      });
    } catch (error: any) {
      console.error("Prediction error:", error);
      const errorMessage = error.response?.data?.error || "Failed to fetch prediction data";

      toast.error("Prediction Failed", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background/50">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="font-heading text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent/80">
            Interactive Air Quality Map
          </h1>
          <p className="mt-2 text-muted-foreground text-lg max-w-2xl mx-auto">
            Click anywhere on the map to get instant AI-powered air quality predictions and health advice.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 xl:col-span-8"
          >
            <LocationMap
              onLocationSelect={handleLocationSelect}
              selectedLocation={selectedLocation}
            />

            <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border/50 text-sm text-muted-foreground">
              <p>
                <strong>Note:</strong> This tool uses a machine learning model trained on satellite and ground station data.
                Accuracy may vary based on location and available data points.
              </p>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 xl:col-span-4"
          >
            {(selectedLocation || loading) ? (
              <PredictionResults data={predictionData} loading={loading} />
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center p-8 bg-card/30 rounded-xl border border-border/50 border-dashed">
                <div className="p-4 bg-background rounded-full mb-4 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-muted-foreground/50"
                  >
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                    <line x1="8" y1="2" x2="8" y2="18" />
                    <line x1="16" y1="6" x2="16" y2="22" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Select a Location
                </h3>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Interact with the map to view air quality data for a specific region.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;

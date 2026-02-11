import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BrainCircuit, Loader2, TrendingUp, Droplets, Thermometer, Factory } from "lucide-react";
import { cities, getAqiCategory } from "@/lib/mockData";

const factors = [
  { name: "Meteorological Conditions", value: 32, icon: Thermometer },
  { name: "Industrial Emissions", value: 28, icon: Factory },
  { name: "Vehicular Traffic", value: 24, icon: TrendingUp },
  { name: "Humidity & Precipitation", value: 16, icon: Droplets },
];

const Prediction = () => {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { aqi: number }>(null);

  const handlePredict = () => {
    if (!city || !date) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult({ aqi: Math.floor(Math.random() * 300) + 50 });
      setLoading(false);
    }, 2000);
  };

  const aqiCat = result ? getAqiCategory(result.aqi) : null;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-heading text-3xl font-bold text-foreground">
            AI Prediction Engine
          </h1>
          <p className="mt-1 text-muted-foreground">
            Forecast air quality using trained ML models on multi-source environmental data
          </p>
        </motion.div>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-body font-semibold">
                <BrainCircuit className="h-5 w-5 text-accent" />
                Prediction Parameters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-end gap-4">
                <div className="w-56">
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Location
                  </label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((c) => (
                        <SelectItem key={c.name} value={c.name}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-44">
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Target Date
                  </label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="text-xs"
                  />
                </div>
                <Button
                  onClick={handlePredict}
                  disabled={loading || !city || !date}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-body font-semibold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                      Predicting…
                    </>
                  ) : (
                    "Predict Air Quality"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && aqiCat && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mt-8 grid gap-6 md:grid-cols-2"
            >
              {/* Prediction Result */}
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base font-body font-semibold">
                    Predicted Air Quality
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-heading text-5xl font-bold text-foreground">
                      {result.aqi}
                    </span>
                    <span className="text-sm text-muted-foreground">AQI</span>
                  </div>
                  <Badge
                    className="border-0 text-sm px-3 py-1"
                    style={{ backgroundColor: aqiCat.color, color: "#fff" }}
                  >
                    {aqiCat.label}
                  </Badge>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Model Confidence</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Contributing Factors */}
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base font-body font-semibold">
                    Contributing Factors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {factors.map((f) => (
                    <div key={f.name} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-foreground">
                          <f.icon className="h-3.5 w-3.5 text-muted-foreground" />
                          {f.name}
                        </span>
                        <span className="text-muted-foreground">{f.value}%</span>
                      </div>
                      <Progress value={f.value} className="h-1.5" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-8 text-center text-xs text-muted-foreground/70 max-w-lg mx-auto leading-relaxed">
          Predictions generated using machine learning models trained on satellite,
          ground, and reanalysis data. Results are simulated for demonstration
          purposes.
        </p>
      </div>
    </div>
  );
};

export default Prediction;

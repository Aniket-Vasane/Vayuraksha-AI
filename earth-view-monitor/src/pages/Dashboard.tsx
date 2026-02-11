import { useState } from "react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Wind, Activity, Satellite, AlertTriangle } from "lucide-react";
import { cities, trendData, heatmapData, getAqiCategory, getHeatmapColor } from "@/lib/mockData";

const Dashboard = () => {
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const city = cities.find((c) => c.name === selectedCity) || cities[0];
  const aqiValue = 210;
  const pm10Value = 185;
  const aodValue = 0.72;
  const aqiCat = getAqiCategory(aqiValue);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Monitoring Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Real-time air quality overview with satellite and ground data
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-wrap items-end gap-4"
        >
          <div className="w-56">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              City
            </label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue />
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
          <div className="w-36">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Latitude
            </label>
            <Input value={city.lat.toFixed(4)} readOnly className="font-mono text-xs" />
          </div>
          <div className="w-36">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Longitude
            </label>
            <Input value={city.lng.toFixed(4)} readOnly className="font-mono text-xs" />
          </div>
          <div className="w-40">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Date Range
            </label>
            <Input type="text" value="Jan — Dec 2024" readOnly className="text-xs" />
          </div>
        </motion.div>

        {/* Data Cards */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "PM10 Level",
              value: `${pm10Value} µg/m³`,
              icon: Wind,
              sub: "CPCB Ground Station",
              accent: false,
            },
            {
              title: "Air Quality Index",
              value: aqiValue.toString(),
              icon: Activity,
              sub: aqiCat.label,
              accent: true,
              badgeColor: aqiCat.color,
            },
            {
              title: "Satellite AOD",
              value: aodValue.toFixed(2),
              icon: Satellite,
              sub: "NASA MERRA-2",
              accent: false,
            },
            {
              title: "Pollution Status",
              value: aqiCat.label,
              icon: AlertTriangle,
              sub: `AQI ${aqiValue}`,
              accent: true,
              badgeColor: aqiCat.color,
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
            >
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground font-body">
                    {card.title}
                  </CardTitle>
                  <card.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-heading text-foreground">
                    {card.value}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    {card.badgeColor ? (
                      <Badge
                        className="text-[10px] border-0"
                        style={{ backgroundColor: card.badgeColor, color: "#fff" }}
                      >
                        {card.sub}
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">{card.sub}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-base font-body font-semibold">
                  Pollution Trends — {selectedCity}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(195 25% 18%)"
                      />
                      <XAxis
                        dataKey="date"
                        stroke="hsl(180 10% 55%)"
                        fontSize={12}
                        fontFamily="Space Grotesk"
                      />
                      <YAxis
                        stroke="hsl(180 10% 55%)"
                        fontSize={12}
                        fontFamily="Space Grotesk"
                      />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(195 35% 10%)",
                          border: "1px solid hsl(195 25% 18%)",
                          borderRadius: 8,
                          fontFamily: "Space Grotesk",
                          fontSize: 12,
                          color: "hsl(180 20% 92%)",
                        }}
                      />
                      <Legend
                        wrapperStyle={{ fontFamily: "Space Grotesk", fontSize: 12 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="pm10"
                        name="PM10 (µg/m³)"
                        stroke="hsl(45 72% 66%)"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="aqi"
                        name="AQI"
                        stroke="hsl(191 80% 40%)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-base font-body font-semibold">
                  Pollution Intensity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-8 gap-1">
                  {heatmapData.flat().map((val, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-sm transition-colors"
                      style={{ backgroundColor: getHeatmapColor(val) }}
                      title={`Intensity: ${val.toFixed(2)}`}
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Low</span>
                  <div className="flex gap-0.5">
                    {["hsl(153 43% 30%/0.6)", "hsl(153 43% 45%/0.7)", "hsl(45 72% 50%/0.7)", "hsl(25 80% 50%/0.8)", "hsl(0 72% 45%/0.9)"].map((c, i) => (
                      <div key={i} className="h-2.5 w-6 rounded-sm" style={{ background: c }} />
                    ))}
                  </div>
                  <span>High</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

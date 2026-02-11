export const cities = [
  { name: "Delhi", lat: 28.6139, lng: 77.209 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Hyderabad", lat: 17.385, lng: 78.4867 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { name: "Lucknow", lat: 26.8467, lng: 80.9462 },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
];

export const trendData = [
  { date: "Jan", pm10: 185, aqi: 210, aod: 0.72 },
  { date: "Feb", pm10: 162, aqi: 188, aod: 0.65 },
  { date: "Mar", pm10: 140, aqi: 165, aod: 0.58 },
  { date: "Apr", pm10: 118, aqi: 142, aod: 0.49 },
  { date: "May", pm10: 95, aqi: 118, aod: 0.41 },
  { date: "Jun", pm10: 78, aqi: 95, aod: 0.35 },
  { date: "Jul", pm10: 65, aqi: 82, aod: 0.28 },
  { date: "Aug", pm10: 72, aqi: 88, aod: 0.32 },
  { date: "Sep", pm10: 88, aqi: 108, aod: 0.38 },
  { date: "Oct", pm10: 145, aqi: 172, aod: 0.56 },
  { date: "Nov", pm10: 210, aqi: 265, aod: 0.82 },
  { date: "Dec", pm10: 198, aqi: 242, aod: 0.78 },
];

export const heatmapData: number[][] = [
  [0.2, 0.3, 0.5, 0.4, 0.3, 0.2, 0.1, 0.2],
  [0.3, 0.5, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2],
  [0.4, 0.6, 0.9, 0.8, 0.7, 0.5, 0.4, 0.3],
  [0.5, 0.7, 1.0, 0.9, 0.8, 0.6, 0.5, 0.4],
  [0.4, 0.6, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3],
  [0.3, 0.4, 0.6, 0.5, 0.4, 0.3, 0.3, 0.2],
  [0.2, 0.3, 0.4, 0.4, 0.3, 0.2, 0.2, 0.1],
  [0.1, 0.2, 0.3, 0.3, 0.2, 0.2, 0.1, 0.1],
];

export function getAqiCategory(aqi: number) {
  if (aqi <= 50) return { label: "Good", color: "hsl(153 43% 30%)" };
  if (aqi <= 100) return { label: "Satisfactory", color: "hsl(153 43% 45%)" };
  if (aqi <= 200) return { label: "Moderate", color: "hsl(45 72% 66%)" };
  if (aqi <= 300) return { label: "Poor", color: "hsl(25 80% 55%)" };
  if (aqi <= 400) return { label: "Very Poor", color: "hsl(0 72% 51%)" };
  return { label: "Severe", color: "hsl(0 72% 35%)" };
}

export function getHeatmapColor(value: number) {
  if (value < 0.3) return "hsl(153 43% 30% / 0.6)";
  if (value < 0.5) return "hsl(153 43% 45% / 0.7)";
  if (value < 0.7) return "hsl(45 72% 50% / 0.7)";
  if (value < 0.85) return "hsl(25 80% 50% / 0.8)";
  return "hsl(0 72% 45% / 0.9)";
}

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "./ui/button";
import { Crosshair } from "lucide-react";

// Fix for default marker icon
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface LocationMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number } | null;
}

const LocationMarker = ({
  onLocationSelect,
  selectedLocation,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number } | null;
}) => {
  const map = useMap();

  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return selectedLocation ? (
    <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
  ) : null;
};

const LocationMap = ({ onLocationSelect, selectedLocation }: LocationMapProps) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          onLocationSelect(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Could add a toast here if we passed the toast function or dispatch
        }
      );
    }
  };

  // Effect to fly to user location when found
  const MapRecenter = ({ location }: { location: { lat: number; lng: number } | null }) => {
    const map = useMap();
    useEffect(() => {
      if (location) {
        map.flyTo([location.lat, location.lng], 10);
      }
    }, [location, map]);
    return null;
  };

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden border border-border/50 shadow-lg group">
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <LocationMarker
          onLocationSelect={onLocationSelect}
          selectedLocation={selectedLocation}
        />
        <MapRecenter location={userLocation} />
      </MapContainer>

      <Button
        onClick={handleLocateMe}
        className="absolute bottom-4 right-4 z-[400] bg-background/80 backdrop-blur-md hover:bg-background text-foreground shadow-sm border border-border/50"
        size="icon"
        variant="outline"
      >
        <Crosshair className="h-5 w-5" />
      </Button>
      
      <div className="absolute top-4 left-4 z-[400] bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-md text-xs font-medium border border-border/50 shadow-sm pointer-events-none">
        Click anywhere to analyze air quality
      </div>
    </div>
  );
};

export default LocationMap;

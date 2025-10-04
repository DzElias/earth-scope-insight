import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Rectangle, useMapEvents, useMap } from "react-leaflet";
import type { LatLngBounds, LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";

interface WeatherMapProps {
  onAreaSelect: (bounds: LatLngBounds | null) => void;
}

const DrawRectangleComponent = ({ onAreaSelect }: { onAreaSelect: (bounds: LatLngBounds | null) => void }) => {
  const [startPoint, setStartPoint] = useState<LatLng | null>(null);
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);
  
  useMapEvents({
    click(e) {
      const L = (window as any).L;
      if (!L) return;
      
      if (!startPoint) {
        setStartPoint(e.latlng);
      } else {
        const newBounds = new L.LatLngBounds(startPoint, e.latlng);
        setBounds(newBounds);
        onAreaSelect(newBounds);
        setStartPoint(null);
      }
    },
  });

  return bounds ? <Rectangle bounds={bounds} pathOptions={{ color: '#3b82f6', weight: 2 }} /> : null;
};

const LocationComponent = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    
    const handleLocationFound = (e: any) => {
      console.log('Location found:', e.latlng);
    };
    
    map.locate({ setView: true, maxZoom: 10 });
    map.on('locationfound', handleLocationFound);
    
    return () => {
      map.off('locationfound', handleLocationFound);
    };
  }, [map]);

  return null;
};

const WeatherMap = ({ onAreaSelect }: WeatherMapProps) => {
  return (
    <Card className="h-full overflow-hidden">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', minHeight: '500px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationComponent />
        <DrawRectangleComponent onAreaSelect={onAreaSelect} />
      </MapContainer>
    </Card>
  );
};

export default WeatherMap;

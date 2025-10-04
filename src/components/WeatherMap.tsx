import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Rectangle, useMapEvents, useMap } from "react-leaflet";
import type { LatLngBounds, LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";

interface WeatherMapProps {
  onAreaSelect: (bounds: LatLngBounds | null) => void;
}

function DrawRectangleHandler({ onAreaSelect }: { onAreaSelect: (bounds: LatLngBounds | null) => void }) {
  const [startPoint, setStartPoint] = useState<LatLng | null>(null);
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);
  
  useMapEvents({
    click(e) {
      const L = window.L;
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

  if (!bounds) return null;
  
  return <Rectangle bounds={bounds} pathOptions={{ color: '#3b82f6', weight: 2 }} />;
}

function LocationHandler() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    
    map.locate({ setView: true, maxZoom: 10 });
    
    function onLocationFound(e: any) {
      console.log('Location found:', e.latlng);
    }
    
    map.on('locationfound', onLocationFound);
    
    return () => {
      map.off('locationfound', onLocationFound);
    };
  }, [map]);

  return null;
}

export default function WeatherMap({ onAreaSelect }: WeatherMapProps) {
  const [key, setKey] = useState(0);

  return (
    <Card className="h-full overflow-hidden">
      <MapContainer
        key={key}
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', minHeight: '500px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationHandler />
        <DrawRectangleHandler onAreaSelect={onAreaSelect} />
      </MapContainer>
    </Card>
  );
}

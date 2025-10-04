import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Rectangle, useMapEvents, useMap } from "react-leaflet";
import { LatLngBounds, LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface WeatherMapProps {
  onAreaSelect: (bounds: LatLngBounds | null) => void;
}

function DrawRectangle({ onAreaSelect }: { onAreaSelect: (bounds: LatLngBounds | null) => void }) {
  const [startPoint, setStartPoint] = useState<LatLng | null>(null);
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);
  
  useMapEvents({
    click(e) {
      if (!startPoint) {
        setStartPoint(e.latlng);
      } else {
        const newBounds = new LatLngBounds(startPoint, e.latlng);
        setBounds(newBounds);
        onAreaSelect(newBounds);
        setStartPoint(null);
      }
    },
  });

  return bounds ? <Rectangle bounds={bounds} pathOptions={{ color: '#3b82f6', weight: 2 }} /> : null;
}

function LocationMarker() {
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 10 });
    
    const onLocationFound = (e: any) => {
      console.log('Location found:', e.latlng);
    };
    
    map.on('locationfound', onLocationFound);
    
    return () => {
      map.off('locationfound', onLocationFound);
    };
  }, [map]);

  return null;
}

function MapComponents({ onAreaSelect }: { onAreaSelect: (bounds: LatLngBounds | null) => void }) {
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      <DrawRectangle onAreaSelect={onAreaSelect} />
    </>
  );
}

const WeatherMap = ({ onAreaSelect }: WeatherMapProps) => {
  const [key, setKey] = useState(0);

  const handleClearArea = () => {
    onAreaSelect(null);
    setKey(prev => prev + 1);
  };

  return (
    <Card className="h-full overflow-hidden">
      <MapContainer
        key={key}
        center={[20, 0]}
        zoom={2}
        className="h-full w-full"
        style={{ minHeight: '500px' }}
      >
        <MapComponents onAreaSelect={onAreaSelect} />
      </MapContainer>
    </Card>
  );
};

export default WeatherMap;

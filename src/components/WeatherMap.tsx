import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";

interface WeatherMapProps {
  onAreaSelect: (bounds: L.LatLngBounds | null) => void;
}

const WeatherMap = ({ onAreaSelect }: WeatherMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [startPoint, setStartPoint] = useState<L.LatLng | null>(null);
  const rectangleRef = useRef<L.Rectangle | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([20, 0], 2);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Try to get user location
    map.locate({ setView: true, maxZoom: 10 });

    map.on('locationfound', (e) => {
      console.log('Location found:', e.latlng);
    });

    map.on('locationerror', (e) => {
      console.log('Location error:', e.message);
    });

    // Handle map clicks for drawing rectangle
    map.on('click', (e) => {
      if (!startPoint) {
        // First click - set start point
        setStartPoint(e.latlng);
        
        // Add a marker to show the start point
        L.circleMarker(e.latlng, {
          color: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 0.5,
          radius: 5
        }).addTo(map);
      } else {
        // Second click - create rectangle
        const bounds = L.latLngBounds(startPoint, e.latlng);
        
        // Remove previous rectangle if exists
        if (rectangleRef.current) {
          map.removeLayer(rectangleRef.current);
        }

        // Create new rectangle
        const rectangle = L.rectangle(bounds, {
          color: '#3b82f6',
          weight: 2,
          fillOpacity: 0.2
        }).addTo(map);
        
        rectangleRef.current = rectangle;
        
        // Notify parent component
        onAreaSelect(bounds);
        
        // Reset start point
        setStartPoint(null);
        
        // Clear all circle markers
        map.eachLayer((layer) => {
          if (layer instanceof L.CircleMarker) {
            map.removeLayer(layer);
          }
        });
      }
    });

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update rectangle when startPoint changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear circle markers when startPoint is reset
    if (!startPoint) {
      map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
          map.removeLayer(layer);
        }
      });
    }
  }, [startPoint]);

  return (
    <Card className="h-full overflow-hidden">
      <div 
        ref={mapRef} 
        style={{ 
          height: '100%', 
          width: '100%', 
          minHeight: '500px' 
        }} 
      />
    </Card>
  );
};

export default WeatherMap;

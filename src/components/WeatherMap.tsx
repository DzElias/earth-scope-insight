import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface WeatherMapProps {
  onAreaSelect: (bounds: L.LatLngBounds | null) => void;
}

const WeatherMap = ({ onAreaSelect }: WeatherMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [points, setPoints] = useState<L.LatLng[]>([]);
  const polygonRef = useRef<L.Polygon | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);
  const { t } = useTranslation();
  const MAX_POINTS = 4;

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

    // Handle map clicks for drawing polygon
    map.on('click', (e) => {
      setPoints(currentPoints => {
        const newPoints = [...currentPoints, e.latlng];
        
        // Add a marker to show the point
        const marker = L.circleMarker(e.latlng, {
          color: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 0.7,
          radius: 5
        }).addTo(map);
        
        markersRef.current.push(marker);

        // If we have at least 3 points, create/update polygon
        if (newPoints.length >= 3) {
          // Remove previous polygon if exists
          if (polygonRef.current) {
            map.removeLayer(polygonRef.current);
          }

          // Create new polygon
          const polygon = L.polygon(newPoints, {
            color: '#3b82f6',
            weight: 2,
            fillOpacity: 0.2
          }).addTo(map);
          
          polygonRef.current = polygon;

          // If we reached max points or user clicks close to first point, finalize
          if (newPoints.length === MAX_POINTS) {
            // Calculate bounds from polygon
            const bounds = polygon.getBounds();
            
            // Notify parent component
            onAreaSelect(bounds);
            
            toast.success(t('areaSelected'));
            
            // Clear markers after a delay for visual feedback
            setTimeout(() => {
              markersRef.current.forEach(m => map.removeLayer(m));
              markersRef.current = [];
            }, 500);
            
            return []; // Reset points for next polygon
          }
        }

        // Auto-complete if we have 3 points and user clicks near the first point
        if (newPoints.length === 3) {
          const firstPoint = newPoints[0];
          const distance = e.latlng.distanceTo(firstPoint);
          
          if (distance < 50000) { // 50km threshold
            const polygon = polygonRef.current;
            if (polygon) {
              const bounds = polygon.getBounds();
              onAreaSelect(bounds);
              
              toast.success(t('areaSelected'));
              
              setTimeout(() => {
                markersRef.current.forEach(m => map.removeLayer(m));
                markersRef.current = [];
              }, 500);
              
              return [];
            }
          }
        }
        
        // Show instruction toast
        if (newPoints.length === 1) {
          toast.info(t('clickPoint', { count: 2 }));
        } else if (newPoints.length === 2) {
          toast.info(t('clickPoint', { count: 1 }));
        }

        return newPoints;
      });
    });

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onAreaSelect]);

  // Update polygon when points change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear markers when points are reset
    if (points.length === 0) {
      markersRef.current.forEach(marker => {
        map.removeLayer(marker);
      });
      markersRef.current = [];
      
      if (polygonRef.current) {
        map.removeLayer(polygonRef.current);
        polygonRef.current = null;
      }
    }
  }, [points]);

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

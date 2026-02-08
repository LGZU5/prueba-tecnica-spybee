import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

export interface MarkerData {
  lng: number;
  lat: number;
  title: string;
  className?: string;
}

export function useMapMarkers(
  mapRef: React.RefObject<mapboxgl.Map | null>,
  markers: MarkerData[],
  markerClassName?: string,
) {
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    markers.forEach((data) => {
      const el = createMarkerElement(
        data.title,
        data.className || markerClassName,
      );
      const marker = new mapboxgl.Marker(el)
        .setLngLat([data.lng, data.lat])
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
    };
  }, [mapRef, markers, markerClassName]);

  return markersRef;
}

function createMarkerElement(
  title: string,
  className?: string,
): HTMLDivElement {
  const container = document.createElement("div");
  if (className) {
    container.className = className;
  }

  const label = document.createElement("div");
  label.style.cssText = `
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    margin-bottom: 8px;
  `;
  label.innerText = title;

  const dot = document.createElement("div");
  dot.style.cssText = `
    width: 12px;
    height: 12px;
    background: #3b82f6;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  `;

  container.appendChild(label);
  container.appendChild(dot);

  return container;
}

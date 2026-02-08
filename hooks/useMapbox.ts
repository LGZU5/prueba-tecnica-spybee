import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

interface UseMapboxOptions {
  center: [number, number];
  zoom: number;
}

export function useMapbox({ center, zoom }: UseMapboxOptions) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center,
      zoom,
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { mapContainerRef, mapRef };
}

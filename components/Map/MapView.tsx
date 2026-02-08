"use client";

import { useEffect, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import { ProjectWithCounts } from "@/types/project";
import { useProjectsStore } from "@/store/projectsStore";
import { useMapbox } from "@/hooks/useMapbox";
import { useMapMarkers, type MarkerData } from "@/hooks/useMapMarkers";
import styles from "./MapView.module.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

const DEFAULT_CENTER: [number, number] = [-95.7129, 37.0902];
const DEFAULT_ZOOM = 12;

interface Props {
  project?: ProjectWithCounts | null;
}

export function MapView({ project }: Props) {
  const sidebarOpen = useProjectsStore((state) => state.sidebarOpen);

  const { mapContainerRef, mapRef } = useMapbox({
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
  });

  const markers: MarkerData[] = useMemo(() => {
    if (!project) return [];

    return [
      {
        lng: project.position.lng,
        lat: project.position.lat,
        title: project.title,
        className: styles.markerContainer,
      },
    ];
  }, [project]);

  useMapMarkers(mapRef, markers);

  useEffect(() => {
    if (!mapRef.current || !project) return;

    const isMobile = window.innerWidth < 768;
    const zoom = isMobile ? 12 : 13;

    mapRef.current.flyTo({
      center: [project.position.lng, project.position.lat],
      zoom,
      duration: 4000,
      essential: true,
      easing: (t) => t * (2 - t),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.flyTo({
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      duration: 2000,
      essential: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const timer = setTimeout(() => {
      mapRef.current?.resize();
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarOpen]);

  return <div ref={mapContainerRef} className={styles.mapContainer} />;
}

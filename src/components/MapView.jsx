import React, { useEffect, useRef } from "react";

export default function MapView({ center, radius }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    // init map
    if (!mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 16,
      });

      markerRef.current = new window.google.maps.Marker({
        position: center,
        map: mapInstance.current,
      });

      circleRef.current = new window.google.maps.Circle({
        map: mapInstance.current,
        radius: radius,
        fillColor: "#3b82f6",
        fillOpacity: 0.2,
        strokeColor: "#3b82f6",
        strokeOpacity: 0.8,
        strokeWeight: 2,
      });
    }

    // update marker + circle
    markerRef.current.setPosition(center);
    mapInstance.current.setCenter(center);

    circleRef.current.setCenter(center);
    circleRef.current.setRadius(radius);

  }, [center, radius]);

  return <div ref={mapRef} className="w-full h-full" />;
}
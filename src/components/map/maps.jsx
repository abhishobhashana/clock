import { useEffect, useRef, useState } from "react";
import {
  AttributionControl,
  MapContainer,
  TileLayer,
  Polygon,
} from "react-leaflet";
import { UseModeChecker } from "../../utils/useModeChecker";
import "leaflet/dist/leaflet.css";

const Maps = ({ location, mapData }) => {
  const mode = UseModeChecker();

  const lightMap =
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
  const darkMap =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  const mapRef = useRef();
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const pos = {
      lat: parseFloat(location?.lat) || 0,
      lng: parseFloat(location?.lng) || 0,
    };
    const bounds = [
      [parseFloat(location?.lat) - 0.05, parseFloat(location?.lng) - 0.05],
      [parseFloat(location?.lat) + 0.05, parseFloat(location?.lng) + 0.05],
    ];

    if (mapRef?.current) {
      mapRef?.current?.fitBounds(bounds, { padding: [50, 50] });
    }

    setCenter(pos);
  }, [location, mapRef?.current]);

  function createSmallPolygonAroundPoint([lat, lon], size = 0.0001) {
    return [
      [lat - size, lon - size],
      [lat - size, lon + size],
      [lat + size, lon + size],
      [lat + size, lon - size],
      [lat - size, lon - size],
    ];
  }

  const geojson = Array.isArray(mapData) ? mapData[0]?.geojson : null;

  let coords = [];

  if (geojson?.type === "Point" && Array.isArray(geojson.coordinates)) {
    const [lon, lat] = geojson.coordinates;
    if (typeof lat === "number" && typeof lon === "number") {
      const smallPolygon = createSmallPolygonAroundPoint([lat, lon]);
      coords = [smallPolygon];
    }
  } else if (
    geojson?.type === "Polygon" &&
    Array.isArray(geojson.coordinates)
  ) {
    coords = geojson.coordinates.map((ring) =>
      Array.isArray(ring) ? ring.map(([lon, lat]) => [lat, lon]) : []
    );
  } else if (
    geojson?.type === "MultiPolygon" &&
    Array.isArray(geojson.coordinates)
  ) {
    coords = geojson.coordinates.flatMap((polygon) =>
      Array.isArray(polygon)
        ? polygon.map((ring) =>
            Array.isArray(ring) ? ring.map(([lon, lat]) => [lat, lon]) : []
          )
        : []
    );
  }
  return (
    <MapContainer
      ref={mapRef}
      className="h-full rounded-md"
      center={center}
      zoom={9}
      animate={true}
      preferCanvas={true}
      zoomControl={false}
      attributionControl={false}
      zoomAnimation
      minZoom={2}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
    >
      <TileLayer url={mode ? darkMap : lightMap} />
      <AttributionControl
        position="bottomleft"
        prefix='<a href="https://leafletjs.com/">Leaflet</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {coords.map((boundary, index) => (
        <Polygon
          key={index}
          positions={boundary}
          pathOptions={{
            color: "rgba(10, 132, 255, 1)",
            fillOpacity: 0.2,
            weight: 2,
          }}
        />
      ))}
    </MapContainer>
  );
};

export default Maps;

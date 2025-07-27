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

  const coords = (mapData?.[0]?.geojson?.coordinates ?? []).map((ring) =>
    ring.map(([lon, lat]) => [lat, lon])
  );

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

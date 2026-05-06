import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DISTRICTS, getSeverity } from "@/data/districts";
import {
  BOJONEGORO_BOUNDS,
  DESA_GEOJSON_URL,
  KECAMATAN_TO_DISTRICT_ID,
  LEGEND_ITEMS,
  getSeverityFillColor,
  getSeverityBorderColor,
} from "@/data/mapConfig";

type Props = {
  hoveredId?: string;
  onHover?: (id: string | null) => void;
};

function avgScore(s: { personal: number; social: number; spatial: number; structural: number }) {
  return (s.personal + s.social + s.spatial + s.structural) / 4;
}

export default function BojonegoroMap({ hoveredId, onHover }: Props) {
  const navigate = useNavigate();
  const [geoData, setGeoData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [loading, setLoading] = useState(true);

  // Store ALL layers belonging to each district (many desa per kecamatan)
  const layersByDistrictId = useRef<Record<string, L.Path[]>>({});

  useEffect(() => {
    fetch(DESA_GEOJSON_URL)
      .then(r => r.json())
      .then((data: GeoJSON.FeatureCollection) => {
        setGeoData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Sync hover highlight from external source (e.g. priority list on the right)
  useEffect(() => {
    Object.entries(layersByDistrictId.current).forEach(([districtId, layers]) => {
      const district = DISTRICTS.find(d => d.id === districtId);
      if (!district) return;
      const sev = getSeverity(avgScore(district.scores));
      const isHovered = hoveredId === districtId;
      layers.forEach(layer => {
        layer.setStyle({
          fillColor: getSeverityFillColor(sev),
          fillOpacity: isHovered ? 0.88 : 0.65,
          color: getSeverityBorderColor(sev),
          weight: isHovered ? 2.5 : 1.2,
        });
        if (isHovered) layer.bringToFront();
      });
    });
  }, [hoveredId]);

  const getBaseStyle = (feature?: GeoJSON.Feature): L.PathOptions => {
    const kecamatanName = feature?.properties?.KECAMATAN as string;
    const districtId = KECAMATAN_TO_DISTRICT_ID[kecamatanName];
    const district = DISTRICTS.find(d => d.id === districtId);
    if (!district) return { fillColor: "#ccc", color: "#999", weight: 1, fillOpacity: 0.4 };
    const sev = getSeverity(avgScore(district.scores));
    return {
      fillColor: getSeverityFillColor(sev),
      color: getSeverityBorderColor(sev),
      weight: 1.2,
      fillOpacity: 0.65,
    };
  };

  const onEachFeature = (feature: GeoJSON.Feature, layer: L.Layer) => {
    const kecamatanName = feature.properties?.KECAMATAN as string;
    const districtId = KECAMATAN_TO_DISTRICT_ID[kecamatanName];
    const district = DISTRICTS.find(d => d.id === districtId);
    const pathLayer = layer as L.Path;

    // Accumulate all layers for this district
    if (districtId) {
      if (!layersByDistrictId.current[districtId]) {
        layersByDistrictId.current[districtId] = [];
      }
      layersByDistrictId.current[districtId].push(pathLayer);
    }

    pathLayer.on("mouseover", () => {
      pathLayer.setStyle({ fillOpacity: 0.88, weight: 2.5 });
      onHover?.(districtId ?? null);
    });

    pathLayer.on("mouseout", () => {
      const sev = district ? getSeverity(avgScore(district.scores)) : "medium";
      pathLayer.setStyle({
        fillColor: getSeverityFillColor(sev),
        fillOpacity: 0.65,
        weight: 1.2,
      });
      onHover?.(null);
    });

    pathLayer.on("click", () => {
      if (districtId) navigate(`/district/${districtId}`);
    });

    if (kecamatanName) {
      const avg = district ? Math.round(avgScore(district.scores)) : 0;
      const povertyRate = district?.povertyRate ?? 0;
      pathLayer.bindTooltip(
        `<div style="font-family:inherit;padding:2px 4px">
          <strong>${kecamatanName}</strong><br/>
          Kemiskinan: ${povertyRate}% &nbsp;·&nbsp; Skor: ${avg}
        </div>`,
        { sticky: true, className: "leaflet-tooltip-camat" }
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full text-sm text-muted-foreground">
        <div className="text-center">
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2" />
          <p>Memuat peta Bojonegoro...</p>
          <p className="text-xs mt-1 opacity-60">Mengunduh data batas administrasi</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <MapContainer
        bounds={BOJONEGORO_BOUNDS}
        className="w-full h-full rounded-md"
        zoomControl={true}
        attributionControl={false}
        scrollWheelZoom={true}
        style={{ zIndex: 0 }}
      >
        {geoData && (
          <GeoJSON
            data={geoData}
            style={getBaseStyle}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>

      {/* Legend — positioned inside relative parent, outside MapContainer DOM */}
      <div className="absolute bottom-4 left-4 bg-white/92 border border-gray-200 rounded-lg p-3 text-xs shadow-md pointer-events-none" style={{ zIndex: 9999 }}>
        <p className="font-bold text-gray-700 mb-2 uppercase tracking-wider text-[10px]">Tingkat Kemiskinan</p>
        {LEGEND_ITEMS.map(item => (
          <div key={item.severity} className="flex items-center gap-2 mb-1.5 last:mb-0">
            <span
              className="inline-block w-4 h-4 rounded flex-shrink-0 border"
              style={{
                background: getSeverityFillColor(item.severity),
                borderColor: getSeverityBorderColor(item.severity),
              }}
            />
            <span className="text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

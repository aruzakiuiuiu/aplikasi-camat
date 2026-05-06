import { useEffect, useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DESA_GEOJSON_URL, DISTRICT_ID_TO_KECAMATAN } from "@/data/mapConfig";
import { getVillagesByDistrict } from "@/data/villages";
import { getSeverity } from "@/data/districts";

type Props = {
  districtId: string;
  onSelectVillage?: (desaName: string) => void;
};

const DESA_COLORS = [
  "#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b",
  "#ef4444", "#ec4899", "#14b8a6", "#6366f1", "#84cc16",
];

function getDesaColor(index: number): string {
  return DESA_COLORS[index % DESA_COLORS.length];
}

export default function BojonegoroDistrictMap({ districtId, onSelectVillage }: Props) {
  const [allGeoData, setAllGeoData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [filteredData, setFilteredData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [loading, setLoading] = useState(true);
  const [bounds, setBounds] = useState<L.LatLngBoundsExpression | null>(null);

  const kecamatanName = DISTRICT_ID_TO_KECAMATAN[districtId];
  const villages = getVillagesByDistrict(districtId);

  useEffect(() => {
    fetch(DESA_GEOJSON_URL)
      .then(r => r.json())
      .then((data: GeoJSON.FeatureCollection) => {
        setAllGeoData(data);

        const filtered: GeoJSON.FeatureCollection = {
          type: "FeatureCollection",
          features: data.features.filter(
            f => f.properties?.KECAMATAN === kecamatanName
          ),
        };
        setFilteredData(filtered);

        // Calculate bounds from filtered features
        if (filtered.features.length > 0) {
          const tempLayer = L.geoJSON(filtered);
          setBounds(tempLayer.getBounds());
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [districtId, kecamatanName]);

  const getDesaStyle = (feature?: GeoJSON.Feature): L.PathOptions => {
    const desaName = feature?.properties?.DESA as string;
    // Try to match with village app data for severity coloring
    const village = villages.find(v =>
      v.name.toLowerCase().includes(desaName?.toLowerCase()?.slice(0, 5) ?? "____")
    );
    if (village) {
      const avg = (village.scores.personal + village.scores.social + village.scores.spatial + village.scores.structural) / 4;
      const sev = getSeverity(avg);
      const colorMap = { high: "#ef4444", medium: "#f59e0b", low: "#10b981" };
      return {
        fillColor: colorMap[sev],
        color: "#333",
        weight: 1,
        fillOpacity: 0.55,
      };
    }
    // Fallback: use positional color
    const idx = filteredData?.features.findIndex(f => f.properties?.DESA === desaName) ?? 0;
    return {
      fillColor: getDesaColor(idx),
      color: "#444",
      weight: 1,
      fillOpacity: 0.5,
    };
  };

  const onEachFeature = (feature: GeoJSON.Feature, layer: L.Layer) => {
    const desaName = feature.properties?.DESA as string;
    const luasKm2 = feature.properties?.luas as number;
    const pathLayer = layer as L.Path;

    pathLayer.on("mouseover", () => {
      pathLayer.setStyle({ fillOpacity: 0.8, weight: 2.5 });
    });

    pathLayer.on("mouseout", () => {
      pathLayer.setStyle({ fillOpacity: 0.55, weight: 1 });
    });

    pathLayer.on("click", () => {
      onSelectVillage?.(desaName);
    });

    pathLayer.bindTooltip(
      `<div style="font-family:inherit;padding:2px 4px">
        <strong>${desaName}</strong><br/>
        Kec. ${kecamatanName}<br/>
        Luas: ${luasKm2?.toFixed(2) ?? "?"} km²
      </div>`,
      { sticky: true }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[280px] text-sm text-muted-foreground">
        <div className="text-center">
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2" />
          Memuat peta desa {kecamatanName}...
        </div>
      </div>
    );
  }

  if (!filteredData || filteredData.features.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[280px] text-sm text-muted-foreground">
        <p>Data batas desa untuk Kecamatan {kecamatanName} tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[320px]">
      <MapContainer
        key={districtId}
        bounds={bounds ?? undefined}
        className="w-full h-full rounded-md"
        zoomControl={true}
        attributionControl={false}
        scrollWheelZoom={true}
      >
        <GeoJSON
          data={filteredData}
          style={getDesaStyle}
          onEachFeature={onEachFeature}
        />
      </MapContainer>

      {/* Desa count badge */}
      <div className="absolute top-3 left-3 z-[1000] bg-white/90 border border-border rounded-md px-3 py-1.5 text-xs shadow">
        <span className="font-semibold text-foreground">{filteredData.features.length} desa</span>
        <span className="text-muted-foreground"> di Kec. {kecamatanName}</span>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import GeoMap from "./GeoMap";
import { DISTRICTS, getSeverity } from "@/data/districts";
import districtsGeo from "@/data/geo/districts.geo.json";
import type { FeatureCollection } from "geojson";

const data = districtsGeo as unknown as FeatureCollection;

const severityById = new Map(
  DISTRICTS.map((d) => {
    const avg = (d.scores.personal + d.scores.social + d.scores.spatial + d.scores.structural) / 4;
    return [d.id, getSeverity(avg)] as const;
  })
);

type Props = {
  hoveredId?: string;
  onHover?: (id: string | null) => void;
};

export default function BojonegoroMap({ hoveredId, onHover }: Props) {
  const navigate = useNavigate();
  return (
    <GeoMap
      data={data}
      getMeta={(f) => ({
        id: f.properties.id,
        name: f.properties.name,
        severity: severityById.get(f.properties.id) ?? "medium",
      })}
      hoveredId={hoveredId ?? null}
      onHover={onHover}
      onClick={(id) => navigate(`/district/${id}`)}
    />
  );
}

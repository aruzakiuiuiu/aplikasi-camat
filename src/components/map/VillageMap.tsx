import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import GeoMap from "./GeoMap";
import { VILLAGES } from "@/data/villages";
import { getSeverity } from "@/data/districts";
import villagesGeo from "@/data/geo/villages.geo.json";
import type { FeatureCollection } from "geojson";

const allVillages = villagesGeo as unknown as FeatureCollection;

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "");

type Props = {
  districtId: string;
};

export default function VillageMap({ districtId }: Props) {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const { data, metaByGeoId } = useMemo(() => {
    const districtVillages = VILLAGES.filter((v) => v.districtId === districtId);
    const byName = new Map(districtVillages.map((v) => [norm(v.name), v]));

    const features = allVillages.features.filter(
      (f: any) => f.properties.district_id === districtId
    );

    const metaByGeoId = new Map<string, { id: string; name: string; severity: "high" | "medium" | "low" }>();
    for (const f of features) {
      const props: any = f.properties;
      const v = byName.get(norm(props.name));
      const id = v?.id ?? props.id;
      const name = v?.name ?? props.name;
      let severity: "high" | "medium" | "low" = "medium";
      if (v) {
        const avg = (v.scores.personal + v.scores.social + v.scores.spatial + v.scores.structural) / 4;
        severity = getSeverity(avg);
      }
      metaByGeoId.set(props.id, { id, name, severity });
    }

    return {
      data: { type: "FeatureCollection", features } as FeatureCollection,
      metaByGeoId,
    };
  }, [districtId]);

  if (data.features.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
        Peta desa belum tersedia
      </div>
    );
  }

  return (
    <GeoMap
      data={data}
      getMeta={(f: any) => metaByGeoId.get(f.properties.id) ?? { id: f.properties.id, name: f.properties.name, severity: "medium" }}
      hoveredId={hoveredId}
      onHover={setHoveredId}
      onClick={(id) => {
        if (id.startsWith(districtId + "-v")) navigate(`/village/${id}`);
      }}
      legend={false}
    />
  );
}

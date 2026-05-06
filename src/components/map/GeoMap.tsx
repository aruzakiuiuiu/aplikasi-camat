import { useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import type { FeatureCollection, Feature, Geometry } from "geojson";

export type GeoMapFeatureMeta = {
  id: string;
  name: string;
  severity: "high" | "medium" | "low";
};

type Props = {
  data: FeatureCollection;
  width?: number;
  height?: number;
  getMeta: (f: Feature<Geometry, any>) => GeoMapFeatureMeta;
  hoveredId?: string | null;
  onHover?: (id: string | null) => void;
  onClick?: (id: string) => void;
  showLabels?: boolean;
  legend?: boolean;
};

const SEVERITY_FILL: Record<string, string> = {
  high: "hsl(0 72% 54% / 0.6)",
  medium: "hsl(34 90% 50% / 0.6)",
  low: "hsl(142 60% 42% / 0.5)",
};
const SEVERITY_STROKE: Record<string, string> = {
  high: "hsl(0 72% 38%)",
  medium: "hsl(34 90% 36%)",
  low: "hsl(142 60% 28%)",
};
const HOVER_FILL: Record<string, string> = {
  high: "hsl(0 72% 54% / 0.9)",
  medium: "hsl(34 90% 50% / 0.9)",
  low: "hsl(142 60% 42% / 0.8)",
};

export default function GeoMap({
  data,
  width = 820,
  height = 500,
  getMeta,
  hoveredId,
  onHover,
  onClick,
  showLabels = true,
  legend = true,
}: Props) {
  const { paths, projection } = useMemo(() => {
    const projection = geoMercator().fitSize([width, height], data as any);
    const pathGen = geoPath(projection);
    const paths = data.features.map((f) => ({
      feature: f as Feature<Geometry, any>,
      d: pathGen(f as any) ?? "",
    }));
    return { paths, projection };
  }, [data, width, height]);

  return (
    <div className="relative w-full h-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" style={{ fontFamily: "inherit" }}>
        <rect width={width} height={height} fill="hsl(210 20% 96%)" rx={8} />

        {paths.map(({ feature, d }) => {
          const meta = getMeta(feature);
          const isHovered = hoveredId === meta.id;
          return (
            <path
              key={meta.id}
              d={d}
              fill={isHovered ? HOVER_FILL[meta.severity] : SEVERITY_FILL[meta.severity]}
              stroke={SEVERITY_STROKE[meta.severity]}
              strokeWidth={isHovered ? 2 : 0.8}
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={() => onHover?.(meta.id)}
              onMouseLeave={() => onHover?.(null)}
              onClick={() => onClick?.(meta.id)}
            />
          );
        })}

        {showLabels && paths.map(({ feature }) => {
          const meta = getMeta(feature);
          const labelLngLat = (feature.properties as any)?.label;
          if (!labelLngLat) return null;
          const xy = projection(labelLngLat as [number, number]);
          if (!xy) return null;
          const isHovered = hoveredId === meta.id;
          const short = meta.name.length <= 10 ? meta.name : meta.name.slice(0, 9) + "…";
          return (
            <text
              key={`l-${meta.id}`}
              x={xy[0]}
              y={xy[1]}
              textAnchor="middle"
              fontSize={isHovered ? 9 : 7.5}
              fontWeight={isHovered ? 700 : 500}
              fill={isHovered ? "hsl(215 48% 10%)" : "hsl(215 35% 20%)"}
              className="pointer-events-none select-none"
              style={{ paintOrder: "stroke", stroke: "white", strokeWidth: 2.5, strokeOpacity: 0.85 }}
            >
              {short}
            </text>
          );
        })}

        {legend && (
          <g transform={`translate(20, ${height - 100})`}>
            <rect width={140} height={88} rx={6} fill="white" fillOpacity={0.9} stroke="hsl(210 20% 87%)" />
            <text x={10} y={16} fontSize={8} fontWeight={700} fill="hsl(215 35% 20%)" letterSpacing={0.5}>TINGKAT KEMISKINAN</text>
            <rect x={10} y={24} width={14} height={12} rx={3} fill={SEVERITY_FILL.high} stroke={SEVERITY_STROKE.high} />
            <text x={30} y={34} fontSize={8} fill="hsl(215 35% 25%)">Tinggi (≥ 70)</text>
            <rect x={10} y={42} width={14} height={12} rx={3} fill={SEVERITY_FILL.medium} stroke={SEVERITY_STROKE.medium} />
            <text x={30} y={52} fontSize={8} fill="hsl(215 35% 25%)">Sedang (45–69)</text>
            <rect x={10} y={60} width={14} height={12} rx={3} fill={SEVERITY_FILL.low} stroke={SEVERITY_STROKE.low} />
            <text x={30} y={70} fontSize={8} fill="hsl(215 35% 25%)">Rendah (&lt; 45)</text>
          </g>
        )}
      </svg>
    </div>
  );
}

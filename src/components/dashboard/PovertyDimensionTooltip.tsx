import { DIMENSION_DEFINITIONS, getDimensionByKey, getDistrictSubScores } from "@/data/povertyIndicators";
import { getSeverity } from "@/data/districts";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";

interface PovertyDimensionTooltipProps {
  dimensionKey: "personal" | "social" | "spatial" | "structural";
  score: number;
  districtId?: string;
  districtScores?: { personal: number; social: number; spatial: number; structural: number };
  children: React.ReactNode;
}

export default function PovertyDimensionTooltip({
  dimensionKey,
  score,
  districtId,
  districtScores,
  children,
}: PovertyDimensionTooltipProps) {
  const dimension = getDimensionByKey(dimensionKey);
  if (!dimension) return <>{children}</>;

  const subScores = districtId && districtScores
    ? getDistrictSubScores(districtId, districtScores).dimensions[dimensionKey]
    : null;

  const sev = getSeverity(score);
  const sevLabel = score >= 70 ? "Tinggi" : score >= 45 ? "Sedang" : "Rendah";
  const sevColor = sev === "high" ? "text-severity-high" : sev === "medium" ? "text-severity-medium" : "text-severity-low";

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div className="cursor-help">{children}</div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0" side="top" align="start">
        <div className="p-3 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <Info className="h-3.5 w-3.5 text-primary flex-shrink-0" />
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">{dimension.label}</h4>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">{dimension.focus}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-foreground">{score}</span>
            <span className="text-xs text-muted-foreground">/100</span>
            <span className={`text-xs font-semibold ${sevColor}`}>({sevLabel})</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1 italic">0 = kondisi ideal · 100 = kemiskinan ekstrem</p>
        </div>
        <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
          {dimension.subCategories.map(sub => {
            const subScore = subScores?.[sub.id];
            return (
              <div key={sub.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-foreground">{sub.label}</span>
                  {subScore !== undefined && (
                    <span className={`text-xs font-bold mono ${getSeverity(subScore) === "high" ? "text-severity-high" : getSeverity(subScore) === "medium" ? "text-severity-medium" : "text-severity-low"}`}>
                      {subScore}
                    </span>
                  )}
                </div>
                {subScore !== undefined && (
                  <div className="h-1 rounded-full bg-muted overflow-hidden mb-1">
                    <div
                      className={`h-full rounded-full ${getSeverity(subScore) === "high" ? "bg-severity-high" : getSeverity(subScore) === "medium" ? "bg-severity-medium" : "bg-severity-low"}`}
                      style={{ width: `${subScore}%` }}
                    />
                  </div>
                )}
                <div className="space-y-0.5">
                  {sub.indicators.map(ind => (
                    <p key={ind.id} className="text-[10px] text-muted-foreground pl-2 border-l border-border/50">
                      <span className="font-medium">{ind.label}</span>: {ind.description}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

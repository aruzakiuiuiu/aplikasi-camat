import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BojonegoroMap from "@/components/map/BojonegoroMap";
import { DISTRICTS, getSeverity, getSeverityLabel, POVERTY_TYPES } from "@/data/districts";
import { TrendingDown, TrendingUp, Minus, MapPin, Users, AlertTriangle } from "lucide-react";

const TREND_ICON = {
  improving: <TrendingDown className="h-3.5 w-3.5 text-severity-low" />,
  stable: <Minus className="h-3.5 w-3.5 text-severity-medium" />,
  worsening: <TrendingUp className="h-3.5 w-3.5 text-severity-high" />,
};
const TREND_LABEL = { improving: "Membaik", stable: "Stabil", worsening: "Memburuk" };
const TREND_COLOR = {
  improving: "text-severity-low bg-severity-low/10",
  stable: "text-severity-medium bg-severity-medium/10",
  worsening: "text-severity-high bg-severity-high/10",
};

export default function MapPanel() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate();
  const hovered = DISTRICTS.find(d => d.id === hoveredId);

  return (
    <div className="dashboard-card overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-0">
        {/* Map */}
        <div className="relative flex-1 min-h-[340px] lg:min-h-[420px] bg-muted/30 p-3">
          <BojonegoroMap hoveredId={hoveredId ?? undefined} onHover={setHoveredId} />

          {/* Floating tooltip */}
          {hovered && (
            <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-3 shadow-lg w-52 pointer-events-none z-10">
              <div className="flex items-center gap-1.5 mb-2">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span className="font-bold text-sm text-foreground">{hovered.name}</span>
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${TREND_COLOR[hovered.trend]}`}>
                  {TREND_ICON[hovered.trend]}
                  {TREND_LABEL[hovered.trend]}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Tingkat kemiskinan</span>
                  <span className="font-semibold text-foreground">{hovered.povertyRate}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">KK miskin</span>
                  <span className="font-semibold text-foreground">{hovered.poorFamilies.toLocaleString("id-ID")}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-border grid grid-cols-2 gap-1">
                {POVERTY_TYPES.map(pt => {
                  const score = hovered.scores[pt.key];
                  const sev = getSeverity(score);
                  return (
                    <div key={pt.key} className="text-xs">
                      <span className="text-muted-foreground">{pt.shortLabel}: </span>
                      <span className={`font-medium ${sev === "high" ? "text-severity-high" : sev === "medium" ? "text-severity-medium" : "text-severity-low"}`}>{score}</span>
                    </div>
                  );
                })}
              </div>
              <button
                className="mt-3 w-full text-xs py-1.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors pointer-events-auto"
                onClick={() => navigate(`/district/${hovered.id}`)}
              >
                Lihat Profil Kecamatan →
              </button>
            </div>
          )}
        </div>

        {/* Side panel: worst districts */}
        <div className="w-full lg:w-64 border-t lg:border-t-0 lg:border-l border-border flex flex-col">
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-severity-high" />
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">Prioritas Intervensi</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">5 kecamatan tingkat kritis tertinggi</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {[...DISTRICTS]
              .sort((a, b) => {
                const avgA = (a.scores.personal + a.scores.social + a.scores.spatial + a.scores.structural) / 4;
                const avgB = (b.scores.personal + b.scores.social + b.scores.spatial + b.scores.structural) / 4;
                return avgB - avgA;
              })
              .slice(0, 5)
              .map((d, i) => {
                const avg = Math.round((d.scores.personal + d.scores.social + d.scores.spatial + d.scores.structural) / 4);
                const sev = getSeverity(avg);
                return (
                  <button
                    key={d.id}
                    onClick={() => navigate(`/district/${d.id}`)}
                    onMouseEnter={() => setHoveredId(d.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="w-full px-4 py-3 border-b border-border/50 flex items-start gap-3 hover:bg-muted/50 transition-colors text-left group"
                  >
                    <span className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white flex-shrink-0 ${sev === "high" ? "bg-severity-high" : "bg-severity-medium"}`}>
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm text-foreground group-hover:text-primary truncate">{d.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {d.povertyRate}% miskin · {getSeverityLabel(avg)} ({avg})
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {TREND_ICON[d.trend]}
                        <span className="text-xs">{TREND_LABEL[d.trend]}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
          <div className="px-4 py-3 border-t border-border bg-muted/20">
            <p className="text-xs text-muted-foreground text-center">Klik kecamatan di peta atau di daftar untuk melihat profil lengkap</p>
          </div>
        </div>
      </div>
    </div>
  );
}
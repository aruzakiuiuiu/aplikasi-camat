import { useState } from "react";
import { ChevronUp, ChevronDown, TrendingUp, TrendingDown, Minus, Search } from "lucide-react";
import { DISTRICTS, POVERTY_TYPES, getSeverity, getSeverityLabel, getSeverityDarkColor, getSeverityHexColor, type District } from "@/data/districts";

type SortKey = "name" | "povertyRate" | "personal" | "social" | "spatial" | "structural";

function ScoreCell({ score }: { score: number }) {
  const sev = getSeverity(score);
  const dark = getSeverityDarkColor(sev);
  const fill = sev === "sedang" ? "#c8a900" : getSeverityHexColor(sev);
  return (
    <span
      className="text-xs font-semibold px-1.5 py-0.5 rounded whitespace-nowrap"
      style={{ color: dark, backgroundColor: `${fill}22`, border: `1px solid ${fill}88` }}
    >
      {getSeverityLabel(score)}
    </span>
  );
}

function TrendBadge({ trend }: { trend: District["trend"] }) {
  if (trend === "improving") return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ color: "#1a6b1a", backgroundColor: "rgba(171,221,164,0.2)", border: "1px solid rgba(171,221,164,0.6)" }}><TrendingDown className="h-3 w-3" />Membaik</span>;
  if (trend === "worsening") return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ color: "#d7191c", backgroundColor: "rgba(215,25,28,0.1)", border: "1px solid rgba(215,25,28,0.35)" }}><TrendingUp className="h-3 w-3" />Memburuk</span>;
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ color: "#6b7280", backgroundColor: "rgba(107,114,128,0.1)", border: "1px solid rgba(107,114,128,0.3)" }}><Minus className="h-3 w-3" />Stabil</span>;
}

export default function DistrictTable() {
  const [sortKey, setSortKey] = useState<SortKey>("povertyRate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "improving" | "stable" | "worsening">("all");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const filtered = DISTRICTS
    .filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
    .filter(d => filter === "all" || d.trend === filter)
    .sort((a, b) => {
      let va = sortKey === "name" ? a.name : sortKey === "povertyRate" ? a.povertyRate : a.scores[sortKey as keyof typeof a.scores];
      let vb = sortKey === "name" ? b.name : sortKey === "povertyRate" ? b.povertyRate : b.scores[sortKey as keyof typeof b.scores];
      if (typeof va === "string") return sortDir === "asc" ? va.localeCompare(vb as string) : (vb as string).localeCompare(va);
      return sortDir === "asc" ? (va as number) - (vb as number) : (vb as number) - (va as number);
    });

  const SortIcon = ({ col }: { col: SortKey }) => sortKey === col ? (sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />) : <ChevronDown className="h-3 w-3 opacity-30" />;

  const FILTERS = [
    { val: "all", label: "Semua" },
    { val: "improving", label: "Membaik" },
    { val: "stable", label: "Stabil" },
    { val: "worsening", label: "Memburuk" },
  ] as const;

  return (
    <div className="dashboard-card overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-border">
        <h2 className="font-bold text-foreground text-base flex-shrink-0">Data Per Kecamatan</h2>
        <div className="flex-1 min-w-[180px] max-w-[280px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari kecamatan..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-1.5 ml-auto flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f.val}
              onClick={() => setFilter(f.val)}
              className={`px-3 py-1 text-xs rounded-full font-semibold transition-colors ${filter === f.val ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">{filtered.length} kecamatan</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 text-muted-foreground text-xs">
              <th className="text-left px-4 py-3 font-semibold w-8">#</th>
              <th className="text-left px-4 py-3 font-semibold cursor-pointer hover:text-foreground" onClick={() => handleSort("name")}>
                <span className="flex items-center gap-1">Kecamatan <SortIcon col="name" /></span>
              </th>
              <th className="text-right px-4 py-3 font-semibold cursor-pointer hover:text-foreground" onClick={() => handleSort("povertyRate")}>
                <span className="flex items-center justify-end gap-1">% Kemiskinan <SortIcon col="povertyRate" /></span>
              </th>
              {POVERTY_TYPES.map(t => (
                <th key={t.key} className="px-4 py-3 font-semibold cursor-pointer hover:text-foreground min-w-[140px]" onClick={() => handleSort(t.key)}>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: t.chartColor }} />
                    {t.shortLabel} <SortIcon col={t.key} />
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 font-semibold">Tren</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((district, idx) => (
              <tr key={district.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-muted-foreground text-xs mono">{idx + 1}</td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-semibold text-foreground">{district.name}</p>
                    <p className="text-xs text-muted-foreground">{district.poorFamilies.toLocaleString()} KK miskin</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`text-sm font-bold mono ${district.povertyRate >= 23 ? "text-severity-high" : district.povertyRate >= 18 ? "text-severity-medium" : "text-severity-low"}`}>
                    {district.povertyRate}%
                  </span>
                </td>
                <td className="px-4 py-3"><ScoreCell score={district.scores.personal} /></td>
                <td className="px-4 py-3"><ScoreCell score={district.scores.social} /></td>
                <td className="px-4 py-3"><ScoreCell score={district.scores.spatial} /></td>
                <td className="px-4 py-3"><ScoreCell score={district.scores.structural} /></td>
                <td className="px-4 py-3"><TrendBadge trend={district.trend} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">Tidak ada kecamatan ditemukan.</div>
        )}
      </div>
    </div>
  );
}
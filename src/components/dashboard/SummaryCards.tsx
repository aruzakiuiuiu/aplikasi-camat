import { TrendingDown, TrendingUp, Minus, Users, Globe, Network, Building2 } from "lucide-react";
import { getRegencyStats, POVERTY_TYPES, getSeverity, getSeverityLabel, getSeverityColorClass } from "@/data/districts";
import PovertyDimensionTooltip from "./PovertyDimensionTooltip";

const icons = [Users, Network, Globe, Building2];

export default function SummaryCards() {
  const stats = getRegencyStats();

  return (
    <div className="space-y-6">
      {/* Top row: Overall KPIs */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Statistik Kemiskinan Kabupaten</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <p className="text-xs text-muted-foreground -mt-1 mb-4">Ringkasan kondisi kemiskinan Kabupaten Bojonegoro</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="dashboard-card p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Kecamatan</p>
          <p className="text-3xl font-bold text-foreground">28</p>
          <p className="text-xs text-muted-foreground mt-1">Kabupaten Bojonegoro</p>
        </div>
        <div className="dashboard-card p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">KK Miskin</p>
          <p className="text-3xl font-bold text-foreground">{(stats.totalPoor / 1000).toFixed(1)}K</p>
          <p className="text-xs text-muted-foreground mt-1">dari {(stats.totalPop / 1000).toFixed(0)}K jiwa</p>
        </div>
        <div className="dashboard-card p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Rata-rata Kemiskinan</p>
          <p className="text-3xl font-bold text-foreground">{stats.avgPovRate.toFixed(1)}%</p>
          <p className="text-xs text-muted-foreground mt-1">Tingkat kemiskinan kabupaten</p>
        </div>
        <div className="dashboard-card p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Kecamatan Membaik</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-severity-low">{stats.improving}</p>
            <p className="text-sm text-muted-foreground mb-1">/ {stats.total}</p>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <TrendingDown className="h-3 w-3 text-severity-low" />
            <span className="text-severity-low font-medium">{stats.improving} membaik</span>
            <span className="text-muted-foreground mx-1">·</span>
            <TrendingUp className="h-3 w-3 text-severity-high" />
            <span className="text-severity-high font-medium">{stats.worsening} memburuk</span>
          </div>
        </div>
      </div>
      </div>

      {/* Poverty type score cards */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Indeks 4 Domain Kemiskinan</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <p className="text-xs text-muted-foreground -mt-1 mb-4">Rata-rata indeks per domain · skala 1–5 (1 = sangat rendah, 5 = sangat tinggi) · hover kartu untuk detail</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {POVERTY_TYPES.map((type, i) => {
          const Icon = icons[i];
          const score = stats.avgScores[type.key];
          const sev = getSeverity(score);
          const severity = getSeverityLabel(score);
          const severityColor = getSeverityColorClass(sev).text;
          const pct = ((score - 1) / 4) * 100;
          return (
            <PovertyDimensionTooltip key={type.key} dimensionKey={type.key} score={score}>
              <div className="dashboard-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${type.bgClass}`}>
                    <Icon className="h-3 w-3" />
                    {type.shortLabel}
                  </span>
                  <span className={`text-xs font-bold ${severityColor}`}>{severity}</span>
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">{score}<span className="text-sm font-normal text-muted-foreground">/5</span></p>
                <p className="text-[11px] text-muted-foreground mb-2">{type.label}</p>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, backgroundColor: type.color }}
                  />
                </div>
              </div>
            </PovertyDimensionTooltip>
          );
        })}
      </div>
      </div>
    </div>
  );
}
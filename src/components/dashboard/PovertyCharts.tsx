import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from "recharts";
import { DISTRICTS, POVERTY_TYPES, getRegencyStats } from "@/data/districts";

function PovertyTypeRadar() {
  const stats = getRegencyStats();
  const data = POVERTY_TYPES.map(t => ({
    subject: t.shortLabel,
    score: stats.avgScores[t.key],
    fullMark: 100,
  }));

  return (
    <div className="dashboard-card p-5">
      <h3 className="font-bold text-foreground text-sm mb-1">Rata-rata Indeks Per Tipe Kemiskinan</h3>
      <p className="text-xs text-muted-foreground mb-4">Kabupaten Bojonegoro</p>
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="hsl(210 20% 87%)" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "hsl(215 20% 48%)", fontFamily: "Plus Jakarta Sans" }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(215 20% 48%)" }} />
          <Radar name="Indeks" dataKey="score" stroke="hsl(200 72% 28%)" fill="hsl(200 72% 28%)" fillOpacity={0.25} strokeWidth={2} />
          <Tooltip formatter={(v) => [`${v}/100`, "Indeks"]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(210 20% 87%)" }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

function TopWorstDistricts() {
  const sorted = [...DISTRICTS].sort((a, b) => b.povertyRate - a.povertyRate).slice(0, 10);
  const data = sorted.map(d => ({ name: d.name, rate: d.povertyRate }));

  return (
    <div className="dashboard-card p-5">
      <h3 className="font-bold text-foreground text-sm mb-1">10 Kecamatan Tingkat Kemiskinan Tertinggi</h3>
      <p className="text-xs text-muted-foreground mb-4">Berdasarkan persentase kemiskinan</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
          <XAxis type="number" domain={[0, 35]} tick={{ fontSize: 11, fill: "hsl(215 20% 48%)" }} tickFormatter={v => `${v}%`} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "hsl(215 20% 48%)" }} width={78} />
          <Tooltip formatter={(v) => [`${v}%`, "Tingkat Kemiskinan"]} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
          <Bar dataKey="rate" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.rate >= 25 ? "hsl(0 72% 54%)" : entry.rate >= 20 ? "hsl(34 90% 50%)" : "hsl(200 72% 40%)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function PovertyTypesComparison() {
  const top8 = [...DISTRICTS].sort((a, b) => b.povertyRate - a.povertyRate).slice(0, 8);
  const data = top8.map(d => ({
    name: d.name.slice(0, 8),
    individual: d.scores.individual,
    natural: d.scores.natural,
    social: d.scores.social,
    structural: d.scores.structural,
  }));

  return (
    <div className="dashboard-card p-5">
      <h3 className="font-bold text-foreground text-sm mb-1">Perbandingan Tipe Kemiskinan</h3>
      <p className="text-xs text-muted-foreground mb-4">8 kecamatan dengan kemiskinan tertinggi</p>
      <div className="flex flex-wrap gap-3 mb-3">
        {POVERTY_TYPES.map(t => (
          <span key={t.key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-sm inline-block" style={{ backgroundColor: t.color }} />
            {t.shortLabel}
          </span>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(215 20% 48%)" }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(215 20% 48%)" }} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
          <Bar dataKey="individual" fill="hsl(0 72% 54%)" radius={[2, 2, 0, 0]} />
          <Bar dataKey="natural" fill="hsl(34 90% 50%)" radius={[2, 2, 0, 0]} />
          <Bar dataKey="social" fill="hsl(200 72% 40%)" radius={[2, 2, 0, 0]} />
          <Bar dataKey="structural" fill="hsl(270 55% 50%)" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function TrendSummary() {
  const improving = DISTRICTS.filter(d => d.trend === "improving").length;
  const stable = DISTRICTS.filter(d => d.trend === "stable").length;
  const worsening = DISTRICTS.filter(d => d.trend === "worsening").length;

  const items = [
    { label: "Membaik", count: improving, color: "hsl(142 60% 42%)", bg: "bg-severity-low/10", text: "text-severity-low" },
    { label: "Stabil", count: stable, color: "hsl(215 20% 48%)", bg: "bg-muted", text: "text-muted-foreground" },
    { label: "Memburuk", count: worsening, color: "hsl(0 72% 54%)", bg: "bg-severity-high/10", text: "text-severity-high" },
  ];

  return (
    <div className="dashboard-card p-5">
      <h3 className="font-bold text-foreground text-sm mb-1">Tren Perkembangan</h3>
      <p className="text-xs text-muted-foreground mb-4">Status kemiskinan kecamatan</p>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.label} className="flex items-center gap-3">
            <span className={`text-xs font-semibold w-20 ${item.text}`}>{item.label}</span>
            <div className="flex-1 h-4 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${(item.count / 28) * 100}%`, backgroundColor: item.color }} />
            </div>
            <span className={`text-sm font-bold mono w-6 text-right ${item.text}`}>{item.count}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Total: 28 Kecamatan</span>
          <span className="font-semibold text-severity-low">{Math.round((improving / 28) * 100)}% membaik</span>
        </div>
      </div>
    </div>
  );
}

export default function PovertyCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <PovertyTypeRadar />
      <TrendSummary />
      <div className="md:col-span-2">
        <TopWorstDistricts />
      </div>
      <div className="md:col-span-2 xl:col-span-4">
        <PovertyTypesComparison />
      </div>
    </div>
  );
}

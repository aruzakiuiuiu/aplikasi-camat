import { useState } from "react";

import { DISTRICTS, POVERTY_TYPES, getSeverity, getSeverityLabel } from "@/data/districts";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";
import {
  Calendar, CheckCircle2, AlertTriangle, Clock, Target, TrendingDown, TrendingUp,
  Minus, ClipboardList, Activity, Award, ChevronDown
} from "lucide-react";

// Mock program data
const PROGRAMS = [
  { id: "p1", name: "PKH (Program Keluarga Harapan)", category: "Bantuan Sosial", target: 42000, realized: 38500, startDate: "Jan 2025", endDate: "Des 2026", status: "active" as const, budget: 98_000_000_000 },
  { id: "p2", name: "BPNT/Sembako", category: "Bantuan Pangan", target: 55000, realized: 51200, startDate: "Jan 2025", endDate: "Des 2026", status: "active" as const, budget: 72_000_000_000 },
  { id: "p3", name: "Rutilahu (Rehab Rumah)", category: "Infrastruktur", target: 3200, realized: 1840, startDate: "Mar 2025", endDate: "Jun 2026", status: "active" as const, budget: 56_000_000_000 },
  { id: "p4", name: "KUR Pertanian", category: "Ekonomi", target: 8500, realized: 6200, startDate: "Jan 2025", endDate: "Des 2026", status: "active" as const, budget: 120_000_000_000 },
  { id: "p5", name: "Intervensi Stunting", category: "Kesehatan", target: 12000, realized: 9800, startDate: "Apr 2025", endDate: "Des 2026", status: "active" as const, budget: 34_000_000_000 },
  { id: "p6", name: "BLT Dana Desa", category: "Bantuan Sosial", target: 28000, realized: 28000, startDate: "Jan 2025", endDate: "Jun 2025", status: "completed" as const, budget: 42_000_000_000 },
  { id: "p7", name: "Padat Karya Infrastruktur", category: "Infrastruktur", target: 4800, realized: 2100, startDate: "Jul 2025", endDate: "Des 2026", status: "delayed" as const, budget: 65_000_000_000 },
  { id: "p8", name: "Pembangunan Embung & Sumur Bor", category: "Infrastruktur", target: 150, realized: 62, startDate: "Jan 2025", endDate: "Des 2026", status: "active" as const, budget: 48_000_000_000 },
];

const ACTIVITY_LOG = [
  { date: "18 Feb 2026", actor: "Camat Kedungadem", action: "Verifikasi lapangan program Rutilahu", location: "Desa Dukohkidul", status: "verified" as const },
  { date: "17 Feb 2026", actor: "Camat Kanor", action: "Rapat koordinasi OPD tentang intervensi stunting", location: "Kantor Kecamatan Kanor", status: "completed" as const },
  { date: "15 Feb 2026", actor: "Camat Sekar", action: "Peninjauan pembangunan embung desa", location: "Desa Bobol", status: "in_progress" as const },
  { date: "14 Feb 2026", actor: "Camat Ngambon", action: "Distribusi BPNT bulan Februari", location: "3 desa di Kec. Ngambon", status: "completed" as const },
  { date: "12 Feb 2026", actor: "Camat Bubulan", action: "Pendampingan KUR Pertanian kelompok tani", location: "Desa Drokilo", status: "in_progress" as const },
  { date: "10 Feb 2026", actor: "Camat Purwosari", action: "Monitoring realisasi PKH triwulan IV", location: "Seluruh desa", status: "verified" as const },
  { date: "8 Feb 2026", actor: "Camat Malo", action: "Tindak lanjut temuan sanitasi STBM", location: "Desa Sudu", status: "follow_up" as const },
  { date: "5 Feb 2026", actor: "Camat Kedungadem", action: "Evaluasi dampak BLT Dana Desa", location: "Kec. Kedungadem", status: "completed" as const },
];

// Monthly trend data
const MONTHLY_TREND = [
  { month: "Sep 25", rate: 22.1 },
  { month: "Okt 25", rate: 21.8 },
  { month: "Nov 25", rate: 21.5 },
  { month: "Des 25", rate: 21.2 },
  { month: "Jan 26", rate: 21.0 },
  { month: "Feb 26", rate: 20.8 },
];

const STATUS_BADGE = {
  active: { label: "Berjalan", className: "bg-severity-low/10 text-severity-low border-severity-low/25" },
  completed: { label: "Selesai", className: "bg-primary/10 text-primary border-primary/25" },
  delayed: { label: "Terlambat", className: "bg-severity-high/10 text-severity-high border-severity-high/25" },
};

const LOG_STATUS = {
  verified: { label: "Terverifikasi", color: "text-severity-low" },
  completed: { label: "Selesai", color: "text-primary" },
  in_progress: { label: "Dalam Proses", color: "text-severity-medium" },
  follow_up: { label: "Tindak Lanjut", color: "text-severity-high" },
};

function ScorecardRow({ district }: { district: typeof DISTRICTS[0] }) {
  const avg = Math.round((district.scores.personal + district.scores.social + district.scores.spatial + district.scores.structural) / 4);
  const sev = getSeverity(avg);
  const sevColor = sev === "high" ? "text-severity-high" : sev === "medium" ? "text-severity-medium" : "text-severity-low";
  const trendIcon = district.trend === "improving" ? <TrendingDown className="h-3 w-3 text-severity-low" /> : district.trend === "worsening" ? <TrendingUp className="h-3 w-3 text-severity-high" /> : <Minus className="h-3 w-3 text-severity-medium" />;
  
  // Mock performance score (0-100)
  const perfScore = Math.max(20, 100 - avg + (district.trend === "improving" ? 15 : district.trend === "worsening" ? -10 : 0));
  const perfColor = perfScore >= 70 ? "text-severity-low" : perfScore >= 45 ? "text-severity-medium" : "text-severity-high";

  return (
    <tr className="border-t border-border hover:bg-muted/30 transition-colors">
      <td className="px-4 py-3 font-semibold text-foreground">{district.name}</td>
      <td className="px-4 py-3 text-center">
        <span className={`font-bold mono ${sevColor}`}>{avg}</span>
      </td>
      <td className="px-4 py-3 text-center">{district.povertyRate}%</td>
      <td className="px-4 py-3 text-center">
        <div className="flex items-center justify-center gap-1">
          {trendIcon}
          <span className="text-xs">{district.trend === "improving" ? "Membaik" : district.trend === "worsening" ? "Memburuk" : "Stabil"}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${perfScore}%` }} />
          </div>
          <span className={`text-xs font-bold mono ${perfColor}`}>{perfScore}</span>
        </div>
      </td>
    </tr>
  );
}

export default function MonevPage() {
  const [programFilter, setProgramFilter] = useState<"all" | "active" | "completed" | "delayed">("all");

  const filteredPrograms = PROGRAMS.filter(p => programFilter === "all" || p.status === programFilter);
  const totalBudget = PROGRAMS.reduce((s, p) => s + p.budget, 0);
  const totalTarget = PROGRAMS.reduce((s, p) => s + p.target, 0);
  const totalRealized = PROGRAMS.reduce((s, p) => s + p.realized, 0);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Page title */}
        <div>
          <h1 className="text-xl font-bold text-foreground">Monitoring & Evaluasi</h1>
          <p className="text-sm text-muted-foreground">Pantau pelaksanaan dan capaian program penanggulangan kemiskinan</p>
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="dashboard-card p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Program</p>
            <p className="text-3xl font-bold text-foreground">{PROGRAMS.length}</p>
            <p className="text-xs text-muted-foreground mt-1">{PROGRAMS.filter(p => p.status === "active").length} aktif · {PROGRAMS.filter(p => p.status === "completed").length} selesai</p>
          </div>
          <div className="dashboard-card p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Anggaran</p>
            <p className="text-3xl font-bold text-foreground">Rp {(totalBudget / 1_000_000_000).toFixed(0)}M</p>
            <p className="text-xs text-muted-foreground mt-1">Miliar rupiah</p>
          </div>
          <div className="dashboard-card p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Realisasi Penerima</p>
            <p className="text-3xl font-bold text-severity-low">{(totalRealized / 1000).toFixed(1)}K</p>
            <p className="text-xs text-muted-foreground mt-1">dari target {(totalTarget / 1000).toFixed(1)}K ({Math.round(totalRealized / totalTarget * 100)}%)</p>
          </div>
          <div className="dashboard-card p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Tren Kemiskinan</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-severity-low">{MONTHLY_TREND[MONTHLY_TREND.length - 1].rate}%</p>
              <TrendingDown className="h-5 w-5 text-severity-low mb-1" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Turun dari {MONTHLY_TREND[0].rate}% (6 bulan)</p>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="dashboard-card p-5">
          <h3 className="font-bold text-foreground text-sm mb-1">Tren Tingkat Kemiskinan Kabupaten</h3>
          <p className="text-xs text-muted-foreground mb-4">6 bulan terakhir</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={MONTHLY_TREND} margin={{ left: 0, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215 20% 48%)" }} />
              <YAxis domain={[19, 23]} tick={{ fontSize: 11, fill: "hsl(215 20% 48%)" }} tickFormatter={v => `${v}%`} />
              <Tooltip formatter={(v) => [`${v}%`, "Tingkat Kemiskinan"]} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Line type="monotone" dataKey="rate" stroke="hsl(200 72% 28%)" strokeWidth={2.5} dot={{ fill: "hsl(200 72% 28%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Programs Timeline */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Timeline Program & Capaian</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Filter */}
          <div className="flex gap-1.5 mb-4">
            {([["all", "Semua"], ["active", "Berjalan"], ["completed", "Selesai"], ["delayed", "Terlambat"]] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setProgramFilter(val)}
                className={`px-3 py-1 text-xs rounded-full font-semibold transition-colors ${programFilter === val ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredPrograms.map(prog => {
              const pct = Math.round(prog.realized / prog.target * 100);
              const badge = STATUS_BADGE[prog.status];
              return (
                <div key={prog.id} className="dashboard-card p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h4 className="font-bold text-foreground text-sm">{prog.name}</h4>
                      <p className="text-xs text-muted-foreground">{prog.category} · {prog.startDate} — {prog.endDate}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border self-start ${badge.className}`}>
                      {badge.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Realisasi: {prog.realized.toLocaleString("id-ID")} / {prog.target.toLocaleString("id-ID")}</span>
                        <span className={`font-bold ${pct >= 80 ? "text-severity-low" : pct >= 50 ? "text-severity-medium" : "text-severity-high"}`}>{pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${pct >= 80 ? "bg-severity-low" : pct >= 50 ? "bg-severity-medium" : "bg-severity-high"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Anggaran</p>
                      <p className="text-sm font-bold text-foreground">Rp {(prog.budget / 1_000_000_000).toFixed(1)}M</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Log */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Log Aktivitas Lapangan</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="dashboard-card overflow-hidden">
            <div className="divide-y divide-border">
              {ACTIVITY_LOG.map((log, i) => {
                const st = LOG_STATUS[log.status];
                return (
                  <div key={i} className="px-4 py-3 flex items-start gap-3 hover:bg-muted/30 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`h-2 w-2 rounded-full ${log.status === "verified" ? "bg-severity-low" : log.status === "completed" ? "bg-primary" : log.status === "in_progress" ? "bg-severity-medium" : "bg-severity-high"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{log.action}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{log.actor} · {log.location}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-muted-foreground">{log.date}</p>
                      <p className={`text-xs font-medium ${st.color}`}>{st.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scorecard */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Scorecard Kecamatan</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="dashboard-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 text-muted-foreground text-xs">
                    <th className="text-left px-4 py-3 font-semibold">Kecamatan</th>
                    <th className="text-center px-4 py-3 font-semibold">Indeks Kemiskinan</th>
                    <th className="text-center px-4 py-3 font-semibold">% Kemiskinan</th>
                    <th className="text-center px-4 py-3 font-semibold">Tren</th>
                    <th className="text-center px-4 py-3 font-semibold">Skor Kinerja</th>
                  </tr>
                </thead>
                <tbody>
                  {[...DISTRICTS]
                    .sort((a, b) => {
                      const avgA = (a.scores.personal + a.scores.social + a.scores.spatial + a.scores.structural) / 4;
                      const avgB = (b.scores.personal + b.scores.social + b.scores.spatial + b.scores.structural) / 4;
                      return avgB - avgA;
                    })
                    .slice(0, 10)
                    .map(d => <ScorecardRow key={d.id} district={d} />)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <footer className="text-center py-6 text-xs text-muted-foreground border-t border-border">
          <p>© 2026 CAMAT (Cermat & Tepat) · Alat Bantu Kepemimpinan Wilayah · Kabupaten Bojonegoro</p>
        </footer>
      </main>
    </div>
  );
}
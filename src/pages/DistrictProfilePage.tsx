import { useParams, useNavigate, Link } from "react-router-dom";
import { DISTRICTS, POVERTY_TYPES, getSeverity, getSeverityLabel } from "@/data/districts";
import { getDistrictProfile } from "@/data/districtProfiles";
import { getVillagesByDistrict } from "@/data/villages";

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import {
  ArrowLeft, Users, Home, TrendingDown, TrendingUp, Minus,
  GraduationCap, Briefcase, MapPin, AlertTriangle, Zap, Droplets,
  ChevronRight, BarChart2, BookOpen, Building2, Map as MapIcon
} from "lucide-react";
import VillageMap from "@/components/map/VillageMap";
import PovertyDimensionTooltip from "@/components/dashboard/PovertyDimensionTooltip";
import { DIMENSION_DEFINITIONS, getDistrictSubScores } from "@/data/povertyIndicators";

const TREND_ICON = {
  improving: <TrendingDown className="h-4 w-4 text-severity-low" />,
  stable: <Minus className="h-4 w-4 text-severity-medium" />,
  worsening: <TrendingUp className="h-4 w-4 text-severity-high" />,
};
const TREND_LABEL = { improving: "Membaik", stable: "Stabil", worsening: "Memburuk" };
const TREND_BG = {
  improving: "bg-severity-low/10 text-severity-low border-severity-low/25",
  stable: "bg-severity-medium/10 text-severity-medium border-severity-medium/25",
  worsening: "bg-severity-high/10 text-severity-high border-severity-high/25",
};

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-primary">{icon}</span>
      <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">{title}</h3>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function StatBox({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="dashboard-card p-3">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-lg font-bold text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}

export default function DistrictProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const district = DISTRICTS.find(d => d.id === id);
  const profile = getDistrictProfile(id ?? "");
  const villages = getVillagesByDistrict(id ?? "");

  if (!district || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Kecamatan tidak ditemukan.</p>
          <button onClick={() => navigate("/")} className="text-primary underline">Kembali ke dashboard</button>
        </div>
      </div>
    );
  }

  const avg = Math.round((district.scores.personal + district.scores.social + district.scores.spatial + district.scores.structural) / 4);
  const overallSeverity = getSeverity(avg);

  const radarData = POVERTY_TYPES.map(pt => ({
    subject: pt.shortLabel,
    score: district.scores[pt.key],
    fullMark: 100,
  }));

  const eduData = [
    { label: "Tidak sekolah", pct: profile.education.neverSchool },
    { label: "SD ke bawah", pct: profile.education.elementaryBelow },
    { label: "SMP", pct: profile.education.junior },
    { label: "SMA/SMK", pct: profile.education.senior },
    { label: "Diploma/S1+", pct: profile.education.diploma },
  ];

  return (
    <>

      {/* Breadcrumb */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 pt-4">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">Profil Kecamatan {district.name}</span>
        </nav>
      </div>

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-4 space-y-6">
        {/* Hero */}
        <div className="dashboard-card p-5">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Kabupaten Bojonegoro</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Kecamatan {district.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">ID: {district.id.toUpperCase()} · Diperbarui: {district.lastUpdated}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${TREND_BG[district.trend]}`}>
                  {TREND_ICON[district.trend]}
                  Tren: {TREND_LABEL[district.trend]}
                </span>
                <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold border ${overallSeverity === "high" ? "bg-severity-high/10 text-severity-high border-severity-high/25" : overallSeverity === "medium" ? "bg-severity-medium/10 text-severity-medium border-severity-medium/25" : "bg-severity-low/10 text-severity-low border-severity-low/25"}`}>
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Indeks: {avg} — {getSeverityLabel(avg)}
                </span>
              </div>

              {/* Diagnosis */}
              <div className="mt-4 bg-primary/5 border border-primary/15 rounded-lg p-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Diagnosis Kecamatan</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{profile.diagnosis}</p>
              </div>
            </div>

            {/* Radar */}
            <div className="w-full md:w-64 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(210 20% 87%)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "hsl(215 35% 30%)" }} />
                  <Radar dataKey="score" stroke="hsl(200 72% 28%)" fill="hsl(200 72% 28% / 0.25)" strokeWidth={2} />
                  <Tooltip formatter={(v) => [`${v}`, "Skor"]} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatBox label="Penduduk" value={district.population.toLocaleString("id-ID")} sub={`${profile.totalHouseholds.toLocaleString("id-ID")} KK`} />
          <StatBox label="KK Miskin" value={district.poorFamilies.toLocaleString("id-ID")} sub={`${district.povertyRate}% dari penduduk`} />
          <StatBox label="Luas Wilayah" value={`${profile.areaKm2} km²`} sub={`Rata-rata HH: ${profile.avgHouseholdSize} jiwa`} />
          <StatBox label="Pendapatan Rata-rata" value={`Rp ${(profile.avgMonthlyIncome / 1000).toFixed(0)}rb/bln`} sub={`Akses kredit: ${profile.accessToCredit}%`} />
        </div>

        {/* 4 Poverty Scores */}
        <div>
          <SectionTitle icon={<BarChart2 className="h-4 w-4" />} title="Skor 4 Dimensi Kemiskinan" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {POVERTY_TYPES.map(pt => {
              const score = district.scores[pt.key];
              const sev = getSeverity(score);
              const sevColor = sev === "high" ? "hsl(var(--severity-high))" : sev === "medium" ? "hsl(var(--severity-medium))" : "hsl(var(--severity-low))";
              return (
                <PovertyDimensionTooltip key={pt.key} dimensionKey={pt.key} score={score} districtId={district.id} districtScores={district.scores}>
                  <div className="dashboard-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: pt.color }} />
                      <span className="text-xs font-medium text-muted-foreground">{pt.label}</span>
                    </div>
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-2xl font-bold" style={{ color: sevColor }}>{score}</span>
                      <span className="text-xs text-muted-foreground mb-1">/100</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: pt.color }} />
                    </div>
                    <p className="text-xs font-semibold mt-2" style={{ color: sevColor }}>{getSeverityLabel(score)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{pt.description}</p>
                  </div>
                </PovertyDimensionTooltip>
              );
            })}
          </div>
        </div>

        {/* Key Issues */}
        <div>
          <SectionTitle icon={<AlertTriangle className="h-4 w-4" />} title="Isu Kunci Wilayah" />
          <div className="grid sm:grid-cols-2 gap-2">
            {profile.keyIssues.map((issue, i) => (
              <div key={i} className="flex items-start gap-3 dashboard-card p-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-severity-high/10 text-severity-high text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-sm text-foreground">{issue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2-col: Education + Livelihood */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Education */}
          <div>
            <SectionTitle icon={<GraduationCap className="h-4 w-4" />} title="Profil Pendidikan" />
            <div className="dashboard-card p-4 space-y-3">
              {eduData.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-foreground">{item.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/60 transition-all"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-border grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Stunting Balita</p>
                  <p className={`font-bold text-lg ${profile.stunting >= 30 ? "text-severity-high" : profile.stunting >= 20 ? "text-severity-medium" : "text-severity-low"}`}>{profile.stunting}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Angka Kematian Bayi</p>
                  <p className={`font-bold text-lg ${profile.childMortality >= 28 ? "text-severity-high" : profile.childMortality >= 18 ? "text-severity-medium" : "text-severity-low"}`}>{profile.childMortality}/1000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Livelihood */}
          <div>
            <SectionTitle icon={<Briefcase className="h-4 w-4" />} title="Mata Pencaharian" />
            <div className="dashboard-card p-4 space-y-3">
              {profile.livelihood.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-foreground">{item.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${item.pct}%`, background: `hsl(${200 - i * 30} 60% 45%)` }} />
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-border grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Sanitasi Layak</p>
                  <p className={`font-bold text-lg ${profile.sanitationAccess < 45 ? "text-severity-high" : profile.sanitationAccess < 65 ? "text-severity-medium" : "text-severity-low"}`}>{profile.sanitationAccess}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Akses Listrik</p>
                  <p className={`font-bold text-lg ${profile.electricityAccess < 88 ? "text-severity-medium" : "text-severity-low"}`}>{profile.electricityAccess}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spatial */}
        <div>
          <SectionTitle icon={<MapPin className="h-4 w-4" />} title="Profil Wilayah & Spasial" />
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="dashboard-card p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Penggunaan Lahan</h4>
              <div className="space-y-2">
                {profile.landUseBreakdown.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground">{item.label}</span>
                      <span className="font-semibold">{item.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${item.pct}%`, background: `hsl(${120 + i * 40} 50% 45%)` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Sungai utama:</span> {profile.mainRiver}
              </div>
            </div>
            <div className="dashboard-card p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Risiko Bencana</h4>
              <div className="space-y-2">
                {profile.disasterRisks.map((risk, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-md bg-severity-high/5 border border-severity-high/15">
                    <AlertTriangle className="h-3.5 w-3.5 text-severity-high flex-shrink-0" />
                    <span className="text-sm text-foreground">{risk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sub-Indicator Breakdown */}
        <div>
          <SectionTitle icon={<BarChart2 className="h-4 w-4" />} title="Breakdown Sub-Indikator per Dimensi" />
          <div className="grid md:grid-cols-2 gap-4">
            {DIMENSION_DEFINITIONS.map(dim => {
              const dimScore = district.scores[dim.key];
              const subScoresData = getDistrictSubScores(district.id, district.scores).dimensions[dim.key];
              const dimSev = getSeverity(dimScore);
              const dimSevColor = dimSev === "high" ? "text-severity-high" : dimSev === "medium" ? "text-severity-medium" : "text-severity-low";
              return (
                <div key={dim.key} className="dashboard-card p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">{dim.label}</h4>
                    <span className={`text-sm font-bold mono ${dimSevColor}`}>{dimScore}/100</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mb-3">{dim.focus}</p>
                  <div className="space-y-2.5">
                    {dim.subCategories.map(sub => {
                      const subScore = subScoresData[sub.id];
                      const subSev = getSeverity(subScore);
                      return (
                        <div key={sub.id}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-foreground">{sub.label}</span>
                            <span className={`text-xs font-bold mono ${subSev === "high" ? "text-severity-high" : subSev === "medium" ? "text-severity-medium" : "text-severity-low"}`}>{subScore}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className={`h-full rounded-full ${subSev === "high" ? "bg-severity-high" : subSev === "medium" ? "bg-severity-medium" : "bg-severity-low"}`} style={{ width: `${subScore}%` }} />
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{sub.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interventions */}
        <div>
          <SectionTitle icon={<Zap className="h-4 w-4" />} title="Opsi Intervensi yang Direkomendasikan" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {profile.recommendedInterventions.map((item, i) => (
              <div key={i} className="flex items-start gap-3 dashboard-card p-3 border-l-4 border-l-primary">
                <Zap className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Village Map */}
        <div>
          <SectionTitle icon={<MapIcon className="h-4 w-4" />} title={`Peta Desa di Kecamatan ${district.name}`} />
          <div className="dashboard-card p-3 h-[420px]">
            <VillageMap districtId={district.id} />
          </div>
        </div>

        {/* Villages */}
        <div>
          <SectionTitle icon={<Building2 className="h-4 w-4" />} title={`Sebaran Kemiskinan per Desa (${villages.length} desa)`} />
          <div className="dashboard-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Desa</th>
                    <th className="px-4 py-2.5 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">Penduduk</th>
                    <th className="px-4 py-2.5 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">KK Miskin</th>
                    <th className="px-4 py-2.5 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">% Miskin</th>
                    <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Tren</th>
                    <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {villages.map((v, i) => {
                    const avg = Math.round((v.scores.personal + v.scores.social + v.scores.spatial + v.scores.structural) / 4);
                    const sev = getSeverity(avg);
                    return (
                      <tr key={v.id} className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                        <td className="px-4 py-3 font-medium text-foreground">{v.name}</td>
                        <td className="px-4 py-3 text-right text-muted-foreground">{v.population.toLocaleString("id-ID")}</td>
                        <td className="px-4 py-3 text-right font-semibold text-foreground">{v.poorFamilies.toLocaleString("id-ID")}</td>
                        <td className="px-4 py-3 text-right">
                          <span className={`font-bold ${sev === "high" ? "text-severity-high" : sev === "medium" ? "text-severity-medium" : "text-severity-low"}`}>{v.povertyRate}%</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${v.trend === "improving" ? "bg-severity-low/10 text-severity-low" : v.trend === "worsening" ? "bg-severity-high/10 text-severity-high" : "bg-severity-medium/10 text-severity-medium"}`}>
                            {TREND_ICON[v.trend]}
                            {TREND_LABEL[v.trend]}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => navigate(`/village/${v.id}`)}
                            className="text-xs text-primary hover:underline font-medium flex items-center gap-1"
                          >
                            Profil Desa <ChevronRight className="h-3 w-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <footer className="text-center py-6 text-xs text-muted-foreground border-t border-border">
          <p>© 2026 CAMAT · Alat Bantu Kepemimpinan Wilayah · Kabupaten Bojonegoro</p>
        </footer>
      </main>
    </>
  );
}

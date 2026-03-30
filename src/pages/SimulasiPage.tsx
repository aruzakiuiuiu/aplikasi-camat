import { useState, useMemo } from "react";

import { DISTRICTS, POVERTY_TYPES, getSeverity, getSeverityLabel } from "@/data/districts";
import { getDistrictProfile } from "@/data/districtProfiles";
import PovertyDimensionTooltip from "@/components/dashboard/PovertyDimensionTooltip";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, Cell
} from "recharts";
import { Zap, TrendingDown, Target, Lightbulb, ChevronDown, Calculator, MapPin } from "lucide-react";

// Intervention types with impact coefficients per poverty dimension
// Aligned with the holistic poverty framework sub-indicators
const INTERVENTIONS = [
  { id: "int-1", name: "Bantuan Sosial Langsung (PKH/BPNT)", category: "Personal", impacts: { personal: -8, social: -3, spatial: 0, structural: -2 }, cost: "Rp 2.4jt/KK/thn", timeframe: "3–6 bulan", targetDimension: "Pendapatan RT, kerentanan keluarga" },
  { id: "int-2", name: "Program Stunting & Gizi Anak", category: "Personal", impacts: { personal: -12, social: -5, spatial: 0, structural: -3 }, cost: "Rp 5jt/anak/thn", timeframe: "6–18 bulan", targetDimension: "Kesehatan keluarga, gizi" },
  { id: "int-3", name: "Pembangunan Infrastruktur Air Bersih", category: "Kawasan", impacts: { personal: -3, social: -2, spatial: -15, structural: -5 }, cost: "Rp 350jt/embung", timeframe: "6–12 bulan", targetDimension: "Infrastruktur lingkungan, SDA" },
  { id: "int-4", name: "Rehabilitasi Jalan Desa", category: "Kawasan", impacts: { personal: -2, social: -4, spatial: -10, structural: -6 }, cost: "Rp 500jt/km", timeframe: "3–9 bulan", targetDimension: "Aksesibilitas fisik, permukiman" },
  { id: "int-5", name: "KUR & Pemberdayaan Ekonomi", category: "Sosial", impacts: { personal: -6, social: -5, spatial: -1, structural: -8 }, cost: "Rp 10jt/KK", timeframe: "6–24 bulan", targetDimension: "Akses ekonomi, peluang ekonomi lokal" },
  { id: "int-6", name: "Sanitasi Total Berbasis Masyarakat", category: "Kawasan", impacts: { personal: -5, social: -8, spatial: -12, structural: -4 }, cost: "Rp 15jt/desa", timeframe: "3–12 bulan", targetDimension: "Sanitasi, infrastruktur lingkungan" },
  { id: "int-7", name: "Peningkatan Kualitas Pendidikan", category: "Personal", impacts: { personal: -10, social: -7, spatial: 0, structural: -5 }, cost: "Rp 50jt/sekolah/thn", timeframe: "12–36 bulan", targetDimension: "Pendidikan & literasi, produktivitas" },
  { id: "int-8", name: "Penguatan Tata Kelola Desa", category: "Struktural", impacts: { personal: -2, social: -3, spatial: -2, structural: -14 }, cost: "Rp 25jt/desa/thn", timeframe: "6–18 bulan", targetDimension: "Kapasitas kelembagaan, koordinasi" },
  { id: "int-9", name: "Diversifikasi Pertanian", category: "Sosial", impacts: { personal: -7, social: -4, spatial: -6, structural: -3 }, cost: "Rp 8jt/KK", timeframe: "6–24 bulan", targetDimension: "Mata pencaharian, struktur ekonomi" },
  { id: "int-10", name: "Mitigasi Bencana & Adaptasi Iklim", category: "Kawasan", impacts: { personal: -1, social: -3, spatial: -18, structural: -6 }, cost: "Rp 200jt/desa", timeframe: "12–36 bulan", targetDimension: "Kondisi geografis, risiko bencana" },
  { id: "int-11", name: "Pemberdayaan Perempuan & Kesetaraan", category: "Sosial", impacts: { personal: -5, social: -10, spatial: 0, structural: -4 }, cost: "Rp 12jt/kelompok", timeframe: "6–18 bulan", targetDimension: "Peran perempuan, modal sosial" },
  { id: "int-12", name: "Integrasi Data & Sistem Informasi", category: "Struktural", impacts: { personal: -1, social: -2, spatial: -1, structural: -12 }, cost: "Rp 50jt/sistem", timeframe: "6–12 bulan", targetDimension: "Integrasi data, efektivitas kebijakan" },
];

export default function SimulasiPage() {
  const [selectedDistrictId, setSelectedDistrictId] = useState(DISTRICTS[0].id);
  const [selectedInterventions, setSelectedInterventions] = useState<string[]>([]);
  const [intensities, setIntensities] = useState<Record<string, number>>({});

  const district = DISTRICTS.find(d => d.id === selectedDistrictId)!;
  const profile = getDistrictProfile(selectedDistrictId);

  const toggleIntervention = (id: string) => {
    setSelectedInterventions(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    if (!intensities[id]) setIntensities(prev => ({ ...prev, [id]: 50 }));
  };

  const projectedScores = useMemo(() => {
    const base = { ...district.scores };
    const projected = { personal: base.personal, social: base.social, spatial: base.spatial, structural: base.structural };

    selectedInterventions.forEach(intId => {
      const intervention = INTERVENTIONS.find(i => i.id === intId);
      if (!intervention) return;
      const intensity = (intensities[intId] || 50) / 100;
      projected.personal = Math.max(0, projected.personal + intervention.impacts.personal * intensity);
      projected.social = Math.max(0, projected.social + intervention.impacts.social * intensity);
      projected.spatial = Math.max(0, projected.spatial + intervention.impacts.spatial * intensity);
      projected.structural = Math.max(0, projected.structural + intervention.impacts.structural * intensity);
    });

    return {
      personal: Math.round(projected.personal),
      social: Math.round(projected.social),
      spatial: Math.round(projected.spatial),
      structural: Math.round(projected.structural),
    };
  }, [district, selectedInterventions, intensities]);

  const currentAvg = Math.round((district.scores.personal + district.scores.social + district.scores.spatial + district.scores.structural) / 4);
  const projectedAvg = Math.round((projectedScores.personal + projectedScores.social + projectedScores.spatial + projectedScores.structural) / 4);
  const improvement = currentAvg - projectedAvg;

  // Projected poverty rate (simplified linear model)
  const projectedPovertyRate = Math.max(0, +(district.povertyRate * (projectedAvg / currentAvg)).toFixed(1));
  const povertyReduction = +(district.povertyRate - projectedPovertyRate).toFixed(1);

  // Recommendation: top 3 interventions sorted by total impact for this district
  const recommendations = useMemo(() => {
    return [...INTERVENTIONS]
      .map(int => {
        const totalImpact = Math.abs(int.impacts.personal) + Math.abs(int.impacts.social) + Math.abs(int.impacts.spatial) + Math.abs(int.impacts.structural);
        // Weight by district's weakest areas
        const scores = district.scores;
        const weighted = (Math.abs(int.impacts.personal) * scores.personal + Math.abs(int.impacts.social) * scores.social + Math.abs(int.impacts.spatial) * scores.spatial + Math.abs(int.impacts.structural) * scores.structural) / 100;
        return { ...int, totalImpact, weighted };
      })
      .sort((a, b) => b.weighted - a.weighted)
      .slice(0, 3);
  }, [district]);

  const radarData = POVERTY_TYPES.map(pt => ({
    subject: pt.shortLabel,
    current: district.scores[pt.key],
    projected: projectedScores[pt.key],
    fullMark: 100,
  }));

  const comparisonData = POVERTY_TYPES.map(pt => ({
    name: pt.shortLabel,
    current: district.scores[pt.key],
    projected: projectedScores[pt.key],
    color: pt.color,
  }));

  return (
    <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Simulasi Intervensi</h1>
          <p className="text-sm text-muted-foreground">Proyeksikan dampak intervensi terhadap penurunan kemiskinan per kecamatan</p>
        </div>

        {/* District selector */}
        <div className="dashboard-card p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Pilih Kecamatan</label>
              <div className="relative">
                <select
                  value={selectedDistrictId}
                  onChange={e => { setSelectedDistrictId(e.target.value); setSelectedInterventions([]); }}
                  className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
                >
                  {DISTRICTS.map(d => (
                    <option key={d.id} value={d.id}>Kec. {d.name} — {d.povertyRate}% kemiskinan</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
              {POVERTY_TYPES.map(pt => (
                <PovertyDimensionTooltip key={pt.key} dimensionKey={pt.key} score={district.scores[pt.key]} districtId={district.id} districtScores={district.scores}>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">{pt.shortLabel}</p>
                    <p className="text-lg font-bold" style={{ color: pt.color }}>{district.scores[pt.key]}</p>
                  </div>
                </PovertyDimensionTooltip>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Intervention selection */}
          <div className="lg:col-span-2 space-y-4">
            {/* Recommendations */}
            <div className="dashboard-card p-4 border-l-4 border-l-accent">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-accent" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Rekomendasi Intervensi</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Berdasarkan profil kemiskinan Kec. {district.name}, sistem merekomendasikan:</p>
              <div className="space-y-2">
                {recommendations.map((rec, i) => (
                  <button
                    key={rec.id}
                    onClick={() => toggleIntervention(rec.id)}
                    className={`w-full text-left flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                      selectedInterventions.includes(rec.id) ? "bg-primary/10 border-primary/30" : "bg-muted/30 border-border hover:bg-muted/50"
                    }`}
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-accent text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{rec.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary mr-1">{rec.category}</span>
                        Dampak: -{rec.totalImpact} poin · {rec.cost} · {rec.timeframe}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Target: {rec.targetDimension}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* All interventions */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Pilih Intervensi</h3>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {INTERVENTIONS.map(int => {
                  const isSelected = selectedInterventions.includes(int.id);
                  return (
                    <div key={int.id} className={`dashboard-card p-3 transition-all cursor-pointer ${isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/30"}`}>
                      <div className="flex items-start gap-2" onClick={() => toggleIntervention(int.id)}>
                        <div className={`h-4 w-4 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${isSelected ? "bg-primary border-primary" : "border-border"}`}>
                          {isSelected && <span className="text-primary-foreground text-xs">✓</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{int.name}</p>
                          <p className="text-xs text-muted-foreground">
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-muted text-muted-foreground mr-1">{int.category}</span>
                            {int.cost} · {int.timeframe}
                          </p>
                          <p className="text-[10px] text-muted-foreground">Target: {int.targetDimension}</p>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="mt-3 pl-6">
                          <label className="text-xs text-muted-foreground">Intensitas: {intensities[int.id] || 50}%</label>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            step="10"
                            value={intensities[int.id] || 50}
                            onChange={e => setIntensities(prev => ({ ...prev, [int.id]: Number(e.target.value) }))}
                            className="w-full h-1.5 rounded-full appearance-none bg-muted cursor-pointer accent-primary"
                          />
                          <div className="flex justify-between text-[10px] text-muted-foreground">
                            <span>Rendah</span><span>Tinggi</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Projection results */}
          <div className="space-y-4">
            {/* Summary */}
            <div className="dashboard-card p-4 sticky top-4">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Hasil Proyeksi</h3>
              </div>

              {selectedInterventions.length === 0 ? (
                <p className="text-sm text-muted-foreground italic py-4 text-center">Pilih intervensi untuk melihat proyeksi dampak</p>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">Indeks Saat Ini</p>
                      <p className="text-2xl font-bold text-foreground">{currentAvg}</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-severity-low/10">
                      <p className="text-xs text-muted-foreground">Proyeksi</p>
                      <p className="text-2xl font-bold text-severity-low">{projectedAvg}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-4 p-3 rounded-lg bg-severity-low/5 border border-severity-low/20">
                    <TrendingDown className="h-5 w-5 text-severity-low" />
                    <div className="text-center">
                      <p className="text-lg font-bold text-severity-low">-{improvement} poin</p>
                      <p className="text-xs text-muted-foreground">Penurunan indeks kemiskinan</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Tingkat kemiskinan saat ini</span>
                      <span className="font-bold text-foreground">{district.povertyRate}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Proyeksi setelah intervensi</span>
                      <span className="font-bold text-severity-low">{projectedPovertyRate}%</span>
                    </div>
                    <div className="flex justify-between text-xs border-t border-border pt-2">
                      <span className="font-semibold text-foreground">Estimasi penurunan</span>
                      <span className="font-bold text-severity-low">-{povertyReduction}%</span>
                    </div>
                  </div>

                  {/* Radar comparison */}
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Perbandingan 4 Dimensi</p>
                    <ResponsiveContainer width="100%" height={200}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="hsl(210 20% 87%)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(215 20% 48%)" }} />
                        <Radar name="Saat Ini" dataKey="current" stroke="hsl(0 72% 54%)" fill="hsl(0 72% 54% / 0.15)" strokeWidth={2} />
                        <Radar name="Proyeksi" dataKey="projected" stroke="hsl(142 60% 42%)" fill="hsl(142 60% 42% / 0.15)" strokeWidth={2} />
                        <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                      </RadarChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 text-xs">
                      <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-severity-high" />Saat Ini</span>
                      <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-severity-low" />Proyeksi</span>
                    </div>
                  </div>

                  {/* Per-dimension breakdown */}
                  <div className="space-y-2">
                    {POVERTY_TYPES.map(pt => {
                      const cur = district.scores[pt.key];
                      const proj = projectedScores[pt.key];
                      const diff = cur - proj;
                      return (
                        <div key={pt.key} className="flex items-center gap-2 text-xs">
                          <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: pt.color }} />
                          <span className="text-muted-foreground w-16 truncate">{pt.shortLabel}</span>
                          <span className="font-bold text-foreground w-6 text-right">{cur}</span>
                          <span className="text-muted-foreground">→</span>
                          <span className="font-bold text-severity-low w-6">{proj}</span>
                          <span className="text-severity-low font-semibold">(-{diff})</span>
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-[10px] text-muted-foreground mt-4 italic">
                    * Proyeksi menggunakan model estimasi sederhana. Dampak aktual bergantung pada pelaksanaan, konteks lokal, dan faktor eksternal.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <footer className="text-center py-6 text-xs text-muted-foreground border-t border-border">
          <p>© 2026 CAMAT (Cermat & Tepat) · Alat Bantu Kepemimpinan Wilayah · Kabupaten Bojonegoro</p>
        </footer>
    </main>
  );
}
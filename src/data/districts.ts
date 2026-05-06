export type PovertyScale = {
  personal: number;      // 0–100 index (higher = worse) — Personal & Keluarga
  social: number;        // Lingkungan Sosial
  spatial: number;       // Kawasan (Spasial & Lingkungan Fisik)
  structural: number;    // Tata Kelola Struktural
};

export type District = {
  id: string;
  name: string;
  population: number;
  poorFamilies: number;
  povertyRate: number;   // percentage
  scores: PovertyScale;
  trend: "improving" | "stable" | "worsening";
  lastUpdated: string;
};

export const DISTRICTS: District[] = [
  { id: "bjn-01", name: "Bojonegoro", population: 112_450, poorFamilies: 8_210, povertyRate: 12.4, scores: { personal: 42, social: 35, spatial: 28, structural: 30 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-02", name: "Balen", population: 67_320, poorFamilies: 6_890, povertyRate: 18.2, scores: { personal: 62, social: 48, spatial: 55, structural: 52 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-03", name: "Malo", population: 42_100, poorFamilies: 5_540, povertyRate: 22.1, scores: { personal: 72, social: 58, spatial: 68, structural: 64 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-04", name: "Purwosari", population: 38_700, poorFamilies: 4_860, povertyRate: 21.3, scores: { personal: 70, social: 55, spatial: 74, structural: 60 }, trend: "worsening", lastUpdated: "Feb 2026" },
  { id: "bjn-05", name: "Trucuk", population: 55_890, poorFamilies: 7_120, povertyRate: 20.8, scores: { personal: 68, social: 52, spatial: 60, structural: 55 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-06", name: "Dander", population: 61_230, poorFamilies: 6_340, povertyRate: 17.6, scores: { personal: 58, social: 44, spatial: 50, structural: 48 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-07", name: "Kalitidu", population: 49_800, poorFamilies: 5_980, povertyRate: 19.4, scores: { personal: 64, social: 50, spatial: 70, structural: 46 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-08", name: "Kanor", population: 58_450, poorFamilies: 7_850, povertyRate: 23.6, scores: { personal: 76, social: 68, spatial: 62, structural: 70 }, trend: "worsening", lastUpdated: "Feb 2026" },
  { id: "bjn-09", name: "Kepohbaru", population: 44_670, poorFamilies: 5_230, povertyRate: 19.7, scores: { personal: 65, social: 54, spatial: 78, structural: 58 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-10", name: "Kedungadem", population: 72_100, poorFamilies: 9_870, povertyRate: 24.8, scores: { personal: 80, social: 66, spatial: 72, structural: 74 }, trend: "worsening", lastUpdated: "Feb 2026" },
  { id: "bjn-11", name: "Margomulyo", population: 29_340, poorFamilies: 4_120, povertyRate: 23.4, scores: { personal: 74, social: 62, spatial: 82, structural: 68 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-12", name: "Ngraho", population: 51_200, poorFamilies: 6_780, povertyRate: 21.7, scores: { personal: 70, social: 58, spatial: 76, structural: 62 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-13", name: "Ngasem", population: 64_500, poorFamilies: 7_200, povertyRate: 19.0, scores: { personal: 63, social: 50, spatial: 56, structural: 54 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-14", name: "Padangan", population: 53_880, poorFamilies: 5_640, povertyRate: 17.8, scores: { personal: 58, social: 46, spatial: 52, structural: 50 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-15", name: "Purwoharo", population: 40_110, poorFamilies: 5_920, povertyRate: 22.9, scores: { personal: 75, social: 60, spatial: 66, structural: 66 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-16", name: "Baureno", population: 75_620, poorFamilies: 8_940, povertyRate: 20.2, scores: { personal: 66, social: 56, spatial: 58, structural: 60 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-17", name: "Sugihwaras", population: 47_300, poorFamilies: 6_100, povertyRate: 21.5, scores: { personal: 70, social: 58, spatial: 64, structural: 62 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-18", name: "Temayang", population: 38_950, poorFamilies: 5_480, povertyRate: 22.7, scores: { personal: 73, social: 60, spatial: 80, structural: 64 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-19", name: "Sekar", population: 31_200, poorFamilies: 4_880, povertyRate: 25.1, scores: { personal: 82, social: 64, spatial: 88, structural: 70 }, trend: "worsening", lastUpdated: "Feb 2026" },
  { id: "bjn-20", name: "Bubulan", population: 22_400, poorFamilies: 3_760, povertyRate: 26.3, scores: { personal: 85, social: 68, spatial: 90, structural: 72 }, trend: "worsening", lastUpdated: "Feb 2026" },
  { id: "bjn-21", name: "Gondang", population: 35_800, poorFamilies: 5_120, povertyRate: 23.8, scores: { personal: 76, social: 64, spatial: 72, structural: 68 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-22", name: "Ngambon", population: 18_750, poorFamilies: 3_240, povertyRate: 27.5, scores: { personal: 88, social: 72, spatial: 86, structural: 76 }, trend: "worsening", lastUpdated: "Feb 2026" },
  { id: "bjn-23", name: "Tambakrejo", population: 60_340, poorFamilies: 7_680, povertyRate: 21.0, scores: { personal: 68, social: 54, spatial: 62, structural: 58 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-24", name: "Sumberejo", population: 45_120, poorFamilies: 5_870, povertyRate: 20.6, scores: { personal: 67, social: 52, spatial: 60, structural: 56 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-25", name: "Kapas", population: 58_900, poorFamilies: 6_420, povertyRate: 18.5, scores: { personal: 60, social: 46, spatial: 48, structural: 52 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-26", name: "Kasiman", population: 34_600, poorFamilies: 4_560, povertyRate: 21.4, scores: { personal: 69, social: 56, spatial: 62, structural: 60 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-27", name: "Kedewan", population: 20_110, poorFamilies: 3_180, povertyRate: 25.8, scores: { personal: 83, social: 66, spatial: 84, structural: 68 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-28", name: "Gayam", population: 48_650, poorFamilies: 5_340, povertyRate: 18.8, scores: { personal: 61, social: 48, spatial: 54, structural: 52 }, trend: "improving", lastUpdated: "Feb 2026" },
];

export const POVERTY_TYPES = [
  { key: "personal" as const, label: "Personal & Keluarga", shortLabel: "Personal", color: "hsl(0 72% 54%)", bgClass: "stat-badge-personal", description: "Kemiskinan pada tingkat personal dan keluarga" },
  { key: "social" as const, label: "Lingkungan Sosial", shortLabel: "Sosial", color: "hsl(200 72% 40%)", bgClass: "stat-badge-social", description: "Kemiskinan akibat kondisi lingkungan sosial" },
  { key: "spatial" as const, label: "Kawasan (Spasial & Lingkungan Fisik)", shortLabel: "Kawasan", color: "hsl(34 90% 50%)", bgClass: "stat-badge-spatial", description: "Kemiskinan akibat kondisi kawasan, spasial dan lingkungan fisik" },
  { key: "structural" as const, label: "Tata Kelola Struktural", shortLabel: "Struktural", color: "hsl(270 55% 50%)", bgClass: "stat-badge-structural", description: "Kemiskinan akibat tata kelola dan struktur pemerintahan" },
];

export function getRegencyStats() {
  const total = DISTRICTS.length;
  const totalPoor = DISTRICTS.reduce((s, d) => s + d.poorFamilies, 0);
  const totalPop = DISTRICTS.reduce((s, d) => s + d.population, 0);
  const avgPovRate = DISTRICTS.reduce((s, d) => s + d.povertyRate, 0) / total;
  const improving = DISTRICTS.filter(d => d.trend === "improving").length;
  const worsening = DISTRICTS.filter(d => d.trend === "worsening").length;
  const avgScores: PovertyScale = {
    personal: Math.round(DISTRICTS.reduce((s, d) => s + d.scores.personal, 0) / total),
    social: Math.round(DISTRICTS.reduce((s, d) => s + d.scores.social, 0) / total),
    spatial: Math.round(DISTRICTS.reduce((s, d) => s + d.scores.spatial, 0) / total),
    structural: Math.round(DISTRICTS.reduce((s, d) => s + d.scores.structural, 0) / total),
  };
  return { total, totalPoor, totalPop, avgPovRate, improving, worsening, avgScores };
}

export function getSeverity(score: number): "high" | "medium" | "low" {
  if (score >= 70) return "high";
  if (score >= 45) return "medium";
  return "low";
}

export function getSeverityLabel(score: number) {
  if (score >= 70) return "Tinggi";
  if (score >= 45) return "Sedang";
  return "Rendah";
}

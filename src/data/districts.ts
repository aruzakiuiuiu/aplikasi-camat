export type PovertyScale = {
  personal: number;      // 1–5 index (higher = worse) — Domain Personal-Keluarga
  social: number;        // Domain Sosial-Ekonomi Lokal
  spatial: number;       // Domain Kawasan-Lingkungan
  structural: number;    // Domain Sistem-Kelembagaan
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
  { id: "bjn-01", name: "Bojonegoro", population: 112_450, poorFamilies: 8_210, povertyRate: 12.4, scores: { personal: 3, social: 2, spatial: 2, structural: 2 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-02", name: "Balen", population: 67_320, poorFamilies: 6_890, povertyRate: 18.2, scores: { personal: 4, social: 3, spatial: 3, structural: 3 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-03", name: "Malo", population: 42_100, poorFamilies: 5_540, povertyRate: 22.1, scores: { personal: 4, social: 3, spatial: 4, structural: 4 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-04", name: "Purwosari", population: 38_700, poorFamilies: 4_860, povertyRate: 21.3, scores: { personal: 4, social: 3, spatial: 4, structural: 4 }, trend: "worsening", lastUpdated: "Feb 2026" },
  { id: "bjn-05", name: "Trucuk", population: 55_890, poorFamilies: 7_120, povertyRate: 20.8, scores: { personal: 4, social: 3, spatial: 4, structural: 3 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-06", name: "Dander", population: 61_230, poorFamilies: 6_340, povertyRate: 17.6, scores: { personal: 3, social: 3, spatial: 3, structural: 3 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-07", name: "Kalitidu", population: 49_800, poorFamilies: 5_980, povertyRate: 19.4, scores: { personal: 4, social: 3, spatial: 4, structural: 3 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-08", name: "Kanor", population: 58_450, poorFamilies: 7_850, povertyRate: 23.6, scores: { personal: 5, social: 4, spatial: 4, structural: 4 }, trend: "worsening", lastUpdated: "Feb 2026" },
  { id: "bjn-09", name: "Kepohbaru", population: 44_670, poorFamilies: 5_230, povertyRate: 19.7, scores: { personal: 4, social: 3, spatial: 5, structural: 3 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-10", name: "Kedungadem", population: 72_100, poorFamilies: 9_870, povertyRate: 24.8, scores: { personal: 5, social: 4, spatial: 4, structural: 4 }, trend: "worsening", lastUpdated: "Feb 2026" },
  { id: "bjn-11", name: "Margomulyo", population: 29_340, poorFamilies: 4_120, povertyRate: 23.4, scores: { personal: 4, social: 4, spatial: 5, structural: 4 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-12", name: "Ngraho", population: 51_200, poorFamilies: 6_780, povertyRate: 21.7, scores: { personal: 4, social: 3, spatial: 5, structural: 4 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-13", name: "Ngasem", population: 64_500, poorFamilies: 7_200, povertyRate: 19.0, scores: { personal: 4, social: 3, spatial: 3, structural: 3 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-14", name: "Padangan", population: 53_880, poorFamilies: 5_640, povertyRate: 17.8, scores: { personal: 3, social: 3, spatial: 3, structural: 3 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-15", name: "Sukosewu", population: 40_110, poorFamilies: 5_920, povertyRate: 22.9, scores: { personal: 4, social: 4, spatial: 4, structural: 4 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-16", name: "Baureno", population: 75_620, poorFamilies: 8_940, povertyRate: 20.2, scores: { personal: 4, social: 3, spatial: 3, structural: 4 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-17", name: "Sugihwaras", population: 47_300, poorFamilies: 6_100, povertyRate: 21.5, scores: { personal: 4, social: 3, spatial: 4, structural: 4 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-18", name: "Temayang", population: 38_950, poorFamilies: 5_480, povertyRate: 22.7, scores: { personal: 4, social: 4, spatial: 5, structural: 4 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-19", name: "Sekar", population: 31_200, poorFamilies: 4_880, povertyRate: 25.1, scores: { personal: 5, social: 4, spatial: 5, structural: 4 }, trend: "worsening", lastUpdated: "Feb 2026" },
  { id: "bjn-20", name: "Bubulan", population: 22_400, poorFamilies: 3_760, povertyRate: 26.3, scores: { personal: 5, social: 4, spatial: 5, structural: 4 }, trend: "worsening", lastUpdated: "Feb 2026" },
  { id: "bjn-21", name: "Gondang", population: 35_800, poorFamilies: 5_120, povertyRate: 23.8, scores: { personal: 5, social: 4, spatial: 4, structural: 4 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-22", name: "Ngambon", population: 18_750, poorFamilies: 3_240, povertyRate: 27.5, scores: { personal: 5, social: 4, spatial: 5, structural: 5 }, trend: "worsening", lastUpdated: "Feb 2026" },
  { id: "bjn-23", name: "Tambakrejo", population: 60_340, poorFamilies: 7_680, povertyRate: 21.0, scores: { personal: 4, social: 3, spatial: 4, structural: 3 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-24", name: "Sumberejo", population: 45_120, poorFamilies: 5_870, povertyRate: 20.6, scores: { personal: 4, social: 3, spatial: 4, structural: 3 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-25", name: "Kapas", population: 58_900, poorFamilies: 6_420, povertyRate: 18.5, scores: { personal: 4, social: 3, spatial: 3, structural: 3 }, trend: "improving", lastUpdated: "Feb 2026" },
  { id: "bjn-26", name: "Kasiman", population: 34_600, poorFamilies: 4_560, povertyRate: 21.4, scores: { personal: 4, social: 3, spatial: 4, structural: 4 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-27", name: "Kedewan", population: 20_110, poorFamilies: 3_180, povertyRate: 25.8, scores: { personal: 5, social: 4, spatial: 5, structural: 4 }, trend: "stable", lastUpdated: "Feb 2026" },
  { id: "bjn-28", name: "Gayam", population: 48_650, poorFamilies: 5_340, povertyRate: 18.8, scores: { personal: 4, social: 3, spatial: 3, structural: 3 }, trend: "improving", lastUpdated: "Feb 2026" },
];

export const POVERTY_TYPES = [
  { key: "personal" as const, label: "Domain Personal-Keluarga", shortLabel: "Personal", color: "#e5d8bd", chartColor: "#a07840", bgClass: "stat-badge-personal", description: "Kondisi individu dan rumah tangga yang mempengaruhi kapasitas keluar dari jerat kemiskinan" },
  { key: "social" as const, label: "Domain Sosial-Ekonomi Lokal", shortLabel: "Sosial", color: "#fed9a6", chartColor: "#d4780a", bgClass: "stat-badge-social", description: "Nilai budaya, pola hubungan sosial, dan struktur ekonomi lokal yang mempengaruhi pemerataan kesejahteraan" },
  { key: "spatial" as const, label: "Domain Kawasan-Lingkungan", shortLabel: "Kawasan", color: "#ccebc5", chartColor: "#3d9e3d", bgClass: "stat-badge-spatial", description: "Kondisi geografis, daya dukung lingkungan, dan infrastruktur fisik yang menciptakan kerentanan" },
  { key: "structural" as const, label: "Domain Sistem-Kelembagaan", shortLabel: "Sistem", color: "#decbe4", chartColor: "#8a4fa0", bgClass: "stat-badge-structural", description: "Struktur kebijakan, tata kelola pemerintahan, dan sinergi lintas sektor penanggulangan kemiskinan" },
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

export function getSeverity(score: number): "sangat-tinggi" | "tinggi" | "sedang" | "rendah" | "sangat-rendah" {
  if (score >= 5) return "sangat-tinggi";
  if (score >= 4) return "tinggi";
  if (score >= 3) return "sedang";
  if (score >= 2) return "rendah";
  return "sangat-rendah";
}

export function getSeverityLabel(score: number) {
  if (score >= 5) return "Sangat Tinggi";
  if (score >= 4) return "Tinggi";
  if (score >= 3) return "Sedang";
  if (score >= 2) return "Rendah";
  return "Sangat Rendah";
}

// Helper function to get CSS class names for severity colors
// Maps 5-level severity to visual severity groups for backward compatibility with CSS
export function getSeverityColorClass(severity: "sangat-tinggi" | "tinggi" | "sedang" | "rendah" | "sangat-rendah"): {
  text: string;
  bg: string;
  border: string;
} {
  const severityMap = {
    "sangat-tinggi": { text: "text-severity-high", bg: "bg-severity-high/10", border: "border-severity-high/25" },
    "tinggi": { text: "text-severity-high", bg: "bg-severity-high/10", border: "border-severity-high/25" },
    "sedang": { text: "text-severity-medium", bg: "bg-severity-medium/10", border: "border-severity-medium/25" },
    "rendah": { text: "text-severity-low", bg: "bg-severity-low/10", border: "border-severity-low/25" },
    "sangat-rendah": { text: "text-severity-low", bg: "bg-severity-low/10", border: "border-severity-low/25" },
  };
  return severityMap[severity] || severityMap["sedang"];
}

// Helper function to get hex color for severity level (progress bar / visual fills)
export function getSeverityHexColor(severity: "sangat-tinggi" | "tinggi" | "sedang" | "rendah" | "sangat-rendah"): string {
  const severityColorMap = {
    "sangat-tinggi": "#d7191c",
    "tinggi": "#fdae61",
    "sedang": "#ffffbf",
    "rendah": "#abdda4",
    "sangat-rendah": "#2b83ba",
  };
  return severityColorMap[severity] || "#ffffbf";
}

// Darker variant — readable as text / badge label on light backgrounds
export function getSeverityDarkColor(severity: "sangat-tinggi" | "tinggi" | "sedang" | "rendah" | "sangat-rendah"): string {
  const darkColorMap = {
    "sangat-tinggi": "#c0100e",
    "tinggi":        "#b05010",
    "sedang":        "#8a7200",
    "rendah":        "#1a6b1a",
    "sangat-rendah": "#155090",
  };
  return darkColorMap[severity] || "#8a7200";
}

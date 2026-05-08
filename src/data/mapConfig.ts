// Map configuration, styling constants, and kecamatan name mappings

// Mapping from GeoJSON KECAMATAN field name to district ID in app data
export const KECAMATAN_TO_DISTRICT_ID: Record<string, string> = {
  "Balen":       "bjn-02",
  "Baureno":     "bjn-16",
  "Bojonegoro":  "bjn-01",
  "Bubulan":     "bjn-20",
  "Dander":      "bjn-06",
  "Gayam":       "bjn-28",
  "Gondang":     "bjn-21",
  "Kalitidu":    "bjn-07",
  "Kanor":       "bjn-08",
  "Kapas":       "bjn-25",
  "Kasiman":     "bjn-26",
  "Kedewan":     "bjn-27",
  "Kedungadem":  "bjn-10",
  "Kepohbaru":   "bjn-09",
  "Malo":        "bjn-03",
  "Margomulyo":  "bjn-11",
  "Ngambon":     "bjn-22",
  "Ngasem":      "bjn-13",
  "Ngraho":      "bjn-12",
  "Padangan":    "bjn-14",
  "Purwosari":   "bjn-04",
  "Sekar":       "bjn-19",
  "Sugihwaras":  "bjn-17",
  "Sukosewu":    "bjn-15",
  "Sumberejo":   "bjn-24",
  "Tambakrejo":  "bjn-23",
  "Temayang":    "bjn-18",
  "Trucuk":      "bjn-05",
};

export const DISTRICT_ID_TO_KECAMATAN: Record<string, string> = Object.fromEntries(
  Object.entries(KECAMATAN_TO_DISTRICT_ID).map(([k, v]) => [v, k])
);

// Bojonegoro geographic bounds [south, west] to [north, east]
export const BOJONEGORO_BOUNDS: [[number, number], [number, number]] = [
  [-7.41, 111.19],
  [-6.78, 112.12],
];

export const MAP_CENTER: [number, number] = [-7.09, 111.65];
export const MAP_ZOOM = 10;

// Fill colors for severity levels (matches existing design system)
export const SEVERITY_FILL: Record<string, string> = {
  high:   "hsl(0, 72%, 54%)",
  medium: "hsl(34, 90%, 50%)",
  low:    "hsl(142, 60%, 42%)",
};

export const SEVERITY_BORDER: Record<string, string> = {
  high:   "hsl(0, 72%, 35%)",
  medium: "hsl(34, 90%, 32%)",
  low:    "hsl(142, 60%, 28%)",
};

export const SEVERITY_FILL_HOVER: Record<string, string> = {
  high:   "hsl(0, 72%, 44%)",
  medium: "hsl(34, 90%, 40%)",
  low:    "hsl(142, 60%, 32%)",
};

export function getSeverityFillColor(severity: "high" | "medium" | "low"): string {
  return SEVERITY_FILL[severity] ?? SEVERITY_FILL.medium;
}

export function getSeverityBorderColor(severity: "high" | "medium" | "low"): string {
  return SEVERITY_BORDER[severity] ?? SEVERITY_BORDER.medium;
}

// Legend items
export const LEGEND_ITEMS = [
  { severity: "high" as const,   label: "Tinggi (skor ≥ 70)" },
  { severity: "medium" as const, label: "Sedang (skor 45–69)" },
  { severity: "low" as const,    label: "Rendah (skor < 45)" },
] as const;

// GeoJSON data source URLs (served from public folder)
export const KECAMATAN_GEOJSON_URL = "/data/geojson/bojonegoro-kecamatan.geojson";
export const DESA_GEOJSON_URL = "/data/geojson/bojonegoro-desa.geojson";

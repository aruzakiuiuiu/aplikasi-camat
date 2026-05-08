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

// Fill colors for severity levels (5 categories)
export const SEVERITY_FILL: Record<string, string> = {
  "sangat-tinggi": "#d7191c",
  "tinggi":        "#fdae61",
  "sedang":        "#ffffbf",
  "rendah":        "#abdda4",
  "sangat-rendah": "#2b83ba",
};

export const SEVERITY_BORDER: Record<string, string> = {
  "sangat-tinggi": "#9e1318",
  "tinggi":        "#d97e3b",
  "sedang":        "#cccc99",
  "rendah":        "#7fa377",
  "sangat-rendah": "#1f5885",
};

export function getSeverityFillColor(severity: "sangat-tinggi" | "tinggi" | "sedang" | "rendah" | "sangat-rendah"): string {
  return SEVERITY_FILL[severity] ?? SEVERITY_FILL["sedang"];
}

export function getSeverityBorderColor(severity: "sangat-tinggi" | "tinggi" | "sedang" | "rendah" | "sangat-rendah"): string {
  return SEVERITY_BORDER[severity] ?? SEVERITY_BORDER["sedang"];
}

// Legend items
export const LEGEND_ITEMS = [
  { severity: "sangat-tinggi" as const, label: "Sangat Tinggi (skor ≥ 76)" },
  { severity: "tinggi" as const,        label: "Tinggi (skor 60–75)" },
  { severity: "sedang" as const,        label: "Sedang (skor 40–59)" },
  { severity: "rendah" as const,        label: "Rendah (skor 20–39)" },
  { severity: "sangat-rendah" as const, label: "Sangat Rendah (skor < 20)" },
] as const;

// GeoJSON data source URLs (served from public folder)
export const KECAMATAN_GEOJSON_URL = "/data/geojson/bojonegoro-kecamatan.geojson";
export const DESA_GEOJSON_URL = "/data/geojson/bojonegoro-desa.geojson";

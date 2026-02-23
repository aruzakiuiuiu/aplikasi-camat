// Detailed sub-indicator definitions for the 4 poverty dimensions
// Based on the holistic poverty alleviation framework

export type SubIndicator = {
  id: string;
  label: string;
  description: string;
};

export type SubCategory = {
  id: string;
  label: string;
  description: string;
  indicators: SubIndicator[];
};

export type DimensionDefinition = {
  key: "personal" | "social" | "spatial" | "structural";
  label: string;
  shortLabel: string;
  focus: string;
  subCategories: SubCategory[];
};

export const DIMENSION_DEFINITIONS: DimensionDefinition[] = [
  {
    key: "personal",
    label: "Personal & Keluarga",
    shortLabel: "Personal",
    focus: "Kondisi individu & rumah tangga yang mempengaruhi kemampuan keluar dari kemiskinan",
    subCategories: [
      {
        id: "a1", label: "Kesehatan Keluarga", description: "Kondisi kesehatan rumah tangga",
        indicators: [
          { id: "a1-1", label: "Gizi", description: "Status gizi anggota keluarga, prevalensi stunting/wasting" },
          { id: "a1-2", label: "Penyakit kronis", description: "Proporsi keluarga dengan anggota penyakit kronis" },
          { id: "a1-3", label: "Akses layanan dasar", description: "Jarak & ketersediaan puskesmas, bidan desa, posyandu" },
        ]
      },
      {
        id: "a2", label: "Pendidikan & Literasi", description: "Tingkat pendidikan dan keterampilan",
        indicators: [
          { id: "a2-1", label: "Putus sekolah", description: "Angka putus sekolah SD/SMP/SMA" },
          { id: "a2-2", label: "Keterampilan rendah", description: "Proporsi penduduk tanpa keterampilan kerja formal" },
        ]
      },
      {
        id: "a3", label: "Pendapatan Rumah Tangga", description: "Tingkat dan stabilitas penghasilan",
        indicators: [
          { id: "a3-1", label: "Pendapatan per kapita", description: "Pendapatan rata-rata per kapita per bulan" },
          { id: "a3-2", label: "Stabilitas pendapatan", description: "Volatilitas pendapatan antar musim" },
        ]
      },
      {
        id: "a4", label: "Kerentanan Keluarga", description: "Faktor kerentanan khusus rumah tangga",
        indicators: [
          { id: "a4-1", label: "Lansia", description: "Proporsi keluarga dengan anggota lansia tanpa jaminan" },
          { id: "a4-2", label: "Disabilitas", description: "Proporsi keluarga dengan anggota disabilitas" },
          { id: "a4-3", label: "Perempuan kepala keluarga", description: "Proporsi keluarga dengan kepala keluarga perempuan" },
        ]
      },
      {
        id: "a5", label: "Produktivitas Kerja", description: "Kapasitas produktif anggota keluarga",
        indicators: [
          { id: "a5-1", label: "Jam kerja", description: "Rata-rata jam kerja produktif per minggu" },
          { id: "a5-2", label: "Beban tanggungan", description: "Rasio tanggungan (non-produktif vs produktif)" },
        ]
      },
    ]
  },
  {
    key: "social",
    label: "Lingkungan Sosial",
    shortLabel: "Sosial",
    focus: "Nilai, pola hubungan, struktur ekonomi, dan kekuatan sosial yang mempengaruhi partisipasi dan perubahan",
    subCategories: [
      {
        id: "b1", label: "Sosial Budaya", description: "Nilai, pola hubungan, kekuatan sosial",
        indicators: [
          { id: "b1-1", label: "Modal sosial", description: "Gotong royong, jaringan informal, kapasitas kelompok" },
          { id: "b1-2", label: "Nilai & norma", description: "Pernikahan dini, persepsi pendidikan, pola konsumsi" },
          { id: "b1-3", label: "Perilaku sosial", description: "Migrasi kerja, budaya utang, siklus musiman" },
          { id: "b1-4", label: "Peran perempuan", description: "Beban ganda, akses terhadap modal/pelatihan" },
          { id: "b1-5", label: "Struktur sosial lokal", description: "Patron–klien, tokoh informal, kelompok dominan" },
          { id: "b1-6", label: "Kohesi & konflik", description: "Gesekan, konflik sumber daya, mobilitas pendatang" },
        ]
      },
      {
        id: "b2", label: "Ekonomi", description: "Struktur ekonomi, aktivitas, dan kesejahteraan",
        indicators: [
          { id: "b2-1", label: "Struktur ekonomi wilayah", description: "Sektor unggulan, ketergantungan sektoral, integrasi pasar" },
          { id: "b2-2", label: "Mata pencaharian", description: "Jenis pekerjaan utama, volatilitas pendapatan, sektor informal" },
          { id: "b2-3", label: "Indikator kemiskinan", description: "Kemiskinan absolut, relatif, ekstrem, distribusi antar desa" },
          { id: "b2-4", label: "Akses ekonomi", description: "Akses modal, kredit, lembaga keuangan, pasar, rantai nilai" },
          { id: "b2-5", label: "Peluang ekonomi lokal", description: "Komoditas potensial, cluster ekonomi, usaha rumah tangga" },
        ]
      },
    ]
  },
  {
    key: "spatial",
    label: "Kawasan (Spasial & Lingkungan Fisik)",
    shortLabel: "Kawasan",
    focus: "Kondisi geografis, infrastruktur fisik, dan risiko lingkungan",
    subCategories: [
      {
        id: "c1", label: "Aksesibilitas Fisik", description: "Keterjangkauan wilayah",
        indicators: [
          { id: "c1-1", label: "Kondisi jalan", description: "Kualitas dan panjang jalan desa/kecamatan" },
          { id: "c1-2", label: "Jarak pusat ekonomi", description: "Jarak ke pasar, kota kabupaten, fasilitas kesehatan" },
          { id: "c1-3", label: "Transportasi", description: "Ketersediaan angkutan umum, frekuensi layanan" },
        ]
      },
      {
        id: "c2", label: "Kondisi Geografis", description: "Karakteristik alam dan risiko",
        indicators: [
          { id: "c2-1", label: "Topografi", description: "Kemiringan lahan, elevasi, jenis tanah" },
          { id: "c2-2", label: "Risiko banjir", description: "Frekuensi dan dampak banjir" },
          { id: "c2-3", label: "Risiko kekeringan", description: "Durasi musim kering, ketersediaan air" },
          { id: "c2-4", label: "Lahan kritis", description: "Proporsi lahan kritis/tidak produktif" },
        ]
      },
      {
        id: "c3", label: "Infrastruktur Lingkungan", description: "Sarana prasarana dasar",
        indicators: [
          { id: "c3-1", label: "Air bersih", description: "Akses air bersih layak (%)" },
          { id: "c3-2", label: "Sanitasi", description: "Akses sanitasi layak (%)" },
          { id: "c3-3", label: "Drainase", description: "Kondisi drainase permukiman" },
          { id: "c3-4", label: "Listrik", description: "Cakupan jaringan listrik (%)" },
        ]
      },
      {
        id: "c4", label: "Permukiman", description: "Kondisi tempat tinggal",
        indicators: [
          { id: "c4-1", label: "Kepadatan", description: "Kepadatan penduduk per km²" },
          { id: "c4-2", label: "Kampung padat", description: "Jumlah kampung padat penduduk" },
          { id: "c4-3", label: "Permukiman terpencil", description: "Jumlah dusun terisolasi" },
        ]
      },
      {
        id: "c5", label: "Sumber Daya Alam", description: "Kualitas SDA sebagai ruang hidup",
        indicators: [
          { id: "c5-1", label: "Kualitas lahan", description: "Kesuburan tanah, produktivitas pertanian" },
          { id: "c5-2", label: "Ketersediaan air", description: "Sumber air permanen, debit musiman" },
          { id: "c5-3", label: "Vegetasi", description: "Tutupan vegetasi, degradasi hutan" },
        ]
      },
    ]
  },
  {
    key: "structural",
    label: "Tata Kelola Struktural",
    shortLabel: "Struktural",
    focus: "Struktur program, koordinasi lintas sektor, dan sistem kebijakan",
    subCategories: [
      {
        id: "d1", label: "Koordinasi Lintas Dinas", description: "Sinergi program antar OPD",
        indicators: [
          { id: "d1-1", label: "Koordinasi OPD", description: "Frekuensi & kualitas koordinasi sosial, kesehatan, pendidikan, PMD, ekonomi" },
        ]
      },
      {
        id: "d2", label: "Fragmentasi Program", description: "Efisiensi implementasi program",
        indicators: [
          { id: "d2-1", label: "Tumpang tindih", description: "Jumlah program yang overlap di wilayah sama" },
          { id: "d2-2", label: "Sinkronisasi", description: "Tingkat sinkronisasi jadwal & target antar program" },
        ]
      },
      {
        id: "d3", label: "Integrasi Data", description: "Kualitas dan integrasi basis data",
        indicators: [
          { id: "d3-1", label: "DTKS", description: "Akurasi & kelengkapan Data Terpadu Kesejahteraan Sosial" },
          { id: "d3-2", label: "Data desa", description: "Ketersediaan data tingkat desa yang terupdate" },
          { id: "d3-3", label: "Data sektoral", description: "Integrasi data antar sektor/dinas" },
        ]
      },
      {
        id: "d4", label: "Kapasitas Kelembagaan", description: "Kapasitas pemerintah di semua level",
        indicators: [
          { id: "d4-1", label: "Kapasitas desa", description: "Kemampuan aparatur desa dalam perencanaan & pelaksanaan" },
          { id: "d4-2", label: "Kapasitas kecamatan", description: "Kemampuan kecamatan dalam koordinasi & monev" },
          { id: "d4-3", label: "Kapasitas kabupaten", description: "Dukungan teknis & anggaran dari kabupaten" },
        ]
      },
      {
        id: "d5", label: "Kemitraan Multi Pihak", description: "Kolaborasi dengan pihak eksternal",
        indicators: [
          { id: "d5-1", label: "LSM & universitas", description: "Kerjasama dengan LSM dan perguruan tinggi" },
          { id: "d5-2", label: "Swasta & CSR", description: "Partisipasi sektor swasta dan program CSR" },
        ]
      },
      {
        id: "d6", label: "Efektivitas Kebijakan", description: "Implementasi regulasi dan pendampingan",
        indicators: [
          { id: "d6-1", label: "Implementasi regulasi", description: "Tingkat implementasi peraturan terkait kemiskinan" },
          { id: "d6-2", label: "Pendampingan", description: "Ketersediaan dan kualitas pendamping program" },
        ]
      },
    ]
  },
];

// Sub-indicator scores per district (mock data aligned with overall scores)
// Each sub-category gets a score 0-100
export type DimensionSubScores = {
  [subCategoryId: string]: number;
};

export type DistrictDimensionScores = {
  districtId: string;
  dimensions: {
    personal: DimensionSubScores;
    social: DimensionSubScores;
    spatial: DimensionSubScores;
    structural: DimensionSubScores;
  };
};

// Helper to generate sub-scores around a base score with some variance
function generateSubScores(baseScore: number, subCatIds: string[], seed: number): DimensionSubScores {
  const result: DimensionSubScores = {};
  subCatIds.forEach((id, i) => {
    const variance = ((seed * (i + 1) * 7 + 13) % 21) - 10; // -10 to +10
    result[id] = Math.max(0, Math.min(100, baseScore + variance));
  });
  return result;
}

// Generate district sub-scores from DISTRICTS data
export function getDistrictSubScores(districtId: string, scores: { personal: number; social: number; spatial: number; structural: number }): DistrictDimensionScores {
  const seed = districtId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return {
    districtId,
    dimensions: {
      personal: generateSubScores(scores.personal, ["a1", "a2", "a3", "a4", "a5"], seed),
      social: generateSubScores(scores.social, ["b1", "b2"], seed + 1),
      spatial: generateSubScores(scores.spatial, ["c1", "c2", "c3", "c4", "c5"], seed + 2),
      structural: generateSubScores(scores.structural, ["d1", "d2", "d3", "d4", "d5", "d6"], seed + 3),
    },
  };
}

// Get dimension definition by key
export function getDimensionByKey(key: string): DimensionDefinition | undefined {
  return DIMENSION_DEFINITIONS.find(d => d.key === key);
}

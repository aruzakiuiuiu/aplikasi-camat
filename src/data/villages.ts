import type { PovertyScale } from "./districts";

export type Village = {
  id: string;
  districtId: string;
  name: string;
  population: number;
  poorFamilies: number;
  povertyRate: number;
  scores: PovertyScale;
  trend: "improving" | "stable" | "worsening";
  mainLivelihood: string;
  landUse: string;
  disasterRisk: string[];
};

export type Household = {
  id: string;
  villageId: string;
  headName: string;
  memberCount: number;
  dependents: number;
  economicCondition: "sangat_miskin" | "miskin" | "hampir_miskin";
  assets: {
    land: string;
    livestock: string;
    business: string;
  };
  aidHistory: { year: number; program: string; amount: string }[];
};

const vid = (districtId: string, n: number) => `${districtId}-v${String(n).padStart(2, "0")}`;

export const VILLAGES: Village[] = [
  // bjn-01 Bojonegoro
  { id: vid("bjn-01",1), districtId:"bjn-01", name:"Campurejo", population:18200, poorFamilies:1120, povertyRate:10.4, scores:{personal:38,social:30,spatial:22,structural:26}, trend:"improving", mainLivelihood:"Perdagangan & jasa", landUse:"Permukiman, lahan komersial", disasterRisk:["Banjir ringan"] },
  { id: vid("bjn-01",2), districtId:"bjn-01", name:"Sumbang", population:15400, poorFamilies:980, povertyRate:11.2, scores:{personal:40,social:32,spatial:25,structural:28}, trend:"improving", mainLivelihood:"Buruh industri", landUse:"Permukiman padat", disasterRisk:["Banjir"] },
  { id: vid("bjn-01",3), districtId:"bjn-01", name:"Ledok Kulon", population:14800, poorFamilies:1100, povertyRate:12.8, scores:{personal:44,social:35,spatial:28,structural:30}, trend:"stable", mainLivelihood:"Petani & buruh tani", landUse:"Sawah, permukiman", disasterRisk:["Banjir","Kekeringan"] },

  // bjn-02 Balen
  { id: vid("bjn-02",1), districtId:"bjn-02", name:"Ngadiluwih", population:12400, poorFamilies:2100, povertyRate:17.8, scores:{personal:60,social:45,spatial:52,structural:50}, trend:"improving", mainLivelihood:"Petani padi", landUse:"Sawah irigasi", disasterRisk:["Banjir"] },
  { id: vid("bjn-02",2), districtId:"bjn-02", name:"Mulyoagung", population:9800, poorFamilies:1870, povertyRate:19.1, scores:{personal:64,social:48,spatial:56,structural:52}, trend:"stable", mainLivelihood:"Petani & buruh tani", landUse:"Sawah tadah hujan", disasterRisk:["Banjir","Kekeringan"] },
  { id: vid("bjn-02",3), districtId:"bjn-02", name:"Simorejo", population:8200, poorFamilies:1420, povertyRate:18.6, scores:{personal:62,social:47,spatial:54,structural:51}, trend:"improving", mainLivelihood:"Petani tembakau", landUse:"Lahan kering, sawah", disasterRisk:["Kekeringan"] },
  { id: vid("bjn-02",4), districtId:"bjn-02", name:"Balenrejo", population:7100, poorFamilies:1500, povertyRate:20.2, scores:{personal:66,social:50,spatial:58,structural:54}, trend:"worsening", mainLivelihood:"Buruh tani", landUse:"Sawah & tegalan", disasterRisk:["Banjir","Kekeringan"] },

  // bjn-03 Malo
  { id: vid("bjn-03",1), districtId:"bjn-03", name:"Sudu", population:8100, poorFamilies:1820, povertyRate:22.5, scores:{personal:74,social:60,spatial:70,structural:66}, trend:"stable", mainLivelihood:"Petani tembakau & kayu", landUse:"Hutan, tegalan", disasterRisk:["Longsor","Kekeringan"] },
  { id: vid("bjn-03",2), districtId:"bjn-03", name:"Ketileng", population:7200, poorFamilies:1560, povertyRate:21.7, scores:{personal:71,social:57,spatial:67,structural:63}, trend:"stable", mainLivelihood:"Petani hutan & ladang", landUse:"Hutan rakyat, tegalan", disasterRisk:["Longsor","Kekeringan"] },
  { id: vid("bjn-03",3), districtId:"bjn-03", name:"Ngawi", population:6400, poorFamilies:1380, povertyRate:22.1, scores:{personal:72,social:58,spatial:68,structural:64}, trend:"improving", mainLivelihood:"Petani & penambang pasir", landUse:"Bantaran sungai, sawah", disasterRisk:["Banjir","Erosi"] },

  // bjn-04 Purwosari
  { id: vid("bjn-04",1), districtId:"bjn-04", name:"Purwosari", population:7800, poorFamilies:1640, povertyRate:21.0, scores:{personal:68,social:54,spatial:72,structural:58}, trend:"worsening", mainLivelihood:"Petani kapur & tembakau", landUse:"Kapur, tegalan", disasterRisk:["Kekeringan parah"] },
  { id: vid("bjn-04",2), districtId:"bjn-04", name:"Kuniran", population:7200, poorFamilies:1580, povertyRate:22.0, scores:{personal:71,social:55,spatial:75,structural:61}, trend:"worsening", mainLivelihood:"Buruh tani", landUse:"Tegalan kering", disasterRisk:["Kekeringan parah","Longsor"] },
  { id: vid("bjn-04",3), districtId:"bjn-04", name:"Tinawun", population:6100, poorFamilies:1380, povertyRate:21.0, scores:{personal:70,social:55,spatial:73,structural:60}, trend:"stable", mainLivelihood:"Petani & penggali batu", landUse:"Kapur, hutan", disasterRisk:["Kekeringan"] },

  // bjn-05 Trucuk
  { id: vid("bjn-05",1), districtId:"bjn-05", name:"Trucuk", population:11200, poorFamilies:2280, povertyRate:20.4, scores:{personal:66,social:50,spatial:58,structural:53}, trend:"improving", mainLivelihood:"Petani padi & jagung", landUse:"Sawah, ladang", disasterRisk:["Banjir"] },
  { id: vid("bjn-05",2), districtId:"bjn-05", name:"Pagerwojo", population:9800, poorFamilies:2080, povertyRate:21.2, scores:{personal:69,social:53,spatial:61,structural:56}, trend:"improving", mainLivelihood:"Petani & nelayan sungai", landUse:"Bantaran bengawan, sawah", disasterRisk:["Banjir","Erosi"] },
  { id: vid("bjn-05",3), districtId:"bjn-05", name:"Kandangan", population:8100, poorFamilies:1620, povertyRate:20.0, scores:{personal:67,social:51,spatial:60,structural:54}, trend:"improving", mainLivelihood:"Petani & pedagang", landUse:"Sawah & permukiman", disasterRisk:["Banjir"] },

  // bjn-06 Dander
  { id: vid("bjn-06",1), districtId:"bjn-06", name:"Dander", population:13200, poorFamilies:2250, povertyRate:17.0, scores:{personal:56,social:42,spatial:48,structural:46}, trend:"improving", mainLivelihood:"Pegawai & pedagang", landUse:"Permukiman, sawah", disasterRisk:["Banjir ringan"] },
  { id: vid("bjn-06",2), districtId:"bjn-06", name:"Sumbersari", population:10800, poorFamilies:1960, povertyRate:18.1, scores:{personal:59,social:44,spatial:51,structural:48}, trend:"improving", mainLivelihood:"Petani padi", landUse:"Sawah irigasi", disasterRisk:["Banjir"] },
  { id: vid("bjn-06",3), districtId:"bjn-06", name:"Ngulanan", population:9200, poorFamilies:1680, povertyRate:17.9, scores:{personal:58,social:43,spatial:50,structural:47}, trend:"stable", mainLivelihood:"Petani & buruh", landUse:"Sawah, tegalan", disasterRisk:["Kekeringan"] },

  // bjn-07 Kalitidu
  { id: vid("bjn-07",1), districtId:"bjn-07", name:"Kalitidu", population:10200, poorFamilies:1920, povertyRate:18.8, scores:{personal:62,social:48,spatial:68,structural:44}, trend:"stable", mainLivelihood:"Petani & penambang minyak", landUse:"Ladang, eksploitasi minyak", disasterRisk:["Tanah gerak","Banjir"] },
  { id: vid("bjn-07",2), districtId:"bjn-07", name:"Panjunan", population:9000, poorFamilies:1840, povertyRate:20.4, scores:{personal:65,social:51,spatial:72,structural:47}, trend:"stable", mainLivelihood:"Petani & buruh tambang", landUse:"Ladang, kawasan industri", disasterRisk:["Tanah gerak"] },
  { id: vid("bjn-07",3), districtId:"bjn-07", name:"Sukoharjo", population:8100, poorFamilies:1500, povertyRate:18.5, scores:{personal:63,social:49,spatial:69,structural:45}, trend:"improving", mainLivelihood:"Petani & pedagang", landUse:"Sawah, tegalan", disasterRisk:["Banjir","Kekeringan"] },

  // bjn-08 Kanor
  { id: vid("bjn-08",1), districtId:"bjn-08", name:"Kanor", population:12100, poorFamilies:2820, povertyRate:23.3, scores:{personal:74,social:66,spatial:60,structural:68}, trend:"worsening", mainLivelihood:"Petani padi & tebu", landUse:"Sawah, perkebunan tebu", disasterRisk:["Banjir musiman"] },
  { id: vid("bjn-08",2), districtId:"bjn-08", name:"Sumbertlaseh", population:10400, poorFamilies:2540, povertyRate:24.4, scores:{personal:77,social:69,spatial:63,structural:71}, trend:"worsening", mainLivelihood:"Buruh tani musiman", landUse:"Sawah tadah hujan", disasterRisk:["Banjir","Kekeringan"] },
  { id: vid("bjn-08",3), districtId:"bjn-08", name:"Gedongarum", population:9200, poorFamilies:2140, povertyRate:23.3, scores:{personal:75,social:67,spatial:61,structural:69}, trend:"stable", mainLivelihood:"Petani & pekerja pabrik", landUse:"Sawah, permukiman", disasterRisk:["Banjir"] },

  // bjn-09 Kepohbaru
  { id: vid("bjn-09",1), districtId:"bjn-09", name:"Kepohbaru", population:9600, poorFamilies:1880, povertyRate:19.6, scores:{personal:63,social:52,spatial:76,structural:56}, trend:"stable", mainLivelihood:"Petani & kehutanan", landUse:"Hutan produksi, sawah", disasterRisk:["Kekeringan","Longsor"] },
  { id: vid("bjn-09",2), districtId:"bjn-09", name:"Sumberarum", population:8200, poorFamilies:1640, povertyRate:20.0, scores:{personal:66,social:54,spatial:79,structural:58}, trend:"stable", mainLivelihood:"Petani hutan & ladang", landUse:"Hutan, tegalan kering", disasterRisk:["Longsor","Kekeringan"] },
  { id: vid("bjn-09",3), districtId:"bjn-09", name:"Jatimulyo", population:7100, poorFamilies:1460, povertyRate:20.6, scores:{personal:67,social:56,spatial:80,structural:60}, trend:"improving", mainLivelihood:"Petani hutan", landUse:"Hutan rakyat", disasterRisk:["Longsor"] },

  // bjn-10 Kedungadem
  { id: vid("bjn-10",1), districtId:"bjn-10", name:"Kedungadem", population:15200, poorFamilies:3680, povertyRate:24.2, scores:{personal:78,social:64,spatial:70,structural:72}, trend:"worsening", mainLivelihood:"Petani & buruh tani", landUse:"Sawah, tegalan", disasterRisk:["Banjir","Kekeringan"] },
  { id: vid("bjn-10",2), districtId:"bjn-10", name:"Dukohkidul", population:13100, poorFamilies:3280, povertyRate:25.0, scores:{personal:81,social:67,spatial:73,structural:75}, trend:"worsening", mainLivelihood:"Buruh tani & serabutan", landUse:"Tegalan kering", disasterRisk:["Kekeringan parah"] },
  { id: vid("bjn-10",3), districtId:"bjn-10", name:"Ngrandu", population:11200, poorFamilies:2780, povertyRate:24.8, scores:{personal:80,social:66,spatial:72,structural:74}, trend:"stable", mainLivelihood:"Petani tradisional", landUse:"Sawah & ladang", disasterRisk:["Banjir","Kekeringan"] },

  // bjn-19 Sekar
  { id: vid("bjn-19",1), districtId:"bjn-19", name:"Sekar", population:6800, poorFamilies:1680, povertyRate:24.7, scores:{personal:80,social:62,spatial:86,structural:68}, trend:"worsening", mainLivelihood:"Petani hutan & ladang", landUse:"Hutan lindung, tegalan", disasterRisk:["Longsor","Kekeringan"] },
  { id: vid("bjn-19",2), districtId:"bjn-19", name:"Bobol", population:5900, poorFamilies:1520, povertyRate:25.8, scores:{personal:83,social:65,spatial:89,structural:71}, trend:"worsening", mainLivelihood:"Petani & pengumpul hasil hutan", landUse:"Hutan, ladang", disasterRisk:["Longsor","Kekeringan parah"] },
  { id: vid("bjn-19",3), districtId:"bjn-19", name:"Bareng", population:5200, poorFamilies:1360, povertyRate:26.2, scores:{personal:84,social:66,spatial:90,structural:72}, trend:"stable", mainLivelihood:"Petani subsisten", landUse:"Tegalan kering, hutan", disasterRisk:["Longsor","Kekeringan parah"] },

  // bjn-20 Bubulan
  { id: vid("bjn-20",1), districtId:"bjn-20", name:"Bubulan", population:5200, poorFamilies:1360, povertyRate:26.2, scores:{personal:84,social:66,spatial:88,structural:70}, trend:"worsening", mainLivelihood:"Petani hutan & ladang", landUse:"Hutan kapur, tegalan", disasterRisk:["Longsor","Kekeringan"] },
  { id: vid("bjn-20",2), districtId:"bjn-20", name:"Drokilo", population:4800, poorFamilies:1280, povertyRate:26.7, scores:{personal:86,social:69,spatial:91,structural:73}, trend:"worsening", mainLivelihood:"Petani & penebang kayu", landUse:"Hutan produksi", disasterRisk:["Longsor","Kekeringan parah"] },
  { id: vid("bjn-20",3), districtId:"bjn-20", name:"Ngorogunung", population:4100, poorFamilies:1120, povertyRate:27.3, scores:{personal:87,social:70,spatial:92,structural:74}, trend:"stable", mainLivelihood:"Petani subsisten", landUse:"Hutan & ladang", disasterRisk:["Longsor","Kekeringan parah"] },

  // bjn-22 Ngambon
  { id: vid("bjn-22",1), districtId:"bjn-22", name:"Ngambon", population:4200, poorFamilies:1140, povertyRate:27.1, scores:{personal:87,social:70,spatial:84,structural:74}, trend:"worsening", mainLivelihood:"Petani hutan & ladang", landUse:"Hutan, tegalan", disasterRisk:["Longsor","Kekeringan"] },
  { id: vid("bjn-22",2), districtId:"bjn-22", name:"Ngrancang", population:3900, poorFamilies:1100, povertyRate:28.2, scores:{personal:89,social:73,spatial:87,structural:77}, trend:"worsening", mainLivelihood:"Petani subsisten", landUse:"Hutan kapur, tegalan kering", disasterRisk:["Longsor parah","Kekeringan parah"] },
  { id: vid("bjn-22",3), districtId:"bjn-22", name:"Balong", population:3500, poorFamilies:980, povertyRate:28.0, scores:{personal:88,social:72,spatial:86,structural:76}, trend:"stable", mainLivelihood:"Petani", landUse:"Tegalan kering", disasterRisk:["Kekeringan parah"] },
];

// For districts without specific village data, generate generic villages
const GENERIC_DISTRICTS = ["bjn-11","bjn-12","bjn-13","bjn-14","bjn-15","bjn-16","bjn-17","bjn-18","bjn-21","bjn-23","bjn-24","bjn-25","bjn-26","bjn-27","bjn-28"];
const GENERIC_VILLAGE_NAMES: Record<string, string[]> = {
  "bjn-11": ["Margomulyo","Kawisputih","Meduri"],
  "bjn-12": ["Ngraho","Ngepung","Mojorejo"],
  "bjn-13": ["Ngasem","Jelu","Nganti"],
  "bjn-14": ["Padangan","Cendono","Kuncen"],
  "bjn-15": ["Sukosewu","Rendeng","Glindon"],
  "bjn-16": ["Baureno","Trojalu","Gunungsari"],
  "bjn-17": ["Sugihwaras","Pejok","Wedoro"],
  "bjn-18": ["Temayang","Kedungsumber","Pejok"],
  "bjn-21": ["Gondang","Sumbertlaseh","Sambongrejo"],
  "bjn-23": ["Tambakrejo","Ngraho","Sedohardjo"],
  "bjn-24": ["Sumberejo","Ngampel","Wonotangkel"],
  "bjn-25": ["Kapas","Sukowati","Kedaton"],
  "bjn-26": ["Kasiman","Batokan","Ngaglik"],
  "bjn-27": ["Kedewan","Kawengan","Hargomulyo"],
  "bjn-28": ["Gayam","Mojodelik","Brabowan"],
};

import { DISTRICTS } from "./districts";

GENERIC_DISTRICTS.forEach((did) => {
  const d = DISTRICTS.find(x => x.id === did);
  if (!d) return;
  const names = GENERIC_VILLAGE_NAMES[did] || ["Desa A","Desa B","Desa C"];
  const pop3 = Math.floor(d.population / 3);
  const poor3 = Math.floor(d.poorFamilies / 3);
  names.forEach((name, i) => {
    const noise = (Math.random() * 0.1) - 0.05;
    VILLAGES.push({
      id: vid(did, i+1),
      districtId: did,
      name,
      population: pop3 + Math.round(Math.random() * 2000 - 1000),
      poorFamilies: poor3 + Math.round(Math.random() * 300 - 150),
      povertyRate: +(d.povertyRate + noise * 10).toFixed(1),
      scores: {
        personal: d.scores.personal + Math.round(noise * 20),
        social: d.scores.social + Math.round(noise * 20),
        spatial: d.scores.spatial + Math.round(noise * 20),
        structural: d.scores.structural + Math.round(noise * 20),
      },
      trend: d.trend,
      mainLivelihood: "Petani & buruh tani",
      landUse: "Sawah, tegalan, permukiman",
      disasterRisk: ["Banjir","Kekeringan"],
    });
  });
});

// Household mock data
const FIRST_NAMES = ["Suharto","Bambang","Slamet","Wagiman","Sugeng","Ponimin","Daliman","Jumari","Sukardi","Mulyono","Rohmat","Suparman","Sardjono","Agus","Wasito","Tugiman","Suroto","Marsono","Ngadimin","Basuki"];
const AID_PROGRAMS = [
  { program: "PKH", amount: "Rp 2.400.000/thn" },
  { program: "BPNT/Sembako", amount: "Rp 200.000/bln" },
  { program: "BLT Dana Desa", amount: "Rp 300.000/bln" },
  { program: "PIP (Kartu Indonesia Pintar)", amount: "Rp 1.000.000/thn" },
  { program: "KIS (BPJS Kesehatan)", amount: "Gratis iuran" },
  { program: "Bansos Tunai COVID-19", amount: "Rp 600.000" },
  { program: "Rutilahu (Rehab Rumah)", amount: "Rp 17.500.000" },
];

function seedRand(seed: number) {
  let s = seed;
  return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
}

export function generateHouseholds(villageId: string, count: number = 12): Household[] {
  const rand = seedRand(villageId.split("").reduce((a, c) => a + c.charCodeAt(0), 0));
  const conditions: Household["economicCondition"][] = ["sangat_miskin","miskin","hampir_miskin"];
  const assetLands = ["Tidak punya","< 0.1 ha sawah","0.1–0.25 ha sawah","0.25–0.5 ha sawah","0.5 ha tegalan"];
  const assetLivestocks = ["Tidak ada","2 ekor kambing","1 ekor sapi","3 ekor ayam","1 ekor kerbau","5 ekor ayam + 2 kambing"];
  const assetBusiness = ["Tidak ada","Warung kecil","Jasa ojek","Pengrajin","Ternak lele","Bengkel kecil"];

  return Array.from({ length: count }, (_, i) => {
    const r = rand();
    const condIdx = Math.floor(r * 3);
    const aidCount = 1 + Math.floor(rand() * 3);
    const aidHistory: Household["aidHistory"] = [];
    const usedPrograms = new Set<string>();
    for (let a = 0; a < aidCount; a++) {
      const pick = AID_PROGRAMS[Math.floor(rand() * AID_PROGRAMS.length)];
      if (!usedPrograms.has(pick.program)) {
        usedPrograms.add(pick.program);
        aidHistory.push({ year: 2022 + Math.floor(rand() * 4), ...pick });
      }
    }
    const members = 2 + Math.floor(rand() * 6);
    return {
      id: `${villageId}-hh${String(i+1).padStart(2,"0")}`,
      villageId,
      headName: `${FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)]} bin ${FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)]}`,
      memberCount: members,
      dependents: Math.max(0, members - 2 - Math.floor(rand() * 2)),
      economicCondition: conditions[condIdx],
      assets: {
        land: assetLands[Math.floor(rand() * assetLands.length)],
        livestock: assetLivestocks[Math.floor(rand() * assetLivestocks.length)],
        business: assetBusiness[Math.floor(rand() * assetBusiness.length)],
      },
      aidHistory,
    };
  });
}

export function getVillagesByDistrict(districtId: string): Village[] {
  return VILLAGES.filter(v => v.districtId === districtId);
}

export function getVillageById(id: string): Village | undefined {
  return VILLAGES.find(v => v.id === id);
}
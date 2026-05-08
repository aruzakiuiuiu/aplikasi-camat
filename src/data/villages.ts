import type { PovertyScale } from "./districts";
import { DISTRICTS } from "./districts";
import { KECAMATAN_TO_DISTRICT_ID } from "./mapConfig";

export type Village = {
  id: string;
  districtId: string;
  name: string;          // EXACT match with GeoJSON DESA property
  isKelurahan: boolean;  // true = kelurahan (perkotaan), false = desa
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

// ============================================================
// Canonical desa/kelurahan list per kecamatan.
// Names MUST exactly match the DESA property in
// public/data/geojson/bojonegoro-desa.geojson.
// `kel: [...]` = kelurahan (only present in Bojonegoro kota).
// ============================================================
const CANONICAL: Record<string, { desa: string[]; kel?: string[] }> = {
  Balen: { desa: ["Balenrejo","Bulaklo","Bulu","Kabunan","Kedungbondo","Kedungdowo","Kemamang","Kenep","Lengkong","Margomulyo","Mayangkawis","Mulyoagung","Mulyorejo","Ngadiluhur","Penganten","Pilanggede","Pohbogo","Prambatan","Sarirejo","Sekaran","Sidobandung","Sobontoro","Suwaloh"] },
  Baureno: { desa: ["Banjaran","Banjaranyar","Baureno","Blongsong","Bumiayu","Drajat","Gajah","Gunungsari","Kadungrejo","Kalisari","Karangdayu","Kauman","Lebaksari","Ngemplak","Pasinan","Pomahan","Pucangarum","Selorejo","Sembunglor","Sraturejo","Sumuragung","Tanggungan","Tlogoagung","Trojalu","Tulungagung"] },
  Bojonegoro: {
    desa: ["Campurejo","Kalirejo","Kauman","Mulyoagung","Pacul","Semanding","Sukorejo"],
    kel:  ["Banjarejo","Jetak","Kadipaten","Karang pacar","Kepatihan","Klangon","Ledok Kulon","Ledok Wetan","Mojokampung","Ngrowo","Sumbang"],
  },
  Bubulan: { desa: ["Bubulan","Cancung","Clebung","Ngorogunung","Sumberbendo"] },
  Dander: { desa: ["Dander","Growok","Jatiblimbing","Karangsono","Kunci","Mojoranu","Ngablak","Ngraseh","Ngulanan","Ngumpakdalem","Ngunut","Sendangrejo","Sumberagung","Sumberarum","Sumbertlaseh","Sumodikaran"] },
  Gayam: { desa: ["Begadon","Beged","Bonorejo","Brabowan","Cengungklung","Gayam","Katur","Manukan","Mojodelik","Ngraho","Ringintunggal","Sudu"] },
  Gondang: { desa: ["Gondang","Jari","Krondonan","Pajeng","Pragelan","Sambongrejo","Senganten"] },
  Kalitidu: { desa: ["Brenggolo","Grebegan","Kalitidu","Leran","Mayanggeneng","Mayangrejo","Mlaten","Mojo","Mojosari","Ngringinrejo","Ngujo","Panjunan","Pilangsari","Pungpungan","Sukoharjo","Sumengko","Talok","Wotanngare"] },
  Kanor: { desa: ["Bakung","Bungur","Cangaan","Caruban","Gedongarum","Kabalan","Kanor","Kedungprimpen","Nglarangan","Palembon","Pesen","Pilang","Piyak","Prigi","Samberan","Sarangan","Sedeng","Semambung","Simbatan","Simorejo","Sroyo","Sumberwangi","Tambahrejo","Tejo","Temu"] },
  Kapas: { desa: ["Bakalan","Bangilan","Bendo","Bogo","Kalianyar","Kapas","Kedaton","Klampok","Kumpulrejo","Mojodeso","Ngampel","Padangmentoyo","Plesungan","Sambiroto","Sembung","Semenpinggir","Sukowati","Tanjungharjo","Tapelan","Tikusan","Wedi"] },
  Kasiman: { desa: ["Batokan","Besah","Betet","Kasiman","Ngaglik","Sambeng","Sekaran","Sidomukti","Tambakmerak","Tembeling"] },
  Kedewan: { desa: ["Beji","Hargomulyo","Kawengan","Kedewan","Wonocolo"] },
  Kedungadem: { desa: ["Babad","Balongcabe","Dayukidul","Drokilo","Duwel","Geger","Jamberejo","Kedungadem","Kedungrejo","Kendung","Kepohkidul","Kesongo","Megale","Mlideg","Mojorejo","Ngrandu","Panjang","Pejok","Sidomulyo","Sidorejo","Tlogoagung","Tondomulo","Tumbrasanom"] },
  Kepohbaru: { desa: ["Balongdowo","Bayemgede","Betet","Brangkal","Bumirejo","Cengkir","Jipo","Karangan","Kepoh","Krangkong","Mojosari","Mudung","Nglumber","Ngranggonanyar","Pejok","Pohwates","Sidomukti","Simorejo","Sugihwaras","Sumberagung","Sumbergede","Sumberoto","Tlogorejo","Turigede","Woro"] },
  Malo: { desa: ["Banaran","Dukohlor","Kacangan","Kedungrejo","Kemiri","Ketileng","Kliteh","Malo","Ngujung","Petak","Rendeng","Semlaran","Sudah","Sukorejo","Sumberejo","Tambakromo","Tanggir","Tinawun","Trembes","Tulungagung"] },
  Margomulyo: { desa: ["Geneng","Kalangan","Margomulyo","Meduri","Ngelo","Sumberjo"] },
  Ngambon: { desa: ["Bondol","Karangmangu","Ngambon","Nglampin","Sengon"] },
  Ngasem: { desa: ["Bandungrejo","Bareng","Butoh","Dukohkidul","Jampet","Jelu","Kolong","Mediyunan","Ngadiluwih","Ngantru","Ngasem","Sambong","Sendangharjo","Setren","Tengger","Trenggulunan","Wadang"] },
  Ngraho: { desa: ["Bancer","Blimbinggede","Jumok","Kalirejo","Klempun","Luwihaji","Mojorejo","Nganti","Ngraho","Pandan","Payaman","Sugihwaras","Sumberagung","Sumberarum","Tanggungan","Tapelan"] },
  Padangan: { desa: ["Banjarejo","Cendono","Dengok","Kebonagung","Kendung","Kuncen","Ngasinan","Ngeper","Ngradin","Nguken","Padangan","Prangi","Purworejo","Sidorejo","Sonorejo","Tebon"] },
  Purwosari: { desa: ["Donan","Gapluk","Kaliombo","Kuniran","Ngrejeng","Pelem","Pojok","Punggur","Purwosari","Sedahkidul","Tinumpuk","Tlatah"] },
  Sekar: { desa: ["Bareng","Bobol","Deling","Klino","Miyono","Sekar"] },
  Sugihwaras: { desa: ["Alasgung","Balongrejo","Bareng","Bulu","Drenges","Genjor","Glagahan","Glagahwangi","Jatitengah","Kedungdowo","Nglajang","Panemon","Panunggalan","Siwalan","Sugihwaras","Trate","Wedoro"] },
  Sukosewu: { desa: ["Duyungan","Jumput","Kalicilik","Klepek","Pacing","Purwoasri","Semawot","Semenkidul","Sidodadi","Sidorejo","Sitiaji","Sukosewu","Sumberjokidul","Tegalkodo"] },
  Sumberejo: { desa: ["Banjarejo","Bogangin","Butoh","Deru","Jatigede","Karangdinoyo","Karangdowo","Kayulemah","Kedungrejo","Margoagung","Mejuwet","Mlinjeng","Ngampal","Pejambon","Pekuwon","Prayungan","Sambongrejo","Sendangagung","Sumberharjo","Sumberrejo","Sumuragung","Talun","Teleng","Tlogohaji","Tulungrejo","Wotan"] },
  Tambakrejo: { desa: ["Bakalan","Dolokgede","Gading","Gamongan","Jatimulyo","Jawik","Kacangan","Kalisumber","Malingmati","Mulyorejo","Napis","Ngrancang","Pengkol","Sendangrejo","Sukorejo","Tambakrejo","Tanjung","Turi"] },
  Temayang: { desa: ["Bakulan","Belun","Buntalan","Jono","Kedungsari","Kedungsumber","Ngujung","Pancur","Pandantoyo","Papringan","Soko","Temayang"] },
  Trucuk: { desa: ["Banjarsari","Guyangan","Kandangan","Kanten","Mori","Padang","Pagerwesi","Sranak","Sumbangtimun","Sumberejo","Trucuk","Tulungrejo"] },
};

// ============================================================
// Deterministic mock data generation
// ============================================================
function strSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function seeded(seed: number) {
  let s = seed || 1;
  return () => {
    s = (Math.imul(s, 1103515245) + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

const LIVELIHOODS = [
  "Petani padi & palawija","Buruh tani musiman","Petani tembakau","Petani & nelayan sungai",
  "Petani hutan & ladang","Petani & buruh industri","Pedagang & jasa","Petani subsisten",
  "Petani & penambang minyak","Buruh tani & serabutan","Petani & peternak",
];
const LANDUSES = [
  "Sawah irigasi","Sawah tadah hujan","Tegalan & ladang","Hutan rakyat & tegalan",
  "Bantaran bengawan, sawah","Permukiman padat & sawah","Hutan kapur, tegalan kering",
  "Sawah & permukiman","Kawasan industri minyak, ladang",
];
const RISKS = [
  ["Banjir"],["Banjir","Kekeringan"],["Kekeringan"],["Longsor","Kekeringan"],
  ["Banjir","Erosi"],["Tanah gerak"],["Longsor"],["Kekeringan parah"],
];

function vid(districtId: string, n: number) {
  return `${districtId}-v${String(n).padStart(2, "0")}`;
}

function buildVillages(): Village[] {
  const out: Village[] = [];
  Object.entries(CANONICAL).forEach(([kec, { desa, kel }]) => {
    const districtId = KECAMATAN_TO_DISTRICT_ID[kec];
    if (!districtId) return;
    const district = DISTRICTS.find((d) => d.id === districtId);
    if (!district) return;
    const all: { name: string; isKelurahan: boolean }[] = [
      ...(kel ?? []).map((n) => ({ name: n, isKelurahan: true })),
      ...desa.map((n) => ({ name: n, isKelurahan: false })),
    ];
    const total = all.length;
    const popPer = Math.round(district.population / total);
    const poorPer = Math.round(district.poorFamilies / total);

    all.forEach((v, i) => {
      const rand = seeded(strSeed(`${districtId}|${v.name}`));
      const popJitter = Math.round((rand() - 0.5) * popPer * 0.6);
      const poorJitter = Math.round((rand() - 0.5) * poorPer * 0.6);
      const population = Math.max(900, popPer + popJitter);
      const poorFamilies = Math.max(120, poorPer + poorJitter);
      // Kelurahan tend to be slightly less poor
      const kelBias = v.isKelurahan ? -8 : 0;
      const noise = () => Math.round((rand() - 0.5) * 12) + kelBias;
      const clamp = (x: number) => Math.max(5, Math.min(98, x));
      const scores: PovertyScale = {
        personal: clamp(district.scores.personal + noise()),
        social: clamp(district.scores.social + noise()),
        spatial: clamp(district.scores.spatial + noise()),
        structural: clamp(district.scores.structural + noise()),
      };
      const povertyRate = +(district.povertyRate + (rand() - 0.5) * 4 + (v.isKelurahan ? -2 : 0)).toFixed(1);
      const trends: Village["trend"][] = ["improving","stable","worsening"];
      const tr = v.isKelurahan ? "improving" : trends[Math.floor(rand() * 3)];

      out.push({
        id: vid(districtId, i + 1),
        districtId,
        name: v.name,
        isKelurahan: v.isKelurahan,
        population,
        poorFamilies,
        povertyRate: Math.max(3, povertyRate),
        scores,
        trend: tr,
        mainLivelihood: v.isKelurahan ? "Pedagang & jasa" : LIVELIHOODS[Math.floor(rand() * LIVELIHOODS.length)],
        landUse: v.isKelurahan ? "Permukiman padat, lahan komersial" : LANDUSES[Math.floor(rand() * LANDUSES.length)],
        disasterRisk: RISKS[Math.floor(rand() * RISKS.length)],
      });
    });
  });
  return out;
}

export const VILLAGES: Village[] = buildVillages();

// ============================================================
// Household mock data
// ============================================================
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

export function generateHouseholds(villageId: string, count: number = 12): Household[] {
  const rand = seeded(strSeed(villageId));
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

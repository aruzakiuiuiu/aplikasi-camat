import { useParams, useNavigate, Link } from "react-router-dom";
import { DISTRICTS, POVERTY_TYPES, getSeverity, getSeverityLabel, getSeverityColorClass, getSeverityHexColor } from "@/data/districts";
import { getVillageById } from "@/data/villages";
import { generateHouseholds } from "@/data/villages";

import {
  ArrowLeft, ChevronRight, MapPin, Users, Home, AlertTriangle,
  TrendingDown, TrendingUp, Minus, Sprout, Map, Zap, List
} from "lucide-react";

const TREND_ICON = {
  improving: <TrendingDown className="h-3.5 w-3.5 text-severity-low" />,
  stable: <Minus className="h-3.5 w-3.5 text-severity-medium" />,
  worsening: <TrendingUp className="h-3.5 w-3.5 text-severity-high" />,
};
const TREND_LABEL = { improving: "Membaik", stable: "Stabil", worsening: "Memburuk" };

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-primary">{icon}</span>
      <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">{title}</h3>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

export default function VillageProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const village = getVillageById(id ?? "");
  const district = village ? DISTRICTS.find(d => d.id === village.districtId) : null;
  const households = village ? generateHouseholds(village.id, 10) : [];

  if (!village || !district) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Desa tidak ditemukan.</p>
          <button onClick={() => navigate("/")} className="text-primary underline">Kembali ke dashboard</button>
        </div>
      </div>
    );
  }

  const avg = Math.round((village.scores.personal + village.scores.social + village.scores.spatial + village.scores.structural) / 4);
  const overallSeverity = getSeverity(avg);
  const severityClass = getSeverityColorClass(overallSeverity);
  const sevColor = severityClass.text;
  const sevBg = `${severityClass.bg} ${severityClass.text} ${severityClass.border}`;

  const conditionLabel = {
    sangat_miskin: "Sangat Miskin",
    miskin: "Miskin",
    hampir_miskin: "Hampir Miskin",
  };
  const conditionColor = {
    sangat_miskin: "bg-severity-high/10 text-severity-high border-severity-high/25",
    miskin: "bg-severity-medium/10 text-severity-medium border-severity-medium/25",
    hampir_miskin: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };

  return (
    <>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 pt-4">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/district/${district.id}`} className="hover:text-primary transition-colors">Kec. {district.name}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{village.isKelurahan ? "Kelurahan" : "Desa"} {village.name}</span>
        </nav>
      </div>

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-4 space-y-6">
        {/* Hero */}
        <div className="dashboard-card p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Home className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{village.isKelurahan ? "Kelurahan" : "Desa"} · Kecamatan {district.name}</p>
              <h1 className="text-xl font-bold text-foreground">{village.isKelurahan ? "Kelurahan" : "Desa"} {village.name}</h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${sevBg}`}>
              <AlertTriangle className="h-3.5 w-3.5" />
              Indeks Kemiskinan: {avg} — {getSeverityLabel(avg)}
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${village.trend === "improving" ? "bg-severity-low/10 text-severity-low border-severity-low/25" : village.trend === "worsening" ? "bg-severity-high/10 text-severity-high border-severity-high/25" : "bg-severity-medium/10 text-severity-medium border-severity-medium/25"}`}>
              {TREND_ICON[village.trend]}
              Tren: {TREND_LABEL[village.trend]}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="dashboard-card p-3">
              <p className="text-xs text-muted-foreground">Penduduk</p>
              <p className="text-xl font-bold text-foreground">{village.population.toLocaleString("id-ID")}</p>
            </div>
            <div className="dashboard-card p-3">
              <p className="text-xs text-muted-foreground">KK Miskin</p>
              <p className={`text-xl font-bold ${sevColor}`}>{village.poorFamilies.toLocaleString("id-ID")}</p>
            </div>
            <div className="dashboard-card p-3">
              <p className="text-xs text-muted-foreground">Tingkat Kemiskinan</p>
              <p className={`text-xl font-bold ${sevColor}`}>{village.povertyRate}%</p>
            </div>
            <div className="dashboard-card p-3">
              <p className="text-xs text-muted-foreground">Mata Pencaharian</p>
              <p className="text-sm font-semibold text-foreground leading-tight mt-1">{village.mainLivelihood}</p>
            </div>
          </div>
        </div>

        {/* 4 Scores */}
        <div>
          <SectionTitle icon={<AlertTriangle className="h-4 w-4" />} title="4 Dimensi Kemiskinan" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {POVERTY_TYPES.map(pt => {
              const score = village.scores[pt.key];
              const sev = getSeverity(score);
              const sevColor = getSeverityHexColor(sev);
              return (
                <div key={pt.key} className="dashboard-card p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: pt.color }} />
                    <span className="text-xs text-muted-foreground">{pt.shortLabel}</span>
                  </div>
                  <p className="text-xl font-bold" style={{ color: sevColor }}>{score}</p>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-1">
                    <div className="h-full rounded-full" style={{ width: `${score}%`, background: pt.color }} />
                  </div>
                  <p className="text-xs mt-1 font-medium" style={{ color: sevColor }}>{getSeverityLabel(score)}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spatial */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <SectionTitle icon={<Map className="h-4 w-4" />} title="Profil Wilayah" />
            <div className="dashboard-card p-4 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Penggunaan Lahan</p>
                <p className="text-sm text-foreground">{village.landUse}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Risiko Bencana</p>
                <div className="flex flex-wrap gap-2">
                  {village.disasterRisk.map((r, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-severity-high/10 text-severity-high border border-severity-high/20">
                      <AlertTriangle className="h-3 w-3" /> {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <SectionTitle icon={<Sprout className="h-4 w-4" />} title="Ekonomi Desa" />
            <div className="dashboard-card p-4">
              <p className="text-xs text-muted-foreground mb-1">Mata pencaharian utama</p>
              <p className="text-sm text-foreground font-medium">{village.mainLivelihood}</p>
            </div>
          </div>
        </div>

        {/* Household list preview */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <List className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Daftar Rumah Tangga Miskin</h3>
            <div className="flex-1 h-px bg-border" />
            <button
              onClick={() => navigate(`/village/${village.id}/households`)}
              className="text-xs text-primary hover:underline font-medium flex items-center gap-1"
            >
              Lihat semua <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="dashboard-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Kepala Keluarga</th>
                    <th className="px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">Anggota</th>
                    <th className="px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">Tanggungan</th>
                    <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Kondisi</th>
                    <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Bantuan Terakhir</th>
                  </tr>
                </thead>
                <tbody>
                  {households.slice(0, 5).map((hh, i) => (
                    <tr key={hh.id} className={`border-b border-border/50 hover:bg-muted/30 ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                      <td className="px-4 py-3 font-medium text-foreground">{hh.headName}</td>
                      <td className="px-4 py-3 text-center">{hh.memberCount}</td>
                      <td className="px-4 py-3 text-center">{hh.dependents}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${conditionColor[hh.economicCondition]}`}>
                          {conditionLabel[hh.economicCondition]}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-xs text-muted-foreground">
                          {hh.aidHistory.length > 0 ? `${hh.aidHistory[0].program} (${hh.aidHistory[0].year})` : "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-border bg-muted/20 flex justify-end">
              <button
                onClick={() => navigate(`/village/${village.id}/households`)}
                className="text-xs bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center gap-1.5"
              >
                <List className="h-3.5 w-3.5" />
                Lihat Daftar Lengkap Rumah Tangga Miskin
              </button>
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

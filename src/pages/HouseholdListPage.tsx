import { useParams, useNavigate, Link } from "react-router-dom";
import { DISTRICTS } from "@/data/districts";
import { getVillageById, generateHouseholds } from "@/data/villages";

import { ArrowLeft, ChevronRight, Users, Home, Briefcase, Gift, Tractor } from "lucide-react";

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

export default function HouseholdListPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const village = getVillageById(id ?? "");
  const district = village ? DISTRICTS.find(d => d.id === village.districtId) : null;
  const households = village ? generateHouseholds(village.id, 20) : [];

  if (!village || !district) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Desa tidak ditemukan.</p>
      </div>
    );
  }

  const counts = {
    sangat_miskin: households.filter(h => h.economicCondition === "sangat_miskin").length,
    miskin: households.filter(h => h.economicCondition === "miskin").length,
    hampir_miskin: households.filter(h => h.economicCondition === "hampir_miskin").length,
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
          <Link to={`/village/${village.id}`} className="hover:text-primary transition-colors">Desa {village.name}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">Daftar Rumah Tangga Miskin</span>
        </nav>
      </div>

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-4 space-y-5">
        {/* Header */}
        <div className="dashboard-card p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Desa {village.name} · Kec. {district.name}</p>
              <h1 className="text-xl font-bold text-foreground">Daftar Rumah Tangga Miskin</h1>
              <p className="text-sm text-muted-foreground mt-0.5">{village.poorFamilies.toLocaleString("id-ID")} KK miskin terdaftar · Menampilkan {households.length} sampel data</p>
            </div>
          </div>

          {/* Summary chips */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border bg-severity-high/10 text-severity-high border-severity-high/25">
              Sangat Miskin: {counts.sangat_miskin} KK
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border bg-severity-medium/10 text-severity-medium border-severity-medium/25">
              Miskin: {counts.miskin} KK
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border bg-yellow-50 text-yellow-700 border-yellow-200">
              Hampir Miskin: {counts.hampir_miskin} KK
            </span>
          </div>
        </div>

        {/* Household cards */}
        <div className="grid gap-4">
          {households.map((hh, i) => (
            <div key={hh.id} className="dashboard-card p-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                {/* Left: identity */}
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{hh.headName}</h3>
                    <p className="text-xs text-muted-foreground">ID: {hh.id}</p>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3.5 w-3.5" /> {hh.memberCount} anggota
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Home className="h-3.5 w-3.5" /> {hh.dependents} tanggungan
                      </span>
                    </div>
                  </div>
                </div>
                {/* Condition badge */}
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border self-start ${conditionColor[hh.economicCondition]}`}>
                  {conditionLabel[hh.economicCondition]}
                </span>
              </div>

              {/* Assets + Aid row */}
              <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Assets */}
                <div className="bg-muted/30 rounded-lg p-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Tractor className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Aset Rumah Tangga</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Lahan</span>
                    <span className="font-medium text-foreground">{hh.assets.land}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Ternak</span>
                    <span className="font-medium text-foreground">{hh.assets.livestock}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Usaha</span>
                    <span className="font-medium text-foreground">{hh.assets.business}</span>
                  </div>
                </div>

                {/* Aid history */}
                <div className="sm:col-span-1 lg:col-span-2 bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Gift className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Riwayat Bantuan Sosial</span>
                  </div>
                  {hh.aidHistory.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic">Belum pernah menerima bantuan tercatat</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {hh.aidHistory.map((aid, j) => (
                        <div key={j} className="text-xs bg-primary/5 border border-primary/15 rounded-md px-2 py-1">
                          <span className="font-semibold text-primary">{aid.program}</span>
                          <span className="text-muted-foreground"> · {aid.year} · {aid.amount}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center py-4 text-xs text-muted-foreground">
          Data menampilkan {households.length} dari {village.poorFamilies.toLocaleString("id-ID")} KK miskin terdaftar di Desa {village.name}
        </div>

        <footer className="text-center py-4 text-xs text-muted-foreground border-t border-border">
          <p>© 2026 CAMAT · Alat Bantu Kepemimpinan Wilayah · Kabupaten Bojonegoro</p>
        </footer>
      </main>
    </>
  );
}

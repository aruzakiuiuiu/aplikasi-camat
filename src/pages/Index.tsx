import SummaryCards from "@/components/dashboard/SummaryCards";
import PovertyCharts from "@/components/dashboard/PovertyCharts";
import DistrictTable from "@/components/dashboard/DistrictTable";
import MapPanel from "@/components/dashboard/MapPanel";

const Index = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* KPI Cards */}
      <SummaryCards />

      {/* Interactive Map */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Peta Kemiskinan Kecamatan</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <MapPanel />
      </section>

      {/* Charts Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Analisis Visual</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <PovertyCharts />
      </section>

      {/* District Table */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Data Kecamatan</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <DistrictTable />
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-muted-foreground border-t border-border">
        <p>© 2026 CAMAT (Cermat & Tepat) · Alat Bantu Kepemimpinan Wilayah · Kabupaten Bojonegoro</p>
        <p className="mt-1">Data diperbarui: Februari 2026 · Sumber: BPS, DTKS, BAPPEDA</p>
      </footer>
    </div>
  );
};

export default Index;

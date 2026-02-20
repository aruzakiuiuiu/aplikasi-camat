import { BarChart3, Bell, Calendar, RefreshCw } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header style={{ background: "var(--gradient-header)" }} className="text-nav-foreground px-6 py-4 shadow-lg">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 border border-accent/30">
            <BarChart3 className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs font-medium text-nav-foreground/60 tracking-widest uppercase">Kabupaten Bojonegoro</p>
            <h1 className="text-lg font-bold text-nav-foreground leading-tight">
              Monitoring Penanggulangan Kemiskinan
            </h1>
          </div>
        </div>

        {/* Right: Meta */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-nav-foreground/70 text-sm">
            <Calendar className="h-3.5 w-3.5" />
            <span>Februari 2026</span>
          </div>
          <div className="flex items-center gap-1.5 text-nav-foreground/70 text-sm">
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Diperbarui: 20 Feb 2026</span>
          </div>
          <button className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-nav-foreground/10 hover:bg-nav-foreground/20 transition-colors">
            <Bell className="h-4 w-4 text-nav-foreground/80" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
          </button>
        </div>
      </div>

      {/* Subtitle bar */}
      <div className="max-w-screen-2xl mx-auto mt-3 flex flex-wrap items-center gap-3 text-xs text-nav-foreground/60">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-poverty-individual inline-block" />
          Individual/Keluarga
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-poverty-natural inline-block" />
          Lingkungan Alam
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-poverty-social inline-block" />
          Lingkungan Sosial
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-poverty-structural inline-block" />
          Tata Kelola Struktural
        </span>
        <span className="ml-auto">28 Kecamatan · Sumber: BAPPEDA Bojonegoro</span>
      </div>
    </header>
  );
}

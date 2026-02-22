import { BarChart3, Bell, Calendar, RefreshCw, Shield } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { path: "/", label: "Dashboard" },
  { path: "/monev", label: "Monitoring & Evaluasi" },
  { path: "/simulasi", label: "Simulasi Intervensi" },
];

export default function DashboardHeader() {
  const location = useLocation();

  return (
    <header style={{ background: "var(--gradient-header)" }} className="text-nav-foreground shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 border border-accent/30">
            <Shield className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-nav-foreground leading-tight">
              CAMAT <span className="text-accent text-sm font-medium">Cermat & Tepat</span>
            </h1>
            <p className="text-xs font-medium text-nav-foreground/60 tracking-wide">
              Alat Bantu Kepemimpinan Wilayah · Kabupaten Bojonegoro
            </p>
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

      {/* Navigation bar */}
      <div className="max-w-screen-2xl mx-auto px-6 pb-2 flex flex-wrap items-center gap-1">
        {NAV_ITEMS.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                isActive
                  ? "bg-nav-foreground/20 text-nav-foreground"
                  : "text-nav-foreground/60 hover:bg-nav-foreground/10 hover:text-nav-foreground/80"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <span className="ml-auto text-xs text-nav-foreground/50">28 Kecamatan · Sumber: BAPPEDA Bojonegoro</span>
      </div>
    </header>
  );
}
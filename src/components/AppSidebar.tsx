import { LayoutDashboard, Activity, Calculator, Shield, AlertTriangle, MapPin, ChevronDown } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { DISTRICTS, getSeverity } from "@/data/districts";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const NAV_ITEMS = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Monitoring & Evaluasi", url: "/monev", icon: Activity },
  { title: "Simulasi Intervensi", url: "/simulasi", icon: Calculator },
];

const PRIORITY_DISTRICTS = [...DISTRICTS]
  .sort((a, b) => {
    const avgA = (a.scores.personal + a.scores.social + a.scores.spatial + a.scores.structural) / 4;
    const avgB = (b.scores.personal + b.scores.social + b.scores.spatial + b.scores.structural) / 4;
    return avgB - avgA;
  })
  .slice(0, 5);

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const isPriorityActive = PRIORITY_DISTRICTS.some(d => location.pathname === `/district/${d.id}`);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-sidebar-foreground leading-tight truncate">
                CAMAT
              </h1>
              <p className="text-[10px] text-sidebar-foreground/60 truncate">
                Cermat & Tepat
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Prioritas Intervensi</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen={isPriorityActive} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="5 Kecamatan Prioritas">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <span>Kecamatan Kritis</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {PRIORITY_DISTRICTS.map((d) => {
                        const avg = Math.round((d.scores.personal + d.scores.social + d.scores.spatial + d.scores.structural) / 4);
                        return (
                          <SidebarMenuSubItem key={d.id}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(`/district/${d.id}`)}
                            >
                              <NavLink
                                to={`/district/${d.id}`}
                                className="hover:bg-sidebar-accent/50"
                                activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                              >
                                <MapPin className="h-3 w-3 text-destructive flex-shrink-0" />
                                <span className="truncate">{d.name}</span>
                                <span className="ml-auto text-[10px] font-mono text-muted-foreground">{avg}</span>
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-3 py-3">
        {!collapsed && (
          <p className="text-[10px] text-sidebar-foreground/50 text-center leading-tight">
            Kabupaten Bojonegoro · 28 Kecamatan
          </p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useAuth } from "@/shared/contexts/auth-context";
import { filterNavigationByRoles } from "@/shared/utils/filter-navigation-by-roles";
import { SIDEBAR_NAVIGATION } from "@/shared/config/navigation.config";
import type { AppSidebarProps } from "@/shared/types/app-sidebar-props.types";
import { SidebarBrand } from "./sidebar-brand";
import { SidebarNavItem } from "./sidebar-nav-item";
import { SidebarUserCard } from "./sidebar-user-card";

export function AppSidebar({
  showBrand = true,
  items = SIDEBAR_NAVIGATION,
  user,
  brand,
  footer,
  itemClassName,
  itemBadges,
}: AppSidebarProps) {
  const pathname = usePathname();
  const { roles } = useAuth();
  const visibleItems = filterNavigationByRoles(items, roles);

  return (
    <Sidebar
      collapsible="offcanvas"
      className="top-app-header h-app-sidebar border-sidebar-border bg-sidebar text-sidebar-foreground"
    >
      {showBrand ? <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        {brand ?? <SidebarBrand />}
      </SidebarHeader> : null}

      <SidebarContent className="px-3 py-4">
        <nav aria-label="Menú principal">
          <SidebarMenu className="gap-1">
            {visibleItems.map((item) => (
              <SidebarNavItem
                key={item.label}
                item={item}
                pathname={pathname}
                className={itemClassName}
                badge={itemBadges?.[item.label]}
              />
            ))}
          </SidebarMenu>
        </nav>
      </SidebarContent>

      {footer ? (
        <SidebarFooter className="border-t border-sidebar-border px-3 py-4">{footer}</SidebarFooter>
      ) : (
        user && (
          <SidebarFooter className="border-t border-sidebar-border px-3 py-4">
            <SidebarUserCard user={user} />
          </SidebarFooter>
        )
      )}
    </Sidebar>
  );
}

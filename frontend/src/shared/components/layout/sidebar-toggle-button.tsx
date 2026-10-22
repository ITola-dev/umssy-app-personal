"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarToggleButton() {
  const { open, toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      type="button"
      onClick={toggleSidebar}
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={open}
      className="text-app-header-foreground hover:bg-app-header-foreground/10 hover:text-app-header-foreground focus-visible:ring-app-header-foreground"
    >
      <Menu className="size-5" aria-hidden="true" />
    </Button>
  );
}

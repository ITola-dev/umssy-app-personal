"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { WORKSPACE_SECTIONS } from "@/shared/config/workspace-sections.config";
import { useAuth } from "@/shared/contexts/auth-context";
import { getRouteRoles } from "@/shared/utils/get-route-roles";

export function ProfileFlowNavigation() {
  const pathname = usePathname();
  const { roles } = useAuth();
  const sections = WORKSPACE_SECTIONS.find((section) => section.id === "profile")?.items.filter((item) => roles.some((role) => getRouteRoles(item.href).includes(role))) ?? [];
  const currentIndex = sections.findIndex((item) => item.href === pathname);
  if (currentIndex < 1) return null;
  const previous = sections[currentIndex - 1];
  const next = sections[currentIndex + 1];

  return (
    <nav aria-label="Recorrido del perfil" className="flex items-center justify-between gap-6 border-t border-border pt-5">
      <Link href={previous.href} className="inline-flex items-center gap-2 text-sm text-accent underline-offset-4 hover:underline"><ArrowLeft className="size-4" aria-hidden="true" />{previous.label}</Link>
      <span className="text-xs text-text-secondary">Sección {currentIndex + 1} de {sections.length}</span>
      <Link href={next?.href ?? "/profile"} className="inline-flex items-center gap-2 text-sm font-semibold text-accent underline-offset-4 hover:underline">{next?.label ?? "Volver al resumen"}<ArrowRight className="size-4" aria-hidden="true" /></Link>
    </nav>
  );
}

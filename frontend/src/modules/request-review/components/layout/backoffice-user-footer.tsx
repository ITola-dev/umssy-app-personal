"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/shared/utils/get-initials";
import type { BackofficeUserFooterProps } from "../../types/backoffice-user-footer-props.types";

export function BackofficeUserFooter({ user, onLogout }: BackofficeUserFooterProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-sidebar-border bg-interaction text-sm font-semibold text-accent"
        aria-hidden="true"
      >
        {getInitials(user.fullName)}
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm font-semibold break-words text-sidebar-foreground">{user.fullName}</span>
        <span className="text-xs break-words text-text-secondary">{user.role}</span>
      </div>
      <Button
        type="button"
        variant="ghost"
        aria-label="Cerrar sesión"
        onClick={onLogout}
        className="mt-2 w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <LogOut strokeWidth={1.75} aria-hidden="true" />Cerrar sesión
      </Button>
    </div>
  );
}

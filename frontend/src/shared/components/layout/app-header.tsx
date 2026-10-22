"use client";

import Link from "next/link";
import { useAuth } from "@/shared/contexts/auth-context";
import { SidebarToggleButton } from "./sidebar-toggle-button";
import { NavigationSearch } from "./navigation-search";
import { AccountMenu } from "./account-menu";
import { BrandLogo } from "./brand-logo";
import type { AppHeaderProps } from "@/shared/types/app-header-props.types";

export function AppHeader({ brand }: AppHeaderProps) {
  const { roles } = useAuth();
  return (
    <header className="sticky top-0 z-30 flex h-app-header shrink-0 items-center gap-6 border-b border-app-header-foreground/15 bg-app-header px-6 text-app-header-foreground">
      <div className="flex w-54 shrink-0 items-center gap-3">
        {brand ?? <Link href="/dashboard" aria-label="UMSSY, ir al inicio" className="rounded-md bg-surface px-3 py-2"><BrandLogo className="w-40" priority /></Link>}
      </div>
      <SidebarToggleButton />
      <div className="min-w-0 flex-1"><NavigationSearch /></div>
      <div className="flex shrink-0 items-center gap-4">
        <AccountMenu roles={roles} />
      </div>
    </header>
  );
}

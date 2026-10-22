import type { SidebarUserCardProps } from "@/shared/types/sidebar-user-card-props.types";
import { getInitials } from "@/shared/utils/get-initials";

export function SidebarUserCard({ user, action }: SidebarUserCardProps) {
  return (
    <div className="flex w-full flex-wrap items-center gap-3 rounded-md p-2">
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-sidebar-border bg-interaction text-sm font-semibold text-accent"
        aria-hidden="true"
      >
        {getInitials(user.fullName)}
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-semibold text-sidebar-foreground">{user.fullName}</span>
        <span className="mt-0.5 text-xs text-text-secondary">{user.role}</span>
      </div>
      {action ? <div className="w-full border-t border-sidebar-border pt-3">{action}</div> : null}
    </div>
  );
}

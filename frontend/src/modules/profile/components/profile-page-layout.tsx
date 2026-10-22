import type { ProfilePageLayoutProps } from "../types/profile-page-layout-props.types";
import { WorkspacePage } from "@/shared/components/layout/workspace-page";
import { ProfileFlowNavigation } from "./profile-flow-navigation";

export function ProfilePageLayout({ title, description, children }: ProfilePageLayoutProps) {
  return <WorkspacePage title={title} description={description}>{children}<ProfileFlowNavigation /></WorkspacePage>;
}

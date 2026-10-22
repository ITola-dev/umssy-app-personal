import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { RoleTag } from "@/shared/types/role-tag.types";
import { ProfileFlowNavigation } from "./profile-flow-navigation";

const state = vi.hoisted(() => ({ pathname: "/profile", roles: ["titulado"] as RoleTag[] }));
vi.mock("next/navigation", () => ({ usePathname: () => state.pathname }));
vi.mock("@/shared/contexts/auth-context", () => ({ useAuth: () => ({ roles: state.roles }) }));

describe("Profile flow navigation", () => {
  beforeEach(() => { state.pathname = "/profile"; state.roles = ["titulado"]; });
  afterEach(cleanup);

  it("keeps the summary free of a redundant next-step bar", () => {
    render(<ProfileFlowNavigation />);
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  it("connects adjacent profile sections", () => {
    state.pathname = "/profile/trajectory/education";
    render(<ProfileFlowNavigation />);
    expect(screen.getByRole("link", { name: "Presentación" })).toHaveAttribute("href", "/profile/presentation");
    expect(screen.getByRole("link", { name: "Experiencia laboral" })).toHaveAttribute("href", "/profile/trajectory/experience");
  });

  it("returns company users to the summary without exposing the graduate radar", () => {
    state.roles = ["empresa"];
    state.pathname = "/profile/documents";
    render(<ProfileFlowNavigation />);
    expect(screen.getByRole("link", { name: "Volver al resumen" })).toHaveAttribute("href", "/profile");
    expect(screen.queryByRole("link", { name: "Radar de afinidad" })).toBeNull();
  });

  it("hides the pager when the account cannot access the current section", () => {
    state.roles = ["administrativo"];
    state.pathname = "/profile/presentation";
    render(<ProfileFlowNavigation />);
    expect(screen.queryByRole("navigation")).toBeNull();
  });
});

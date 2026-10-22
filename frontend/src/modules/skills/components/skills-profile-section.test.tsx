import { cleanup, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithQuery as render } from "@/shared/testing/render-with-query";
import { skillsService } from "../services/skills.service";
import { SkillsProfileSection } from "./skills-profile-section";

vi.mock("../services/skills.service", () => ({ skillsService: { getCatalog: vi.fn(), getMySkills: vi.fn(), createCustomSkill: vi.fn(), saveMySkills: vi.fn() } }));
const PYTHON = { id: "python", name: "Python" };
const SQL = { id: "sql", name: "SQL" };
beforeEach(() => { vi.mocked(skillsService.getCatalog).mockResolvedValue([PYTHON, SQL]); vi.mocked(skillsService.getMySkills).mockResolvedValue([PYTHON]); });
afterEach(() => { cleanup(); vi.clearAllMocks(); });

describe("SkillsProfileSection", () => {
  it("keeps draft selections out of the summary and confirms discarding them", async () => {
    const user = userEvent.setup();
    render(<SkillsProfileSection />);
    await screen.findByText("Python");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Editar habilidades" }));
    await user.click(screen.getByRole("button", { name: "Añadir" }));
    await user.click(screen.getByRole("button", { name: "Cancelar" }));
    const confirmation = await screen.findByRole("alertdialog");
    await user.click(within(confirmation).getByRole("button", { name: "Descartar cambios" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.queryByText("SQL")).not.toBeInTheDocument();
    expect(skillsService.saveMySkills).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Editar habilidades" }));
    expect(screen.queryByRole("button", { name: "Quitar SQL" })).not.toBeInTheDocument();
  });

  it("retains the editor after a failed save and updates the summary only after success", async () => {
    const user = userEvent.setup();
    vi.mocked(skillsService.saveMySkills).mockRejectedValueOnce(new Error("Network error")).mockResolvedValue([PYTHON, SQL]);
    render(<SkillsProfileSection />);
    await screen.findByText("Python");
    await user.click(screen.getByRole("button", { name: "Editar habilidades" }));
    await user.click(screen.getByRole("button", { name: "Añadir" }));
    await user.click(screen.getByRole("button", { name: "Guardar habilidades" }));
    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Quitar SQL" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Guardar habilidades" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(screen.getByText("SQL")).toBeInTheDocument();
    expect(skillsService.saveMySkills).toHaveBeenLastCalledWith([PYTHON.id, SQL.id]);
  });
});

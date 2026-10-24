import { render, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { SavedCv } from "../types/saved-cv.types";
import { CvListItem } from "./cv-list-item";

const CV: SavedCv = {
  id: "cv-1",
  fileName: "CV_Valeria_Quispe.pdf",
  fileType: "PDF",
  sizeInBytes: 1258291,
  updatedAt: new Date(2026, 8, 20),
  isCurrent: false,
};

function renderItem(cv: SavedCv = CV, isBusy = false) {
  const onDelete = vi.fn();
  render(
    <ul>
      <CvListItem cv={cv} isBusy={isBusy} onDelete={onDelete} />
    </ul>,
  );
  return { onDelete, user: userEvent.setup() };
}

describe("CvListItem", () => {
  afterEach(() => {
    cleanup();
  });

  it("shows the name, type, size and upload date of the cv", () => {
    renderItem();

    expect(screen.getByText("CV_Valeria_Quispe.pdf")).toBeInTheDocument();
    expect(screen.getByText("PDF · 1.2 MB · Subido el 20 sep 2026")).toBeInTheDocument();
    expect(screen.queryByText("Vigente")).not.toBeInTheDocument();
  });

  it("flags the current cv", () => {
    renderItem({ ...CV, isCurrent: true });

    expect(screen.getByText("Vigente")).toBeInTheDocument();
  });

  it("calls onDelete with the cv", async () => {
    const { onDelete, user } = renderItem();

    await user.click(screen.getByRole("button", { name: "Eliminar CV_Valeria_Quispe.pdf" }));

    expect(onDelete).toHaveBeenCalledWith(CV);
  });

  it("disables the delete action while busy", () => {
    renderItem(CV, true);

    expect(screen.getByRole("button", { name: "Eliminar CV_Valeria_Quispe.pdf" })).toBeDisabled();
  });
});

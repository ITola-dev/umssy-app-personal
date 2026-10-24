import { ConfirmDeleteDialog } from "@/modules/profile";
import type { DeleteCvDialogProps } from "../types/delete-cv-dialog-props.types";

export function DeleteCvDialog({
  cv,
  hasOtherCvs,
  isDeleting = false,
  onConfirm,
  onCancel,
}: DeleteCvDialogProps) {
  const fileName = (cv?.fileName ?? "").trim();
  const nextCurrentNotice =
    cv?.isCurrent && hasOtherCvs ? " Tu CV anterior más reciente pasará a ser el vigente." : "";

  return (
    <ConfirmDeleteDialog
      isOpen={cv !== null}
      title="¿Eliminar este CV?"
      message={`${fileName || "El archivo"} dejará de estar disponible en tu perfil.${nextCurrentNotice}`}
      isDeleting={isDeleting}
      onConfirm={cv ? () => onConfirm(cv) : onCancel}
      onCancel={onCancel}
    />
  );
}

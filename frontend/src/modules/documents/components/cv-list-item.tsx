import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/modules/profile";
import type { CvListItemProps } from "../types/cv-list-item-props.types";
import { formatUploadDate } from "../utils/format-upload-date";

export function CvListItem({ cv, isBusy = false, onDelete }: CvListItemProps) {
  return (
    <li className="flex items-start justify-between gap-4 border-b border-border py-4 first:pt-0 last:border-b-0 last:pb-0">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-base font-bold [overflow-wrap:anywhere] break-words text-ink">{cv.fileName}</p>
          {cv.isCurrent ? (
            <Badge className="border-availability-border bg-availability text-availability-foreground">
              Vigente
            </Badge>
          ) : null}
        </div>
        <p className="mt-1 text-sm text-text-secondary">
          {cv.fileType} · {formatFileSize(cv.sizeInBytes)} · Subido el {formatUploadDate(cv.updatedAt)}
        </p>
      </div>
      <Button
        type="button"
        variant="ghost"
        aria-label={`Eliminar ${cv.fileName}`}
        className="size-9 shrink-0 p-0 text-danger hover:bg-brand-red/10 hover:text-danger"
        disabled={isBusy}
        onClick={() => onDelete(cv)}
      >
        <Trash2 className="size-4" aria-hidden="true" />
      </Button>
    </li>
  );
}

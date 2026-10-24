import type { SavedCv } from "./saved-cv.types";

export interface SavedCvCardProps {
  cvs?: SavedCv[] | null;
  totalCvs?: number;
  isLoading?: boolean;
  isBusy?: boolean;
  onDelete: (cv: SavedCv) => void;
  onOpenHistory: () => void;
}

import type { SavedCv } from "./saved-cv.types";

export interface CvListItemProps {
  cv: SavedCv;
  isBusy?: boolean;
  onDelete: (cv: SavedCv) => void;
}

"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { FeedbackMessage } from "@/modules/profile";
import { ProfilePageLayout } from "@/modules/profile";
import type { Feedback } from "@/modules/profile";
import { CvHistoryDialog } from "../components/cv-history-dialog";
import { CvUploadCard } from "../components/cv-upload-card";
import { DeleteCvDialog } from "../components/delete-cv-dialog";
import { ReplaceCvDialog } from "../components/replace-cv-dialog";
import { SavedCvCard } from "../components/saved-cv-card";
import { CV_ERROR_MESSAGES } from "../constants/cv-error-messages.constants";
import { CV_FILE_INPUT_ACCEPT } from "../constants/cv-upload.constants";
import { useCvDocument } from "../hooks/use-cv-document";
import type { SavedCv } from "../types/saved-cv.types";
import { getCvErrorMessage } from "../utils/get-cv-error-message";
import { isCvFileRejection } from "../utils/is-cv-file-rejection";
import { validateCvFile } from "../utils/validate-cv-file";

export function DocumentsCvView() {
  const {
    recentCvs,
    currentCv,
    totalCvs,
    isLoading,
    isUploading,
    isDeleting,
    loadError,
    uploadCv,
    deleteCv,
  } = useCvDocument();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pendingReplacement, setPendingReplacement] = useState<File | null>(null);
  const [replaceError, setReplaceError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [cvToDelete, setCvToDelete] = useState<SavedCv | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const isBusy = isUploading || isDeleting;
  const visibleFeedback: Feedback | null =
    feedback ?? (loadError ? { type: "error", message: loadError } : null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    const validationError = validateCvFile(file);

    if (validationError) {
      setSelectedFile(null);
      setFeedback({ type: "error", message: validationError });
      return;
    }

    setFeedback(null);

    if (currentCv) {
      setReplaceError(null);
      setPendingReplacement(file);
      return;
    }

    setSelectedFile(file);
  };

  const handleConfirmUpload = async (file: File) => {
    setFeedback(null);

    try {
      await uploadCv(file);
      setSelectedFile(null);
      setFeedback({ type: "success", message: "Tu CV se cargó correctamente." });
    } catch (error) {
      if (isCvFileRejection(error)) {
        setSelectedFile(null);
      }
      setFeedback({ type: "error", message: getCvErrorMessage(error, CV_ERROR_MESSAGES.upload) });
    }
  };

  const closeReplaceDialog = () => {
    setPendingReplacement(null);
    setReplaceError(null);
  };

  const handleConfirmReplace = async (file: File) => {
    setReplaceError(null);

    try {
      await uploadCv(file);
      closeReplaceDialog();
      setFeedback({ type: "success", message: "Tu nueva versión del CV se cargó correctamente." });
    } catch (error) {
      const message = getCvErrorMessage(error, CV_ERROR_MESSAGES.upload);

      if (isCvFileRejection(error)) {
        closeReplaceDialog();
        setFeedback({ type: "error", message });
      } else {
        setReplaceError(message);
      }
    }
  };

  const openDeleteDialog = (cv: SavedCv) => {
    setFeedback(null);
    setCvToDelete(cv);
  };

  const removeCv = async (cv: SavedCv) => {
    setFeedback(null);

    try {
      await deleteCv(cv.id);
      setFeedback({ type: "success", message: "El CV se eliminó." });
    } catch (error) {
      setFeedback({ type: "error", message: getCvErrorMessage(error, CV_ERROR_MESSAGES.delete) });
    }
  };

  const handleConfirmDelete = async (cv: SavedCv) => {
    await removeCv(cv);
    setCvToDelete(null);
  };

  return (
    <ProfilePageLayout
      title="Documentos y CV"
      description="Sube tu CV para tenerlo disponible en el perfil y mantenerlo actualizado"
    >
      {visibleFeedback ? <FeedbackMessage feedback={visibleFeedback} /> : null}
      <Input
        ref={fileInputRef}
        type="file"
        accept={CV_FILE_INPUT_ACCEPT}
        aria-label="Archivo PDF del CV"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="grid grid-cols-2 items-start gap-6">
        <CvUploadCard
          selectedFile={selectedFile}
          hasSavedCv={currentCv !== null}
          isLoading={isLoading}
          isUploading={isUploading}
          isBusy={isBusy}
          onSelectFile={openFilePicker}
          onConfirmUpload={handleConfirmUpload}
        />
        <SavedCvCard
          cvs={recentCvs}
          totalCvs={totalCvs}
          isLoading={isLoading}
          isBusy={isBusy}
          onDelete={openDeleteDialog}
          onOpenHistory={() => setIsHistoryOpen(true)}
        />
      </div>
      <ReplaceCvDialog
        file={pendingReplacement}
        currentFileName={currentCv?.fileName}
        isReplacing={isUploading}
        errorMessage={replaceError}
        onConfirm={handleConfirmReplace}
        onCancel={closeReplaceDialog}
      />
      <DeleteCvDialog
        cv={cvToDelete}
        hasOtherCvs={totalCvs > 1}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setCvToDelete(null)}
      />
      <CvHistoryDialog
        isOpen={isHistoryOpen}
        isDeleting={isDeleting}
        onDelete={removeCv}
        onClose={() => setIsHistoryOpen(false)}
      />
    </ProfilePageLayout>
  );
}

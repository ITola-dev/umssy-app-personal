"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeedbackMessage, SectionCard } from "@/modules/profile";
import { RecordEditorDialog } from "@/shared/components/layout/record-editor-dialog";
import { useSkills } from "../hooks/use-skills";
import { SkillsSelector } from "./skills-selector";

export function SkillsProfileSection() {
  const skills = useSkills();
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [savedNames, setSavedNames] = useState<string[] | null>(null);
  const names = savedNames ?? skills.selectedSkills.map((skill) => skill.name);

  function closeEditor() {
    setIsEditing(false);
    setHasChanges(false);
    void skills.reload();
  }

  async function handleSave() {
    if (await skills.saveSkills()) {
      setSavedNames(skills.selectedSkills.map((skill) => skill.name));
      setIsEditing(false);
      setHasChanges(false);
    }
  }

  return (
    <section id="skills" aria-label="Habilidades" className="scroll-mt-24 space-y-4">
      <SectionCard title="Habilidades" action={<Button variant="outline" size="sm" disabled={skills.isLoading || skills.hasLoadError} onClick={() => { setSavedNames(skills.selectedSkills.map((skill) => skill.name)); setIsEditing(true); }}><Pencil aria-hidden="true" />Editar habilidades</Button>}>
        {skills.isLoading ? <p role="status" className="text-sm text-text-secondary">Cargando habilidades…</p> : skills.hasLoadError ? <><FeedbackMessage feedback={skills.feedback} /><Button variant="outline" onClick={() => void skills.reload()}>Volver a intentar</Button></> : names.length ? <ul className="flex flex-wrap gap-2">{names.map((name) => <li key={name} className="rounded-md bg-interaction px-3 py-1.5 text-sm font-medium text-accent">{name}</li>)}</ul> : <p className="text-sm text-text-secondary">Añade las habilidades que mejor representan tu experiencia.</p>}
      </SectionCard>
      {isEditing ? <RecordEditorDialog title="Editar habilidades" description="Selecciona tus habilidades y guarda para actualizar el perfil." isBusy={skills.isSaving} hasUnsavedChanges={hasChanges} onClose={closeEditor}>
        {(requestClose) => <>
          <SkillsSelector catalogSkills={skills.catalogSkills} selectedSkills={skills.selectedSkills} isSaving={skills.isSaving} hasLoadError={skills.hasLoadError} feedback={skills.feedback} onRetry={() => void skills.reload()} onAddSkill={(skill) => { setHasChanges(true); skills.addSkill(skill); }} onRemoveSkill={(id) => { setHasChanges(true); skills.removeSkill(id); }} onCreateCustomSkill={(name) => { setHasChanges(true); skills.createCustomSkill(name); }} onSave={() => void handleSave()} />
          <div className="flex justify-end border-t border-border pt-4"><Button variant="outline" onClick={requestClose} disabled={skills.isSaving}>Cancelar</Button></div>
        </>}
      </RecordEditorDialog> : null}
    </section>
  );
}

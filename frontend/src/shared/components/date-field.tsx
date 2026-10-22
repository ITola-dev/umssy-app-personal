"use client";

import { useState } from "react";
import { CalendarDays, X } from "lucide-react";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import type { DateFieldProps } from "@/shared/types/date-field-props.types";

function formatDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value.split("-").reverse().join("/") : value;
}

function parseDate(value: string) {
  const normalized = formatDate(value);
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(normalized);
  if (!match) return "";
  const [, day, month, year] = match;
  const date = new Date(`${year}-${month}-${day}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.getUTCDate() === Number(day) && date.getUTCMonth() + 1 === Number(month) ? `${year}-${month}-${day}` : "";
}

export function DateField({ value, onValueChange, onBlur, ...props }: DateFieldProps) {
  const [draft, setDraft] = useState({ value, display: formatDate(value) });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  if (value !== draft.value) setDraft({ value, display: formatDate(value) });
  const input = <Input {...props} className={cn(!props.readOnly && "pr-11", props.className)} type="text" inputMode="numeric" placeholder="dd/mm/aaaa" pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" maxLength={10} value={draft.display} aria-invalid={draft.display.length === 10 && !parseDate(draft.display) ? true : props["aria-invalid"]} onChange={(event) => {
    const display = formatDate(event.target.value);
    const parsed = parseDate(display);
    const nextValue = parsed || display;
    setDraft({ value: nextValue, display });
    onValueChange?.(nextValue);
  }} onBlur={(event) => { if (draft.value) setDraft({ value: draft.value, display: formatDate(draft.value) }); onBlur?.(event); }} />;
  if (props.readOnly) return input;
  function getCalendarDate(iso: string) {
    const [year, month, day] = iso.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  const selectedIso = parseDate(value);
  const selectedDate = selectedIso ? getCalendarDate(selectedIso) : undefined;
  const minDate = typeof props.min === "string" ? getCalendarDate(props.min) : undefined;
  const maxDate = typeof props.max === "string" ? getCalendarDate(props.max) : undefined;
  return <div className="relative">
    {input}
    <Button type="button" variant="ghost" size="icon-sm" className="absolute top-1/2 right-2 -translate-y-1/2 text-accent" aria-label="Elegir fecha en el calendario" aria-haspopup="dialog" aria-expanded={isCalendarOpen} disabled={props.disabled} onClick={() => setIsCalendarOpen(true)}><CalendarDays aria-hidden="true" /></Button>
    <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <DialogContent showCloseButton={false} className="w-fit p-5">
        <DialogClose render={<Button variant="ghost" size="icon-sm" className="absolute top-3 right-3" aria-label="Cerrar calendario" />}><X aria-hidden="true" /></DialogClose>
        <DialogHeader><DialogTitle>Seleccionar fecha</DialogTitle></DialogHeader>
        <Calendar locale={es} labels={{ labelMonthDropdown: () => "Mes", labelYearDropdown: () => "Año", labelNext: () => "Mes siguiente", labelPrevious: () => "Mes anterior" }} mode="single" captionLayout="dropdown" selected={selectedDate} defaultMonth={selectedDate ?? maxDate} startMonth={minDate ?? new Date(1900, 0, 1)} endMonth={maxDate ?? new Date(new Date().getFullYear() + 10, 11, 31)} disabled={[...(minDate ? [{ before: minDate }] : []), ...(maxDate ? [{ after: maxDate }] : [])]} onSelect={(date) => {
          if (!date) return;
          const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
          setDraft({ value: iso, display: formatDate(iso) });
          onValueChange?.(iso);
          setIsCalendarOpen(false);
        }} />
      </DialogContent>
    </Dialog>
  </div>;
}

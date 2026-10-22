import { ArrowLeft, BriefcaseBusiness, MapPin } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PageHeading } from "@/shared/components/layout";
import { vacancies } from "../data/vacancies";
import type { VacancyDetailViewProps } from "../types/vacancy-detail-view-props.types";

export function VacancyDetailView({ id }: VacancyDetailViewProps) {
  const vacancy = vacancies.find((item) => item.id === Number(id));
  const backLink = <Link href="/vacancies" className="inline-flex items-center gap-2 text-sm font-medium text-accent underline-offset-4 hover:underline"><ArrowLeft className="size-4" aria-hidden="true" />Volver a vacantes</Link>;

  if (!vacancy) return <main className="mx-auto w-full max-w-browse space-y-8">{backLink}<PageHeading title="Vacante no encontrada" description="La oferta solicitada no está disponible. Puedes explorar otras vacantes." /><Link href="/vacancies" className={buttonVariants({ variant: "outline" })}>Explorar vacantes</Link></main>;

  return (
    <main className="mx-auto w-full max-w-browse space-y-8">
      {backLink}
      <PageHeading title={vacancy.cargo} description={vacancy.empresa} />
      <div className="grid grid-cols-3 items-start gap-8">
        <article className="col-span-2 min-w-0 space-y-8">
          <section aria-labelledby="vacancy-description"><h2 id="vacancy-description" className="mb-3 text-lg font-semibold">Descripción</h2><p className="max-w-prose text-sm leading-relaxed whitespace-pre-line text-ink-soft">{vacancy.descripcion}</p></section>
          <section aria-labelledby="vacancy-requirements" className="border-t border-border pt-6"><h2 id="vacancy-requirements" className="mb-3 text-lg font-semibold">Requisitos</h2><ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">{vacancy.requisitos.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul></section>
        </article>
        <aside aria-label="Condiciones de la vacante" className="rounded-lg border border-border bg-surface-soft p-5"><h2 className="mb-4 flex items-center gap-2 text-sm font-semibold"><BriefcaseBusiness className="size-4 text-accent" aria-hidden="true" />Condiciones</h2><dl className="space-y-4 text-sm"><div><dt className="text-xs text-text-secondary">Salario</dt><dd className="mt-1 font-semibold">{vacancy.salario}</dd></div><div><dt className="flex items-center gap-1 text-xs text-text-secondary"><MapPin className="size-3.5" aria-hidden="true" />Ubicación</dt><dd className="mt-1">{vacancy.ubicacion}</dd></div><div><dt className="text-xs text-text-secondary">Tipo de contrato</dt><dd className="mt-1">{vacancy.tipoContrato}</dd></div><div><dt className="text-xs text-text-secondary">Jornada</dt><dd className="mt-1">{vacancy.jornada}</dd></div></dl></aside>
      </div>
    </main>
  );
}

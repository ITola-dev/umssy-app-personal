import Link from "next/link";
import { BrandLogo } from "./brand-logo";
import { buttonVariants } from "@/components/ui/button";

export function PublicHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex min-h-28 max-w-[1440px] items-center justify-between gap-6 px-8 py-4">
        <Link href="/" aria-label="UMSSY, volver al inicio" className="shrink-0"><BrandLogo priority className="w-64" /></Link>
        <nav aria-label="Navegación pública" className="flex items-center gap-8 text-sm font-medium text-ink">
          <Link className="hover:text-accent" href="/workshops">Talleres</Link>
          <Link className="hover:text-accent" href="/#community">La comunidad</Link>
          <Link className="hover:text-accent" href="/#how-it-works">Cómo funciona</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className={buttonVariants({ variant: "outline" })}>Iniciar sesión</Link>
          <Link href="/request-access" className={buttonVariants()}>Solicitar acceso</Link>
        </div>
      </div>
    </header>
  );
}

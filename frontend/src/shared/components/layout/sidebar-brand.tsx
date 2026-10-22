import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "./brand-logo";
export function SidebarBrandIcon() {
  return <Image src="/icons/umssy-simbolo-web.svg" alt="" width={48} height={48} className="size-12 shrink-0" aria-hidden="true" />;
}
export function SidebarBrand() {
  return <Link href="/dashboard" aria-label="UMSSY, ir al inicio" className="block rounded-md bg-surface px-3 py-2"><BrandLogo className="w-40" priority /></Link>;
}

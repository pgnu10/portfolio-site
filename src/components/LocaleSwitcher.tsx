"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const otherLocale = locale === "ko" ? "en" : "ko";
  const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <Link
      href={newPath}
      className="px-2 py-1 rounded-md text-xs font-mono font-medium border border-border hover:bg-muted transition-colors"
    >
      {otherLocale.toUpperCase()}
    </Link>
  );
}

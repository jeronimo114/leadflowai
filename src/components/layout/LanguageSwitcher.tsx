"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  locale: string;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    // Remove current locale from pathname and add new one
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    const newPath = `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted" />
      <div className="flex items-center">
        <button
          onClick={() => switchLocale("en")}
          className={`px-2 py-1 text-sm font-medium rounded-l-md transition-colors ${
            locale === "en"
              ? "bg-primary text-white"
              : "bg-card text-muted hover:text-foreground"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => switchLocale("es")}
          className={`px-2 py-1 text-sm font-medium rounded-r-md transition-colors ${
            locale === "es"
              ? "bg-primary text-white"
              : "bg-card text-muted hover:text-foreground"
          }`}
        >
          ES
        </button>
      </div>
    </div>
  );
}

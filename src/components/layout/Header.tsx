"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Menu, X, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  locale: string;
  onBookDemo: () => void;
}

export default function Header({ locale, onBookDemo }: HeaderProps) {
  const t = useTranslations("nav");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/features`, label: t("features") },
    { href: `/${locale}/pricing`, label: t("pricing") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              LeadFlow AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted hover:text-foreground font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher locale={locale} />
            <Button onClick={onBookDemo} size="sm">
              {t("bookDemo")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-card transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-muted hover:text-foreground hover:bg-card rounded-lg font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center justify-between px-4 py-3 border-t border-border mt-2">
                <LanguageSwitcher locale={locale} />
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookDemo();
                  }}
                  size="sm"
                >
                  {t("bookDemo")}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

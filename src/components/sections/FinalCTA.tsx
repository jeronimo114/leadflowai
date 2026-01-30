"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

interface FinalCTAProps {
  onBookDemo: () => void;
}

export default function FinalCTA({ onBookDemo }: FinalCTAProps) {
  const t = useTranslations("finalCta");

  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Background gradient card */}
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 md:p-16 text-center text-white overflow-hidden relative">
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("title")}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                {t("subtitle")}
              </p>
              <Button
                onClick={onBookDemo}
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                {t("button")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Zap, Heart, Target } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Card, { CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import BookingModal from "@/components/booking/BookingModal";

export default function AboutPage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const t = useTranslations("about");
  const nav = useTranslations("nav");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const values = [
    {
      icon: Zap,
      title: t("values.value1.title"),
      description: t("values.value1.description"),
      color: "bg-yellow-500",
    },
    {
      icon: Heart,
      title: t("values.value2.title"),
      description: t("values.value2.description"),
      color: "bg-red-500",
    },
    {
      icon: Target,
      title: t("values.value3.title"),
      description: t("values.value3.description"),
      color: "bg-secondary",
    },
  ];

  return (
    <>
      <Header
        locale={locale}
        onBookDemo={() => setIsBookingOpen(true)}
      />

      <main className="pt-20">
        {/* Hero */}
        <section className="section bg-gradient-to-br from-primary/5 via-white to-secondary/5">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-lg text-muted">{t("hero.subtitle")}</p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                {t("story.title")}
              </h2>
              <div className="prose prose-lg mx-auto text-muted">
                <p className="mb-6">{t("story.p1")}</p>
                <p>{t("story.p2")}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="section bg-card">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground">
                {t("values.title")}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card hover className="h-full text-center">
                    <CardHeader>
                      <div
                        className={`w-14 h-14 ${value.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                      >
                        <value.icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle>{value.title}</CardTitle>
                      <CardDescription>{value.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-foreground mb-8">
                {t("team.title")}
              </h2>
              <p className="text-muted max-w-xl mx-auto mb-8">
                {t("team.placeholder")}
              </p>

              {/* Team placeholder */}
              <div className="flex justify-center gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <div className="w-24 h-24 bg-card rounded-full mx-auto mb-4" />
                    <div className="h-4 w-20 bg-card rounded mx-auto mb-2" />
                    <div className="h-3 w-16 bg-card rounded mx-auto" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="section bg-primary text-white">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-6">
                {locale === "es"
                  ? "¿Listo para trabajar con nosotros?"
                  : "Ready to work with us?"}
              </h2>
              <Button
                size="lg"
                onClick={() => setIsBookingOpen(true)}
                className="bg-white text-primary hover:bg-white/90"
              >
                {nav("bookDemo")}
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        locale={locale}
      />
    </>
  );
}

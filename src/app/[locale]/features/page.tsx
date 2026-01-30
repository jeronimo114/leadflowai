"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Zap,
  Brain,
  MessageSquare,
  Users,
  BarChart3,
  Plug,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import BookingModal from "@/components/booking/BookingModal";

export default function FeaturesPage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const t = useTranslations("features");
  const nav = useTranslations("nav");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const features = [
    {
      icon: Zap,
      title: t("instantResponse.title"),
      description: t("instantResponse.description"),
      color: "bg-yellow-500",
    },
    {
      icon: Brain,
      title: t("smartQualification.title"),
      description: t("smartQualification.description"),
      color: "bg-secondary",
    },
    {
      icon: MessageSquare,
      title: t("multiChannel.title"),
      description: t("multiChannel.description"),
      color: "bg-blue-500",
    },
    {
      icon: Users,
      title: t("handoff.title"),
      description: t("handoff.description"),
      color: "bg-green-500",
    },
    {
      icon: BarChart3,
      title: t("analytics.title"),
      description: t("analytics.description"),
      color: "bg-purple-500",
    },
  ];

  const integrations = [
    "WhatsApp Business",
    "Gmail",
    "Google Calendar",
    "Zapier",
    "HubSpot",
    "Salesforce",
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

        {/* Features Grid */}
        <section className="section">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card hover className="h-full">
                    <CardHeader>
                      <div
                        className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4`}
                      >
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="section bg-card">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Plug className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t("integrations.title")}
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                {t("integrations.subtitle")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
            >
              {integrations.map((integration) => (
                <div
                  key={integration}
                  className="px-6 py-3 bg-white rounded-full border border-border shadow-sm font-medium text-foreground"
                >
                  {integration}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {locale === "es"
                  ? "¿Listo para automatizar tu respuesta a leads?"
                  : "Ready to automate your lead response?"}
              </h2>
              <Button size="lg" onClick={() => setIsBookingOpen(true)}>
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

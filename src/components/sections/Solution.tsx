"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Zap, Brain, Mail, Users, ArrowRight } from "lucide-react";

export default function Solution() {
  const t = useTranslations("solution");

  const steps = [
    {
      icon: Zap,
      title: t("step1.title"),
      description: t("step1.description"),
      color: "bg-yellow-500",
    },
    {
      icon: Brain,
      title: t("step2.title"),
      description: t("step2.description"),
      color: "bg-secondary",
    },
    {
      icon: Mail,
      title: t("step3.title"),
      description: t("step3.description"),
      color: "bg-blue-500",
    },
    {
      icon: Users,
      title: t("step4.title"),
      description: t("step4.description"),
      color: "bg-green-500",
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-secondary font-semibold mb-2">{t("subtitle")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t("title")}
          </h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500 via-secondary to-green-500 hidden lg:block -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-xl p-6 shadow-lg border border-border text-center relative z-10">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 ${step.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted">{step.description}</p>
                </div>

                {/* Arrow between steps (visible on lg) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20">
                    <ArrowRight className="w-6 h-6 text-muted" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

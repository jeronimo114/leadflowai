"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

export default function WhyUs() {
  const t = useTranslations("whyUs");

  const comparisons = [
    {
      others: t("comparison.point1.others"),
      us: t("comparison.point1.us"),
    },
    {
      others: t("comparison.point2.others"),
      us: t("comparison.point2.us"),
    },
    {
      others: t("comparison.point3.others"),
      us: t("comparison.point3.us"),
    },
    {
      others: t("comparison.point4.others"),
      us: t("comparison.point4.us"),
    },
  ];

  return (
    <section className="section bg-primary text-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-white/70 max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Comparison header */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-4 bg-white/10 rounded-t-xl">
              <p className="font-semibold text-white/70">{t("comparison.others")}</p>
            </div>
            <div className="text-center p-4 bg-secondary rounded-t-xl">
              <p className="font-semibold">{t("comparison.us")}</p>
            </div>
          </div>

          {/* Comparison rows */}
          <div className="space-y-2">
            {comparisons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span className="text-white/70">{item.others}</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-lg">
                  <Check className="w-5 h-5 text-secondary-light flex-shrink-0" />
                  <span className="text-white">{item.us}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Clock, UserX, DollarSign, AlertTriangle } from "lucide-react";
import Card, { CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export default function Problem() {
  const t = useTranslations("problem");

  const problems = [
    {
      icon: Clock,
      title: t("card1.title"),
      description: t("card1.description"),
      color: "text-red-500",
      bgColor: "bg-red-100",
    },
    {
      icon: UserX,
      title: t("card2.title"),
      description: t("card2.description"),
      color: "text-orange-500",
      bgColor: "bg-orange-100",
    },
    {
      icon: DollarSign,
      title: t("card3.title"),
      description: t("card3.description"),
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <section className="section bg-card">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full text-red-600 font-medium text-sm mb-4">
            <AlertTriangle className="w-4 h-4" />
            {t("title")}
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground max-w-2xl mx-auto">
            {t("stat")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="h-full text-center">
                <CardHeader>
                  <div className={`w-14 h-14 ${problem.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <problem.icon className={`w-7 h-7 ${problem.color}`} />
                  </div>
                  <CardTitle>{problem.title}</CardTitle>
                  <CardDescription>{problem.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

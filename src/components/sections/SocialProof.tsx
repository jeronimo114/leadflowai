"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Card from "@/components/ui/Card";

export default function SocialProof() {
  const t = useTranslations("socialProof");

  const testimonials = [
    {
      quote: t("testimonial1.quote"),
      author: t("testimonial1.author"),
    },
    {
      quote: t("testimonial2.quote"),
      author: t("testimonial2.author"),
    },
    {
      quote: t("testimonial3.quote"),
      author: t("testimonial3.author"),
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t("title")}
          </h2>
        </motion.div>

        {/* Logo bar placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center items-center gap-8 md:gap-16 mb-16 opacity-50"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-24 h-8 bg-muted/20 rounded"
            />
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Quote className="w-5 h-5 text-secondary" />
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full" />
                  <p className="text-sm font-medium text-muted">{testimonial.author}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

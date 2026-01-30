"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import BookingModal from "@/components/booking/BookingModal";

export default function PricingPage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const t = useTranslations("pricing");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      name: t("growth.name"),
      description: t("growth.description"),
      setup: t("growth.setup"),
      monthly: t("growth.monthly"),
      features: t.raw("growth.features") as string[],
      popular: false,
    },
    {
      name: t("scale.name"),
      description: t("scale.description"),
      setup: t("scale.setup"),
      monthly: t("scale.monthly"),
      features: t.raw("scale.features") as string[],
      popular: true,
      popularLabel: t("scale.popular"),
    },
  ];

  const faqs = [
    {
      question: t("faq.q1.question"),
      answer: t("faq.q1.answer"),
    },
    {
      question: t("faq.q2.question"),
      answer: t("faq.q2.answer"),
    },
    {
      question: t("faq.q3.question"),
      answer: t("faq.q3.answer"),
    },
    {
      question: t("faq.q4.question"),
      answer: t("faq.q4.answer"),
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

        {/* Pricing Cards */}
        <section className="section">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`
                    relative rounded-2xl border-2 p-8 bg-white
                    ${plan.popular
                      ? "border-secondary shadow-xl"
                      : "border-border shadow-lg"
                    }
                  `}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary text-white text-sm font-medium rounded-full">
                      {plan.popularLabel}
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-muted text-sm">{plan.description}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center p-4 bg-card rounded-lg">
                      <span className="text-muted">{t("setup")}</span>
                      <span className="text-2xl font-bold text-foreground">
                        {plan.setup}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-card rounded-lg">
                      <span className="text-muted">{t("monthly")}</span>
                      <span className="text-2xl font-bold text-foreground">
                        {plan.monthly}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => setIsBookingOpen(true)}
                    variant={plan.popular ? "primary" : "outline"}
                    className="w-full"
                    size="lg"
                  >
                    {t("cta")}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
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
                {t("faq.title")}
              </h2>
            </motion.div>

            <div className="max-w-2xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-border overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-card/50 transition-colors"
                  >
                    <span className="font-semibold text-foreground">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-muted flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-muted">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
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

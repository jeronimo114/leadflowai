"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, CheckCircle2 } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import Button from "@/components/ui/Button";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

export default function BookingModal({ isOpen, onClose, locale }: BookingModalProps) {
  const t = useTranslations("booking");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<{
    date?: string;
    time?: string;
    name?: string;
    email?: string;
  } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      setTimeout(() => {
        setMessages([
          {
            id: "greeting",
            content: t("greeting"),
            isBot: true,
          },
        ]);
      }, 500);
    }
  }, [isOpen, messages.length, t]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          locale,
          conversationHistory: messages,
        }),
      });

      const data = await response.json();

      setIsTyping(false);

      if (data.response) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          isBot: true,
        };
        setMessages((prev) => [...prev, botMessage]);
      }

      if (data.booked && data.bookingDetails) {
        setIsBooked(true);
        setBookingDetails(data.bookingDetails);
      }
    } catch (error) {
      setIsTyping(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: locale === "es"
          ? "Lo siento, hubo un error. Por favor intenta de nuevo."
          : "Sorry, there was an error. Please try again.",
        isBot: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state after animation
    setTimeout(() => {
      setMessages([]);
      setIsTyping(false);
      setIsBooked(false);
      setBookingDetails(null);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 md:inset-4 z-50 bg-white md:rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-foreground">{t("title")}</h2>
                  <p className="text-sm text-muted">LeadFlow AI</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-card transition-colors"
                aria-label={t("close")}
              >
                <X className="w-6 h-6 text-muted" />
              </button>
            </div>

            {/* Content */}
            {isBooked ? (
              <div className="flex-1 flex items-center justify-center p-6">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center max-w-md"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {t("success.title")}
                  </h3>
                  <p className="text-muted mb-6">{t("success.description")}</p>
                  {bookingDetails && (
                    <div className="bg-card rounded-xl p-4 mb-6 text-left">
                      {bookingDetails.date && (
                        <p className="text-sm">
                          <span className="font-medium">Date:</span> {bookingDetails.date}
                        </p>
                      )}
                      {bookingDetails.time && (
                        <p className="text-sm">
                          <span className="font-medium">Time:</span> {bookingDetails.time}
                        </p>
                      )}
                    </div>
                  )}
                  <Button onClick={handleClose}>{t("close")}</Button>
                </motion.div>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                  {messages.map((msg) => (
                    <ChatMessage
                      key={msg.id}
                      message={msg.content}
                      isBot={msg.isBot}
                    />
                  ))}
                  {isTyping && <ChatMessage message="" isBot isTyping />}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <ChatInput
                  onSend={handleSendMessage}
                  placeholder={t("placeholder")}
                  disabled={isTyping}
                />
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

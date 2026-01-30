"use client";

import { useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  fullscreen?: boolean;
}

export default function Modal({ isOpen, onClose, children, title, fullscreen = false }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

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
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: fullscreen ? "100%" : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: fullscreen ? "100%" : 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`
              fixed z-50 bg-white overflow-hidden
              ${fullscreen
                ? "inset-0 md:inset-4 md:rounded-2xl"
                : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-2xl"
              }
            `}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="text-xl font-bold text-foreground">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-card transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-muted" />
                </button>
              </div>
            )}

            {/* Close button for fullscreen without title */}
            {!title && fullscreen && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-card transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-muted" />
              </button>
            )}

            {/* Content */}
            <div className={`${fullscreen ? "h-full" : "max-h-[80vh]"} overflow-auto`}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

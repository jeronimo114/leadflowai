"use client";

import { motion } from "framer-motion";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  isTyping?: boolean;
}

export default function ChatMessage({ message, isBot, isTyping }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isBot ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Avatar */}
      <div
        className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
          ${isBot ? "bg-secondary text-white" : "bg-primary text-white"}
        `}
      >
        {isBot ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
      </div>

      {/* Message */}
      <div
        className={`
          max-w-[80%] rounded-2xl px-4 py-3
          ${isBot
            ? "bg-card text-foreground rounded-tl-none"
            : "bg-primary text-white rounded-tr-none"
          }
        `}
      >
        {isTyping ? (
          <div className="flex gap-1 py-1">
            <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap">{message}</p>
        )}
      </div>
    </motion.div>
  );
}

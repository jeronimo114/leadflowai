"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder: string;
  disabled?: boolean;
}

export default function ChatInput({ onSend, placeholder, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="flex items-end gap-3 p-4 bg-white border-t border-border">
      <textarea
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="
          flex-1 resize-none rounded-xl border border-border px-4 py-3
          text-foreground placeholder:text-muted-foreground
          focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent
          disabled:bg-card disabled:cursor-not-allowed
          max-h-[120px]
        "
      />
      <button
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        className="
          p-3 rounded-xl bg-accent text-white
          hover:bg-accent-dark transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          flex-shrink-0
        "
        aria-label="Send message"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}

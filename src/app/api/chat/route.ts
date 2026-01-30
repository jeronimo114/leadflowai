import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/openai";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, locale, conversationHistory } = body as {
      message: string;
      locale: string;
      conversationHistory: Message[];
    };

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      // Return mock response if no API key
      return NextResponse.json({
        response:
          locale === "es"
            ? "¡Gracias por tu interés! Actualmente estamos configurando el sistema de agendamiento. Por favor contáctanos directamente en hello@leadflow.ai para agendar tu demo."
            : "Thanks for your interest! We're currently setting up the booking system. Please contact us directly at hello@leadflow.ai to schedule your demo.",
        booked: false,
      });
    }

    const result = await chat(message, locale || "en", conversationHistory || []);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        error: "Failed to process message",
        response:
          "Sorry, there was an error processing your message. Please try again.",
      },
      { status: 500 }
    );
  }
}

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

interface Message {
  id: string;
  content: string;
  isBot: boolean;
}

interface ToolResult {
  type: "availability" | "booking";
  slots?: string[];
  booked?: boolean;
  bookingDetails?: {
    date: string;
    time: string;
    name?: string;
    email?: string;
  };
}

const SYSTEM_PROMPT_EN = `You are a scheduling assistant for LeadFlow AI, a lead automation service. Your ONLY job is to book a discovery call in the MINIMUM number of messages possible.

Language: Respond in English.

Available tools:
- check_availability: Returns available 30-minute slots for the next 5 business days
- book_slot: Creates a calendar event and sends invite

Optimal flow (aim for 3-4 exchanges total):
1. Open with: ask for preferred day/time
2. Show 2-3 available slots closest to their preference
3. Once selected, ask for name and email in ONE message
4. Book immediately, confirm with details

Rules:
- Keep responses to 1-2 sentences MAX
- Never ask unnecessary questions
- If they give partial info (e.g., "Tuesday"), immediately show Tuesday slots
- Be professional but warm—not robotic, not overly casual
- End every booking with a clear confirmation + what happens next

Example slots format when presenting options:
"I have these slots available:
1. Tuesday, Jan 15 at 10:00 AM
2. Tuesday, Jan 15 at 2:00 PM
3. Wednesday, Jan 16 at 11:00 AM

Which works best for you?"`;

const SYSTEM_PROMPT_ES = `Eres un asistente de agendamiento para LeadFlow AI, un servicio de automatización de leads. Tu ÚNICO trabajo es agendar una llamada de descubrimiento en el MÍNIMO número de mensajes posible.

Idioma: Responde en español.

Herramientas disponibles:
- check_availability: Retorna slots de 30 minutos disponibles para los próximos 5 días hábiles
- book_slot: Crea un evento en calendario y envía invitación

Flujo óptimo (apunta a 3-4 intercambios total):
1. Abre preguntando: día/hora preferida
2. Muestra 2-3 slots disponibles más cercanos a su preferencia
3. Una vez seleccionado, pide nombre y email en UN mensaje
4. Agenda inmediatamente, confirma con detalles

Reglas:
- Mantén respuestas a 1-2 oraciones MÁXIMO
- Nunca hagas preguntas innecesarias
- Si dan info parcial (ej. "martes"), muestra slots del martes inmediatamente
- Sé profesional pero cálido—no robótico, no demasiado casual
- Termina cada agendamiento con una confirmación clara + qué sigue

Formato de slots al presentar opciones:
"Tengo estos horarios disponibles:
1. Martes 15 de enero a las 10:00 AM
2. Martes 15 de enero a las 2:00 PM
3. Miércoles 16 de enero a las 11:00 AM

¿Cuál te funciona mejor?"`;

const tools: Anthropic.Tool[] = [
  {
    name: "check_availability",
    description:
      "Check calendar availability for the next 5 business days. Returns available 30-minute slots.",
    input_schema: {
      type: "object",
      properties: {
        preferred_day: {
          type: "string",
          description:
            "Optional preferred day mentioned by user (e.g., 'Tuesday', 'tomorrow', 'next week')",
        },
      },
      required: [],
    },
  },
  {
    name: "book_slot",
    description:
      "Book a calendar slot and create an event. Requires datetime, name, and email.",
    input_schema: {
      type: "object",
      properties: {
        datetime: {
          type: "string",
          description: "The selected datetime in ISO format",
        },
        name: {
          type: "string",
          description: "Name of the person booking",
        },
        email: {
          type: "string",
          description: "Email address for the calendar invite",
        },
      },
      required: ["datetime", "name", "email"],
    },
  },
];

function getSystemPrompt(locale: string): string {
  return locale === "es" ? SYSTEM_PROMPT_ES : SYSTEM_PROMPT_EN;
}

function formatConversationHistory(
  messages: Message[]
): Anthropic.MessageParam[] {
  return messages.map((msg) => ({
    role: msg.isBot ? ("assistant" as const) : ("user" as const),
    content: msg.content,
  }));
}

export async function chat(
  userMessage: string,
  locale: string,
  conversationHistory: Message[]
): Promise<{
  response: string;
  booked: boolean;
  bookingDetails?: {
    date: string;
    time: string;
    name?: string;
    email?: string;
  };
}> {
  const systemPrompt = getSystemPrompt(locale);
  const formattedHistory = formatConversationHistory(conversationHistory);

  // Add current user message
  const messages: Anthropic.MessageParam[] = [
    ...formattedHistory,
    { role: "user", content: userMessage },
  ];

  let response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: systemPrompt,
    tools,
    messages,
  });

  let toolResults: ToolResult | null = null;
  let finalResponse = "";

  // Handle tool use in a loop
  while (response.stop_reason === "tool_use") {
    const toolUseBlock = response.content.find(
      (block) => block.type === "tool_use"
    ) as Anthropic.ToolUseBlock | undefined;

    if (!toolUseBlock) break;

    const toolName = toolUseBlock.name;
    const toolInput = toolUseBlock.input as Record<string, unknown>;

    let toolResult: string;

    if (toolName === "check_availability") {
      // Mock availability - in production, this would call Google Calendar
      const { getAvailableSlots } = await import("./calendar");
      const slots = await getAvailableSlots(
        toolInput.preferred_day as string | undefined
      );
      toolResult = JSON.stringify({ available_slots: slots });
      toolResults = { type: "availability", slots };
    } else if (toolName === "book_slot") {
      // Mock booking - in production, this would create a Google Calendar event
      const { bookSlot } = await import("./calendar");
      const booking = await bookSlot(
        toolInput.datetime as string,
        toolInput.name as string,
        toolInput.email as string
      );
      toolResult = JSON.stringify({
        success: true,
        message: "Booking confirmed",
        ...booking,
      });
      toolResults = {
        type: "booking",
        booked: true,
        bookingDetails: {
          date: booking.date,
          time: booking.time,
          name: toolInput.name as string,
          email: toolInput.email as string,
        },
      };
    } else {
      toolResult = JSON.stringify({ error: "Unknown tool" });
    }

    // Continue conversation with tool result
    messages.push({
      role: "assistant",
      content: response.content,
    });
    messages.push({
      role: "user",
      content: [
        {
          type: "tool_result",
          tool_use_id: toolUseBlock.id,
          content: toolResult,
        },
      ],
    });

    response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      tools,
      messages,
    });
  }

  // Extract text response
  const textBlock = response.content.find(
    (block) => block.type === "text"
  ) as Anthropic.TextBlock | undefined;
  finalResponse = textBlock?.text || "";

  return {
    response: finalResponse,
    booked: toolResults?.type === "booking" && toolResults.booked === true,
    bookingDetails:
      toolResults?.type === "booking" ? toolResults.bookingDetails : undefined,
  };
}

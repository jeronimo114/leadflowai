// Google Calendar Integration
// In production, this would use the googleapis package to interact with Google Calendar

import { google } from "googleapis";

// Initialize Google Calendar API client
function getCalendarClient() {
  // In production, you would use OAuth2 or service account credentials
  // For now, we'll return a mock client if credentials aren't set
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return null;
  }

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  // In production, you'd set credentials from stored tokens
  // auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

  return google.calendar({ version: "v3", auth });
}

// Generate mock available slots for demo purposes
function generateMockSlots(preferredDay?: string): string[] {
  const slots: string[] = [];
  const now = new Date();

  // Map day names to day numbers (0 = Sunday, 1 = Monday, etc.)
  const dayMap: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    domingo: 0,
    lunes: 1,
    martes: 2,
    miércoles: 3,
    miercoles: 3,
    jueves: 4,
    viernes: 5,
    sábado: 6,
    sabado: 6,
  };

  // Find the next occurrence of the preferred day, or generate for next 5 days
  const daysToGenerate = preferredDay
    ? findPreferredDays(preferredDay, dayMap)
    : [1, 2, 3, 4, 5];

  for (const dayOffset of daysToGenerate) {
    const date = new Date(now);
    date.setDate(date.getDate() + dayOffset);

    // Skip weekends if not specifically requested
    if (!preferredDay && (date.getDay() === 0 || date.getDay() === 6)) {
      continue;
    }

    // Generate slots for 9 AM, 10 AM, 11 AM, 2 PM, 3 PM, 4 PM
    const hours = [9, 10, 11, 14, 15, 16];
    for (const hour of hours) {
      // Randomly make some slots unavailable (60% available)
      if (Math.random() > 0.4) {
        date.setHours(hour, 0, 0, 0);
        slots.push(date.toISOString());
      }
    }
  }

  // Return max 6 slots
  return slots.slice(0, 6);
}

function findPreferredDays(
  preferredDay: string,
  dayMap: Record<string, number>
): number[] {
  const now = new Date();
  const currentDay = now.getDay();
  const lowerDay = preferredDay.toLowerCase();

  // Handle "tomorrow"
  if (lowerDay === "tomorrow" || lowerDay === "mañana") {
    return [1];
  }

  // Handle "today"
  if (lowerDay === "today" || lowerDay === "hoy") {
    return [0];
  }

  // Handle specific day names
  for (const [name, dayNum] of Object.entries(dayMap)) {
    if (lowerDay.includes(name)) {
      let daysUntil = dayNum - currentDay;
      if (daysUntil <= 0) daysUntil += 7;
      return [daysUntil];
    }
  }

  // Default to next 5 business days
  return [1, 2, 3, 4, 5];
}

export async function getAvailableSlots(preferredDay?: string): Promise<string[]> {
  const calendar = getCalendarClient();

  if (!calendar) {
    // Return mock slots if no calendar is configured
    return generateMockSlots(preferredDay);
  }

  try {
    const now = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: now.toISOString(),
        timeMax: endDate.toISOString(),
        items: [{ id: process.env.GOOGLE_CALENDAR_ID || "primary" }],
      },
    });

    // Process busy times and return available slots
    // This is simplified - in production you'd properly calculate free slots
    const busyTimes =
      response.data.calendars?.[process.env.GOOGLE_CALENDAR_ID || "primary"]
        ?.busy || [];

    // For now, return mock slots filtered by busy times
    const mockSlots = generateMockSlots(preferredDay);
    return mockSlots.filter((slot) => {
      const slotDate = new Date(slot);
      const slotEnd = new Date(slotDate.getTime() + 30 * 60 * 1000);

      return !busyTimes.some((busy) => {
        const busyStart = new Date(busy.start || "");
        const busyEnd = new Date(busy.end || "");
        return slotDate < busyEnd && slotEnd > busyStart;
      });
    });
  } catch (error) {
    console.error("Error fetching calendar availability:", error);
    return generateMockSlots(preferredDay);
  }
}

export async function bookSlot(
  datetime: string,
  name: string,
  email: string
): Promise<{ date: string; time: string; eventId?: string }> {
  const calendar = getCalendarClient();
  const slotDate = new Date(datetime);

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = slotDate.toLocaleDateString("en-US", dateOptions);
  const formattedTime = slotDate.toLocaleTimeString("en-US", timeOptions);

  if (!calendar) {
    // Return mock booking if no calendar is configured
    return {
      date: formattedDate,
      time: formattedTime,
    };
  }

  try {
    const endTime = new Date(slotDate.getTime() + 30 * 60 * 1000);

    const event = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
      sendUpdates: "all",
      requestBody: {
        summary: `Discovery Call - ${name}`,
        description: `Discovery call with ${name} (${email}) booked via LeadFlow AI`,
        start: {
          dateTime: slotDate.toISOString(),
          timeZone: "America/New_York",
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: "America/New_York",
        },
        attendees: [{ email }],
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 60 },
            { method: "popup", minutes: 10 },
          ],
        },
      },
    });

    return {
      date: formattedDate,
      time: formattedTime,
      eventId: event.data.id || undefined,
    };
  } catch (error) {
    console.error("Error creating calendar event:", error);
    // Return mock booking on error
    return {
      date: formattedDate,
      time: formattedTime,
    };
  }
}

export function formatSlotForDisplay(isoString: string, locale: string): string {
  const date = new Date(isoString);

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const localeCode = locale === "es" ? "es-ES" : "en-US";

  return `${date.toLocaleDateString(localeCode, dateOptions)} at ${date.toLocaleTimeString(localeCode, timeOptions)}`;
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LeadFlow AI - Stop Losing Leads. Start Closing Deals.",
  description:
    "AI-powered lead response and nurturing automation for agencies and B2B companies. Respond instantly on WhatsApp and Email.",
  keywords: [
    "lead automation",
    "AI sales",
    "WhatsApp automation",
    "lead nurturing",
    "sales automation",
    "B2B leads",
  ],
  authors: [{ name: "LeadFlow AI" }],
  openGraph: {
    title: "LeadFlow AI - Stop Losing Leads. Start Closing Deals.",
    description:
      "AI-powered lead response and nurturing automation for agencies and B2B companies.",
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadFlow AI - Stop Losing Leads. Start Closing Deals.",
    description:
      "AI-powered lead response and nurturing automation for agencies and B2B companies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

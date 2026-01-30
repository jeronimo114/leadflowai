"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import WhyUs from "@/components/sections/WhyUs";
import SocialProof from "@/components/sections/SocialProof";
import FinalCTA from "@/components/sections/FinalCTA";
import BookingModal from "@/components/booking/BookingModal";

export default function HomePage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  return (
    <>
      <Header locale={locale} onBookDemo={handleOpenBooking} />

      <main>
        <Hero locale={locale} onBookDemo={handleOpenBooking} />
        <Problem />
        <Solution />
        <WhyUs />
        <SocialProof />
        <FinalCTA onBookDemo={handleOpenBooking} />
      </main>

      <Footer locale={locale} />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        locale={locale}
      />
    </>
  );
}

"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SignatureCarousel } from "@/components/SignatureCarousel";
import { About } from "@/components/About";
import { InteractiveMenu } from "@/components/InteractiveMenu";
import { Reviews } from "@/components/Reviews";
import { InstagramGallery } from "@/components/InstagramGallery";
import { GoogleMaps } from "@/components/GoogleMaps";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ReservationPopup } from "@/components/ReservationPopup";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CalendarDays, ShoppingBag } from "lucide-react";

export default function Home() {
  const [isResOpen, setIsResOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-matte-black text-soft-cream selection:bg-gold selection:text-matte-black">
      {/* Sticky Top Navigation */}
      <Navbar
        onOpenReservation={() => setIsResOpen(true)}
        onToggleCart={() => setIsCartOpen(!isCartOpen)}
      />

      <main className="flex-grow">
        {/* Cinematic Hero Slider */}
        <Hero onOpenReservation={() => setIsResOpen(true)} />

        {/* Signature Dishes Showcase */}
        <SignatureCarousel />

        {/* Story & Legacy Section */}
        <About />

        {/* Interactive Menu Filtering */}
        <InteractiveMenu />

        {/* Patron Reviews Section */}
        <Reviews />

        {/* Instagram Grid feed */}
        <InstagramGallery />

        {/* Interactive Maps Section */}
        <GoogleMaps />

        {/* Contact Info & Inquiries */}
        <Contact />
      </main>

      {/* Footer Details */}
      <Footer />

      {/* Floating Action WhatsApp and Cart Sidebar */}
      <WhatsAppButton
        isCartOpen={isCartOpen}
        onCloseCart={() => setIsCartOpen(!isCartOpen)}
        onOpenReservation={() => {
          setIsResOpen(true);
        }}
      />

      {/* Pop-up Table Booking modal */}
      <ReservationPopup isOpen={isResOpen} onClose={() => setIsResOpen(false)} />

      {/* Sticky Mobile bottom buttons bar (Mobile First CTA focus) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full glass border-t border-gold/20 flex items-center justify-between p-3 z-30 shadow-2xl">
        <button
          onClick={() => setIsResOpen(true)}
          className="flex-grow mr-2 bg-gradient-to-r from-gold to-warm-orange text-matte-black font-body font-bold text-xs py-3 rounded-full flex items-center justify-center space-x-1.5 shadow-lg shadow-gold/15 cursor-pointer"
        >
          <CalendarDays className="w-4 h-4" />
          <span>Book Table</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-grow ml-2 bg-deep-charcoal border border-gold/30 text-gold font-body font-bold text-xs py-3 rounded-full flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Order Online</span>
        </button>
      </div>
    </div>
  );
}


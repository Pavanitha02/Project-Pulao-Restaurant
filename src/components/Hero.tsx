"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronDown, Flame, Star } from "lucide-react";

interface HeroProps {
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      const navHeight = 80;
      const targetPosition = menuSection.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image with Dark & Golden Overlays */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: `url('/images/luxury_restaurant_interior.png')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/70 to-matte-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-matte-black via-transparent to-matte-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Headline and CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Tagline / Google Reviews badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2 bg-matte-black/80 px-4 py-2 rounded-full border border-gold/30 gold-glow"
            >
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-body text-xs font-semibold tracking-wide text-soft-cream uppercase">
                4.9 Google Review Rating
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
            >
              Experience the Authentic Taste of{" "}
              <span className="bg-gradient-to-r from-gold via-warm-orange to-gold bg-clip-text text-transparent gold-text-glow">
                Premium Pulaos & Biryanis
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-body text-base sm:text-lg md:text-xl text-soft-cream/80 max-w-xl font-light"
            >
              Luxury dining experience in the heart of Anantapur. Bringing you royal Andhra flavors slow-cooked to culinary perfection.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={onOpenReservation}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-gold to-warm-orange text-matte-black font-body font-bold text-base px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200 cursor-pointer shadow-xl shadow-gold/15"
              >
                <Calendar className="w-5 h-5" />
                <span>Book a Table</span>
              </button>

              <button
                onClick={scrollToMenu}
                className="w-full sm:w-auto flex items-center justify-center border-2 border-gold/50 hover:border-gold hover:bg-gold/10 text-gold font-body font-bold text-base px-8 py-4 rounded-full transition-all duration-200 cursor-pointer"
              >
                <span>Order Online</span>
              </button>
            </motion.div>
          </div>

          {/* Floating Food Card / Featurette Showcase */}
          <div className="lg:col-span-5 hidden lg:flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="relative w-80 h-96 rounded-2xl overflow-hidden border border-gold/30 shadow-2xl gold-glow group"
            >
              {/* Image background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url('/images/luxury_biryani_pulao.png')`,
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/40 to-transparent" />
              
              {/* Floating Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 space-y-2">
                <span className="inline-flex items-center space-x-1 bg-warm-orange text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Popular Now</span>
                </span>
                <h3 className="font-heading text-xl font-bold text-soft-cream">
                  Raju Gari Kodi Pulao
                </h3>
                <p className="font-body text-xs text-soft-cream/80 line-clamp-2">
                  Chittimutyalu rice cooked with native spices & tender country chicken.
                </p>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-heading text-lg font-bold text-gold">₹340</span>
                  <span className="text-xs text-gold border border-gold/30 px-2 py-0.5 rounded">Andhra Special</span>
                </div>
              </div>
            </motion.div>

            {/* Backlog Mini Floating elements for parallax feel */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute -top-6 -right-6 glass p-4 rounded-xl border border-gold/20 shadow-xl flex items-center space-x-3 w-48"
            >
              <div className="bg-gold/15 p-2 rounded-lg">
                <Flame className="w-5 h-5 text-gold" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gold">Signature Pulaos</span>
                <span className="text-[10px] text-soft-cream/70">Served Hot & Fresh</span>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute -bottom-6 -left-6 glass p-4 rounded-xl border border-gold/20 shadow-xl flex items-center space-x-3 w-44"
            >
              <div className="bg-warm-orange/15 p-2 rounded-lg">
                <Star className="w-5 h-5 text-warm-orange fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-warm-orange">Heritage Recipe</span>
                <span className="text-[10px] text-soft-cream/70">100% Authentic spices</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-300" onClick={scrollToMenu}>
        <span className="text-[10px] font-body tracking-[0.2em] text-soft-cream/80 uppercase mb-2">Explore Menu</span>
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-5 h-5 text-gold" />
        </motion.div>
      </div>
    </section>
  );
};

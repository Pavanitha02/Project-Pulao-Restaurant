"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ value, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const totalMiliseconds = duration * 1000;
      const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 30);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) {
          clearInterval(timer);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-gold gold-text-glow">
      {count}
      {suffix}
    </span>
  );
};

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-matte-black relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Visual Side (Images Grid) */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4">
            <div className="col-span-8 relative rounded-2xl overflow-hidden shadow-2xl border border-gold/15 group aspect-4/3">
              <img
                src="/images/luxury_restaurant_interior.png"
                alt="Shreyas Grand Fine Dining Interior"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-matte-black/25" />
            </div>

            <div className="col-span-4 relative rounded-2xl overflow-hidden shadow-2xl border border-gold/15 group aspect-square self-end">
              <img
                src="/images/luxury_biryani_pulao.png"
                alt="Authentic Copper Utensil Pulao"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-matte-black/25" />
            </div>

            <div className="col-span-4 relative rounded-2xl overflow-hidden shadow-2xl border border-gold/15 group aspect-square self-start">
              <img
                src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600&auto=format&fit=crop"
                alt="Tandoori Kebabs"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-matte-black/25" />
            </div>

            <div className="col-span-8 relative rounded-2xl overflow-hidden shadow-2xl border border-gold/15 group aspect-4/3">
              <img
                src="https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=600&auto=format&fit=crop"
                alt="Andhra Meals Chef Special"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-matte-black/25" />
            </div>
          </div>

          {/* Text/Legacy Story Side */}
          <div className="lg:col-span-6 space-y-8 flex flex-col justify-center text-center lg:text-left">
            <div className="space-y-3">
              <span className="font-body text-xs font-bold tracking-[0.25em] text-gold uppercase block">
                The Heritage of taste
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-soft-cream leading-tight">
                Crafting Culinary Legacies in Anantapur
              </h2>
              <div className="h-1 w-20 bg-gold/60 mx-auto lg:mx-0 mt-3 rounded" />
            </div>

            <div className="font-body text-sm sm:text-base text-soft-cream/80 space-y-4 font-light leading-relaxed">
              <p>
                Taste of Pulao's By Shreyas Grand was founded with a single mission: to capture the royal essence of traditional Andhra cuisine and elevate it into a luxury fine dining experience. Every recipe in our menu is passed down through generations, utilizing local spices selected carefully from regional farmers.
              </p>
              <p>
                From our slow-cooked Dum Biryanis layered with premium saffron to our fiery Raju Gari Kodi Pulao made with small Chittimutyalu rice, every dish is an tribute to the rich heritage of South Indian gastronomy. We invite you and your family to dine in an ambiance that blends modern Indian luxury with timeless hospitality.
              </p>
            </div>

            {/* Metrics Counters Container */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gold/10">
              <div className="flex flex-col items-center lg:items-start space-y-1">
                <AnimatedCounter value={15} suffix="+" />
                <span className="font-body text-[10px] sm:text-xs text-soft-cream/70 tracking-widest uppercase">
                  Years of Legacy
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start space-y-1">
                <AnimatedCounter value={50} suffix="+" />
                <span className="font-body text-[10px] sm:text-xs text-soft-cream/70 tracking-widest uppercase">
                  Secret Spices
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start space-y-1">
                <AnimatedCounter value={100} suffix="K+" />
                <span className="font-body text-[10px] sm:text-xs text-soft-cream/70 tracking-widest uppercase">
                  Happy Diners
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

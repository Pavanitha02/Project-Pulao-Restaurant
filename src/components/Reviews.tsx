"use client";

import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  source: string;
}

const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Vikram Reddy",
    rating: 5,
    date: "1 week ago",
    comment: "The Raju Gari Kodi Pulao here is absolute heaven! Authentic Andhra spices and the chittimutyalu rice texture is outstanding. Highly recommend for family dinners.",
    source: "Google Local Guide"
  },
  {
    id: "r2",
    name: "Ananya Sharma",
    rating: 5,
    date: "3 weeks ago",
    comment: "Stunning interiors! The black and gold luxury aesthetic really elevates the fine dining experience. The Mutton Fry Piece Biryani is easily the best in Anantapur.",
    source: "Zomato Reviewer"
  },
  {
    id: "r3",
    name: "Sai Kiran",
    rating: 5,
    date: "1 month ago",
    comment: "South Indian non-veg dishes are incredibly delicious. Nellore Chepala Pulusu is super authentic and spicy. Outstanding hospitality by the Shreyas Grand team.",
    source: "Google Local Guide"
  },
  {
    id: "r4",
    name: "Priyanka C.",
    rating: 4,
    date: "2 months ago",
    comment: "Excellent service and food presentation. Tandoori starters are juicy and perfectly charred. Booking a table in advance makes it super convenient.",
    source: "TripAdvisor Contributor"
  }
];

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix = "", duration = 1.5 }) => {
  const [count, setCount] = useState(0);
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
    <span ref={ref} className="font-heading text-4xl sm:text-5xl font-extrabold text-gold gold-text-glow">
      {count}
      {suffix}
    </span>
  );
};

export const Reviews: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex(prev => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const next = () => {
    setActiveIndex(prev => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="py-24 bg-deep-charcoal relative">
      {/* Decorative vectors */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="font-body text-xs font-bold tracking-[0.25em] text-gold uppercase block">
            Client Testimonials
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-soft-cream">
            What Our Patrons Say
          </h2>
          <div className="h-1 w-20 bg-gold/60 mx-auto mt-3 rounded" />
        </div>

        {/* Counter cards block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <div className="glass p-6 rounded-2xl border border-gold/15 flex flex-col items-center justify-center text-center space-y-2">
            <AnimatedCounter value={2500} suffix="+" />
            <span className="font-body text-xs font-bold tracking-widest text-soft-cream/70 uppercase">
              Google Reviews
            </span>
          </div>

          <div className="glass p-6 rounded-2xl border border-gold/15 flex flex-col items-center justify-center text-center space-y-2">
            <div className="flex items-center space-x-1">
              <span className="font-heading text-4xl sm:text-5xl font-extrabold text-gold gold-text-glow">4.9</span>
              <Star className="w-6 h-6 text-gold fill-current" />
            </div>
            <span className="font-body text-xs font-bold tracking-widest text-soft-cream/70 uppercase">
              Average Rating
            </span>
          </div>

          <div className="glass p-6 rounded-2xl border border-gold/15 flex flex-col items-center justify-center text-center space-y-2">
            <AnimatedCounter value={98} suffix="%" />
            <span className="font-body text-xs font-bold tracking-widest text-soft-cream/70 uppercase">
              Satisfaction rate
            </span>
          </div>
        </div>

        {/* Reviews Testimonial Slider */}
        <div className="relative max-w-3xl mx-auto glass p-8 sm:p-12 rounded-2xl border border-gold/20 shadow-2xl">
          <Quote className="absolute top-6 left-6 w-16 h-16 text-gold/5 pointer-events-none" />

          {/* Active Review Content */}
          <div className="space-y-6 text-center">
            <div className="flex justify-center text-gold">
              {[...Array(REVIEWS[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            <p className="font-body text-base sm:text-lg text-soft-cream italic font-light leading-relaxed">
              "{REVIEWS[activeIndex].comment}"
            </p>

            <div className="space-y-1">
              <h4 className="font-heading text-lg font-bold text-gold">
                {REVIEWS[activeIndex].name}
              </h4>
              <div className="flex justify-center items-center space-x-2 text-xs font-body text-soft-cream/60">
                <span>{REVIEWS[activeIndex].source}</span>
                <span>•</span>
                <span>{REVIEWS[activeIndex].date}</span>
              </div>
            </div>
          </div>

          {/* Navigation sliders */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gold/10">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-gold/20 text-gold hover:bg-gold/10 hover:border-gold transition-colors duration-200 cursor-pointer"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex space-x-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i ? "w-6 bg-gold" : "bg-gold/30 hover:bg-gold/50"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border border-gold/20 text-gold hover:bg-gold/10 hover:border-gold transition-colors duration-200 cursor-pointer"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

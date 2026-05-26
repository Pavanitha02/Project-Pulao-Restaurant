"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag, Flame } from "lucide-react";
import { useRestaurant, MenuItem } from "@/context/RestaurantContext";

export const SignatureCarousel: React.FC = () => {
  const { menuItems, addToCart } = useRestaurant();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Filter signature items
  const signatureItems = menuItems.filter(item => item.isChefRecommended || item.id === "b1" || item.id === "p3");

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.75;
      const targetScroll = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  };

  const getSpicyBadge = (level?: number) => {
    if (!level) return null;
    return (
      <span className="flex items-center space-x-0.5 bg-red-950/80 border border-red-500/30 text-red-400 text-[10px] px-2 py-0.5 rounded-full">
        <span>🌶️</span>
        <span className="font-bold">{level === 3 ? "Extra Hot" : level === 2 ? "Spicy" : "Medium"}</span>
      </span>
    );
  };

  return (
    <section id="signature" className="py-24 bg-deep-charcoal relative">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-warm-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-center md:text-left space-y-2">
            <span className="font-body text-xs font-bold tracking-[0.25em] text-gold uppercase block">
              Royal Culinary Masterpieces
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-soft-cream">
              Our Signature Specials
            </h2>
            <div className="h-1 w-20 bg-gold/60 mx-auto md:mx-0 mt-3 rounded" />
          </div>

          <div className="flex justify-center space-x-3 mt-6 md:mt-0">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold transition-all duration-200 cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold transition-all duration-200 cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Content */}
        <div
          ref={carouselRef}
          className="flex space-x-6 overflow-x-auto pb-8 scrollbar-none snap-x snap-mandatory touch-pan-x"
          style={{ scrollbarWidth: "none" }}
        >
          {signatureItems.map((item) => (
            <div
              key={item.id}
              className="w-[280px] sm:w-[360px] flex-shrink-0 bg-matte-black border border-gold/15 rounded-2xl overflow-hidden shadow-xl hover:border-gold/40 transition-all duration-300 group snap-start"
            >
              {/* Media Section */}
              <div className="relative h-[200px] sm:h-[240px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="bg-gold text-matte-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Chef Recommended
                  </span>
                  {item.isPopular && (
                    <span className="bg-warm-orange text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1">
                      <Flame className="w-3 h-3 fill-current" />
                      <span>Popular</span>
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-block w-4 h-4 border-2 rounded ${
                      item.isVeg ? "border-green-500" : "border-red-500"
                    } flex items-center justify-center p-0.5`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.isVeg ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-soft-cream group-hover:text-gold transition-colors duration-200 line-clamp-1">
                    {item.name}
                  </h3>
                </div>

                <p className="font-body text-xs sm:text-sm text-soft-cream/70 line-clamp-2 h-10">
                  {item.description}
                </p>

                <div className="flex items-center space-x-2">
                  {getSpicyBadge(item.spicyLevel)}
                </div>

                <div className="border-t border-gold/10 pt-4 flex items-center justify-between">
                  <span className="font-heading text-xl sm:text-2xl font-bold text-gold">
                    ₹{item.price}
                  </span>
                  
                  <button
                    onClick={() => addToCart(item)}
                    className="flex items-center space-x-1.5 bg-gold hover:bg-gold-hover text-matte-black font-body font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full transition-colors duration-200 cursor-pointer shadow-md shadow-gold/10 hover:scale-105"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

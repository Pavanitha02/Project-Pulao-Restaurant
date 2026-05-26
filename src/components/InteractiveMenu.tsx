"use client";

import React, { useState, useMemo } from "react";
import { Search, ShoppingBag, Flame, Sparkles, SlidersHorizontal } from "lucide-react";
import { useRestaurant, MenuItem } from "@/context/RestaurantContext";

export const InteractiveMenu: React.FC = () => {
  const { menuItems, addToCart } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [vegFilter, setVegFilter] = useState<"all" | "veg" | "non-veg">("all");

  const categories = useMemo(() => {
    const list = new Set(menuItems.map(item => item.category));
    return ["All", ...Array.from(list)];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Category Filter
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      // Search Filter
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      // Veg/Non-Veg Filter
      const matchesVeg = vegFilter === "all" ||
                         (vegFilter === "veg" && item.isVeg) ||
                         (vegFilter === "non-veg" && !item.isVeg);

      return matchesCategory && matchesSearch && matchesVeg;
    });
  }, [menuItems, selectedCategory, searchQuery, vegFilter]);

  const getSpicyIndicator = (level?: number) => {
    if (!level) return null;
    return (
      <span className="text-red-500 font-bold text-xs" title={`${level} Spice Level`}>
        {"🌶️".repeat(level)}
      </span>
    );
  };

  return (
    <section id="menu" className="py-24 bg-matte-black relative">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-warm-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="font-body text-xs font-bold tracking-[0.25em] text-gold uppercase block">
            Explore Flavorful Journeys
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-soft-cream">
            Interactive Digital Menu
          </h2>
          <div className="h-1 w-20 bg-gold/60 mx-auto mt-3 rounded" />
          <p className="font-body text-sm text-soft-cream/70 max-w-xl mx-auto font-light">
            Search, filter, and order directly. Experience the luxury of royal cuisine customized to your palate.
          </p>
        </div>

        {/* Search, Filter Controls */}
        <div className="glass p-6 rounded-2xl border border-gold/15 shadow-xl space-y-4 mb-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold w-4 h-4" />
              <input
                type="text"
                placeholder="Search biryanis, pulaos, starters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-deep-charcoal border border-gold/20 focus:border-gold rounded-full py-3 pl-12 pr-4 font-body text-sm text-soft-cream placeholder-soft-cream/40 focus:outline-none transition-all duration-200"
              />
            </div>

            {/* Veg / Non-Veg Toggle Filter */}
            <div className="md:col-span-6 flex justify-center md:justify-end">
              <div className="inline-flex rounded-full bg-deep-charcoal p-1 border border-gold/10">
                <button
                  onClick={() => setVegFilter("all")}
                  className={`px-4 py-2 rounded-full text-xs font-body font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    vegFilter === "all" ? "bg-gold text-matte-black" : "text-soft-cream/70 hover:text-gold"
                  }`}
                >
                  All Dishes
                </button>
                <button
                  onClick={() => setVegFilter("veg")}
                  className={`px-4 py-2 rounded-full text-xs font-body font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                    vegFilter === "veg" ? "bg-green-600 text-white" : "text-green-500 hover:bg-green-500/10"
                  }`}
                >
                  <span className="w-2.5 h-2.5 bg-green-500 border border-white rounded-full inline-block" />
                  <span>Veg</span>
                </button>
                <button
                  onClick={() => setVegFilter("non-veg")}
                  className={`px-4 py-2 rounded-full text-xs font-body font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                    vegFilter === "non-veg" ? "bg-red-700 text-white" : "text-red-500 hover:bg-red-500/10"
                  }`}
                >
                  <span className="w-2.5 h-2.5 bg-red-600 border border-white rounded-full inline-block" />
                  <span>Non-Veg</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Category Tabs Section (Horizontal scrollable wrapper) */}
        <div className="flex overflow-x-auto space-x-3 pb-4 mb-10 scrollbar-none max-w-5xl mx-auto touch-pan-x justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-6 py-3 rounded-full text-xs sm:text-sm font-body font-bold tracking-wide transition-all duration-300 border cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-gold to-warm-orange text-matte-black border-transparent shadow-lg shadow-gold/15"
                  : "bg-deep-charcoal hover:bg-gold/10 text-soft-cream/80 border-gold/15 hover:border-gold/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Food Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-deep-charcoal/50 rounded-2xl border border-gold/10 max-w-xl mx-auto">
            <SlidersHorizontal className="w-12 h-12 text-gold/30 mx-auto mb-4" />
            <p className="font-heading text-xl text-soft-cream font-semibold">No dishes found</p>
            <p className="font-body text-sm text-soft-cream/60 mt-1">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-deep-charcoal/40 border border-gold/10 hover:border-gold/35 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col group relative"
              >
                {/* Visual Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-matte-black/90 via-transparent to-transparent" />
                  
                  {/* Veg / Non-Veg Indicator */}
                  <div className="absolute top-3 right-3 bg-matte-black/75 p-1.5 rounded-md border border-gold/25">
                    <span
                      className={`inline-block w-3.5 h-3.5 border-2 rounded ${
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

                  {/* Tag Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {item.isChefRecommended && (
                      <span className="bg-gold text-matte-black text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Recommended</span>
                      </span>
                    )}
                    {item.isPopular && (
                      <span className="bg-warm-orange text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1">
                        <Flame className="w-2.5 h-2.5 fill-current" />
                        <span>Popular Now</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-base font-bold text-soft-cream group-hover:text-gold transition-colors duration-200 line-clamp-1">
                        {item.name}
                      </h3>
                      {getSpicyIndicator(item.spicyLevel)}
                    </div>
                    <p className="font-body text-xs text-soft-cream/70 line-clamp-2 min-h-[32px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gold/5 pt-3">
                    <span className="font-heading text-lg font-bold text-gold">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="flex items-center space-x-1 bg-gold/10 hover:bg-gold text-gold hover:text-matte-black border border-gold/40 hover:border-transparent font-body font-bold text-xs px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

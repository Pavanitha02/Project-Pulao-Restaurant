"use client";

import React from "react";
import { Heart, MessageCircle } from "lucide-react";

interface GalleryItem {
  id: string;
  image: string;
  likes: number;
  comments: number;
  alt: string;
}

const ITEMS: GalleryItem[] = [
  {
    id: "g1",
    image: "/images/luxury_biryani_pulao.png",
    likes: 342,
    comments: 42,
    alt: "Signature Andhra Biryani served hot"
  },
  {
    id: "g2",
    image: "/images/luxury_restaurant_interior.png",
    likes: 512,
    comments: 67,
    alt: "Modern luxury family restaurant cabin design"
  },
  {
    id: "g3",
    image: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=600&auto=format&fit=crop",
    likes: 218,
    comments: 18,
    alt: "Special family meals platter"
  },
  {
    id: "g4",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600&auto=format&fit=crop",
    likes: 195,
    comments: 21,
    alt: "Spicy traditional fish curry boiling"
  },
  {
    id: "g5",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600&auto=format&fit=crop",
    likes: 289,
    comments: 34,
    alt: "Ghee roasted chicken vepudu"
  },
  {
    id: "g6",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop",
    likes: 412,
    comments: 55,
    alt: "Premium saffron double ka meetha pudding"
  }
];

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-24 bg-matte-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-center md:text-left space-y-2">
            <span className="font-body text-xs font-bold tracking-[0.25em] text-gold uppercase block">
              Follow Our Culinary Journey
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-soft-cream">
              Instagram Gallery
            </h2>
            <div className="h-1 w-20 bg-gold/60 mx-auto md:mx-0 mt-3 rounded" />
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 border border-gold/40 hover:border-gold hover:bg-gold/10 text-gold font-body font-bold text-sm px-6 py-3 rounded-full mt-6 md:mt-0 transition-colors duration-200"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>@TasteOfPulaosShreyas</span>
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {ITEMS.map((item) => (
            <a
              key={item.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-xl overflow-hidden border border-gold/10 shadow-lg group block"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Hover overlay with social metrics */}
              <div className="absolute inset-0 bg-matte-black/70 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col items-center space-y-3">
                  <InstagramIcon className="w-6 h-6 text-gold" />
                  <div className="flex space-x-4 text-soft-cream text-xs font-semibold">
                    <span className="flex items-center space-x-1">
                      <Heart className="w-4 h-4 text-gold fill-current" />
                      <span>{item.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4 text-gold fill-current" />
                      <span>{item.comments}</span>
                    </span>
                  </div>
                </div>
              </div>

            </a>
          ))}
        </div>

      </div>
    </section>
  );
};


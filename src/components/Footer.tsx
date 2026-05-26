"use client";

import React from "react";
import { MapPin, CalendarDays, ExternalLink } from "lucide-react";

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navHeight = 80;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-matte-black border-t border-gold/15 pt-16 pb-8 relative overflow-hidden">
      {/* Absolute background texture */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-bold tracking-wider text-gold gold-text-glow">
                TASTE OF PULAO'S
              </span>
              <span className="text-xs font-body tracking-[0.25em] text-white opacity-85 -mt-1 uppercase">
                By Shreyas Grand
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-soft-cream/70 leading-relaxed font-light">
              Experience the pinnacle of royal Andhra dining in Anantapur. Layered Biryanis, Chittimutyalu Pulaos, and signature non-veg specials prepared by culinary master chefs.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="https://facebook.com" className="p-2 bg-deep-charcoal border border-gold/15 rounded-full text-gold hover:bg-gold hover:text-matte-black transition-all duration-200" aria-label="Facebook">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" className="p-2 bg-deep-charcoal border border-gold/15 rounded-full text-gold hover:bg-gold hover:text-matte-black transition-all duration-200" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" className="p-2 bg-deep-charcoal border border-gold/15 rounded-full text-gold hover:bg-gold hover:text-matte-black transition-all duration-200" aria-label="Twitter">
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>


          {/* Quick links Sitemap */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-gold border-b border-gold/10 pb-2">
              Sitemap Links
            </h4>
            <ul className="space-y-2 font-body text-sm font-medium">
              <li>
                <a href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="text-soft-cream/70 hover:text-gold transition-colors">
                  Home Overview
                </a>
              </li>
              <li>
                <a href="#signature" onClick={(e) => handleScrollTo(e, "#signature")} className="text-soft-cream/70 hover:text-gold transition-colors">
                  Signature Specials
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleScrollTo(e, "#about")} className="text-soft-cream/70 hover:text-gold transition-colors">
                  About Our Legacy
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => handleScrollTo(e, "#menu")} className="text-soft-cream/70 hover:text-gold transition-colors">
                  Interactive Menu
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => handleScrollTo(e, "#reviews")} className="text-soft-cream/70 hover:text-gold transition-colors">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Online Delivery platforms */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-gold border-b border-gold/10 pb-2">
              Order Food Online
            </h4>
            <p className="font-body text-xs text-soft-cream/70 leading-relaxed font-light">
              Too cozy to step out? Order from Taste of Pulao's through our delivery partners in Anantapur:
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <a
                href="https://swiggy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between glass px-4 py-2.5 rounded-lg border border-orange-500/25 hover:border-orange-500 text-orange-400 hover:bg-orange-500/5 font-body text-xs font-semibold uppercase tracking-wider"
              >
                <span>Swiggy Delivery</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              
              <a
                href="https://zomato.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between glass px-4 py-2.5 rounded-lg border border-red-500/25 hover:border-red-500 text-red-400 hover:bg-red-500/5 font-body text-xs font-semibold uppercase tracking-wider"
              >
                <span>Zomato Delivery</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Location / Reservation Quick booking */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-gold border-b border-gold/10 pb-2">
              Royal Dining
            </h4>
            <div className="space-y-3 font-body text-xs sm:text-sm text-soft-cream/80">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Railway Station Road, Anantapur, Andhra Pradesh - 515001</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarDays className="w-4 h-4 text-gold" />
                <span>Hosting private parties & catering up to 500 guests.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright and SEO references */}
        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-body text-xs text-soft-cream/50">
          <p>© {currentYear} Taste Of Pulao's By Shreyas Grand. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#about" onClick={(e) => handleScrollTo(e, "#about")} className="hover:text-gold transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")} className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
          <p className="font-light tracking-wide text-[10px] md:text-right">
            SEO: Best Biryani and Andhra Pulao Family Restaurant in Anantapur
          </p>
        </div>
      </div>
    </footer>
  );
};

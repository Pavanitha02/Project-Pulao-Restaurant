"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, CalendarDays } from "lucide-react";
import { useRestaurant } from "@/context/RestaurantContext";

interface NavbarProps {
  onOpenReservation: () => void;
  onToggleCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation, onToggleCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useRestaurant();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Signature", href: "#signature" },
    { name: "About", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navHeight = 80;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? "glass-nav py-3 gold-glow" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex flex-col cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-wider text-gold gold-text-glow">
                TASTE OF PULAO'S
              </span>
              <span className="text-[10px] sm:text-xs font-body tracking-[0.25em] text-white opacity-80 -mt-1 uppercase">
                By Shreyas Grand
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-body text-sm font-medium tracking-wide text-soft-cream hover:text-gold transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Cart Button */}
              <button
                onClick={onToggleCart}
                className="relative p-2.5 rounded-full border border-gold/30 hover:border-gold text-gold hover:bg-gold/10 transition-all duration-200 cursor-pointer"
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-warm-orange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-matte-black animate-pulse">
                    {totalCartItems}
                  </span>
                )}
              </button>

              {/* Table Booking */}
              <button
                onClick={onOpenReservation}
                className="flex items-center space-x-2 bg-gradient-to-r from-gold to-warm-orange text-matte-black font-body font-semibold text-sm px-5 py-2.5 rounded-full hover:scale-105 transition-transform duration-200 cursor-pointer shadow-lg shadow-gold/20"
              >
                <CalendarDays className="w-4 h-4" />
                <span>Book Table</span>
              </button>
            </div>

            {/* Mobile Actions & Hamburger */}
            <div className="flex md:hidden items-center space-x-3">
              {/* Mobile Cart Button */}
              <button
                onClick={onToggleCart}
                className="relative p-2 rounded-full border border-gold/20 text-gold hover:bg-gold/5"
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-warm-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </button>

              {/* Hamburger Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md border border-gold/20 text-gold hover:bg-gold/5"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`fixed inset-y-0 right-0 w-64 bg-deep-charcoal border-l border-gold/10 z-50 transform transition-transform duration-300 md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b border-gold/10">
            <span className="font-heading text-lg font-bold text-gold">Navigation</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-gold hover:bg-gold/5"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col p-6 space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-body text-base font-medium tracking-wide text-soft-cream hover:text-gold transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenReservation();
              }}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gold to-warm-orange text-matte-black font-body font-semibold py-3 rounded-full shadow-lg shadow-gold/10"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Book Table</span>
            </button>
          </div>
        </div>

        {/* Drawer Backdrop */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </nav>
    </>
  );
};

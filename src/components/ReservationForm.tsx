"use client";

import React, { useState } from "react";
import { Calendar, Users, Clock, Smile, Sparkles, CheckCircle2 } from "lucide-react";
import { useRestaurant } from "@/context/RestaurantContext";

export const ReservationForm: React.FC = () => {
  const { addReservation } = useRestaurant();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 2,
    date: "",
    time: "",
    occasion: "Dinner",
    specialRequests: ""
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date || !formData.time) return;

    addReservation(formData);
    setIsSuccess(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      guests: 2,
      date: "",
      time: "",
      occasion: "Dinner",
      specialRequests: ""
    });

    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <div className="glass p-8 rounded-2xl border border-gold/20 shadow-2xl relative">
      {isSuccess && (
        <div className="absolute inset-0 bg-matte-black/95 rounded-2xl flex flex-col items-center justify-center text-center p-6 z-10 transition-opacity duration-300">
          <div className="bg-gold/10 p-4 rounded-full border border-gold/30 mb-4 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-gold" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-soft-cream">Table Requested!</h3>
          <p className="font-body text-sm text-soft-cream/80 max-w-sm mt-2 leading-relaxed">
            Your luxury dining request has been submitted. The Shreyas Grand team will send a confirmation SMS and Email shortly.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="mt-6 font-body font-bold text-xs bg-gold hover:bg-gold-hover text-matte-black px-6 py-2.5 rounded-full transition-all duration-200 cursor-pointer"
          >
            Book Another Table
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center space-y-2 mb-4">
          <span className="font-body text-[10px] font-bold tracking-[0.2em] text-gold uppercase block">
            Reserve Your Experience
          </span>
          <h3 className="font-heading text-2xl font-bold text-soft-cream">
            Luxury Fine Dining Booking
          </h3>
          <p className="font-body text-xs text-soft-cream/60">
            For parties larger than 10, please contact us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Guest Count */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-xs font-body text-gold tracking-wide uppercase">
              <Users className="w-3.5 h-3.5" />
              <span>Number of Guests</span>
            </label>
            <select
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
              className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-3 px-4 font-body text-sm text-soft-cream focus:outline-none"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i + 1 === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>

          {/* Occasion */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-xs font-body text-gold tracking-wide uppercase">
              <Smile className="w-3.5 h-3.5" />
              <span>Occasion</span>
            </label>
            <select
              value={formData.occasion}
              onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
              className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-3 px-4 font-body text-sm text-soft-cream focus:outline-none"
            >
              <option value="Dinner">Dinner</option>
              <option value="Lunch">Lunch</option>
              <option value="Birthday">Birthday Celebration</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Business Meeting">Business Dining</option>
            </select>
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-xs font-body text-gold tracking-wide uppercase">
              <Calendar className="w-3.5 h-3.5" />
              <span>Preferred Date</span>
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-3 px-4 font-body text-sm text-soft-cream focus:outline-none"
            />
          </div>

          {/* Time Picker */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-xs font-body text-gold tracking-wide uppercase">
              <Clock className="w-3.5 h-3.5" />
              <span>Preferred Time</span>
            </label>
            <select
              required
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-3 px-4 font-body text-sm text-soft-cream focus:outline-none"
            >
              <option value="">Select Time Slot</option>
              <option value="12:00 PM">12:00 PM (Lunch)</option>
              <option value="12:30 PM">12:30 PM (Lunch)</option>
              <option value="01:00 PM">01:00 PM (Lunch)</option>
              <option value="01:30 PM">01:30 PM (Lunch)</option>
              <option value="02:00 PM">02:00 PM (Lunch)</option>
              <option value="07:00 PM">07:00 PM (Dinner)</option>
              <option value="07:30 PM">07:30 PM (Dinner)</option>
              <option value="08:00 PM">08:00 PM (Dinner)</option>
              <option value="08:30 PM">08:30 PM (Dinner)</option>
              <option value="09:00 PM">09:00 PM (Dinner)</option>
              <option value="09:30 PM">09:30 PM (Dinner)</option>
              <option value="10:00 PM">10:00 PM (Dinner)</option>
            </select>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 pt-4 border-t border-gold/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              required
              placeholder="Your Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-3 px-4 font-body text-sm text-soft-cream focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-3 px-4 font-body text-sm text-soft-cream focus:outline-none"
            />
            <input
              type="tel"
              required
              placeholder="Phone Number (e.g. +91...)"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-3 px-4 font-body text-sm text-soft-cream focus:outline-none"
            />
          </div>

          <textarea
            placeholder="Special Requests (Allergies, Seating Preference, etc.)"
            rows={3}
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-3 px-4 font-body text-sm text-soft-cream focus:outline-none resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gold to-warm-orange text-matte-black font-body font-bold text-base py-4 rounded-lg hover:scale-[1.01] transition-transform duration-200 cursor-pointer shadow-lg shadow-gold/15"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span>Request Royal Seating</span>
        </button>
      </form>
    </div>
  );
};

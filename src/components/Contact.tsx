"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, CalendarDays, Send, CheckCircle2 } from "lucide-react";
import { useRestaurant } from "@/context/RestaurantContext";

export const Contact: React.FC = () => {
  const { timings, addInquiry } = useRestaurant();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    addInquiry(formData);
    setIsSuccess(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });

    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 bg-matte-black relative overflow-hidden border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="font-body text-xs font-bold tracking-[0.25em] text-gold uppercase block">
            Get In Touch
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-soft-cream">
            Contact & Timings
          </h2>
          <div className="h-1 w-20 bg-gold/60 mx-auto mt-3 rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Timings and Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            {/* Timings Card */}
            <div className="glass p-8 rounded-2xl border border-gold/20 shadow-xl space-y-6">
              <div className="flex items-center space-x-3 text-gold">
                <Clock className="w-5 h-5" />
                <h3 className="font-heading text-lg font-bold">Restaurant Timings</h3>
              </div>

              <div className="space-y-4 font-body text-sm">
                <div className="flex justify-between items-center border-b border-gold/5 pb-2">
                  <span className="text-soft-cream/80 font-medium">Monday - Friday</span>
                  <span className="text-gold font-semibold">{timings.weekday}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gold/5 pb-2">
                  <span className="text-soft-cream/80 font-medium">Saturday - Sunday</span>
                  <span className="text-gold font-semibold">{timings.weekend}</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-soft-cream/80 font-medium">Home Delivery</span>
                  <span className="text-gold font-semibold">{timings.delivery}</span>
                </div>
              </div>
            </div>

            {/* Quick Details Card */}
            <div className="glass p-8 rounded-2xl border border-gold/20 shadow-xl space-y-6">
              <div className="flex items-center space-x-3 text-gold">
                <CalendarDays className="w-5 h-5" />
                <h3 className="font-heading text-lg font-bold">Quick Contact</h3>
              </div>

              <div className="space-y-4 font-body text-sm">
                <a href="tel:+919876543210" className="flex items-center space-x-3 hover:text-gold transition-colors">
                  <Phone className="w-4.5 h-4.5 text-gold" />
                  <span>+91 98765 43210</span>
                </a>
                <a href="mailto:info@shreyasgrand.com" className="flex items-center space-x-3 hover:text-gold transition-colors">
                  <Mail className="w-4.5 h-4.5 text-gold" />
                  <span>info@shreyasgrand.com</span>
                </a>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4.5 h-4.5 text-gold flex-shrink-0 mt-0.5" />
                  <span>Railway Station Road, Anantapur, AP - 515001</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass p-8 rounded-2xl border border-gold/20 shadow-2xl relative">
              {isSuccess && (
                <div className="absolute inset-0 bg-matte-black/95 rounded-2xl flex flex-col items-center justify-center text-center p-6 z-10 transition-opacity duration-300">
                  <div className="bg-gold/15 p-3 rounded-full border border-gold/30 mb-3 animate-bounce">
                    <CheckCircle2 className="w-10 h-10 text-gold" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-soft-cream">Message Sent!</h3>
                  <p className="font-body text-xs text-soft-cream/80 max-w-sm mt-1.5 leading-relaxed">
                    Thank you for contacting us. The Shreyas Grand team will review your inquiry and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-5 font-body font-bold text-xs bg-gold hover:bg-gold-hover text-matte-black px-5 py-2 rounded-full transition-all duration-200 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="font-heading text-xl font-bold text-soft-cream">Send Us an Inquiry</h3>
                  <p className="font-body text-xs text-soft-cream/60">
                    Fill out the form below to leave feedback, suggest catering, or ask general queries.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-2.5 px-4 font-body text-sm text-soft-cream focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-2.5 px-4 font-body text-sm text-soft-cream focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-2.5 px-4 font-body text-sm text-soft-cream focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Subject (e.g. Catering, Feedback)"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-2.5 px-4 font-body text-sm text-soft-cream focus:outline-none"
                  />
                </div>

                <textarea
                  required
                  placeholder="Your Detailed Message..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-2.5 px-4 font-body text-sm text-soft-cream focus:outline-none resize-none"
                />

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gold to-warm-orange text-matte-black font-body font-bold py-3 rounded-lg hover:scale-[1.01] transition-transform duration-200 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

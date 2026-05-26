"use client";

import React from "react";
import { MapPin, Navigation } from "lucide-react";

export const GoogleMaps: React.FC = () => {
  return (
    <section className="py-24 bg-deep-charcoal border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text/Directions Info */}
          <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              <span className="font-body text-xs font-bold tracking-[0.25em] text-gold uppercase block">
                Find Our Location
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-soft-cream">
                Visit Shreyas Grand
              </h2>
              <div className="h-1 w-20 bg-gold/60 mx-auto lg:mx-0 mt-3 rounded" />
            </div>

            <p className="font-body text-sm sm:text-base text-soft-cream/80 font-light leading-relaxed">
              We are conveniently located in the heart of Anantapur, just a short distance from the railway station. Stop by for an unforgettable dining experience or request a direct home delivery.
            </p>

            <div className="space-y-4 pt-4 border-t border-gold/10 text-left max-w-sm mx-auto lg:mx-0">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-body text-xs font-bold text-gold uppercase tracking-wider">Address</span>
                  <span className="font-body text-sm text-soft-cream">
                    Railway Station Road, Anantapur, Andhra Pradesh - 515001
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Navigation className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-body text-xs font-bold text-gold uppercase tracking-wider">Directions Landmark</span>
                  <span className="font-body text-sm text-soft-cream">
                    Near Railway Station, opposite Grand Mall Entrance.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-gold to-warm-orange text-matte-black font-body font-bold text-sm px-6 py-3 rounded-full hover:scale-105 transition-transform duration-200"
              >
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Maps Iframe */}
          <div className="lg:col-span-8">
            <div className="w-full h-[350px] sm:h-[450px] rounded-2xl overflow-hidden border border-gold/25 shadow-2xl gold-glow relative">
              {/* Map embed targeting Anantapur, AP (Near railway station coordinates approximately) */}
              <iframe
                title="Taste Of Pulaos By Shreyas Grand Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.919702220473!2d77.59976311534062!3d14.681934379512397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb14ac5d53f86e3%3A0xe4a40ecda79de87e!2sAnantapur%20Railway%20Station!5e0!3m2!1sen!2sin!4v1655000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale invert opacity-80"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

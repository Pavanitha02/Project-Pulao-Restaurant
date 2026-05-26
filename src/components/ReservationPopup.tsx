"use client";

import React from "react";
import { X } from "lucide-react";
import { ReservationForm } from "./ReservationForm";

interface ReservationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationPopup: React.FC<ReservationPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Content container */}
      <div className="relative w-full max-w-3xl bg-matte-black rounded-2xl border border-gold/25 overflow-hidden z-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full border border-gold/20 text-gold hover:bg-gold/10 hover:border-gold transition-colors duration-200 z-20 cursor-pointer"
          aria-label="Close Booking Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-1 sm:p-2">
          <ReservationForm />
        </div>
      </div>
    </div>
  );
};

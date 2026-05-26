"use client";

import React, { useState } from "react";
import { MessageSquare, X, Plus, Minus, Trash2, ShoppingBag, Percent } from "lucide-react";
import { useRestaurant, CartItem } from "@/context/RestaurantContext";

interface WhatsAppButtonProps {
  isCartOpen: boolean;
  onCloseCart: () => void;
  onOpenReservation: () => void;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  isCartOpen,
  onCloseCart,
  onOpenReservation,
}) => {
  const { cart, updateCartQuantity, removeFromCart, offers } = useRestaurant();
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const total = subtotal - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");
    
    const matchingOffer = offers.find(o => o.code.toLowerCase() === promoCode.trim().toLowerCase());
    if (matchingOffer) {
      setAppliedDiscount(matchingOffer.discountPercentage);
      setPromoSuccess(`Coupon applied! ${matchingOffer.discountPercentage}% discount saved.`);
    } else {
      setPromoError("Invalid promo code. Try SHREYAS15");
      setAppliedDiscount(0);
    }
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    // Compile message text
    let message = `*NEW ORDER - TASTE OF PULAO'S BY SHREYAS GRAND*\n`;
    message += `===============================\n\n`;
    
    cart.forEach((item, index) => {
      const typeLabel = item.menuItem.isVeg ? "[VEG]" : "[NON-VEG]";
      message += `${index + 1}. ${typeLabel} *${item.menuItem.name}* x ${item.quantity}\n`;
      message += `   Price: ₹${item.menuItem.price} each | Subtotal: ₹${item.menuItem.price * item.quantity}\n\n`;
    });

    message += `===============================\n`;
    message += `*Subtotal:* ₹${subtotal}\n`;
    if (appliedDiscount > 0) {
      message += `*Discount Applied:* ${appliedDiscount}% (-₹${discountAmount})\n`;
    }
    message += `*GRAND TOTAL:* ₹${total}\n\n`;
    message += `Please confirm my order and share delivery/seating details. Thank you!`;

    // Encode URI and open WhatsApp
    const encodedMessage = encodeURIComponent(message);
    // Standard WhatsApp API link (919876543210 is mock restaurant mobile number)
    const whatsappUrl = `https://wa.me/919876543210?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Floating Sticky WhatsApp Button */}
      <button
        onClick={onCloseCart} // Toggles cart drawer
        className="fixed bottom-6 right-6 z-30 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group border border-emerald-400/20"
        aria-label="Order via WhatsApp"
      >
        <div className="relative">
          {/* WhatsApp / Message Icon */}
          <MessageSquare className="w-6 h-6 animate-pulse" />
          {totalItems > 0 && (
            <span className="absolute -top-3.5 -right-3.5 bg-warm-orange text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-emerald-600">
              {totalItems}
            </span>
          )}
        </div>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out font-body text-xs font-bold uppercase tracking-wider whitespace-nowrap">
          Order on WhatsApp
        </span>
      </button>

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={onCloseCart}
            className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity duration-300"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-deep-charcoal border-l border-gold/15 flex flex-col shadow-2xl h-full">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-gold/10 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gold">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="font-heading text-lg font-bold">Your Royal Order</span>
                </div>
                <button
                  onClick={onCloseCart}
                  className="p-1 rounded-md text-gold hover:bg-gold/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
                    <ShoppingBag className="w-12 h-12 text-gold/30" />
                    <h4 className="font-heading text-lg font-bold text-soft-cream">Your cart is empty</h4>
                    <p className="font-body text-xs text-soft-cream/60 max-w-xs">
                      Explore our delicious pulaos and starters and add them to your cart to order directly.
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className="glass p-4 rounded-xl border border-gold/10 flex items-center space-x-4 justify-between"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <h4 className="font-heading text-sm font-bold text-soft-cream truncate">
                            {item.menuItem.name}
                          </h4>
                          <span className="font-heading text-xs text-gold">
                            ₹{item.menuItem.price} each
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {/* Quantity controls */}
                        <div className="flex items-center space-x-1.5 border border-gold/20 rounded-full px-2 py-1 bg-matte-black">
                          <button
                            onClick={() => updateCartQuantity(item.menuItem.id, item.quantity - 1)}
                            className="p-0.5 text-gold hover:bg-gold/10 rounded-full"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-body text-xs text-soft-cream font-bold w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.menuItem.id, item.quantity + 1)}
                            className="p-0.5 text-gold hover:bg-gold/10 rounded-full"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Trash */}
                        <button
                          onClick={() => removeFromCart(item.menuItem.id)}
                          className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout Panel */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-gold/10 space-y-4 bg-matte-black">
                  {/* Promo Form */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-grow">
                      <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold w-3.5 h-3.5" />
                      <input
                        type="text"
                        placeholder="Promo Code (SHREYAS15)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-2 pl-9 pr-2 font-body text-xs text-soft-cream placeholder-soft-cream/40 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-gold hover:bg-gold-hover text-matte-black text-xs font-body font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                  {promoError && <p className="text-red-400 text-[10px] font-body">{promoError}</p>}
                  {promoSuccess && <p className="text-green-400 text-[10px] font-body">{promoSuccess}</p>}

                  {/* Calculations */}
                  <div className="space-y-1.5 font-body text-xs text-soft-cream/80">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Discount ({appliedDiscount}%)</span>
                        <span>-₹{discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-heading text-base font-bold text-gold border-t border-gold/5 pt-2">
                      <span>Grand Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>

                  {/* Checkout buttons */}
                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      onClick={handleWhatsAppCheckout}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-body font-bold py-3.5 rounded-lg hover:scale-[1.01] transition-transform duration-200 cursor-pointer shadow-lg shadow-emerald-900/10"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Send Order on WhatsApp</span>
                    </button>

                    <button
                      onClick={() => {
                        onCloseCart();
                        onOpenReservation();
                      }}
                      className="w-full flex items-center justify-center space-x-2 bg-transparent text-gold hover:bg-gold/10 border border-gold/50 font-body font-bold py-2 rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      <span>Or Book a Family Table instead</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

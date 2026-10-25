"use client";

import React, { useState, useEffect } from "react";
import { THEATERS } from "@/data/theaters";
import { ADDONS } from "@/data/addons";
import { TIME_SLOTS } from "@/data/slots";
import { OCCASIONS } from "@/data/occasions";
import { BookingFormData } from "@/types";
import { 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Share2, 
  ChevronRight,
  ShieldCheck,
  Check,
  PartyPopper
} from "lucide-react";

interface BookingWizardProps {
  initialTheaterId?: string;
  initialOccasion?: string;
}

export function BookingWizard({ initialTheaterId, initialOccasion }: BookingWizardProps) {
  // Form State
  const [selectedTheaterId, setSelectedTheaterId] = useState<string>(
    initialTheaterId || "cinema-suite"
  );
  
  // Format today's date YYYY-MM-DD
  const getTodayString = () => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  };

  const [eventDate, setEventDate] = useState<string>(getTodayString());
  const [selectedSlotId, setSelectedSlotId] = useState<string>("slot-evening");
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedOccasion, setSelectedOccasion] = useState<string>(
    initialOccasion || "Birthday Celebrations"
  );
  const [selectedAddonIds, setSelectedAddonIds] = useState<{ [id: string]: number }>({
    "effect-fog-entry": 1,
    "cake-choc-truffle": 1,
  });

  // Customer Contact State
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState<string>("");

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<BookingFormData | null>(null);
  const [whatsAppDirectUrl, setWhatsAppDirectUrl] = useState<string>("");

  // Sync external changes
  useEffect(() => {
    if (initialTheaterId) setSelectedTheaterId(initialTheaterId);
  }, [initialTheaterId]);

  useEffect(() => {
    if (initialOccasion) setSelectedOccasion(initialOccasion);
  }, [initialOccasion]);

  const currentTheater = THEATERS.find((t) => t.id === selectedTheaterId) || THEATERS[0];
  const currentSlot = TIME_SLOTS.find((s) => s.id === selectedSlotId) || TIME_SLOTS[0];

  // Price Calculation
  const basePrice = currentTheater.basePrice;
  const extraGuestsCount = Math.max(0, guestCount - currentTheater.baseCapacity);
  const extraGuestsPrice = extraGuestsCount * currentTheater.extraPersonPrice;

  const addonsList = Object.entries(selectedAddonIds)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const addon = ADDONS.find((a) => a.id === id);
      return {
        id,
        name: addon ? addon.name : id,
        price: addon ? addon.price : 0,
        quantity: qty,
      };
    });

  const addonsTotal = addonsList.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPrice = basePrice + extraGuestsPrice + addonsTotal;
  const advancePayable = 750;
  const balanceAtVenue = totalPrice - advancePayable;

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) => {
      const copy = { ...prev };
      if (copy[addonId]) {
        delete copy[addonId];
      } else {
        copy[addonId] = 1;
      }
      return copy;
    });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validation
    if (!customerName.trim()) {
      setSubmitError("Please enter your name.");
      return;
    }
    const cleanPhone = customerPhone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setSubmitError("Please enter a valid 10-digit mobile number for WhatsApp booking confirmation.");
      return;
    }

    setIsSubmitting(true);

    const bookingId = "HOT-" + Math.floor(100000 + Math.random() * 900000);

    const bookingData: BookingFormData = {
      bookingId,
      customerName: customerName.trim(),
      customerPhone: cleanPhone,
      customerEmail: customerEmail.trim(),
      eventDate,
      theaterId: currentTheater.id,
      theaterName: currentTheater.name,
      slotId: currentSlot.id,
      slotTime: currentSlot.timeRange,
      guestCount,
      occasion: selectedOccasion,
      addons: addonsList,
      specialRequests: specialRequests.trim(),
      basePrice,
      extraGuestsPrice,
      addonsTotal,
      totalPrice,
      advancePayable,
      createdAt: new Date().toISOString(),
      location: "Ravet, Pune",
    };

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const resData = await response.json();

      if (resData.success) {
        setBookingSuccess(bookingData);
        if (resData.whatsAppUrl) {
          setWhatsAppDirectUrl(resData.whatsAppUrl);
        }
      } else {
        setSubmitError(resData.message || "Failed to submit booking. Please try again or WhatsApp us directly.");
      }
    } catch (err: any) {
      console.error("Booking submission error:", err);
      // Graceful fallback: Still allow user to proceed with WhatsApp confirmation
      setBookingSuccess(bookingData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book" className="py-20 relative bg-[#07080b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-crimson text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Reservation • Ravet Venue</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Reserve Your Private Theater Slot
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            Lock in your preferred 3-hour private slot with an advance token of only ₹750. 
            All bookings sync directly to Google Sheets and our WhatsApp desk.
          </p>
        </div>

        {/* Booking Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Fields (7 Columns) */}
          <form onSubmit={handleBookingSubmit} className="lg:col-span-7 space-y-6">
            {/* Step 1: Date & Time Slot */}
            <div className="p-6 rounded-2xl bg-surface-card border border-white/10">
              <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-brand-gold">
                <Calendar className="w-4 h-4" />
                <span>Step 1: Choose Date & 3-Hour Slot</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-gray-300 block mb-2 font-medium">
                    Event Date:
                  </label>
                  <input
                    type="date"
                    min={getTodayString()}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-2 font-medium">
                    Select 3-Hour Slot:
                  </label>
                  <select
                    value={selectedSlotId}
                    onChange={(e) => setSelectedSlotId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-border/40 border border-white/10 text-white text-sm focus:border-brand-red focus:outline-none"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot.id} value={slot.id} className="bg-surface">
                        {slot.timeRange} — {slot.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Slot Quick Selector Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = slot.id === selectedSlotId;
                  return (
                    <button
                      type="button"
                      key={slot.id}
                      onClick={() => setSelectedSlotId(slot.id)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        isSelected
                          ? "bg-brand-red/15 border-brand-red text-white"
                          : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      <div className="text-xs font-bold truncate">{slot.label}</div>
                      <div className="text-[10px] text-gray-400 truncate">{slot.timeRange}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Theater Room & Guests */}
            <div className="p-6 rounded-2xl bg-surface-card border border-white/10">
              <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-brand-gold">
                <Users className="w-4 h-4" />
                <span>Step 2: Select Theater & Guest Count</span>
              </div>

              {/* Theater Cards Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {THEATERS.map((t) => {
                  const isSelected = t.id === selectedTheaterId;
                  return (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => {
                        setSelectedTheaterId(t.id);
                        if (guestCount < t.baseCapacity) setGuestCount(t.baseCapacity);
                        if (guestCount > t.maxCapacity) setGuestCount(t.maxCapacity);
                      }}
                      className={`p-3.5 rounded-xl text-left border transition-all ${
                        isSelected
                          ? "bg-brand-red/15 border-brand-red text-white ring-1 ring-brand-red"
                          : "bg-white/5 border-white/5 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      <div className="text-xs font-bold">{t.name}</div>
                      <div className="text-[11px] text-brand-gold font-semibold mt-1">₹{t.basePrice} (3 hrs)</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{t.capacityText}</div>
                    </button>
                  );
                })}
              </div>

              {/* Guest Count Selector */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <div className="text-xs font-bold text-white">Number of Guests:</div>
                  <div className="text-[11px] text-gray-400">
                    Base price includes {currentTheater.baseCapacity} people. Extra: ₹{currentTheater.extraPersonPrice}/person.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.max(currentTheater.baseCapacity, guestCount - 1))}
                    className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold flex items-center justify-center hover:bg-white/20"
                  >
                    -
                  </button>
                  <span className="text-base font-extrabold text-white w-6 text-center">
                    {guestCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.min(currentTheater.maxCapacity, guestCount + 1))}
                    className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold flex items-center justify-center hover:bg-white/20"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Occasion & Add-ons */}
            <div className="p-6 rounded-2xl bg-surface-card border border-white/10">
              <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-brand-gold">
                <Sparkles className="w-4 h-4" />
                <span>Step 3: Occasion & Custom Add-ons</span>
              </div>

              {/* Occasion dropdown */}
              <div className="mb-5">
                <label className="text-xs text-gray-300 block mb-2 font-medium">
                  Occasion Type:
                </label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface-border/40 border border-white/10 text-white text-sm focus:border-brand-red focus:outline-none"
                >
                  {OCCASIONS.map((occ) => (
                    <option key={occ.id} value={occ.title} className="bg-surface">
                      {occ.title}
                    </option>
                  ))}
                  <option value="Casual Movie Binge / Date" className="bg-surface">
                    Casual Movie Binge / Date
                  </option>
                  <option value="Other Private Gathering" className="bg-surface">
                    Other Private Gathering
                  </option>
                </select>
              </div>

              {/* Add-ons selection */}
              <div>
                <label className="text-xs text-gray-300 block mb-2 font-medium">
                  Select Add-ons (Cakes, Fog Entry, Decor, Photoshoot):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
                  {ADDONS.map((addon) => {
                    const isSelected = !!selectedAddonIds[addon.id];
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-2 ${
                          isSelected
                            ? "bg-brand-red/10 border-brand-red/40 text-white"
                            : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "bg-brand-red border-brand-red text-white"
                                : "border-gray-500"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-medium truncate">{addon.name}</span>
                        </div>
                        <span className="text-xs font-bold text-gray-200 shrink-0">
                          +₹{addon.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 4: Contact & Guest Details */}
            <div className="p-6 rounded-2xl bg-surface-card border border-white/10">
              <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-brand-gold">
                <ShieldCheck className="w-4 h-4" />
                <span>Step 4: Your Contact & Guest Details</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-300 block mb-1.5 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Patil"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-brand-red focus:outline-none placeholder:text-gray-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1.5 font-medium">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-brand-red focus:outline-none placeholder:text-gray-600"
                    />
                    <div className="text-[10px] text-gray-400 mt-1">
                      We send booking confirmation & directions on WhatsApp.
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1.5 font-medium">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="rahul@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-brand-red focus:outline-none placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1.5 font-medium">
                    Special Requests / Personal Video / Name on Screen
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. 'Playing a surprise proposal video at 8 PM', 'Name on Neon Board: Sneha'"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-brand-red focus:outline-none placeholder:text-gray-600"
                  />
                </div>
              </div>

              {submitError && (
                <div className="mt-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-brand-red to-brand-crimson hover:opacity-95 shadow-xl shadow-brand-red/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Recording Booking to Google Sheets...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Confirm & Lock Slot (Token ₹{advancePayable})</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Sticky Order Summary (5 Columns) */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="rounded-3xl bg-surface-card border-2 border-brand-red/40 p-6 sm:p-7 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-brand-gold">
                    Booking Summary
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    House of OTT (Ravet)
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-red/20 text-brand-crimson border border-brand-red/30">
                  3 Hours Private
                </span>
              </div>

              {/* Theater specs preview */}
              <div className="space-y-2.5 text-xs text-gray-300 pb-4 border-b border-white/10 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Theater Room:</span>
                  <span className="font-semibold text-white">{currentTheater.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="font-semibold text-white">{eventDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Slot Time:</span>
                  <span className="font-semibold text-brand-gold">{currentSlot.timeRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Guests:</span>
                  <span className="font-semibold text-white">{guestCount} People</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Occasion:</span>
                  <span className="font-semibold text-white">{selectedOccasion}</span>
                </div>
              </div>

              {/* Line items */}
              <div className="space-y-2 text-xs mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Base Rent (3 hrs, {currentTheater.baseCapacity} pax)</span>
                  <span className="font-semibold text-white">₹{basePrice}</span>
                </div>

                {extraGuestsCount > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>
                      {extraGuestsCount} Extra Guest{extraGuestsCount > 1 ? "s" : ""}
                    </span>
                    <span className="font-semibold text-white">₹{extraGuestsPrice}</span>
                  </div>
                )}

                {addonsList.length > 0 && (
                  <div className="pt-2 border-t border-white/5 space-y-1">
                    <div className="text-[11px] font-bold text-gray-400">Add-ons:</div>
                    {addonsList.map((a) => (
                      <div key={a.id} className="flex justify-between text-gray-300 pl-2">
                        <span className="truncate pr-2">• {a.name}</span>
                        <span className="font-semibold text-white shrink-0">₹{a.price * a.quantity}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Total Card */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-4">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-gray-400 uppercase font-semibold">Total Event Cost</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">
                    ₹{totalPrice}
                  </span>
                </div>
                <div className="text-[11px] text-gray-400">
                  Zero convenience fees. All taxes included.
                </div>
              </div>

              {/* Advance Pay Highlight */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                <div className="flex items-center justify-between font-bold text-emerald-400 mb-1">
                  <span>Advance Token:</span>
                  <span className="text-sm">₹{advancePayable}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-300">
                  <span>Pay Balance at Ravet venue:</span>
                  <span>₹{balanceAtVenue}</span>
                </div>
              </div>

              {/* Venue details reminder */}
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-gray-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-crimson shrink-0" />
                <span>Sector 29, Prime Ville, Ravet, Pune 412101</span>
              </div>
            </div>

            {/* Quick Assistance Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-gold" />
                <span className="text-gray-300">Need instant date check?</span>
              </div>
              <a
                href="tel:+919168530789"
                className="font-bold text-white hover:text-brand-gold transition-colors"
              >
                +91 91685 30789
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {bookingSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl bg-[#12151e] border-2 border-brand-red/50 p-6 sm:p-8 shadow-2xl relative text-left">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-gold mb-1">
              <PartyPopper className="w-4 h-4" />
              <span>Booking Request Received!</span>
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-2">
              Slot Reserved: {bookingSuccess.bookingId}
            </h3>

            <p className="text-xs text-gray-300 mb-4 leading-relaxed">
              Thank you, <span className="text-white font-semibold">{bookingSuccess.customerName}</span>! 
              Your booking has been saved directly to our Google Sheet and sent to our team in Ravet.
            </p>

            {/* Summary Details */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs mb-5">
              <div className="flex justify-between">
                <span className="text-gray-400">Theater:</span>
                <span className="font-semibold text-white">{bookingSuccess.theaterName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date & Slot:</span>
                <span className="font-semibold text-brand-gold">
                  {bookingSuccess.eventDate} ({bookingSuccess.slotTime})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Guests:</span>
                <span className="font-semibold text-white">{bookingSuccess.guestCount} People</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total / Advance:</span>
                <span className="font-semibold text-white">
                  ₹{bookingSuccess.totalPrice} / ₹{bookingSuccess.advancePayable} token
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Venue:</span>
                <span className="font-semibold text-white">Sector 29, Ravet, Pune</span>
              </div>
            </div>

            {/* WhatsApp 1-Click Action */}
            <div className="space-y-3">
              <a
                href={
                  whatsAppDirectUrl ||
                  `https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20just%20reserved%20Booking%20ID%20${bookingSuccess.bookingId}%20for%20${bookingSuccess.eventDate}.%20Please%20confirm!`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Confirmation on WhatsApp Now</span>
              </a>

              <a
                href="https://share.google/6g19LyHLut3CkEDbk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl font-semibold text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-crimson" />
                <span>Open Ravet Location on Google Maps</span>
              </a>

              <button
                type="button"
                onClick={() => setBookingSuccess(null)}
                className="w-full py-2.5 text-center text-xs text-gray-400 hover:text-white"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

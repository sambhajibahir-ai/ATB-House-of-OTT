"use client";

import React, { useState, useEffect } from "react";
import { THEATERS } from "@/data/theaters";
import { ADDONS } from "@/data/addons";
import { TIME_SLOTS } from "@/data/slots";
import { OCCASIONS } from "@/data/occasions";
import { BookingFormData } from "@/types";
import { useTheme } from "@/context/ThemeContext";
import { 
  Calendar, 
  Users, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  MessageCircle, 
  Phone, 
  MapPin, 
  ChevronRight,
  ShieldCheck,
  Check,
  PartyPopper
} from "lucide-react";

interface BookingWizardProps {
  initialTheaterId?: string;
  initialOccasion?: string;
  initialDate?: string;
  initialSlotId?: string;
  initialGuests?: number;
  initialAddonIds?: string[];
}

export function BookingWizard({
  initialTheaterId,
  initialOccasion,
  initialDate,
  initialSlotId,
  initialGuests,
  initialAddonIds
}: BookingWizardProps) {
  const { config } = useTheme();

  // Form State
  const [selectedTheaterId, setSelectedTheaterId] = useState<string>(
    initialTheaterId || "cinema-suite"
  );
  
  const getTodayString = () => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  };

  const [eventDate, setEventDate] = useState<string>(initialDate || getTodayString());
  const [selectedSlotId, setSelectedSlotId] = useState<string>(initialSlotId || "slot-evening");
  const [guestCount, setGuestCount] = useState<number>(initialGuests || 2);
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

  useEffect(() => {
    if (initialTheaterId) setSelectedTheaterId(initialTheaterId);
  }, [initialTheaterId]);

  useEffect(() => {
    if (initialOccasion) setSelectedOccasion(initialOccasion);
  }, [initialOccasion]);

  useEffect(() => {
    if (initialDate) setEventDate(initialDate);
  }, [initialDate]);

  useEffect(() => {
    if (initialSlotId) setSelectedSlotId(initialSlotId);
  }, [initialSlotId]);

  useEffect(() => {
    if (initialGuests) setGuestCount(initialGuests);
  }, [initialGuests]);

  useEffect(() => {
    if (initialAddonIds && initialAddonIds.length > 0) {
      const map: { [id: string]: number } = {};
      initialAddonIds.forEach((id) => {
        if (id === "fog-entry") map["effect-fog-entry"] = 1;
        else if (id === "truffle-cake") map["cake-choc-truffle"] = 1;
        else if (id === "pyro-sparklers") map["effect-cold-pyro"] = 1;
        else if (id === "surprise-video") map["effect-screen-slideshow"] = 1;
        else map[id] = 1;
      });
      setSelectedAddonIds(map);
    }
  }, [initialAddonIds]);

  const currentTheater = THEATERS.find((t) => t.id === selectedTheaterId) || THEATERS[0];
  const currentSlot = TIME_SLOTS.find((s) => s.id === selectedSlotId) || TIME_SLOTS[0];

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

    if (!customerName.trim()) {
      setSubmitError("Please enter your full name.");
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
        setSubmitError(resData.message || "Failed to submit booking. Please reach us via WhatsApp directly.");
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      setBookingSuccess(bookingData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book" aria-labelledby="booking-heading" className="py-20 relative bg-[#07080B] border-b border-white/10">
      {/* Dynamic ambient color glow according to theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider mb-3 text-amber-400 shadow-cinema-soft">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Instant Reservation</span>
          </div>
          <h2 id="booking-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Reserve Your Private Theater
          </h2>
          <p className="text-sm text-gray-300">
            Lock your 3-hour slot with a ₹750 token. Balance payable at the venue.
          </p>
        </div>

        {/* Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form */}
          <form onSubmit={handleBookingSubmit} className="lg:col-span-7 space-y-6" noValidate>
            {/* Step 1: Date & Time Slot */}
            <fieldset className="p-6 sm:p-7 rounded-2xl bg-[#0E111C]/90 backdrop-blur-md border border-white/10 ring-1 ring-white/5 shadow-cinema-soft hover:shadow-cinema-hover transition-all duration-300">
              <legend className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${config.accentText} px-1 mb-4`}>
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>Step 1: Choose Date &amp; 3-Hour Slot</span>
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="booking-event-date" className="text-xs font-semibold text-gray-300 block mb-1.5">
                    Event Date:
                  </label>
                  <input
                    id="booking-event-date"
                    type="date"
                    min={getTodayString()}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="booking-slot-select" className="text-xs font-semibold text-gray-300 block mb-1.5">
                    Select 3-Hour Slot:
                  </label>
                  <select
                    id="booking-slot-select"
                    value={selectedSlotId}
                    onChange={(e) => setSelectedSlotId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F121C] border border-white/10 text-white text-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none transition-colors"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot.id} value={slot.id} className="bg-[#0F121C]">
                        {slot.timeRange} — {slot.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Select Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = slot.id === selectedSlotId;
                  return (
                    <button
                      type="button"
                      key={slot.id}
                      aria-pressed={isSelected}
                      onClick={() => setSelectedSlotId(slot.id)}
                      className={`p-2.5 rounded-xl text-left border transition-all focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                        isSelected
                          ? `bg-white/15 ${config.accentBorder} text-white ring-1 ring-white/20 shadow-ambient-glow`
                          : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <div className="text-xs font-bold truncate">{slot.label}</div>
                      <div className="text-[10px] text-gray-400 truncate">{slot.timeRange}</div>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Step 2: Theater & Guests */}
            <fieldset className="p-6 sm:p-7 rounded-2xl bg-[#0E111C]/90 backdrop-blur-md border border-white/10 ring-1 ring-white/5 shadow-cinema-soft hover:shadow-cinema-hover transition-all duration-300">
              <legend className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${config.accentText} px-1 mb-4`}>
                <Users className="w-4 h-4" aria-hidden="true" />
                <span>Step 2: Select Theater &amp; Guest Count</span>
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {THEATERS.map((t) => {
                  const isSelected = t.id === selectedTheaterId;
                  return (
                    <button
                      type="button"
                      key={t.id}
                      aria-pressed={isSelected}
                      onClick={() => {
                        setSelectedTheaterId(t.id);
                        if (guestCount < t.baseCapacity) setGuestCount(t.baseCapacity);
                        if (guestCount > t.maxCapacity) setGuestCount(t.maxCapacity);
                      }}
                      className={`p-3.5 rounded-xl text-left border transition-all focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                        isSelected
                          ? `bg-white/15 ${config.accentBorder} text-white ring-1 ring-white/20 shadow-ambient-glow`
                          : "bg-white/5 border-white/5 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      <div className="text-xs font-bold">{t.name}</div>
                      <div className={`text-[11px] ${config.accentText} font-semibold mt-1`}>₹{t.basePrice} (3 hrs)</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{t.capacityText}</div>
                    </button>
                  );
                })}
              </div>

              {/* Guest counter */}
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
                    aria-label="Decrease guest count"
                    onClick={() => setGuestCount(Math.max(currentTheater.baseCapacity, guestCount - 1))}
                    className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold flex items-center justify-center hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
                  >
                    -
                  </button>
                  <span className="text-base font-extrabold text-white w-6 text-center" aria-live="polite">
                    {guestCount}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase guest count"
                    onClick={() => setGuestCount(Math.min(currentTheater.maxCapacity, guestCount + 1))}
                    className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold flex items-center justify-center hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
                  >
                    +
                  </button>
                </div>
              </div>
            </fieldset>

            {/* Step 3: Occasion & Add-ons */}
            <fieldset className="p-6 sm:p-7 rounded-2xl bg-[#0E111C]/90 backdrop-blur-md border border-white/10 ring-1 ring-white/5 shadow-cinema-soft hover:shadow-cinema-hover transition-all duration-300">
              <legend className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${config.accentText} px-1 mb-4`}>
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Step 3: Occasion &amp; Custom Add-ons</span>
              </legend>

              <div className="mb-5">
                <label htmlFor="booking-occasion" className="text-xs font-semibold text-gray-300 block mb-2">
                  Occasion Type:
                </label>
                <select
                  id="booking-occasion"
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0F121C] border border-white/10 text-white text-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none"
                >
                  {OCCASIONS.map((occ) => (
                    <option key={occ.id} value={occ.title} className="bg-[#0F121C]">
                      {occ.title}
                    </option>
                  ))}
                  <option value="Casual Movie Binge / Date" className="bg-[#0F121C]">
                    Casual Movie Binge / Date
                  </option>
                  <option value="Other Private Gathering" className="bg-[#0F121C]">
                    Other Private Gathering
                  </option>
                </select>
              </div>

              <div>
                <div className="text-xs font-semibold text-gray-300 block mb-2">
                  Select Add-ons (Cakes, Fog Entry, Decor, Photoshoot):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
                  {ADDONS.map((addon) => {
                    const isSelected = !!selectedAddonIds[addon.id];
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        role="checkbox"
                        aria-checked={isSelected}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-2 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                          isSelected
                            ? `bg-white/15 ${config.accentBorder} text-white ring-1 ring-white/10`
                            : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? `${config.accentBg} ${config.accentBorder} text-slate-950 font-bold`
                                : "border-gray-600 bg-white/5"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" aria-hidden="true" />}
                          </div>
                          <span className="text-xs font-medium truncate">{addon.name}</span>
                        </div>
                        <span className="text-xs font-bold text-gray-200 shrink-0">
                          +₹{addon.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </fieldset>

            {/* Step 4: Contact Details */}
            <fieldset className="p-6 sm:p-7 rounded-2xl bg-[#0E111C]/90 backdrop-blur-md border border-white/10 ring-1 ring-white/5 shadow-cinema-soft hover:shadow-cinema-hover transition-all duration-300">
              <legend className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${config.accentText} px-1 mb-4`}>
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>Step 4: Your Contact &amp; Guest Details</span>
              </legend>

              <div className="space-y-4">
                <div>
                  <label htmlFor="customer-name" className="text-xs font-semibold text-gray-300 block mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    aria-required="true"
                    placeholder="e.g. Rahul Patil"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none placeholder:text-gray-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="customer-phone" className="text-xs font-semibold text-gray-300 block mb-1.5">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      id="customer-phone"
                      type="tel"
                      required
                      aria-required="true"
                      aria-describedby="phone-help"
                      placeholder="e.g. 9876543210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none placeholder:text-gray-600"
                    />
                    <div id="phone-help" className="text-[10px] text-gray-400 mt-1">
                      We send your slot confirmation directly on WhatsApp.
                    </div>
                  </div>

                  <div>
                    <label htmlFor="customer-email" className="text-xs font-semibold text-gray-300 block mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      id="customer-email"
                      type="email"
                      placeholder="rahul@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="special-requests" className="text-xs font-semibold text-gray-300 block mb-1.5">
                    Special Requests / Personal Video / Name on Screen
                  </label>
                  <textarea
                    id="special-requests"
                    rows={2}
                    placeholder="e.g. 'Playing surprise video clip at 7 PM', 'Name on backdrop: Sneha'"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none placeholder:text-gray-600"
                  />
                </div>
              </div>

              {submitError && (
                <div role="alert" className="mt-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" aria-hidden="true" />
                  <span>{submitError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-6 w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${config.buttonClass}`}
              >
                {isSubmitting ? (
                  <span>Recording Booking to Google Sheets...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" aria-hidden="true" />
                    <span>Confirm &amp; Lock Slot (Advance Token ₹{advancePayable})</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </fieldset>
          </form>

          {/* Sticky Order Summary */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="rounded-3xl bg-gradient-to-b from-[#111524] to-[#0A0D17] border border-white/15 ring-1 ring-white/5 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div>
                  <div className={`text-[11px] font-bold uppercase tracking-wider ${config.accentText}`}>
                    Booking Summary
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    House of OTT (Ravet)
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/10 text-gray-200 border border-white/15">
                  3 Hours Private
                </span>
              </div>

              {/* Specs preview */}
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
                  <span className="font-semibold text-amber-400">{currentSlot.timeRange}</span>
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

              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-gray-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" aria-hidden="true" />
                <span>Sector 29, Prime Ville, Ravet, Pune 412101</span>
              </div>
            </div>

            {/* Assistance Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs flex items-center justify-between shadow-cinema-soft">
              <div className="flex items-center gap-2">
                <Phone className={`w-4 h-4 ${config.accentText}`} aria-hidden="true" />
                <span className="text-gray-300">Need instant date check?</span>
              </div>
              <a
                href="tel:+919168530789"
                className={`font-bold text-white hover:${config.accentText} transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none rounded px-1`}
              >
                +91 91685 30789
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {bookingSuccess && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="booking-success-title"
          aria-describedby="booking-success-desc"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <div className="w-full max-w-lg rounded-3xl bg-[#0F121C] border border-white/20 ring-1 ring-white/10 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative text-left">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400">
              <CheckCircle className="w-8 h-8" aria-hidden="true" />
            </div>

            <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${config.accentText} mb-1`}>
              <PartyPopper className="w-4 h-4" aria-hidden="true" />
              <span>Booking Request Received!</span>
            </div>

            <h3 id="booking-success-title" className="text-2xl font-extrabold text-white mb-2">
              Slot Reserved: {bookingSuccess.bookingId}
            </h3>

            <p id="booking-success-desc" className="text-xs sm:text-sm text-gray-300 mb-4 leading-relaxed">
              Thank you, <strong className="text-white">{bookingSuccess.customerName}</strong>! 
              Your booking has been saved directly to our Google Sheet and sent to our team in Ravet.
            </p>

            {/* Summary Details */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs mb-5">
              <div className="flex justify-between">
                <span className="text-gray-400">Theater:</span>
                <span className="font-semibold text-white">{bookingSuccess.theaterName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date &amp; Slot:</span>
                <span className="font-semibold text-amber-400">
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

            {/* Actions */}
            <div className="space-y-3">
              <a
                href={
                  whatsAppDirectUrl ||
                  `https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20just%20reserved%20Booking%20ID%20${bookingSuccess.bookingId}%20for%20${bookingSuccess.eventDate}.%20Please%20confirm!`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Send Confirmation on WhatsApp Now</span>
              </a>

              <a
                href="https://share.google/6g19LyHLut3CkEDbk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl font-semibold text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
                <span>Open Ravet Location on Google Maps</span>
              </a>

              <button
                type="button"
                onClick={() => setBookingSuccess(null)}
                className="w-full py-2.5 text-center text-xs text-gray-400 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none rounded"
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

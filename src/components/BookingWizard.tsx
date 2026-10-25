"use client";

import React, { useState, useEffect } from "react";
import { THEATERS } from "@/data/theaters";
import { ADDONS } from "@/data/addons";
import { TIME_SLOTS } from "@/data/slots";
import { OCCASIONS } from "@/data/occasions";
import { BookingFormData } from "@/types";
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
  Check
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
    <section id="book" aria-labelledby="booking-heading" className="py-20 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 uppercase tracking-wide mb-3">
            Instant Online Reservation
          </div>
          <h2 id="booking-heading" className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Reserve Your Private Slot
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Select your date, 3-hour time slot, and theater room. Lock in your slot with an advance token 
            of ₹750. Records are automatically saved to our Google Sheet.
          </p>
        </div>

        {/* Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (7 Columns) */}
          <form onSubmit={handleBookingSubmit} className="lg:col-span-7 space-y-6" noValidate>
            {/* Step 1: Date & Time Slot */}
            <fieldset className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <legend className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-300 px-1 mb-4">
                <Calendar className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>Step 1: Choose Date &amp; Slot</span>
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="booking-event-date" className="text-xs font-medium text-slate-300 block mb-1.5">
                    Event Date <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="booking-event-date"
                    type="date"
                    min={getTodayString()}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    aria-required="true"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="booking-slot-select" className="text-xs font-medium text-slate-300 block mb-1.5">
                    3-Hour Slot <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="booking-slot-select"
                    value={selectedSlotId}
                    onChange={(e) => setSelectedSlotId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot.id} value={slot.id}>
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
                      className={`p-2.5 rounded-lg text-left border transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                        isSelected
                          ? "bg-slate-800 border-red-500 text-white"
                          : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-850"
                      }`}
                    >
                      <div className="text-xs font-semibold truncate">{slot.label}</div>
                      <div className="text-[11px] text-slate-400 truncate">{slot.timeRange}</div>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Step 2: Theater & Guests */}
            <fieldset className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <legend className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-300 px-1 mb-4">
                <Users className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>Step 2: Theater Room &amp; Guest Count</span>
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
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
                      className={`p-3 rounded-lg text-left border transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                        isSelected
                          ? "bg-slate-800 border-red-500 text-white"
                          : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-850"
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{t.name}</div>
                      <div className="text-xs text-amber-400 font-semibold mt-0.5">₹{t.basePrice}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{t.capacityText}</div>
                    </button>
                  );
                })}
              </div>

              {/* Guest counter */}
              <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                <div>
                  <div className="text-xs font-bold text-white">Number of Guests</div>
                  <div className="text-xs text-slate-400">
                    Base price includes {currentTheater.baseCapacity} people. Extra: ₹{currentTheater.extraPersonPrice}/person.
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Decrease guest count"
                    onClick={() => setGuestCount(Math.max(currentTheater.baseCapacity, guestCount - 1))}
                    className="w-8 h-8 rounded-md bg-slate-800 text-white font-bold flex items-center justify-center hover:bg-slate-750 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-white w-8 text-center" aria-live="polite">
                    {guestCount}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase guest count"
                    onClick={() => setGuestCount(Math.min(currentTheater.maxCapacity, guestCount + 1))}
                    className="w-8 h-8 rounded-md bg-slate-800 text-white font-bold flex items-center justify-center hover:bg-slate-750 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
                  >
                    +
                  </button>
                </div>
              </div>
            </fieldset>

            {/* Step 3: Occasion & Add-ons */}
            <fieldset className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <legend className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-300 px-1 mb-4">
                <Sparkles className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>Step 3: Occasion &amp; Add-ons</span>
              </legend>

              <div className="mb-4">
                <label htmlFor="booking-occasion" className="text-xs font-medium text-slate-300 block mb-1.5">
                  Select Occasion <span className="text-red-400" aria-hidden="true">*</span>
                </label>
                <select
                  id="booking-occasion"
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none"
                >
                  {OCCASIONS.map((occ) => (
                    <option key={occ.id} value={occ.title}>
                      {occ.title}
                    </option>
                  ))}
                  <option value="Casual Movie Binge / Date">Casual Movie Binge / Date</option>
                  <option value="Other Private Gathering">Other Private Gathering</option>
                </select>
              </div>

              <div>
                <div className="text-xs font-medium text-slate-300 block mb-2">
                  Select Add-ons (Optional):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                  {ADDONS.map((addon) => {
                    const isSelected = !!selectedAddonIds[addon.id];
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        role="checkbox"
                        aria-checked={isSelected}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-2.5 rounded-lg border text-left transition-colors flex items-center justify-between gap-2 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                          isSelected
                            ? "bg-slate-800 border-red-500/80 text-white"
                            : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-850"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "bg-brand-red border-brand-red text-white"
                                : "border-slate-600 bg-slate-900"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" aria-hidden="true" />}
                          </div>
                          <span className="text-xs font-medium truncate">{addon.name}</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-200 shrink-0">
                          +₹{addon.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </fieldset>

            {/* Step 4: Contact Information */}
            <fieldset className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <legend className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-300 px-1 mb-4">
                <ShieldCheck className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>Step 4: Contact &amp; Guest Details</span>
              </legend>

              <div className="space-y-4">
                <div>
                  <label htmlFor="customer-name" className="text-xs font-medium text-slate-300 block mb-1.5">
                    Full Name <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    aria-required="true"
                    placeholder="e.g. Rahul Patil"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none placeholder:text-slate-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="customer-phone" className="text-xs font-medium text-slate-300 block mb-1.5">
                      Mobile / WhatsApp Number <span className="text-red-400" aria-hidden="true">*</span>
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
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none placeholder:text-slate-500"
                    />
                    <div id="phone-help" className="text-[11px] text-slate-400 mt-1">
                      We send your slot confirmation directly on WhatsApp.
                    </div>
                  </div>

                  <div>
                    <label htmlFor="customer-email" className="text-xs font-medium text-slate-300 block mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      id="customer-email"
                      type="email"
                      placeholder="rahul@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="special-requests" className="text-xs font-medium text-slate-300 block mb-1.5">
                    Special Requests / Personal Video / Name on Screen
                  </label>
                  <textarea
                    id="special-requests"
                    rows={2}
                    placeholder="e.g. 'Playing surprise video clip at 7 PM', 'Name on backdrop: Sneha'"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              {submitError && (
                <div role="alert" className="mt-4 p-3 rounded-lg bg-red-950/80 border border-red-800 flex items-center gap-2 text-xs text-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" aria-hidden="true" />
                  <span>{submitError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full py-3.5 rounded-lg font-semibold text-sm text-white bg-brand-red hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                {isSubmitting ? (
                  <span>Saving Booking to Google Sheets...</span>
                ) : (
                  <>
                    <span>Confirm &amp; Lock Slot (Advance Token ₹{advancePayable})</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </fieldset>
          </form>

          {/* Order Summary (5 Columns) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-amber-400">
                    Booking Overview
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    House of OTT (Ravet)
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  3 Hours Private
                </span>
              </div>

              {/* Specs */}
              <div className="space-y-2 text-xs text-slate-300 pb-4 border-b border-slate-800 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Theater Room:</span>
                  <span className="font-semibold text-white">{currentTheater.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date:</span>
                  <span className="font-semibold text-white">{eventDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Slot Time:</span>
                  <span className="font-semibold text-amber-400">{currentSlot.timeRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Guests:</span>
                  <span className="font-semibold text-white">{guestCount} People</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Occasion:</span>
                  <span className="font-semibold text-white">{selectedOccasion}</span>
                </div>
              </div>

              {/* Line items */}
              <div className="space-y-2 text-xs mb-5">
                <div className="flex justify-between text-slate-300">
                  <span>Base Rent (3 hrs, {currentTheater.baseCapacity} pax)</span>
                  <span className="font-semibold text-white">₹{basePrice}</span>
                </div>

                {extraGuestsCount > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>
                      {extraGuestsCount} Extra Guest{extraGuestsCount > 1 ? "s" : ""}
                    </span>
                    <span className="font-semibold text-white">₹{extraGuestsPrice}</span>
                  </div>
                )}

                {addonsList.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <div className="text-xs font-semibold text-slate-400">Add-ons:</div>
                    {addonsList.map((a) => (
                      <div key={a.id} className="flex justify-between text-slate-300 pl-2">
                        <span className="truncate pr-2">• {a.name}</span>
                        <span className="font-semibold text-white shrink-0">₹{a.price * a.quantity}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Total Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-4">
                <div className="flex items-baseline justify-between mb-0.5">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Total Event Cost</span>
                  <span className="text-2xl font-bold text-white">
                    ₹{totalPrice}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Zero convenience fees. All taxes included.
                </div>
              </div>

              {/* Advance Pay Highlight */}
              <div className="p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-xs mb-3">
                <div className="flex items-center justify-between font-semibold text-emerald-300 mb-0.5">
                  <span>Advance Token:</span>
                  <span className="text-sm">₹{advancePayable}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Pay Balance at Ravet venue:</span>
                  <span>₹{balanceAtVenue}</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" aria-hidden="true" />
                <span>Sector 29, Prime Ville, Ravet, Pune 412101</span>
              </div>
            </div>

            {/* Assistance card */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span className="text-slate-300">Need instant date check?</span>
              </div>
              <a
                href="tel:+919168530789"
                className="font-bold text-white hover:underline focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none rounded px-1"
              >
                +91 91685 30789
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal (Accessible Dialog WCAG 4.1.2) */}
      {bookingSuccess && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="booking-success-title"
          aria-describedby="booking-success-desc"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-6 sm:p-8 shadow-2xl relative text-left">
            <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center mb-4 text-emerald-400">
              <CheckCircle className="w-6 h-6" aria-hidden="true" />
            </div>

            <div className="text-xs font-semibold uppercase tracking-wide text-amber-400 mb-1">
              Reservation Logged
            </div>

            <h3 id="booking-success-title" className="text-xl font-bold text-white mb-2">
              Slot Reserved: {bookingSuccess.bookingId}
            </h3>

            <p id="booking-success-desc" className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
              Thank you, <strong className="text-white">{bookingSuccess.customerName}</strong>. 
              Your booking has been saved directly to our Google Sheet and sent to our team in Ravet.
            </p>

            {/* Summary Details */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs mb-5">
              <div className="flex justify-between">
                <span className="text-slate-400">Theater:</span>
                <span className="font-semibold text-white">{bookingSuccess.theaterName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date &amp; Slot:</span>
                <span className="font-semibold text-amber-400">
                  {bookingSuccess.eventDate} ({bookingSuccess.slotTime})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Guests:</span>
                <span className="font-semibold text-white">{bookingSuccess.guestCount} People</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total / Advance:</span>
                <span className="font-semibold text-white">
                  ₹{bookingSuccess.totalPrice} / ₹{bookingSuccess.advancePayable} token
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5">
              <a
                href={
                  whatsAppDirectUrl ||
                  `https://wa.me/919168530789?text=Hi%20House%20of%20OTT%20Ravet!%20I%20just%20reserved%20Booking%20ID%20${bookingSuccess.bookingId}%20for%20${bookingSuccess.eventDate}.%20Please%20confirm!`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-lg font-semibold text-xs tracking-wide text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Send Confirmation on WhatsApp</span>
              </a>

              <a
                href="https://share.google/6g19LyHLut3CkEDbk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg font-medium text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
              >
                <MapPin className="w-3.5 h-3.5 text-red-400" aria-hidden="true" />
                <span>Open Ravet Location on Google Maps</span>
              </a>

              <button
                type="button"
                onClick={() => setBookingSuccess(null)}
                className="w-full py-2 text-center text-xs text-slate-400 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded"
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

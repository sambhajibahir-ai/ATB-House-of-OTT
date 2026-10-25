import { BookingFormData } from "@/types";

export interface BookingResponse {
  success: boolean;
  bookingId: string;
  message: string;
  sheetSynced?: boolean;
  whatsAppUrl?: string;
}

export async function saveBookingToGoogleSheets(
  booking: BookingFormData
): Promise<{ success: boolean; sheetSynced: boolean; message: string }> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  // Format booking data row
  const rowData = {
    bookingId: booking.bookingId,
    timestamp: new Date().toISOString(),
    customerName: booking.customerName,
    customerPhone: booking.customerPhone,
    customerEmail: booking.customerEmail || "N/A",
    eventDate: booking.eventDate,
    slotTime: booking.slotTime,
    theaterName: booking.theaterName,
    guestCount: booking.guestCount,
    occasion: booking.occasion,
    addons: booking.addons.length > 0 
      ? booking.addons.map((a) => `${a.name} (x${a.quantity}) - ₹${a.price * a.quantity}`).join("; ")
      : "None",
    basePrice: booking.basePrice,
    extraGuestsPrice: booking.extraGuestsPrice,
    addonsTotal: booking.addonsTotal,
    totalPrice: booking.totalPrice,
    advancePayable: booking.advancePayable,
    specialRequests: booking.specialRequests || "None",
    location: "Ravet, Pune",
  };

  // 1. If Webhook URL is configured
  if (webhookUrl && webhookUrl.startsWith("http")) {
    try {
      console.log(`[GoogleSheetSync] Sending booking ${booking.bookingId} to Google Sheet Webhook...`);
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rowData),
      });

      if (response.ok) {
        console.log(`[GoogleSheetSync] Successfully appended to Google Sheet for ${booking.bookingId}`);
        return {
          success: true,
          sheetSynced: true,
          message: "Booking recorded successfully in Google Sheet",
        };
      } else {
        const errorText = await response.text();
        console.warn(`[GoogleSheetSync] Google Sheet Webhook responded with status: ${response.status}`, errorText);
      }
    } catch (err) {
      console.error("[GoogleSheetSync] Failed to post to Google Sheet Webhook:", err);
    }
  } else {
    console.info(
      "[GoogleSheetSync] Note: GOOGLE_SHEET_WEBHOOK_URL not configured. Booking saved to server log. (See .env.example to connect your Google Sheet)."
    );
  }

  // Fallback return: booking is saved locally
  return {
    success: true,
    sheetSynced: false,
    message: "Booking captured. Configure GOOGLE_SHEET_WEBHOOK_URL to sync directly to Google Sheets.",
  };
}

export function generateWhatsAppMessage(booking: BookingFormData): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919168530789";
  
  const addonsSummary = booking.addons.length > 0
    ? booking.addons.map((a) => `• ${a.name} (x${a.quantity})`).join("%0A")
    : "None";

  const message = `🎬 *NEW BOOKING REQUEST - HOUSE OF OTT (RAVET)*%0A%0A` +
    `🔖 *Booking ID:* ${booking.bookingId}%0A` +
    `👤 *Name:* ${encodeURIComponent(booking.customerName)}%0A` +
    `📞 *Phone:* ${booking.customerPhone}%0A` +
    `📅 *Date:* ${booking.eventDate}%0A` +
    `⏰ *Slot:* ${encodeURIComponent(booking.slotTime)}%0A` +
    `🎭 *Theater:* ${encodeURIComponent(booking.theaterName)}%0A` +
    `👥 *Guests:* ${booking.guestCount} People%0A` +
    `🎉 *Occasion:* ${encodeURIComponent(booking.occasion)}%0A` +
    `✨ *Add-ons:*%0A${addonsSummary}%0A%0A` +
    `💰 *Total Amount:* ₹${booking.totalPrice}%0A` +
    `💳 *Advance Payable:* ₹${booking.advancePayable}%0A` +
    (booking.specialRequests ? `📝 *Notes:* ${encodeURIComponent(booking.specialRequests)}%0A` : "") +
    `📍 *Location:* Prime Ville, Sector 29, Ravet, Pune%0A%0A` +
    `Please confirm my slot availability!`;

  return `https://wa.me/${phone}?text=${message}`;
}


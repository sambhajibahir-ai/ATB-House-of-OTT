import { NextRequest, NextResponse } from "next/server";
import { BookingFormData } from "@/types";
import { saveBookingToGoogleSheets, generateWhatsAppMessage } from "@/lib/google-sheets";

export async function POST(req: NextRequest) {
  try {
    const body: BookingFormData = await req.json();

    // Basic Validation
    if (!body.customerName || !body.customerPhone || !body.eventDate || !body.theaterId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required booking details (Name, Phone, Date, Theater).",
        },
        { status: 400 }
      );
    }

    // Ensure Booking ID exists
    const bookingId = body.bookingId || "HOT-" + Math.floor(100000 + Math.random() * 900000);
    const completeBooking: BookingFormData = {
      ...body,
      bookingId,
      createdAt: body.createdAt || new Date().toISOString(),
      location: "Ravet, Pune",
    };

    // 1. Sync to Google Sheet via Webhook / API
    const sheetResult = await saveBookingToGoogleSheets(completeBooking);

    // 2. Generate Direct WhatsApp Confirmation URL
    const whatsAppUrl = generateWhatsAppMessage(completeBooking);

    return NextResponse.json(
      {
        success: true,
        bookingId: completeBooking.bookingId,
        sheetSynced: sheetResult.sheetSynced,
        whatsAppUrl,
        message: "Booking recorded successfully!",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[API/Booking] Error processing booking:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to record booking. Please connect via WhatsApp directly.",
        error: error?.message || "Unknown server error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "online",
    service: "House of OTT Booking API",
    location: "Ravet, Pune",
    googleSheetsIntegration: process.env.GOOGLE_SHEET_WEBHOOK_URL ? "Configured" : "Pending Webhook URL",
  });
}

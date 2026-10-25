/**
 * ===================================================================
 * HOUSE OF OTT - GOOGLE SHEETS AUTOMATIC BOOKING INTEGRATION
 * ===================================================================
 * 
 * Instructions to set up:
 * 1. Open Google Sheets (https://sheets.google.com) and create a new sheet: "House of OTT - Bookings".
 * 2. In Google Sheets menu, click: Extensions > Apps Script.
 * 3. Delete any default code in Code.gs, paste this ENTIRE file into it.
 * 4. Click the "Save" icon (Floppy disk).
 * 5. Click "Deploy" > "New deployment".
 *    - Click the gear icon next to "Select type" and choose "Web app".
 *    - Description: "House of OTT Booking Sync"
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone" (Required so your Vercel website can submit bookings)
 * 6. Click "Deploy". Authorize permissions if prompted.
 * 7. Copy the "Web App URL" (starts with https://script.google.com/macros/s/.../exec).
 * 8. Add this URL to your Vercel Environment Variables or .env.local:
 *    GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/.../exec"
 * 
 * That's it! Every new booking will automatically create beautifully formatted rows!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "Booking ID",
        "Customer Name",
        "Phone / WhatsApp",
        "Email",
        "Event Date",
        "Slot Time",
        "Theater Room",
        "Guests",
        "Occasion",
        "Add-ons Selected",
        "Base Price (₹)",
        "Extra Guest Fee (₹)",
        "Add-ons Total (₹)",
        "Total Amount (₹)",
        "Advance Token (₹)",
        "Special Requests",
        "Location",
        "Status"
      ];
      sheet.appendRow(headers);
      
      // Style headers
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#E50914");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    var data = JSON.parse(e.postData.contents);

    var newRow = [
      data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.bookingId || "HOT-" + Math.floor(100000 + Math.random() * 900000),
      data.customerName || "",
      data.customerPhone || "",
      data.customerEmail || "",
      data.eventDate || "",
      data.slotTime || "",
      data.theaterName || "",
      data.guestCount || 1,
      data.occasion || "",
      data.addons || "None",
      data.basePrice || 0,
      data.extraGuestsPrice || 0,
      data.addonsTotal || 0,
      data.totalPrice || 0,
      data.advancePayable || 750,
      data.specialRequests || "",
      data.location || "Ravet, Pune",
      "Pending Confirmation"
    ];

    sheet.appendRow(newRow);

    // Auto-resize columns for readability
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    var rowRange = sheet.getRange(lastRow, 1, 1, lastCol);
    if (lastRow % 2 === 0) {
      rowRange.setBackground("#F9FAFB");
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", row: lastRow, bookingId: data.bookingId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "active", message: "House of OTT Google Sheet Webhook is active and ready." }))
    .setMimeType(ContentService.MimeType.JSON);
}

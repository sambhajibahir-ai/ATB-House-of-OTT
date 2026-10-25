# 🎬 House of OTT — Pune's Premier Private Theater & Celebration Lounge

> **Your Private Cinema. Your Ultimate Celebration.**  
> Hyper-localized luxury private screening lounge located in **Ravet, Pune**.

---

## 🌟 Overview & Competitive Superiority

**House of OTT** is built as an ultra-modern, lightning-fast competitor to *The Binge Town*, engineered specifically to dominate the local private cinema and celebration market in **Ravet, Pimpri-Chinchwad (PCMC), Wakad, Hinjawadi, and Pune**.

### 🚀 Key Advantages Over The Binge Town:
1. **Advanced Local SEO & Schema Architecture**:
   - Built-in `EntertainmentBusiness` & `LocalBusiness` JSON-LD with exact Ravet coordinates, address, and Google Maps link.
   - Built-in `FAQPage` schema enabling Google SERP rich snippet accordions.
   - Dynamic `sitemap.xml` and `robots.txt` generated automatically by Next.js App Router.
   - 100% Core Web Vitals optimized, zero layout shift (CLS), mobile-first responsive design.
2. **Interactive 6-Step Booking Wizard**:
   - Live date selection, 3-hour slot selector (including Sunset Prime and Midnight Starlight), real-time pricing calculation with transparent add-ons and guest surcharges.
3. **Google Sheets Automated Storage**:
   - Every booking inquiry automatically appends directly to a Google Sheet via serverless webhook (`/api/booking`).
   - Zero database hosting fees; spreadsheets can be accessed and shared across venue staff instantly.
4. **Dual Lead Capture with WhatsApp Redirection**:
   - After submitting a booking, customers get an instant **1-Click WhatsApp confirmation** button pre-filled with the exact booking summary and Booking ID.
5. **Ultra-Cinematic OTT Streaming Aesthetic**:
   - High-contrast dark theater UI, neon glowing borders, smooth glassmorphism, responsive video & image galleries.

---

## 📍 Venue Location & Contact Details

* **Address:** S.No. 215, Prime Ville, Plot No. 4 (Next to OYO Hotel), Sector No. 29, Ravet, Pune, Maharashtra — 412101
* **Google Maps Link:** [https://share.google/6g19LyHLut3CkEDbk](https://share.google/6g19LyHLut3CkEDbk)
* **Phone / WhatsApp:** +91 91685 30789
* **Operating Hours:** 10:00 AM – 03:00 AM (7 Days a Week)

---

## 🎭 Theaters & Pricing

| Theater Room | Capacity | Screen & Audio | Base Price (3 hrs) | Extra Person |
| :--- | :--- | :--- | :--- | :--- |
| **The Red Carpet Suite** | 2 – 4 Guests | 150" 4K Laser • 600W Dolby 5.1 | ₹1,499 | +₹350 / person |
| **The Blockbuster Arena** | 5 – 10 Guests | 180" 4K Wide • 1000W Dolby Atmos 7.1 | ₹2,499 | +₹300 / person |
| **The Royal OTT Lounge** | 8 – 20 Guests | 200" 4K IMAX • 1200W Dolby + Karaoke | ₹3,999 | +₹250 / person |

*Advance Booking Token to lock a slot:* **₹750** (Balance payable at the venue upon arrival).

---

## 📊 Google Sheets Setup (Step-by-Step)

The project includes an automatic webhook script located in `scripts/google-sheet-script.js`.

### Steps to connect:
1. Open [Google Sheets](https://sheets.google.com) and create a new spreadsheet: `House of OTT - Bookings`.
2. In Google Sheets top menu, click **Extensions** > **Apps Script**.
3. Delete any default code inside `Code.gs` and paste the contents of `scripts/google-sheet-script.js`.
4. Click the **Save** button.
5. Click **Deploy** > **New deployment**:
   - Click the gear icon next to *Select type* and choose **Web app**.
   - Description: `House of OTT Booking Sync`
   - Execute as: `Me (your email)`
   - Who has access: `Anyone` *(Crucial so the Vercel serverless function can submit bookings)*
6. Click **Deploy** and copy the **Web app URL** (`https://script.google.com/macros/s/.../exec`).
7. Paste this URL into your environment variable:
   ```env
   GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
   ```

---

## ☁️ Deploying to Vercel

1. Push this repository to your GitHub / GitLab account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of House of OTT website"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `atb-house-of-ott` repository.
4. Under **Environment Variables**, add:
   - `GOOGLE_SHEET_WEBHOOK_URL`: Your Google Apps Script Web App URL.
   - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.vercel.app`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: `919168530789`
5. Click **Deploy**. Your website will be live worldwide in under 60 seconds!

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
# http://localhost:3000

# 4. Production build test
npm run build
```

---

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router, Server Components & Serverless API Routes)
- **Styling:** Tailwind CSS with custom neon OTT theme & glassmorphism
- **Language:** TypeScript
- **Icons:** Lucide React
- **Structured Data:** Schema.org JSON-LD (LocalBusiness, EntertainmentBusiness, FAQPage)
- **Data Storage:** Google Sheets API / Webhook Integration + WhatsApp Instant Connect

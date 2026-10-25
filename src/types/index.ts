export interface TheaterRoom {
  id: string;
  name: string;
  tagline: string;
  screenSize: string;
  audioSpec: string;
  capacityText: string;
  baseCapacity: number;
  maxCapacity: number;
  basePrice: number; // for 3 hours
  extraPersonPrice: number;
  badge?: string;
  popular?: boolean;
  image: string;
  gallery: string[];
  features: string[];
  bestFor: string[];
}

export interface Occasion {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  highlights: string[];
  icon: string;
}

export interface AddonItem {
  id: string;
  category: "cake" | "effect" | "decor" | "photo" | "food";
  name: string;
  price: number;
  unit?: string;
  description: string;
  image?: string;
  popular?: boolean;
}

export interface TimeSlot {
  id: string;
  timeRange: string;
  label: string;
  badge?: string;
  isPopular?: boolean;
}

export interface BookingFormData {
  bookingId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  eventDate: string;
  theaterId: string;
  theaterName: string;
  slotId: string;
  slotTime: string;
  guestCount: number;
  occasion: string;
  addons: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  specialRequests?: string;
  basePrice: number;
  extraGuestsPrice: number;
  addonsTotal: number;
  totalPrice: number;
  advancePayable: number;
  createdAt: string;
  location: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  occasion: string;
  rating: number;
  date: string;
  comment: string;
  theaterName: string;
  verified: boolean;
}


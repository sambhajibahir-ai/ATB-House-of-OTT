import { TimeSlot } from "@/types";

export const TIME_SLOTS: TimeSlot[] = [
  {
    id: "slot-morning",
    timeRange: "10:00 AM - 01:00 PM",
    label: "Morning Matinee",
    badge: "Cozy & Quiet"
  },
  {
    id: "slot-afternoon",
    timeRange: "01:30 PM - 04:30 PM",
    label: "Afternoon Chill",
    badge: "Budget Friendly"
  },
  {
    id: "slot-evening",
    timeRange: "05:00 PM - 08:00 PM",
    label: "Sunset Prime",
    badge: "High Demand",
    isPopular: true
  },
  {
    id: "slot-night",
    timeRange: "08:30 PM - 11:30 PM",
    label: "Night Blockbuster",
    badge: "Most Popular",
    isPopular: true
  },
  {
    id: "slot-midnight",
    timeRange: "12:00 AM - 03:00 AM",
    label: "Midnight Starlight",
    badge: "Late Night Special",
    isPopular: true
  }
];

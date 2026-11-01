"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UITheme = "gold" | "crimson" | "azure";

interface ThemeConfig {
  id: UITheme;
  name: string;
  subtitle: string;
  badge: string;
  icon: string;
  bgClass: string;
  surfaceClass: string;
  borderClass: string;
  accentText: string;
  accentBg: string;
  accentHover: string;
  accentBorder: string;
  buttonClass: string;
  glowClass: string;
}

export const THEME_CONFIGS: Record<UITheme, ThemeConfig> = {
  gold: {
    id: "gold",
    name: "Midnight Gold",
    subtitle: "VIP Private Screening Club",
    badge: "Version 1 • Luxury Velvet",
    icon: "👑",
    bgClass: "bg-[#07080B]",
    surfaceClass: "bg-[#111319]",
    borderClass: "border-[#2A2418]",
    accentText: "text-[#E5A93C]",
    accentBg: "bg-[#E5A93C]",
    accentHover: "hover:bg-[#D4982A]",
    accentBorder: "border-[#E5A93C]/40",
    buttonClass: "bg-gradient-to-r from-[#F59E0B] via-[#E5A93C] to-[#D97706] text-slate-950 font-bold hover:brightness-110 shadow-lg shadow-amber-900/30",
    glowClass: "shadow-[0_0_35px_rgba(229,169,60,0.15)]",
  },
  crimson: {
    id: "crimson",
    name: "Premiere Crimson",
    subtitle: "High-Energy OTT Celebration",
    badge: "Version 2 • OTT Premiere",
    icon: "🎬",
    bgClass: "bg-[#08090C]",
    surfaceClass: "bg-[#121520]",
    borderClass: "border-[#2D1B22]",
    accentText: "text-[#FF3B56]",
    accentBg: "bg-[#E50914]",
    accentHover: "hover:bg-[#CC0812]",
    accentBorder: "border-[#FF3B56]/40",
    buttonClass: "bg-gradient-to-r from-[#E50914] via-[#FF2A4D] to-[#B8000A] text-white font-bold hover:brightness-110 shadow-lg shadow-red-900/40",
    glowClass: "shadow-[0_0_35px_rgba(229,9,20,0.22)]",
  },
  azure: {
    id: "azure",
    name: "Obsidian Azure",
    subtitle: "Minimalist IMAX & Cyber Stealth",
    badge: "Version 3 • IMAX Minimalist",
    icon: "⚡",
    bgClass: "bg-[#080A10]",
    surfaceClass: "bg-[#0E1320]",
    borderClass: "border-[#1A263D]",
    accentText: "text-[#00D2FF]",
    accentBg: "bg-[#00D2FF]",
    accentHover: "hover:bg-[#00B4DB]",
    accentBorder: "border-[#00D2FF]/40",
    buttonClass: "bg-gradient-to-r from-[#00D2FF] via-[#38BDF8] to-[#2563EB] text-slate-950 font-bold hover:brightness-110 shadow-lg shadow-cyan-900/40",
    glowClass: "shadow-[0_0_35px_rgba(0,210,255,0.18)]",
  },
};

interface ThemeContextType {
  theme: UITheme;
  setTheme: (t: UITheme) => void;
  config: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "gold",
  setTheme: () => {},
  config: THEME_CONFIGS.gold,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<UITheme>("gold");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("house_of_ott_ui_theme") as UITheme;
      if (saved && THEME_CONFIGS[saved]) {
        setThemeState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setTheme = (t: UITheme) => {
    setThemeState(t);
    try {
      localStorage.setItem("house_of_ott_ui_theme", t);
    } catch {
      // ignore
    }
  };

  const config = THEME_CONFIGS[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, config }}>
      <div data-theme={theme} className={config.bgClass}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

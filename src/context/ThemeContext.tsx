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
  cardShadow: string;
  cardHoverShadow: string;
}

export const THEME_CONFIGS: Record<UITheme, ThemeConfig> = {
  gold: {
    id: "gold",
    name: "Midnight Gold",
    subtitle: "VIP Private Screening Club",
    badge: "Version 1 • Velvet Gold",
    icon: "👑",
    bgClass: "bg-[#06070A]",
    surfaceClass: "bg-[#0E111C]",
    borderClass: "border-amber-500/20",
    accentText: "text-amber-400",
    accentBg: "bg-amber-500",
    accentHover: "hover:bg-amber-400",
    accentBorder: "border-amber-500/40",
    buttonClass: "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-bold hover:brightness-110 shadow-lg shadow-amber-950/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]",
    glowClass: "shadow-[0_0_40px_rgba(245,158,11,0.18)]",
    cardShadow: "shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8),0_0_1px_1px_rgba(255,255,255,0.06)]",
    cardHoverShadow: "hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.22)]",
  },
  crimson: {
    id: "crimson",
    name: "Premiere Crimson",
    subtitle: "High-Energy Cinema Romance",
    badge: "Version 2 • OTT Crimson",
    icon: "🎬",
    bgClass: "bg-[#07080D]",
    surfaceClass: "bg-[#121220]",
    borderClass: "border-rose-500/20",
    accentText: "text-rose-400",
    accentBg: "bg-rose-500",
    accentHover: "hover:bg-rose-400",
    accentBorder: "border-rose-500/40",
    buttonClass: "bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 text-white font-bold hover:brightness-110 shadow-lg shadow-rose-950/50 hover:shadow-[0_0_25px_rgba(225,29,72,0.45)]",
    glowClass: "shadow-[0_0_40px_rgba(225,29,72,0.2)]",
    cardShadow: "shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8),0_0_1px_1px_rgba(255,255,255,0.06)]",
    cardHoverShadow: "hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.9),0_0_30px_rgba(225,29,72,0.25)]",
  },
  azure: {
    id: "azure",
    name: "Obsidian Azure",
    subtitle: "IMAX Minimalist & Cyber Vibe",
    badge: "Version 3 • Cyber Azure",
    icon: "⚡",
    bgClass: "bg-[#05070D]",
    surfaceClass: "bg-[#0B101D]",
    borderClass: "border-cyan-500/20",
    accentText: "text-cyan-400",
    accentBg: "bg-cyan-500",
    accentHover: "hover:bg-cyan-400",
    accentBorder: "border-cyan-500/40",
    buttonClass: "bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 text-slate-950 font-bold hover:brightness-110 shadow-lg shadow-cyan-950/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]",
    glowClass: "shadow-[0_0_40px_rgba(6,182,212,0.18)]",
    cardShadow: "shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8),0_0_1px_1px_rgba(255,255,255,0.06)]",
    cardHoverShadow: "hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.9),0_0_30px_rgba(6,182,212,0.22)]",
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

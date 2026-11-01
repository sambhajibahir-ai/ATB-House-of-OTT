"use client";

import React, { useState } from "react";
import { useTheme, THEME_CONFIGS, UITheme } from "@/context/ThemeContext";
import { Sparkles, Palette, Check, ChevronDown, Eye } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeList: UITheme[] = ["gold", "crimson", "azure"];

  return (
    <aside 
      aria-label="UI Version & Theme Switcher"
      className="sticky top-0 z-50 w-full bg-[#050608]/95 backdrop-blur-md border-b border-white/10 text-xs py-2 px-3 sm:px-6 transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Indicator */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-white font-semibold">
            <Palette className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span className="hidden md:inline">Live UI Switcher:</span>
            <span>3 Dark Themes</span>
          </span>
          <span className="text-gray-400 text-[11px] hidden lg:inline">
            Toggle below to test each aesthetic with your Ravet data:
          </span>
        </div>

        {/* Right: Theme Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full sm:w-auto justify-center sm:justify-end pb-1 sm:pb-0">
          {themeList.map((tKey) => {
            const t = THEME_CONFIGS[tKey];
            const isSelected = theme === tKey;
            return (
              <button
                key={tKey}
                onClick={() => setTheme(tKey)}
                aria-pressed={isSelected}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                  isSelected
                    ? "bg-white/15 text-white border border-white/30 shadow-md ring-1 ring-white/20"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                <span>{t.icon}</span>
                <span className="font-semibold">{t.name}</span>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-emerald-400 ml-0.5" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

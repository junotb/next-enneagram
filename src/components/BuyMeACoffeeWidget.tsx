/* eslint-disable @next/next/no-img-element */
"use client";

import { useEnneagramTheme } from "@/contexts/EnneagramThemeContext";

function toHex6(hex: string): string {
  const cleaned = hex.startsWith("#") ? hex.slice(1) : hex;
  return cleaned.slice(0, 6);
}

export default function BuyMeACoffeeWidget() {
  const { colors } = useEnneagramTheme();
  const BMC_TEXT = "Buy me a coffee";
  const BMC_EMOJI = "";
  const BMC_SLUG = "junotb";
  const BMC_BUTTON_COLOR = toHex6(colors.primary);
  const BMC_FONT_COLOR = "ffffff";
  const BMC_FONT_FAMILY = "Lato";
  const BMC_OUTLINE_COLOR = toHex6(colors.secondary);
  const BMC_COFFEE_COLOR = "ffffff";
  const BMC_BUTTON_URL = `https://img.buymeacoffee.com/button-api/?text=${encodeURIComponent(BMC_TEXT)}&emoji=${encodeURIComponent(BMC_EMOJI)}&slug=${BMC_SLUG}&button_colour=${BMC_BUTTON_COLOR}&font_colour=${BMC_FONT_COLOR}&font_family=${BMC_FONT_FAMILY}&outline_colour=${BMC_OUTLINE_COLOR}&coffee_colour=${BMC_COFFEE_COLOR}`;

  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-sm text-theme-text-muted">검사 결과가 도움이 되셨다면, Buy Me a Coffee로 응원해 주세요!</p>
      <a
        href="https://www.buymeacoffee.com/junotb"
        target="_blank"
        className="flex justify-center w-full h-12"
        rel="noopener noreferrer"
      >
        <img
          src={BMC_BUTTON_URL}
          alt="Buy Me a Coffee"
          width={200}
          height={48}
          className="w-50 h-12 object-contain transition-[filter] duration-500 ease-out"
          style={{ filter: "grayscale(var(--img-grayscale, 0))" }}
        />
      </a>
    </div>
  );
}
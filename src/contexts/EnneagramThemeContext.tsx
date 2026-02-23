"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import themeData from "@/data/enneagram-themes.json";
import { THEME_STORAGE_KEY } from "@/constants/storage-keys";

type ThemeMode = "light" | "dark";

interface ThemeColors {
  primary: string;
  secondary: string;
  gradientStart: string;
  gradientEnd: string;
}

interface EnneagramThemeContextValue {
  type: number | null;
  setType: (type: number | null) => void;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  applyTheme: (type: number | null) => void;
  animateToMonochrome: (onComplete?: () => void) => void;
  colors: ThemeColors;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

function lerpColor(from: string, to: string, t: number): string {
  const c1 = hexToRgb(from);
  const c2 = hexToRgb(to);
  if (!c1 || !c2) return to;
  return rgbToHex(
    c1.r + (c2.r - c1.r) * t,
    c1.g + (c2.g - c1.g) * t,
    c1.b + (c2.b - c1.b) * t
  );
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const EnneagramThemeContext =
  createContext<EnneagramThemeContextValue | null>(null);

interface ThemeShade {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  gradient: string[];
}

function getThemeByType(type: number | null): {
  light: ThemeShade;
  dark: ThemeShade;
} {
  if (!type) {
    return themeData.default.theme as { light: ThemeShade; dark: ThemeShade };
  }
  const typeData = themeData.types.find(
    (t: { type_num: number }) => t.type_num === type
  );
  return typeData
    ? (typeData.theme as { light: ThemeShade; dark: ThemeShade })
    : (themeData.default.theme as { light: ThemeShade; dark: ThemeShade });
}

function injectCSSVariables(theme: ThemeShade, grayscale: number) {
  const root = document.documentElement;
  root.style.setProperty("--theme-primary", theme.primary);
  root.style.setProperty("--theme-secondary", theme.secondary);
  root.style.setProperty("--theme-background", theme.background);
  root.style.setProperty("--theme-surface", theme.surface);
  root.style.setProperty("--theme-text", theme.text);
  root.style.setProperty("--theme-text-muted", theme.textMuted);
  root.style.setProperty("--img-grayscale", String(grayscale));
  const gradientStr =
    theme.gradient?.length >= 2
      ? `linear-gradient(135deg, ${theme.gradient[0]}, ${theme.gradient[1]})`
      : "linear-gradient(135deg, #9CA3AF, #6B7280)";
  root.style.setProperty("--theme-gradient", gradientStr);
}

function injectLerpedCSSVariables(
  from: ThemeShade,
  to: ThemeShade,
  t: number
) {
  const eased = easeOutCubic(t);
  const root = document.documentElement;
  root.style.setProperty(
    "--theme-primary",
    lerpColor(from.primary, to.primary, eased)
  );
  root.style.setProperty(
    "--theme-secondary",
    lerpColor(from.secondary, to.secondary, eased)
  );
  root.style.setProperty(
    "--theme-background",
    lerpColor(from.background, to.background, eased)
  );
  root.style.setProperty(
    "--theme-surface",
    lerpColor(from.surface, to.surface, eased)
  );
  root.style.setProperty(
    "--theme-text",
    lerpColor(from.text, to.text, eased)
  );
  root.style.setProperty(
    "--theme-text-muted",
    lerpColor(from.textMuted, to.textMuted, eased)
  );
  const gradFrom0 = from.gradient?.[0] ?? "#9CA3AF";
  const gradFrom1 = from.gradient?.[1] ?? "#6B7280";
  const gradTo0 = to.gradient?.[0] ?? "#9CA3AF";
  const gradTo1 = to.gradient?.[1] ?? "#6B7280";
  const gradientStr = `linear-gradient(135deg, ${lerpColor(gradFrom0, gradTo0, eased)}, ${lerpColor(gradFrom1, gradTo1, eased)})`;
  root.style.setProperty("--theme-gradient", gradientStr);
  root.style.setProperty("--img-grayscale", String(eased));
}

function getThemeColors(type: number | null, mode: ThemeMode): ThemeColors {
  const themeObj = getThemeByType(type);
  const theme = themeObj[mode] ?? themeObj.light;
  const [gradientStart = "#9CA3AF", gradientEnd = "#6B7280"] =
    theme.gradient ?? [];
  return {
    primary: theme.primary,
    secondary: theme.secondary,
    gradientStart,
    gradientEnd,
  };
}

export function EnneagramThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [type, setTypeState] = useState<number | null>(null);
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);
  const colors = getThemeColors(type, mode);

  const applyTheme = useCallback((targetType: number | null) => {
    const themeObj = getThemeByType(targetType);
    const theme = themeObj[mode] ?? themeObj.light;
    const grayscale = targetType === null ? 1 : 0;
    injectCSSVariables(theme, grayscale);
  }, [mode]);

  const setType = useCallback((newType: number | null) => {
    setTypeState(newType);
    if (typeof window !== "undefined") {
      if (newType === null) {
        localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        localStorage.setItem(THEME_STORAGE_KEY, String(newType));
      }
    }
  }, []);

  const animateToMonochrome = useCallback(
    (onComplete?: () => void) => {
      if (type === null) {
        onComplete?.();
        return;
      }
      const fromTheme = getThemeByType(type);
      const toTheme = getThemeByType(null);
      const from = fromTheme[mode] ?? fromTheme.light;
      const to = toTheme[mode] ?? toTheme.light;
      const durationMs = 500;
      const start = performance.now();
      let frameId: number;

      const tick = () => {
        const elapsed = performance.now() - start;
        const t = Math.min(elapsed / durationMs, 1);
        injectLerpedCSSVariables(from, to, t);
        if (t < 1) {
          frameId = requestAnimationFrame(tick);
        } else {
          setType(null);
          onComplete?.();
        }
      };
      frameId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frameId);
    },
    [type, mode, setType]
  );

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      const storedType = parseInt(stored, 10);
      if (storedType >= 1 && storedType <= 9) {
        setTypeState(storedType);
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(type);
  }, [type, mode, mounted, applyTheme]);

  useEffect(() => {
    if (!mounted) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setMode(mq.matches ? "dark" : "light");

    const handler = (e: MediaQueryListEvent) => {
      setMode(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mounted]);

  return (
    <EnneagramThemeContext.Provider
      value={{ type, setType, mode, setMode, applyTheme, animateToMonochrome, colors }}
    >
      {children}
    </EnneagramThemeContext.Provider>
  );
}

export function useEnneagramTheme() {
  const ctx = useContext(EnneagramThemeContext);
  if (!ctx) {
    throw new Error(
      "useEnneagramTheme must be used within EnneagramThemeProvider"
    );
  }
  return ctx;
}

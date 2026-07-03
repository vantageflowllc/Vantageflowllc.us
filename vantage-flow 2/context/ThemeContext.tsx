"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react";

export type Accent = "pine" | "cobalt" | "umber" | "rose" | "ochre";

export const accentOptions: { key: Accent; label: string; swatch: string }[] = [
  { key: "pine", label: "Pine", swatch: "#2F5D50" },
  { key: "cobalt", label: "Cobalt", swatch: "#2A4374" },
  { key: "umber", label: "Umber", swatch: "#7A4B23" },
  { key: "rose", label: "Rose", swatch: "#7C3548" },
  { key: "ochre", label: "Ochre", swatch: "#8A6D1F" }
];

interface ThemeContextValue {
  darkMode: boolean;
  toggleDarkMode: () => void;
  accent: Accent;
  setAccent: (a: Accent) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const DARK_KEY = "vantageflow_dark_mode";
const ACCENT_KEY = "vantageflow_accent";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [accent, setAccentState] = useState<Accent>("pine");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedDark = window.localStorage.getItem(DARK_KEY);
      const storedAccent = window.localStorage.getItem(ACCENT_KEY) as Accent | null;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(storedDark ? storedDark === "true" : prefersDark);
      if (storedAccent) setAccentState(storedAccent);
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.setAttribute("data-accent", accent);
    window.localStorage.setItem(DARK_KEY, String(darkMode));
    window.localStorage.setItem(ACCENT_KEY, accent);
  }, [darkMode, accent, hydrated]);

  const toggleDarkMode = () => setDarkMode((d) => !d);
  const setAccent = (a: Accent) => setAccentState(a);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

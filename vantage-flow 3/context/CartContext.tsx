"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode
} from "react";
import { useSession } from "next-auth/react";
import { CartLine } from "@/lib/types";

interface CartContextValue {
  lines: CartLine[];
  addLine: (line: CartLine) => void;
  removeLine: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "vantageflow_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const mergedGuestCart = useRef(false);

  // Load the cart: from the database for signed-in users, from localStorage
  // for guests. On the transition from guest -> signed-in, merge whatever
  // was sitting in localStorage into the account's server-side cart once.
  useEffect(() => {
    if (status === "loading") return;

    let cancelled = false;

    async function load() {
      if (status === "authenticated") {
        if (!mergedGuestCart.current) {
          mergedGuestCart.current = true;
          let guestLines: CartLine[] = [];
          try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (raw) guestLines = JSON.parse(raw);
          } catch {
            // ignore malformed storage
          }

          try {
            const res = await fetch("/api/cart");
            const data = await res.json();
            const serverLines: CartLine[] = data.lines ?? [];
            const merged = [...serverLines];
            guestLines.forEach((gl) => {
              const idx = merged.findIndex(
                (l) => l.slug === gl.slug && l.color === gl.color && l.size === gl.size
              );
              if (idx > -1) merged[idx] = { ...merged[idx], quantity: merged[idx].quantity + gl.quantity };
              else merged.push(gl);
            });
            if (!cancelled) setLines(merged);
            window.localStorage.removeItem(STORAGE_KEY);
          } catch {
            // Backend not reachable (e.g. no DATABASE_URL yet) — fall back to
            // whatever was in the guest cart rather than losing it.
            if (!cancelled) setLines(guestLines);
          }
        }
      } else {
        try {
          const raw = window.localStorage.getItem(STORAGE_KEY);
          if (raw) setLines(JSON.parse(raw));
        } catch {
          // ignore malformed storage
        }
      }
      if (!cancelled) setHydrated(true);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [status]);

  // Persist on every change: to the server for signed-in users, to
  // localStorage for guests.
  useEffect(() => {
    if (!hydrated) return;
    if (status === "authenticated") {
      fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines })
      }).catch(() => {
        // Network hiccup: the in-memory cart still works for this session,
        // it just won't have synced to the account this time.
      });
    } else {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    }
  }, [lines, hydrated, status]);

  const addLine = (line: CartLine) => {
    setLines((prev) => {
      const existingIndex = prev.findIndex(
        (l) => l.slug === line.slug && l.color === line.color && l.size === line.size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + line.quantity
        };
        return next;
      }
      return [...prev, line];
    });
  };

  const removeLine = (index: number) => {
    setLines((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    setLines((prev) =>
      prev.map((l, i) => (i === index ? { ...l, quantity: Math.max(1, quantity) } : l))
    );
  };

  const clear = () => setLines([]);

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [lines]
  );
  const count = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);

  return (
    <CartContext.Provider
      value={{ lines, addLine, removeLine, updateQuantity, clear, subtotal, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

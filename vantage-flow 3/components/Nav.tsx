"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search, Heart, ShoppingBag, User, SlidersHorizontal } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ThemeDrawer from "./ThemeDrawer";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/stylist", label: "AI Stylist" },
  { href: "/shop?category=apparel", label: "Apparel" },
  { href: "/shop?category=footwear", label: "Footwear" },
  { href: "/shop?category=accessories", label: "Accessories" },
  { href: "/about", label: "About" }
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { setCartOpen, setSearchOpen } = useUI();
  const { count } = useCart();
  const { slugs } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled ? "bg-bone/90 dark:bg-ink/90 backdrop-blur border-b border-line dark:border-line-dark" : "bg-transparent"
        }`}
      >
        <div className="container-flow flex items-center justify-between py-4">
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 md:hidden"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <Link
            href="/"
            className="font-display text-lg sm:text-xl tracking-tightest font-semibold"
          >
            VANTAGE FLOW
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="group relative text-sm uppercase tracking-wide"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-flow transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 sm:gap-5">
            <button aria-label="Display settings" onClick={() => setThemeOpen(true)}>
              <SlidersHorizontal size={19} strokeWidth={1.5} />
            </button>
            <button aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link href="/account/wishlist" aria-label="Wishlist" className="relative hidden sm:block">
              <Heart size={20} strokeWidth={1.5} />
              {slugs.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-flow text-[10px] text-bone">
                  {slugs.length}
                </span>
              )}
            </Link>
            <Link href="/account" aria-label="Account" className="hidden sm:block">
              <User size={20} strokeWidth={1.5} />
            </Link>
            <button aria-label="Cart" onClick={() => setCartOpen(true)} className="relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-flow text-[10px] text-bone">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink text-bone md:hidden"
          >
            <div className="container-flow flex items-center justify-between py-4">
              <span className="font-display text-lg font-semibold">MENU</span>
              <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="container-flow mt-10 flex flex-col gap-6">
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-4xl tracking-tightest"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-line-dark pt-6 text-sm uppercase tracking-wide">
                <Link href="/account" onClick={() => setMenuOpen(false)}>
                  Account
                </Link>
                <Link href="/account/orders" onClick={() => setMenuOpen(false)}>
                  Orders
                </Link>
                <Link href="/account/wishlist" onClick={() => setMenuOpen(false)}>
                  Wishlist
                </Link>
                <Link href="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setThemeOpen(true);
                  }}
                >
                  Display
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <ThemeDrawer open={themeOpen} onClose={() => setThemeOpen(false)} />
    </>
  );
}

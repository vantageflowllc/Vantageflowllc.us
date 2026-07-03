"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Search } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { products } from "@/lib/data";

export default function SearchOverlay() {
  const { isSearchOpen, setSearchOpen } = useUI();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  const close = () => {
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-bone dark:bg-ink"
        >
          <div className="container-flow flex items-center gap-4 border-b border-line dark:border-line-dark py-6">
            <Search size={20} strokeWidth={1.5} className="text-stone-dark dark:text-stone" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, collections..."
              className="flex-1 bg-transparent font-display text-2xl tracking-tightest outline-none placeholder:text-stone sm:text-3xl"
            />
            <button aria-label="Close search" onClick={close}>
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <div className="container-flow py-8">
            {query.trim().length >= 2 && results.length === 0 && (
              <p className="text-stone-dark dark:text-stone">No results for &ldquo;{query}&rdquo;.</p>
            )}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
              {results.map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} onClick={close} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-bone-dim dark:bg-ink-soft">
                    <Image
                      src={p.colors[0].image}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium">{p.name}</p>
                  <p className="text-sm text-stone-dark dark:text-stone">${p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

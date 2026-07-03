"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductRail({
  title,
  eyebrow,
  products
}: {
  title: string;
  eyebrow: string;
  products: Product[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="container-flow mb-8 flex items-end justify-between">
        <div>
          <p className="eyebrow mb-2">{eyebrow}</p>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tightest">{title}</h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            aria-label="Scroll left"
            onClick={() => scrollBy(-1)}
            className="flex h-10 w-10 items-center justify-center border border-line dark:border-line-dark hover:border-ink dark:hover:border-bone transition-colors"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scrollBy(1)}
            className="flex h-10 w-10 items-center justify-center border border-line dark:border-line-dark hover:border-ink dark:hover:border-bone transition-colors"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:px-12"
      >
        {products.map((p, i) => (
          <div key={p.id} className="w-[62vw] flex-none snap-start sm:w-[280px]">
            <ProductCard product={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { products } from "@/lib/data";
import { Category } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

const PAGE_SIZE = 8;

type SortKey = "featured" | "price-asc" | "price-desc" | "newest" | "rating";

const categories: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "apparel", label: "Apparel" },
  { value: "footwear", label: "Footwear" },
  { value: "accessories", label: "Accessories" },
  { value: "lifestyle", label: "Lifestyle" }
];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as Category | null) ?? "all";
  const initialCollection = searchParams.get("collection");

  const [category, setCategory] = useState<Category | "all">(initialCategory || "all");
  const [collection, setCollection] = useState<string | null>(initialCollection);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesCollection = !collection || p.collection === collection;
      const matchesSearch =
        !search || p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesCollection && matchesSearch;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [category, collection, search, sort]);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [category, collection, search, sort]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length));
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [filtered.length]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="container-flow py-10 sm:py-14">
      <div className="mb-8 flex flex-col gap-2">
        <p className="eyebrow">Shop All</p>
        <h1 className="font-display text-4xl tracking-tightest sm:text-5xl">
          {collection ? collection.replace("-", " ") : "Every Piece"}
        </h1>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="hidden gap-2 sm:flex">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`border px-4 py-2 text-xs uppercase tracking-wide transition-colors ${
                category === c.value
                  ? "border-ink dark:border-bone bg-ink text-bone"
                  : "border-line dark:border-line-dark hover:border-ink dark:hover:border-bone"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setFiltersOpen(true)}
          className="flex items-center gap-2 border border-line dark:border-line-dark px-4 py-2 text-xs uppercase tracking-wide sm:hidden"
        >
          <SlidersHorizontal size={14} /> Filter &amp; Sort
        </button>

        <div className="flex flex-1 gap-3 sm:flex-none sm:justify-end">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search this page..."
            className="input-flow max-w-[220px]"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="hidden border border-line dark:border-line-dark bg-transparent px-3 py-3 text-sm sm:block"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {collection && (
        <button
          onClick={() => setCollection(null)}
          className="mb-6 flex items-center gap-1 text-xs uppercase tracking-wide text-stone-dark dark:text-stone underline underline-offset-2"
        >
          Clear collection filter <X size={12} />
        </button>
      )}

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-stone-dark dark:text-stone">No products match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}

      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-bone dark:bg-ink sm:hidden">
          <div className="flex items-center justify-between border-b border-line dark:border-line-dark p-5">
            <h2 className="font-display text-xl tracking-tightest">Filter &amp; Sort</h2>
            <button aria-label="Close filters" onClick={() => setFiltersOpen(false)}>
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <p className="eyebrow mb-3">Category</p>
            <div className="mb-8 flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={`border px-4 py-2 text-xs uppercase tracking-wide ${
                    category === c.value ? "border-ink dark:border-bone bg-ink text-bone" : "border-line dark:border-line-dark"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <p className="eyebrow mb-3">Sort By</p>
            <div className="flex flex-col gap-2">
              {(
                [
                  ["featured", "Featured"],
                  ["newest", "Newest"],
                  ["price-asc", "Price: Low to High"],
                  ["price-desc", "Price: High to Low"],
                  ["rating", "Top Rated"]
                ] as [SortKey, string][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setSort(value)}
                  className={`border px-4 py-3 text-left text-sm ${
                    sort === value ? "border-ink dark:border-bone" : "border-line dark:border-line-dark"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-line dark:border-line-dark p-5">
            <button onClick={() => setFiltersOpen(false)} className="btn-primary w-full">
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";
import ProductCard from "@/components/ProductCard";

type Tab = "description" | "details" | "shipping";

export default function ProductDetailClient({
  product,
  related
}: {
  product: Product;
  related: Product[];
}) {
  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [tab, setTab] = useState<Tab>("description");
  const [added, setAdded] = useState(false);

  const { addLine } = useCart();
  const { isSaved, toggle } = useWishlist();
  const { setCartOpen } = useUI();
  const saved = isSaved(product.slug);
  const color = product.colors[colorIndex];

  const handleAdd = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    addLine({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: color.image,
      color: color.name,
      size,
      quantity: 1
    });
    setAdded(true);
    setCartOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container-flow py-8 sm:py-12">
      <nav className="mb-6 flex gap-2 text-xs text-stone-dark dark:text-stone">
        <Link href="/shop" className="hover:text-ink dark:hover:text-bone">
          Shop
        </Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-ink dark:text-bone">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden bg-bone-dim dark:bg-ink-soft sm:aspect-[4/5]">
          <Image
            src={color.image}
            alt={`${product.name} in ${color.name}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {product.isNew && (
            <span className="absolute left-4 top-4 bg-ink px-2.5 py-1 text-[10px] uppercase tracking-widest2 text-bone">
              New
            </span>
          )}
        </div>

        <div>
          <p className="eyebrow mb-2">{product.collection.replace("-", " ")}</p>
          <h1 className="font-display text-3xl tracking-tightest sm:text-4xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.round(product.rating)
                      ? "fill-flow text-flow"
                      : "text-line"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-stone-dark dark:text-stone">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <p className="mt-4 text-2xl">${product.price}</p>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-stone-dark dark:text-stone">
            {product.description}
          </p>

          <div className="mt-6">
            <p className="mb-2 text-xs uppercase tracking-wide text-stone-dark dark:text-stone">
              Color — {color.name}
            </p>
            <div className="flex gap-2">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  aria-label={c.name}
                  onClick={() => setColorIndex(i)}
                  className={`h-9 w-9 rounded-full border-2 transition-all ${
                    i === colorIndex ? "border-ink dark:border-bone" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-stone-dark dark:text-stone">
                Size {size ? `— ${size}` : ""}
              </p>
              <Link href="/size-guide" className="text-xs uppercase tracking-wide underline">
                Size Guide
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                  className={`border px-4 py-2.5 text-xs transition-colors ${
                    size === s ? "border-ink dark:border-bone bg-ink text-bone" : "border-line dark:border-line-dark hover:border-ink dark:hover:border-bone"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="mt-2 text-xs text-flow">Select a size to continue.</p>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            <button onClick={handleAdd} className="btn-primary flex-1">
              {added ? "Added to Bag" : "Add to Bag"}
            </button>
            <button
              aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => toggle(product.slug)}
              className="flex h-[50px] w-[50px] flex-none items-center justify-center border border-ink dark:border-bone"
            >
              <Heart size={18} className={saved ? "fill-flow text-flow" : ""} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 border-t border-line dark:border-line-dark pt-6 text-xs text-stone-dark dark:text-stone sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <Truck size={16} strokeWidth={1.5} /> Free shipping over $150
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={16} strokeWidth={1.5} /> 30-day returns
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} strokeWidth={1.5} /> Secure checkout
            </div>
          </div>

          <div className="mt-10 border-t border-line dark:border-line-dark">
            <div className="flex gap-6">
              {(["description", "details", "shipping"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`border-b-2 py-4 text-sm capitalize transition-colors ${
                    tab === t ? "border-ink dark:border-bone" : "border-transparent text-stone-dark dark:text-stone"
                  }`}
                >
                  {t === "shipping" ? "Shipping & Care" : t}
                </button>
              ))}
            </div>
            <div className="pb-6 pt-2 text-sm leading-relaxed text-stone-dark dark:text-stone">
              {tab === "description" && (
                <p>
                  {product.description} Materials: {product.materials}. SKU: {product.sku}
                </p>
              )}
              {tab === "details" && (
                <ul className="list-disc space-y-1 pl-4">
                  {product.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
              {tab === "shipping" && (
                <p>
                  Ships within 1–2 business days. Free standard shipping on orders over
                  $150. See our{" "}
                  <Link href="/shipping-returns" className="underline">
                    Shipping &amp; Returns
                  </Link>{" "}
                  page for full details.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <p className="eyebrow mb-2">You May Also Like</p>
          <h2 className="font-display text-2xl tracking-tightest sm:text-3xl mb-8">
            From the {product.collection.replace("-", " ")} collection
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

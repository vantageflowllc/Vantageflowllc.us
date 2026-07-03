"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { slugs } = useWishlist();
  const saved = products.filter((p) => slugs.includes(p.slug));

  return (
    <div>
      <h2 className="font-display text-2xl tracking-tightest mb-6">Wishlist</h2>
      {saved.length === 0 ? (
        <div className="border border-line dark:border-line-dark p-10 text-center">
          <p className="text-stone-dark dark:text-stone">Nothing saved yet.</p>
          <Link href="/shop" className="btn-primary mt-6 inline-flex">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3">
          {saved.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

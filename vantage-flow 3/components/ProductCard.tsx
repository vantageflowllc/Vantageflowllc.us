"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import { Product } from "@/lib/types";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { isSaved, toggle } = useWishlist();
  const { setQuickViewProduct } = useUI();
  const primary = product.colors[0];
  const saved = isSaved(product.slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-bone-dim dark:bg-ink-soft">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <Image
            src={primary.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-opacity duration-500 ${
              primary.hoverImage ? "group-hover:opacity-0" : ""
            }`}
          />
          {primary.hoverImage && (
            <Image
              src={primary.hoverImage}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-ink px-2.5 py-1 text-[10px] uppercase tracking-widest2 text-bone">
              New
            </span>
          )}
          {product.compareAtPrice && (
            <span className="bg-flow px-2.5 py-1 text-[10px] uppercase tracking-widest2 text-bone">
              Sale
            </span>
          )}
        </div>

        <button
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggle(product.slug)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-bone/90 dark:bg-ink/90 backdrop-blur transition-transform hover:scale-105"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={saved ? "fill-flow text-flow" : "text-ink dark:text-bone"}
          />
        </button>

        <button
          onClick={() => setQuickViewProduct(product)}
          className="absolute bottom-0 left-0 right-0 flex translate-y-full items-center justify-center gap-2 bg-bone/95 dark:bg-ink/95 py-3 text-xs uppercase tracking-wide transition-transform duration-300 group-hover:translate-y-0"
        >
          <Eye size={14} strokeWidth={1.5} /> Quick View
        </button>
      </div>

      <Link href={`/product/${product.slug}`} className="mt-3 block">
        <p className="text-sm font-medium">{product.name}</p>
        <div className="mt-1 flex items-center gap-2 text-sm text-stone-dark dark:text-stone">
          <span>${product.price}</span>
          {product.compareAtPrice && (
            <span className="text-stone line-through">${product.compareAtPrice}</span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

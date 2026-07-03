"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";

export default function QuickView() {
  const { quickViewProduct, setQuickViewProduct, setCartOpen } = useUI();
  const { addLine } = useCart();
  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState<string | null>(null);

  const product = quickViewProduct;

  const close = () => {
    setQuickViewProduct(null);
    setColorIndex(0);
    setSize(null);
  };

  const handleAdd = () => {
    if (!product) return;
    const chosenSize = size ?? product.sizes[0];
    addLine({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.colors[colorIndex].image,
      color: product.colors[colorIndex].name,
      size: chosenSize,
      quantity: 1
    });
    close();
    setCartOpen(true);
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center"
          onClick={close}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto bg-bone dark:bg-ink sm:rounded-none"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="relative aspect-square sm:aspect-auto sm:h-full">
                <Image
                  src={product.colors[colorIndex].image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <button
                  aria-label="Close quick view"
                  onClick={close}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-bone/90 dark:bg-ink/90"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <p className="eyebrow mb-2">{product.collection.replace("-", " ")}</p>
                <h3 className="font-display text-2xl tracking-tightest">{product.name}</h3>
                <p className="mt-2 text-lg">${product.price}</p>
                <p className="mt-4 text-sm text-stone-dark dark:text-stone leading-relaxed">
                  {product.description}
                </p>

                <div className="mt-6">
                  <p className="mb-2 text-xs uppercase tracking-wide text-stone-dark dark:text-stone">
                    Color — {product.colors[colorIndex].name}
                  </p>
                  <div className="flex gap-2">
                    {product.colors.map((c, i) => (
                      <button
                        key={c.name}
                        aria-label={c.name}
                        onClick={() => setColorIndex(i)}
                        className={`h-8 w-8 rounded-full border-2 transition-all ${
                          i === colorIndex ? "border-ink dark:border-bone" : "border-transparent"
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="mb-2 text-xs uppercase tracking-wide text-stone-dark dark:text-stone">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`border px-3 py-2 text-xs transition-colors ${
                          size === s
                            ? "border-ink dark:border-bone bg-ink text-bone"
                            : "border-line dark:border-line-dark hover:border-ink dark:hover:border-bone"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={handleAdd} className="btn-primary mt-8 w-full">
                  Add to Bag
                </button>
                <Link
                  href={`/product/${product.slug}`}
                  onClick={close}
                  className="btn-ghost mt-4 block text-center"
                >
                  View full details
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

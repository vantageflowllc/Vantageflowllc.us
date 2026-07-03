"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { isCartOpen, setCartOpen } = useUI();
  const { lines, removeLine, updateQuantity, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-bone dark:bg-ink"
          >
            <div className="flex items-center justify-between border-b border-line dark:border-line-dark p-5">
              <h2 className="font-display text-xl tracking-tightest">
                Your Bag ({lines.reduce((s, l) => s + l.quantity, 0)})
              </h2>
              <button aria-label="Close cart" onClick={() => setCartOpen(false)}>
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <p className="text-stone-dark dark:text-stone">Your bag is empty.</p>
                <Link href="/shop" onClick={() => setCartOpen(false)} className="btn-primary">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5">
                  <ul className="space-y-6">
                    {lines.map((line, i) => (
                      <li key={`${line.slug}-${line.color}-${line.size}`} className="flex gap-4">
                        <div className="relative h-28 w-24 flex-none overflow-hidden bg-bone-dim dark:bg-ink-soft">
                          <Image src={line.image} alt={line.name} fill className="object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm font-medium">{line.name}</p>
                              <p className="mt-1 text-xs text-stone-dark dark:text-stone">
                                {line.color} / {line.size}
                              </p>
                            </div>
                            <p className="text-sm">${line.price}</p>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center border border-line dark:border-line-dark">
                              <button
                                aria-label="Decrease quantity"
                                onClick={() => updateQuantity(i, line.quantity - 1)}
                                className="flex h-8 w-8 items-center justify-center"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-6 text-center text-sm">{line.quantity}</span>
                              <button
                                aria-label="Increase quantity"
                                onClick={() => updateQuantity(i, line.quantity + 1)}
                                className="flex h-8 w-8 items-center justify-center"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeLine(i)}
                              className="text-xs uppercase tracking-wide text-stone-dark dark:text-stone underline-offset-2 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-line dark:border-line-dark p-5">
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-stone-dark dark:text-stone">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <p className="mb-4 text-xs text-stone-dark dark:text-stone">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <Link
                    href="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="btn-primary w-full"
                  >
                    Checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setCartOpen(false)}
                    className="btn-ghost mt-3 block text-center"
                  >
                    View Bag
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { lines, removeLine, updateQuantity, subtotal } = useCart();

  if (lines.length === 0) {
    return (
      <div className="container-flow flex flex-col items-center justify-center py-32 text-center">
        <h1 className="font-display text-3xl tracking-tightest">Your bag is empty</h1>
        <p className="mt-3 text-stone-dark dark:text-stone">Find something worth carrying.</p>
        <Link href="/shop" className="btn-primary mt-8">
          Shop All
        </Link>
      </div>
    );
  }

  return (
    <div className="container-flow py-10 sm:py-14">
      <h1 className="font-display text-4xl tracking-tightest sm:text-5xl mb-8">Your Bag</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ul className="divide-y divide-line">
            {lines.map((line, i) => (
              <li key={`${line.slug}-${line.color}-${line.size}`} className="flex gap-5 py-6">
                <div className="relative h-32 w-28 flex-none overflow-hidden bg-bone-dim dark:bg-ink-soft sm:h-40 sm:w-32">
                  <Image src={line.image} alt={line.name} fill className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link href={`/product/${line.slug}`} className="text-base font-medium hover:underline">
                        {line.name}
                      </Link>
                      <p className="mt-1 text-sm text-stone-dark dark:text-stone">
                        {line.color} / {line.size}
                      </p>
                    </div>
                    <button
                      aria-label="Remove item"
                      onClick={() => removeLine(i)}
                      className="text-stone-dark dark:text-stone hover:text-ink dark:hover:text-bone"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center border border-line dark:border-line-dark">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(i, line.quantity - 1)}
                        className="flex h-9 w-9 items-center justify-center"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm">{line.quantity}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(i, line.quantity + 1)}
                        className="flex h-9 w-9 items-center justify-center"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-base font-medium">
                      ${(line.price * line.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-fit border border-line dark:border-line-dark p-6">
          <h2 className="font-display text-xl tracking-tightest mb-5">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-dark dark:text-stone">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-dark dark:text-stone">Shipping</span>
              <span>{subtotal > 150 ? "Free" : "$12.00"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-dark dark:text-stone">Estimated Tax</span>
              <span>${(subtotal * 0.08).toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-line dark:border-line-dark pt-4 text-base font-medium">
            <span>Total</span>
            <span>
              $
              {(
                subtotal +
                (subtotal > 150 ? 0 : 12) +
                subtotal * 0.08
              ).toFixed(2)}
            </span>
          </div>
          <Link href="/checkout" className="btn-primary mt-6 block w-full text-center">
            Proceed to Checkout
          </Link>
          <Link href="/shop" className="btn-ghost mt-4 block text-center">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";

type PaymentMethod = "card" | "apple-pay" | "google-pay" | "paypal";

export default function CheckoutPage() {
  const { lines, subtotal } = useCart();
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [placed, setPlaced] = useState(false);

  const shipping = subtotal > 150 ? 0 : 12;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (lines.length === 0 && !placed) {
    return (
      <div className="container-flow flex flex-col items-center justify-center py-32 text-center">
        <h1 className="font-display text-3xl tracking-tightest">Nothing to check out</h1>
        <p className="mt-3 text-stone-dark dark:text-stone">Add something to your bag first.</p>
        <Link href="/shop" className="btn-primary mt-8">
          Shop All
        </Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="container-flow flex flex-col items-center justify-center py-32 text-center">
        <h1 className="font-display text-4xl tracking-tightest">Order Confirmed</h1>
        <p className="mt-3 max-w-md text-stone-dark dark:text-stone">
          This is a demo checkout — no payment was processed. In production this
          screen confirms a real order placed through Stripe.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Back to Home
        </Link>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
  };

  return (
    <div className="container-flow py-10 sm:py-14">
      <h1 className="font-display text-4xl tracking-tightest sm:text-5xl mb-2">Checkout</h1>
      <p className="mb-8 flex items-center gap-1.5 text-xs text-stone-dark dark:text-stone">
        <Lock size={12} /> Secure, encrypted checkout
      </p>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <form onSubmit={submit} className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="eyebrow mb-4">Contact</h2>
            <input type="email" required placeholder="Email address" className="input-flow" />
          </section>

          <section>
            <h2 className="eyebrow mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input required placeholder="First name" className="input-flow" />
              <input required placeholder="Last name" className="input-flow" />
              <input required placeholder="Address" className="input-flow sm:col-span-2" />
              <input required placeholder="City" className="input-flow" />
              <input required placeholder="State" className="input-flow" />
              <input required placeholder="ZIP code" className="input-flow" />
              <input required placeholder="Country" defaultValue="United States" className="input-flow" />
            </div>
          </section>

          <section>
            <h2 className="eyebrow mb-4">Payment</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(
                [
                  ["card", "Card"],
                  ["apple-pay", "Apple Pay"],
                  ["google-pay", "Google Pay"],
                  ["paypal", "PayPal"]
                ] as [PaymentMethod, string][]
              ).map(([value, label]) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setMethod(value)}
                  className={`border px-3 py-3 text-xs uppercase tracking-wide transition-colors ${
                    method === value ? "border-ink dark:border-bone bg-ink text-bone" : "border-line dark:border-line-dark hover:border-ink dark:hover:border-bone"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-4">
              {method === "card" && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Card number"
                    className="input-flow sm:col-span-2"
                    inputMode="numeric"
                  />
                  <input required placeholder="MM / YY" className="input-flow" />
                  <input required placeholder="CVC" className="input-flow" />
                  <p className="text-xs text-stone-dark dark:text-stone sm:col-span-2">
                    Card fields render here via Stripe Elements in production —
                    no card data touches this app's servers directly.
                  </p>
                </div>
              )}
              {method === "apple-pay" && (
                <div className="flex items-center justify-center border border-line dark:border-line-dark bg-ink py-4 text-bone text-sm">
                  Apple Pay confirmation sheet opens here on a supported device
                </div>
              )}
              {method === "google-pay" && (
                <div className="flex items-center justify-center border border-line dark:border-line-dark bg-ink py-4 text-bone text-sm">
                  Google Pay confirmation sheet opens here on a supported device
                </div>
              )}
              {method === "paypal" && (
                <div className="flex items-center justify-center border border-line dark:border-line-dark bg-[#FFC439] py-4 text-sm font-medium text-ink dark:text-bone">
                  Redirects to PayPal to complete payment
                </div>
              )}
            </div>
          </section>

          <button type="submit" className="btn-primary w-full">
            Place Order — ${total.toFixed(2)}
          </button>
        </form>

        <aside className="h-fit border border-line dark:border-line-dark p-6">
          <h2 className="font-display text-xl tracking-tightest mb-5">Order Summary</h2>
          <ul className="space-y-4">
            {lines.map((line) => (
              <li key={`${line.slug}-${line.color}-${line.size}`} className="flex gap-3">
                <div className="relative h-16 w-14 flex-none overflow-hidden bg-bone-dim dark:bg-ink-soft">
                  <Image src={line.image} alt={line.name} fill className="object-cover" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] text-bone">
                    {line.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{line.name}</p>
                  <p className="text-xs text-stone-dark dark:text-stone">
                    {line.color} / {line.size}
                  </p>
                </div>
                <p className="text-sm">${(line.price * line.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2 border-t border-line dark:border-line-dark pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-dark dark:text-stone">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-dark dark:text-stone">Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-dark dark:text-stone">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-line dark:border-line-dark pt-4 text-base font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCart } from "@/context/CartContext";
import CheckoutForm from "@/components/checkout/CheckoutForm";

let stripePromise: Promise<Stripe | null> | null = null;
if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
}

export default function CheckoutPage() {
  const { lines, subtotal } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const shipping = subtotal > 150 ? 0 : 12;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (lines.length === 0 || !stripePromise || placedOrderId) return;
    fetch("/api/checkout/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Math.round(total * 100) })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setClientSecret(data.clientSecret);
      })
      .catch(() => setError("Couldn't reach the payment server. Please try again."));
    // Only re-fetch the PaymentIntent when the line count changes (not on every
    // cent of `total`), since Stripe lets us update an existing intent's
    // amount rather than creating a new one for minor recalculations.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.length, placedOrderId]);

  if (lines.length === 0 && !placedOrderId) {
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

  if (placedOrderId) {
    return (
      <div className="container-flow flex flex-col items-center justify-center py-32 text-center">
        <h1 className="font-display text-4xl tracking-tightest">Order Confirmed</h1>
        <p className="mt-3 max-w-md text-stone-dark dark:text-stone">
          Your order <span className="font-mono">{placedOrderId}</span> was placed and paid
          through Stripe.
        </p>
        <Link href="/account/orders" className="btn-primary mt-8">
          View Order
        </Link>
      </div>
    );
  }

  if (!stripePromise) {
    return (
      <div className="container-flow py-24 text-center">
        <h1 className="font-display text-3xl tracking-tightest mb-3">Checkout isn't live yet</h1>
        <p className="mx-auto max-w-md text-sm text-stone-dark dark:text-stone">
          Add <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> and{" "}
          <code>STRIPE_SECRET_KEY</code> to your environment (see <code>.env.example</code>) to
          enable real payments.
        </p>
      </div>
    );
  }

  return (
    <div className="container-flow py-10 sm:py-14">
      <h1 className="font-display text-4xl tracking-tightest sm:text-5xl mb-2">Checkout</h1>
      <p className="mb-8 flex items-center gap-1.5 text-xs text-stone-dark dark:text-stone">
        <Lock size={12} /> Secure, encrypted checkout
      </p>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {error && (
            <p className="mb-4 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          {clientSecret ? (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, appearance: { theme: "stripe" } }}
            >
              <CheckoutForm
                lines={lines}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
                onSuccess={setPlacedOrderId}
              />
            </Elements>
          ) : (
            !error && (
              <p className="text-sm text-stone-dark dark:text-stone">
                Preparing secure payment form…
              </p>
            )
          )}
        </div>

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

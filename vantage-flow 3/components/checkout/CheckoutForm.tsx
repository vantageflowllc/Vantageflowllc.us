"use client";

import { useState } from "react";
import { PaymentElement, AddressElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from "@/context/CartContext";
import { CartLine } from "@/lib/types";

interface Props {
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onSuccess: (orderId: string) => void;
}

export default function CheckoutForm({
  lines,
  subtotal,
  shipping,
  tax,
  total,
  onSuccess
}: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const { clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shippingAddress, setShippingAddress] = useState<unknown>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Please check your details and try again.");
      setSubmitting(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout`
      },
      redirect: "if_required"
    });

    if (confirmError) {
      setError(confirmError.message ?? "Payment failed. Please try again.");
      setSubmitting(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            lines,
            subtotal,
            shipping,
            tax,
            total,
            shippingAddress
          })
        });
        const data = await res.json();
        clear();
        onSuccess(data.id ?? paymentIntent.id);
      } catch {
        // Payment succeeded even if the order-record call failed — don't
        // strand the customer on a failed screen after they've been charged.
        clear();
        onSuccess(paymentIntent.id);
      }
    } else {
      setError("Payment did not complete. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={submit} className="space-y-10">
      <section>
        <h2 className="eyebrow mb-4">Shipping Address</h2>
        <AddressElement
          options={{ mode: "shipping" }}
          onChange={(event) => {
            if (event.complete) setShippingAddress(event.value);
          }}
        />
      </section>

      <section>
        <h2 className="eyebrow mb-4">Payment</h2>
        <PaymentElement />
        <p className="mt-2 text-xs text-stone-dark dark:text-stone">
          Card, Apple Pay, Google Pay, and (if enabled in your Stripe dashboard) PayPal all
          appear here automatically — no extra integration needed per method.
        </p>
      </section>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || submitting}
        className="btn-primary w-full disabled:opacity-50"
      >
        {submitting ? "Processing…" : `Place Order — $${total.toFixed(2)}`}
      </button>
    </form>
  );
}

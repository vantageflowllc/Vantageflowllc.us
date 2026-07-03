"use client";

import { FormEvent, useState } from "react";
import FlowLine from "./FlowLine";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("submitted");
  };

  return (
    <section className="border-t border-line dark:border-line-dark py-16 sm:py-24">
      <div className="container-flow flex flex-col items-center text-center">
        <FlowLine className="mb-6 h-6 w-28" color="#2F5D50" />
        <h2 className="font-display text-3xl tracking-tightest sm:text-4xl max-w-lg">
          Get early access to new drops
        </h2>
        <p className="mt-3 max-w-md text-sm text-stone-dark dark:text-stone">
          One email a week. New arrivals, restocks, and the occasional
          subscriber-only discount.
        </p>

        {status === "submitted" ? (
          <p className="mt-8 font-medium text-flow">
            You&apos;re on the list — welcome to Vantage Flow.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input-flow"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Sign Up
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

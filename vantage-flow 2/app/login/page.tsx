"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/account");
  };

  return (
    <div className="container-flow flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl tracking-tightest mb-1">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </h1>
        <p className="mb-8 text-sm text-stone-dark dark:text-stone">
          {mode === "signin"
            ? "Welcome back to Vantage Flow."
            : "Join for early access and order tracking."}
        </p>

        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" && (
            <input required placeholder="Full name" className="input-flow" />
          )}
          <input required type="email" placeholder="Email" className="input-flow" />
          <input required type="password" placeholder="Password" className="input-flow" />
          <button type="submit" className="btn-primary w-full">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-dark dark:text-stone">
          {mode === "signin" ? "New to Vantage Flow?" : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-ink dark:text-bone underline"
          >
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
        <Link href="/" className="btn-ghost mt-6 block text-center">
          Continue browsing
        </Link>
      </div>
    </div>
  );
}

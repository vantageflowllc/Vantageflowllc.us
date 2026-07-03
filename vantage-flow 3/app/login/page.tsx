"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

function LoginForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === "signup") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
    }

    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (result?.error) {
      setError("Incorrect email or password.");
      return;
    }
    router.push(callbackUrl);
  };

  return (
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
          <input
            required
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-flow"
          />
        )}
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-flow"
        />
        <input
          required
          type="password"
          placeholder="Password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-flow"
        />
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-stone-dark dark:text-stone">
        {mode === "signin" ? "New to Vantage Flow?" : "Already have an account?"}{" "}
        <button
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
          }}
          className="text-ink dark:text-bone underline"
        >
          {mode === "signin" ? "Create an account" : "Sign in"}
        </button>
      </p>
      <Link href="/" className="btn-ghost mt-6 block text-center">
        Continue browsing
      </Link>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="container-flow flex min-h-[70vh] items-center justify-center py-16">
      {/* useSearchParams (used inside LoginForm) requires a Suspense boundary
          in the App Router, or `next build` fails while trying to statically
          prerender this page. */}
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

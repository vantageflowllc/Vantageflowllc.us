"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex-none border border-line dark:border-line-dark px-4 py-3 text-left text-sm text-stone-dark dark:text-stone hover:border-ink dark:hover:border-bone lg:flex-auto"
    >
      Sign Out
    </button>
  );
}

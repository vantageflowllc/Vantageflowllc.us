import Link from "next/link";

const links = [
  { href: "/account", label: "Overview" },
  { href: "/account/orders", label: "Order History" },
  { href: "/account/addresses", label: "Saved Addresses" },
  { href: "/account/wishlist", label: "Wishlist" }
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-flow py-10 sm:py-14">
      <h1 className="font-display text-4xl tracking-tightest sm:text-5xl mb-8">My Account</h1>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
        <nav className="flex gap-2 overflow-x-auto lg:col-span-1 lg:flex-col lg:overflow-visible">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex-none border border-line dark:border-line-dark px-4 py-3 text-sm hover:border-ink dark:hover:border-bone lg:flex-auto"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="flex-none border border-line dark:border-line-dark px-4 py-3 text-sm text-stone-dark dark:text-stone hover:border-ink dark:hover:border-bone lg:flex-auto"
          >
            Sign Out
          </Link>
        </nav>
        <div className="lg:col-span-3">{children}</div>
      </div>
    </div>
  );
}

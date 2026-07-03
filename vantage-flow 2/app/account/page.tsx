import Link from "next/link";
import { mockOrders } from "@/lib/data";

export const metadata = { title: "My Account" };

export default function AccountOverviewPage() {
  const recent = mockOrders[0];

  return (
    <div className="space-y-8">
      <section className="border border-line dark:border-line-dark p-6">
        <p className="eyebrow mb-2">Welcome back</p>
        <h2 className="font-display text-2xl tracking-tightest">Jordan Ellis</h2>
        <p className="mt-1 text-sm text-stone-dark dark:text-stone">jordan.ellis@email.com</p>
      </section>

      <section className="border border-line dark:border-line-dark p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl tracking-tightest">Most Recent Order</h2>
          <Link href="/account/orders" className="text-xs uppercase tracking-wide underline">
            View All
          </Link>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="font-medium">{recent.id}</p>
            <p className="text-stone-dark dark:text-stone">{recent.date}</p>
          </div>
          <span className="border border-line dark:border-line-dark px-3 py-1 text-xs uppercase tracking-wide">
            {recent.status}
          </span>
          <p className="font-medium">${recent.total.toFixed(2)}</p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href="/account/addresses" className="border border-line dark:border-line-dark p-6 hover:border-ink dark:hover:border-bone">
          <h3 className="font-medium mb-1">Saved Addresses</h3>
          <p className="text-sm text-stone-dark dark:text-stone">Manage shipping addresses on file.</p>
        </Link>
        <Link href="/account/wishlist" className="border border-line dark:border-line-dark p-6 hover:border-ink dark:hover:border-bone">
          <h3 className="font-medium mb-1">Wishlist</h3>
          <p className="text-sm text-stone-dark dark:text-stone">Items you've saved for later.</p>
        </Link>
      </div>
    </div>
  );
}

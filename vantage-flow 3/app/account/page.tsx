import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "My Account" };

export default async function AccountOverviewPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  const recent = userId
    ? await prisma.order.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } })
    : null;

  return (
    <div className="space-y-8">
      <section className="border border-line dark:border-line-dark p-6">
        <p className="eyebrow mb-2">Welcome back</p>
        <h2 className="font-display text-2xl tracking-tightest">{session?.user?.name ?? "Vantage Flow member"}</h2>
        <p className="mt-1 text-sm text-stone-dark dark:text-stone">{session?.user?.email}</p>
      </section>

      <section className="border border-line dark:border-line-dark p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl tracking-tightest">Most Recent Order</h2>
          <Link href="/account/orders" className="text-xs uppercase tracking-wide underline">
            View All
          </Link>
        </div>
        {recent ? (
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="font-medium">{recent.id}</p>
              <p className="text-stone-dark dark:text-stone">{recent.createdAt.toLocaleDateString()}</p>
            </div>
            <span className="border border-line dark:border-line-dark px-3 py-1 text-xs uppercase tracking-wide">
              {recent.status}
            </span>
            <p className="font-medium">${recent.total.toFixed(2)}</p>
          </div>
        ) : (
          <p className="text-sm text-stone-dark dark:text-stone">
            No orders yet — your first order will show up here.
          </p>
        )}
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

import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Order History" };

const statusStyles: Record<string, string> = {
  Delivered: "border-flow text-flow",
  Shipped: "border-ink dark:border-bone text-ink dark:text-bone",
  Processing: "border-stone text-stone-dark dark:text-stone"
};

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  const orders = userId
    ? await prisma.order.findMany({
        where: { userId },
        include: { items: true },
        orderBy: { createdAt: "desc" }
      })
    : [];

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl tracking-tightest">Order History</h2>
      {orders.length === 0 && (
        <p className="text-sm text-stone-dark dark:text-stone">
          You haven't placed any orders yet.
        </p>
      )}
      {orders.map((order) => (
        <div key={order.id} className="border border-line dark:border-line-dark p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-medium">{order.id}</p>
              <p className="text-sm text-stone-dark dark:text-stone">
                Placed {order.createdAt.toLocaleDateString()}
              </p>
            </div>
            <span
              className={`border px-3 py-1 text-xs uppercase tracking-wide ${statusStyles[order.status] ?? statusStyles.Processing}`}
            >
              {order.status}
            </span>
          </div>
          <ul className="space-y-3 border-t border-line dark:border-line-dark pt-4">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center gap-4">
                <div className="relative h-16 w-14 flex-none overflow-hidden bg-bone-dim dark:bg-ink-soft">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-stone-dark dark:text-stone">
                    {item.color} / {item.size} · Qty {item.quantity}
                  </p>
                </div>
                <p className="text-sm">${item.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-line dark:border-line-dark pt-4">
            <p className="text-sm font-medium">Total: ${order.total.toFixed(2)}</p>
            <button className="btn-ghost text-sm">Track / Return</button>
          </div>
        </div>
      ))}
    </div>
  );
}

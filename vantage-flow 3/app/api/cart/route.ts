import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CartLine } from "@/lib/types";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return NextResponse.json({ lines: [] });

  const items = await prisma.cartItem.findMany({ where: { userId } });
  const lines: CartLine[] = items.map((i) => ({
    productId: i.productId,
    slug: i.slug,
    name: i.name,
    price: i.price,
    image: i.image,
    color: i.color,
    size: i.size,
    quantity: i.quantity
  }));

  return NextResponse.json({ lines });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { lines } = (await req.json()) as { lines: CartLine[] };

  // Simplest correct approach for a cart of this size: replace wholesale.
  await prisma.$transaction([
    prisma.cartItem.deleteMany({ where: { userId } }),
    ...(lines.length
      ? [
          prisma.cartItem.createMany({
            data: lines.map((l) => ({
              userId,
              productId: l.productId,
              slug: l.slug,
              name: l.name,
              price: l.price,
              image: l.image,
              color: l.color,
              size: l.size,
              quantity: l.quantity
            }))
          })
        ]
      : [])
  ]);

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CartLine } from "@/lib/types";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return NextResponse.json({ orders: [] });

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json({ orders });
}

interface CreateOrderBody {
  paymentIntentId: string;
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress?: unknown;
}

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const body = (await req.json()) as CreateOrderBody;
  const { paymentIntentId, lines, subtotal, shipping, tax, total, shippingAddress } = body;

  // Trust Stripe's record of the payment, not the client's claim that it succeeded.
  // (For production, do this from a Stripe webhook instead of the client callback,
  // so an order is recorded even if the browser tab closes before this call fires.)
  const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (intent.status !== "succeeded") {
    return NextResponse.json({ error: "Payment has not completed." }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!userId) {
    // Guest checkout: payment is real, but there's no account to attach an
    // order record to. Return the payment id as the confirmation reference.
    return NextResponse.json({ id: intent.id, guest: true });
  }

  const existing = await prisma.order.findUnique({ where: { stripePaymentIntentId: paymentIntentId } });
  if (existing) return NextResponse.json({ id: existing.id });

  const order = await prisma.order.create({
    data: {
      userId,
      subtotal,
      shipping,
      tax,
      total,
      stripePaymentIntentId: paymentIntentId,
      shippingAddress: shippingAddress ?? undefined,
      items: {
        create: lines.map((l) => ({
          name: l.name,
          image: l.image,
          color: l.color,
          size: l.size,
          quantity: l.quantity,
          price: l.price
        }))
      }
    },
    include: { items: true }
  });

  await prisma.cartItem.deleteMany({ where: { userId } });

  return NextResponse.json({ id: order.id });
}

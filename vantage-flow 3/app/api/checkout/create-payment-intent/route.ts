import { NextResponse } from "next/server";
import Stripe from "stripe";

// Amount arrives in cents from the client, already computed from the cart
// (subtotal + shipping + tax) so the charge always matches what's on screen.
// For production, prefer recomputing the total server-side from the cart
// contents so a tampered client request can't under-charge.
export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured on the server." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const { amount } = await req.json();
  if (!amount || typeof amount !== "number" || amount < 50) {
    return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount),
    currency: "usd",
    automatic_payment_methods: { enabled: true }
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret, id: paymentIntent.id });
}

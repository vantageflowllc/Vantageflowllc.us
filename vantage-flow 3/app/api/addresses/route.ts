import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireUserId() {
  const session = await getServerSession(authOptions);
  return (session?.user as { id?: string } | undefined)?.id;
}

export async function GET() {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ addresses: [] }, { status: 401 });

  const addresses = await prisma.address.findMany({
    where: { userId },
    orderBy: { isDefault: "desc" }
  });
  return NextResponse.json({ addresses });
}

export async function POST(req: Request) {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { label, fullName, line1, city, state, zip, country, isDefault } = body;

  if (isDefault) {
    await prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
  }

  const address = await prisma.address.create({
    data: { userId, label, fullName, line1, city, state, zip, country, isDefault: !!isDefault }
  });

  return NextResponse.json({ address });
}

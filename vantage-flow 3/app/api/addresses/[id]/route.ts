import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireUserId() {
  const session = await getServerSession(authOptions);
  return (session?.user as { id?: string } | undefined)?.id;
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Scope the delete to this user so no one can delete another user's address.
  const result = await prisma.address.deleteMany({ where: { id: params.id, userId } });
  if (result.count === 0) {
    return NextResponse.json({ error: "Address not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const owned = await prisma.address.findFirst({ where: { id: params.id, userId } });
  if (!owned) return NextResponse.json({ error: "Address not found." }, { status: 404 });

  if (body.isDefault) {
    await prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
  }

  const address = await prisma.address.update({ where: { id: params.id }, data: body });
  return NextResponse.json({ address });
}

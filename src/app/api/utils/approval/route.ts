import { currentUser } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/db/user";
import { getUnapprovedProperties } from "@/lib/db/approval";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await currentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const dbUser = await getUserByClerkId(user.id);
  if (!dbUser || dbUser.role !== "ADMIN") {
    return new Response("Forbidden", { status: 403 });
  }

  const properties = await prisma.property.findMany({
    where: { approved: false },
    orderBy: { createdAt: "desc" },
  });
  return Response.json(properties);
}
// POST to approve a property
export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return Response.json("unauthenticated!");

  const dbUser = await getUserByClerkId(user.id);
  if (dbUser?.role !== "ADMIN") return Response.json("unauthorized!");

  const { id } = await req.json();
  if (!id) return Response.json("Missing ID");

  const updated = await prisma.property.update({
    where: { id },
    data: { approved: true },
  });

  return Response.json(updated);
}


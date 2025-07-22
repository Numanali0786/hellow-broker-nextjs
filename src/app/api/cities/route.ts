import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await currentUser();
  if (!user) return Response.json("unauthenticated");
  const { searchParams } = new URL(req.url);
  const stateId = searchParams.get("stateId");
  if (!stateId) return Response.json("unauthorized");
  const cities = await prisma.city.findMany({
    where: { stateId: stateId },
  });

  return NextResponse.json(cities);
}

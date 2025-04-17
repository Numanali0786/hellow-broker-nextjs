// src/app/api/properties/route.ts
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const properties = await prisma.property.findMany();
  return NextResponse.json(properties);
}

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return new NextResponse("unauthenticated req!");

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (dbUser?.role === "admin") {
    const body = await req.json();
    const newProperty = await prisma.property.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json(newProperty);
  }

  return new NextResponse("unauthorised user!");
}

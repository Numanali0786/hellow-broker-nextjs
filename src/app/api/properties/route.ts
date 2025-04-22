// src/app/api/properties/route.ts
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const properties = await prisma.property.findMany({where:{
    approved:true
  }});
  return NextResponse.json(properties);
}

export async function POST(req: Request) {
  console.log('jjjj')
  const user = await currentUser();
  if (!user) return new NextResponse("unauthenticated req!");

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (dbUser?.role === "USER") {
    const body = await req.json();
    const formattedMedia = body.media.map((item: any) => ({
      publicId: item.public_id,
      url: item.secure_url,
      type: item.resource_type,
      format: item.format,
      width: item.width,
      height: item.height,
    }));
    
    console.log(body)
    const newProperty = await prisma.property.create({
      data: {
        ...body,
        userId: dbUser.id,
        media: {
          createMany: {
            data:formattedMedia,
          },
        },
      },
    });
    return NextResponse.json(newProperty);
  }

  return new NextResponse("unauthorised user!");
}

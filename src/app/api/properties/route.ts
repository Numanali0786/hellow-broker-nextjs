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

// export async function POST(req: Request) {
//   console.log('jjjj')
//   const user = await currentUser();
//   if (!user) return new NextResponse("unauthenticated req!");

//   const dbUser = await prisma.user.findUnique({
//     where: {
//       clerkId: user.id,
//     },
//   });

//   if (dbUser?.role === "USER") {
//     const body = await req.json();
//     const formattedMedia = body.media.map((item: any) => ({
//       publicId: item.public_id,
//       url: item.secure_url,
//       type: item.resource_type,
//       format: item.format,
//       width: item.width,
//       height: item.height,
//     }));
    
//     console.log(body)
//     const newProperty = await prisma.property.create({
//       data: {
//         ...body,
//         userId: dbUser.id,
//         media: {
//           createMany: {
//             data:formattedMedia,
//           },
//         },
//       },
//     });
//     return NextResponse.json(newProperty);
//   }

//   return new NextResponse("unauthorised user!");
// }



export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthenticated");

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });
  if (!dbUser) return new NextResponse("User not found!");

  if (dbUser.role === "USER" || dbUser.role === "ADMIN") {
    const body = await req.json();

    const formattedMedia = body.media.map((item: { public_id: unknown; secure_url: unknown; resource_type: unknown; format: unknown; width: unknown; height: unknown; }) => ({
      publicId: item.public_id,
      url: item.secure_url,
      type: item.resource_type,
      format: item.format,
      width: item.width,
      height: item.height,
    }));

    // 🚀 Find cityId and stateId by name
    const stateRecord = await prisma.state.findFirst({
      where: { name: body.state },
    });

    const cityRecord = await prisma.city.findFirst({
      where: { name: body.city, stateId: stateRecord?.id },
    });

    if (!stateRecord || !cityRecord) {
      return new NextResponse("Invalid city or state");
    }

    const newProperty = await prisma.property.create({
      data: {
        title: body.title,
        description: body.description,
        listingCategory: body.listingCategory,
        type: body.type,
        price: body.price,
        location: body.location,
        facing: body.facing,
        bedrooms: body.bedrooms,
        bathrooms: body.bathrooms,
        area: body.area,
        age: body.age,
        userId: dbUser.id,
        stateId: stateRecord.id,
        cityId: cityRecord.id,
        media: {
          createMany: {
            data: formattedMedia,
          },
        },
      },
    });

    return NextResponse.json(newProperty);
  }

  return new NextResponse("Unauthorized");
}

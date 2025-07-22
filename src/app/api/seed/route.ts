import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  return Response.json('seed file')
}

export async function POST() {
  await prisma.state.create({
    data: {
      name: "Bihar",
      cities: {
        create: [{ name: "Patna" }, { name: "Muzaffarpur" }, { name: "Gaya" }],
      },
    },
  });

  // const maharashtra = await prisma.state.create({
  //   data: {
  //     name: "Maharashtra",
  //     cities: {
  //       create: [
  //         { name: "Mumbai" },
  //         { name: "Pune" },
  //         { name: "Nagpur" },
  //       ],
  //     },
  //   },
  // });

  return NextResponse.json('seeded.....')
}

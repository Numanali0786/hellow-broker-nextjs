import { getFilteredProperties } from "@/lib/db/properties";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // const { searchParams } = new URL(req.url);
  // or
  const {searchParams} = req.nextUrl
  const type = searchParams.get("type");
  // console.log("type",type)
  if (!type) return;
  const lists = await getFilteredProperties(type);
  return Response.json(lists);
}
// export async function GET(req: NextRequest) {
//   // const { searchParams } = new URL(req.url);
//   // or
//   const {searchParams} = req.nextUrl
//   const type = searchParams.get("type");
//   // console.log("type",type)
//   if (!type) return;
//   const lists = await getFilteredProperties(type);
//   return Response.json(lists);
// }

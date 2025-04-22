import { getUserByClerkId } from "@/lib/db/user";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(req:Request){
const user = await currentUser()
if(!user) return NextResponse.json({success:false})
   const dbUser = await getUserByClerkId(user.id)
      return NextResponse.json({success:true})
}

export async function POST(req:Request){

    const {clerkId,email} = await req.json()
    const existingUser = await getUserByClerkId(clerkId)
      if (!existingUser) {
        const userCount = await prisma.user.count();
        await prisma.user.create({
          data: {
            clerkId: clerkId, 
            email: email,
            role: userCount === 0 ? 'ADMIN' : 'USER',
          },
        });
      }
      return NextResponse.json({success:true})
}
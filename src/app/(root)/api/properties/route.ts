import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export  async function GET(){
    const properties = await prisma.property.findMany()
    return NextResponse.json(properties)
}


export async function POST(req:Request){
    const body = await req.json()
    const newProperty = await prisma.property.create({
        data:{
            ...body
        }
    })
    return NextResponse.json(newProperty)
}
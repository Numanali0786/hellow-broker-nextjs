import { prisma } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export async function GET(){
    const user = await currentUser()
    if(!user) return Response.json('unauthenticated')
    const states = await prisma.state.findMany({
include:{
    cities:true
}
})

    return Response.json(states)

}
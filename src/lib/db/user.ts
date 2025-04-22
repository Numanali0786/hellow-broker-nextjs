import { prisma } from "../prisma"

export const getUserByClerkId = async(clerkId:string)=>{
    return await prisma.user.findUnique({
        where:{
            clerkId
        }
    })
}
export const getRoleById = async(id:string)=>{
    const dbUser = await prisma.user.findUnique({
        where:{id}
    })
    return dbUser?.role
}
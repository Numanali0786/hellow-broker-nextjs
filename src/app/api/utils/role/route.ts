import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const user = await currentUser();
  if (!user) return new Response("unauthenticated!", { status: 401 });

  let dbUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      role: true,
    },
  });

  // If user doesn't exist, create it and assign role
  if (!dbUser) {
    const userCount = await prisma.user.count();
    const createdUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        role: userCount === 0 ? "ADMIN" : "USER",
      },
      select: {
        id: true,
        role: true,
      },
    });
    dbUser = createdUser;
  }

  return Response.json({ role: dbUser.role });
}

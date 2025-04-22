import { currentUser } from "@clerk/nextjs/server";
import { getRoleById, getUserByClerkId } from "./user";
import { prisma } from "../prisma";

export async function getAllApprovedProperties(clerkId: string) {
  const dbUser = await getUserByClerkId(clerkId);

  if (!dbUser) {
    return false;
  }

  const role = await getRoleById(dbUser.id);
  if (role === "ADMIN") {
    const properties = await prisma.property.findMany({
      where: {
        approved: true,
      },
    });
    return properties;
  }

  return null;
}

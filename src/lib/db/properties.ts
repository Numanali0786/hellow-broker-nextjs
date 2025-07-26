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
      include: {
        user: true,
      },
    });
    return properties;
  }

  return null;
}

export async function getFilteredProperties(filter: string) {
  const user = await currentUser();
  if (!user) return null;

  const dbUser = await getUserByClerkId(user.id);
  if (!dbUser) return null;

  const filterObj: {
    approved:boolean,
    [index:string]:boolean
  } = {
    approved: true,
  };

  if (filter === "recommended") {
    filterObj.isRecommended = true;
  }
  if (filter === "boosed") {
    filterObj.isBoosted = true;
  }
  if (filter === "featured") {
    filterObj.isFeatured = true;
  }
  if (filter === "handpicked") {
    filterObj.isHandpicked = true;
  }
  if (filter === "popular") {
    filterObj.isPopular = true;
  }
  if (filter === "reported") {
    filterObj.isReported = true;
  }
  console.log(filterObj)
  const properties = await prisma.property.findMany({
    where: filterObj,
    orderBy: {
      createdAt: "desc", // optional: show latest first
    },
    include: {
      media: true,
    },
  });

  return properties;
}

// export async function getFilteredProperties(filter: string) {
//   try {
//     const user = await currentUser();
//     if (!user) return null;

//     const dbUser = await getUserByClerkId(user.id);
//     if (!dbUser) return null;
//     const filterObj: any = {
//       approved: true,
//     };

//     if (filter === "recommended") {
//       filterObj.isRecommended = true;
//     }
//     if (filter === "boosed") {
//       filterObj.isBoosted = true;
//     }
//     if (filter === "featured") {
//       filterObj.isFeatured = true;
//     }
//     if (filter === "handpicked") {
//       filterObj.isHandpicked = true;
//     }
//     if (filter === "popular") {
//       filterObj.isPopular = true;
//     }
//     if (filter === "reported") {
//       filterObj.isReported = true;
//     }
//     const properties = await prisma.property.findMany({
//       where: filterObj,
//       orderBy: {
//         createdAt: "desc", // optional: show latest first
//       },
//       include:{
//         media:true,
//       }
//     });

//     return properties;
//   } catch (error) {
//     console.error("Error in getRecommendedProperties:", error);
//     return 'pp';
//   }
// }

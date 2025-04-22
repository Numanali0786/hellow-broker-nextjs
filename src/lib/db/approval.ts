import { prisma } from "../prisma";

// By Users Id
export const getApprovedProperties = async (id: string) => {
  return await prisma.property.findMany({
    where: {
      userId: id,
      approved: true,
    },
  });
};
export const getUnapprovedProperties = async (id: string) => {
  return await prisma.property.findMany({
    where: {
      userId: id,
      approved: false,
    },
    include: {
      media: true,
    },
  });
};

export const approve = async (id: string) => {
  return await prisma.property.update({
    where: {
      id,
      approved: false,
    },
    data: {
      approved: true,
    },
  });
};

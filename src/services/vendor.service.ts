import prisma from "../lib/prisma";

export type CreateVendor = {
  name: string;
  vehicles?: {
    id: string;
    driverName: string;
  };
};

export type UpdateVendor = {
  id: number;
  name: string;
};

export const getVendors = async () => {
  const result = await prisma.vendor.findMany();
  return result;
};

export const createVendor = async ({ name, vehicles }: CreateVendor) => {
  const result = await prisma.vendor.create({
    data: {
      name,
      vehicles: vehicles
        ? {
            create: {
              ...vehicles,
            },
          }
        : undefined,
    },
  });
  return result;
};

export const updateVendor = async ({ id, name }: UpdateVendor) => {
  const result = await prisma.vendor.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  return result;
};

import prisma from "../lib/prisma";

export type CreateCabRequest = {
  employeeId: string;
  pickupLocation: string;
  dropLocation: string;
  pickupTime: string;
};

export type UpdateCabRequest = {
  id: number;
  pickupLocation?: string;
  dropLocation?: string;
  pickupTime?: string;
  status?: string;
  routeId?: number;
};

export type GetCabRequests = {
  filters: {
    employeeId?: string;
    routeId?: number;
    status?: string;
  };
};

export const createCabRequest = async ({
  employeeId,
  pickupLocation,
  dropLocation,
  pickupTime,
}: CreateCabRequest) => {
  const result = await prisma.cabRequest.create({
    data: {
      employeeId,
      pickupLocation,
      dropLocation,
      pickupTime,
      status: "PENDING",
    },
  });

  return result;
};

export const updateCabRequest = async ({
  id,
  pickupLocation,
  dropLocation,
  pickupTime,
  status,
  routeId,
}: UpdateCabRequest) => {
  const result = await prisma.cabRequest.update({
    where: {
      id,
    },
    data: {
      pickupLocation,
      dropLocation,
      pickupTime,
      status,
      routeId,
    },
  });
  return result;
};

export const getCabRequests = async ({
  filters: { employeeId, routeId, status },
}: GetCabRequests) => {
  const result = await prisma.cabRequest.findMany({
    where: {
      employeeId,
      routeId,
      status,
    },
  });
  return result;
};

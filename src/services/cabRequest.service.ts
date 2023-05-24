import prisma from "../lib/prisma";

export type CreateCabRequest = {
  employeeId: string;
  employeeName: string;
  pickupLocation: string;
  dropLocation: string;
  pickupTime: string;
};

export type UpdateCabRequest = {
  id: number;
  employeeId: string;
  employeeName: string;
  pickupLocation?: string;
  dropLocation?: string;
  pickupTime?: string;
  status?: string;
  routeId?: number;
};

export type GetCabRequests = {
  filters?: {
    employeeId?: string;
    routeId?: number;
    status?: string;
  };
};

export const createCabRequest = async ({
  employeeName,
  employeeId,
  pickupLocation,
  dropLocation,
  pickupTime,
}: CreateCabRequest) => {
  const result = await prisma.cabRequest.create({
    data: {
      employeeName,
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
  employeeName,
  employeeId,
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
      employeeName,
      employeeId,
      pickupLocation,
      dropLocation,
      pickupTime,
      status,
      routeId,
    },
  });
  return result;
};

export const getCabRequests = async (opts?: GetCabRequests) => {
  const { employeeId, routeId, status } = opts?.filters ?? {};
  const result = await prisma.cabRequest.findMany({
    where: {
      employeeId,
      routeId,
      status,
      pickupTime: {
        gte: (new Date()).toISOString()
      }
    },
  });
  return result;
};

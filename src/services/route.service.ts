import prisma from "../lib/prisma";
import { transformMinutesToTimeString, transformTimeStringToMinutes } from "../lib/dateTime";

export type GetRoutes = {
  filters?: {
    id?: number;
    date?: string;
  };
};

export type CreateRouteRequired = {
  startDate: string;
  expireDate: string;
  startLocation: string;
  endLocation: string;
  pickupTime: string;
};

export type UpdateRoute = {
  id: number;
  startDate?: string;
  expireDate?: string;
  startLocation?: string;
  endLocation?: string;
  pickupTime?: string;
};

export type DeleteRoute = {
  id: number;
};

export type VehicleRequired = {
  id: string;
  driverName: string;
};

export type VehicleWithVendorId = VehicleRequired & {
  vendorId: number;
};

export type VehicleWithVendorData = VehicleRequired & {
  vendor: {
    name: string;
  };
};

export type CreateRouteWithVehicleId = CreateRouteRequired & {
  vehicleId: string;
};

export type CreateRouteWithVehicleData = CreateRouteRequired & {
  vehicle: VehicleWithVendorId | VehicleWithVendorData;
};
export type CreateRoute = CreateRouteWithVehicleId | CreateRouteWithVehicleData;

const hasVehicleId = (
  createRouteRequest: Partial<CreateRoute>
): createRouteRequest is CreateRouteWithVehicleId => {
  return !!(createRouteRequest as CreateRouteWithVehicleId).vehicleId;
};

const hasVendorId = (
  vehicleObj: VehicleWithVendorData | VehicleWithVendorId | undefined
): vehicleObj is VehicleWithVendorId => {
  return !!(vehicleObj as VehicleWithVendorId).vendorId;
};

const createResponse = (result: {pickupTime: number}) => {
  return {
    ...result,
    pickupTime: transformMinutesToTimeString(result.pickupTime)
  }
}

export const getRoutes = async (opts?: GetRoutes) => {
  const id = opts?.filters?.id;
  const date = opts?.filters?.date;
  const result = await prisma.route.findMany({
    where: {
      id,
      startDate: {
        lte: date,
      },
      expireDate: {
        gte: date,
      },
    },
    include: {
      vehicle: {
        include: {
          vendor: true
        }
      }
    }
  });

  return result.map(createResponse);
};

export const createRoute = async (createRouteRequest: CreateRoute) => {
  const { startDate, expireDate, startLocation, endLocation, pickupTime } =
    createRouteRequest;
  const updatedStartDate = new Date(startDate).toISOString();
  const updatedExpireDate = new Date(expireDate).toISOString();
  if (hasVehicleId(createRouteRequest)) {
    const result = await prisma.route.create({
      data: {
        startDate: updatedStartDate,
        expireDate: updatedExpireDate,
        startLocation,
        endLocation,
        pickupTime: transformTimeStringToMinutes(pickupTime),
        vehicleId: createRouteRequest.vehicleId,
      },
    });
    return createResponse(result);
  }

  if (hasVendorId(createRouteRequest.vehicle)) {
    const result = await prisma.route.create({
      data: {
        startDate: updatedStartDate,
        expireDate: updatedExpireDate,
        startLocation,
        endLocation,
        pickupTime: transformTimeStringToMinutes(pickupTime),
        vehicle: {
          create: {
            ...createRouteRequest.vehicle,
          },
        },
      },
    });
    return createResponse(result);
  }

  const result = await prisma.route.create({
    data: {
      startDate: updatedStartDate,
      expireDate: updatedExpireDate,
      startLocation,
      endLocation,
      pickupTime: transformTimeStringToMinutes(pickupTime),
      vehicle: {
        create: {
          ...createRouteRequest.vehicle,
          vendor: {
            create: {
              ...createRouteRequest.vehicle.vendor,
            },
          },
        },
      },
    },
  });
  return createResponse(result);
};

export const updateRoute = async ({
  id,
  startDate,
  expireDate,
  pickupTime,
  startLocation,
  endLocation,
}: UpdateRoute) => {
  const result = await prisma.route.update({
    where: {
      id,
    },
    data: {
      startDate,
      expireDate,
      pickupTime: pickupTime
        ? transformTimeStringToMinutes(pickupTime)
        : undefined,
      startLocation,
      endLocation,
    },
  });
  return createResponse(result);
};

export const deleteRoute = async ({ id }: DeleteRoute) => {
  const result = await prisma.route.delete({
    where: {
      id,
    },
  });
  return result;
};

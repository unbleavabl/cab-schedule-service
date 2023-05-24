import prisma from "../lib/prisma";

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
    id: number;
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
  });

  return result;
};

export const createRoute = async (createRouteRequest: CreateRoute) => {
  const { startDate, expireDate, startLocation, endLocation, pickupTime } =
    createRouteRequest;
  if (hasVehicleId(createRouteRequest)) {
    const result = await prisma.route.create({
      data: {
        startDate,
        expireDate,
        startLocation,
        endLocation,
        pickupTime,
        vehicleId: createRouteRequest.vehicleId,
      },
    });
    return result;
  }

  if (hasVendorId(createRouteRequest.vehicle)) {
    const result = await prisma.route.create({
      data: {
        startDate,
        expireDate,
        startLocation,
        endLocation,
        pickupTime,
        vehicle: {
          create: {
            ...createRouteRequest.vehicle,
          },
        },
      },
    });
    return result;
  }

  const result = await prisma.route.create({
    data: {
      startDate,
      expireDate,
      startLocation,
      endLocation,
      pickupTime,
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
  return result;
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
      pickupTime,
      startLocation,
      endLocation,
    },
  });
  return result;
};

export const deleteRoute = async ({
  id,
}: DeleteRoute) => {
  const result = await prisma.route.delete({
    where: {
      id,
    },
  });
  return result;
};

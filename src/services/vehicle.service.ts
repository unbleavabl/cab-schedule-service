import prisma from "../lib/prisma";

export type GetVehicles = {
  filters?: {
    vendorId?: number;
  };
};

export type CreateVehicleRequired = {
  id: string;
  driverName: string;
};

export type CreateVehicleWithVendorId = CreateVehicleRequired & {
  vendorId: number;
};

export type CreateVehicleWithVendorData = CreateVehicleRequired & {
  vendor: {
    name: string;
  };
};

export type CreateVehicle =
  | CreateVehicleWithVendorId
  | CreateVehicleWithVendorData;

export type UpdateVehicle = {
  id: string;
  driverName: string;
};

const hasVendorId = (
  createVehicleRequest: CreateVehicle
): createVehicleRequest is CreateVehicleWithVendorId => {
  return !!(createVehicleRequest as CreateVehicleWithVendorId).vendorId;
};

export const getVehicles = async (opts?: GetVehicles) => {
  const { vendorId } = opts?.filters ?? {};
  const result = await prisma.vehicle.findMany({
    where: {
      vendorId,
    },
  });
  return result;
};

export const createVehicle = async (opts: CreateVehicle) => {
  const { id, driverName } = opts;
  if (hasVendorId(opts)) {
    const result = await prisma.vehicle.create({
      data: {
        id,
        driverName,
        vendorId: opts.vendorId,
      },
    });
    return result;
  }
  const result = await prisma.vehicle.create({
    data: {
      id,
      driverName,
      vendor: {
        create: {
          ...opts.vendor,
        },
      },
    },
  });
  return result;
};

export const updateVehicle = async ({ id, driverName }: UpdateVehicle) => {
  const result = await prisma.vehicle.update({
    where: {
      id,
    },
    data: {
      driverName,
    },
  });
  return result;
};

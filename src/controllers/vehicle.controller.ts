import { Router } from "express";
import {
  getVehicles,
  createVehicle,
  updateVehicle,
} from "../services/vehicle.service";

export const vehicleController = (router: Router) => {
  router.get("/v1/vehicle", async (req, res, next) => {
    const { vendorId } = req.query;
    try {
      const result = await getVehicles({
        filters: {
          vendorId: parseInt(vendorId as string),
        },
      });
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  });

  router.post("/v1/vehicle", async (req, res, next) => {
    try {
      const body = req.body;
      const result = await createVehicle({
        id: body.id,
        driverName: body.driverName,
        vendorId: body.vendorId,
        vendor: body.vendor,
      });
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  });

  router.put("v1/route/vehicle/:id", async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const result = await updateVehicle({
        id,
        driverName: body.driverName,
      });
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  });
};

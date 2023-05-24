import { Router } from "express";
import {
  createVendor,
  updateVendor,
  getVendors,
} from "../services/vendor.service";

export const vendorController = (router: Router) => {
  router.get("/v1/vendor", async (_, res, next) => {
    try {
      const result = await getVendors();
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  });

  router.post("/v1/vendor", async (req, res, next) => {
    try {
      const body = req.body;
      const result = await createVendor({
        name: body.name,
        vehicles: body.vehicles,
      });
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  });

  router.put("v1/route/vendor/:id", async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const result = await updateVendor({
        id: parseInt(id),
        name: body.name,
      });
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  });
};

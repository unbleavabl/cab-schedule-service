import { Router } from "express";
import {
  createRoute,
  deleteRoute,
  getRoutes,
  updateRoute,
} from "../services/route.service";

export const routeController = (router: Router) => {
  router.get("/v1/route", async (req, res, next) => {
    try {
      const queryParams = req.query;
      const id = queryParams?.id
        ? parseInt(queryParams.id as string)
        : undefined;
      const date = queryParams?.date as string;
      const result = await getRoutes({
        filters: {
          id,
          date,
        },
      });
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  });

  router.post("/v1/route/create", async (req, res, next) => {
    try {
      const body = req.body;
      const result = await createRoute({
        pickupTime: body.pickupTime,
        startLocation: body.startLocation,
        endLocation: body.endLocation,
        startDate: body.startDate,
        expireDate: body.expireDate,
        vehicleId: body.vehicleId,
        vehicle: body.vehicle,
      });
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  });

  router.post("v1/route/update/:routeId", async (req, res, next) => {
    try {
      const body = req.body;
      const { routeId } = req.params;
      const result = await updateRoute({
        id: parseInt(routeId),
        pickupTime: body.pickupTime,
        startLocation: body.startLocation,
        endLocation: body.endLocation,
        startDate: body.startDate,
        expireDate: body.expireDate,
      });
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  });

  router.delete("v1/route/delete/:routeId", async (req, res, next) => {
    try {
      const { routeId } = req.params;
      const result = await deleteRoute({
        id: parseInt(routeId),
      });
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  });
};

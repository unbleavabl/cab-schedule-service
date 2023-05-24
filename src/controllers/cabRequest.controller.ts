
import { Router } from "express";
import {
  createCabRequest,
  getCabRequests,
  updateCabRequest,
} from "../services/cabRequest.service";

export const cabRequestController = (router: Router) => {
  router.get("/v1/cab-request", async (req, res, next) => {
    try {
      const result = await getCabRequests();

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  });

  router.get("/v1/cab-request/employee/:employeeId", async (req, res, next) => {
    try {
      const { employeeId } = req.params;
      const result = await getCabRequests({
        filters: {
          employeeId,
        },
      });

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  });

  router.post("/v1/cab-request/create", async (req, res, next) => {
    try {
      const { body } = req;
      const result = await createCabRequest({
        employeeId: body.employeeId,
        employeeName: body.employeeName,
        pickupLocation: body.pickupLocation,
        dropLocation: body.dropLocation,
        pickupTime: body.pickupTime,
      });

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  });

  router.post("/v1/cab-request/update", async (req, res, next) => {
    try {
      const { body } = req;
      const result = await updateCabRequest({
        id: body.id,
        employeeId: body.employeeId,
        employeeName: body.employeeName,
        pickupLocation: body.pickupLocation,
        dropLocation: body.dropLocation,
        pickupTime: body.pickupTime,
        status: body.status,
        routeId: body.routeId,
      });

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  });
};

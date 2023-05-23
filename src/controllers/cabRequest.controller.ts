import { Router } from "express";
import {
  createCabRequest,
  getCabRequests,
} from "../services/cabRequest.service";

export const cabRequestController = (router: Router) => {
  router.post("/v1/cab-request/create", async (req, res, next) => {
    try {
      const { body } = req;
      const result = await createCabRequest({
        employeeId: body.employeeId,
        pickupLocation: body.pickupLocation,
        dropLocation: body.dropLocation,
        pickupTime: body.pickupTime,
      });

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
};

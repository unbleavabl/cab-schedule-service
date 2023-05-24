import express from "express";
import { cabRequestController } from "../controllers/cabRequest.controller";
import { routeController } from "../controllers/route.controller";
import { vendorController } from "../controllers/vendor.controller";
import { vehicleController } from "../controllers/vehicle.controller";

const root = express.Router();

cabRequestController(root);
routeController(root);
vendorController(root);
vehicleController(root);

export default root;

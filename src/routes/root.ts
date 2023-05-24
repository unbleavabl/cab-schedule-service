import express from "express";
import { cabRequestController } from "../controllers/cabRequest.controller";
import { routeController } from "../controllers/route.controller";

const root = express.Router();

cabRequestController(root);
routeController(root);

export default root;

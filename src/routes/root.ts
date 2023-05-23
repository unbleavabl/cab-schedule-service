import express from "express";
import { cabRequestController } from "../controllers/cabRequest.controller";

const root = express.Router();

cabRequestController(root);

export default root;

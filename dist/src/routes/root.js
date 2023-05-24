"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cabRequest_controller_1 = require("../controllers/cabRequest.controller");
const route_controller_1 = require("../controllers/route.controller");
const vendor_controller_1 = require("../controllers/vendor.controller");
const vehicle_controller_1 = require("../controllers/vehicle.controller");
const root = express_1.default.Router();
(0, cabRequest_controller_1.cabRequestController)(root);
(0, route_controller_1.routeController)(root);
(0, vendor_controller_1.vendorController)(root);
(0, vehicle_controller_1.vehicleController)(root);
exports.default = root;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleController = void 0;
const vehicle_service_1 = require("../services/vehicle.service");
const vehicleController = (router) => {
    router.get("/v1/vehicle", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { vendorId } = req.query;
        try {
            const result = yield (0, vehicle_service_1.getVehicles)({
                filters: {
                    vendorId: parseInt(vendorId),
                },
            });
            res.status(200).send(result);
        }
        catch (err) {
            next(err);
        }
    }));
    router.post("/v1/vehicle", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = req.body;
            const result = yield (0, vehicle_service_1.createVehicle)({
                id: body.id,
                driverName: body.driverName,
                vendorId: body.vendorId,
                vendor: body.vendor,
            });
            res.status(200).send(result);
        }
        catch (err) {
            next(err);
        }
    }));
    router.put("v1/route/vehicle/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = req.body;
            const { id } = req.params;
            const result = yield (0, vehicle_service_1.updateVehicle)({
                id,
                driverName: body.driverName,
            });
            res.status(200).send(result);
        }
        catch (err) {
            next(err);
        }
    }));
};
exports.vehicleController = vehicleController;

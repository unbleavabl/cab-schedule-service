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
exports.routeController = void 0;
const route_service_1 = require("../services/route.service");
const routeController = (router) => {
    router.get("/v1/route", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const queryParams = req.query;
            const id = (queryParams === null || queryParams === void 0 ? void 0 : queryParams.id)
                ? parseInt(queryParams.id)
                : undefined;
            const date = queryParams === null || queryParams === void 0 ? void 0 : queryParams.date;
            const result = yield (0, route_service_1.getRoutes)({
                filters: {
                    id,
                    date,
                },
            });
            res.status(200).send(result);
        }
        catch (err) {
            next(err);
        }
    }));
    router.post("/v1/route", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = req.body;
            const result = yield (0, route_service_1.createRoute)({
                pickupTime: body.pickupTime,
                startLocation: body.startLocation,
                endLocation: body.endLocation,
                startDate: body.startDate,
                expireDate: body.expireDate,
                vehicleId: body.vehicleId,
                vehicle: body.vehicle,
            });
            res.status(200).send(result);
        }
        catch (err) {
            next(err);
        }
    }));
    router.put("v1/route/:routeId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = req.body;
            const { routeId } = req.params;
            const result = yield (0, route_service_1.updateRoute)({
                id: parseInt(routeId),
                pickupTime: body.pickupTime,
                startLocation: body.startLocation,
                endLocation: body.endLocation,
                startDate: body.startDate,
                expireDate: body.expireDate,
            });
            res.status(200).send(result);
        }
        catch (err) {
            next(err);
        }
    }));
    router.delete("v1/route/delete/:routeId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { routeId } = req.params;
            const result = yield (0, route_service_1.deleteRoute)({
                id: parseInt(routeId),
            });
            res.status(200).send(result);
        }
        catch (err) {
            next(err);
        }
    }));
};
exports.routeController = routeController;

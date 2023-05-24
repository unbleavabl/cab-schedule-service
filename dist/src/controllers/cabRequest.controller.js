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
exports.cabRequestController = void 0;
const cabRequest_service_1 = require("../services/cabRequest.service");
const cabRequestController = (router) => {
    router.get("/v1/cab-request", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield (0, cabRequest_service_1.getCabRequests)();
            res.status(200).send(result);
        }
        catch (err) {
            next(err);
        }
    }));
    router.get("/v1/cab-request/employee/:employeeId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { employeeId } = req.params;
            const result = yield (0, cabRequest_service_1.getCabRequests)({
                filters: {
                    employeeId,
                },
            });
            res.status(200).send(result);
        }
        catch (err) {
            next(err);
        }
    }));
    router.put("/v1/cab-request/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { body } = req;
            const { id } = req.params;
            const result = yield (0, cabRequest_service_1.updateCabRequest)({
                id: parseInt(id),
                employeeId: body.employeeId,
                employeeName: body.employeeName,
                pickupLocation: body.pickupLocation,
                dropLocation: body.dropLocation,
                pickupTime: body.pickupTime,
                status: body.status,
                routeId: body.routeId,
            });
            res.status(200).send(result);
        }
        catch (err) {
            next(err);
        }
    }));
    router.post("/v1/cab-request", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { body } = req;
            const result = yield (0, cabRequest_service_1.createCabRequest)({
                employeeId: body.employeeId,
                employeeName: body.employeeName,
                pickupLocation: body.pickupLocation,
                dropLocation: body.dropLocation,
                pickupTime: body.pickupTime,
            });
            res.status(200).send(result);
        }
        catch (err) {
            next(err);
        }
    }));
};
exports.cabRequestController = cabRequestController;

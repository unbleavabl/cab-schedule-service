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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoute = exports.updateRoute = exports.createRoute = exports.getRoutes = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const dateTime_1 = require("../lib/dateTime");
const hasVehicleId = (createRouteRequest) => {
    return !!createRouteRequest.vehicleId;
};
const hasVendorId = (vehicleObj) => {
    return !!vehicleObj.vendorId;
};
const createResponse = (result) => {
    return Object.assign(Object.assign({}, result), { pickupTime: (0, dateTime_1.transformMinutesToTimeString)(result.pickupTime) });
};
const getRoutes = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = (_a = opts === null || opts === void 0 ? void 0 : opts.filters) === null || _a === void 0 ? void 0 : _a.id;
    const date = (_b = opts === null || opts === void 0 ? void 0 : opts.filters) === null || _b === void 0 ? void 0 : _b.date;
    const result = yield prisma_1.default.route.findMany({
        where: {
            id,
            startDate: {
                lte: date,
            },
            expireDate: {
                gte: date,
            },
        },
        include: {
            vehicle: {
                include: {
                    vendor: true
                }
            }
        }
    });
    return result.map(createResponse);
});
exports.getRoutes = getRoutes;
const createRoute = (createRouteRequest) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, expireDate, startLocation, endLocation, pickupTime } = createRouteRequest;
    const updatedStartDate = new Date(startDate).toISOString();
    const updatedExpireDate = new Date(expireDate).toISOString();
    if (hasVehicleId(createRouteRequest)) {
        const result = yield prisma_1.default.route.create({
            data: {
                startDate: updatedStartDate,
                expireDate: updatedExpireDate,
                startLocation,
                endLocation,
                pickupTime: (0, dateTime_1.transformTimeStringToMinutes)(pickupTime),
                vehicleId: createRouteRequest.vehicleId,
            },
        });
        return createResponse(result);
    }
    if (hasVendorId(createRouteRequest.vehicle)) {
        const result = yield prisma_1.default.route.create({
            data: {
                startDate: updatedStartDate,
                expireDate: updatedExpireDate,
                startLocation,
                endLocation,
                pickupTime: (0, dateTime_1.transformTimeStringToMinutes)(pickupTime),
                vehicle: {
                    create: Object.assign({}, createRouteRequest.vehicle),
                },
            },
        });
        return createResponse(result);
    }
    const result = yield prisma_1.default.route.create({
        data: {
            startDate: updatedStartDate,
            expireDate: updatedExpireDate,
            startLocation,
            endLocation,
            pickupTime: (0, dateTime_1.transformTimeStringToMinutes)(pickupTime),
            vehicle: {
                create: Object.assign(Object.assign({}, createRouteRequest.vehicle), { vendor: {
                        create: Object.assign({}, createRouteRequest.vehicle.vendor),
                    } }),
            },
        },
    });
    return createResponse(result);
});
exports.createRoute = createRoute;
const updateRoute = ({ id, startDate, expireDate, pickupTime, startLocation, endLocation, }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.route.update({
        where: {
            id,
        },
        data: {
            startDate,
            expireDate,
            pickupTime: pickupTime
                ? (0, dateTime_1.transformTimeStringToMinutes)(pickupTime)
                : undefined,
            startLocation,
            endLocation,
        },
    });
    return createResponse(result);
});
exports.updateRoute = updateRoute;
const deleteRoute = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.route.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.deleteRoute = deleteRoute;

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
exports.getCabRequests = exports.updateCabRequest = exports.createCabRequest = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createCabRequest = ({ employeeName, employeeId, pickupLocation, dropLocation, pickupTime, }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cabRequest.create({
        data: {
            employeeName,
            employeeId,
            pickupLocation,
            dropLocation,
            pickupTime,
            status: "PENDING",
        },
    });
    return result;
});
exports.createCabRequest = createCabRequest;
const updateCabRequest = ({ id, employeeName, employeeId, pickupLocation, dropLocation, pickupTime, status, routeId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cabRequest.update({
        where: {
            id,
        },
        data: {
            employeeName,
            employeeId,
            pickupLocation,
            dropLocation,
            pickupTime,
            status,
            routeId,
        },
    });
    return result;
});
exports.updateCabRequest = updateCabRequest;
const getCabRequests = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { employeeId, routeId, status } = (_a = opts === null || opts === void 0 ? void 0 : opts.filters) !== null && _a !== void 0 ? _a : {};
    const result = yield prisma_1.default.cabRequest.findMany({
        where: {
            employeeId,
            routeId,
            status,
            pickupTime: {
                gte: (new Date()).toISOString()
            }
        },
    });
    return result;
});
exports.getCabRequests = getCabRequests;

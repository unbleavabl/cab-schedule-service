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
exports.updateVehicle = exports.createVehicle = exports.getVehicles = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const hasVendorId = (createVehicleRequest) => {
    return !!createVehicleRequest.vendorId;
};
const getVehicles = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { vendorId } = (_a = opts === null || opts === void 0 ? void 0 : opts.filters) !== null && _a !== void 0 ? _a : {};
    const result = yield prisma_1.default.vehicle.findMany({
        where: {
            vendorId,
        },
    });
    return result;
});
exports.getVehicles = getVehicles;
const createVehicle = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, driverName } = opts;
    if (hasVendorId(opts)) {
        const result = yield prisma_1.default.vehicle.create({
            data: {
                id,
                driverName,
                vendorId: opts.vendorId,
            },
        });
        return result;
    }
    const result = yield prisma_1.default.vehicle.create({
        data: {
            id,
            driverName,
            vendor: {
                create: Object.assign({}, opts.vendor),
            },
        },
    });
    return result;
});
exports.createVehicle = createVehicle;
const updateVehicle = ({ id, driverName }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.vehicle.update({
        where: {
            id,
        },
        data: {
            driverName,
        },
    });
    return result;
});
exports.updateVehicle = updateVehicle;

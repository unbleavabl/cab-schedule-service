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
exports.vendorController = void 0;
const vendor_service_1 = require("../services/vendor.service");
const vendorController = (router) => {
    router.get("/v1/vendor", (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield (0, vendor_service_1.getVendors)();
            res.status(200).send(result);
        }
        catch (err) {
            next(err);
        }
    }));
    router.post("/v1/vendor", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = req.body;
            const result = yield (0, vendor_service_1.createVendor)({
                name: body.name,
                vehicles: body.vehicles,
            });
            res.status(200).send(result);
        }
        catch (err) {
            next(err);
        }
    }));
    router.put("v1/route/vendor/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = req.body;
            const { id } = req.params;
            const result = yield (0, vendor_service_1.updateVendor)({
                id: parseInt(id),
                name: body.name,
            });
            res.status(200).send(result);
        }
        catch (err) {
            next(err);
        }
    }));
};
exports.vendorController = vendorController;

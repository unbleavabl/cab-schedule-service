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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
prisma.$use((params, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (params.action === "findUnique" || params.action === "findFirst") {
        // Change to findFirst - you cannot filter
        // by anything except ID / unique with findUnique
        params.action = "findFirst";
        // Add 'deleted' filter
        // ID filter maintained
        params.args.where["deleted"] = false;
    }
    if (params.action === "findMany") {
        // Find many queries
        if (params.args.where) {
            if (params.args.where.deleted == undefined) {
                // Exclude deleted records if they have not been explicitly requested
                params.args.where["deleted"] = false;
            }
        }
        else {
            params.args["where"] = { deleted: false };
        }
    }
    return next(params);
}));
prisma.$use((params, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (params.action == "update") {
        // Change to updateMany - you cannot filter
        // by anything except ID / unique with findUnique
        params.action = "updateMany";
        // Add 'deleted' filter
        // ID filter maintained
        params.args.where["deleted"] = false;
    }
    if (params.action == "updateMany") {
        if (params.args.where != undefined) {
            params.args.where["deleted"] = false;
        }
        else {
            params.args["where"] = { deleted: false };
        }
    }
    return next(params);
}));
prisma.$use((params, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Check incoming query type
    if (params.action == "delete") {
        // Delete queries
        // Change action to an update
        params.action = "update";
        params.args["data"] = { deleted: true };
    }
    if (params.action == "deleteMany") {
        // Delete many queries
        params.action = "updateMany";
        if (params.args.data != undefined) {
            params.args.data["deleted"] = true;
        }
        else {
            params.args["data"] = { deleted: true };
        }
    }
    return next(params);
}));
//@ts-ignore
if (process.env.NODE_ENV === "development")
    global.prisma = prisma;
exports.default = prisma;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    nodeEnv: (_a = process.env['NODE_ENV']) !== null && _a !== void 0 ? _a : 'development',
    port: (_b = process.env['PORT']) !== null && _b !== void 0 ? _b : 3000,
    clientOrigins: {
        'development': (_c = process.env['DEV_ORIGIN']) !== null && _c !== void 0 ? _c : '*',
        'production': (_d = process.env['PROD_ORIGIN']) !== null && _d !== void 0 ? _d : '*'
    }
};
exports.default = config;

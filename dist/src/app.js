"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./config"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const fourOhFour_1 = __importDefault(require("./middleware/fourOhFour"));
const root_1 = __importDefault(require("./routes/root"));
const app = (0, express_1.default)();
// Apply most middleware first
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    // @ts-ignore
    origin: config_1.default.clientOrigins[config_1.default.nodeEnv]
}));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('tiny'));
// Apply routes before error handling
app.use('/api/', root_1.default);
// Apply error handling last
app.use(fourOhFour_1.default);
app.use(errorHandler_1.default);
exports.default = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
// import config from "config";
const routes_1 = __importDefault(require("./routes"));
const db_1 = __importDefault(require("./db/db"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const swaggerSpec = (0, swagger_jsdoc_1.default)(swagger_1.default);
exports.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
const port = process.env.PORT;
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 5,
});
exports.app.use(limiter);
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
// const port = config.get("port");
exports.app.listen(port, () => {
    console.log("Application listening on port ", port);
    (0, db_1.default)();
    (0, routes_1.default)(exports.app);
});

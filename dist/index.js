"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const NODE_ENV = process.env.NODE_ENV || "development";
(0, dotenv_1.config)({ path: `.env.${NODE_ENV}` });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("./api/routes");
const init_db_1 = require("./db/init.db");
const errorHandler_middleware_1 = require("./middleware/errorHandler.middleware");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
const serverInit = async () => {
    await (0, init_db_1.dbInit)();
    app.use((0, morgan_1.default)("combined"));
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.get("/", async (_req, res) => {
        return res
            .status(200)
            .send({ message: `Welcome to Techsavvy API! Endpoints are available at http://localhost:${PORT}/api/v2.` });
    });
    app.use("/api/v2", routes_1.router);
    app.use(errorHandler_middleware_1.errorHandler);
};
(async () => {
    try {
        await serverInit();
        app.listen(PORT, () => {
            console.log(`[server] ${NODE_ENV} server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.log(`[server] ${error.message}`);
    }
})();
//# sourceMappingURL=index.js.map
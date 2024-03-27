"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_types_1 = require("../utils/types/response.types");
const errorHandler = (err, _req, res, _next) => {
    console.error("[server]", err.message);
    return res.status(500).json({ status: response_types_1.ResponseStatus.ERROR, message: err.message });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.middleware.js.map
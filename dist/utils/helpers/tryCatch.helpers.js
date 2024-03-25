"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatch = void 0;
const tryCatch = (controller) => {
    return async (req, res, next) => {
        try {
            return await controller(req, res);
        }
        catch (err) {
            return next(err);
        }
    };
};
exports.tryCatch = tryCatch;
//# sourceMappingURL=tryCatch.helpers.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const apiError_1 = require("../exceptions/apiError");
const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    if (err instanceof apiError_1.ApiError) {
        return res.status(err.status).send(err.message);
    }
    res.status(err.status || 500).send(err.message);
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map
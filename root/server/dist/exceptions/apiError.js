"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
    static UnauthorizedError() {
        return new ApiError(401, 'User is not authorized');
    }
    static BadRequest(message) {
        return new ApiError(400, message);
    }
    static InternalServerError() {
        return new ApiError(500, 'Internal server error');
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=apiError.js.map
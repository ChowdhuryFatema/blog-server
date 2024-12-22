"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (error) => {
    // Map validation errors into the custom error structure
    const errorSources = Object.values(error.errors).map((val) => {
        return {
            path: val === null || val === void 0 ? void 0 : val.path, // Path of the error
            message: val === null || val === void 0 ? void 0 : val.message, // Error message
        };
    });
    // Define the status code
    const statusCode = 400;
    // Return the error response object
    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    };
};
exports.default = handleValidationError;

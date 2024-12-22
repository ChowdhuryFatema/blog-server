"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errorSources = [
        {
            path: error.path,
            message: error.message,
        },
    ];
    // Define the status code
    const statusCode = 400;
    // Return the error response object
    return {
        statusCode,
        message: 'Invalid ID',
        errorSources,
    };
};
exports.default = handleCastError;

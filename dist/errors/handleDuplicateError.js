"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (error) => {
    // Match content inside the first set of double quotes
    const match = error.message.match(/"([^"]+)"/);
    // Extract the matched content
    const extractedMessage = match ? match[1] : 'Duplicate value not found';
    // Build errorSources array
    const errorSources = [
        {
            path: 'name', // You can dynamically set this if needed
            message: `${extractedMessage} is already exists`,
        },
    ];
    // Define the status code
    const statusCode = 400;
    // Return the error response object
    return {
        statusCode,
        message: 'Duplicate Key Error',
        errorSources,
    };
};
exports.default = handleDuplicateError;
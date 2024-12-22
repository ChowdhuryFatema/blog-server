"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message || null,
        statusCode: data.statusCode,
        data: data.data || null,
    });
};
exports.default = sendResponse;

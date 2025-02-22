"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    const result = yield product_service_1.ProductService.createProduct(product);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Bike created successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const getAllProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.ProductService.getAllProduct(req.query);
    // Check if the result is empty or not found
    if (!result) {
        (0, sendResponse_1.default)(res, {
            success: false,
            message: 'No products found for the provided search term',
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            data: {},
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Bikes retrieved successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const getSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.ProductService.getSingleProduct(id);
    if (!result) {
        (0, sendResponse_1.default)(res, {
            success: false,
            message: 'Bike not found',
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            data: {},
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Bike retrieved successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const updateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = req.body;
    const result = yield product_service_1.ProductService.updateProduct(id, product);
    if (!result) {
        (0, sendResponse_1.default)(res, {
            success: false,
            message: 'Bike not found',
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            data: {},
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Bike updated successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.ProductService.deleteProduct(id);
    if (!result) {
        (0, sendResponse_1.default)(res, {
            success: false,
            message: 'Bike not found',
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            data: {},
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Bike deleted successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: {},
    });
}));
exports.ProductController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};

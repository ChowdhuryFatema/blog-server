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
exports.ProductService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const product_constant_1 = require("./product.constant");
const product_model_1 = require("./product.model");
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(payload);
    return result;
});
const getAllProduct = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const studentQuery = new QueryBuilder_1.default(product_model_1.Product.find(), query)
        .search(product_constant_1.productSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield studentQuery.countTotal();
    const result = yield studentQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(id);
    return result;
});
exports.ProductService = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};

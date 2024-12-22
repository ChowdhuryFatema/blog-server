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
exports.BlogServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = require("../../errors/AppError");
const blog_constant_1 = require("./blog.constant");
const blog_model_1 = require("./blog.model");
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.create(payload);
    return result;
});
const getAllBlog = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blog_model_1.Blog.find().populate('author'), query)
        .search(blog_constant_1.BlogSearchableFields)
        .filter()
        .sort();
    const result = yield blogQuery.modelQuery;
    return result;
});
const getSingleBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findById(id).populate('author');
    if (!result) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found');
    }
    return result;
});
const updateBlog = (id, payload, email) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const blog = yield blog_model_1.Blog.findById(id).populate('author');
    if (!blog) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog is not found');
    }
    // Get the author's email and role
    const authorEmail = (_a = blog.author) === null || _a === void 0 ? void 0 : _a.email;
    // Authorization check: only the blog's author or an admin can delete
    if (email !== authorEmail) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized to updated this blog. Only the blog's author can perform this action.");
    }
    const result = yield blog_model_1.Blog.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteBlog = (id, userEmail, role) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Find the blog by ID and populate the author
    const blog = yield blog_model_1.Blog.findById(id).populate('author');
    // Check if the blog exists
    if (!blog) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'This blog does not exist.');
    }
    // Get the author's email and role
    const authorEmail = (_a = blog.author) === null || _a === void 0 ? void 0 : _a.email;
    // const role = await;
    // Authorization check: only the blog's author or an admin can delete
    if (role !== 'admin' && userEmail !== authorEmail) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized to delete this blog. Only the blog's author or an admin can perform this action.");
    }
    // Delete the blog
    const result = yield blog_model_1.Blog.findByIdAndDelete(id);
    // Return the result (if necessary, or handle further logic here)
    return result;
});
exports.BlogServices = {
    createBlog,
    getAllBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog,
};

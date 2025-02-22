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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../errors/AppError");
const user_model_1 = require("./user.model");
const blog_model_1 = require("../blog/blog.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
const getMe = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email });
    return result;
});
const updateUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    console.log(user);
    if (!user) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
    return updatedUser;
});
const deleteBlogByAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findById(id);
    if (!blog) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found');
    }
    const result = yield blog_model_1.Blog.findByIdAndDelete(id);
    return result;
});
exports.UserServices = {
    createUser,
    getMe,
    updateUser,
    deleteBlogByAdmin,
};

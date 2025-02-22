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
exports.orderService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../errors/AppError");
const order_model_1 = __importDefault(require("./order.model"));
const order_utils_1 = require("./order.utils");
const product_model_1 = require("../product/product.model");
const createOrder = (client_ip, user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(payload);
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.products) === null || _a === void 0 ? void 0 : _a.length))
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "Order is not specified");
    const products = payload.products;
    let totalPrice = 0;
    const productDetails = yield Promise.all(products.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_model_1.Product.findById(item.product);
        if (product) {
            const subtotal = product ? (product.price || 0) * item.quantity : 0;
            const stock = product ? (product.quantity || 0) - item.quantity : 0;
            totalPrice += subtotal;
            product.quantity = stock;
            return item;
        }
    })));
    let order = yield order_model_1.default.create({
        user,
        products: productDetails,
        totalPrice,
    });
    const paymentDetails = {
        amount: totalPrice,
        order_id: order._id,
        currency: "BDT",
        customer_name: "N/A",
        customer_email: user.email, // optional
        customer_address: "N/A",
        customer_phone: "N/A",
        customer_city: "N/A",
        client_ip,
    };
    const payment = yield order_utils_1.orderUtils.makePaymentAsync(paymentDetails);
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        order = yield order.updateOne({
            transaction: {
                id: payment.sp_order_id,
                status: payment.transactionStatus,
            },
        });
    }
    return { order, payment };
});
const getOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_model_1.default.find({ user: userId }).sort({ createdAt: -1 });
    return data;
});
const verifyPayment = (sp_trxn_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedResponse = yield order_utils_1.orderUtils.verifyPaymentAsync(sp_trxn_id);
    if (verifiedResponse.length) {
        yield order_model_1.default.findOneAndUpdate({ "transaction.id": sp_trxn_id }, {
            "transaction.code": verifiedResponse[0].sp_code,
            "transaction.message": verifiedResponse[0].sp_message,
            "transaction.status": verifiedResponse[0].transaction_status,
            "transaction.method": verifiedResponse[0].method,
            "transaction.bank_status": verifiedResponse[0].bank_status,
            "transaction.date_time": verifiedResponse[0].date_time,
            status: verifiedResponse[0].bank_status == "Success"
                ? "Paid"
                : verifiedResponse[0].bank_status == "Cancel"
                    ? "Cancelled"
                    : "Pending",
        });
    }
    return verifiedResponse;
});
exports.orderService = {
    createOrder,
    getOrders,
    verifyPayment,
};

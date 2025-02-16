import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderService } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const order = await orderService.createOrder(
    req.ip as string,
    user,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Order placed successfully",
    data: order.payment.checkout_url,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const user = req.user;
  const order = await orderService.getOrders(user._id as string);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Order retrieved successfully",
    data: order,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  // const order = await orderService.verifyPayment(req.query.sp_trxn_id as string);
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Order verified successfully",
    data: order,
  });
});

export const orderController = { createOrder, getOrders, verifyPayment };
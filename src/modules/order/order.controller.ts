import { NextFunction, Request, Response } from 'express';
import { OrderService } from './order.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createOrder = catchAsync(async (req, res) => {

    const order = req.body;
    const productId = order.product;
    const quantity = order.quantity;
    const user = req.user;
    const client_ip = req.ip

    const result = await OrderService.createOrder(order, productId, quantity, user, client_ip!);

    sendResponse(res, {
      success: true,
      message: 'Order created successfully',
      statusCode: StatusCodes.OK,
      data: result,
    });
  
})

const getAllOrders = catchAsync(async(req, res) => {
  const result = await OrderService.getAllOrders();

  sendResponse(res, {
    success: true,
    message: 'Order retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });

})

const verifyPayment = catchAsync(async(req, res) => {
  const result = await OrderService.verifyPayment(req.query.order_id as string)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Order verified successfully",
    data: result,
  })
})

const getRevenue = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await OrderService.getRevenue();

    sendResponse(res, {
      success: true,
      message: 'Revenue calculated successfully',
      statusCode: StatusCodes.OK,
      data: result,
    });


  
})
export const OrderController = {
  createOrder,
  getRevenue,
  getAllOrders,
  verifyPayment,
};

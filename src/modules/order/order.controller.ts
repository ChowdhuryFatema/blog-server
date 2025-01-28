import { NextFunction, Request, Response } from 'express';
import { OrderService } from './order.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createOrder = catchAsync(async (req, res) => {

    const order = req.body;
    const productId = order.product;
    const quantity = order.quantity;

    const result = await OrderService.createOrder(order, productId, quantity);

    sendResponse(res, {
      success: true,
      message: 'Order created successfully',
      statusCode: StatusCodes.OK,
      data: {},
    });
  
})

const getRevenue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await OrderService.getRevenue();
    res.status(200).send({
      message: 'Revenue calculated successfully',
      success: true,
      data: {
        totalRevenue: result,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const OrderController = {
  createOrder,
  getRevenue,
};

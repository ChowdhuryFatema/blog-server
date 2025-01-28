import { NextFunction, Request, Response } from 'express';
import { ProductService } from './product.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createProduct = catchAsync(async (req, res) => {
  const product = req.body;
  const result = await ProductService.createProduct(product);

  sendResponse(res, {
    success: true,
    message: 'Bike created successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });


})

const getAllProduct = catchAsync(async (req, res) => {

  const result = await ProductService.getAllProduct(req.query);

  // Check if the result is empty or not found
  if (!result) {
    sendResponse(res, {
      success: false,
      message: 'No products found for the provided search term',
      statusCode: StatusCodes.NOT_FOUND,
      data: {},
    });
  }

  sendResponse(res, {
    success: true,
    message: 'Bikes retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });


})

const getSingleProduct = catchAsync(async (req, res) => {

  const { id } = req.params;
  const result = await ProductService.getSingleProduct(id);

  if (!result) {
    sendResponse(res, {
      success: false,
      message: 'Bike not found',
      statusCode: StatusCodes.NOT_FOUND,
      data: {},
    });
  }

  sendResponse(res, {
    success: true,
    message: 'Bike retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
})



const updateProduct = catchAsync(async (req, res) => {

  const { id } = req.params;
  const product = req.body;

  const result = await ProductService.updateProduct(id, product);

  if (!result) {
    sendResponse(res, {
      success: false,
      message: 'Bike not found',
      statusCode: StatusCodes.NOT_FOUND,
      data: {},
    });
  }

  sendResponse(res, {
    success: true,
    message: 'Bike updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
})


const deleteProduct = catchAsync(async (req, res) => {

  const { id } = req.params;

  const result = await ProductService.deleteProduct(id);

  if (!result) {
    sendResponse(res, {
      success: false,
      message: 'Bike not found',
      statusCode: StatusCodes.NOT_FOUND,
      data: {},
    });
  }

  sendResponse(res, {
    success: true,
    message: 'Bike deleted successfully',
    statusCode: StatusCodes.OK,
    data: {},
  });

})

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};

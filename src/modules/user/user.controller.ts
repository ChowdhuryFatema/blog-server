import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUser(req.body);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});


const getMe = catchAsync(async (req, res) => {

  const { email } = req.user;
  const result = await UserServices.getMe(email);

  sendResponse(res, {
    success: true,
    message: 'User retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
})


const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await UserServices.updateUser(userId);

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
const deleteBlogByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserServices.deleteBlogByAdmin(id);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getMe,
  updateUser,
  deleteBlogByAdmin,
};

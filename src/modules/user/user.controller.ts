import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";


const createUser = catchAsync(async (req, res) => {
    const result = await UserServices.createUser(req.body);
    sendResponse(res, {
        success: true,
        message: 'User registered successfully',
        statusCode: StatusCodes.CREATED,
        data: result,
    })
})

export const UserControllers = {
    createUser,
}
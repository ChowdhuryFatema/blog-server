import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { Blog } from "../blog/blog.model";


const createUser = async (payload: IUser) => {
    const result = await User.create(payload);
    return result;
}
const updateUser = async (id: string) => {
    const user = await User.findById(id);
    console.log(user)
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(
        id,
        { isBlocked: true },
        { new: true }
    );

    return updatedUser;
};
const deleteBlogByAdmin = async (id: string) => {
    const blog = await Blog.findById(id);
    if (!blog) {
        throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");
    }
    const result = await Blog.findByIdAndDelete(id);
    return result;
};



export const UserServices = {
    createUser,
    updateUser,
    deleteBlogByAdmin,
}
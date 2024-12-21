
import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";
import { BlogSearchableFields } from "./blog.constant";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";


const createBlog = async (payload: IBlog) => {
    const result = await Blog.create(payload);
    return result;
}

const getAllBlog = async (query: Record<string, unknown>) => {

    const blogQuery = new QueryBuilder(
        Blog.find(),
        query,
    )
        .search(BlogSearchableFields)
        .filter()
        .sort()

    const result = await blogQuery.modelQuery;
    return result;
}

const getSingleBlog = async (id: string) => {
    const result = await Blog.findById(id);
    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
    }
    return result;
}


const updateBlog = async (id: string, payload: IBlog) => {

    const blog = await Blog.findById(id);
    if (!blog) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Blog is not found');
    }
    const result = await Blog.findByIdAndUpdate(id, payload,
        {
            new: true,
            runValidators: true
        }
    );
    return result;
}
const deleteBlog = async (id: string) => {
    const result = await Blog.findByIdAndDelete(id);
    return result;
}

export const BlogServices = {
    createBlog,
    getAllBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog,
}
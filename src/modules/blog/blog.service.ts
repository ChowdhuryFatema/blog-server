import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../errors/AppError';
import { BlogSearchableFields } from './blog.constant';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import { IUser } from '../user/user.interface';

const createBlog = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  return result;
};

const getAllBlog = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(BlogSearchableFields)
    .filter()
    .sort();

  const result = await blogQuery.modelQuery;
  return result;
};

const getSingleBlog = async (id: string) => {
  const result = await Blog.findById(id).populate('author');
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  return result;
};

const updateBlog = async (id: string, payload: IBlog) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog is not found');
  }
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteBlog = async (id: string, userEmail: string, role: string) => {
  // Find the blog by ID and populate the author
  const blog = await Blog.findById(id).populate<{ author: IUser }>('author');

  // Check if the blog exists
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This blog does not exist.');
  }

  // Get the author's email and role
  const authorEmail = blog.author?.email;

  // const role = await;

  // Authorization check: only the blog's author or an admin can delete
  if (role !== 'admin' && userEmail !== authorEmail) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "You are not authorized to delete this blog. Only the blog's author or an admin can perform this action.",
    );
  }

  // Delete the blog
  const result = await Blog.findByIdAndDelete(id);

  // Return the result (if necessary, or handle further logic here)
  return result;
};

export const BlogServices = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};

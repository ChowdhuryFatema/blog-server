import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {

    const result = await BlogServices.createBlog(req.body);

    sendResponse(res, {
        success: true,
        message: 'Blog created successfully',
        statusCode: StatusCodes.CREATED,
        data: result,
    })

})

const getAllBlogs = catchAsync(async (req, res) => {

    const query = req.query;
    const result = await BlogServices.getAllBlog(query);
    sendResponse(res, {
        success: true,
        message: 'Blogs fetched successfully',
        statusCode: StatusCodes.OK,
        data: result,
    })

})

const getSingleBlog = catchAsync(async (req, res) => {

    const { id } = req.params;
    const result = await BlogServices.getSingleBlog(id);

    sendResponse(res, {
        success: true,
        message: 'Blogs fetched successfully',
        statusCode: StatusCodes.OK,
        data: result,
    })

})

const updateBlog = catchAsync(async (req, res) => {

    const { id } = req.params;
    const result = await BlogServices.updateBlog(id, req.body);

    sendResponse(res, {
        success: true,
        message: 'Blogs updated successfully',
        statusCode: StatusCodes.OK,
        data: result,
    })

})

const deleteBlog = catchAsync(async (req, res) => {

    const { id } = req.params;
    BlogServices.deleteBlog(id);

    sendResponse(res, {
        success: true,
        message: 'Blog deleted successfully',
        statusCode: StatusCodes.OK
    })

})

// export const deleteBlog = async (req, res) => {

//     const { id } = req.params;

//     const blog = await Blog.findById(id);
//     if (!blog) return res.status(404).json({ message: 'Blog not found' });

//     if (blog.author.toString() !== req.user?._id.toString())
//       return res.status(403).json({ message: 'Unauthorized to delete this blog' });

//     await blog.remove();
//     res.json({ success: true, message: 'Blog deleted successfully' });

// };

export const BlogControllers = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
} 

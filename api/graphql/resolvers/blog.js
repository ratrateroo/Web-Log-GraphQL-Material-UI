require('dotenv').config();

const User = require('../../models/user');
const Blog = require('../../models/blog');
const { transformBlog } = require('./merge');

const blogResolvers = {
	createBlog: async (args, context) => {
		const blog = new Blog({
			title: args.blogInput.title,
			content: args.blogInput.content,
			likes: 0,
			comments: [''],
			author: context.userId,
		});

		let createdBlog;

		try {
			const result = await blog.save();
			createdBlog = await transformBlog(result);
			const creator = await User.findById(context.userId);
			if (!creator) {
				throw new Error('User not found.');
			}
			creator.createdBlogs.push(blog);

			await creator.save();
			console.log(createdBlog);
			return createdBlog;
		} catch (error) {
			console.log(error);
		}

		// return {
		// 	blogId: blog.id,
		// 	title: blog.title,
		// 	content: blog.content,
		// 	likes: blog.likes,
		// 	comments: blog.comments,
		// };
	},
	blogs: async () => {
		const blogs = await Blog.find();
		return blogs.map((blog) => {
			//return { ...user._doc, _id: user._doc._id.toString() };
			return transformBlog(blog);
		});
	},
};
module.exports = blogResolvers;

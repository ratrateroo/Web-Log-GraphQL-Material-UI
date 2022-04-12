require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Blog = require('../../models/blog');
const storeUpload = require('../../util/storeUpload');
const { transformUser } = require('./merge');

const blogResolvers = {
	createBlog: async (args) => {
		console.log(args);
		let status;

		const blog = new Blog({
			title: args.blogInput.title,
			content: args.blogInput.content,
			likes: 0,
			comments: [''],
		});
		const result = await blog.save();

		return {
			blogId: blog.id,
			title: blog.title,
			content: blog.content,
			likes: blog.likes,
			comments: blog.comments,
		};
	},
};
module.exports = blogResolvers;

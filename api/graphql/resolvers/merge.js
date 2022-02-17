const User = require('../../models/user');
const Blog = require('../../models/blog');

const blogs = async (blogIds) => {
	try {
		const blogs = await Blog.find({ _id: { $in: blogIds } });
		return blogs.map((blog) => {
			return transformBlog(blog);
		});
	} catch (err) {
		throw err;
	}
};

const user = async (userId) => {
	try {
		const user = await User.findById(userId);
		//const blogCount = blogs.bind(this, user._doc.createdBlogs);
		// return {
		// 	...user._doc,
		// 	_id: user.id,
		// 	createdBlogs: blogCount.length,
		// };
		return transformUser(user);
	} catch (err) {
		throw err;
	}
};

const transformBlog = (blog) => {
	return {
		...blog._doc,
		_id: blog._doc._id.toString(),
		author: user.bind(this, blog.author),
	};
};

const transformUser = (user) => {
	console.log('array', user.createdBlogs);
	console.log('length', user.createdBlogs.length);
	//const blogCount = blogs.bind(this, user.author);
	return {
		...user._doc,
		_id: user._doc._id.toString(),
		username: user.username,
		email: user.email,
		password: user.password,
		firstname: user.firstname,
		middlename: user.middlename,
		lastname: user.lastname,
		profileimage: user.profileimage,

		createdBlogs: blogs.bind(this, user.author),
	};
};

exports.transformBlog = transformBlog;
exports.transformUser = transformUser;
exports.user = user;
exports.blogs = blogs;

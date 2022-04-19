const DataLoader = require('dataloader');

const Blog = require('../../models/blog');
const User = require('../../models/user');

const blogLoader = new DataLoader((blogIds) => {
	return blogs(blogIds);
});

const blog = async (blogId) => {
	try {
		const blog = await blogLoader.load(blogId.toString());
		return blog;
	} catch (err) {
		throw err;
	}
};

const blogs = async (blogIds) => {
	const blogs = await Blog.find({ _id: { $in: blogIds } });
	return blogs.map((blog) => {
		return transformBlog(blog);
	});
};

const user = async (userId) => {
	const user = await User.findById(userId);
	//const blogCount = blogs.bind(this, user._doc.createdBlogs);
	// return {
	// 	...user._doc,
	// 	_id: user.id,
	// 	createdBlogs: blogCount.length,
	// };
	return transformUser(user);
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
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,

		//createdBlogs: user.createdBlogs.length,
		//createdBlogs: blogs.bind(this, user.author),
	};
};

exports.transformBlog = transformBlog;
exports.transformUser = transformUser;
exports.user = user;
exports.blogs = blogs;

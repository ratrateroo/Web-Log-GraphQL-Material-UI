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
		await User.findOne()
			.or([{ username: args.userInput.username }, { email: args.userInput.email }])
			.then((result) => {
				console.log(result);
				{
					result.username === args.userInput.username
						? (status = 'username')
						: (status = 'email');
				}
			})
			.catch((err) => console.log(err));

		if (status === 'username') {
			throw new Error('Username exists already.');
		}

		if (status === 'email') {
			throw new Error('Email already taken.');
		}

		const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

		const user = new User({
			username: args.userInput.username,
			email: args.userInput.email,
			password: hashedPassword,
			firstname: args.userInput.firstname,
			middlename: args.userInput.middlename,
			lastname: args.userInput.lastname,
			profileimage: 'defaultimage',
		});
		const result = await user.save();

		const token = jwt.sign({ userId: user.id, email: user.email }, process.env.TOKEN_SECRET_KEY, {
			expiresIn: '1h',
		});

		return { userId: user.id, token: token, tokenExpiration: 1 };
	},
};
module.exports = userResolvers;

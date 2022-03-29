require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const storeUpload = require('../../util/storeUpload');
const { transformUser } = require('./merge');

const userResolvers = {
	user: async ({ id }) => {
		const user = await User.findById(id);
		console.log(user._doc);

		return transformUser(user);
	},

	check: async () => {
		return { message: 'Hello there...' };
	},

	users: async () => {
		const users = await User.find();
		return users.map((user) => {
			return { ...user._doc, _id: user._doc._id.toString() };
		});
	},

	// createUser: async (args) => {
	// 	console.log(args);
	// 	const existingUser = await User.findOne({
	// 		email: args.userInput.email,
	// 	});
	// 	if (existingUser) {
	// 		throw new Error('User exists already.');
	// 	}

	// 	const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

	// 	const user = new User({
	// 		username: args.userInput.username,
	// 		email: args.userInput.email,
	// 		password: hashedPassword,
	// 		firstname: args.userInput.firstname,
	// 		middlename: args.userInput.middlename,
	// 		lastname: args.userInput.lastname,
	// 		profileimage: 'defaultimage',
	// 	});
	// 	const result = await user.save();

	// 	//return { ...result._doc, password: null, _id: result.id };

	// 	const token = jwt.sign({ userId: result.id, email: user.email }, 'secretkeyforhashing', {
	// 		expiresIn: '1h',
	// 	});

	// 	return {
	// 		userId: result._id,
	// 		token: token,
	// 		tokenExpiration: 1,
	// 	};
	// },

	updateImage: async ({ id, profileimage }) => {
		const existingUser = await User.findOne({
			id: id,
		});
		if (!existingUser) {
			throw new Error("Can't find that user.");
		}

		existingUser.profileimage = profileimage;

		await existingUser.save();
		return transformUser(existingUser);
	},

	logInUser: async (args) => {
		console.log(args);
		console.log('User: ' + args.userInput.username + ' logged in.');

		try {
			const user = await User.findOne({ username: args.userInput.username });

			if (!user) {
				throw new Error('User does not exist.');
			}

			const isEqual = await bcrypt.compare(args.userInput.password, user.password);

			if (!isEqual) {
				throw new Error('Password is incorrect.');
			}

			const token = jwt.sign(
				{ userId: user.id, email: user.email },
				process.env.TOKEN_SECRET_KEY,
				{
					expiresIn: '1h',
				}
			);
			console.log(token);

			return { userId: user.id, token: token, tokenExpiration: 1 };
		} catch (error) {
			console.log(error);
		}
	},

	uploadProfileImage: async (file, context) => {
		console.log('user upload reached');

		console.log(context.userId);
		try {
			const { filename, mimetype, encoding } = await storeUpload(file, context);

			await User.updateOne({ _id: context.userId }, { profileimage: filename })
				.then((result) => {
					console.log(result);
					console.log('Upload success');
					return { filename, mimetype, encoding };
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
		}
	},

	profileImage: async ({ id }) => {
		const user = await User.findById(id);
		//console.log(user._doc);

		console.log(user);

		return transformUser(user);
	},

	signUpUser: async (args) => {
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

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const storeFileSystem = require('../../util/storeFileSystem');
const { transformUser } = require('./merge');

const userResolvers = {
	user: async ({ id }) => {
		const user = await User.findById(id);
		//console.log(user._doc);

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

	login: async ({ username, password }) => {
		const user = await User.findOne({ username: username });
		if (!user) {
			throw new Error('User does not exist!');
		}
		const isEqual = await bcrypt.compare(password, user.password);

		if (!isEqual) {
			throw new Error('Password is incorrect!');
		}
		console.log('User: ' + username + ' logged in.');

		const token = jwt.sign({ userId: user.id, email: user.email }, 'secretkeyforhashing', {
			expiresIn: '1h',
		});

		//console.log(req);

		return { userId: user.id, token: token, tokenExpiration: 1 };
	},
	storeUpload: async (file) => {
		const { createReadStream, filename, mimetype, encoding } = await file.file;
		console.log(file.file);
		// console.log(createReadStream);
		// console.log(filename);
		// console.log(mimetype);
		// console.log(encoding);
		//check for the correct mimetype
		if (mimetype !== 'image/jpeg' && mimetype !== 'image/png' && mimetype !== 'image/jpg') {
			throw new Error(
				`File type ${mimetype} is invalid. Try uploading .jpg, jpeg, or .png file.`
			);
		}
		const stream = createReadStream();
		//console.log(stream);
		return storeFileSystem({
			stream: stream,
			mimetype: mimetype,
			filename: filename,
			encoding: encoding,
		});
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

		// const existingUser = await User.findOne({
		// 	username: args.userInput.username,
		// 	email: args.userInput.email,
		// });
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

		//return { ...result._doc, password: null, _id: result.id };

		const token = jwt.sign({ userId: result.id, email: user.email }, 'secretkeyforhashing', {
			expiresIn: '1h',
		});

		return {
			userId: result._id,
			token: token,
			tokenExpiration: 1,
		};
	},
};
module.exports = userResolvers;

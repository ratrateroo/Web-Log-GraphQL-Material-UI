const userResolvers = require('./user');

const resolvers = {
	Query: {
		check: userResolvers.check,
		user: (_, data) => {
			return userResolvers.user(data);
		},
		users: userResolvers.users,
		profileImage: (_, data) => {
			return userResolvers.profileImage(data);
		},
	},
	Mutation: {
		signUpUser: (_, data) => {
			return userResolvers.signUpUser(data);
		},
		logInUser: (_, data) => {
			console.log('login resolver reached');
			console.log(data);
			return userResolvers.logInUser(data);
		},

		uploadProfileImage: (_, { file }, context) => {
			console.log('upload resolver reached');
			console.log(file);
			return userResolvers.uploadProfileImage(file, context);
		},
	},
};

module.exports = resolvers;

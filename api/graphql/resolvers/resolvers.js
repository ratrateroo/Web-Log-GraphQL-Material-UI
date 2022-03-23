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
			return userResolvers.logInUser(data);
		},

		uploadProfileImage: (_, { file }) => userResolvers.uploadProfileImage(file),
	},
};

module.exports = resolvers;

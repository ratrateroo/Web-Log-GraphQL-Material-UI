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
		login: (_, data) => {
			return userResolvers.login(data);
		},
	},
	Mutation: {
		signUpUser: (_, data) => {
			return userResolvers.signUpUser(data);
		},

		uploadProfileImage: (_, { file }) => userResolvers.storeUpload(file),
	},
};

module.exports = resolvers;

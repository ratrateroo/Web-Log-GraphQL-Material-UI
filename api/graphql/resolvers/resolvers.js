const userResolvers = require('./user');
const blogResolvers = require('./blog');

const resolvers = {
	Query: {
		check: userResolvers.check,
		user: (_, data) => {
			return userResolvers.user(data);
		},
		users: (_, data) => {
			return userResolvers.users(data);
		},
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

			return userResolvers.logInUser(data);
		},

		uploadProfileImage: (_, { file }, context) => {
			console.log('upload resolver reached');
			console.log('showing context');
			console.log(context.userId);
			return userResolvers.uploadProfileImage(file, context);
		},
		createBlog: (_, data) => {
			return blogResolvers.createBlog(data);
		},
	},
};

module.exports = resolvers;
